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
    function Bar(ecConfig, messageCenter, zr, option, component){
        // ����װ��
        var ComponentBase = require('../component/base');
        ComponentBase.call(this, ecConfig, zr);
        // �ɼ�������װ��
        var CalculableBase = require('./calculableBase');
        CalculableBase.call(this, zr, option);

        var ecData = require('../util/ecData');
        
        var zrColor = require('zrender/tool/color');

        var self = this;
        self.type = ecConfig.CHART_TYPE_BAR;

        var series;                 // ��������Դ����Ҫ�޸ĸ��Լ��޹ص���

        var _zlevelBase = self.getZlevelBase();

        var _sIndex2colorMap = {};  // seriesĬ����ɫ������seriesIndex������color

        function _buildShape() {
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
                if (series[i].type == ecConfig.CHART_TYPE_BAR) {
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
            // console.log(_position2sIndexMap)
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
                    _buildHorizontal(maxDataLength, locationMap, seriesArray);
                    break;
                case 'left' :
                case 'right' :
                    _buildVertical(maxDataLength, locationMap, seriesArray);
                    break;
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
                if (legend){
                    self.selectedMap[serieName] = legend.isSelected(serieName);
                    _sIndex2colorMap[seriesArray[i]] =
                        legend.getColor(serieName);
                    
                    iconShape = legend.getItemShape(serieName);
                    if (iconShape) {
                        // �ص�legend����һ���������icon
                        iconShape.style.strokeColor = 
                            serie.itemStyle.normal.borderColor;
                        iconShape.style.brushType = 'both';
                        legend.setItemShape(serieName, iconShape);
                    }
                } else {
                    self.selectedMap[serieName] = true;
                    _sIndex2colorMap[seriesArray[i]] =
                        zr.getColor(seriesArray[i]);
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
        function _buildHorizontal(maxDataLength, locationMap, seriesArray) {
            // ȷ����Ŀ�����ֵ�ᣬͬһ���������һ������
            var seriesIndex = locationMap[0][0];
            var serie = series[seriesIndex];
            var xAxisIndex = serie.xAxisIndex;
            var categoryAxis = component.xAxis.getAxis(xAxisIndex);
            var yAxisIndex; // ��ֵ�����
            var valueAxis;  // ��ֵ�����

            var size = _mapSize(categoryAxis, locationMap);
            var gap = size.gap;
            var barGap = size.barGap;
            var barWidthMap = size.barWidthMap;
            var barWidth = size.barWidth;                   // ����Ӧ���
            var barMinHeightMap = size.barMinHeightMap;
            var barHeight;

            var xMarkMap = {}; // Ϊ��ע��¼һ������ƫ��
            var x;
            var y;
            var lastYP; // ����ѵ�����
            var baseYP;
            var lastYN; // ����ѵ�����
            var baseYN;
            var barShape;
            var data;
            var value;
            for (var i = 0, l = maxDataLength; i < l; i++) {
                if (typeof categoryAxis.getNameByIndex(i) == 'undefined') {
                    // ϵ�����ݳ�����Ŀ�᳤��
                    break;
                }
                x = categoryAxis.getCoordByIndex(i) - gap / 2;
                for (var j = 0, k = locationMap.length; j < k; j++) {
                    // �ѵ������õ�һ��valueAxis
                    yAxisIndex = series[locationMap[j][0]].yAxisIndex || 0;
                    valueAxis = component.yAxis.getAxis(yAxisIndex);
                    baseYP = lastYP = valueAxis.getCoord(0) - 1;
                    baseYN = lastYN = lastYP + 2;
                    for (var m = 0, n = locationMap[j].length; m < n; m++) {
                        seriesIndex = locationMap[j][m];
                        serie = series[seriesIndex];
                        data = serie.data[i];
                        value = typeof data != 'undefined'
                                ? (typeof data.value != 'undefined'
                                  ? data.value
                                  : data)
                                : '-';
                        if (value == '-') {
                            // ������������󲹳���ק��ʾ��
                            continue;
                        }
                        y = valueAxis.getCoord(value);
                        if (value > 0) {
                            // ����ѵ�
                            barHeight = baseYP - y;
                            // �Ƕѵ�������С�߶���Ч
                            if (n == 1
                                && barMinHeightMap[seriesIndex] > barHeight
                            ) {
                                barHeight = barMinHeightMap[seriesIndex];
                            }
                            lastYP -= barHeight;
                            y = lastYP;
                            //lastYP -= 0.5; //��ɫ�Ӿ��ָ��߿�����
                        }
                        else if (value < 0){
                            // ����ѵ�
                            barHeight = y - baseYN;
                            // �Ƕѵ�������С�߶���Ч
                            if (n == 1
                                && barMinHeightMap[seriesIndex] > barHeight
                            ) {
                                barHeight = barMinHeightMap[seriesIndex];
                            }
                            y = lastYN;
                            lastYN += barHeight;
                            //lastYN += 0.5; //��ɫ�Ӿ��ָ��߿�����
                        }
                        else {
                            // 0ֵ
                            barHeight = baseYP - y;
                            // ��С�߶���Ч
                            lastYP -= barHeight;
                            y = lastYP;
                            //lastYP -= 0.5; //��ɫ�Ӿ��ָ��߿�����
                        }

                        barShape = _getBarItem(
                            seriesIndex, i,
                            categoryAxis.getNameByIndex(i),
                            x, y,
                            barWidthMap[seriesIndex] || barWidth,
                            barHeight,
                            'vertical'
                        );
                        
                        xMarkMap[seriesIndex] = xMarkMap[seriesIndex] || {};
                        xMarkMap[seriesIndex][i] = 
                            x + (barWidthMap[seriesIndex] || barWidth) / 2;

                        self.shapeList.push(barShape);
                    }

                    // ��������ݵ���ק��ʾ��
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
                            lastYP -= ecConfig.island.r;
                            y = lastYP;

                            barShape = _getBarItem(
                                seriesIndex, i,
                                categoryAxis.getNameByIndex(i),
                                x + 1, y,
                                (barWidthMap[seriesIndex] || barWidth) - 2,
                                ecConfig.island.r,
                                'vertical'
                            );
                            barShape.hoverable = false;
                            barShape.draggable = false;
                            barShape.style.brushType = 'stroke';
                            barShape.style.strokeColor =
                                    serie.calculableHolderColor
                                    || ecConfig.calculableHolderColor;

                            self.shapeList.push(barShape);
                        }
                    }

                    x += ((barWidthMap[seriesIndex] || barWidth) + barGap);
                }
            }
            _buildMark(seriesArray, xMarkMap, true);
        }

        /**
         * ������Ŀ��Ϊ��ֱ���������ͼϵ��
         */
        function _buildVertical(maxDataLength, locationMap, seriesArray) {
            // ȷ����Ŀ�����ֵ�ᣬͬһ���������һ������
            var seriesIndex = locationMap[0][0];
            var serie = series[seriesIndex];
            var yAxisIndex = serie.yAxisIndex;
            var categoryAxis = component.yAxis.getAxis(yAxisIndex);
            var xAxisIndex; // ��ֵ�����
            var valueAxis;  // ��ֵ�����

            var size = _mapSize(categoryAxis, locationMap);
            var gap = size.gap;
            var barGap = size.barGap;
            var barWidthMap = size.barWidthMap;
            var barWidth = size.barWidth;                   // ����Ӧ���
            var barMinHeightMap = size.barMinHeightMap;
            var barHeight;

            var xMarkMap = {}; // Ϊ��ע��¼һ������ƫ��
            var x;
            var y;
            var lastXP; // ����ѵ�����
            var baseXP;
            var lastXN; // ����ѵ�����
            var baseXN;
            var barShape;
            var data;
            var value;
            for (var i = 0, l = maxDataLength; i < l; i++) {
                if (typeof categoryAxis.getNameByIndex(i) == 'undefined') {
                    // ϵ�����ݳ�����Ŀ�᳤��
                    break;
                }
                y = categoryAxis.getCoordByIndex(i) + gap / 2;
                for (var j = 0, k = locationMap.length; j < k; j++) {
                    // �ѵ������õ�һ��valueAxis
                    xAxisIndex = series[locationMap[j][0]].xAxisIndex || 0;
                    valueAxis = component.xAxis.getAxis(xAxisIndex);
                    baseXP = lastXP = valueAxis.getCoord(0) + 1;
                    baseXN = lastXN = lastXP - 2;
                    for (var m = 0, n = locationMap[j].length; m < n; m++) {
                        seriesIndex = locationMap[j][m];
                        serie = series[seriesIndex];
                        data = serie.data[i];
                        value = typeof data != 'undefined'
                                ? (typeof data.value != 'undefined'
                                  ? data.value
                                  : data)
                                : '-';
                        if (value == '-') {
                            // ������������󲹳���ק��ʾ��
                            continue;
                        }
                        x = valueAxis.getCoord(value);
                        if (value > 0) {
                            // ����ѵ�
                            barHeight = x - baseXP;
                            // �Ƕѵ�������С�߶���Ч
                            if (n == 1
                                && barMinHeightMap[seriesIndex] > barHeight
                            ) {
                                barHeight = barMinHeightMap[seriesIndex];
                            }
                            x = lastXP;
                            lastXP += barHeight;
                            //lastXP += 0.5; //��ɫ�Ӿ��ָ��߿�����
                        }
                        else if (value < 0){
                            // ����ѵ�
                            barHeight = baseXN - x;
                            // �Ƕѵ�������С�߶���Ч
                            if (n == 1
                                && barMinHeightMap[seriesIndex] > barHeight
                            ) {
                                barHeight = barMinHeightMap[seriesIndex];
                            }
                            lastXN -= barHeight;
                            x = lastXN;
                            //lastXN -= 0.5; //��ɫ�Ӿ��ָ��߿�����
                        }
                        else {
                            // 0ֵ
                            barHeight = x - baseXP;
                            // ��С�߶���Ч
                            x = lastXP;
                            lastXP += barHeight;
                            //lastXP += 0.5; //��ɫ�Ӿ��ָ��߿�����
                        }

                        barShape = _getBarItem(
                            seriesIndex, i,
                            categoryAxis.getNameByIndex(i),
                            x, y - (barWidthMap[seriesIndex] || barWidth),
                            barHeight,
                            barWidthMap[seriesIndex] || barWidth,
                            'horizontal'
                        );
                        
                        xMarkMap[seriesIndex] = xMarkMap[seriesIndex] || {};
                        xMarkMap[seriesIndex][i] = 
                            y - (barWidthMap[seriesIndex] || barWidth) / 2;

                        self.shapeList.push(barShape);
                    }

                    // ��������ݵ���ק��ʾ��
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
                            x = lastXP;
                            lastXP += ecConfig.island.r;

                            barShape = _getBarItem(
                                seriesIndex,
                                i,
                                categoryAxis.getNameByIndex(i),
                                x,
                                y + 1 - (barWidthMap[seriesIndex] || barWidth),
                                ecConfig.island.r,
                                (barWidthMap[seriesIndex] || barWidth) - 2,
                                'horizontal'
                            );
                            barShape.hoverable = false;
                            barShape.draggable = false;
                            barShape.style.brushType = 'stroke';
                            barShape.style.strokeColor =
                                    serie.calculableHolderColor
                                    || ecConfig.calculableHolderColor;

                            self.shapeList.push(barShape);
                        }
                    }

                    y -= ((barWidthMap[seriesIndex] || barWidth) + barGap);
                }
            }
            _buildMark(seriesArray, xMarkMap, false);
        }
        /**
         * �����������鷳����ΪɶҪ����ϵ�м����Ի���С��Ⱥ͸߶Ȱ�������
         * @param {CategoryAxis} categoryAxis ��Ŀ�����ᣬ��Ҫ֪����Ŀ�����С
         * @param {Array} locationMap �������ݵ�ϵ������
         */
        function _mapSize(categoryAxis, locationMap, ignoreUserDefined) {
            var barWidthMap = {};
            var barMinHeightMap = {};
            var sBarWidth;
            var sBarWidthCounter = 0;
            var sBarWidthTotal = 0;
            var barGap;
            var barCategoryGap;
            var hasFound;
            var queryTarget;

            for (var j = 0, k = locationMap.length; j < k; j++) {
                hasFound = false;   // ͬһ�ѵ���һ��barWidth��Ч
                for (var m = 0, n = locationMap[j].length; m < n; m++) {
                    seriesIndex = locationMap[j][m];
                    queryTarget = series[seriesIndex];
                    if (!ignoreUserDefined) {
                        if (!hasFound) {
                            sBarWidth = self.query(
                                queryTarget,
                                'barWidth'
                            );
                            if (typeof sBarWidth != 'undefined') {
                                barWidthMap[seriesIndex] = sBarWidth;
                                sBarWidthTotal += sBarWidth;
                                sBarWidthCounter++;
                                hasFound = true;
                            }
                        } else {
                            barWidthMap[seriesIndex] = sBarWidth;   // ���ҵ���һ��
                        }
                    }

                    barMinHeightMap[seriesIndex] = self.query(
                        queryTarget,
                        'barMinHeight'
                    );
                    barGap = typeof barGap != 'undefined' 
                             ? barGap
                             : self.query(
                                   queryTarget,
                                   'barGap'
                               );
                    barCategoryGap = typeof barCategoryGap != 'undefined' 
                                     ? barCategoryGap
                                     : self.query(
                                           queryTarget,
                                           'barCategoryGap'
                                       );
                }
            }

            var gap;
            var barWidth;
            if (locationMap.length != sBarWidthCounter) {
                // ���ٴ���һ������Ӧ��ȵ�����ͼ
                if (!ignoreUserDefined) {
                    gap = typeof barCategoryGap == 'string' 
                          && barCategoryGap.match(/%$/)
                              // �ٷֱ�
                              ? Math.floor(
                                  categoryAxis.getGap() 
                                  * (100 - parseFloat(barCategoryGap)) 
                                  / 100
                                )
                              // ��ֵ
                              : (categoryAxis.getGap() - barCategoryGap);
                    if (typeof barGap == 'string' && barGap.match(/%$/)) {
                        barGap = parseFloat(barGap) / 100;
                        barWidth = Math.floor(
                            (gap - sBarWidthTotal)
                            / ((locationMap.length - 1) * barGap 
                               + locationMap.length - sBarWidthCounter)
                        );
                        barGap = Math.floor(barWidth * barGap);
                    }
                    else {
                        barGap = parseFloat(barGap);
                        barWidth = Math.floor(
                            (gap - sBarWidthTotal 
                                 - barGap * (locationMap.length - 1)
                            )
                            / (locationMap.length - sBarWidthCounter)
                        );
                    }
                    // �޷������û�����Ŀ����ƣ������û���ȣ��������
                    if (barWidth < 0) {
                        return _mapSize(categoryAxis, locationMap, true);
                    }
                }
                else {
                    // �����û�����Ŀ���趨
                    gap = categoryAxis.getGap();
                    barGap = 0;
                    barWidth = Math.floor(gap / locationMap.length);
                    // �Ѿ������û�����Ŀ���趨��Ȼ���޷�������ʾ��ֻ��Ӳ����;
                    if (barWidth < 0) {
                        barWidth = 1;
                    }
                }
            }
            else {
                // ȫ���Զ����ȣ�barGap��Ч��ϵ�м������barGap
                gap = sBarWidthCounter > 1
                      ? (typeof barCategoryGap == 'string' 
                         && barCategoryGap.match(/%$/)
                        )
                          // �ٷֱ�
                          ? Math.floor(
                              categoryAxis.getGap() 
                              * (100 - parseFloat(barCategoryGap)) 
                              / 100
                            )
                          // ��ֵ
                          : (categoryAxis.getGap() - barCategoryGap)
                      // ֻ��һ��
                      : sBarWidthTotal;
                barWidth = 0;
                barGap = sBarWidthCounter > 1 
                         ? Math.floor(
                               (gap - sBarWidthTotal) / (sBarWidthCounter - 1)
                           )
                         : 0;
                if (barGap < 0) {
                    // �޷������û�����Ŀ����ƣ������û���ȣ��������
                    return _mapSize(categoryAxis, locationMap, true);
                }
            }


            return {
                barWidthMap : barWidthMap,
                barMinHeightMap : barMinHeightMap ,
                gap : gap,
                barWidth : barWidth,
                barGap : barGap
            };
        }

        /**
         * ��������ͼ������
         */
        function _getBarItem(
            seriesIndex, dataIndex, name, x, y, width, height, orient
        ) {
            var barShape;
            var serie = series[seriesIndex];
            var data = serie.data[dataIndex];
            // �༶����
            var defaultColor = _sIndex2colorMap[seriesIndex];
            var queryTarget = [data, serie];
            var normalColor = self.deepQuery(
                queryTarget,
                'itemStyle.normal.color'
            ) || defaultColor;
            var emphasisColor = self.deepQuery(
                queryTarget,
                'itemStyle.emphasis.color'
            );
            var normal = self.deepMerge(
                queryTarget,
                'itemStyle.normal'
            );
            var normalBorderWidth = normal.borderWidth;
            var emphasis = self.deepMerge(
                queryTarget,
                'itemStyle.emphasis'
            );
            barShape = {
                shape : 'rectangle',
                zlevel : _zlevelBase,
                clickable: true,
                style : {
                    x : x,
                    y : y,
                    width : width,
                    height : height,
                    brushType : 'both',
                    color : normalColor,
                    radius : normal.borderRadius,
                    lineWidth : normalBorderWidth,
                    strokeColor : normal.borderColor
                },
                highlightStyle : {
                    color : emphasisColor 
                            || (typeof normalColor == 'string'
                                ? zrColor.lift(normalColor, -0.2)
                                : normalColor
                               ),
                    radius : emphasis.borderRadius,
                    lineWidth : emphasis.borderWidth,
                    strokeColor : emphasis.borderColor
                },
                _orient : orient
            };
            // �����߿����ʾ�Ż�
            if (barShape.style.height > normalBorderWidth
                && barShape.style.width > normalBorderWidth
            ) {
                barShape.style.y += normalBorderWidth / 2;
                barShape.style.height -= normalBorderWidth;
                barShape.style.x += normalBorderWidth / 2;
                barShape.style.width -= normalBorderWidth;
            }
            else {
                // ̫С�ˣ����˱���
                barShape.style.brushType = 'fill';
            }
            
            barShape.highlightStyle.textColor = barShape.highlightStyle.color;
            
            barShape = self.addLabel(barShape, serie, data, name, orient);

            if (self.deepQuery([data, serie, option],'calculable')) {
                self.setCalculable(barShape);
                barShape.draggable = true;
            }

            ecData.pack(
                barShape,
                series[seriesIndex], seriesIndex,
                series[seriesIndex].data[dataIndex], dataIndex,
                name
            );

            return barShape;
        }

        // ��ӱ�ע
        function _buildMark(seriesArray, xMarkMap ,isHorizontal) {
            for (var i = 0, l = seriesArray.length; i < l; i++) {
                self.buildMark(
                    series[seriesArray[i]],
                    seriesArray[i],
                    component,
                    {
                        isHorizontal : isHorizontal,
                        xMarkMap : xMarkMap
                    }
                );
            }
        }
        
        // λ��ת��
        function getMarkCoord(serie, seriesIndex, mpData, markCoordParams) {
            var xAxis = component.xAxis.getAxis(serie.xAxisIndex);
            var yAxis = component.yAxis.getAxis(serie.yAxisIndex);
            var dataIndex;
            var pos;
            if (markCoordParams.isHorizontal) {
                // ����
                dataIndex = typeof mpData.xAxis == 'string'
                            && xAxis.getIndexByName
                            ? xAxis.getIndexByName(mpData.xAxis)
                            : (mpData.xAxis || 0);
                pos = [
                    markCoordParams.xMarkMap[seriesIndex][dataIndex],
                    yAxis.getCoord(mpData.yAxis || 0)
                ];
            }
            else {
                // ����
                dataIndex = typeof mpData.yAxis == 'string'
                            && yAxis.getIndexByName
                            ? yAxis.getIndexByName(mpData.yAxis)
                            : (mpData.yAxis || 0);
                pos = [
                    xAxis.getCoord(mpData.xAxis || 0),
                    markCoordParams.xMarkMap[seriesIndex][dataIndex]
                ];
            }
            return pos;
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
            var serie;
            var seriesIndex;
            var dataIndex;
            for (var i = self.shapeList.length - 1; i >= 0; i--) {
                seriesIndex = ecData.get(self.shapeList[i], 'seriesIndex');
                if (aniMap[seriesIndex] && !aniMap[seriesIndex][3]) {
                    // ������ɾ�������ƶ��Ķ���
                    if (self.shapeList[i].shape == 'rectangle') {
                        // ������
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
                        if (self.shapeList[i]._orient == 'horizontal') {
                            // ����ͼ
                            dy = component.yAxis.getAxis(
                                    serie.yAxisIndex || 0
                                 ).getGap();
                            y = aniMap[seriesIndex][2] ? -dy : dy;
                            x = 0;
                        }
                        else {
                            // ����ͼ
                            dx = component.xAxis.getAxis(
                                    serie.xAxisIndex || 0
                                 ).getGap();
                            x = aniMap[seriesIndex][2] ? dx : -dx;
                            y = 0;
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
        }

        /**
         * �����趨
         */
        function animation() {
            var duration;
            var easing;
            var width;
            var height;
            var x;
            var y;
            var serie;
            var dataIndex;
            var value;
            for (var i = 0, l = self.shapeList.length; i < l; i++) {
                if (self.shapeList[i].shape == 'rectangle') {
                    serie = ecData.get(self.shapeList[i], 'series');
                    dataIndex = ecData.get(self.shapeList[i], 'dataIndex');
                    value = ecData.get(self.shapeList[i], 'value');
                    duration = self.deepQuery(
                        [serie, option], 'animationDuration'
                    );
                    easing = self.deepQuery(
                        [serie, option], 'animationEasing'
                    );

                    if (self.shapeList[i]._orient == 'horizontal') {
                        // ����ͼ
                        width = self.shapeList[i].style.width;
                        x = self.shapeList[i].style.x;
                        if (value < 0) {
                            zr.modShape(
                                self.shapeList[i].id,
                                {
                                    style: {
                                        x : x + width,
                                        width: 0
                                    }
                                },
                                true
                            );
                            zr.animate(self.shapeList[i].id, 'style')
                                .when(
                                    duration + dataIndex * 100,
                                    {
                                        x : x,
                                        width : width
                                    }
                                )
                                .start(easing);
                        }
                        else {
                            zr.modShape(
                                self.shapeList[i].id,
                                {
                                    style: {
                                        width: 0
                                    }
                                },
                                true
                            );
                            zr.animate(self.shapeList[i].id, 'style')
                                .when(
                                    duration + dataIndex * 100,
                                    {
                                        width : width
                                    }
                                )
                                .start(easing);
                        }
                    }
                    else {
                        // ����ͼ
                        height = self.shapeList[i].style.height;
                        y = self.shapeList[i].style.y;
                        if (value < 0) {
                            zr.modShape(
                                self.shapeList[i].id,
                                {
                                    style: {
                                        height: 0
                                    }
                                },
                                true
                            );
                            zr.animate(self.shapeList[i].id, 'style')
                                .when(
                                    duration + dataIndex * 100,
                                    {
                                        height : height
                                    }
                                )
                                .start(easing);
                        }
                        else {
                            zr.modShape(
                                self.shapeList[i].id,
                                {
                                    style: {
                                        y: y + height,
                                        height: 0
                                    }
                                },
                                true
                            );
                            zr.animate(self.shapeList[i].id, 'style')
                                .when(
                                    duration + dataIndex * 100,
                                    {
                                        y : y,
                                        height : height
                                    }
                                )
                                .start(easing);
                        }
                    }
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

    // ͼ��ע��
    require('../chart').define('bar', Bar);
    
    return Bar;
});