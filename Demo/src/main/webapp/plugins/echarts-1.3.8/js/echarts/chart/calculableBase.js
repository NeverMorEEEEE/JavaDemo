/**
 * echarts�������
 *
 * @desc echarts����Canvas����Javascriptͼ��⣬�ṩֱ�ۣ��������ɽ������ɸ��Ի����Ƶ�����ͳ��ͼ��
 * @author Kener (@Kener-�ַ�, linzhifeng@baidu.com)
 *
 */
define(function(require) {
    function Base(zr, option){
        var ecData = require('../util/ecData');
        var accMath = require('../util/accMath');

        var zrUtil = require('zrender/tool/util');
        var self = this;

        self.selectedMap = {};

        self.shapeHandler = {
            onclick : function() {
                self.isClick = true;
            },
            ondragover : function (param) {
                // ���ش����ɼ������Ե�ͼ����ʾ
                var calculableShape = zrUtil.clone(param.target);
                calculableShape.highlightStyle = {
                    text : '',
                    r : calculableShape.style.r + 5,
                    brushType : 'stroke',
                    strokeColor : option.calculableColor,//self.zr.getCalculableColor(),
                    lineWidth : (calculableShape.style.lineWidth || 1) + 12
                };
                self.zr.addHoverShape(calculableShape);
            },

            ondrop : function (param) {
                // �ų�һЩ�����ݵ���ק����
                if (typeof ecData.get(param.dragged, 'data') != 'undefined') {
                    self.isDrop = true;
                }
            },

            ondragend : function () {
                self.isDragend = true;
            }
        };

        function setCalculable(shape) {
            shape.dragEnableTime = option.DRAG_ENABLE_TIME;
            shape.ondragover = self.shapeHandler.ondragover;
            shape.ondragend = self.shapeHandler.ondragend;
            shape.ondrop = self.shapeHandler.ondrop;
            return shape;
        }

        /**
         * �������ק����
         */
        function ondrop(param, status) {
            if (!self.isDrop || !param.target) {
                // û���ڵ�ǰʵ���Ϸ�����ק��Ϊ��ֱ�ӷ���
                return;
            }

            var target = param.target;      // ��ק����Ŀ��
            var dragged = param.dragged;    // ��ǰ����ק��ͼ�ζ���

            var seriesIndex = ecData.get(target, 'seriesIndex');
            var dataIndex = ecData.get(target, 'dataIndex');

            // �䵽����item�ϣ����ݱ���ק��ĳ���������ϣ������޸�
            var data = option.series[seriesIndex].data[dataIndex] || '-';
            if (data.value) {
                if (data.value != '-') {
                    option.series[seriesIndex].data[dataIndex].value = 
                        accMath.accAdd(
                            option.series[seriesIndex].data[dataIndex].value,
                            ecData.get(dragged, 'value')
                        );
                }
                else {
                    option.series[seriesIndex].data[dataIndex].value =
                        ecData.get(dragged, 'value');
                }
            }
            else {
                if (data != '-') {
                    option.series[seriesIndex].data[dataIndex] = 
                        accMath.accAdd(
                            option.series[seriesIndex].data[dataIndex],
                            ecData.get(dragged, 'value')
                        );
                }
                else {
                    option.series[seriesIndex].data[dataIndex] =
                        ecData.get(dragged, 'value');
                }
            }

            // ��status = {}��ֵ������
            status.dragIn = status.dragIn || true;

            // ��������ק�¼���λ
            self.isDrop = false;

            return;
        }

        /**
         * �������ק��ȥ
         */
        function ondragend(param, status) {
            if (!self.isDragend || !param.target) {
                // û���ڵ�ǰʵ���Ϸ�����ק��Ϊ��ֱ�ӷ���
                return;
            }
            var target = param.target;      // ����קͼ��Ԫ��

            var seriesIndex = ecData.get(target, 'seriesIndex');
            var dataIndex = ecData.get(target, 'dataIndex');

            // ����ק��ͼ��������ͼbar��ɾ������ק�ߵ�����
            option.series[seriesIndex].data[dataIndex] = '-';

            // ��status = {}��ֵ������
            status.dragOut = true;
            status.needRefresh = true;

            // ��������ק�¼���λ
            self.isDragend = false;

            return;
        }

        /**
         * ͼ��ѡ��
         */
        function onlegendSelected(param, status) {
            var legendSelected = param.selected;
            for (var itemName in self.selectedMap) {
                if (self.selectedMap[itemName] != legendSelected[itemName]) {
                    // ��һ�һ�¶���Ҫ�ػ�
                    status.needRefresh = true;
                    return;
                }
            }
        }

        /**
         * ���෽��
         */
        self.setCalculable = setCalculable;
        self.ondrop = ondrop;
        self.ondragend = ondragend;
        self.onlegendSelected = onlegendSelected;
    }

    return Base;
});
