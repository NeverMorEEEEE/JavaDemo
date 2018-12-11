/**
 * echarts������µ�����
 *
 * @desc echarts����Canvas����Javascriptͼ��⣬�ṩֱ�ۣ��������ɽ������ɸ��Ի����Ƶ�����ͳ��ͼ��
 * @author Kener (@Kener-�ַ�, linzhifeng@baidu.com)
 *
 */
define(function (require) {
    /**
     * ���캯��
     * @param {Object} messageCenter echart��Ϣ����
     * @param {ZRender} zr zrenderʵ��
     * @param {Object} option ͼ��ѡ��
     */
    function Island(ecConfig, messageCenter, zr) {
        // ����װ��
        var ComponentBase = require('../component/base');
        ComponentBase.call(this, ecConfig, zr);
        // �ɼ�������װ��
        var CalculableBase = require('./calculableBase');
        CalculableBase.call(this, zr, ecConfig);
                
        var ecData = require('../util/ecData');

        var zrEvent = require('zrender/tool/event');

        var self = this;
        self.type = ecConfig.CHART_TYPE_ISLAND;
        var option;

        var _zlevelBase = self.getZlevelBase();
        var _nameConnector;
        var _valueConnector;
        var _zrHeight = zr.getHeight();
        var _zrWidth = zr.getWidth();

        /**
         * �µ��ϲ�
         *
         * @param {string} tarShapeIndex Ŀ������
         * @param {Object} srcShape ԴĿ�꣬����Ŀ���ɾ��
         */
        function _combine(tarShape, srcShape) {
            var zrColor = require('zrender/tool/color');
            var accMath = require('../util/accMath');
            var value = accMath.accAdd(
                            ecData.get(tarShape, 'value'),
                            ecData.get(srcShape, 'value')
                        );
            var name = ecData.get(tarShape, 'name')
                       + _nameConnector
                       + ecData.get(srcShape, 'name');

            tarShape.style.text = name + _valueConnector + value;

            ecData.set(tarShape, 'value', value);
            ecData.set(tarShape, 'name', name);
            tarShape.style.r = option.island.r;
            tarShape.style.color = zrColor.mix(
                tarShape.style.color,
                srcShape.style.color
            );
        }

        /**
         * ˢ��
         */
        function refresh(newOption) {
            if (newOption) {
                newOption.island = self.reformOption(newOption.island);
                option = newOption;
    
                _nameConnector = option.nameConnector;
                _valueConnector = option.valueConnector;
            }
        }
        
        function render(newOption) {
            refresh(newOption);

            for (var i = 0, l = self.shapeList.length; i < l; i++) {
                zr.addShape(self.shapeList[i]);
            }
        }
        
        function getOption() {
            return option;
        }

        function resize() {
            var newWidth = zr.getWidth();
            var newHieght = zr.getHeight();
            var xScale = newWidth / (_zrWidth || newWidth);
            var yScale = newHieght / (_zrHeight || newHieght);
            if (xScale == 1 && yScale == 1) {
                return;
            }
            _zrWidth = newWidth;
            _zrHeight = newHieght;
            for (var i = 0, l = self.shapeList.length; i < l; i++) {
                zr.modShape(
                    self.shapeList[i].id,
                    {
                        style: {
                            x: Math.round(self.shapeList[i].style.x * xScale),
                            y: Math.round(self.shapeList[i].style.y * yScale)
                        }
                    },
                    true
                );
            }
        }

        function add(shape) {
            var name = ecData.get(shape, 'name');
            var value = ecData.get(shape, 'value');
            var seriesName = typeof ecData.get(shape, 'series') != 'undefined'
                             ? ecData.get(shape, 'series').name
                             : '';
            var font = self.getFont(option.island.textStyle);
            var islandShape = {
                shape : 'circle',
                id : zr.newShapeId(self.type),
                zlevel : _zlevelBase,
                style : {
                    x : shape.style.x,
                    y : shape.style.y,
                    r : option.island.r,
                    color : shape.style.color || shape.style.strokeColor,
                    text : name + _valueConnector + value,
                    textFont : font
                },
                draggable : true,
                hoverable : true,
                onmousewheel : self.shapeHandler.onmousewheel,
                _type : 'island'
            };
            if (islandShape.style.color == '#fff') {
                islandShape.style.color = shape.style.strokeColor;
            }
            self.setCalculable(islandShape);
            islandShape.dragEnableTime = 0;
            ecData.pack(
                islandShape,
                {name:seriesName}, -1,
                value, -1,
                name
            );
            self.shapeList.push(islandShape);
            zr.addShape(islandShape);
        }

        function del(shape) {
            zr.delShape(shape.id);
            var newShapeList = [];
            for (var i = 0, l = self.shapeList.length; i < l; i++) {
                if (self.shapeList[i].id != shape.id) {
                    newShapeList.push(self.shapeList[i]);
                }
            }
            self.shapeList = newShapeList;
        }

        /**
         * �������ק������ ���ػ��෽��
         */
        function ondrop(param, status) {
            if (!self.isDrop || !param.target) {
                // û���ڵ�ǰʵ���Ϸ�����ק��Ϊ��ֱ�ӷ���
                return;
            }
            // ��ק�����µ����ݺϲ�
            var target = param.target;      // ��ק����Ŀ��
            var dragged = param.dragged;    // ��ǰ����ק��ͼ�ζ���

            _combine(target, dragged);
            zr.modShape(target.id, target);

            status.dragIn = true;

            // ��������ק�¼���λ
            self.isDrop = false;

            return;
        }

        /**
         * �������ק��ȥ�� ���ػ��෽��
         */
        function ondragend(param, status) {
            var target = param.target;      // ��ק����Ŀ��
            if (!self.isDragend) {
                // ��ק�Ĳ��ǹµ����ݣ����û��ͼ����ܹµ����ݣ���Ҫ�����µ�����
                if (!status.dragIn) {
                    target.style.x = zrEvent.getX(param.event);
                    target.style.y = zrEvent.getY(param.event);
                    add(target);
                    status.needRefresh = true;
                }
            }
            else {
                // ��ק���ǹµ����ݣ������ͼ������˹µ����ݣ���Ҫɾ���µ�����
                if (status.dragIn) {
                    del(target);
                    status.needRefresh = true;
                }
            }

            // ��������ק�¼���λ
            self.isDragend = false;

            return;
        }

        /**
         * ���ָı�µ�����ֵ
         */
        self.shapeHandler.onmousewheel = function(param) {
            var shape = param.target;

            var event = param.event;
            var delta = zrEvent.getDelta(event);
            delta = delta > 0 ? (-1) : 1;
            shape.style.r -= delta;
            shape.style.r = shape.style.r < 5 ? 5 : shape.style.r;

            var value = ecData.get(shape, 'value');
            var dvalue = value * option.island.calculateStep;
            if (dvalue > 1) {
                value = Math.round(value - dvalue * delta);
            }
            else {
                value = (value - dvalue * delta).toFixed(2) - 0;
            }

            var name = ecData.get(shape, 'name');
            shape.style.text = name + ':' + value;

            ecData.set(shape, 'value', value);
            ecData.set(shape, 'name', name);

            zr.modShape(shape.id, shape);
            zr.refresh();
            zrEvent.stop(event);
        };

        self.refresh = refresh;
        self.render = render;
        self.resize = resize;
        self.getOption = getOption;
        self.add = add;
        self.del = del;
        self.ondrop = ondrop;
        self.ondragend = ondragend;
    }

    // ͼ��ע��
    require('../chart').define('island', Island);
    
    return Island;
});