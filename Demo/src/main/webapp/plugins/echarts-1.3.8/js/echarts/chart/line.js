/**
 * echartsͼ���ࣺ����ͼ
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
    function Line(ecConfig, messageCenter, zr, option, component){
        // ����װ��
        var ComponentBase = require('../component/base');
        ComponentBase.call(this, ecConfig, zr);
        // �ɼ�������װ��
        var CalculableBase = require('./calculableBase');
        CalculableBase.call(this, zr, option);

        var zrColor = require('zrender/tool/color');

        var self = this;
        self.type = ecConfig.CHART_TYPE_LINE;

        var series;                 // ��������Դ����Ҫ�޸ĸ��Լ��޹ص���

        var _zlevelBase = self.getZlevelBase();

        var finalPLMap = {}; // ��ɵ�point list(PL)
        var _sIndex2ColorMap = {};  // seriesĬ����ɫ������seriesIndex������color
        var _symbol = ecConfig.symbolList;
        var _sIndex2ShapeMap = {};  // series�յ�ͼ�����ͣ�seriesIndex������shape type

        require('zrender/shape').get('icon').define(
            'legendLineIcon', legendLineIcon
        );
        
        function _buildShape() {
            finalPLMap = {};
            self.selectedMap = {};

            // ˮƽ��ֱ˫��series���� ��position������seriesIndex
            var _position2sIndexMap = {
                top : [],
                bottom : [],
                left : [],
                right : []
            };
            var xAxisIndex;
            var yAxisIndex;
            var xAxis;
            var yAxis;
            for (var i = 0, l = series.length; i < l; i++) {
                if (series[i].type == self.type) {
                    series[i] = self.reformOption(series[i]);
                    xAxisIndex = series[i].xAxisIndex;
                    yAxisIndex = series[i].yAxisIndex;
                    xAxis = component.xAxis.getAxis(xAxisIndex);
                    yAxis = component.yAxis.getAxis(yAxisIndex);
                    if (xAxis.type == ecConfig.COMPONENT_TYPE_AXIS_CATEGORY
                    ) {
                        _position2sIndexMap[xAxis.getPosition()].push(i);
                    }
                    else if (yAxis.type == ecConfig.COMPONENT_TYPE_AXIS_CATEGORY
                    ) {
                        _position2sIndexMap[yAxis.getPosition()].push(i);
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
         * �������������ϵ�����ͼ
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

            switch (position) {
                case 'bottom' :
                case 'top' :
                    _buildHorizontal(maxDataLength, locationMap);
                    break;
                case 'left' :
                case 'right' :
                    _buildVertical(maxDataLength, locationMap);
                    break;
            }
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
            var dataIndex = 0;                      // �ѵ���������λ��ӳ��
            var stackMap = {};                      // �ѵ�����λ��ӳ�䣬�ѵ����ڶ�ά�еĵڼ���
            var magicStackKey = '__kener__stack__'; // �ѵ��������Ƕѵ����ݰ���һ�ѵ�����
            var stackKey;                           // ��ʱӳ�����
            var serieName;                          // ��ʱӳ�����
            var legend = component.legend;
            var locationMap = [];                   // ��Ҫ���صĶ���������λ��ӳ�䵽ϵ������
            var maxDataLength = 0;                  // ��Ҫ���صĶ�����������ݳ���
            var iconShape;
            // ������Ҫ��ʾ�ĸ����ͷ���λ�ò�������������ṹ��
            for (var i = 0, l = seriesArray.length; i < l; i++) {
                serie = series[seriesArray[i]];
                serieName = serie.name;
                
                _sIndex2ShapeMap[seriesArray[i]]
                    = _sIndex2ShapeMap[seriesArray[i]]
                      || self.query(serie,'symbol')
                      || _symbol[i % _symbol.length];
                      
                if (legend){
                    self.selectedMap[serieName] = legend.isSelected(serieName);
                    
                    _sIndex2ColorMap[seriesArray[i]]
                        = legend.getColor(serieName);
                        
                    iconShape = legend.getItemShape(serieName);
                    if (iconShape) {
                        // �ص�legend����һ���������icon
                        iconShape.shape = 'icon';
                        iconShape.style.iconType = 'legendLineIcon';
                        iconShape.style.symbol = 
                            _sIndex2ShapeMap[seriesArray[i]];
                        
                        legend.setItemShape(serieName, iconShape);
                    }
                } else {
                    self.selectedMap[serieName] = true;
                    _sIndex2ColorMap[seriesArray[i]]
                        = zr.getColor(seriesArray[i]);
                }

                if (self.selectedMap[serieName]) {
                    stackKey = serie.stack || (magicStackKey + seriesArray[i]);
                    if (typeof stackMap[stackKey] == 'undefined') {
                        stackMap[stackKey] = dataIndex;
                        locationMap[dataIndex] = [seriesArray[i]];
                        dataIndex++;
                    }
                    else {
                        // �Ѿ�������λ�þ��ƽ�ȥ����
                        locationMap[stackMap[stackKey]].push(seriesArray[i]);
                    }
                }
                // ��ְ����һ����󳤶�
                maxDataLength = Math.max(maxDataLength, serie.data.length);
            }
            /* �������
            var s = '';
            for (var i = 0, l = maxDataLength; i < l; i++) {
                s = '[';
                for (var j = 0, k = locationMap.length; j < k; j++) {
                    s +='['
                    for (var m = 0, n = locationMap[j].length - 1; m < n; m++) {
                        s += series[locationMap[j][m]].data[i] + ','
                    }
                    s += series[locationMap[j][locationMap[j].length - 1]]
                         .data[i];
                    s += ']'
                }
                s += ']';
                console.log(s);
            }
            console.log(locationMap)
            */

            return {
                locationMap : locationMap,
                maxDataLength : maxDataLength
            };
        }

        /**
         * ������Ŀ��Ϊˮƽ���������ͼϵ��
         */
        function _buildHorizontal(maxDataLength, locationMap) {
            // ȷ����Ŀ�����ֵ�ᣬͬһ���������һ������
            var seriesIndex = locationMap[0][0];
            var serie = series[seriesIndex];
            var xAxisIndex = serie.xAxisIndex;
            var categoryAxis = component.xAxis.getAxis(xAxisIndex);
            var yAxisIndex; // ��ֵ�����
            var valueAxis;  // ��ֵ�����

            var x;
            var y;
            var lastYP; // ����ѵ�����
            var baseYP;
            var lastYN; // ����ѵ�����
            var baseYN;
            //var finalPLMap = {}; // ��ɵ�point list(PL)
            var curPLMap = {};   // ���ڼ�¼��point list(PL)
            var data;
            var value;
            for (var i = 0, l = maxDataLength; i < l; i++) {
                if (typeof categoryAxis.getNameByIndex(i) == 'undefined') {
                    // ϵ�����ݳ�����Ŀ�᳤��
                    break;
                }
                x = categoryAxis.getCoordByIndex(i);
                for (var j = 0, k = locationMap.length; j < k; j++) {
                    // �ѵ������õ�һ��valueAxis
                    yAxisIndex = series[locationMap[j][0]].yAxisIndex || 0;
                    valueAxis = component.yAxis.getAxis(yAxisIndex);
                    baseYP = lastYP = baseYN = lastYN = valueAxis.getCoord(0);
                    for (var m = 0, n = locationMap[j].length; m < n; m++) {
                        seriesIndex = locationMap[j][m];
                        serie = series[seriesIndex];
                        data = serie.data[i];
                        value = typeof data != 'undefined'
                                ? (typeof data.value != 'undefined'
                                  ? data.value
                                  : data)
                                : '-';
                        curPLMap[seriesIndex] = curPLMap[seriesIndex] || [];
                        if (value == '-') {
                            // ������������ڼ�¼��curPLMap��ӵ�finalPLMap��
                            if (curPLMap[seriesIndex].length > 0) {
                                finalPLMap[seriesIndex] =
                                    finalPLMap[seriesIndex] || [];

                                finalPLMap[seriesIndex].push(
                                    curPLMap[seriesIndex]
                                );

                                curPLMap[seriesIndex] = [];
                            }
                            continue;
                        }
                        y = valueAxis.getCoord(value);
                        if (value >= 0) {
                            // ����ѵ�
                            lastYP -= (baseYP - y);
                            y = lastYP;
                        }
                        else if (value < 0){
                            // ����ѵ�
                            lastYN += y - baseYN;
                            y = lastYN;
                        }
                        curPLMap[seriesIndex].push(
                            [x, y, i, categoryAxis.getNameByIndex(i), x, baseYP]
                        );
                    }
                }
                // ��������ݵ���ק��ʾ
                lastYP = component.grid.getY();
                var symbolSize;
                for (var j = 0, k = locationMap.length; j < k; j++) {
                    for (var m = 0, n = locationMap[j].length; m < n; m++) {
                        seriesIndex = locationMap[j][m];
                        serie = series[seriesIndex];
                        data = serie.data[i];
                        value = typeof data != 'undefined'
                                ? (typeof data.value != 'undefined'
                                  ? data.value
                                  : data)
                                : '-';
                        if (value != '-') {
                            // ֻ���Ŀ�����
                            continue;
                        }
                        if (self.deepQuery(
                                [data, serie, option], 'calculable'
                            )
                        ) {
                            symbolSize = self.deepQuery(
                                [data, serie],
                                'symbolSize'
                            );
                            lastYP += symbolSize * 2 + 5;
                            y = lastYP;
                            self.shapeList.push(_getCalculableItem(
                                seriesIndex, i, categoryAxis.getNameByIndex(i),
                                x, y, 'horizontal'
                            ));
                        }
                    }
                }
            }

            // ��ʣ��δ��ɵ�curPLMapȫ����ӵ�finalPLMap��
            for (var sId in curPLMap) {
                if (curPLMap[sId].length > 0) {
                    finalPLMap[sId] = finalPLMap[sId] || [];
                    finalPLMap[sId].push(curPLMap[sId]);
                    curPLMap[sId] = [];
                }
            }
            _buildBorkenLine(finalPLMap, categoryAxis, 'horizontal');
        }

        /**
         * ������Ŀ��Ϊ��ֱ���������ͼϵ��
         */
        function _buildVertical(maxDataLength, locationMap) {
            // ȷ����Ŀ�����ֵ�ᣬͬһ���������һ������
            var seriesIndex = locationMap[0][0];
            var serie = series[seriesIndex];
            var yAxisIndex = serie.yAxisIndex;
            var categoryAxis = component.yAxis.getAxis(yAxisIndex);
            var xAxisIndex; // ��ֵ�����
            var valueAxis;  // ��ֵ�����

            var x;
            var y;
            var lastXP; // ����ѵ�����
            var baseXP;
            var lastXN; // ����ѵ�����
            var baseXN;
            //var finalPLMap = {}; // ��ɵ�point list(PL)
            var curPLMap = {};   // ���ڼ�¼��point list(PL)
            var data;
            var value;
            for (var i = 0, l = maxDataLength; i < l; i++) {
                if (typeof categoryAxis.getNameByIndex(i) == 'undefined') {
                    // ϵ�����ݳ�����Ŀ�᳤��
                    break;
                }
                y = categoryAxis.getCoordByIndex(i);
                for (var j = 0, k = locationMap.length; j < k; j++) {
                    // �ѵ������õ�һ��valueAxis
                    xAxisIndex = series[locationMap[j][0]].xAxisIndex || 0;
                    valueAxis = component.xAxis.getAxis(xAxisIndex);
                    baseXP = lastXP = baseXN = lastXN = valueAxis.getCoord(0);
                    for (var m = 0, n = locationMap[j].length; m < n; m++) {
                        seriesIndex = locationMap[j][m];
                        serie = series[seriesIndex];
                        data = serie.data[i];
                        value = typeof data != 'undefined'
                                ? (typeof data.value != 'undefined'
                                  ? data.value
                                  : data)
                                : '-';
                        curPLMap[seriesIndex] = curPLMap[seriesIndex] || [];
                        if (value == '-') {
                            // ������������ڼ�¼��curPLMap��ӵ�finalPLMap��
                            if (curPLMap[seriesIndex].length > 0) {
                                finalPLMap[seriesIndex] =
                                    finalPLMap[seriesIndex] || [];

                                finalPLMap[seriesIndex].push(
                                    curPLMap[seriesIndex]
                                );

                                curPLMap[seriesIndex] = [];
                            }
                            continue;
                        }
                        x = valueAxis.getCoord(value);
                        if (value >= 0) {
                            // ����ѵ�
                            lastXP += x - baseXP;
                            x = lastXP;
                        }
                        else if (value < 0){
                            // ����ѵ�
                            lastXN -= baseXN - x;
                            x = lastXN;
                        }
                        curPLMap[seriesIndex].push(
                            [x, y, i, categoryAxis.getNameByIndex(i), baseXP, y]
                        );
                    }
                }
                // ��������ݵ���ק��ʾ
                lastXP = component.grid.getXend();
                var symbolSize;
                for (var j = 0, k = locationMap.length; j < k; j++) {
                    for (var m = 0, n = locationMap[j].length; m < n; m++) {
                        seriesIndex = locationMap[j][m];
                        serie = series[seriesIndex];
                        data = serie.data[i];
                        value = typeof data != 'undefined'
                                ? (typeof data.value != 'undefined'
                                  ? data.value
                                  : data)
                                : '-';
                        if (value != '-') {
                            // ֻ���Ŀ�����
                            continue;
                        }
                        if (self.deepQuery(
                                [data, serie, option], 'calculable'
                            )
                        ) {
                            symbolSize = self.deepQuery(
                                [data, serie],
                                'symbolSize'
                            );
                            lastXP -= symbolSize * 2 + 5;
                            x = lastXP;
                            self.shapeList.push(_getCalculableItem(
                                seriesIndex, i, categoryAxis.getNameByIndex(i),
                                x, y, 'vertical'
                            ));
                        }
                    }
                }
            }

            // ��ʣ��δ��ɵ�curPLMapȫ����ӵ�finalPLMap��
            for (var sId in curPLMap) {
                if (curPLMap[sId].length > 0) {
                    finalPLMap[sId] = finalPLMap[sId] || [];
                    finalPLMap[sId].push(curPLMap[sId]);
                    curPLMap[sId] = [];
                }
            }
            _buildBorkenLine(finalPLMap, categoryAxis, 'vertical');
        }

        /**
         * �������ߺ������ϵĹյ�
         */
        function _buildBorkenLine(pointList, categoryAxis, orient) {
            var defaultColor;

            // �������
            var lineWidth;
            var lineType;
            var lineColor;
            var normalColor;

            // ������
            var isFill;
            var fillNormalColor;

            var serie;
            var data;
            var seriesPL;
            var singlePL;

            // �ѵ�������󣬷�˳�򹹽�
            for (var seriesIndex = series.length - 1;
                seriesIndex >= 0;
                seriesIndex--
            ) {
                serie = series[seriesIndex];
                seriesPL = pointList[seriesIndex];
                if (serie.type == self.type && typeof seriesPL != 'undefined') {
                    defaultColor = _sIndex2ColorMap[seriesIndex];
                    // �༶����
                    lineWidth = self.query(
                        serie, 'itemStyle.normal.lineStyle.width'
                    );
                    lineType = self.query(
                        serie, 'itemStyle.normal.lineStyle.type'
                    );
                    lineColor = self.query(
                        serie, 'itemStyle.normal.lineStyle.color'
                    );
                    normalColor = self.query(
                        serie, 'itemStyle.normal.color'
                    );

                    isFill = typeof self.query(
                        serie, 'itemStyle.normal.areaStyle'
                    ) != 'undefined';

                    fillNormalColor = self.query(
                        serie, 'itemStyle.normal.areaStyle.color'
                    );

                    for (var i = 0, l = seriesPL.length; i < l; i++) {
                        singlePL = seriesPL[i];
                        for (var j = 0, k = singlePL.length; j < k; j++) {
                            data = serie.data[singlePL[j][2]];
                            if (self.deepQuery(
                                    [data, serie], 'showAllSymbol'
                                ) // ȫ��ʾ
                                || (categoryAxis.isMainAxis(singlePL[j][2])
                                    && self.deepQuery(
                                           [data, serie], 'symbol'
                                       ) != 'none'
                                   ) // ����ǿ�
                                || self.deepQuery(
                                        [data, serie, option],
                                        'calculable'
                                   ) // �ɼ���
                            ) {
                                self.shapeList.push(_getSymbol(
                                    seriesIndex,
                                    singlePL[j][2], // dataIndex
                                    singlePL[j][3], // name
                                    singlePL[j][0], // x
                                    singlePL[j][1], // y
                                    orient
                                ));
                            }

                        }
                        // ����ͼ
                        self.shapeList.push({
                            shape : 'brokenLine',
                            zlevel : _zlevelBase,
                            style : {
                                miterLimit: lineWidth,
                                pointList : singlePL,
                                strokeColor : lineColor
                                              || normalColor 
                                              || defaultColor,
                                lineWidth : lineWidth,
                                lineType : lineType,
                                smooth : _getSmooth(serie.smooth),
                                shadowColor : self.query(
                                  serie,
                                  'itemStyle.normal.lineStyle.shadowColor'
                                ),
                                shadowBlur: self.query(
                                  serie,
                                  'itemStyle.normal.lineStyle.shadowBlur'
                                ),
                                shadowOffsetX: self.query(
                                  serie,
                                  'itemStyle.normal.lineStyle.shadowOffsetX'
                                ),
                                shadowOffsetY: self.query(
                                  serie,
                                  'itemStyle.normal.lineStyle.shadowOffsetY'
                                )
                            },
                            hoverable : false,
                            _main : true,
                            _seriesIndex : seriesIndex,
                            _orient : orient
                        });
                        
                        if (isFill) {
                            self.shapeList.push({
                                shape : 'halfSmoothPolygon',
                                zlevel : _zlevelBase,
                                style : {
                                    miterLimit: lineWidth,
                                    pointList : singlePL.concat([
                                        [
                                            singlePL[singlePL.length - 1][4],
                                            singlePL[singlePL.length - 1][5] - 2
                                        ],
                                        [
                                            singlePL[0][4],
                                            singlePL[0][5] - 2
                                        ]
                                    ]),
                                    brushType : 'fill',
                                    smooth : _getSmooth(serie.smooth),
                                    color : fillNormalColor
                                            ? fillNormalColor
                                            : zrColor.alpha(defaultColor,0.5)
                                },
                                hoverable : false,
                                _main : true,
                                _seriesIndex : seriesIndex,
                                _orient : orient
                            });
                        }
                    }
                }
            }
        }
        
        function _getSmooth(isSmooth/*, pointList, orient*/) {
            if (isSmooth) {
                /* ����ѧ��������0.3ͨ����
                var delta;
                if (orient == 'horizontal') {
                    delta = Math.abs(pointList[0][0] - pointList[1][0]);
                }
                else {
                    delta = Math.abs(pointList[0][1] - pointList[1][1]);
                }
                */
                return 0.3;
            }
            else {
                return 0;
            }
        }

        /**
         * ���ɿ���������Ŀɼ�����ʾͼ��
         */
        function _getCalculableItem(
            seriesIndex, dataIndex, name, x, y, orient
        ) {
            var color = series[seriesIndex].calculableHolderColor
                        || ecConfig.calculableHolderColor;

            var itemShape = _getSymbol(
                seriesIndex, dataIndex, name,
                x, y, orient
            );
            itemShape.style.color = color;
            itemShape.style.strokeColor = color;
            itemShape.rotation = [0,0];
            itemShape.hoverable = false;
            itemShape.draggable = false;
            itemShape.style.text = undefined;

            return itemShape;
        }

        /**
         * ��������ͼ�ϵĹյ�ͼ��
         */
        function _getSymbol(seriesIndex, dataIndex, name, x, y, orient) {
            var serie = series[seriesIndex];
            var data = serie.data[dataIndex];
            
            var itemShape = self.getSymbolShape(
                serie, seriesIndex, data, dataIndex, name, 
                x, y,
                _sIndex2ShapeMap[seriesIndex], 
                _sIndex2ColorMap[seriesIndex],
                '#fff',
                orient == 'vertical' ? 'horizontal' : 'vertical' // ��ת
            );
            itemShape.zlevel = _zlevelBase + 1;
            
            if (self.deepQuery([data, serie, option], 'calculable')) {
                self.setCalculable(itemShape);
                itemShape.draggable = true;
            }
            
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
        
        function ontooltipHover(param, tipShape) {
            var seriesIndex = param.seriesIndex;
            var dataIndex = param.dataIndex;
            var seriesPL;
            var singlePL;
            var len = seriesIndex.length;
            while (len--) {
                seriesPL = finalPLMap[seriesIndex[len]];
                if (seriesPL) {
                    for (var i = 0, l = seriesPL.length; i < l; i++) {
                        singlePL = seriesPL[i];
                        for (var j = 0, k = singlePL.length; j < k; j++) {
                            if (dataIndex == singlePL[j][2]) {
                                tipShape.push(_getSymbol(
                                    seriesIndex[len],   // seriesIndex
                                    singlePL[j][2],     // dataIndex
                                    singlePL[j][3],     // name
                                    singlePL[j][0],     // x
                                    singlePL[j][1],     // y
                                    'horizontal'
                                ));
                            }
                        }
                    }
                }
            }
        }

        /**
         * ��̬�������Ӷ��� 
         */
        function addDataAnimation(params) {
            var aniMap = {}; // seriesIndex��������
            for (var i = 0, l = params.length; i < l; i++) {
                aniMap[params[i][0]] = params[i];
            }
            var x;
            var dx;
            var y;
            var dy;
            var seriesIndex;
            var pointList;
            var isHorizontal; // �Ƿ���򲼾֣� isHorizontal;
            for (var i = self.shapeList.length - 1; i >= 0; i--) {
                seriesIndex = self.shapeList[i]._seriesIndex;
                if (aniMap[seriesIndex] && !aniMap[seriesIndex][3]) {
                    // ������ɾ�������ƶ��Ķ���
                    if (self.shapeList[i]._main) {
                        pointList = self.shapeList[i].style.pointList;
                        // ���߶���
                        dx = Math.abs(pointList[0][0] - pointList[1][0]);
                        dy = Math.abs(pointList[0][1] - pointList[1][1]);
                        isHorizontal = 
                            self.shapeList[i]._orient == 'horizontal';
                            
                        if (aniMap[seriesIndex][2]) {
                            // ��ͷ����ɾ��ĩβ
                            if (self.shapeList[i].shape == 'polygon') {
                                //����ͼ
                                var len = pointList.length;
                                self.shapeList[i].style.pointList[len - 3]
                                    = pointList[len - 2];
                                isHorizontal
                                ? (self.shapeList[i].style.pointList[len - 3][0]
                                       = pointList[len - 4][0]
                                  )
                                : (self.shapeList[i].style.pointList[len - 3][1]
                                       = pointList[len - 4][1]
                                  );
                                self.shapeList[i].style.pointList[len - 2]
                                    = pointList[len - 1];
                            }
                            self.shapeList[i].style.pointList.pop();
                            
                            isHorizontal ? (x = dx, y = 0) : (x = 0, y = -dy);
                        }
                        else {
                            // ��β����ɾ��ͷ��
                            self.shapeList[i].style.pointList.shift();
                            if (self.shapeList[i].shape == 'polygon') {
                                //����ͼ
                                var targetPoint = 
                                    self.shapeList[i].style.pointList.pop();
                                isHorizontal
                                ? (targetPoint[0] = pointList[0][0])
                                : (targetPoint[1] = pointList[0][1]);
                                self.shapeList[i].style.pointList.push(
                                    targetPoint
                                );
                            }
                            isHorizontal ? (x = -dx, y = 0) : (x = 0, y = dy);
                        }
                        zr.modShape(
                            self.shapeList[i].id, 
                            {
                                style : {
                                    pointList: self.shapeList[i].style.pointList
                                }
                            },
                            true
                        );
                    }
                    else {
                        // �յ㶯��
                        if (aniMap[seriesIndex][2] 
                            && self.shapeList[i]._dataIndex 
                                == series[seriesIndex].data.length - 1
                        ) {
                            // ��ͷ����ɾ��ĩβ
                            zr.delShape(self.shapeList[i].id);
                            continue;
                        }
                        else if (!aniMap[seriesIndex][2] 
                                 && self.shapeList[i]._dataIndex === 0
                        ) {
                            // ��β����ɾ��ͷ��
                            zr.delShape(self.shapeList[i].id);
                            continue;
                        }
                    }
                    zr.animate(self.shapeList[i].id, '')
                        .when(
                            500,
                            {position : [x, y]}
                        )
                        .start();
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
            var dataIndex = 0;

            for (var i = 0, l = self.shapeList.length; i < l; i++) {
                if (self.shapeList[i]._main) {
                    serie = series[self.shapeList[i]._seriesIndex];
                    dataIndex += 1;
                    x = self.shapeList[i].style.pointList[0][0];
                    y = self.shapeList[i].style.pointList[0][1];
                    if (self.shapeList[i]._orient == 'horizontal') {
                        zr.modShape(
                            self.shapeList[i].id, 
                            {
                                scale : [0, 1, x, y]
                            },
                            true
                        );
                    }
                    else {
                        zr.modShape(
                            self.shapeList[i].id, 
                            {
                                scale : [1, 0, x, y]
                            },
                            true
                        );
                    }
                    zr.animate(self.shapeList[i].id, '')
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
        self.getMarkCoord = getMarkCoord;
        self.animation = animation;
        
        self.init = init;
        self.refresh = refresh;
        self.ontooltipHover = ontooltipHover;
        self.addDataAnimation = addDataAnimation;

        init(option, component);
    }

    function legendLineIcon(ctx, style) {
        var x = style.x;
        var y = style.y;
        var width = style.width;
        var height = style.height;
        
        var dy = height / 2;
        ctx.moveTo(x, y + dy);
        ctx.lineTo(x + width, y + dy);
        
        if (style.symbol.match('empty')) {
            ctx.fillStyle = '#fff';
        }
        style.brushType = 'both';
        
        var symbol = style.symbol.replace('empty', '').toLowerCase();
        if (symbol.match('star')) {
            dy = (symbol.replace('star','') - 0) || 5;
            y -= 1;
            symbol = 'star';
        } 
        else if (symbol == 'rectangle' || symbol == 'arrow') {
            x += (width - height) / 2;
            width = height;
        }
        
        var imageLocation = '';
        if (symbol.match('image')) {
            imageLocation = symbol.replace(
                    new RegExp('^image:\\/\\/'), ''
                );
            symbol = 'image';
            x += Math.round((width - height) / 2);
            width = height;
        }
        symbol = require('zrender/shape').get('icon').get(symbol);
        
        if (symbol) {
            symbol(ctx, {
                x : x + 3,
                y : y + 3,
                width : width - 6,
                height : height - 6,
                n : dy,
                image : imageLocation
            });
        }
    }
    
    // ��̬��չzrender shape��halfSmoothPolygon
    require('../util/shape/halfSmoothPolygon');
    
    // ͼ��ע��
    require('../chart').define('line', Line);
    
    return Line;
});