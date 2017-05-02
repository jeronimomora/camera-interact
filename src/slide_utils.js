import C from './constants';

/**
 * Draws a vector on the slide. Assumes that you're calling this in a slide
 * context, for example:
 *
 * let slide = present.slide().reveal();
 * slide = addVector(slide, [0, 0, 0], [1, 1, 1]);
 * slide = slide.end(); // Puts next vector on separate slide
 * slide = addVector(slide, [-1, -1, -1], [1, 1, 1]);
 *
 * @param {slide} slide - The mathbox presentation
 * @param {Array[3]} from - Coordinate of vector start
 * @param {Array[3]} to - Coordinate of vector end
 * @param {object} vecOpts - Arguments to pass into vector()
 */
const DEFAULT_VEC_OPTS = {
  width: 6,
  end: true,
};
export function addVector(slide, from, to, vecOpts = {}) {
  return slide
    .voxel({
      data: [...from, ...to],
      items: 2,
      channels: 3,
    })
    .vector(Object.assign({}, DEFAULT_VEC_OPTS, vecOpts));
}

/**
 * Draws multiple vectors on the slide.
 *
 * @param {slide} slide - The mathbox presentation
 * @param {Array[n][2][3]} coords - Array containing from, to pairs
 * @param {object} vecOpts - Arguments to pass into vector()
 * @param {bool} sequential - If true, the vectors will each be added one by
 *     one
 */
export function addVectors(slide, coords, vecOpts = {}, sequential = true) {
  return coords.reduce((sl, [from, to]) => {
    if (sequential) sl = sl.slide().reveal();
    return addVector(sl, from, to, vecOpts);
  }, slide);
}

/**
 * Adds a simple box tree to a slide.
 *
 * @param {slide} slide - The mathbox presentation
 */
export function addTree(slide) {
  return slide
    .voxel(C.treeLeavesData)
    .face({ color: C.treeLeavesColor })
    .voxel(C.treeTrunkData)
    .face({ color: C.treeTrunkColor });
}

/**
 * Draws an image on the grid. For this to look right, the slide should already
 * have the grid positioned at the origin facing the camera.
 *
 * @param {slide} slide - The mathbox presentation
 * @param {Array} image - An array containing { i, j, color } objects. Each
 *     object will be rendered as one pixel on the sensor at position i, j.
 *
 *     i is the height position on the sensor, starting from the bottom.
 *     j is the width position on the sensor, starting from the left.
 */
export function addImage(slide, image) {
  const coordToCorners = (i, j) => [
    toPixelCoords(i, j),
    toPixelCoords(i + 1, j),
    toPixelCoords(i + 1, j + 1),
    toPixelCoords(i, j + 1),
  ];

  image.reduce((sl, { i, j, color }) => {
    return sl.voxel({ data: coordToCorners(i, j), items: 4, channels: 3 })
      .face({ color });
  }, slide);
}

/**
 * Returns the 3D world coordinates of a pixel center on the sensor when the
 * sensor is receiving light rays. Useful for addVector when drawing light
 * rays.
 *
 * @param {int} i - Height position on the sensor, starting from the bottom
 * @param {int} j - Width position on the sensor, starting from the left
 */
export function toSensorCoords(i, j) {
  const { xPos, size, pixelSize } = C.sensor;
  return [
    xPos,
    (i - size / 2) * pixelSize + pixelSize / 2,
    - (j - size / 2) * pixelSize + pixelSize / 2,
  ];
}

/**
 * Returns the 3D world coordinates of the top left corner of a pixel on the
 * sensor. Useful for drawImage when drawing the rendered camera image.
 *
 * @param {int} i - Height position on the sensor, starting from the bottom
 * @param {int} j - Width position on the sensor, starting from the left
 */
export function toPixelCoords(i, j) {
  const { size, pixelSize } = C.sensor;
  return [
    (j - size / 2) * pixelSize,
    (i - size / 2) * pixelSize,
    0,
  ];
}

/**
 * Returns a pair of 3D coordinates used to draw a vector onto the sensor
 * through the pinhole.
 *
 * @param {Array[3]} sensorCoord - World coordinates of the sensor pixel
 * @param {float} fromXPos - Starting x position of the light ray.
 */
export function coordsThroughPinhole(sensorCoord, fromXPos) {
  const [x, y, z] = sensorCoord;
  const multiple = (fromXPos - x) / x;
  return [[x + multiple * x, y + multiple * y, z + multiple * z], sensorCoord];
}

export function moveTreeOver(x = 0, y = 0, z = 0, slide) {
    return slide
        .transform({
            position: [x, y, z],
        })
        .voxel(C.treeLeavesData)
        .face({ color: C.treeLeavesColor })
        .voxel(C.treeTrunkData)
        .face({ color: C.treeTrunkColor })
        .end();
}
