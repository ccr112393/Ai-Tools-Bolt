export const currentDocument = (): Document => {
  return app.activeDocument;
};
export const openDocuments = (): Documents => {
  return app.documents;
};

export const getCurrentLayer = (): Layer => {
  return app.activeDocument.activeLayer as Layer;
};

export const getCurrentLayerName = (): string => {
  return app.activeDocument.activeLayer.name;
};

export const getCurrentPathItemName = (): string => {
  let name = "";
  try {
    name = app.activeDocument.selection[0].name;
  } catch (error) {}
  return name;
};

export const getDocumentWidth = (): number => {
  return currentDocument().width;
};

export const getDocumentHeight = (): number => {
  return currentDocument().height;
};

export const getSelectionCount = (): number => {
  return currentDocument().selection.length;
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

export const getLayerByName = (name: string): Layer | undefined => {
  var layers = currentDocument().layers;
  for (let index = 0; index < layers.length; index++) {
    const layer = layers[index];
    if (layer.name === name) {
      return layer;
    }
  }
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
  strokeColor
    ? (ellipse.strokeColor = strokeColor)
    : (ellipse.strokeColor = NoColor);
  strokeWidth ? (ellipse.strokeWidth = strokeWidth) : (ellipse.strokeWidth = 0);
  return ellipse;
}

export function renameLayers(search: string, replace: string): number {
  var count = 0;
  var layers = currentDocument().layers;
  for (let index = 0; index < layers.length; index++) {
    count += renameLayersRecursive(layers[index], search, replace);
  }
  return count;
}

function renameLayersRecursive(
  layer: Layer,
  search: string,
  replace: string
): number {
  var count = 0;
  if (layer.name.indexOf(search) !== -1) {
    layer.name = layer.name.replace(search, replace);
    count++;
  }
  for (let index = 0; index < layer.layers.length; index++) {
    count += renameLayersRecursive(layer.layers[index], search, replace);
  }
  return count;
}

export function renamePathItems(search: string, replace: string): number {
  var count = 0;
  var items = currentDocument().pathItems;
  for (let index = 0; index < items.length; index++) {
    if (items[index].name.indexOf(search) !== -1) {
      items[index].name = items[index].name.replace(search, replace);
      count++;
    }
  }
  return count;
}

export function renameSelectedPaths(
  search: string,
  replace: string,
  fullRename?: boolean
): number {
  var count = 0;
  var items = currentDocument().selection;
  for (let index = 0; index < items.length; index++) {
    if (
      items[index].name.indexOf(search) !== -1 &&
      items[index].typename !== "Layer"
    ) {
      fullRename
        ? (items[index].name = replace)
        : (items[index].name = items[index].name.replace(search, replace));
      count++;
    }
  }
  return count;
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
  try {
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

      coordinates.push(...coordinatesDistance);
    }

    // Draw each Ellipse from Coordinates
    for (let index = 0; index < coordinates.length; index++) {
      const y = coordinates[index][0];
      const x = coordinates[index][1];
      drawEllipse(layer, y, x, diameterPoints, colorRegistration);
    }
    return true;
  } catch (error) {
    return false;
  }
}
