<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Turn checkboxes and radio buttons in toggle switches.">
    <meta name="author" content="Mattia Larentis, Emanuele Marchi and Peter Stein">
    <title>Bootstrap Switch · Turn checkboxes and radio buttons in toggle switches</title>
    <link href="${WEB_APP}/include/docs/css/bootstrap.min.css" rel="stylesheet">
    <link href="${WEB_APP}/include/docs/css/highlight.css" rel="stylesheet">
    <link
	href="${WEB_APP}/include/bootstrap_switch/css/bootstrap3/bootstrap-switch.css"
	rel="stylesheet">
    <link href="${WEB_APP}/include/docs/css/main.css" rel="stylesheet">
  </head>
  <body>
    <div>
      <input class="form-control" type="checkbox" checked>
    </div>
    <div>
      <input type="checkbox" checked>
    </div>
    <script src="${WEB_APP}/include/docs/js/jquery.min.js"></script>
    <script src="${WEB_APP}/include/docs/js/bootstrap.min.js"></script>
    <script
		src="${WEB_APP}/include/bootstrap_switch/js/bootstrap-switch.js"></script>
    <script>
    $(function(argument) {
      $('[type="checkbox"]').bootstrapSwitch();
    })
    </script>
  </body>
</html>