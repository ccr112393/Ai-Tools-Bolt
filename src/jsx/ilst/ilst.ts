export const currentDocument = (): Document => {
  return app.activeDocument;
};
export const openDocuments = (): Documents => {
  return app.documents;
};

export const getDocumentWidth = (): number => {
  return currentDocument().width;
};

export const convertToPoints = (value: number, unit: UnitName): number => {
  return UnitValue(value, unit).as("pt").value;
};

export function setDocumentColorSpaceRGB() {
  app.executeMenuCommand("doc-color-rgb");
}

export function setDocumentColorSpaceCMYK() {
  app.executeMenuCommand("doc-color-cmyk");
}

export const createColorCMYK = (
  cyan: number,
  magenta: number,
  yellow: number,
  black: number
): Color => {
  var color = new CMYKColor();
  color.cyan = cyan;
  color.magenta = magenta;
  color.yellow = yellow;
  color.black = black;
  return color;
};

export const createLayer = (name: string): Layer => {
  var layer = currentDocument().layers.add();
  layer.name = name;
  return layer;
};

export const getLayerByName = (name: string): Layer => {
  return currentDocument().layers.getByName(name);
};

export function drawEllipse(
  layer: Layer,
  y: number,
  x: number,
  diameter: number,
  fillColor?: Color,
  strokeColor?: Color,
  strokeWidth?: number
) {
  var ellipse = layer.pathItems.ellipse(y, x, diameter, diameter);
  fillColor && (ellipse.fillColor = fillColor);
  strokeColor && (ellipse.strokeColor = strokeColor);
  strokeWidth && (ellipse.strokeWidth = strokeWidth);
}

export function addRegistration(
  layerName: string,
  unit: string,
  diameter: number,
  edgeOffset: number,
  marksPrimary: boolean,
  marksOrientation: boolean,
  marksOrientationLocation:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right",
  marksCenter: boolean,
  marksDistance: boolean,
  marksDistanceValue: number
) {
  var doc = currentDocument();
  var docWidth = doc.width;
  var docHeight = doc.height;
}
