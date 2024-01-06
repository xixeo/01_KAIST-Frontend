function OZAppletViewerStart(javaVersion) {
	enableDebug();
	var browserName = getBrowser();
	
	_debug("Current Browser Nmae : " + browserName);
	var installJre = false;
	if(browserName == 'Opera') {
		if(navigator.appVersion.indexOf("Mac") != -1) {
			installJre = runMacOpera(appletParameter, viewerParameter, javaVersion);
		} else {
			installJre = checkOperaJavaVersion(javaVersion);
		}
	} else if(browserName == 'MSIE') {
		installJre = checkJavaVersion(javaVersion);
	} else if(browserName == 'Safari'){
		installJre = checkSafariPlugin(javaVersion);
	} else {
		installJre = checkJavaVersion(javaVersion);
	}
	
	/*if(installJre==true){
		alert("jre 미 설치");
	}else
	{
		alert("jre 설치");
	}*/
	return !installJre;
}

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
				return false
			}else if(deployJava.installJRE(minimumVersion+'+')){
				deployJava.refresh();
				location.href=document.location;
				return false;
			}
		}else{
			return false;
		}
	}else{
		if(deployJava.debug){
			alert('Invalid minimumVersion argument to runApplet():'+minimumVersion);
		}
	}
	
	return false;
}

function checkPluginJavaVersion(javaVersion) {
	try {
		if(!deployJava.versionCheck(javaVersion)) {
			return true;
		}
		else
			return false;
	} catch(exception) {
		alertError(exception);
	}	
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
			return true;
		}
		else
			return false;
	} catch(exception) {
		alertError(exception);
	}
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

function checkJavaVersion(javaVersion) {
	var isSetupJava = true;
	try {       
		var jres = deployJava.getJREs();
		for(var i=0 ; i < jres.length; i++) {
			_debug("Setup jre version : " + jres[i]);
			if(deployJava.compareVersions(jres[i], javaVersion)) {
				_debug("corrent jre version for oz viewer: " + jres[i]);
				isSetupJava = false;
				break;
			}
		}
		return isSetupJava;
	} catch(exception) {
		alertError(exception);
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
		return true;
	}
	else
		return false;
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

function _debug(str) {
	if(_DEBUG_N_TEST_MODE == true) {
		alert(str);
	}
}
var _DEBUG_N_TEST_MODE = false;