export const currentDocument = (): Document => {
  return app.activeDocument;
};
export const openDocuments = (): Documents => {
  return app.documents;
};

export const getCurrentLayer = (): Layer => {
  return app.activeDocument.activeLayer as Layer;
};

export const getDocumentWidth = (): number => {
  return currentDocument().width;
};

export const getDocumentHeight = (): number => {
  return currentDocument().height;
};

export const convertToPoints = (value: number, unit: string): number => {
  var unitValue = UnitValue(`${value} ${unit}`);
  unitValue.convert("pt");
  return unitValue.value;
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

export const getLayerByName = (name: string): Layer | null => {
  var layer;
  try {
    layer = currentDocument().layers.getByName(name);
  } catch (error) {
    layer = null;
  }
  return layer;
};

export function drawEllipse(
  layerName: string,
  y: number,
  x: number,
  diameter: number,
  fillColor?: Color,
  strokeColor?: Color,
  strokeWidth?: number
) {
  var selLayer = getCurrentLayer();
  var ellipse = selLayer.pathItems.ellipse(y, x, diameter, diameter);
  fillColor && (ellipse.fillColor = fillColor);
  strokeColor && (ellipse.strokeColor = strokeColor);
  strokeWidth && (ellipse.strokeWidth = strokeWidth);
  return ellipse;
}

export function addRegistration(
  layerName: string,
  unit: string,
  diameter: number,
  edgeOffset: number,
  marksPrimary: boolean,
  marksOrientation: boolean,
  marksOrientationLocation: string,
  marksCenter: boolean,
  marksDistance: boolean,
  marksDistanceValue: number
) {
  const doc = currentDocument();
  const docWidth = doc.width;
  const docHeight = doc.height;
  const colorRegistration = createColorCMYK(0, 0, 0, 100);
  const layer = getLayerByName(layerName) || createLayer(layerName);
  const diameterPoints = convertToPoints(diameter, unit as UnitName);
  const halfDiameter = diameterPoints / 2;
  const edgeOffsetPoints = convertToPoints(edgeOffset, unit as UnitName);
  const marksDistancePoints = convertToPoints(
    marksDistanceValue,
    unit as UnitName
  );

  doc.rulerOrigin = [0, 0];

  if (marksPrimary) {
    const coordinates = [
      // [ Y, X ]
      [edgeOffsetPoints + halfDiameter, edgeOffsetPoints - halfDiameter], // Bottom Left
      [
        docHeight - edgeOffsetPoints + halfDiameter,
        edgeOffsetPoints - halfDiameter,
      ], // Top Left
      [
        edgeOffsetPoints + halfDiameter,
        docWidth - edgeOffsetPoints - halfDiameter,
      ], // Bottom Right
      [
        docHeight - edgeOffsetPoints + halfDiameter,
        docWidth - edgeOffsetPoints - halfDiameter,
      ], // Top Right
    ];

    for (let index = 0; index < coordinates.length; index++) {
      const y = coordinates[index][0];
      const x = coordinates[index][1];
      drawEllipse(layer.name, y, x, diameterPoints, colorRegistration);
    }
    return coordinates;
  }
}
