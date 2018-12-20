<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8" isELIgnored="false"%>
<div class="btn-group" role="group" aria-label="...">
	<!-- <button type="button" class="btn btn-link" title="读卡"
		onclick="read_card(this)">
		<span class="fa fa-newspaper-o"></span>
	</button> -->
	<button type="button" class="btn btn-link" title="最小化"
		onclick="min_win(this)">
		<span class="fa fa-minus"></span>
	</button>
	<button id="winMaxRestore" type="button" class="btn btn-link"
		title="还原" onclick="max_restore_win(this)">
		<span class="fa fa-compress"></span>
	</button>
	<button type="button" class="btn btn-link" title="关闭"
		onclick="close_win(this)">
		<span class="fa fa-close"></span>
	</button>
	<!-- <button type="button" class="btn btn-link" title="测试"
		onclick="test(this)">
		<span class="fa fa-edit"></span>
	</button> -->
</div>

<div id="cardWindow" class="mini-window" style="width:300px;height:225px" title="读卡">
	<div id="cardArea"></div>
</div>
