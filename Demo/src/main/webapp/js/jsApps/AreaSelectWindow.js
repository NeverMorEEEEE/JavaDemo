/**
 * 
 */
AreaSelectWindow = function () {
	AreaSelectWindow.superclass.constructor.call(this);
    this.initControls();
    this.initEvents();
}
mini.extend(AreaSelectWindow, mini.Window, {
    url: "",
    keyField: "aac001",
    multiSelect: false,
    title: "选择所在行政区",
    width: 240,
    height: 350,
    bodyStyle: "padding:0;",
    allowResize: false,
    showModal: true,
    showToolbar: false,
    showFooter: true,
    initControls: function () {
        var bodyEl = this.getBodyEl();  
        var bodyHtml='<div id="_orgtabs" class="mini-tabs" activeIndex="0" style="width:auto; height:350px;">'+
						   '<div title="行政区选择">'+
						   '<div id="_orgtreegrid" class="mini-treegrid" style="width:100%;height:100%;"'+     
							    'url="../../sysmanager/aa12/get_tree_aa12" showTreeIcon="true" textField="aaa021" idField="aaa020"'+ 
							    'treeColumn="filename" >'+
							    '<div property="columns">'+
							        '<div name="filename" field="aaa021" headerAlign="center" width="200">行政区名称</div>'+
							    '</div>'+
							'</div>'+
						    '</div>'+
						    	
						    '<div title="行政区查询">'+
							    '<div id="queryForm" style="padding:1px;">'+
							    	'<table>'+
							       	'<tr>'+
							        	'<td style="width:165px;"><input id="_aab300" name="aab300" class="mini-textbox" style="width: 150px;"/></td>'+
							        	'<td style="width:120px;"><a id="_orgquery" style="height: 19px;" class="mini-button" iconCls="icon-search">查询</a></td>'+
							          	'<td>&nbsp;</td>'+
							      	'</tr>'+
							      	'</table>'+
							        '</div>'+
							       
							    	'<div id="_orggrid" class="mini-datagrid" style="width:auto;height:284px;" showFooter="false" allowResize="false" url="../../sysmanager/aa12/query_aa12"  idField="bsc001">'+
							    	'<div property="columns">'+
							        	'<div field="aaa021" width="100" allowSort="true" headerAlign="center" >行政区名称</div>  '+              
							    	'</div>'+
								'</div>'+
						    '</div>'+
					'</div>';
        jQuery(bodyEl).append(bodyHtml);
        //this.grid.render(bodyEl);
        //组件对象
        mini.parse(this.el);
        this.text = mini.get("_aab300")
        this.tabs = mini.get("_orgtabs");
        this.orggrid = mini.get("_orggrid");
        this.querybtn = mini.get("_orgquery");
        this.orgtreegrid = mini.get("_orgtreegrid");
        //this.orgtreegrid.loadData([{"aab003":"08","aab300":"杭州市(总)","bsc001":"259","expanded":false,"isLeaf":false,"pareid":""},{"aab003":"91","aab300":"本省外市","bsc001":"1531000000","expanded":false,"isLeaf":true,"pareid":""},{"aab003":"92","aab300":"外省","bsc001":"1532000000","expanded":false,"isLeaf":true,"pareid":""}]);
    },
    initEvents: function () {
    	
    	this.orggrid.on("rowdblclick", function (e) {
             var ret = true;
             if (this._Callback) ret = this._Callback('ok');
             if (ret !== false) {
                 this.hide();
             }
         }, this);
    	this.orgtreegrid.on("beforeload", function (e) {
    		 var tree = e.sender;    //树控件
    	     var node = e.node;      //当前节点
    	     var params = e.params;  //参数对象
    	     var _v = params.aab003;
    	     //可以传递自定义的属性
    	     if(_v==""){
    	    	 params.aab003 = "first"; //后台：request对象获取"myField"
    	     }
        }, this);
    	this.orgtreegrid.on("nodedblclick", function (e) {
            var ret = true;
            if (this._Callback) ret = this._Callback('ok');
            if (ret !== false) {
                this.hide();
            }
        }, this);
    	this.text.on("enter", function(e){
    		var key = this.text.getValue();
   		 	this.orggrid.load({"aaa021":key});
    	},this);
    	this.querybtn.on("click", function (e) {
    		 var key = this.text.getValue();
    		 this.orggrid.load({"aaa021":key});
        }, this);
    },
    setUrl: function (value) {
        this.url = value;
    },
    setKeyField: function (value) {
        this.keyField = value;
    },
    setMultiSelect: function (value) {
        this.multiSelect = value;
        this.orggrid.setMultiSelect(value);
    },
    search: function (key,index) {
        var args = {};
        args["key"] = key;
        if(index!=null){
        	this.tabs.activeTab(index);
        }
        if(index==1){
        	this.orggrid.load(args);
        }
    },
    setData: function (data, callback) {
        this._Callback = callback;
        //this.grid.selects(data);
    },
    getData: function () {
    	var index = this.tabs.getActiveTab()._id
    	var row;
    	if(index==1){
    		row = this.orgtreegrid.getSelectedNode();
    	}else if(index==2){
    		row = this.orggrid.getSelected();
    	}
        return row;
    }
});
mini.regClass(AreaSelectWindow, "areaselectwindow");

function cselectOrgan(e){
	selectOrgan(e,0);
}


function eselectOrgan(e){
	selectOrgan(e,1);
}


function selectOrgan(e,index){
	var buttonEdit = e.sender;
	var win = mini.createTopSingle(AreaSelectWindow);
    win.set({
         width: 240,
         height: 380
     });
    var buttonEditel = $(buttonEdit.el).offset();
    win.show(buttonEditel.left,buttonEditel.top+21);
    win.search(buttonEdit.getText(),index);
    //初始化数据
    win.setData(null, function (action) {
    	if (action == "ok") {
        //获取数据
    		var row = win.getData();
    		if (row) {                        
    			buttonEdit.setValue(row.aaa020);
    			buttonEdit.setText(row.aaa021);
    		}
    		
    	}
     }); 
}

