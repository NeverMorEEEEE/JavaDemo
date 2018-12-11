/**
 * echartsͼ���ࣺK��ͼ
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
    function K(ecConfig, messageCenter, zr, option, component){
        // ����װ��
        var ComponentBase = require('../component/base');
        ComponentBase.call(this, ecConfig, zr);
        // �ɼ�������װ��
        var CalculableBase = require('./calculableBase');
        CalculableBase.call(this, zr, option);

        var ecData = require('../util/ecData');
        
        var self = this;
        self.type = ecConfig.CHART_TYPE_K;

        var series;                 // ��������Դ����Ҫ�޸ĸ��Լ��޹ص���

        var _zlevelBase = self.getZlevelBase();

        function _buildShape() {
            self.selectedMap = {};

            // ˮƽ��ֱ˫��series���� ��position������seriesIndex
            var _position2sIndexMap = {
                top : [],
                bottom : []
            };
            var xAxis;
            for (var i = 0, l = series.length; i < l; i++) {
                if (series[i].type == ecConfig.CHART_TYPE_K) {
                    series[i] = self.reformOption(series[i]);
                    xAxis = component.xAxis.getAxis(series[i].xAxisIndex);
                    if (xAxis.type == ecConfig.COMPONENT_TYPE_AXIS_CATEGORY
                    ) {
                        _position2sIndexMap[xAxis.getPosition()].push(i);
                    }
                }
            }
            //console.log(_position2sIndexMap)
            for (var position in _position2sIndexMap) {
                if (_position2sIndexMap[position].length > 0) {
                    _buildSinglePosition(
                        position, _position2sIndexMap[position]
                    );
                }
            }

            for (var i = 0, l = self.shapeList.length; i < l; i++) {
                self.shapeList[i].id = zr.newShapeId(self.type);
                zr.addShape(self.shapeList[i]);
            }
        }

        /**
         * �������������ϵ�K��ͼ
         *
         * @param {number} seriesIndex ϵ������
         */
        function _buildSinglePosition(position, seriesArray) {
            var mapData = _mapData(seriesArray);
            var locationMap = mapData.locationMap;
            var maxDataLength = mapData.maxDataLength;

            if (maxDataLength === 0 || locationMap.length === 0) {
                return;
            }
            _buildHorizontal(maxDataLength, locationMap);

            for (var i = 0, l = seriesArray.length; i < l; i++) {
                self.buildMark(
                    series[seriesArray[i]],
                    seriesArray[i],
                    component
                );
            }
        }

        /**
         * ��������
         * ����λ��ӳ�䵽ϵ������
         */
        function _mapData(seriesArray) {
            var serie;                              // ��ʱӳ�����
            var serieName;                          // ��ʱӳ�����
            var legend = component.legend;
            var locationMap = [];                   // ��Ҫ���صĶ���������λ��ӳ�䵽ϵ������
            var maxDataLength = 0;                  // ��Ҫ���صĶ�����������ݳ���
            // ������Ҫ��ʾ�ĸ����ͷ���λ�ò�������������ṹ��
            for (var i = 0, l = seriesArray.length; i < l; i++) {
                serie = series[seriesArray[i]];
                serieName = serie.name;
                if (legend){
                    self.selectedMap[serieName] = legend.isSelected(serieName);
                } else {
                    self.selectedMap[serieName] = true;
                }

                if (self.selectedMap[serieName]) {
                    locationMap.push(seriesArray[i]);
                }
                // ��ְ����һ����󳤶�
                maxDataLength = Math.max(maxDataLength, serie.data.length);
            }
            return {
                locationMap : locationMap,
                maxDataLength : maxDataLength
            };
        }

        /**
         * ������Ŀ��Ϊˮƽ�����K��ͼϵ��
         */
        function _buildHorizontal(maxDataLength, locationMap) {
            // ȷ����Ŀ�����ֵ�ᣬͬһ���������һ������
            var seriesIndex;
            var serie;
            var xAxisIndex;
            var categoryAxis;
            var yAxisIndex; // ��ֵ�����
            var valueAxis;  // ��ֵ�����

            var pointList = {};
            var candleWidth;
            var data;
            var value;
            var barMaxWidth;
            for (var j = 0, k = locationMap.length; j < k; j++) {
                seriesIndex = locationMap[j];
                serie = series[seriesIndex];
                
                xAxisIndex = serie.xAxisIndex || 0;
                categoryAxis = component.xAxis.getAxis(xAxisIndex);
                candleWidth = serie.barWidth 
                              || Math.floor(categoryAxis.getGap() / 2);
                barMaxWidth = serie.barMaxWidth;
                if (barMaxWidth && barMaxWidth < candleWidth) {
                    candleWidth = barMaxWidth;
                }
                yAxisIndex = serie.yAxisIndex || 0;
                valueAxis = component.yAxis.getAxis(yAxisIndex);
                
                pointList[seriesIndex] = [];
                for (var i = 0, l = maxDataLength; i < l; i++) {
                    if (typeof categoryAxis.getNameByIndex(i) 
                        == 'undefined'
                    ) {
                        // ϵ�����ݳ�����Ŀ�᳤��
                        break;
                    }
                    
                    data = serie.data[i];
                    value = typeof data != 'undefined'
                            ? (typeof data.value != 'undefined'
                              ? data.value
                              : data)
                            : '-';
                    if (value == '-' || value.length != 4) {
                        // ���ݸ�ʽ����
                        continue;
                    }
                    pointList[seriesIndex].push([
                        categoryAxis.getCoordByIndex(i),    // ������
                        candleWidth,
                        valueAxis.getCoord(value[0]),       // �����꣺����
                        valueAxis.getCoord(value[1]),       // �����꣺����
                        valueAxis.getCoord(value[2]),       // �����꣺���
                        valueAxis.getCoord(value[3]),       // �����꣺���
                        i,                                  // ����index
                        categoryAxis.getNameByIndex(i)      // ��Ŀ����
                    ]);
                }
            }
            // console.log(pointList)
            _buildKLine(pointList);
        }

        /**
         * ����K��
         */
        function _buildKLine(pointList) {
            // normal:
            var nLineWidth;
            var nLineColor;
            var nLineColor0;    // ����
            var nColor;
            var nColor0;        // ����
            
            // emphasis:
            var eLineWidth;
            var eLineColor;
            var eLineColor0;
            var eColor;
            var eColor0;

            var serie;
            var queryTarget;
            var data;
            var seriesPL;
            var singlePoint;
            var candleType;

            for (var seriesIndex = 0, len = series.length;
                seriesIndex < len;
                seriesIndex++
            ) {
                serie = series[seriesIndex];
                seriesPL = pointList[seriesIndex];
                if (serie.type == ecConfig.CHART_TYPE_K
                    && typeof seriesPL != 'undefined'
                ) {
                    // �༶����
                    queryTarget = serie;
                    nLineWidth = self.query(
                        queryTarget, 'itemStyle.normal.lineStyle.width'
                    );
                    nLineColor = self.query(
                        queryTarget, 'itemStyle.normal.lineStyle.color'
                    );
                    nLineColor0 = self.query(
                        queryTarget, 'itemStyle.normal.lineStyle.color0'
                    );
                    nColor = self.query(
                        queryTarget, 'itemStyle.normal.color'
                    );
                    nColor0 = self.query(
                        queryTarget, 'itemStyle.normal.color0'
                    );
                    
                    eLineWidth = self.query(
                        queryTarget, 'itemStyle.emphasis.lineStyle.width'
                    );
                    eLineColor = self.query(
                        queryTarget, 'itemStyle.emphasis.lineStyle.color'
                    );
                    eLineColor0 = self.query(
                        queryTarget, 'itemStyle.emphasis.lineStyle.color0'
                    );
                    eColor = self.query(
                        queryTarget, 'itemStyle.emphasis.color'
                    );
                    eColor0 = self.query(
                        queryTarget, 'itemStyle.emphasis.color0'
                    );

                    /*
                     * pointlist=[
                     *      0  x,
                     *      1  width, 
                     *      2  y0,
                     *      3  y1,
                     *      4  y2,
                     *      5  y3,
                     *      6  dataIndex,
                     *      7  categoryName
                     * ]
                     */
                    for (var i = 0, l = seriesPL.length; i < l; i++) {
                        singlePoint = seriesPL[i];
                        data = serie.data[singlePoint[6]];
                        queryTarget = data;
                        candleType = singlePoint[3] < singlePoint[2];
                        self.shapeList.push(_getCandle(
                            seriesIndex,    // seriesIndex
                            singlePoint[6], // dataIndex
                            singlePoint[7], // name
                            
                            singlePoint[0], // x
                            singlePoint[1], // width
                            singlePoint[2], // y����
                            singlePoint[3], // y����
                            singlePoint[4], // y���
                            singlePoint[5], // y���
                            
                            // �����ɫ
                            candleType
                            ? (self.query(          // ��
                                   queryTarget, 'itemStyle.normal.color'
                               ) || nColor)
                            : (self.query(          // ��
                                   queryTarget, 'itemStyle.normal.color0'
                               ) || nColor0),
                            
                            // �߿�
                            self.query(
                               queryTarget, 'itemStyle.normal.lineStyle.width'
                            ) || nLineWidth,
                            
                            // ��ɫ
                            candleType
                            ? (self.query(          // ��
                                   queryTarget,
                                   'itemStyle.normal.lineStyle.color'
                               ) || nLineColor)
                            : (self.query(          // ��
                                   queryTarget,
                                   'itemStyle.normal.lineStyle.color0'
                               ) || nLineColor0),
                            
                            //------------����
                            
                            // �����ɫ
                            candleType
                            ? (self.query(          // ��
                                   queryTarget, 'itemStyle.emphasis.color'
                               ) || eColor || nColor)
                            : (self.query(          // ��
                                   queryTarget, 'itemStyle.emphasis.color0'
                               ) || eColor0 || nColor0),
                            
                            // �߿�
                            self.query(
                               queryTarget, 'itemStyle.emphasis.lineStyle.width'
                            ) || eLineWidth || nLineWidth,
                            
                            // ��ɫ
                            candleType
                            ? (self.query(          // ��
                                   queryTarget,
                                   'itemStyle.emphasis.lineStyle.color'
                               ) || eLineColor || nLineColor)
                            : (self.query(          // ��
                                   queryTarget,
                                   'itemStyle.emphasis.lineStyle.color0'
                               ) || eLineColor0 || nLineColor0)
                        ));
                    }
                }
            }
            // console.log(self.shapeList)
        }

        /**
         * ����K��ͼ�ϵ�ͼ��
         */
        function _getCandle(
            seriesIndex, dataIndex, name, 
            x, width, y0, y1, y2, y3, 
            nColor, nLinewidth, nLineColor, 
            eColor, eLinewidth, eLineColor
        ) {
            var itemShape = {
                shape : 'candle',
                zlevel : _zlevelBase,
                clickable: true,
                style : {
                    x : x,
                    y : [y0, y1, y2, y3],
                    width : width,
                    color : nColor,
                    strokeColor : nLineColor,
                    lineWidth : nLinewidth,
                    brushType : 'both'
                },
                highlightStyle : {
                    color : eColor,
                    strokeColor : eLineColor,
                    lineWidth : eLinewidth
                },
                _seriesIndex: seriesIndex
            };
            ecData.pack(
                itemShape,
                series[seriesIndex], seriesIndex,
                series[seriesIndex].data[dataIndex], dataIndex,
                name
            );

            return itemShape;
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
         * �����趨
         */
        function addDataAnimation(params) {
            var aniMap = {}; // seriesIndex��������
            for (var i = 0, l = params.length; i < l; i++) {
                aniMap[params[i][0]] = params[i];
            }
            var x;
            var dx;
            var y;
            var serie;
            var seriesIndex;
            var dataIndex;
             for (var i = 0, l = self.shapeList.length; i < l; i++) {
                seriesIndex = self.shapeList[i]._seriesIndex;
                if (aniMap[seriesIndex] && !aniMap[seriesIndex][3]) {
                    // ������ɾ�������ƶ��Ķ���
                    if (self.shapeList[i].shape == 'candle') {
                        dataIndex = ecData.get(self.shapeList[i], 'dataIndex');
                        serie = series[seriesIndex];
                        if (aniMap[seriesIndex][2] 
                            && dataIndex == serie.data.length - 1
                        ) {
                            // ��ͷ����ɾ��ĩβ
                            zr.delShape(self.shapeList[i].id);
                            continue;
                        }
                        else if (!aniMap[seriesIndex][2] && dataIndex === 0) {
                            // ��β����ɾ��ͷ��
                            zr.delShape(self.shapeList[i].id);
                            continue;
                        }
                        dx = component.xAxis.getAxis(
                                serie.xAxisIndex || 0
                             ).getGap();
                        x = aniMap[seriesIndex][2] ? dx : -dx;
                        y = 0;
                        zr.animate(self.shapeList[i].id, '')
                            .when(
                                500,
                                {position : [x, y]}
                            )
                            .start();
                    }
                }
            }
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
                if (self.shapeList[i].shape == 'candle') {
                    serie = series[self.shapeList[i]._seriesIndex];
                    x = self.shapeList[i].style.x;
                    y = self.shapeList[i].style.y[0];
                    zr.modShape(
                        self.shapeList[i].id,
                        { scale : [1, 0, x, y] },
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
        self.addDataAnimation = addDataAnimation;

        init(option, component);
    }
    
    // ��̬��չzrender shape��candle
    require('../util/shape/candle');

    // ͼ��ע��
    require('../chart').define('k', K);
    
    return K;
});