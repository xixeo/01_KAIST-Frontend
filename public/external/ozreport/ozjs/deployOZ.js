var _DEBUG_N_TEST_MODE = false;
var OZ_VERSION_KEY = "OZVERSION";
var DOCUMENT_WRTIE = true;

var APPLET_ATTRIBUTES_NAMES = new Array("WIDTH", "HEIGHT", "ALIGN", "ID", "CODE", "CODEBASE", "ARCHIVE", "MAYSCRIPT", "NAME");
var APPLET_PARAMETER_NAMES = new Array("ID", "NAME", "CACHE_ARCHIVE", "CACHE_VERSION", "CLASSLOADER_CACHE", "JAVA_ARGUMENTS", "SEPARATE_JVM", "JAVA_VERSION", "OZVERSION");

var OBJECT_ATTRIBUTES_NAMES = new Array("WIDTH", "HEIGHT", "ALIGN", "ID", "NAME");
var OBJECT_PARAMETER_NAMES = new Array("ID", "NAME", "CODE", "CODEBASE", "ARCHIVE", "CACHE_ARCHIVE", "CACHE_VERSION", "CLASSLOADER_CACHE", "JAVA_ARGUMENTS", "SEPARATE_JVM", "JAVA_VERSION", "MAYSCRIPT", "OZVERSION");

function initJavaParameter(appletParameter, javaVersion) {
	var cache_version = "cache_version=";
	for(var i=0; i < appletParameter.length ; i++) {
		var param = leftTrim(appletParameter[i]);
		if(param.toUpperCase().indexOf(OZ_VERSION_KEY) == 0) {
			var index = param.indexOf("=");
			var value = param.substring(index+1);
			for(var j=0 ; j < 7 ; j++) {
				if(j != 0) {
					cache_version += ",";
				}
				cache_version += value;
			}
			appletParameter.push(cache_version);
			break;
		}
	}	
	appletParameter.push("code=oz.main.OZReportApplet.class");
	appletParameter.push("cache_archive=ozviewer.jar,ozrresource.jar,activation.jar,mail.jar,uk.co.mmscomputing.imageio.tiff.jar,poi-scratchpad-3.0.1.jar,OZUSLClientApplet.jar");
	appletParameter.push("classloader_cache=true");
	appletParameter.push("java_arguments=-Xmx1024m");
	appletParameter.push("separate_jvm=true"); // false로 바꾸면 applet 구동시 속도향상을 볼수있다.
	appletParameter.push("mayscript=true");
	appletParameter.push("codebase_lookup=false");
}

function _debug(str) {
	if(_DEBUG_N_TEST_MODE == true) {
		alert(str);
	}
}

function OZAppletViewerStartWithNoWrite(appletParameter, viewerParameter, javaVersion) {
	DOCUMENT_WRTIE = false;
	var writeHtml = OZAppletViewerStart(appletParameter, viewerParameter, javaVersion);
	DOCUMENT_WRTIE = true;
	return writeHtml;
}

function OZAppletViewerStart(appletParameter, viewerParameter, javaVersion) {
	enableDebug();
	initJavaParameter(appletParameter, javaVersion);
	var browserName = getBrowser();
	
	_debug("Current Browser Nmae : " + browserName);
	
	if(browserName == 'Opera') {
		if(navigator.appVersion.indexOf("Mac") != -1) {
			return runMacOpera(appletParameter, viewerParameter, javaVersion);
		} else {
			checkOperaJavaVersion(javaVersion);
			return runAppletTag(appletParameter, viewerParameter, javaVersion);
		}
	} else if(browserName == 'MSIE') {
		checkJavaVersion(javaVersion);
  		return runObjectTag(appletParameter, viewerParameter, javaVersion);
	} else if(browserName == 'Safari'){
		checkSafariPlugin(javaVersion);
  		return runAppletTag(appletParameter, viewerParameter, javaVersion);
	} else {
		checkJavaVersion(javaVersion);
  		return runAppletTag(appletParameter, viewerParameter, javaVersion);		
	}
}

function alertError(exception) {
	_debug(exception + " ," + exception.number + ", " + exception.description);
} 

function enableDebug() {
	if(_DEBUG_N_TEST_MODE == true) {
		try {
			deployJava.enableAlerts();
		} catch(exception) {
			alertError(exception);
		}
	}	
}

function checkSafariPlugin(version){
	var result = true;
	if((!navigator.plugins)||(!navigator.plugins.length)){
		result =  false;
	}
	var platform=navigator.platform.toLowerCase();
	for(var i=0;i<navigator.plugins.length;++i){
		s=navigator.plugins[i].description;
		if(s.search(/^Java Switchable Plug-in (Cocoa)/)!=-1){
			if(deployJava.compareVersions("1.5.0", version)){
				result = true;
			}
		} else if(s.search(/^Java/)!=-1) {
			if(deployJava.compareVersions("1.5.0", version) || deployJava.compareVersions("1.6.0", version)){
				result =  true;
			}
		}
	}
	if(deployJava.compareVersions("1.5.0",version)){
		result = true;
	}
	
	if(!result) {
		deployJava.installLatestJRE();
	}
}

function checkPluginJavaVersion(javaVersion) {
	try {
		if(!deployJava.versionCheck(javaVersion)) {
			deployJava.installLatestJRE();
		}
	} catch(exception) {
		alertError(exception);
	}	
}

// deploy.js wrapping 
function runMacOpera(attributes, parameters, minimumVersion) {
	if(minimumVersion=='undefined'||minimumVersion==null){
		minimumVersion='1.1';
	}
	var regex="^(\\d+)(?:\\.(\\d+)(?:\\.(\\d+)(?:_(\\d+))?)?)?$";
	var matchData=minimumVersion.match(regex);
	if(deployJava.returnPage==null){
		deployJava.returnPage=document.location;
	}
	if(matchData!=null){
		var browser=deployJava.getBrowser();
		if((browser!='?')&&('Safari'!=deployJava.browserName2)){
			if(deployJava.versionCheck(minimumVersion+'+')){
				return runAppletTag(attributes,parameters,minimumVersion);
			}else if(deployJava.installJRE(minimumVersion+'+')){
				deployJava.refresh();
				//location.href=document.location;
				return runAppletTag(attributes,parameters,minimumVersion);
			}
		}else{
			return runAppletTag(attributes,parameters,minimumVersion);
		}
	}else{
		if(deployJava.debug){
			alert('Invalid minimumVersion argument to runApplet():'+minimumVersion);
		}
	}
	
	return "";
}

function checkOperaJavaVersion(javaVersion) {
	var isJavaSetup = true;
	var mimeType = "";
	for(var i=0;i<navigator.plugins.length;++i){
		var s=navigator.plugins[i].name;
		
		if (navigator.appVersion.indexOf("Win") != -1) {
			if(s.indexOf("Java Deployment Toolkit") != -1) {
				_debug("corrent jre version for oz viewer");
				isJavaSetup = false;
				break;
			}
		} else if(navigator.appVersion.indexOf("Linux") != -1) {
			alert(s);
			if(s.indexOf("Java") != -1) {
				if(s.indexOf("Plug-in") != -1) {
					var setupedJavaVersion = s.substr(s.lastIndexOf(" ")+1);
					if(deployJava.compareVersions(setupedJavaVersion, javaVersion)) {
						_debug("corrent jre version for oz viewer");
						isJavaSetup = false;
						break;
					}
				}
			}
		}
		
		mimeType += s+"\n";
	}
	
	_debug(mimeType);
	try {
		if(isJavaSetup && !deployJava.versionCheck(javaVersion)) {
			deployJava.installLatestJRE();
		}
	} catch(exception) {
		alertError(exception);
	}
}

function checkJavaVersion(javaVersion) {
    try {       
        var jres = deployJava.getJREs();
        var isSetupJava = true;
        for(var i=0 ; i < jres.length; i++) {
            _debug("Setup jre version : " + jres[i]);
            if(deployJava.compareVersions(jres[i], javaVersion)) {
                _debug("corrent jre version for oz viewer: " + jres[i]);
                isSetupJava = false;
                break;
            }
        }
        
        if(isSetupJava) {
          if(getBrowser() == 'MSIE')
          {
            if(window.navigator.cpuClass == 'x64')
            {
              deployJava.IEInstall();
            }else
            {
              deployJava.installLatestJRE();
            }
          }else
          {
              deployJava.installLatestJRE();
            }
        }
    } catch(exception) {
        alertError(exception);
    }
}

function getSunParameter(attrs) {
	var sunAttr = new Object();
	for(var i=0 ; i < attrs.length ; i++) {
		var param = leftTrim(attrs[i]);
		var index = param.indexOf("=");
		if(index != -1) {
			var key = param.substr(0, index);
			var value = param.substr(index+1);
			sunAttr[key] = value;
		}
	}
	return sunAttr;
}

function getBrowser() {
	var browser=navigator.userAgent.toLowerCase();

	if (browser.indexOf('msie')!=-1){
		return 'MSIE';
	} else if(browser.indexOf('firefox')!=-1){
		return 'Firefox';
	} else if(browser.indexOf('chrome')!=-1){
		return 'Chrome';
	} else if(browser.indexOf('safari')!=-1){
		return 'Safari';
	} else if(browser.indexOf('mozilla')!=-1){
		return 'Other';
	} else if(browser.indexOf('opera')!=-1){
		return 'Opera';
	}else{
		return 'unknown';
	}
}

function splitAttribute(str) {
	var index = str.indexOf("=");
	if(index != -1) {
		var key = str.substr(0, index);
		var value = str.substr(index+1);
		return " " + key + " = '" + value + "' ";
	} else {
		return "";
	}
} 

function splitParameter(str) {
	var index = str.indexOf("=");
	if(index != -1) {
		var key = str.substr(0, index);
		var value = str.substr(index+1);
		return " <PARAM NAME='" + key + "' VALUE=\"" + value + "\"/> ";
	} else {
		return "";
	}
} 

function leftTrim(str) {
	var index = str.indexOf(" ");
	while(index == 0) {
		str = str.substr(1);
		index = str.indexOf(" ");
	}
	
	return str;
}

function getViewerParameter(viewerParameter, attr) {
	for(var i=0 ; i < viewerParameter.length ; i++) {
		var param = leftTrim(viewerParameter[i]);
		attr += splitParameter(param);
	}
	return attr;
}

function getAppletTagAttribute(appletParameter) {
	var attr = "";
	for(var i=0 ; i < appletParameter.length ; i++) {
		var param = leftTrim(appletParameter[i]);
		for(var j=0 ; j < APPLET_ATTRIBUTES_NAMES.length ; j++) {
			if( param.toUpperCase().indexOf(APPLET_ATTRIBUTES_NAMES[j]) == 0) {
				attr += splitAttribute(param);
			}
		}			
	}
	return attr;
}

function getAppletTagParameter(appletParameter, viewerParameter) {
	var attr = "";
	for(var i=0 ; i < appletParameter.length ; i++) {
		var param = leftTrim(appletParameter[i]);
		for(var j=0 ; j < APPLET_PARAMETER_NAMES.length ; j++) {
			if( param.toUpperCase().indexOf(APPLET_PARAMETER_NAMES[j]) == 0) {
				attr += splitParameter(param);
			}
		}
	}
	
	return getViewerParameter(viewerParameter, attr);
}

function runAppletTag(appletParameter, viewerParameter, javaVersion) {
	var writeStr = '<APPLET ' + getAppletTagAttribute(appletParameter) + '>' +
					getAppletTagParameter(appletParameter, viewerParameter)	+
                   '</APPLET>';
	_debug(writeStr);
	if(DOCUMENT_WRTIE) {
		document.write(writeStr);
	}
	return writeStr;                 
}

function getObjectTagAttribute(appletParameter) {
	var attr = "";
	for(var i=0 ; i < appletParameter.length ; i++) {
		var param = leftTrim(appletParameter[i]);
		for(var j=0 ; j < OBJECT_ATTRIBUTES_NAMES.length ; j++) {
			if( param.toUpperCase().indexOf(OBJECT_ATTRIBUTES_NAMES[j]) == 0) {
				attr += splitAttribute(param);
			}
		}
	}
	return attr;
}

function getObjectTagParameter(appletParameter, viewerParameter) {
	var attr = "";
	for(var i=0 ; i < appletParameter.length ; i++) {
		var param = leftTrim(appletParameter[i]);
		for(var j=0 ; j < OBJECT_PARAMETER_NAMES.length ; j++) {
			if( param.toUpperCase().indexOf(OBJECT_PARAMETER_NAMES[j]) == 0) {
				attr += splitParameter(param);
			}
		}
	}
	
	return getViewerParameter(viewerParameter, attr);
}

function runObjectTag(appletParameter, viewerParameter, javaVersion) {
	var writeStr = '<OBJECT classid="clsid:8AD9C840-044E-11D1-B3E9-00805F499D93"'+ getObjectTagAttribute(appletParameter) + '>' +
					getObjectTagParameter(appletParameter, viewerParameter)	+
                   '</OBJECT>'
	_debug(writeStr);
	
	if(DOCUMENT_WRTIE) {
		document.write(writeStr);
	}
	return writeStr;
}
