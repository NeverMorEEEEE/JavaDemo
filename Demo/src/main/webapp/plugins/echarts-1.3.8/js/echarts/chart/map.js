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
    function Map(ecConfig, messageCenter, zr, option, component){
        // ����װ��
        var ComponentBase = require('../component/base');
        ComponentBase.call(this, ecConfig, zr);
        // �ɼ�������װ��
        var CalculableBase = require('./calculableBase');
        CalculableBase.call(this, zr, option);

        var ecData = require('../util/ecData');

        var zrConfig = require('zrender/config');
        var zrUtil = require('zrender/tool/util');
        var zrEvent = require('zrender/tool/event');

        var self = this;
        self.type = ecConfig.CHART_TYPE_MAP;

        var series;                 // ��������Դ����Ҫ�޸ĸ��Լ��޹ص���

        var _zlevelBase = self.getZlevelBase();
        var _selectedMode;      // ѡ��ģʽ
        var _hoverable;         // ��������ģʽ��������ͼ��
        var _showLegendSymbol;  // ��ʾͼ����ɫ��ʶ
        var _selected = {};     // ��ͼѡ��״̬
        var _mapTypeMap = {};   // ͼ����������
        var _mapDataMap = {};   // ���ݵ�ͼ��������bbox,transform,path
        var _shapeListMap = {}; // ���ֵ�shapeList����ӳ��
        var _nameMap = {};      // ���Ի�����
        var _specialArea = {};  // ����

        var _refreshDelayTicket; // ��������ʱ��refresh��һ��
        var _mapDataRequireCounter;
        var _mapParams = require('../util/mapData/params').params;
        var _textFixed = require('../util/mapData/textFixed');
        var _geoCoord = require('../util/mapData/geoCoord');
        
        // ���������Ϣ
        var _roamMap = {};
        var _needRoam;
        var _mx;
        var _my;
        var _mousedown;
        var _justMove;   // �����ƶ���Ӧ���
        var _curMapType; // ��ǰ�ƶ��ĵ�ͼ����
        
        var _markAnimation = false;

        function _buildShape() {
            self.selectedMap = {};
            
            var legend = component.legend;
            var seriesName;
            var valueData = {};
            var mapType;
            var data;
            var name;
            var mapSeries = {};
            var mapValuePrecision = {};
            _selectedMode = {};
            _hoverable = {};
            _showLegendSymbol = {};
            var valueCalculation = {};
            _needRoam = false;
            for (var i = 0, l = series.length; i < l; i++) {
                if (series[i].type == ecConfig.CHART_TYPE_MAP) { // map
                    series[i] = self.reformOption(series[i]);
                    mapType = series[i].mapType;
                    mapSeries[mapType] = mapSeries[mapType] || {};
                    mapSeries[mapType][i] = true;
                    mapValuePrecision[mapType] = mapValuePrecision[mapType]
                                                 || series[i].mapValuePrecision;
                    _roamMap[mapType] = series[i].roam || _roamMap[mapType];
                    _needRoam = _needRoam || _roamMap[mapType];
                    _nameMap[mapType] = series[i].nameMap 
                                        || _nameMap[mapType] 
                                        || {};

                    if (series[i].textFixed) {
                        zrUtil.mergeFast(
                            _textFixed, series[i].textFixed, true, false
                        );
                    }
                    if (series[i].geoCoord) {
                        zrUtil.mergeFast(
                            _geoCoord, series[i].geoCoord, true, false
                        );
                    }
                    
                    _selectedMode[mapType] = _selectedMode[mapType] 
                                             || series[i].selectedMode;
                    if (typeof _hoverable[mapType] == 'undefined'
                        || _hoverable[mapType]                  // false 1Ʊ���
                    ) {
                        _hoverable[mapType] = series[i].hoverable; 
                    }
                    if (typeof _showLegendSymbol[mapType] == 'undefined'
                        || _showLegendSymbol[mapType]           // false 1Ʊ���
                    ) {
                        _showLegendSymbol[mapType] = series[i].showLegendSymbol;
                    }
                    
                    valueCalculation[mapType] = valueCalculation[mapType] 
                                               || series[i].mapValueCalculation;
                    
                    seriesName = series[i].name;
                    self.selectedMap[seriesName] = legend
                        ? legend.isSelected(seriesName)
                        : true;
                    if (self.selectedMap[seriesName]) {
                        valueData[mapType] = valueData[mapType] || {};
                        data = series[i].data;
                        for (var j = 0, k = data.length; j < k; j++) {
                            name = _nameChange(mapType, data[j].name);
                            valueData[mapType][name] = valueData[mapType][name] 
                                                       || {seriesIndex : []};
                            for (var key in data[j]) {
                                if (key != 'value') {
                                    valueData[mapType][name][key] = 
                                        data[j][key];
                                }
                                else if (!isNaN(data[j].value)) {
                                    typeof valueData[mapType][name].value
                                        == 'undefined'
                                    && (valueData[mapType][name].value = 0);
                                    
                                    valueData[mapType][name].value += 
                                        data[j].value;
                                }
                            }
                            //�����и������ϵ����ʽ
                            valueData[mapType][name].seriesIndex.push(i);
                        }
                    }
                }
            }
            
            _mapDataRequireCounter = 0;
            for (var mt in valueData) {
                _mapDataRequireCounter++;
            }
            for (var mt in valueData) {
                if (valueCalculation[mt] && valueCalculation[mt] == 'average') {
                    for (var k in valueData[mt]) {
                        valueData[mt][k].value = 
                            (valueData[mt][k].value 
                             / valueData[mt][k].seriesIndex.length)
                            .toFixed(
                                mapValuePrecision[mt]
                            ) - 0;
                    }
                }
                
                _mapDataMap[mt] = _mapDataMap[mt] || {};
                if (_mapDataMap[mt].mapData) {
                    // �Ѿ���������ֱ����
                    _mapDataCallback(mt, valueData[mt], mapSeries[mt])(
                        _mapDataMap[mt].mapData
                    );
                }
                else if (_mapParams[mt.replace(/\|.*/, '')].getGeoJson) {
                    // ��������
                    _specialArea[mt] = 
                        _mapParams[mt.replace(/\|.*/, '')].specialArea
                        || _specialArea[mt];
                    _mapParams[mt.replace(/\|.*/, '')].getGeoJson(
                        _mapDataCallback(mt, valueData[mt], mapSeries[mt])
                    );
                }
            }
        }
        
        /**
         * @param {string} mt mapType
         * @parma {Object} vd valueData
         * @param {Object} ms mapSeries
         */
        function _mapDataCallback(mt, vd, ms) {
            return function(md) {
                // �����������
                if (mt.indexOf('|') != -1) {
                    // �ӵ�ͼ���ӹ�һ���µ�mapData
                    md = _getSubMapData(mt, md);
                }
                _mapDataMap[mt].mapData = md;
                _buildMap(
                    mt,                             // ����
                    _getProjectionData(             // ��ͼ����
                        mt,
                        md,
                        ms
                    ),  
                    vd,                  // �û�����
                    ms                   // ϵ��
                );
                _buildMark(mt, ms);
                if (--_mapDataRequireCounter <= 0) {
                    _shapeListMap = {};
                    for (var i = 0, l = self.shapeList.length; i < l; i++) {
                        self.shapeList[i].id = zr.newShapeId(self.type);
                        zr.addShape(self.shapeList[i]);
                        // ͨ��name����shape������onmouseover
                        if (self.shapeList[i].shape == 'path' 
                            && typeof self.shapeList[i].style._text != 'undefined'
                        ) {
                            _shapeListMap[self.shapeList[i].style._text] = self.shapeList[i];
                        }
                    }
                    zr.refresh();
                    if (!_markAnimation) {
                        _markAnimation = true;
                        if (option.animation && !option.renderAsImage) {
                            self.animationMark(option.animationDuration);
                        }
                    }
                }
            };
        }
        
        function _getSubMapData(mapType, mapData) {
            var subType = mapType.replace(/^.*\|/, '');
            var features = mapData.features;
            for (var i = 0, l = features.length; i < l; i++) {
                if (features[i].properties 
                    && features[i].properties.name == subType
                ) {
                    features = features[i];
                    if (subType == 'United States of America'
                        && features.geometry.coordinates.length > 1 // δ����
                    ) {
                        features = {
                            geometry: {
                                coordinates: features.geometry
                                                     .coordinates.slice(5,6),
                                type: features.geometry.type
                            },
                            id: features.id,
                            properties: features.properties,
                            type: features.type
                        };
                    }
                    break;
                }
            }
            return {
                'type' : 'FeatureCollection',
                'features':[
                    features
                ]
            };
        }
        
        /**
         * ���������ص�ͼ 
         */
        function _getProjectionData(mapType, mapData, mapSeries) {
            var normalProjection = require('../util/projection/normal');
            var province = [];
            
            // bbox��Զ����
            var bbox = _mapDataMap[mapType].bbox 
                       || normalProjection.getBbox(
                              mapData, _specialArea[mapType]
                          );
            //console.log(bbox)
            
            var transform;
            //console.log(1111,transform)
            if (!_mapDataMap[mapType].hasRoam) {
                // ��һ�λ��߷�����resize����Ҫ�ж�
                transform = _getTransform(
                    bbox,
                    mapSeries
                );
            }
            else {
                //�����û����β�����Ӧresize
                transform = _mapDataMap[mapType].transform;
            }
            //console.log(bbox,transform)
            var lastTransform = _mapDataMap[mapType].lastTransform 
                                || {scale:{}};
            
            var pathArray;
            if (transform.left != lastTransform.left
                || transform.top != lastTransform.top
                || transform.scale.x != lastTransform.scale.x
                || transform.scale.y != lastTransform.scale.y
            ) {
                // �������仯����Ҫ��������pathArray
                // һ��Ͷ��
                //console.log(transform)
                pathArray = normalProjection.geoJson2Path(
                                mapData, transform, _specialArea[mapType]
                            );
                lastTransform = zrUtil.clone(transform);
            }
            else {
                transform = _mapDataMap[mapType].transform;
                pathArray = _mapDataMap[mapType].pathArray;
            }
            
            _mapDataMap[mapType].bbox = bbox;
            _mapDataMap[mapType].transform = transform;
            _mapDataMap[mapType].lastTransform = lastTransform;
            _mapDataMap[mapType].pathArray = pathArray;
            
            //console.log(pathArray)
            var position = [transform.left, transform.top];
            for (var i = 0, l = pathArray.length; i < l; i++) {
                /* for test
                console.log(
                    mapData.features[i].properties.cp, // ��γ�ȶ�
                    pathArray[i].cp                    // ƽ������
                );
                console.log(
                    pos2geo(mapType, pathArray[i].cp),  // ƽ������ת��γ��
                    geo2pos(mapType, mapData.features[i].properties.cp)
                )
                */
                province.push(_getSingleProvince(
                    mapType, pathArray[i], position
                ));
            }
            
            if (_specialArea[mapType]) {
                for (var area in _specialArea[mapType]) {
                    province.push(_getSpecialProjectionData(
                        mapType, mapData, 
                        area, _specialArea[mapType][area], 
                        position
                    ));
                }
                
            }
            
            // �й���ͼ�����Ϻ��
            if (mapType == 'china') {
                var leftTop = geo2pos(
                    mapType, 
                    _geoCoord['�Ϻ��'] 
                    || _mapParams['�Ϻ��'].textCoord
                );
                // scale.x : width  = 10.51 : 64
                var scale = transform.scale.x / 10.5;
                var textPosition = [
                    32 * scale + leftTop[0], 
                    83 * scale + leftTop[1]
                ];
                if (_textFixed['�Ϻ��']) {
                    textPosition[0] += _textFixed['�Ϻ��'][0];
                    textPosition[1] += _textFixed['�Ϻ��'][1];
                }
                province.push({
                    text : _nameChange(mapType, '�Ϻ��'),
                    path : _mapParams['�Ϻ��'].getPath(
                               leftTop, scale
                           ),
                    position : position,
                    textX : textPosition[0],
                    textY : textPosition[1]
                });
                
            }
            
            return province;
        }
        
        /**
         * �������Ͷ������
         */
        function _getSpecialProjectionData(
            mapType, mapData, areaName, mapSize, position
        ) {
            //console.log('_getSpecialProjectionData--------------')
            // ���쵥����geoJson��ͼ����
            mapData = _getSubMapData('x|' + areaName, mapData);
            
            // bbox
            var normalProjection = require('../util/projection/normal');
            var bbox = normalProjection.getBbox(mapData);
            //console.log('bbox', bbox)
            
            // transform
            var leftTop = geo2pos(
                mapType, 
                [mapSize.left, mapSize.top]
            );
            var rightBottom = geo2pos(
                mapType, 
                [mapSize.left + mapSize.width, mapSize.top + mapSize.height]
            );
            //console.log('leftright' , leftTop, rightBottom);
            var width = Math.abs(rightBottom[0] - leftTop[0]);
            var height = Math.abs(rightBottom[1] - leftTop[1]);
            var mapWidth = bbox.width;
            var mapHeight = bbox.height;
            //var minScale;
            var xScale = (width / 0.75) / mapWidth;
            var yScale = height / mapHeight;
            if (xScale > yScale) {
                xScale = yScale * 0.75;
                width = mapWidth * xScale;
            }
            else {
                yScale = xScale;
                xScale = yScale * 0.75;
                height = mapHeight * yScale;
            }
            var transform = {
                OffsetLeft : leftTop[0],
                OffsetTop : leftTop[1],
                //width: width,
                //height: height,
                scale : {
                    x : xScale,
                    y : yScale
                }
            };
            
            //console.log('**',areaName, transform)
            var pathArray = normalProjection.geoJson2Path(
                mapData, transform
            );
            
            //console.log(pathArray)
            return _getSingleProvince(
                mapType, pathArray[0], position
            );
        }
        
        function _getSingleProvince(mapType, path, position) {
            var textPosition;
            var name = path.properties.name;
            if (_geoCoord[name]) {
                textPosition = geo2pos(
                    mapType, 
                    _geoCoord[name]
                );
            }
            else if (path.cp) {
                textPosition = [path.cp[0], path.cp[1]];
            }
            /*
            else {
                textPosition = geo2pos(
                    mapType, 
                    [bbox.left + bbox.width / 2, bbox.top + bbox.height / 2]
                );
            }
            */
            if (_textFixed[name]) {
                textPosition[0] += _textFixed[name][0];
                textPosition[1] += _textFixed[name][1];
            }
            //console.log(textPosition)
            return {
                text : _nameChange(mapType, name),
                path : path.path,
                position : position,
                textX : textPosition[0],
                textY : textPosition[1]
            };
        }
        /**
         * ��ȡ���� 
         */
        function _getTransform(bbox, mapSeries) {
            var mapLocation;
            var x;
            var cusX;
            var y;
            var cusY;
            var width;
            var height;
            var zrWidth = zr.getWidth();
            var zrHeight = zr.getHeight();
            //������������
            var padding = Math.round(Math.min(zrWidth, zrHeight) * 0.02);
            for (var key in mapSeries) {
                mapLocation = series[key].mapLocation;
                cusX = mapLocation.x || cusX;
                cusY = mapLocation.y || cusY;
                width = mapLocation.width || width;
                height = mapLocation.height || height;
            }
            
            //x = isNaN(cusX) ? padding : cusX;
            x = self.parsePercent(cusX, zrWidth);
            x = isNaN(x) ? padding : x;
            //y = isNaN(cusY) ? padding : cusY;
            y = self.parsePercent(cusY, zrHeight);
            y = isNaN(y) ? padding : y;
            if (typeof width == 'undefined') {
                width = isNaN(cusX) 
                        ? zrWidth - 2 * padding
                        : zrWidth - x - 2 * padding;
            }
            else {
                width = self.parsePercent(width, zrWidth);
            }
            
            if (typeof height == 'undefined') {
                height = isNaN(cusY) 
                         ? zrHeight - 2 * padding
                         : zrHeight - y - 2 * padding;
            }
            else {
                height = self.parsePercent(height, zrHeight);
            }
            
            var mapWidth = bbox.width;
            var mapHeight = bbox.height;
            //var minScale;
            var xScale = (width / 0.75) / mapWidth;
            var yScale = height / mapHeight;
            if (xScale > yScale) {
                //minScale = yScale;
                xScale = yScale * 0.75;
                width = mapWidth * xScale;
            }
            else {
                //minScale = xScale;
                yScale = xScale;
                xScale = yScale * 0.75;
                height = mapHeight * yScale;
            }
            //console.log(minScale)
            //width = mapWidth * minScale;
            //height = mapHeight * minScale;
            
            if (isNaN(cusX)) {
                switch (cusX + '') {
                    case 'center' :
                        x = Math.floor((zrWidth - width) / 2);
                        break;
                    case 'right' :
                        x = zrWidth - width;
                        break;
                    //case 'left' :
                    default:
                        //x = padding;
                        break;
                }
            }
            //console.log(cusX,x,zrWidth,width,'kener')
            if (isNaN(cusY)) {
                switch (cusY + '') {
                    case 'center' :
                        y = Math.floor((zrHeight - height) / 2);
                        break;
                    case 'bottom' :
                        y = zrHeight - height;
                        break;
                    //case 'top' :
                    default:
                        //y = padding;
                        break;
                }
            }
            //console.log(x,y,width,height)
            return {
                left : x,
                top : y,
                width: width,
                height: height,
                //scale : minScale * 50,  // wtf 50
                scale : {
                    x : xScale,
                    y : yScale
                }
                //translate : [x + width / 2, y + height / 2]
            };
        }
        
        /**
         * ������ͼ
         * @param {Object} mapData ͼ������
         * @param {Object} valueData �û�����
         */
        function _buildMap(mapType, mapData, valueData, mapSeries) {
            var legend = component.legend;
            var dataRange = component.dataRange;
            var seriesName;
            var name;
            var data;
            var value;
            var queryTarget;
            var defaultOption = ecConfig.map;
            
            var color;
            var font;
            var style;
            var highlightStyle;
            
            var shape;
            var textShape; 
            for (var i = 0, l = mapData.length; i < l; i++) {
                style = zrUtil.clone(mapData[i]);
                highlightStyle = zrUtil.clone(style);
                name = style.text;
                data = valueData[name]; // ��ϵ�кϲ��������
                if (data) {
                    queryTarget = [data]; // level 3
                    seriesName = '';
                    for (var j = 0, k = data.seriesIndex.length; j < k; j++) {
                        // level 2
                        queryTarget.push(series[data.seriesIndex[j]]);
                        seriesName += series[data.seriesIndex[j]].name + ' ';
                        if (legend
                            && _showLegendSymbol[mapType] 
                            && legend.hasColor(series[data.seriesIndex[j]].name)
                        ) {
                            self.shapeList.push({
                                shape : 'circle',
                                zlevel : _zlevelBase + 1,
                                position : style.position,
                                _mapType : mapType,
                                style : {
                                    x : style.textX + 3 + j * 7,
                                    y : style.textY - 10,
                                    r : 3,
                                    color : legend.getColor(
                                        series[data.seriesIndex[j]].name
                                    )
                                },
                                hoverable : false
                            });
                        }
                    }
                    queryTarget.push(defaultOption); // level 1
                    value = data.value;
                }
                else {
                    data = '-';
                    seriesName = '';
                    queryTarget = [];
                    for (var key in mapSeries) {
                        queryTarget.push(series[key]);
                    }
                    queryTarget.push(defaultOption);
                    value = '-';
                }
                
                // ֵ��ؼ�����
                color = (dataRange && !isNaN(value))
                        ? dataRange.getColor(value)
                        : null;
                
                // ��������
                style.brushType = 'both';
                style.color = color || self.deepQuery(
                                  queryTarget,
                                  'itemStyle.normal.areaStyle.color'
                              );
                style.strokeColor = self.deepQuery(
                    queryTarget,
                    'itemStyle.normal.borderColor'
                );
                style.lineWidth = self.deepQuery(
                    queryTarget,
                    'itemStyle.normal.borderWidth'
                );
                style.text = _getLabelText(name, value, queryTarget, 'normal');
                style._text = name;
                style.textAlign = 'center';
                style.textColor = self.deepQuery(
                    queryTarget,
                    'itemStyle.normal.label.textStyle.color'
                );
                font = self.deepQuery(
                    queryTarget,
                    'itemStyle.normal.label.textStyle'
                );
                style.textFont = self.getFont(font);
                if (!self.deepQuery(
                    queryTarget,
                    'itemStyle.normal.label.show'
                )) {
                    style.textColor = 'rgba(0,0,0,0)';  // Ĭ�ϲ���������
                }
                
                // ���ֱ�ǩ���⸲�ǵ���һ��shape
                textShape = {
                    shape : 'text',
                    zlevel : _zlevelBase + 1,
                    hoverable: _hoverable[mapType],
                    position : style.position,
                    _mapType : mapType,
                    style : {
                        brushType: 'both',
                        x : style.textX,
                        y : style.textY,
                        text : _getLabelText(
                            name, value, queryTarget, 'normal'
                        ),
                        _text : name,
                        textAlign : 'center',
                        color : style.textColor,
                        strokeColor : 'rgba(0,0,0,0)',
                        textFont : style.textFont
                    },
                    onmouseover : self.shapeHandler.onmouseover
                };
                textShape._style = zrUtil.clone(textShape.style);
                textShape.highlightStyle = zrUtil.clone(textShape.style);
                // labelInteractive && (textShape.highlightStyle.strokeColor = 'yellow');
                style.textColor = 'rgba(0,0,0,0)';  // ��ͼ�ε�text����
                
                // ����
                highlightStyle.brushType = 'both';
                highlightStyle.color = self.deepQuery(
                    queryTarget,
                    'itemStyle.emphasis.areaStyle.color'
                ) || style.color;
                highlightStyle.strokeColor = self.deepQuery(
                    queryTarget,
                    'itemStyle.emphasis.borderColor'
                ) || style.strokeColor;
                highlightStyle.lineWidth = self.deepQuery(
                    queryTarget,
                    'itemStyle.emphasis.borderWidth'
                ) || style.lineWidth;
                highlightStyle._text = name;
                if (self.deepQuery(
                    queryTarget,
                    'itemStyle.emphasis.label.show'
                )) {
                    highlightStyle.text = _getLabelText(
                        name, value, queryTarget, 'emphasis'
                    );
                    highlightStyle.textAlign = 'center';
                    highlightStyle.textColor = self.deepQuery(
                        queryTarget,
                        'itemStyle.emphasis.label.textStyle.color'
                    ) || style.textColor;
                    font = self.deepQuery(
                        queryTarget,
                        'itemStyle.emphasis.label.textStyle'
                    ) || font;
                    highlightStyle.textFont = self.getFont(font);
                    highlightStyle.textPosition = 'specific';
                    textShape.highlightStyle.color = highlightStyle.textColor;
                    textShape.highlightStyle.textFont = highlightStyle.textFont;
                }
                else {
                    highlightStyle.textColor = 'rgba(0,0,0,0)'; // ��ͼ�ε�text����
                }

                shape = {
                    shape : 'path',
                    zlevel : _zlevelBase,
                    hoverable: _hoverable[mapType],
                    position : style.position,
                    style : style,
                    highlightStyle : highlightStyle,
                    _style: zrUtil.clone(style),
                    _mapType: mapType
                };
                
                if (_selectedMode[mapType] &&
                     _selected[name]
                     || (data.selected && _selected[name] !== false) 
                ) {
                    textShape.style = zrUtil.clone(
                        textShape.highlightStyle
                    );
                    shape.style = zrUtil.clone(shape.highlightStyle);
                }
                
                if (_selectedMode[mapType]) {
                    _selected[name] = typeof _selected[name] != 'undefined'
                                      ? _selected[name]
                                      : data.selected;
                    _mapTypeMap[name] = mapType;
                    
                    if (typeof data.selectable == 'undefined' || data.selectable) {
                        textShape.clickable = true;
                        textShape.onclick = self.shapeHandler.onclick;
                        
                        shape.clickable = true;
                        shape.onclick = self.shapeHandler.onclick;
                    }
                }
                
                if (typeof data.hoverable != 'undefined') {
                    textShape.onmouseover = null;
                    textShape.hoverable = shape.hoverable = data.hoverable;
                }
                
                // console.log(name,shape);
                
                ecData.pack(
                    textShape,
                    {
                        name: seriesName,
                        tooltip: self.deepQuery(queryTarget, 'tooltip')
                    },
                    0,
                    data, 0,
                    name
                );
                self.shapeList.push(textShape);
                
                ecData.pack(
                    shape,
                    {
                        name: seriesName,
                        tooltip: self.deepQuery(queryTarget, 'tooltip')
                    },
                    0,
                    data, 0,
                    name
                );
                self.shapeList.push(shape);
            }
            //console.log(_selected);
        }
        
        // ��ӱ�ע
        function _buildMark(mapType, mapSeries) {
            var position = [
                _mapDataMap[mapType].transform.left,
                _mapDataMap[mapType].transform.top
            ];
            for (var sIdx in mapSeries) {
                self.buildMark(
                    series[sIdx],
                    sIdx,
                    component,
                    {
                        mapType : mapType
                    },
                    {
                        position : position,
                        _mapType : mapType
                    }
                );
            }
        }
        
        // λ��ת��
        function getMarkCoord(serie, seriesIndex, mpData, markCoordParams) {
            return _geoCoord[mpData.name]
                   ? geo2pos(
                         markCoordParams.mapType, _geoCoord[mpData.name]
                     )
                   : [0, 0];
        }
            
        function _nameChange(mapType, name) {
            return _nameMap[mapType][name] || name;
        }
        
        /**
         * ����lable.format����label text
         */
        function _getLabelText(name, value, queryTarget, status) {
            var formatter = self.deepQuery(
                queryTarget,
                'itemStyle.' + status + '.label.formatter'
            );
            if (formatter) {
                if (typeof formatter == 'function') {
                    return formatter(
                        name,
                        value
                    );
                }
                else if (typeof formatter == 'string') {
                    formatter = formatter.replace('{a}','{a0}')
                                         .replace('{b}','{b0}');
                    formatter = formatter.replace('{a0}', name)
                                         .replace('{b0}', value);
    
                    return formatter;
                }
            }
            else {
                return name;
            }
        }
        
        function _findMapTypeByPos(mx, my) {
            var transform;
            var left;
            var top;
            var width;
            var height;
            for (var mapType in _mapDataMap) {
                transform = _mapDataMap[mapType].transform;
                if (!transform || !_roamMap[mapType]) {
                    continue;
                }
                left = transform.left;
                top = transform.top;
                width = transform.width;
                height = transform.height;
                if (mx >= left
                    && mx <= (left + width)
                    && my >= top
                    && my <= (top + height)
                ) {
                    return mapType;
                }
            }
            return;
        }
        /**
         * �������� 
         */
        function _onmousewheel(param) {
            var event = param.event;
            var mx = zrEvent.getX(event);
            var my = zrEvent.getY(event);
            var delta = zrEvent.getDelta(event);
            //delta = delta > 0 ? (-1) : 1;
            var mapType = _findMapTypeByPos(mx, my);
            if (mapType) {
                var transform = _mapDataMap[mapType].transform;
                var left = transform.left;
                var top = transform.top;
                var width = transform.width;
                var height = transform.height;
                // λ��ת��γ��
                geoAndPos = pos2geo(mapType, [mx - left, my - top]);
                if (delta > 0) {
                    delta = 1.2;
                    // �Ŵ�
                    transform.scale.x *= delta;
                    transform.scale.y *= delta;
                    transform.width = width * delta;
                    transform.height = height * delta;
                }
                else {
                    // ��С
                    delta = 1.2;
                    transform.scale.x /= delta;
                    transform.scale.y /= delta;
                    transform.width = width / delta;
                    transform.height = height / delta;
                }
                _mapDataMap[mapType].hasRoam = true;
                _mapDataMap[mapType].transform = transform;
                // ��γ��תλ��
                geoAndPos = geo2pos(mapType, geoAndPos);
                // �����Ӿ�����
                transform.left -= geoAndPos[0] - (mx - left);
                transform.top -= geoAndPos[1] - (my - top);
                _mapDataMap[mapType].transform = transform;
                // ��refresh��һ��
                clearTimeout(_refreshDelayTicket);
                _refreshDelayTicket = setTimeout(refresh, 100);
                messageCenter.dispatch(
                    ecConfig.EVENT.MAP_ROAM,
                    param.event,
                    {type : 'scale'}
                );
                zrEvent.stop(event);
            }
        }
        
        function _onmousedown(param) {
            var target = param.target;
            if (target && target.draggable) {
                return;
            }
            var event = param.event;
            var mx = zrEvent.getX(event);
            var my = zrEvent.getY(event);
            var mapType = _findMapTypeByPos(mx, my);
            if (mapType) {
                _mousedown = true;
                _mx = mx;
                _my = my;
                _curMapType = mapType;
                setTimeout(function(){
                    zr.on(zrConfig.EVENT.MOUSEMOVE, _onmousemove);
                    zr.on(zrConfig.EVENT.MOUSEUP, _onmouseup);
                },50);
            }
            
        }
        
        function _onmousemove(param) {
            if (!_mousedown || !self) {
                return;
            }
            var event = param.event;
            var mx = zrEvent.getX(event);
            var my = zrEvent.getY(event);
            var transform = _mapDataMap[_curMapType].transform;
            transform.hasRoam = true;
            transform.left -= _mx - mx;
            transform.top -= _my - my;
            _mx = mx;
            _my = my;
            _mapDataMap[_curMapType].transform = transform;
            
            var position = [transform.left, transform.top];
            var mod = {position : [transform.left, transform.top]};
            for (var i = 0, l = self.shapeList.length; i < l; i++) {
                if(self.shapeList[i]._mapType == _curMapType) {
                    self.shapeList[i].position = position;
                    zr.modShape(self.shapeList[i].id, mod, true);
                }
            }
            messageCenter.dispatch(
                ecConfig.EVENT.MAP_ROAM,
                param.event,
                {type : 'move'}
            );
            zr.refresh();
            _justMove = true;
            zrEvent.stop(event);
        }
        
        function _onmouseup(param) {
            var event = param.event;
            _mx = zrEvent.getX(event);
            _my = zrEvent.getY(event);
            _mousedown = false;
            setTimeout(function(){
                _justMove = false;
                zr.un(zrConfig.EVENT.MOUSEMOVE, _onmousemove);
                zr.un(zrConfig.EVENT.MOUSEUP, _onmouseup);
            },100);
        }
        
        /**
         * �����Ӧ 
         */
        function onclick(param) {
            if (!self.isClick || !param.target || _justMove) {
                // û���ڵ�ǰʵ���Ϸ������ֱ�ӷ���
                return;
            }

            var target = param.target;
            var name = target.style._text;
            var len = self.shapeList.length;
            var mapType = target._mapType || '';
            if (_selectedMode[mapType] == 'single') {
                for (var p in _selected) {
                    // ͬһ��ͼ����
                    if (_selected[p] && _mapTypeMap[p] == mapType) {
                        // ��λ��Щ��Чshape���������֣�
                        for (var i = 0; i < len; i++) {
                            if (self.shapeList[i].style._text == p) {
                                self.shapeList[i].style = 
                                    self.shapeList[i]._style;
                                zr.modShape(
                                    self.shapeList[i].id, self.shapeList[i]
                                );
                            }
                        }
                        p != name && (_selected[p] = false);
                    }
                }
            }

            _selected[name] = !_selected[name];
            
            // ���µ�ǰ���shape���������֣�
            for (var i = 0; i < len; i++) {
                if (self.shapeList[i].style._text == name) {
                   if (_selected[name]) {
                        self.shapeList[i].style = zrUtil.clone(
                            self.shapeList[i].highlightStyle
                        );
                    }
                    else {
                        self.shapeList[i].style = self.shapeList[i]._style;
                    }
                    zr.modShape(
                        self.shapeList[i].id, 
                        {style : self.shapeList[i].style}
                    );
                }
            }
            
            messageCenter.dispatch(
                ecConfig.EVENT.MAP_SELECTED,
                param.event,
                {selected : _selected}
            );
            
            zr.refresh();
        }

        
        /**
         * ���캯��Ĭ��ִ�еĳ�ʼ��������Ҳ���ڴ���ʵ����̬�޸�
         * @param {Object} newSeries
         * @param {Object} newComponent
         */
        function init(newOption, newComponent) {
            component = newComponent;
            _selected = {};
            _mapTypeMap = {};
            _mapDataMap = {};
            _nameMap = {};
            _roamMap = {};
            _specialArea = {};
            _markAnimation = false;

            refresh(newOption);
            
            if (_needRoam) {
                zr.on(zrConfig.EVENT.MOUSEWHEEL, _onmousewheel);
                zr.on(zrConfig.EVENT.MOUSEDOWN, _onmousedown);
            }
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
            zr.refreshHover();
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
         * ƽ������ת��γ��
         */
        function pos2geo(mapType, p) {
            if (!_mapDataMap[mapType].transform) {
                return null;
            }
            return require('../util/projection/normal').pos2geo(
                _mapDataMap[mapType].transform, p
            );
        }
        
        /**
         * �����ӿ� : ƽ������ת��γ��
         */
        function getGeoByPos(mapType, p) {
            if (!_mapDataMap[mapType].transform) {
                return null;
            }
            var position = [
                _mapDataMap[mapType].transform.left,
                _mapDataMap[mapType].transform.top
            ];
            if (p instanceof Array) {
                p[0] -= position[0];
                p[1] -= position[1];
            }
            else {
                p.x -= position[0];
                p.y -= position[1];
            }
            return pos2geo(mapType, p);
        }
        
        /**
         * ��γ��תƽ������
         * @param {Object} p
         */
        function geo2pos(mapType, p) {
            if (!_mapDataMap[mapType].transform) {
                return null;
            }
            return require('../util/projection/normal').geo2pos(
                _mapDataMap[mapType].transform, p
            );
        }
        
        /**
         * �����ӿ� : ��γ��תƽ������
         */
        function getPosByGeo(mapType, p) {
            if (!_mapDataMap[mapType].transform) {
                return null;
            }
            var pos = geo2pos(mapType, p);
            pos[0] += _mapDataMap[mapType].transform.left;
            pos[1] += _mapDataMap[mapType].transform.top;
            return pos;
        }
        
        /**
         * �����ӿ� : ��ͼ�ο�����
         */
        function getMapPosition(mapType) {
            if (!_mapDataMap[mapType].transform) {
                return null;
            }
            return [
                _mapDataMap[mapType].transform.left,
                _mapDataMap[mapType].transform.top
            ];
        }
        
        /*
        function appendShape(mapType, shapeList) {
            shapeList = shapeList instanceof Array
                        ? shapeList : [shapeList];
            for (var i = 0, l = shapeList.length; i < l; i++) {
                if (typeof shapeList[i].id == 'undefined') {
                    shapeList[i].id = zr.newShapeId(self.type);
                }
                if (typeof shapeList[i].zlevel == 'undefined') {
                    shapeList[i].zlevel = _zlevelBase + 1;
                }
                shapeList[i]._mapType = mapType;
                self.shapeList.push(shapeList[i]);
                zr.addShape(shapeList[i]);
            }
            zr.refresh();
        }
        */
       
        /**
         * �ͷź�ʵ��������
         */
        function dispose() {
            self.clear();
            self.shapeList = null;
            self = null;
            if (_needRoam) {
                zr.un(zrConfig.EVENT.MOUSEWHEEL, _onmousewheel);
                zr.un(zrConfig.EVENT.MOUSEDOWN, _onmousedown);
            }
        }
        
        /**
         * �����������
         */
        self.shapeHandler.onmouseover = function(param) {
            var target = param.target;
            var name = target.style._text;
            if (_shapeListMap[name]) {
                zr.addHoverShape(_shapeListMap[name]);
            }
        };

        // ���ػ��෽��
        self.getMarkCoord = getMarkCoord;
        self.dispose = dispose;
        
        self.init = init;
        self.refresh = refresh;
        self.ondataRange = ondataRange;
        self.onclick = onclick;
        
        // �ȶ��ӿ�
        self.pos2geo = pos2geo;
        self.geo2pos = geo2pos;
        self.getMapPosition = getMapPosition;
        self.getPosByGeo = getPosByGeo;
        self.getGeoByPos = getGeoByPos;
        //self.appendShape = appendShape;
        
        init(option, component);
    }

    // ͼ��ע��
    require('../chart').define('map', Map);
    
    return Map;
});