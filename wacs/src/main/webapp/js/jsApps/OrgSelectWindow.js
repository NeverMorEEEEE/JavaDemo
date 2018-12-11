OrgSelectWindow = function () {
	OrgSelectWindow.superclass.constructor.call(this);
    this.initControls();
    this.initEvents();
}
mini.extend(OrgSelectWindow, mini.Window, {
    url: "",
    keyField: "aac001",
    multiSelect: false,
    title: "选择机构",
    width: 240,
    height: 350,
    bodyStyle: "padding:0;",
    allowResize: false,
    showModal: true,
    showToolbar: false,
    showFooter: true,
    flag:"",
    initControls: function () {
        var bodyEl = this.getBodyEl();  
        var bodyHtml='<div id="_orgtabs" class="mini-tabs" activeIndex="0" style="width:240px; height:350px;">'+
						   '<div title="机构选择">'+
						   '<div id="_orgtreegrid" class="mini-treegrid" style="width:100%;height:100%;"'+     
							    ' showTreeIcon="true" textField="aab300" idField="aab003"'+ 
							    'treeColumn="filename" >'+
							    '<div property="columns">'+
							        '<div name="filename" field="aab300" headerAlign="center" width="200">机构名称</div>'+
							    '</div>'+
							'</div>'+
						    '</div>'+
						    	
						    '<div title="机构查询">'+
							    '<div id="queryForm" style="padding:1px;">'+
							    	'<table>'+
							       	'<tr>'+
							        	'<td style="width:165px;"><input id="_aab300" name="aab300" class="mini-textbox" style="width: 140px;"/></td>'+
							        	'<td style="width:100px;"><a id="_orgquery" style="height: 19px;" class="mini-button" iconCls="icon-search">查询</a></td>'+
							          	'<td>&nbsp;</td>'+
							      	'</tr>'+
							      	'</table>'+
							        '</div>'+
							       
							    	'<div id="_orggrid" class="mini-datagrid" style="width:100%;height:284px;" showFooter="false" allowResize="false" url="../../sysmanager/sc01/queryOrganization"  idField="bsc001">'+
							    	'<div property="columns">'+
							        	'<div field="aab300" width="100" allowSort="true" headerAlign="center" >机构名称</div>  '+              
							    	'</div>'+
								'</div>'+
						    '</div>'+
					'</div>';
        jQuery(bodyEl).append(bodyHtml);
        //组件对象
        mini.parse(this.el);
        this.orggrid = mini.get("_orggrid");
        this.text = mini.get("_aab300")
        this.tabs = mini.get("_orgtabs");
        this.querybtn = mini.get("_orgquery");
        this.orgtreegrid = mini.get("_orgtreegrid");
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
    	     params.flag=this.flag;
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
   		 	this.orggrid.load({"key":key});
    	},this);
    	this.querybtn.on("click", function (e) {
    		 var key = this.text.getValue();
    		 this.orggrid.load({"key":key,flag:this.flag});
        }, this);
    },
    setFlag:function (flag){
    	this.flag=flag;
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
    	this.orgtreegrid.setUrl("../../sysmanager/sc01/queryTreeOrganization");
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
mini.regClass(OrgSelectWindow, "orgselectwindow");

function cselectOrgan(e){
	selectOrgan(e,0,1);
}

function eselectOrgan(e){
	selectOrgan(e,1,1);
}

function cselectOrganall(e){
	selectOrgan(e,0,2);
}

function eselectOrganall(e){
	selectOrgan(e,1,2);
}

function selectOrgan(e,index,flag){
	var buttonEdit = e.sender;
	var win = mini.createTopSingle(OrgSelectWindow);
    win.set({
         title: "选择机构",
         width: 242,
         height: 380
     });
    win.setFlag(flag);
    var buttonEditel = $(buttonEdit.el).offset();
    win.show(buttonEditel.left,buttonEditel.top+21);
    win.search(buttonEdit.getText(),index);
    //初始化数据
    win.setData(null, function (action) {
    	if (action == "ok") {
        //获取数据
    		var row = win.getData();
    		if (row) {                        
    			buttonEdit.setValue(row.bsc001);
    			buttonEdit.setText(row.aab300);
    		}
    		queryOnClick(row);
    	}
     }); 
}

function queryOnClick(record){
	
}
