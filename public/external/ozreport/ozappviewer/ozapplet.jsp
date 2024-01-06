<%
	String		ozrName		= request.getParameter("ozrName");
	String[]	ozrParamVal	= request.getParameterValues("ozrParamVal");
	String		odiName		= request.getParameter("odiName");
	String[] 	odiParamVal	= request.getParameterValues("odiParamVal");
%>

<html>
<body topmargin="0" leftmargin="0" scroll="no">
<script src="http://java.com/js/deployJava.js"></script>
<script src="http://ozreport.hmd.co.kr/ozappviewer/deployOZ.js"></script>
<script language="JavaScript">

//Viewer Event Example
function OZExportCommand_ozviewer(code, path, filename, step) {}
function OZCommand_ozviewer(code, args) {}
function OZUserActionCommand_ozviewer(type, attr) {}
//Applet_Viewer Get

function getOZApplet() {
  var oz;
  if(navigator.appName.indexOf("Microsoft") != -1) {
    oz = window[OZViewerName];
  } else {
    oz = document[OZViewerName];
  }
  return oz;
}

var OZViewerName = "ozviewer"; //Viewer ID
var javaVersion = '1.6.0'; //Java version is set to 1.5.0 or higher.
var appletParameter = new Array (
  "id="+OZViewerName,
  "width=100%",
  "height=100%",
  "codebase=./oz/", //Applet Viewer Codebase
  "ozversion=60.2015.0311.200" //Applet Viewer Version
);
<%	
	String ozParam	= "", ozDiv = ",";
	
	if (ozrParamVal != null)
	{
		ozParam = ozParam + "\"connection.pcount=" + Integer.toString(ozrParamVal.length) + "\"" + ozDiv;

		for (int i = 0; i < ozrParamVal.length; i++)
		{
			if (ozrParamVal[i].indexOf("=") > -1)
			{
				ozParam += "\"connection.args" + (i + 1) + "=" + ozrParamVal[i] + "\"" + ozDiv;
			}
		}
	}

	if (odiParamVal != null)
	{
		ozParam = ozParam + "\"odi.odinames=" + odiName + "\"" + ozDiv;
		ozParam = ozParam + "\"odi." + odiName + ".pcount=" + Integer.toString(odiParamVal.length) + "\"" + ozDiv;

		for (int i = 0; i < odiParamVal.length; i++)
		{
			if (odiParamVal[i].indexOf("=") > -1)
			{
				ozParam += "\"odi." + odiName + ".args" + (i + 1) + "=" + odiParamVal[i] + "\"" + ozDiv;
			}
		}
	}
%>
//Viewer Parameter
var viewerParameter = new Array (
  "connection.servlet=http://ozreport.hmd.co.kr/server",
  "connection.reportname=<%=ozrName%>",
   <%=ozParam%>
  "connection.fetchtype=concurrent",
  "information.debug=true",
  "viewer.isframe=false"
 
);

OZAppletViewerStart(appletParameter, viewerParameter, javaVersion);

</script>
</body>
</html>