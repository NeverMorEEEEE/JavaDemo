/**
 * echartsͼ���ࣺɢ��ͼ
 *
 * @desc echarts����Canvas����Javascriptͼ��⣬�ṩֱ�ۣ��������ɽ������ɸ��Ի����Ƶ�����ͳ��ͼ��
 * @author Kener (@Kener-�ַ�, linzhifeng@baidu.com)
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
    function Scatter(ecConfig, messageCenter, zr, option, component){
        // ����װ��
        var ComponentBase = require('../component/base');
        ComponentBase.call(this, ecConfig, zr);
        // �ɼ�������װ��
        var CalculableBase = require('./calculableBase');
        CalculableBase.call(this, zr, option);

        var zrColor = require('zrender/tool/color');

        var self = this;
        self.type = ecConfig.CHART_TYPE_SCATTER;

        var series;                 // ��������Դ����Ҫ�޸ĸ��Լ��޹ص���

        var _zlevelBase = self.getZlevelBase();
        
        var _sIndex2ColorMap = {};  // seriesĬ����ɫ������seriesIndex������color
        var _symbol = ecConfig.symbolList;
        var _sIndex2ShapeMap = {};  // seriesͼ�����ͣ�seriesIndex������_symbol

        function _buildShape() {
            self.selectedMap = {};
            
            var legend = component.legend;
            var seriesArray = [];
            var serie;                              // ��ʱӳ�����
            var serieName;                          // ��ʱӳ�����
            var iconShape;
            var iconType;
            for (var i = 0, l = series.length; i < l; i++) {
                serie = series[i];
                serieName = serie.name;
                if (serie.type == ecConfig.CHART_TYPE_SCATTER) {
                    series[i] = self.reformOption(series[i]);
                    _sIndex2ShapeMap[i] = self.query(serie, 'symbol')
                                          || _symbol[i % _symbol.length];
                    if (legend){
                        self.selectedMap[serieName] = 
                            legend.isSelected(serieName);
                            
                        _sIndex2ColorMap[i] = 
                            zrColor.alpha(legend.getColor(serieName),0.5);
                            
                        iconShape = legend.getItemShape(serieName);
                        if (iconShape) {
                            // �ص�legend����һ���������icon
                            iconShape.shape = 'icon';
                            var iconType = _sIndex2ShapeMap[i];
                            iconShape.style.brushType = iconType.match('empty') 
                                                        ? 'stroke' : 'both';
                            iconType = iconType.replace('empty', '')
                                               .toLowerCase();
                            if (iconType.match('star')) {
                                iconShape.style.n = 
                                    (iconType.replace('star','') - 0) || 5;
                                iconType = 'star';
                            }
                            
                            if (iconType.match('image')) {
                                iconShape.style.image = iconType.replace(
                                    new RegExp('^image:\\/\\/'), ''
                                );
                                iconShape.style.x += Math.round(
                                    (iconShape.style.width 
                                     - iconShape.style.height) 
                                    / 2
                                );
                                iconShape.style.width = iconShape.style.height;
                                iconType = 'image';
                            }
            
                            iconShape.style.iconType = iconType;
                            legend.setItemShape(serieName, iconShape);
                        }
                    } else {
                        self.selectedMap[serieName] = true;
                        _sIndex2ColorMap[i] = zr.getColor(i);
                    }
                      
                    if (self.selectedMap[serieName]) {
                        seriesArray.push(i);
                    }
                }
            }
            if (seriesArray.length === 0) {
                return;
            }
            _buildSeries(seriesArray);

            for (var i = 0, l = self.shapeList.length; i < l; i++) {
                self.shapeList[i].id = zr.newShapeId(self.type);
                zr.addShape(self.shapeList[i]);
            }
        }

        /**
         * ������Ŀ��Ϊˮƽ�����ɢ��ͼϵ��
         */
        function _buildSeries(seriesArray) {
            var seriesIndex;
            var serie;
            var data;
            var value;
            var xAxis;
            var yAxis; 

            var pointList = {};
            var x;
            var y;
            for (var j = 0, k = seriesArray.length; j < k; j++) {
                seriesIndex = seriesArray[j];
                serie = series[seriesIndex];
                if (serie.data.length === 0) {
                    continue;
                }
                
                xAxis = component.xAxis.getAxis(serie.xAxisIndex || 0);
                yAxis = component.yAxis.getAxis(serie.yAxisIndex || 0);
                
                pointList[seriesIndex] = [];
                for (var i = 0, l = serie.data.length; i < l; i++) {
                    data = serie.data[i];
                    value = typeof data != 'undefined'
                            ? (typeof data.value != 'undefined'
                              ? data.value
                              : data)
                            : '-';
                    if (value == '-' || value.length < 2) {
                        // ���ݸ�ʽ����
                        continue;
                    }
                    x = xAxis.getCoord(value[0]);
                    y = yAxis.getCoord(value[1]);
                    pointList[seriesIndex].push([
                        x,                  // ������
                        y,                  // ������
                        i,                  // ����index
                        data.name || ''     // ����
                    ]);
                }
                self.buildMark(
                    serie,
                    seriesIndex,
                    component
                );
            }
            // console.log(pointList)
            _buildPointList(pointList);
        }

        /**
         * �������ߺ������ϵĹյ�
         */
        function _buildPointList(pointList) {
            var serie;
            var seriesPL;
            var singlePoint;
            var shape;
            for (var seriesIndex in pointList) {
                serie = series[seriesIndex];
                seriesPL = pointList[seriesIndex];                
                if (serie.large && serie.data.length > serie.largeThreshold) {
                    self.shapeList.push(_getLargeSymbol(
                        seriesPL, 
                        self.query(
                            serie, 'itemStyle.normal.color'
                        ) || _sIndex2ColorMap[seriesIndex]
                    ));
                    continue;
                }

                /*
                 * pointlist=[
                 *      0  x,
                 *      1  y, 
                 *      2  ����index
                 *      3  ����
                 * ]
                 */
                
                for (var i = 0, l = seriesPL.length; i < l; i++) {
                    singlePoint = seriesPL[i];
                    shape = _getSymbol(
                        seriesIndex,    // seriesIndex
                        singlePoint[2], // dataIndex
                        singlePoint[3], // name
                        singlePoint[0], // x
                        singlePoint[1] // y
                    );
                    shape && self.shapeList.push(shape);
                }
            }
            // console.log(self.shapeList)
        }

        /**
         * ��������ͼ�ϵĹյ�ͼ��
         */
        function _getSymbol(seriesIndex, dataIndex, name, x, y) {
            var serie = series[seriesIndex];
            var data = serie.data[dataIndex];
            
            var dataRange = component.dataRange;
            var rangColor;
            if (dataRange) {
                rangColor = isNaN(data[2]) 
                            ? _sIndex2ColorMap[seriesIndex]
                            : dataRange.getColor(data[2]);
                if (!rangColor) {
                    return null;
                }
            }
            else {
                rangColor = _sIndex2ColorMap[seriesIndex];
            }
            
            var itemShape = self.getSymbolShape(
                serie, seriesIndex, data, dataIndex, name, 
                x, y,
                _sIndex2ShapeMap[seriesIndex], 
                rangColor,
                'rgba(0,0,0,0)',
                'vertical'
            );
            itemShape.zlevel = _zlevelBase;
            itemShape._mark = false; // ��mark
            itemShape._main = true;
            return itemShape;
        }
        
        function _getLargeSymbol(symbolList, nColor) {
            return {
                shape : 'symbol',
                zlevel : _zlevelBase,
                _main : true,
                hoverable: false,
                style : {
                    pointList : symbolList,
                    color : nColor,
                    strokeColor : nColor
                }
            };
        }
        
        // λ��ת��
        function getMarkCoord(serie, seriesIndex, mpData) {
            var xAxis = component.xAxis.getAxis(serie.xAxisIndex);
            var yAxis = component.yAxis.getAxis(serie.yAxisIndex);
            
            return [
                typeof mpData.xAxis != 'string' 
                && xAxis.getCoordByIndex
                ? xAxis.getCoordByIndex(mpData.xAxis || 0)
                : xAxis.getCoord(mpData.xAxis || 0),
                
                typeof mpData.yAxis != 'string' 
                && yAxis.getCoordByIndex
                ? yAxis.getCoordByIndex(mpData.yAxis || 0)
                : yAxis.getCoord(mpData.yAxis || 0)
            ];
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
        
        /**
         * ֵ����Ӧ
         * @param {Object} param
         * @param {Object} status
         */
        function ondataRange(param, status) {
            if (component.dataRange) {
                refresh();
                status.needRefresh = true;
            }
            return;
        }

        /**
         * �����趨
         */
        function animation() {
            var duration = self.query(option, 'animationDuration');
            var easing = self.query(option, 'animationEasing');
            var x;
            var y;
            var serie;

            for (var i = 0, l = self.shapeList.length; i < l; i++) {
                if (self.shapeList[i]._main) {
                    if (self.shapeList[i].shape == 'symbol') {
                        continue;
                    }
                    serie = series[self.shapeList[i]._seriesIndex];
                    x = self.shapeList[i]._x || 0;
                    y = self.shapeList[i]._y || 0;
                    zr.modShape(
                        self.shapeList[i].id, 
                        {
                            scale : [0, 0, x, y]
                        },
                        true
                    );
                    zr.animate(self.shapeList[i].id, '')
                        .when(
                            (self.query(serie,'animationDuration')
                            || duration),
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
        self.getMarkCoord = getMarkCoord;
        self.animation = animation;
        
        self.init = init;
        self.refresh = refresh;
        self.ondataRange = ondataRange;

        init(option, component);
    }
    
    // ��̬��չzrender shape��symbol
    require('../util/shape/symbol');
    
    // ��ע��
    require('../chart').define('scatter', Scatter);
    
    return Scatter;
});