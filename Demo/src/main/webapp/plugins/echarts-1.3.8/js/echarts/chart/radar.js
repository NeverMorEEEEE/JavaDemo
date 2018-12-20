/**
 * echartsͼ���ࣺ�״�ͼ
 *
 * @desc echarts����Canvas����Javascriptͼ��⣬�ṩֱ�ۣ��������ɽ������ɸ��Ի����Ƶ�����ͳ��ͼ��
 * @author Neil (����, yangji01@baidu.com)
 *
 */

 define(function(require) {
    /**
     * ���캯��
     * @param {Object} messageCenter echart��Ϣ����
     * @param {ZRender} zr zrenderʵ��
     * @param {Object} series ����
     * @param {Object} component ���
     */
    function Radar(ecConfig, messageCenter, zr, option, component) {
        // ����װ��
        var ComponentBase = require('../component/base');
        ComponentBase.call(this, ecConfig, zr);
        // �ɼ�������װ��
        var CalculableBase = require('./calculableBase');
        CalculableBase.call(this, zr, option);

        var ecData = require('../util/ecData');

        var zrColor = require('zrender/tool/color');

        var self = this;
        self.type = ecConfig.CHART_TYPE_RADAR;

        var series;                 // ��������Դ����Ҫ�޸ĸ��Լ��޹ص���
        var serie;

        var _zlevelBase = self.getZlevelBase();

        var _queryTarget;

        var _dropBoxList;

        var _symbol = ecConfig.symbolList;
        var _radarDataCounter;
        
        /**
         * ����ͼ��
         */
        function _buildShape() {
            var legend = component.legend;
            self.selectedMap = {};
            _dropBoxList = [];
            _radarDataCounter = 0;
            var serieName;
            for (var i = 0, l = series.length; i < l ; i ++) {
                if (series[i].type == ecConfig.CHART_TYPE_RADAR) {
                    serie = self.reformOption(series[i]);
                    serieName = serie.name || '';
                    // ϵ��ͼ������
                    self.selectedMap[serieName] = 
                        legend ? legend.isSelected(serieName) : true;
                    
                    if (self.selectedMap[serieName]) {
                        _queryTarget = [serie, option];
    
                        // ��ӿ���ק��ʾ�򣬶�ϵ�й���һ�������꣬��һ������
                        if (self.deepQuery(_queryTarget, 'calculable')) {
                            _addDropBox(i);
                        }
                        _buildSingleRadar(i);
                        self.buildMark(
                            series[i],
                            i,
                            component
                        );
                    }
                }
            }

            for (var i = 0, l = self.shapeList.length; i < l; i++) {
                self.shapeList[i].id = zr.newShapeId(self.type);
                zr.addShape(self.shapeList[i]);
            }
        }

        /**
         * ��������ͼ��
         * @param {number} ���е�index
         */
        function _buildSingleRadar(index) {
            var legend = component.legend;
            var iconShape;
            var data = serie.data;
            var defaultColor;
            var name;
            var pointList;
            var calculable = self.deepQuery(_queryTarget, 'calculable');
           
            for (var i = 0; i < data.length; i ++) {
                name = data[i].name || '';
                
                // ͼ������
                self.selectedMap[name] = legend 
                                         ? legend.isSelected(name) 
                                         : true;
                if (!self.selectedMap[name]) {
                    continue;
                }
                
                 // Ĭ����ɫ����
                if (legend) {
                    // ��ͼ�����ͼ���л�ȡ��ɫ����
                    defaultColor = legend.getColor(name);
                    iconShape = legend.getItemShape(name);
                    if (iconShape) {
                        // �ص�legend����һ���������icon
                        iconShape.style.brushType = self.deepQuery(
                            [data[i], serie], 'itemStyle.normal.areaStyle'
                        ) ? 'both' : 'stroke';
                        legend.setItemShape(name, iconShape);
                    }
                }
                else {
                    // ȫ����ɫ����
                    defaultColor = zr.getColor(i);
                }

                pointList = _getPointList(serie.polarIndex, data[i]);
                // ��ӹյ���״
                _addSymbol(pointList, defaultColor, i, index);
                // ���������״
                _addDataShape(
                    pointList, defaultColor, data[i],
                    index, i, calculable
                );
                _radarDataCounter++;
            }
            
        }

        /**
         * ��ȡ���ݵĵ㼯
         * @param {number} polarIndex
         * @param {Array<Object>} ���������
         * @return {Array<Array<number>>} �㼯
         */
        function _getPointList(polarIndex, dataArr) {
            var pointList = [];
            var vector;
            var polar = component.polar;

            for (var i = 0, l = dataArr.value.length; i < l; i++) {
                vector = polar.getVector(polarIndex, i, dataArr.value[i]);
                if (vector) {
                    pointList.push(vector);
                } 
            }
            return pointList;
        }
        
        /**
         * ��ӹյ�
         * @param {Array<Array<number>>} pointList �㼯
         * @param {string} defaultColor Ĭ�������ɫ
         * @param {object} data ����
         * @param {number} serieIndex
         */
        function _addSymbol(pointList, defaultColor, dataIndex, seriesIndex) {
            var itemShape;
            for (var i = 0, l = pointList.length; i < l; i++) {
                itemShape = self.getSymbolShape(
                    series[seriesIndex], seriesIndex, 
                    series[seriesIndex].data[dataIndex], dataIndex, '', 
                    pointList[i][0],    // x
                    pointList[i][1],    // y
                    _symbol[_radarDataCounter % _symbol.length],
                    defaultColor,
                    '#fff',
                    'vertical'
                );
                itemShape.zlevel = _zlevelBase + 1;
                self.shapeList.push(itemShape);
            }
        }
        
        /**
         * �������ͼ��
         * @param {Array<Array<number>>} pointList �㼯
         * @param {string} defaultColor Ĭ�������ɫ
         * @param {object} data ����
         * @param {number} serieIndex
         * @param {number} dataIndex
         * @param {boolean} calcalable
         */ 
        function _addDataShape(
            pointList, defaultColor, data,
            seriesIndex, dataIndex, calculable
        ) {
            // �༶����
            var queryTarget = [data, serie];
            var nColor = self.deepQuery(
                queryTarget, 'itemStyle.normal.color'
            );
            var nLineWidth = self.deepQuery(
                queryTarget, 'itemStyle.normal.lineStyle.width'
            );
            var nLineType = self.deepQuery(
                queryTarget, 'itemStyle.normal.lineStyle.type'
            );
            var nAreaColor = self.deepQuery(
                queryTarget, 'itemStyle.normal.areaStyle.color'
            );
            var nIsAreaFill = self.deepQuery(
                queryTarget, 'itemStyle.normal.areaStyle'
            );
            var shape = {
                shape : 'polygon',
                zlevel : _zlevelBase,
                style : {
                    pointList   : pointList,
                    brushType   : nIsAreaFill ? 'both' : 'stroke',
                    color       : nAreaColor 
                                  || nColor 
                                  || zrColor.alpha(defaultColor,0.5),
                    strokeColor : nColor || defaultColor,
                    lineWidth   : nLineWidth,
                    lineType    : nLineType
                },
                highlightStyle : {
                    brushType   : self.deepQuery(
                                      queryTarget,
                                      'itemStyle.emphasis.areaStyle'
                                  ) || nIsAreaFill 
                                  ? 'both' : 'stroke',
                    color       : self.deepQuery(
                                      queryTarget,
                                      'itemStyle.emphasis.areaStyle.color'
                                  ) 
                                  || nAreaColor 
                                  || nColor 
                                  || zrColor.alpha(defaultColor,0.5),
                    strokeColor : self.deepQuery(
                                      queryTarget, 'itemStyle.emphasis.color'
                                  ) || nColor || defaultColor,
                    lineWidth   : self.deepQuery(
                                      queryTarget,
                                      'itemStyle.emphasis.lineStyle.width'
                                  ) || nLineWidth,
                    lineType    : self.deepQuery(
                                      queryTarget,
                                      'itemStyle.emphasis.lineStyle.type'
                                  ) || nLineType
                }
            };
            ecData.pack(
                shape,
                series[seriesIndex],    // ϵ��
                seriesIndex,            // ϵ������
                data,                   // ����
                dataIndex,              // ��������
                data.name,              // ��������
                // ����ָ����Ϣ 
                component.polar.getIndicator(series[seriesIndex].polarIndex)
            );
            if (calculable) {
                shape.draggable = true;
                self.setCalculable(shape);
            }
            self.shapeList.push(shape);
        }

        /**
         * ������Χ���ܿ�
         * @param {number} serie������
         */
        function _addDropBox(index) {
            var polarIndex = self.deepQuery(
                _queryTarget, 'polarIndex'
            );
            if (!_dropBoxList[polarIndex]) {
                var shape = component.polar.getDropBox(polarIndex);
                shape.zlevel = _zlevelBase;
                self.setCalculable(shape);
                ecData.pack(shape, series, index, undefined, -1);
                self.shapeList.push(shape);
                _dropBoxList[polarIndex] = true;
            }
        }

        /**
         * �������ק��ȥ�����ػ��෽��
         */
        function ondragend(param, status) {
            if (!self.isDragend || !param.target) {
                // û���ڵ�ǰʵ���Ϸ�����ק��Ϊ��ֱ�ӷ���
                return;
            }

            var target = param.target;      // ����קͼ��Ԫ��

            var seriesIndex = ecData.get(target, 'seriesIndex');
            var dataIndex = ecData.get(target, 'dataIndex');

            // ����ק��ͼ���Ǳ�ͼsector��ɾ������ק�ߵ�����
            component.legend && component.legend.del(
                series[seriesIndex].data[dataIndex].name
            );

            series[seriesIndex].data.splice(dataIndex, 1);

            // ��status = {}��ֵ������
            status.dragOut = true;
            status.needRefresh = true;

            // ��������ק�¼���λ
            self.isDragend = false;

            return;
        }

         /**
         * �������ק������ ���ػ��෽��
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

            var data;
            var legend = component.legend;
            var value;

            if (dataIndex == -1) {
                data = {
                    value : ecData.get(dragged, 'value'),
                    name : ecData.get(dragged, 'name')
                };

                series[seriesIndex].data.push(data);

                legend && legend.add(
                    data.name,
                    dragged.style.color || dragged.style.strokeColor
                );
            }
            else {
                // ���ݱ���ק��ĳ���������ϣ������޸�
                var accMath = require('../util/accMath');
                data = series[seriesIndex].data[dataIndex];
                legend && legend.del(data.name);
                data.name += option.nameConnector
                             + ecData.get(dragged, 'name');
                value = ecData.get(dragged, 'value');
                for (var i = 0 ; i < value.length; i ++) {
                    data.value[i] = accMath.accAdd(data.value[i], value[i]);
                }
                
                legend && legend.add(
                    data.name,
                    dragged.style.color || dragged.style.strokeColor
                );
            }

            // ��status = {}��ֵ������
            status.dragIn = status.dragIn || true;

            // ��������ק�¼���λ
            self.isDrop = false;

            return;
        }

        /**
         * ���캯��Ĭ��ִ�еĳ�ʼ��������Ҳ���ڴ���ʵ����̬�޸�
         * @param {Object} newZr
         * @param {Object} newSeries
         * @param {Object} newComponent
         */
        function init(newOption, newComponent) {
            component = newComponent;
            refresh(newOption);
        }

        /**
         * ˢ��
         */
        function refresh(newOption) {
            if (newOption) {
                option = newOption;
                series = option.series;
            }
            self.clear();
            _buildShape();
        }

        function animation() {
            var duration = self.query(option, 'animationDuration');
            var easing = self.query(option, 'animationEasing');
            var dataIndex;
            var seriesIndex;
            var data;
            var serie;
            var polarIndex;
            var polar = component.polar;
            var center;
            var item;
            var x;
            var y;

            for (var i = 0, l = self.shapeList.length; i < l; i++) {
                if (self.shapeList[i].shape == 'polygon') {
                    item = self.shapeList[i];
                    seriesIndex = ecData.get(item, 'seriesIndex');
                    dataIndex = ecData.get(item, 'dataIndex');

                    serie = series[seriesIndex];
                    data = serie.data[dataIndex];

                    polarIndex = self.deepQuery(
                        [data, serie, option], 'polarIndex');
                    center = polar.getCenter(polarIndex);
                    x = center[0];
                    y = center[1];
                    zr.modShape(
                        self.shapeList[i].id, 
                        {
                            scale : [0.1, 0.1, x, y]
                        },
                        true
                    );
                    
                    zr.animate(item.id, '')
                        .when(
                            (self.query(serie,'animationDuration')
                            || duration)
                            + dataIndex * 100,
                            {scale : [1, 1, x, y]}
                        )
                        .start(
                            self.query(serie, 'animationEasing') || easing
                        );
                }
            }
            
            self.animationMark(duration, easing);
        }

        // ���ػ��෽��
        self.animation = animation;
        
        self.init = init;
        self.refresh = refresh;
        self.ondrop = ondrop;
        self.ondragend = ondragend;

        init(option, component);
    }

    // ͼ��ע��
    require('../chart').define('radar', Radar);
    
    return Radar;
});