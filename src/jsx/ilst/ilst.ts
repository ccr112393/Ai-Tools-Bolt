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

  var coordinates: number[][] = [];

  if (marksPrimary) {
    const coordinatesPrimary: number[][] = [
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
    coordinates.push(...coordinatesPrimary);
  }

  if (marksOrientation) {
    const coordinatesOrientation: number[][] = [];
    const gap = 144;
    switch (marksOrientationLocation) {
      case "bottom-left":
        coordinatesOrientation.push([
          edgeOffsetPoints + halfDiameter + gap,
          edgeOffsetPoints - halfDiameter,
        ]);
        coordinatesOrientation.push([
          edgeOffsetPoints + halfDiameter,
          edgeOffsetPoints - halfDiameter + gap,
        ]);
        break;
      case "bottom-right":
        coordinatesOrientation.push([
          edgeOffsetPoints + halfDiameter + gap,
          docWidth - edgeOffsetPoints - halfDiameter,
        ]);
        coordinatesOrientation.push([
          edgeOffsetPoints + halfDiameter,
          docWidth - edgeOffsetPoints - halfDiameter - gap,
        ]);
        break;
      case "top-right":
        coordinatesOrientation.push([
          docHeight - edgeOffsetPoints + halfDiameter - gap,
          docWidth - edgeOffsetPoints - halfDiameter,
        ]);
        coordinatesOrientation.push([
          docHeight - edgeOffsetPoints + halfDiameter,
          docWidth - edgeOffsetPoints - halfDiameter - gap,
        ]);
        break;
      case "top-left":
      default:
        coordinatesOrientation.push([
          docHeight - edgeOffsetPoints + halfDiameter - gap,
          edgeOffsetPoints - halfDiameter,
        ]);
        coordinatesOrientation.push([
          docHeight - edgeOffsetPoints + halfDiameter,
          edgeOffsetPoints - halfDiameter + gap,
        ]);
        break;
    }

    coordinates.push(...coordinatesOrientation);
  }

  if (marksCenter) {
    const coordinatesCenter: number[][] = [
      [
        docHeight - edgeOffsetPoints + halfDiameter,
        docWidth / 2 - halfDiameter,
      ], // Top Edge
      [edgeOffsetPoints + halfDiameter, docWidth / 2 - halfDiameter], // Bottom Edge
      [docHeight / 2 + halfDiameter, edgeOffsetPoints - halfDiameter], // Left Edge
      [
        docHeight / 2 + halfDiameter,
        docWidth - edgeOffsetPoints - halfDiameter,
      ], // Right Edge
    ];
    coordinates.push(...coordinatesCenter);
  }

  if (marksDistance) {
    const coordinatesDistance: number[][] = [];

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

    coordinates.push(...coordinatesDistance);
  }

  // Draw each Ellipse from Coordinates
  for (let index = 0; index < coordinates.length; index++) {
    const y = coordinates[index][0];
    const x = coordinates[index][1];
    drawEllipse(layer.name, y, x, diameterPoints, colorRegistration);
  }
  return coordinates;
}
