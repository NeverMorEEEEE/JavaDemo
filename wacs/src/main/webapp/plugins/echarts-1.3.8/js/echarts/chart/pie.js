/**
 * echartsͼ���ࣺ��ͼ
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
    function Pie(ecConfig, messageCenter, zr, option, component){
        // ����װ��
        var ComponentBase = require('../component/base');
        ComponentBase.call(this, ecConfig, zr);
        // �ɼ�������װ��
        var CalculableBase = require('./calculableBase');
        CalculableBase.call(this, zr, option);

        var ecData = require('../util/ecData');

        var zrMath = require('zrender/tool/math');
        var zrUtil = require('zrender/tool/util');
        var zrColor = require('zrender/tool/color');

        var self = this;
        self.type = ecConfig.CHART_TYPE_PIE;

        var series;                 // ��������Դ����Ҫ�޸ĸ��Լ��޹ص���

        var _zlevelBase = self.getZlevelBase();
        
        var _selectedMode;
        var _selected = {};

        function _buildShape() {
            var legend = component.legend;
            self.selectedMap = {};
            _selected = {};
            var center;
            var radius;

            var pieCase;        // ��ͼ����
            _selectedMode = false;
            var serieName;
            for (var i = 0, l = series.length; i < l; i++) {
                if (series[i].type == ecConfig.CHART_TYPE_PIE) {
                    series[i] = self.reformOption(series[i]);
                    serieName = series[i].name || '';
                    // ϵ��ͼ������
                    self.selectedMap[serieName] = 
                        legend ? legend.isSelected(serieName) : true;
                    if (!self.selectedMap[serieName]) {
                        continue;
                    }
                    
                    center = self.parseCenter(series[i].center);
                    radius = self.parseRadius(series[i].radius);
                    _selectedMode = _selectedMode || series[i].selectedMode;
                    _selected[i] = [];
                    if (self.deepQuery([series[i], option], 'calculable')) {
                        pieCase = {
                            shape : radius[0] <= 10 ? 'circle' : 'ring',
                            zlevel : _zlevelBase,
                            hoverable : false,
                            style : {
                                x : center[0],          // Բ�ĺ�����
                                y : center[1],          // Բ��������
                                // Բ������뾶
                                r0 : radius[0] <= 10 ? 0 : radius[0] - 10,
                                r : radius[1] + 10,
                                brushType : 'stroke',
                                lineWidth: 1,
                                strokeColor : series[i].calculableHolderColor
                                              || ecConfig.calculableHolderColor
                            }
                        };
                        ecData.pack(pieCase, series[i], i, undefined, -1);
                        self.setCalculable(pieCase);
                        self.shapeList.push(pieCase);
                    }
                    _buildSinglePie(i);
                    self.buildMark(
                        series[i],
                        i,
                        component
                    );
                }
            }

            for (var i = 0, l = self.shapeList.length; i < l; i++) {
                self.shapeList[i].id = zr.newShapeId(self.type);
                zr.addShape(self.shapeList[i]);
            }
        }

        /**
         * ����������ͼ
         *
         * @param {number} seriesIndex ϵ������
         */
        function _buildSinglePie(seriesIndex) {
            var serie = series[seriesIndex];
            var data = serie.data;
            var legend = component.legend;
            var itemName;
            var totalSelected = 0;               // �����ۼ�ѡ���ҷ�0����
            var totalSelectedValue0 = 0;         // �����ۼ�ѡ��0ֻ����
            var totalValue = 0;                  // �����ۼ�
            var maxValue = Number.NEGATIVE_INFINITY;

            // ������Ҫ��ʾ�ĸ�������ֵ
            for (var i = 0, l = data.length; i < l; i++) {
                itemName = data[i].name;
                if (legend){
                    self.selectedMap[itemName] = legend.isSelected(itemName);
                } else {
                    self.selectedMap[itemName] = true;
                }
                if (self.selectedMap[itemName]) {
                    if (+data[i].value !== 0) {
                        totalSelected++;
                    }
                    else {
                        totalSelectedValue0++;
                    }
                    totalValue += +data[i].value;
                    maxValue = Math.max(maxValue, +data[i].value);
                }
            }

            var percent = 100;
            var lastPercent;    // ����ϸ�Ƕ��Ż�
            var lastAddRadius = 0;
            var clockWise = serie.clockWise;
            var startAngle = serie.startAngle.toFixed(2) - 0;
            var endAngle;
            var minAngle = serie.minAngle || 0.01; // #bugfixed
            var totalAngle = 360 - (minAngle * totalSelected) 
                                 - 0.01 * totalSelectedValue0;
            var defaultColor;
            var roseType = serie.roseType;
            var radius;
            var r0;     // �����ڰ뾶
            var r1;     // ������뾶

            for (var i = 0, l = data.length; i < l; i++){
                itemName = data[i].name;
                if (!self.selectedMap[itemName]) {
                    continue;
                }
                // Ĭ����ɫ����
                if (legend) {
                    // ��ͼ�����ͼ���л�ȡ��ɫ����
                    defaultColor = legend.getColor(itemName);
                }
                else {
                    // ȫ����ɫ����
                    defaultColor = zr.getColor(i);
                }

                lastPercent = percent;
                percent = data[i].value / totalValue;
                if (roseType != 'area') {
                    endAngle = clockWise
                        ? (startAngle - percent * totalAngle - (percent !== 0 ? minAngle : 0.01))
                        : (percent * totalAngle + startAngle + (percent !== 0 ? minAngle : 0.01));
                }
                else {
                    endAngle = clockWise
                        ? (startAngle - 360 / l)
                        : (360 / l + startAngle);
                }
                endAngle = endAngle.toFixed(2) - 0;
                percent = (percent * 100).toFixed(2);
                
                radius = self.parseRadius(serie.radius);
                r0 = +radius[0];
                r1 = +radius[1];
                
                if (roseType == 'radius') {
                    r1 = data[i].value / maxValue * (r1 - r0) * 0.8 
                         + (r1 - r0) * 0.2
                         + r0;
                }
                else if (roseType == 'area') {
                    r1 = Math.sqrt(data[i].value / maxValue) * (r1 - r0) + r0;
                }
                
                if (clockWise) {
                    var temp;
                    temp = startAngle;
                    startAngle = endAngle;
                    endAngle = temp; 
                }
                
                // ��ǰС�Ƕ���Ҫ���ǰһ���Ƿ�Ҳ��С�Ƕȣ�����ǵõ������ȣ�������ȫ���⣬���ܴ�󽵵͸��Ǹ���
                if (i > 0 
                    && percent < 4       // Լ15��
                    && lastPercent < 4
                    && _needLabel(serie, data[i], false)
                    && self.deepQuery(
                           [data[i], serie], 'itemStyle.normal.label.position'
                       ) != 'center'
                ) {
                    // ��С���ӳ���ǰС��������
                    lastAddRadius += (percent < 4 ? 20 : -20);
                }
                else {
                    lastAddRadius = 0;
                }
                
                _buildItem(
                    seriesIndex, i, percent, lastAddRadius, // ������С�Ƕ��Ż�
                    data[i].selected,
                    r0, r1,
                    startAngle, endAngle, defaultColor
                );
                if (!clockWise) {
                    startAngle = endAngle;
                }
            }
        }

        /**
         * �����������μ�ָ��
         */
        function _buildItem(
            seriesIndex, dataIndex, percent, lastAddRadius,
            isSelected,
            r0, r1,
            startAngle, endAngle, defaultColor
        ) {
            // ����
            var sector = _getSector(
                    seriesIndex, dataIndex, percent, isSelected,
                    r0, r1,
                    startAngle, endAngle, defaultColor
                );
            // ͼ����Ҫ���ӵ�˽������
            ecData.pack(
                sector,
                series[seriesIndex], seriesIndex,
                series[seriesIndex].data[dataIndex], dataIndex,
                series[seriesIndex].data[dataIndex].name,
                percent
            );
            sector._lastAddRadius = lastAddRadius;
            self.shapeList.push(sector);

            // �ı���ǩ����Ҫ��ʾ����з���
            var label = _getLabel(
                    seriesIndex, dataIndex, percent, lastAddRadius,
                    startAngle, endAngle, defaultColor,
                    false
                );
            if (label) {
                label._dataIndex = dataIndex;
                self.shapeList.push(label);
            }

            // �ı���ǩ�Ӿ������ߣ���Ҫ��ʾ����з���
            var labelLine = _getLabelLine(
                    seriesIndex, dataIndex, lastAddRadius,
                    r0, r1,
                    startAngle, endAngle, defaultColor,
                    false
                );
            if (labelLine) {
                labelLine._dataIndex = dataIndex;
                self.shapeList.push(labelLine);
            }
        }

        /**
         * ��������
         */
        function _getSector(
            seriesIndex, dataIndex, percent, isSelected,
            r0, r1,
            startAngle, endAngle, defaultColor
        ) {
            var serie = series[seriesIndex];
            var data = serie.data[dataIndex];
            var queryTarget = [data, serie];
            var center = self.parseCenter(serie.center);

            // �༶����
            var normal = self.deepMerge(
                queryTarget,
                'itemStyle.normal'
            ) || {};
            var emphasis = self.deepMerge(
                queryTarget,
                'itemStyle.emphasis'
            ) || {};
            var normalColor = normal.color || defaultColor;
            var emphasisColor = emphasis.color 
                || (typeof normalColor == 'string'
                    ? zrColor.lift(normalColor, -0.2)
                    : normalColor
                );

            var sector = {
                shape : 'sector',             // ����
                zlevel : _zlevelBase,
                clickable : true,
                style : {
                    x : center[0],          // Բ�ĺ�����
                    y : center[1],          // Բ��������
                    r0 : r0,         // Բ���ڰ뾶
                    r : r1,          // Բ����뾶
                    startAngle : startAngle,
                    endAngle : endAngle,
                    brushType : 'both',
                    color : normalColor,
                    lineWidth : normal.borderWidth,
                    strokeColor : normal.borderColor,
                    lineJoin: 'round'
                },
                highlightStyle : {
                    color : emphasisColor,
                    strokeColor : 'rgba(0,0,0,0)',
                    lineWidth : emphasis.borderWidth,
                    strokeColor : emphasis.borderColor,
                    lineJoin: 'round'
                },
                _seriesIndex : seriesIndex, 
                _dataIndex : dataIndex
            };
            
            if (isSelected) {
                var midAngle = 
                    ((sector.style.startAngle + sector.style.endAngle) / 2)
                    .toFixed(2) - 0;
                sector.style._hasSelected = true;
                sector.style._x = sector.style.x;
                sector.style._y = sector.style.y;
                var offset = self.query(serie, 'selectedOffset');
                sector.style.x += zrMath.cos(midAngle, true) * offset;
                sector.style.y -= zrMath.sin(midAngle, true) * offset;
                
                _selected[seriesIndex][dataIndex] = true;
            }
            else {
                _selected[seriesIndex][dataIndex] = false;
            }
            
            
            if (_selectedMode) {
                sector.onclick = self.shapeHandler.onclick;
            }
            
            if (self.deepQuery([data, serie, option], 'calculable')) {
                self.setCalculable(sector);
                sector.draggable = true;
            }

            // ��normal�²���ʾ��emphasis��ʾ������¼���Ӧ
            if (_needLabel(serie, data, true)          // emphasis����ʾ�ı�
                || _needLabelLine(serie, data, true)   // emphasis����ʾ������
            ) {
                sector.onmouseover = self.shapeHandler.onmouseover;
            }
            return sector;
        }

        /**
         * ��Ҫ��ʾ����з��ع����õ�shape�����򷵻�undefined
         */
        function _getLabel(
            seriesIndex, dataIndex, percent, lastAddRadius,
            startAngle, endAngle, defaultColor,
            isEmphasis
        ) {
            var serie = series[seriesIndex];
            var data = serie.data[dataIndex];
            
            // �ض�״̬���Ƿ���Ҫ��ʾ�ı���ǩ
            if (!_needLabel(serie, data, isEmphasis)) {
                return;
            }
            
            var status = isEmphasis ? 'emphasis' : 'normal';

            // serie����Ĭ�����ã����Ĵ󵨵��ã�
            var itemStyle = zrUtil.merge(
                    zrUtil.clone(data.itemStyle) || {},
                    serie.itemStyle,
                    {
                        'overwrite' : false,
                        'recursive' : true
                    }
                );
            // label����
            var labelControl = itemStyle[status].label;
            var textStyle = labelControl.textStyle || {};

            var center = self.parseCenter(serie.center);
            var centerX = center[0];                      // Բ�ĺ�����
            var centerY = center[1];                      // Բ��������
            var x;
            var y;
            var midAngle = ((endAngle + startAngle) / 2 + 360) % 360; // ��ֵ
            var radius = self.parseRadius(serie.radius);  // ��ǩλ�ð뾶
            var textAlign;
            var textBaseline = 'middle';
            if (labelControl.position == 'center') {
                // center��ʾ
                radius = radius[1];
                x = centerX;
                y = centerY;
                textAlign = 'center';
            }
            else if (labelControl.position == 'inner'){
                // �ڲ���ʾ
                radius = (radius[0] + radius[1]) / 2 + lastAddRadius;
                x = Math.round(
                    centerX + radius * zrMath.cos(midAngle, true)
                );
                y = Math.round(
                    centerY - radius * zrMath.sin(midAngle, true)
                );
                defaultColor = '#fff';
                textAlign = 'center';
                
            }
            else {
                // �ⲿ��ʾ��Ĭ�� labelControl.position == 'outer')
                radius = radius[1]
                         - (-itemStyle[status].labelLine.length)
                         //- (-textStyle.fontSize)
                         + lastAddRadius;
                x = centerX + radius * zrMath.cos(midAngle, true);
                y = centerY - radius * zrMath.sin(midAngle, true);
                textAlign = (midAngle >= 90 && midAngle <= 270)
                            ? 'right' : 'left';
            }
            
            if (labelControl.position != 'center'
                && labelControl.position != 'inner'
            ) {
                x += textAlign == 'left' ? 20 : -20;
            }
            data.__labelX = x - (textAlign == 'left' ? 5 : -5);
            data.__labelY = y;
            
            return {
                shape : 'text',
                zlevel : _zlevelBase + 1,
                hoverable : false,
                style : {
                    x : x,
                    y : y,
                    color : textStyle.color || defaultColor,
                    text : _getLabelText(
                        seriesIndex, dataIndex, percent, status
                    ),
                    textAlign : textStyle.align || textAlign,
                    textBaseline : textStyle.baseline || textBaseline,
                    textFont : self.getFont(textStyle)
                },
                highlightStyle : {
                    brushType : 'fill'
                },
                _seriesIndex : seriesIndex, 
                _dataIndex : dataIndex
            };
        }

        /**
         * ����lable.format����label text
         */
        function _getLabelText(seriesIndex, dataIndex, percent, status) {
            var serie = series[seriesIndex];
            var data = serie.data[dataIndex];
            var formatter = self.deepQuery(
                [data, serie],
                'itemStyle.' + status + '.label.formatter'
            );
            
            if (formatter) {
                if (typeof formatter == 'function') {
                    return formatter(
                        serie.name,
                        data.name,
                        data.value,
                        percent
                    );
                }
                else if (typeof formatter == 'string') {
                    formatter = formatter.replace('{a}','{a0}')
                                         .replace('{b}','{b0}')
                                         .replace('{c}','{c0}')
                                         .replace('{d}','{d0}');
                    formatter = formatter.replace('{a0}', serie.name)
                                         .replace('{b0}', data.name)
                                         .replace('{c0}', data.value)
                                         .replace('{d0}', percent);
    
                    return formatter;
                }
            }
            else {
                return data.name;
            }
        }
        
        /**
         * ��Ҫ��ʾ����з��ع����õ�shape�����򷵻�undefined
         */
        function _getLabelLine(
            seriesIndex, dataIndex, lastAddRadius,
            r0, r1,
            startAngle, endAngle, defaultColor,
            isEmphasis
        ) {
            var serie = series[seriesIndex];
            var data = serie.data[dataIndex];

            // �ض�״̬���Ƿ���Ҫ��ʾ�ı���ǩ
            if (_needLabelLine(serie, data, isEmphasis)) {
                var status = isEmphasis ? 'emphasis' : 'normal';

                // serie����Ĭ�����ã����Ĵ󵨵��ã�
                var itemStyle = zrUtil.merge(
                        zrUtil.clone(data.itemStyle) || {},
                        serie.itemStyle,
                        {
                            'overwrite' : false,
                            'recursive' : true
                        }
                    );
                // labelLine����
                var labelLineControl = itemStyle[status].labelLine;
                var lineStyle = labelLineControl.lineStyle || {};

                var center = self.parseCenter(serie.center);
                var centerX = center[0];                    // Բ�ĺ�����
                var centerY = center[1];                    // Բ��������
                // �Ӿ����������뾶
                var midRadius = r1;
                // �Ӿ��������յ�뾶
                var maxRadius = self.parseRadius(serie.radius)[1] 
                                - (-labelLineControl.length)
                                + lastAddRadius;
                var midAngle = ((endAngle + startAngle) / 2) % 360; // �Ƕ���ֵ
                var cosValue = zrMath.cos(midAngle, true);
                var sinValue = zrMath.sin(midAngle, true);
                // ���Ǻ�����������zrender/tool/math������
                return {
                    shape : 'brokenLine',
                    zlevel : _zlevelBase + 1,
                    hoverable : false,
                    style : {
                        pointList : [
                            [
                                centerX + midRadius * cosValue,
                                centerY - midRadius * sinValue
                            ],
                            [
                                centerX + maxRadius * cosValue,
                                centerY - maxRadius * sinValue
                            ],
                            [
                                data.__labelX,
                                data.__labelY
                            ]
                        ],
                        //xStart : centerX + midRadius * cosValue,
                        //yStart : centerY - midRadius * sinValue,
                        //xEnd : centerX + maxRadius * cosValue,
                        //yEnd : centerY - maxRadius * sinValue,
                        strokeColor : lineStyle.color || defaultColor,
                        lineType : lineStyle.type,
                        lineWidth : lineStyle.width
                    },
                    _seriesIndex : seriesIndex, 
                    _dataIndex : dataIndex
                };
            }
            else {
                return;
            }
        }

        /**
         * �����ض�״̬��normal or emphasis�����Ƿ���Ҫ��ʾlabel��ǩ�ı�
         * @param {Object} serie
         * @param {Object} data
         * @param {boolean} isEmphasis true is 'emphasis' and false is 'normal'
         */
        function _needLabel(serie, data, isEmphasis) {
            return self.deepQuery(
                [data, serie],
                'itemStyle.'
                + (isEmphasis ? 'emphasis' : 'normal')
                + '.label.show'
            );
        }

        /**
         * �����ض�״̬��normal or emphasis�����Ƿ���Ҫ��ʾlabelLine��ǩ�Ӿ�������
         * @param {Object} serie
         * @param {Object} data
         * @param {boolean} isEmphasis true is 'emphasis' and false is 'normal'
         */
        function _needLabelLine(serie, data, isEmphasis) {
            return self.deepQuery(
                [data, serie],
                'itemStyle.'
                + (isEmphasis ? 'emphasis' : 'normal')
                +'.labelLine.show'
            );
        }
        
        /**
         * ��������&Ĭ��ֵ��ֵ�����ػ��෽��
         * @param {Object} opt ����
         */
        function reformOption(opt) {
            // ���÷�����ݷ�ʽ
            var _merge = zrUtil.merge;
            opt = _merge(
                      opt || {},
                      ecConfig.pie,
                      {
                          'overwrite' : false,
                          'recursive' : true
                      }
                  );

            // ͨ����������
            opt.itemStyle.normal.label.textStyle = _merge(
                opt.itemStyle.normal.label.textStyle || {},
                ecConfig.textStyle,
                {
                    'overwrite' : false,
                    'recursive' : true
                }
            );
            opt.itemStyle.emphasis.label.textStyle = _merge(
                opt.itemStyle.emphasis.label.textStyle || {},
                ecConfig.textStyle,
                {
                    'overwrite' : false,
                    'recursive' : true
                }
            );

            return opt;
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
         * ����Ч��
        function addDataAnimation(params) {
            var aniMap = {}; // seriesIndex��������
            for (var i = 0, l = params.length; i < l; i++) {
                aniMap[params[i][0]] = params[i];
            }
            var x;
            var y;
            var r;
            var seriesIndex;
            for (var i = self.shapeList.length - 1; i >= 0; i--) {
                seriesIndex = ecData.get(self.shapeList[i], 'seriesIndex');
                if (aniMap[seriesIndex]) {
                    if (self.shapeList[i].shape == 'sector'
                        || self.shapeList[i].shape == 'circle'
                        || self.shapeList[i].shape == 'ring'
                    ) {
                        r = self.shapeList[i].style.r;
                        zr.animate(self.shapeList[i].id, 'style')
                            .when(
                                300,
                                {r : r * 0.9}
                            )
                            .when(
                                500,
                                {r : r}
                            )
                            .start();
                    }
                }
            }
        }
         */
        
        /**
         * ��̬�������Ӷ��� 
         */
        function addDataAnimation(params) {
            var aniMap = {}; // seriesIndex��������
            for (var i = 0, l = params.length; i < l; i++) {
                aniMap[params[i][0]] = params[i];
            }
            
            // �����µı�ͼƥ�����������
            var sectorMap = {};
            var textMap = {};
            var lineMap = {};
            var backupShapeList = zrUtil.clone(self.shapeList);
            self.shapeList = [];
            
            var seriesIndex;
            var isHead;
            var dataGrow;
            var deltaIdxMap = {};   // �����������ݺ���dataIndex������λƥ��
            for (var i = 0, l = params.length; i < l; i++) {
                seriesIndex = params[i][0];
                isHead = params[i][2];
                dataGrow = params[i][3];
                if (series[seriesIndex]
                    && series[seriesIndex].type == ecConfig.CHART_TYPE_PIE
                ) {
                    if (isHead) {
                        if (!dataGrow) {
                            sectorMap[
                                seriesIndex 
                                + '_' 
                                + series[seriesIndex].data.length
                            ] = 'delete';
                        }
                        deltaIdxMap[seriesIndex] = 1;
                    }
                    else {
                        if (!dataGrow) {
                            sectorMap[seriesIndex + '_-1'] = 'delete';
                            deltaIdxMap[seriesIndex] = -1;
                        }
                        else {
                            deltaIdxMap[seriesIndex] = 0;
                        }
                    }
                    _buildSinglePie(seriesIndex);
                }
            }
            var dataIndex;
            var key;
            for (var i = 0, l = self.shapeList.length; i < l; i++) {
                seriesIndex = self.shapeList[i]._seriesIndex;
                dataIndex = self.shapeList[i]._dataIndex;
                key = seriesIndex + '_' + dataIndex;
                // mapӳ����n*n��n
                switch (self.shapeList[i].shape) {
                    case 'sector' :
                        sectorMap[key] = self.shapeList[i];
                        break;
                    case 'text' :
                        textMap[key] = self.shapeList[i];
                        break;
                    case 'line' :
                        lineMap[key] = self.shapeList[i];
                        break;
                }
            }
            self.shapeList = [];
            var targeSector;
            for (var i = 0, l = backupShapeList.length; i < l; i++) {
                seriesIndex = backupShapeList[i]._seriesIndex;
                if (aniMap[seriesIndex]) {
                    dataIndex = backupShapeList[i]._dataIndex
                                + deltaIdxMap[seriesIndex];
                    key = seriesIndex + '_' + dataIndex;
                    targeSector = sectorMap[key];
                    if (!targeSector) {
                        continue;
                    }
                    if (backupShapeList[i].shape == 'sector') {
                        if (targeSector != 'delete') {
                            // ԭ������
                            zr.animate(backupShapeList[i].id, 'style')
                                .when(
                                    400,
                                    {
                                        startAngle : 
                                            targeSector.style.startAngle,
                                        endAngle : 
                                            targeSector.style.endAngle
                                    }
                                )
                                .start();
                        }
                        else {
                            // ɾ��������
                            zr.animate(backupShapeList[i].id, 'style')
                                .when(
                                    400,
                                    deltaIdxMap[seriesIndex] < 0
                                    ? {
                                        endAngle : 
                                            backupShapeList[i].style.startAngle
                                      }
                                    : {
                                        startAngle :
                                            backupShapeList[i].style.endAngle
                                      }
                                )
                                .start();
                        }
                    }
                    else if (backupShapeList[i].shape == 'text'
                             || backupShapeList[i].shape == 'line'
                    ) {
                        if (targeSector == 'delete') {
                            // ɾ���߼�һ��
                            zr.delShape(backupShapeList[i].id);
                        }
                        else {
                            // �����½������ˣ�����һ��
                            switch (backupShapeList[i].shape) {
                                case 'text':
                                    targeSector = textMap[key];
                                    zr.animate(backupShapeList[i].id, 'style')
                                        .when(
                                            400,
                                            {
                                                x :targeSector.style.x,
                                                y :targeSector.style.y
                                            }
                                        )
                                        .start();
                                    break;
                                case 'line':
                                    targeSector = lineMap[key];
                                    zr.animate(backupShapeList[i].id, 'style')
                                        .when(
                                            400,
                                            {
                                                xStart:targeSector.style.xStart,
                                                yStart:targeSector.style.yStart,
                                                xEnd : targeSector.style.xEnd,
                                                yEnd : targeSector.style.yEnd
                                            }
                                        )
                                        .start();
                                    break;
                            }
                            
                        }
                    }
                }
            }
            self.shapeList = backupShapeList;
        }

        /**
         * �����趨
         */
        function animation() {
            var duration = self.query(option, 'animationDuration');
            var easing = self.query(option, 'animationEasing');
            var x;
            var y;
            var r0;
            var r;
            var serie;
            var dataIndex;

            for (var i = 0, l = self.shapeList.length; i < l; i++) {
                if (self.shapeList[i].shape == 'sector'
                    || self.shapeList[i].shape == 'circle'
                    || self.shapeList[i].shape == 'ring'
                ) {
                    x = self.shapeList[i].style.x;
                    y = self.shapeList[i].style.y;
                    r0 = self.shapeList[i].style.r0;
                    r = self.shapeList[i].style.r;

                    zr.modShape(
                        self.shapeList[i].id, 
                        {
                            rotation : [Math.PI*2, x, y],
                            style : {
                                r0 : 0,
                                r : 0
                            }
                        },
                        true
                    );

                    serie = ecData.get(self.shapeList[i], 'series');
                    dataIndex = ecData.get(self.shapeList[i], 'dataIndex');
                    zr.animate(self.shapeList[i].id, 'style')
                        .when(
                            (self.query(serie,'animationDuration')
                            || duration)
                            + dataIndex * 10,
                            {
                                r0 : r0,
                                r : r
                            }
                        )
                        .start('QuinticOut');
                    zr.animate(self.shapeList[i].id, '')
                        .when(
                            (self.query(serie,'animationDuration')
                            || duration)
                            + dataIndex * 100,
                            {rotation : [0, x, y]}
                        )
                        .start(
                            self.query(serie, 'animationEasing') || easing
                        );
                }
                else if (!self.shapeList[i]._mark){
                    dataIndex = self.shapeList[i]._dataIndex;
                    zr.modShape(
                        self.shapeList[i].id, 
                        {
                            scale : [0, 0, x, y]
                        },
                        true
                    );
                    zr.animate(self.shapeList[i].id, '')
                        .when(
                            duration + dataIndex * 100,
                            {scale : [1, 1, x, y]}
                        )
                        .start('QuinticOut');
                }
            }
            
            self.animationMark(duration, easing);
        }

        function onclick(param) {
            if (!self.isClick || !param.target) {
                // û���ڵ�ǰʵ���Ϸ������ֱ�ӷ���
                return;
            }
            var offset;             // ƫ��
            var target = param.target;
            var style = target.style;
            var seriesIndex = ecData.get(target, 'seriesIndex');
            var dataIndex = ecData.get(target, 'dataIndex');

            for (var i = 0, len = self.shapeList.length; i < len; i++) {
                if (self.shapeList[i].id == target.id) {
                    seriesIndex = ecData.get(target, 'seriesIndex');
                    dataIndex = ecData.get(target, 'dataIndex');
                    // ��ǰ�����
                    if (!style._hasSelected) {
                        var midAngle = 
                            ((style.startAngle + style.endAngle) / 2)
                            .toFixed(2) - 0;
                        target.style._hasSelected = true;
                        _selected[seriesIndex][dataIndex] = true;
                        target.style._x = target.style.x;
                        target.style._y = target.style.y;
                        offset = self.query(
                            series[seriesIndex],
                            'selectedOffset'
                        );
                        target.style.x += zrMath.cos(midAngle, true) 
                                          * offset;
                        target.style.y -= zrMath.sin(midAngle, true) 
                                          * offset;
                    }
                    else {
                        // ��λ
                        target.style.x = target.style._x;
                        target.style.y = target.style._y;
                        target.style._hasSelected = false;
                        _selected[seriesIndex][dataIndex] = false;
                    }
                    
                    zr.modShape(target.id, target);
                }
                else if (self.shapeList[i].style._hasSelected
                         && _selectedMode == 'single'
                ) {
                    seriesIndex = ecData.get(self.shapeList[i], 'seriesIndex');
                    dataIndex = ecData.get(self.shapeList[i], 'dataIndex');
                    // ��ѡģʽ����Ҫȡ�������Ѿ�ѡ�е�
                    self.shapeList[i].style.x = self.shapeList[i].style._x;
                    self.shapeList[i].style.y = self.shapeList[i].style._y;
                    self.shapeList[i].style._hasSelected = false;
                    _selected[seriesIndex][dataIndex] = false;
                    zr.modShape(
                        self.shapeList[i].id, self.shapeList[i]
                    );
                }
            }
            
            messageCenter.dispatch(
                ecConfig.EVENT.PIE_SELECTED,
                param.event,
                {selected : _selected}
            );
            zr.refresh();
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
            if (dataIndex == -1) {
                // �䵽pieCase�ϣ����ݱ���ק��ĳ����ͼ����������
                data = {
                    value : ecData.get(dragged, 'value'),
                    name : ecData.get(dragged, 'name')
                };

                // �ޱ�ͼ��ֵ��Ϊ��ֵ
                if (data.value < 0) {
                    data.value = 0;
                }

                series[seriesIndex].data.push(data);

                legend && legend.add(
                    data.name,
                    dragged.style.color || dragged.style.strokeColor
                );
            }
            else {
                // �䵽sector�ϣ����ݱ���ק��ĳ���������ϣ������޸�
                var accMath = require('../util/accMath');
                data = series[seriesIndex].data[dataIndex];
                legend && legend.del(data.name);
                data.name += option.nameConnector
                             + ecData.get(dragged, 'name');
                data.value = accMath.accAdd(
                    data.value,
                    ecData.get(dragged, 'value')
                );
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
         * �����̬�Ӿ�������
         */
        self.shapeHandler.onmouseover = function(param) {
            var shape = param.target;
            var seriesIndex = ecData.get(shape, 'seriesIndex');
            var dataIndex = ecData.get(shape, 'dataIndex');
            var percent = ecData.get(shape, 'special');
            var lastAddRadius = shape._lastAddRadius;

            var startAngle = shape.style.startAngle;
            var endAngle = shape.style.endAngle;
            var defaultColor = shape.highlightStyle.color;
            
            // �ı���ǩ����Ҫ��ʾ����з���
            var label = _getLabel(
                    seriesIndex, dataIndex, percent, lastAddRadius,
                    startAngle, endAngle, defaultColor,
                    true
                );
            if (label) {
                zr.addHoverShape(label);
            }
            
            // �ı���ǩ�Ӿ������ߣ���Ҫ��ʾ����з���
            var labelLine = _getLabelLine(
                    seriesIndex, dataIndex, lastAddRadius,
                    shape.style.r0, shape.style.r,
                    startAngle, endAngle, defaultColor,
                    true
                );
            if (labelLine) {
                zr.addHoverShape(labelLine);
            }
        };

        self.reformOption = reformOption;   // ���ػ��෽��
        self.animation = animation;
        
        // �ӿڷ���
        self.init = init;
        self.refresh = refresh;
        self.addDataAnimation = addDataAnimation;
        self.onclick = onclick;
        self.ondrop = ondrop;
        self.ondragend = ondragend;

        init(option, component);
    }

    // ͼ��ע��
    require('../chart').define('pie', Pie);
    
    return Pie;
});