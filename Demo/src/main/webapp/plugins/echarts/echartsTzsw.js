var myChart;
var domMain = document.getElementById('main');
var needRefresh = false;
var myurl;
var curTheme;
var echarts;
var developMode = false;
function requireCallback (ec, defaultTheme) {
    echarts = ec;
    ecReadyCallback();//echart实始化后回调    各页面重写该方法
    //window.onresize = myChart.resize; 
   
}
//echart实始化后回调    各页面重写该方法
ecReadyCallback = function(){
}
function refresh(surl){
    
    if (myChart && myChart.dispose) {
        myChart.dispose();
    }
    myChart = echarts.init(domMain, curTheme);
    
  //图表显示提示信息
    myChart.showLoading({
        text: "图表数据正在努力加载..."
    });
    //通过Ajax获取数据
    $.ajax({
        type: "post",
        async: false, //同步执行
        url: surl,
        dataType: "text", //返回数据形式为json
        success: function (result1) {
        	var result = eval("("+result1+")");
            if (result) { 
                myChart.hideLoading();
                myChart.setOption(result);
            }
        },
        error: function (errorMsg) {
            alert("图表请求数据失败啦!");
        }
    });
    return myChart;
}
function domrefresh(domMain,surl){
    var myChart;
    myChart = echarts.init(domMain, curTheme);
  //图表显示提示信息
    myChart.showLoading({
        text: "图表数据正在努力加载..."
    });
    //通过Ajax获取数据
    $.ajax({
        type: "post",
        async: false, //同步执行
        url: surl,
        dataType: "text", //返回数据形式为json
        success: function (result1) {
        	var result=eval("("+result1+")");
            if (result) { 
                myChart.hideLoading();
                myChart.setOption(result);
            }
        },
        error: function (errorMsg) {
              alert("图表请求数据失败啦!");
        }
    });
    return myChart;
}
function domrefresh(domMain,surl,v_data){
    var myChart;
    myChart = echarts.init(domMain, curTheme);
  //图表显示提示信息
    myChart.showLoading({
        text: "图表数据正在努力加载..."
    });
    //通过Ajax获取数据
    $.ajax({
        type: "post",
        async: false, //同步执行
        url: surl,
        data:v_data,
        dataType: "text", //返回数据形式为json
        success: function (result1) {
        	var result=eval("("+result1+")");
            if (result) { 
                myChart.hideLoading();
                myChart.setOption(result);
            }
        },
        error: function (errorMsg) {
              alert("图表请求数据失败啦!");
        }
    });
    return myChart;
}





if (developMode) {
    window.esl = null;
    window.define = null;
    window.require = null;
    (function () {
        var script = document.createElement('script');
        script.async = true;

        var pathname = location.pathname;

        var pathSegs = pathname.slice(pathname.indexOf('doc')).split('/');
        var pathLevelArr = new Array(pathSegs.length - 1);
        script.src = pathLevelArr.join('../') + 'asset/js/esl/esl.js';
        if (script.readyState) {
            script.onreadystatechange = fireLoad;
        }
        else {
            script.onload = fireLoad;
        }
        (document.getElementsByTagName('head')[0] || document.body).appendChild(script);
        
        function fireLoad() {
            script.onload = script.onreadystatechange = null;
            setTimeout(loadedListener,100);
        }
        function loadedListener() {
            // for develop
            require.config({
                packages: [
                    {
                        name: 'echarts',
                        location: '../../src',
                        main: 'echarts'
                    },
                    {
                        name: 'zrender',
                        // location: 'http://ecomfe.github.io/zrender/src',
                        location: '../../../zrender/src',
                        main: 'zrender'
                    }
                ]
            });
            launchExample();
        }
    })();
}
else {
    //初始化
	echartsInit();
}

//初始化 加载包
function echartsInit(){
	 require.config({
	        paths: {
	            echarts: '/hrss/plugins/echarts/js/dist'
	        }
	    });
	    launchExample();
}
var isExampleLaunched;
function launchExample() {
    if (isExampleLaunched) {
        return;
    }

    // 按需加载
    isExampleLaunched = 1;
    require(
        [
            'echarts',
            //'theme/' + hash.replace('-en', ''),
            'echarts/chart/line',
            'echarts/chart/bar',
            'echarts/chart/scatter',
            //'echarts/chart/k',
            'echarts/chart/pie',
            'echarts/chart/map',
            'echarts/chart/funnel',
            // 使用柱状图就加载bar模块，按需加载
            //'echarts/chart/radar',
           // 'echarts/chart/force',
           // 'echarts/chart/chord',
            'echarts/chart/gauge'
           // 'echarts/chart/funnel',
           // 'echarts/chart/eventRiver',
           // 'echarts/chart/venn',
           // 'echarts/chart/treemap',
           // 'echarts/chart/tree',
           // 'echarts/chart/wordCloud',
           // needMap() ? 'echarts/chart/map' : 'echarts'
        ],
        requireCallback
    );
}

function needMap() {
    var href = location.href;
    return href.indexOf('map') != -1
           || href.indexOf('mix3') != -1
           || href.indexOf('mix5') != -1
           || href.indexOf('dataRange') != -1;

}
