<%@ page language="java" contentType="text/html; charset=EUC-KR" pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>������ ȣ�⿹��</title>

<script src="./ozjs/checkJava.js"></script>
<script src="http://java.com/js/deployJava.js"></script>

<script src="./ozjs/ozflash_check.js"></script>

<script language="javascript">
	var ozrParamCnt, odiParamCnt;
	ozrParamCnt = odiParamCnt = 0;

	function addTextbox (id, name, value)
	{
		if (value == null)
			value = '';
		document.getElementById(id).insertRow().insertCell(0).innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='text' name='" + name + "' value='" + value + "' size='100' onfocus='javascript:this.select();'><br>";
		if (name.indexOf('ozr') > -1)
			ozrParamCnt++;
		else if (name.indexOf('odi') > -1)
			odiParamCnt++;
	}
	
	function delTextbox (id, name)
	{
		if (name.indexOf('ozr') > -1 && ozrParamCnt > 0) {
			ozrParamCnt--;
			document.getElementById(id).deleteRow();
		}
		else if (name.indexOf('odi') > -1 && odiParamCnt > 0) {
			odiParamCnt--;
			document.getElementById(id).deleteRow();
		}
	}
	
	function setInitialValues ()
	{
		document.ozform.ozserverUrl.value = "<%=request.getScheme()%>" + "://" + "<%=request.getServerName()%>:" + "<%=request.getServerPort()%>/server";
		document.ozform.ozrName.value = "/test.ozr";
		document.ozform.odiName.value = "";
		//addTextbox("tb1", "ozrParamVal", "YEAR=2012");
		//addTextbox("tb2", "odiParamVal", "I_DGNT_NO=P012012020701");
	}
	
	function go ()
	{
		switch (document.ozform.viewerType.value) {
		case "ActiveX" :
			document.ozform.action = "ozactivex.jsp";
			break;
		case "Applet" :
			document.ozform.action = "ozapplet.jsp";
			break;
		case "Flash" :
			document.ozform.action = "ozflash.jsp";
			break;
		case "ServerBinding" :
			document.ozform.action = "serverbinding.jsp";
			break;
		default :
			break;
		}
		
		document.ozform.submit();
	}
</script>
</head>
<body onload="javascript:setInitialValues();">
<font face="���� ���" size="2">
<form name="ozform" method="post">
	<b>�� OZ Server Info</b> ����� �ּҸ� �����մϴ�.<br><br>
	URL&nbsp;&nbsp;<input type="text" name="ozserverUrl" size="50" onfocus="javascript:this.select();"><br><br><br>
	
	<b>�� OZ Report Info</b> ���� ���������� �����մϴ�.<br><br>
	OZR&nbsp;&nbsp;<input type="text" name="ozrName" size="50" onfocus="javascript:this.select();"> �������� ī�װ����� �Է��մϴ�. ��) /sample/sample.ozr<br><br>
	OZR Param&nbsp;<input type="button" onclick="javascript:addTextbox('tb1', 'ozrParamVal');" value="+">
	<input type="button" onclick="javascript:delTextbox('tb1', 'ozrParamVal');" value="-"> ���з����Ͱ� ������ŭ '+' ��ư���� �߰��Ͽ� �̸��� ���� �Է��մϴ�. ��) formparam=value
	<table id="tb1"></table><br>

	ODI&nbsp;&nbsp;&nbsp;<input type="text" name="odiName" onfocus="javascript:this.select();"> odi���ϸ��� Ȯ���� ���� �Է��մϴ�. ��) sample<br><br>
	ODI Param&nbsp;&nbsp;<input type="button" onclick="javascript:addTextbox('tb2', 'odiParamVal');" value="+">
	<input type="button" onclick="javascript:delTextbox('tb2', 'odiParamVal');" value="-"> odi�з����Ͱ� ������ŭ '+' ��ư���� �߰��Ͽ� �̸��� ���� �Է��մϴ�. ��) odiparam=value
	<table id="tb2"></table><br><br>
	
	<b>�� Viewer Info</b><br><br>
	Viewer Type <select name="viewerType">
	<option value="ActiveX">ActiveX</option>
	<option value="Applet">Applet</option>
	<option value="Flash">Flash</option>
	<option value="ServerBinding">Server Binding</option>
	</select> ����� ������ Ÿ���� �����մϴ�.<br><br>

	<input type="button" onclick="javascript:go();" value="����" >
</form>
</font>
</body>
</html>