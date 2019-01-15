<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<%@ include file="/head.jsp" %>
<%
	request.setAttribute("sbcl_id", request.getParameter("sbcl_id"));
%>
<body>
	<input type="hidden" class="mini-hidden" name="sbcl_id" id="sbcl_id" value="${sbcl_id }" >
	<div id="datagrid" class="mini-datagrid" style="width:597px;height:415px;" allowResize="true"
        url="${base}/business/transact/fileSystem/fileService/ViewFile"  idField="id" multiSelect="true" >
	    <div property="columns">
	            <div field="faa001" type="indexcolumn" >序号</div>        
	            <div field="faa003" width="300" headerAlign="center" allowSort="true">文件名称</div> 
	            <div field="#" width="150" headerAlign="center" align="center" renderer="fileDoRenderer">操作</div>   
	    </div>
    </div>
    <script type="text/javascript">
    	
        var grid,sbcl_id;
        $(function(){
        	grid = mini.get("datagrid");
        	sbcl_id = mini.get("sbcl_id").getValue();
        	grid.load({sbcl_id:sbcl_id});
        });
        function fileDoRenderer(e){
    		return 	'<a class="rendererButton" style="text-decoration:none;" href="javascript:viewFile(this)">【查看】</a>'
    				+'<a class="rendererButton" style="text-decoration:none;" href="'+tz.furl("/business/transact/fileSystem/fileService/DownloadFile",{faa001:e.record.faa001})+'">【下载】</a>'
    				+'<a class="rendererButton" style="text-decoration:none;" href="javascript:deleteFile()">【删除】</a>';
    	}
        
        function viewFile(){
        	
        }
        function deleteFile(){
        	mini.confirm("确定删除选中文件？", "确定？", function(action){
				if(action!="ok") return;
				tz.ajaxSubmit({
					url: tz.furl("/business/transact/fileSystem/fileService/DeleteFile",{faa001 : grid.getSelected().faa001}),
					success: function(r){
						mini.alert(r.msg, "", function(){
							grid.reload();
						});
					}
				});
			})
        }
    </script>
</body>
</html>