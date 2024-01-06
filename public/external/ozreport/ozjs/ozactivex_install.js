var ZTransferXObject;

function Initialize_ZT(ObjectID, CodeBase, ClassID, Width, Height) {
    if(navigator.appName == "Microsoft Internet Explorer") { //IE
        ZTransferXObject = document.createElement('<object ID = "' + ObjectID + '" width = "' + Width + '" height = "' + Height + '" classid = "' + ClassID + '" codebase = "' + CodeBase + '"></object>');
    } else if(navigator.appName == "Netscape" || navigator.appName == "Opera") { //Safari, Firefox, Chrome, Opera
        ZTransferXObject = document.createElement('object');
        ZTransferXObject.setAttribute("id", ObjectID);
        ZTransferXObject.setAttribute("width", Width);
        ZTransferXObject.setAttribute("height", Height);
        ZTransferXObject.setAttribute("type","application/OZTransferX_1010");
    }
}

function Insert_ZT_Param(ParameterName, ParameterValue) {
    if(navigator.appName == "Microsoft Internet Explorer") { ;//IE
        var ZTransferXParam = document.createElement('<param name = "' + ParameterName + '" value = "' + ParameterValue + '">');
        ZTransferXObject.appendChild(ZTransferXParam);
    } else if(navigator.appName == "Netscape" || navigator.appName == "Opera") { //Safari, Firefox, Chrome, Opera
        var ZTransferXParam = document.createElement('param');
        ZTransferXParam.setAttribute("name", ParameterName);
        ZTransferXParam.setAttribute("value", ParameterValue);
        ZTransferXObject.appendChild(ZTransferXParam);
    }
}

function Start_ZT(URL) {
    if(navigator.appName == "Netscape" || navigator.appName == "Opera") { //Safari, Firefox, Chrome, Opera
        ZTransferXParam = document.createElement('a');
        ZTransferXParam.setAttribute("href", URL + "OZViewerPlugIn.exe");
        ZTransferXParam.setAttribute("style", "text-decoration: none;");
        var ZTransferXParamImg = document.createElement('img');
        ZTransferXParamImg.setAttribute("src", URL + "OZViewerPlugIn.jpg");
        ZTransferXParamImg.setAttribute("alt", "Install OZ plug-in");
        ZTransferXParamImg.setAttribute("style", "border-style: none");
        ZTransferXParam.appendChild(ZTransferXParamImg);
        ZTransferXObject.appendChild(ZTransferXParam);
    }
    InstallOZViewer.appendChild(ZTransferXObject);
}