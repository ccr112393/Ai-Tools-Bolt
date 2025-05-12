(function (thisObj) {// ----- EXTENDSCRIPT INCLUDES ------ //"object"!=typeof JSON&&(JSON={}),function(){"use strict";var rx_one=/^[\],:{}\s]*$/,rx_two=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rx_three=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rx_four=/(?:^|:|,)(?:\s*\[)+/g,rx_escapable=/[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta,rep;function f(t){return t<10?"0"+t:t}function this_value(){return this.valueOf()}function quote(t){return rx_escapable.lastIndex=0,rx_escapable.test(t)?'"'+t.replace(rx_escapable,function(t){var e=meta[t];return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'}function str(t,e){var r,n,o,u,f,a=gap,i=e[t];switch(i&&"object"==typeof i&&"function"==typeof i.toJSON&&(i=i.toJSON(t)),"function"==typeof rep&&(i=rep.call(e,t,i)),typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";if(gap+=indent,f=[],"[object Array]"===Object.prototype.toString.apply(i)){for(u=i.length,r=0;r<u;r+=1)f[r]=str(r,i)||"null";return o=0===f.length?"[]":gap?"[\n"+gap+f.join(",\n"+gap)+"\n"+a+"]":"["+f.join(",")+"]",gap=a,o}if(rep&&"object"==typeof rep)for(u=rep.length,r=0;r<u;r+=1)"string"==typeof rep[r]&&(o=str(n=rep[r],i))&&f.push(quote(n)+(gap?": ":":")+o);else for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(o=str(n,i))&&f.push(quote(n)+(gap?": ":":")+o);return o=0===f.length?"{}":gap?"{\n"+gap+f.join(",\n"+gap)+"\n"+a+"}":"{"+f.join(",")+"}",gap=a,o}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=this_value,Number.prototype.toJSON=this_value,String.prototype.toJSON=this_value),"function"!=typeof JSON.stringify&&(meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(t,e,r){var n;if(gap="",indent="","number"==typeof r)for(n=0;n<r;n+=1)indent+=" ";else"string"==typeof r&&(indent=r);if(rep=e,e&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw new Error("JSON.stringify");return str("",{"":t})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){var j;function walk(t,e){var r,n,o=t[e];if(o&&"object"==typeof o)for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(void 0!==(n=walk(o,r))?o[r]=n:delete o[r]);return reviver.call(t,e,o)}if(text=String(text),rx_dangerous.lastIndex=0,rx_dangerous.test(text)&&(text=text.replace(rx_dangerous,function(t){return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})),rx_one.test(text.replace(rx_two,"@").replace(rx_three,"]").replace(rx_four,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();// ---------------------------------- //// ----- EXTENDSCRIPT PONYFILLS -----function __objectFreeze(obj) { return obj; }// ---------------------------------- //var version = "0.0.1";

var config = {
  version: version,
  id: "com.aitools-bolt.cep",
  displayName: "Ai Tools Bolt",
  symlink: "local",
  port: 3000,
  servePort: 5000,
  startingDebugPort: 8860,
  extensionManifestVersion: 6.0,
  requiredRuntimeVersion: 9.0,
  hosts: [{
    name: "ILST",
    version: "[0.0,99.9]"
  }],
  type: "Panel",
  iconDarkNormal: "./assets/light-icon.png",
  iconNormal: "./assets/dark-icon.png",
  iconDarkNormalRollOver: "./assets/light-icon.png",
  iconNormalRollOver: "./assets/dark-icon.png",
  parameters: ["--v=0", "--enable-nodejs", "--mixed-context"],
  width: 375,
  height: 650,
  minWidth: 300,
  minHeight: 400,
  maxWidth: 800,
  maxHeight: 1000,
  panels: [{
    mainPath: "./main/index.html",
    name: "main",
    panelDisplayName: "Ai Tools Bolt",
    autoVisible: true
  }],
  build: {
    jsxBin: "off",
    sourceMap: true
  },
  zxp: {
    country: "US",
    province: "NC",
    org: "crdev",
    password: "ColorCharlotte2020",
    tsa: ["http://timestamp.digicert.com/",
    // Windows Only
    "http://timestamp.apple.com/ts01" // MacOS Only
    ],
    allowSkipTSA: false,
    sourceMap: false,
    jsxBin: "off"
  },
  installModules: [],
  copyAssets: ["assets"],
  copyZipAssets: []
};

var ns = config.id;

var currentDocument = function currentDocument() {
  return app.activeDocument;
};
var openDocuments = function openDocuments() {
  return app.documents;
};
var getCurrentLayer = function getCurrentLayer() {
  return app.activeDocument.activeLayer;
};
var getCurrentLayerName = function getCurrentLayerName() {
  return app.activeDocument.activeLayer.name;
};
var getCurrentPathItemName = function getCurrentPathItemName() {
  var name = "";
  try {
    name = app.activeDocument.selection[0].name;
  } catch (error) {}
  return name;
};
var getDocumentWidth = function getDocumentWidth() {
  return currentDocument().width;
};
var getDocumentHeight = function getDocumentHeight() {
  return currentDocument().height;
};
var getSelectionCount = function getSelectionCount() {
  return currentDocument().selection.length;
};
var convertToPoints = function convertToPoints(value, unit) {
  var unitValue = UnitValue("".concat(value, " ").concat(unit));
  unitValue.convert("pt");
  return unitValue.value;
};
function setDocumentColorSpaceRGB() {
  app.executeMenuCommand("doc-color-rgb");
}
function setDocumentColorSpaceCMYK() {
  app.executeMenuCommand("doc-color-cmyk");
}
var createColorCMYK = function createColorCMYK(cyan, magenta, yellow, black) {
  var color = new CMYKColor();
  color.cyan = cyan;
  color.magenta = magenta;
  color.yellow = yellow;
  color.black = black;
  return color;
};
var createLayer = function createLayer(name) {
  var layer = currentDocument().layers.add();
  layer.name = name;
  return layer;
};
var getLayerByName = function getLayerByName(name) {
  var layers = currentDocument().layers;
  for (var index = 0; index < layers.length; index++) {
    var layer = layers[index];
    if (layer.name === name) {
      return layer;
    }
  }
};
function drawEllipse(layer, y, x, diameter, fillColor, strokeColor, strokeWidth) {
  var ellipse = layer.pathItems.ellipse(y, x, diameter, diameter);
  fillColor && (ellipse.fillColor = fillColor);
  strokeColor ? ellipse.strokeColor = strokeColor : ellipse.strokeColor = NoColor;
  strokeWidth ? ellipse.strokeWidth = strokeWidth : ellipse.strokeWidth = 0;
  return ellipse;
}
function renameLayers(search, replace) {
  var count = 0;
  var layers = currentDocument().layers;
  for (var index = 0; index < layers.length; index++) {
    var layer = layers[index];
    if (layer.name.indexOf(search) !== -1) {
      layer.name = layer.name.replace(search, replace);
      count++;
    }
  }
  return count;
}
function renamePathItems(search, replace) {
  var count = 0;
  var items = currentDocument().pathItems;
  for (var index = 0; index < items.length; index++) {
    if (items[index].name.indexOf(search) !== -1) {
      items[index].name = items[index].name.replace(search, replace);
      count++;
    }
  }
  return count;
}
function renameSelectedPaths(search, replace, fullRename) {
  var count = 0;
  var items = currentDocument().selection;
  for (var index = 0; index < items.length; index++) {
    if (items[index].name.indexOf(search) !== -1 && items[index].typename !== "Layer") {
      fullRename ? items[index].name = replace : items[index].name = items[index].name.replace(search, replace);
      count++;
    }
  }
  return count;
}
function addRegistration(layerName, unit, diameter, edgeOffset, marksPrimary, marksOrientation, marksOrientationLocation, marksCenter, marksDistance, marksDistanceValue) {
  try {
    var doc = currentDocument();
    var docWidth = doc.width;
    var docHeight = doc.height;
    var colorRegistration = createColorCMYK(0, 0, 0, 100);
    var layer = getLayerByName(layerName) || createLayer(layerName);
    var diameterPoints = convertToPoints(diameter, unit);
    var halfDiameter = diameterPoints / 2;
    var edgeOffsetPoints = convertToPoints(edgeOffset, unit);
    var marksDistancePoints = convertToPoints(marksDistanceValue, unit);
    doc.rulerOrigin = [0, 0];
    var coordinates = [];
    if (marksPrimary) {
      var coordinatesPrimary = [
      // [ Y, X ]
      [edgeOffsetPoints + halfDiameter, edgeOffsetPoints - halfDiameter],
      // Bottom Left
      [docHeight - edgeOffsetPoints + halfDiameter, edgeOffsetPoints - halfDiameter],
      // Top Left
      [edgeOffsetPoints + halfDiameter, docWidth - edgeOffsetPoints - halfDiameter],
      // Bottom Right
      [docHeight - edgeOffsetPoints + halfDiameter, docWidth - edgeOffsetPoints - halfDiameter] // Top Right
      ];
      coordinates.push.apply(coordinates, coordinatesPrimary);
    }
    if (marksOrientation) {
      var coordinatesOrientation = [];
      var gap = 144;
      switch (marksOrientationLocation) {
        case "bottom-left":
          coordinatesOrientation.push([edgeOffsetPoints + halfDiameter + gap, edgeOffsetPoints - halfDiameter]);
          coordinatesOrientation.push([edgeOffsetPoints + halfDiameter, edgeOffsetPoints - halfDiameter + gap]);
          break;
        case "bottom-right":
          coordinatesOrientation.push([edgeOffsetPoints + halfDiameter + gap, docWidth - edgeOffsetPoints - halfDiameter]);
          coordinatesOrientation.push([edgeOffsetPoints + halfDiameter, docWidth - edgeOffsetPoints - halfDiameter - gap]);
          break;
        case "top-right":
          coordinatesOrientation.push([docHeight - edgeOffsetPoints + halfDiameter - gap, docWidth - edgeOffsetPoints - halfDiameter]);
          coordinatesOrientation.push([docHeight - edgeOffsetPoints + halfDiameter, docWidth - edgeOffsetPoints - halfDiameter - gap]);
          break;
        case "top-left":
        default:
          coordinatesOrientation.push([docHeight - edgeOffsetPoints + halfDiameter - gap, edgeOffsetPoints - halfDiameter]);
          coordinatesOrientation.push([docHeight - edgeOffsetPoints + halfDiameter, edgeOffsetPoints - halfDiameter + gap]);
          break;
      }
      coordinates.push.apply(coordinates, coordinatesOrientation);
    }
    if (marksCenter) {
      var coordinatesCenter = [[docHeight - edgeOffsetPoints + halfDiameter, docWidth / 2 - halfDiameter],
      // Top Edge
      [edgeOffsetPoints + halfDiameter, docWidth / 2 - halfDiameter],
      // Bottom Edge
      [docHeight / 2 + halfDiameter, edgeOffsetPoints - halfDiameter],
      // Left Edge
      [docHeight / 2 + halfDiameter, docWidth - edgeOffsetPoints - halfDiameter] // Right Edge
      ];
      coordinates.push.apply(coordinates, coordinatesCenter);
    }
    if (marksDistance) {
      var coordinatesDistance = [];

      // Bottom Row
      // Initial Coordinates (Bottom Left)
      var coordY = edgeOffsetPoints + halfDiameter;
      var coordX = edgeOffsetPoints - halfDiameter + marksDistancePoints;
      while (coordX < docWidth - edgeOffsetPoints - halfDiameter) {
        coordinatesDistance.push([coordY, coordX]);
        coordX += marksDistancePoints;
      }

      // Top Row
      // Initial Coordinates (Top Left)
      coordY = docHeight - edgeOffsetPoints + halfDiameter;
      coordX = edgeOffsetPoints - halfDiameter + marksDistancePoints;
      while (coordX < docWidth - edgeOffsetPoints - halfDiameter) {
        coordinatesDistance.push([coordY, coordX]);
        coordX += marksDistancePoints;
      }

      // Left Column
      // Initial Coordinates (Bottom Left)
      coordY = edgeOffsetPoints + halfDiameter + marksDistancePoints;
      coordX = edgeOffsetPoints - halfDiameter;
      while (coordY < docHeight - edgeOffsetPoints - halfDiameter) {
        coordinatesDistance.push([coordY, coordX]);
        coordY += marksDistancePoints;
      }

      // Right Column
      // Initial Coordinates (Bottom Right)
      coordY = edgeOffsetPoints + halfDiameter + marksDistancePoints;
      coordX = docWidth - edgeOffsetPoints - halfDiameter;
      while (coordY < docHeight - edgeOffsetPoints - halfDiameter) {
        coordinatesDistance.push([coordY, coordX]);
        coordY += marksDistancePoints;
      }
      coordinates.push.apply(coordinates, coordinatesDistance);
    }

    // Draw each Ellipse from Coordinates
    for (var index = 0; index < coordinates.length; index++) {
      var y = coordinates[index][0];
      var x = coordinates[index][1];
      drawEllipse(layer, y, x, diameterPoints, colorRegistration);
    }
    return true;
  } catch (error) {
    return false;
  }
}

var ilst = /*#__PURE__*/__objectFreeze({
  __proto__: null,
  currentDocument: currentDocument,
  openDocuments: openDocuments,
  getCurrentLayer: getCurrentLayer,
  getCurrentLayerName: getCurrentLayerName,
  getCurrentPathItemName: getCurrentPathItemName,
  getDocumentWidth: getDocumentWidth,
  getDocumentHeight: getDocumentHeight,
  getSelectionCount: getSelectionCount,
  convertToPoints: convertToPoints,
  setDocumentColorSpaceRGB: setDocumentColorSpaceRGB,
  setDocumentColorSpaceCMYK: setDocumentColorSpaceCMYK,
  createColorCMYK: createColorCMYK,
  createLayer: createLayer,
  getLayerByName: getLayerByName,
  drawEllipse: drawEllipse,
  renameLayers: renameLayers,
  renamePathItems: renamePathItems,
  renameSelectedPaths: renameSelectedPaths,
  addRegistration: addRegistration
});

var host = typeof $ !== "undefined" ? $ : window;

// A safe way to get the app name since some versions of Adobe Apps broken BridgeTalk in various places (e.g. After Effects 24-25)
// in that case we have to do various checks per app to deterimine the app name

var getAppNameSafely = function getAppNameSafely() {
  var compare = function compare(a, b) {
    return a.toLowerCase().indexOf(b.toLowerCase()) > -1;
  };
  var exists = function exists(a) {
    return typeof a !== "undefined";
  };
  var isBridgeTalkWorking = typeof BridgeTalk !== "undefined" && typeof BridgeTalk.appName !== "undefined";
  if (isBridgeTalkWorking) {
    return BridgeTalk.appName;
  } else if (app) {
    
    if (exists(app.name)) {
      
      var name = app.name;
      if (compare(name, "photoshop")) return "photoshop";
      if (compare(name, "illustrator")) return "illustrator";
      if (compare(name, "audition")) return "audition";
      if (compare(name, "bridge")) return "bridge";
      if (compare(name, "indesign")) return "indesign";
    }
    
    if (exists(app.appName)) {
      
      var appName = app.appName;
      if (compare(appName, "after effects")) return "aftereffects";
      if (compare(appName, "animate")) return "animate";
    }
    
    if (exists(app.path)) {
      
      var path = app.path;
      if (compare(path, "premiere")) return "premierepro";
    }
    
    if (exists(app.getEncoderHost) && exists(AMEFrontendEvent)) {
      return "ame";
    }
  }
  return "unknown";
};
switch (getAppNameSafely()) {
  case "illustrator":
  case "illustratorbeta":
    host[ns] = ilst;
    break;
}

// https://extendscript.docsforadobe.dev/interapplication-communication/bridgetalk-class.html?highlight=bridgetalk#appname
})(this);