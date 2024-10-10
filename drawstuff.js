/* classes */

// Color constructor
class Color {
  constructor(r, g, b, a) {
    try {
      if (
        typeof r !== "number" ||
        typeof g !== "number" ||
        typeof b !== "number" ||
        typeof a !== "number"
      )
        throw "color component not a number";
      else if (r < 0 || g < 0 || b < 0 || a < 0)
        throw "color component less than 0";
      else if (r > 255 || g > 255 || b > 255 || a > 255)
        throw "color component bigger than 255";
      else {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
      }
    } catch (e) {
      // end try

      console.log(e);
    }
  } // end Color constructor

  // Color change method
  change(r, g, b, a) {
    try {
      if (
        typeof r !== "number" ||
        typeof g !== "number" ||
        typeof b !== "number" ||
        typeof a !== "number"
      )
        throw "color component not a number";
      else if (r < 0 || g < 0 || b < 0 || a < 0)
        throw "color component less than 0";
      else if (r > 255 || g > 255 || b > 255 || a > 255)
        throw "color component bigger than 255";
      else {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
      }
    } catch (e) {
      // end throw

      console.log(e);
    }
  } // end Color change method
} // end color class

/* utility functions */

// draw a pixel at x,y using color
function drawPixel(imagedata, x, y, color) {
  try {
    if (typeof x !== "number" || typeof y !== "number")
      throw "drawpixel location not a number";
    else if (x < 0 || y < 0 || x >= imagedata.width || y >= imagedata.height)
      throw "drawpixel location outside of image";
    else if (color instanceof Color) {
      var pixelindex = (y * imagedata.width + x) * 4;
      imagedata.data[pixelindex] = color.r;
      imagedata.data[pixelindex + 1] = color.g;
      imagedata.data[pixelindex + 2] = color.b;
      imagedata.data[pixelindex + 3] = color.a;
    } else throw "drawpixel color is not a Color";
  } catch (e) {
    // end try

    console.log(e);
  }
} // end drawPixel

// draw random pixels
function drawRandPixels(context) {
  var c = new Color(0, 0, 0, 0); // the color at the pixel: black
  var w = context.canvas.width;
  var h = context.canvas.height;
  var imagedata = context.createImageData(w, h);
  const PIXEL_DENSITY = 0.01;
  var numPixels = w * h * PIXEL_DENSITY;

  // Loop over 1% of the pixels in the image
  for (var x = 0; x < numPixels; x++) {
    c.change(
      Math.random() * 255,
      Math.random() * 255,
      Math.random() * 255,
      255
    ); // rand color
    drawPixel(
      imagedata,
      Math.floor(Math.random() * w),
      Math.floor(Math.random() * h),
      c
    );
  } // end for x
  context.putImageData(imagedata, 0, 0);
} // end draw random pixels

// get the input ellipsoids from the standard class URL
function getInputEllipsoids() {
  const INPUT_ELLIPSOIDS_URL =
    "https://ncsucgclass.github.io/prog1/ellipsoids.json";

  // load the ellipsoids file
  var httpReq = new XMLHttpRequest(); // a new http request
  httpReq.open("GET", INPUT_ELLIPSOIDS_URL, false); // init the request
  httpReq.send(null); // send the request
  var startTime = Date.now();
  while (httpReq.status !== 200 && httpReq.readyState !== XMLHttpRequest.DONE) {
    if (Date.now() - startTime > 3000) break;
  } // until its loaded or we time out after three seconds
  if (httpReq.status !== 200 || httpReq.readyState !== XMLHttpRequest.DONE) {
    console.log * "Unable to open input ellipses file!";
    return String.null;
  } else return JSON.parse(httpReq.response);
} // end get input ellipsoids

//get the input triangles from the standard class URL
function getInputTriangles() {
  const INPUT_TRIANGLES_URL =
    "https://ncsucgclass.github.io/prog1/triangles2.json";
  //github.com/NCSUCGClass/prog1/blob/shell/triangles2.json
  // load the triangles file
  https: var httpReq = new XMLHttpRequest(); // a new http request
  httpReq.open("GET", INPUT_TRIANGLES_URL, false); // init the request
  httpReq.send(null); // send the request
  var startTime = Date.now();
  while (httpReq.status !== 200 && httpReq.readyState !== XMLHttpRequest.DONE) {
    if (Date.now() - startTime > 3000) break;
  } // until its loaded or we time out after three seconds
  if (httpReq.status !== 200 || httpReq.readyState !== XMLHttpRequest.DONE) {
    console.log * "Unable to open input triangles file!";
    return String.null;
  } else return JSON.parse(httpReq.response);
} // end get input triangles

//get the input boxex from the standard class URL
function getInputBoxes() {
  const INPUT_BOXES_URL = "https://ncsucgclass.github.io/prog1/boxes.json";

  // load the boxes file
  var httpReq = new XMLHttpRequest(); // a new http request
  httpReq.open("GET", INPUT_BOXES_URL, false); // init the request
  httpReq.send(null); // send the request
  var startTime = Date.now();
  while (httpReq.status !== 200 && httpReq.readyState !== XMLHttpRequest.DONE) {
    if (Date.now() - startTime > 3000) break;
  } // until its loaded or we time out after three seconds
  if (httpReq.status !== 200 || httpReq.readyState !== XMLHttpRequest.DONE) {
    console.log * "Unable to open input boxes file!";
    return String.null;
  } else return JSON.parse(httpReq.response);
} // end get input boxes

// put random points in the ellipsoids from the class github
function drawRandPixelsInInputEllipsoids(context) {
  var inputEllipsoids = getInputEllipsoids();
  var w = context.canvas.width;
  var h = context.canvas.height;
  var imagedata = context.createImageData(w, h);
  const PIXEL_DENSITY = 0.1;
  var numCanvasPixels = w * h * PIXEL_DENSITY;

  if (inputEllipsoids != String.null) {
    var x = 0;
    var y = 0; // pixel coord init
    var cx = 0;
    var cy = 0; // init center x and y coord
    var ellipsoidXRadius = 0; // init ellipsoid x radius
    var ellipsoidYRadius = 0; // init ellipsoid y radius
    var numEllipsoidPixels = 0; // init num pixels in ellipsoid
    var c = new Color(0, 0, 0, 0); // init the ellipsoid color
    var n = inputEllipsoids.length; // the number of input ellipsoids
    //console.log("number of ellipses: " + n);

    // Loop over the ellipsoids, draw rand pixels in each
    for (var e = 0; e < n; e++) {
      cx = w * inputEllipsoids[e].x; // ellipsoid center x
      cy = h * inputEllipsoids[e].y; // ellipsoid center y
      ellipsoidXRadius = Math.round(w * inputEllipsoids[e].a); // x radius
      ellipsoidYRadius = Math.round(h * inputEllipsoids[e].b); // y radius
      numEllipsoidPixels = ellipsoidXRadius * ellipsoidYRadius * Math.PI; // projected ellipsoid area
      numEllipsoidPixels *= PIXEL_DENSITY; // percentage of ellipsoid area to render to pixels
      numEllipsoidPixels = Math.round(numEllipsoidPixels);
      //console.log("ellipsoid x radius: "+ellipsoidXRadius);
      //console.log("ellipsoid y radius: "+ellipsoidYRadius);
      //console.log("num ellipsoid pixels: "+numEllipsoidPixels);
      c.change(
        inputEllipsoids[e].diffuse[0] * 255,
        inputEllipsoids[e].diffuse[1] * 255,
        inputEllipsoids[e].diffuse[2] * 255,
        255
      ); // ellipsoid diffuse color
      for (var p = 0; p < numEllipsoidPixels; p++) {
        do {
          x = Math.random() * 2 - 1; // in unit square
          y = Math.random() * 2 - 1; // in unit square
        } while (Math.sqrt(x * x + y * y) > 1); // a circle is also an ellipse
        drawPixel(
          imagedata,
          cx + Math.round(x * ellipsoidXRadius),
          cy + Math.round(y * ellipsoidYRadius),
          c
        );
        //console.log("color: ("+c.r+","+c.g+","+c.b+")");
        //console.log("x: "+Math.round(w*inputEllipsoids[e].x));
        //console.log("y: "+Math.round(h*inputEllipsoids[e].y));
      } // end for pixels in ellipsoid
    } // end for ellipsoids
    context.putImageData(imagedata, 0, 0);
  } // end if ellipsoids found
} // end draw rand pixels in input ellipsoids

// draw 2d projections read from the JSON file at class github
function drawInputEllipsoidsUsingArcs(context) {
  var inputEllipsoids = getInputEllipsoids();

  if (inputEllipsoids != String.null) {
    var c = new Color(0, 0, 0, 0); // the color at the pixel: black
    var w = context.canvas.width;
    var h = context.canvas.height;
    var n = inputEllipsoids.length;
    //console.log("number of ellipsoids: " + n);

    // Loop over the ellipsoids, draw each in 2d
    for (var e = 0; e < n; e++) {
      context.fillStyle =
        "rgb(" +
        Math.floor(inputEllipsoids[e].diffuse[0] * 255) +
        "," +
        Math.floor(inputEllipsoids[e].diffuse[1] * 255) +
        "," +
        Math.floor(inputEllipsoids[e].diffuse[2] * 255) +
        ")"; // diffuse color
      context.save(); // remember previous (non-) scale
      context.scale(1, inputEllipsoids[e].b / inputEllipsoids[e].a); // scale by ellipsoid ratio
      context.beginPath();
      context.arc(
        Math.round(w * inputEllipsoids[e].x),
        Math.round(h * inputEllipsoids[e].y),
        Math.round(w * inputEllipsoids[e].a),
        0,
        2 * Math.PI
      );
      context.restore(); // undo scale before fill so stroke width unscaled
      context.fill();
      //console.log(context.fillStyle);
      //console.log("x: "+Math.round(w*inputEllipsoids[e].x));
      //console.log("y: "+Math.round(h*inputEllipsoids[e].y));
      //console.log("a: "+Math.round(w*inputEllipsoids[e].a));
      //console.log("b: "+Math.round(h*inputEllipsoids[e].b));
    } // end for ellipsoids
  } // end if ellipsoids found
} // end draw input ellipsoids

//put random points in the triangles from the class github
function drawRandPixelsInInputTriangles(context) {
  var inputTriangles = getInputTriangles();
  var w = context.canvas.width;
  var h = context.canvas.height;
  var imagedata = context.createImageData(w, h);
  const PIXEL_DENSITY = 0.1;
  var numCanvasPixels = w * h * PIXEL_DENSITY;

  if (inputTriangles != String.null) {
    var x = 0;
    var y = 0; // pixel coord init
    var cx = 0;
    var cy = 0; // init center x and y coord
    var numTrianglePixels = 0; // init num pixels in triangle
    var c = new Color(0, 0, 0, 0); // init the triangle color
    var n = inputTriangles.length; // the number of input files
    //console.log("number of files: " + n);

    // Loop over the triangles, draw rand pixels in each
    for (var f = 0; f < n; f++) {
      var tn = inputTriangles[f].triangles.length;
      // console.log("number of triangles in this files: " + tn);

      // Loop over the triangles, draw each in 2d
      for (var t = 0; t < tn; t++) {
        var vertex1 = inputTriangles[f].triangles[t][0];
        var vertex2 = inputTriangles[f].triangles[t][1];
        var vertex3 = inputTriangles[f].triangles[t][2];

        var vertexPos1 = inputTriangles[f].vertices[vertex1];
        var vertexPos2 = inputTriangles[f].vertices[vertex2];
        var vertexPos3 = inputTriangles[f].vertices[vertex3];
        // console.log("vertexPos1 " + vertexPos1);
        // console.log("vertexPos2 " + vertexPos2);
        // console.log("vertexPos3 " + vertexPos3);

        // triangle position on canvas

        var v1 = [w * vertexPos1[0], h * vertexPos1[1]];
        var v2 = [w * vertexPos2[0], h * vertexPos2[1]];
        var v3 = [w * vertexPos3[0], h * vertexPos3[1]];

        // console.log(v1, v2, v3);
        // calculate triangle area on canvas (shoelace formula)
        var triangleArea =
          0.5 *
          Math.abs(
            v1[0] * v2[1] +
              v2[0] * v3[1] +
              v3[0] * v1[1] -
              v2[0] * v1[1] -
              v3[0] * v2[1] -
              v1[0] * v3[1]
          );
        var numTrianglePixels = triangleArea; // init num pixels in triangle
        //console.log("triangle area " + triangleArea);
        numTrianglePixels *= PIXEL_DENSITY; // percentage of triangle area to render to pixels
        numTrianglePixels = Math.round(numTrianglePixels);
        // console.log("numTrianglePixels " + numTrianglePixels);
        c.change(
          inputTriangles[f].material.diffuse[0] * 255,
          inputTriangles[f].material.diffuse[1] * 255,
          inputTriangles[f].material.diffuse[2] * 255,
          255
        ); // triangle diffuse color
        for (var p = 0; p < numTrianglePixels; p++) {
          var point; // on canvas plane
          var triangleTest = 0;
          while (triangleTest == 0) {
            //if the pixel outside the triangle

            point = [
              Math.floor(Math.random() * w),
              Math.floor(Math.random() * h),
            ];
            // plane checking

            var t1 =
              (point[0] - v2[0]) * (v1[1] - v2[1]) -
                (v1[0] - v2[0]) * (point[1] - v2[1]) <
              0.0;
            var t2 =
              (point[0] - v3[0]) * (v2[1] - v3[1]) -
                (v2[0] - v3[0]) * (point[1] - v3[1]) <
              0.0;
            var t3 =
              (point[0] - v1[0]) * (v3[1] - v1[1]) -
                (v3[0] - v1[0]) * (point[1] - v1[1]) <
              0.0;

            if (t1 == t2 && t2 == t3)
              // draw the pixel if inside the triangle
              triangleTest = 1;
          }
          drawPixel(imagedata, point[0], point[1], c);
          // console.log("color: (" + c.r + "," + c.g + "," + c.b + ")");
          // console.log("x: " + x);
          // console.log("y: " + y);
        } // end for pixels in triangle
      } // end for triangles
    } // end for files
    context.putImageData(imagedata, 0, 0);
  } // end if triangle file found
} // end draw rand pixels in input triangles

function rayCastingOriginal(context) {
  // problem description
  /*
  eye:
    (0.5, 0.5, -0.5)

  view up vector [0 1 0]
  look at vector [0 0 1]

  window at a distance of 0.5 from the eye
  1 * 1 square
  centered at (0.5, 0.5, 0)
  normal to the look at vector
  parallel to the view up vector

  projection window corners:
    1 corner at the origin and other at (1, 1, 1)
    entire box is 1 * 1 * 1

  white light at (-3, 1, -0.5)
  */
  // pseudo code
  /* 
  for each screen pixel
    find the ray from the eye through the pixel
    for each object in the scene
      if the ray intersects the object, and is closest yet
        record intersection and object
    find color for closest intersection
  */
  var w = context.canvas.width;
  var h = context.canvas.height;
  var imagedata = context.createImageData(w, h);
  var inputTriangles = getInputTriangles();
  const eyePos = {
    coordinates: [[0.5, 0.5, -0.5]],
  };

  var eye = new Vector(
    eyePos.coordinates[0][0],
    eyePos.coordinates[0][1],
    eyePos.coordinates[0][2]
  );

  const light = {
    coordinates: [[-3, 1, -0.5]],
    ambient: [1, 1, 1],
    diffuse: [1, 1, 1],
    specular: [1, 1, 1],
  };

  // used the vector class from github that was provided in one of the exercises
  var lightPos = new Vector(
    light.coordinates[0][0],
    light.coordinates[0][1],
    light.coordinates[0][2]
  );

  // original
  const projWin = {
    corners: [
      [0, 1, 0],
      [1, 1, 0],
      [0, 0, 0],
      [1, 0, 0],
    ],
  };

  var lookAt = new Vector(0, 0, 1);
  var lookUp = new Vector(0, 1, 0);

  // original viewport corners according to prog 1
  var UL = projWin.corners[0];
  var UR = projWin.corners[1];
  var LL = projWin.corners[2];
  var LR = projWin.corners[3];

  // paint the screen black
  for (var t = 0; t < w; t++) {
    for (var s = 0; s < h; s++) {
      drawPixel(imagedata, s, t, new Color(0, 0, 0, 255));
    }
  }
  // ray-casting starts here
  //triangles
  for (var t = 0; t < w; t++) {
    for (var s = 0; s < h; s++) {
      var PLx = UL[0] + (t / w) * (LL[0] - UL[0]);
      var PRx = UR[0] + (t / w) * (LR[0] - UR[0]);
      var Px = PLx + (s / h) * (PRx - PLx);

      var PLy = UL[1] + (t / w) * (LL[1] - UL[1]);
      var PRy = UR[1] + (t / w) * (LR[1] - UR[1]);
      var Py = PLy + (s / h) * (PRy - PLy);

      var PLz = UL[2] + (t / w) * (LL[2] - UL[2]);
      var PRz = UR[2] + (t / w) * (LR[2] - UR[2]);
      var Pz = PLz + (s / h) * (PRz - PLz);

      var P = new Vector(Px, Py, Pz); // pixel coordinates
      var D = Vector.subtract(P, eye); // direction vector
      var nTri = inputTriangles.length; // the number of input Triangle files
      // console.log("number of files: " + n);
      var t1 = Number.MAX_VALUE;
      if (inputTriangles != String.null) {
        var c = new Color(0, 0, 0, 255); // init the triangle color
        for (var f = 0; f < nTri; f++) {
          var tn = inputTriangles[f].triangles.length;
          // console.log("number of triangles in this files: " + tn);
          // Loop over the triangles
          for (var i = 0; i < tn; i++) {
            var vertex1 = inputTriangles[f].triangles[i][0];
            var vertex2 = inputTriangles[f].triangles[i][1];
            var vertex3 = inputTriangles[f].triangles[i][2];

            var vertexPos1 = inputTriangles[f].vertices[vertex1];
            var vertexPos2 = inputTriangles[f].vertices[vertex2];
            var vertexPos3 = inputTriangles[f].vertices[vertex3];

            // vertices of the triangle in vector
            var A = new Vector(vertexPos1[0], vertexPos1[1], vertexPos1[2]);
            var B = new Vector(vertexPos2[0], vertexPos2[1], vertexPos2[2]);
            var C = new Vector(vertexPos3[0], vertexPos3[1], vertexPos3[2]);

            // normal of the triangle ABC
            var N = Vector.cross(Vector.subtract(A, B), Vector.subtract(A, C));
            var normN = Vector.normalize(N);
            var d = Vector.dot(A, N); // plane constant
            var NdotE = Vector.dot(N, eye);
            var NdotD = Vector.dot(N, D);
            if (NdotD === 0) {
              continue;
            } else {
              var tempT = (d - NdotE) / NdotD;
              if (tempT >= 1) {
                // point of intersection
                var I = Vector.add(eye, Vector.scale(tempT, D));
                // blinn-phong illumination
                var normV = Vector.normalize(Vector.subtract(eye, I));
                var L = Vector.subtract(lightPos, I);
                var normL = Vector.normalize(L);
                var H = Vector.normalize(Vector.add(normV, normL));
                var sign1 = sameSide(N, I, A, B);
                var sign2 = sameSide(N, I, B, C);
                var sign3 = sameSide(N, I, C, A);
                if (
                  (sign1 < 0 && sign2 < 0 && sign3 < 0) ||
                  (sign1 > 0 && sign2 > 0 && sign3 > 0)
                ) {
                  if (tempT < t1) {
                    if (Vector.dot(N, D) < 0) {
                      c.change(
                        Math.max(
                          Math.min(
                            light.ambient[0] *
                              inputTriangles[f].material.ambient[0] +
                              (light.diffuse[0] *
                                inputTriangles[f].material.diffuse[0] *
                                Vector.dot(normN, normL) +
                                light.specular[0] *
                                  inputTriangles[f].material.specular[0] *
                                  Math.pow(
                                    Vector.dot(normN, H),
                                    inputTriangles[f].material.n
                                  )),
                            Math.max(0, 1)
                          ),
                          Math.min(0, 1)
                        ) * 255,
                        Math.max(
                          Math.min(
                            light.ambient[1] *
                              inputTriangles[f].material.ambient[1] +
                              (light.diffuse[1] *
                                inputTriangles[f].material.diffuse[1] *
                                Vector.dot(normN, normL) +
                                light.specular[1] *
                                  inputTriangles[f].material.specular[1] *
                                  Math.pow(
                                    Vector.dot(normN, H),
                                    inputTriangles[f].material.n
                                  )),
                            Math.max(0, 1)
                          ),
                          Math.min(0, 1)
                        ) * 255,
                        Math.max(
                          Math.min(
                            light.ambient[2] *
                              inputTriangles[f].material.ambient[2] +
                              (light.diffuse[2] *
                                inputTriangles[f].material.diffuse[2] *
                                Vector.dot(normN, normL) +
                                light.specular[2] *
                                  inputTriangles[f].material.specular[2] *
                                  Math.pow(
                                    Vector.dot(normN, H),
                                    inputTriangles[f].material.n
                                  )),
                            Math.max(0, 1)
                          ),
                          Math.min(0, 1)
                        ) * 255,
                        255
                      );
                      t1 = tempT;
                      drawPixel(imagedata, s, t, c);
                    } else {
                      // shadow test should be here
                      c.change(
                        light.ambient[0] *
                          inputTriangles[f].material.ambient[0] *
                          255,
                        light.ambient[1] *
                          inputTriangles[f].material.ambient[1] *
                          255,
                        light.ambient[2] *
                          inputTriangles[f].material.ambient[2] *
                          255,
                        255
                      );
                      t1 = tempT;
                      drawPixel(imagedata, s, t, c);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  context.putImageData(imagedata, 0, 0);
}

function rayCasting(context) {
  var w = context.canvas.width;
  var h = context.canvas.height;
  var imagedata = context.createImageData(w, h);
  var inputTriangles = [
    {
      material: {
        ambient: [0, 0, 0],
        diffuse: [0.0, 0.0, 0.0],
        specular: [1, 1, 1],
        n: 5,
      },
      vertices: [
        [-0.3, -0.3, 0],
        [0.6, -0.3, 0.5],
        [0.6, -0.3, -0.5],
      ],
      triangles: [[0, 1, 2]],
    },
    {
      material: {
        ambient: [0.1, 0.1, 0.1],
        diffuse: [0.6, 0.6, 0.6],
        specular: [0.1, 0.1, 0.1],
        n: 9,
      },
      vertices: [
        [-3, -3, -3],
        [3, 1, -2.5],
        [-2, 3, 1],
      ],
      triangles: [[0, 1, 2]],
    },
    // {
    //   material: {
    //     ambient: [0.1, 0.1, 0.1],
    //     diffuse: [0.9, 0.2, 0.5],
    //     specular: [0.8, 0.8, 0.8],
    //     n: 7,
    //   },
    //   vertices: [
    //     [0, 0, 0],
    //     [1, 2, -1],
    //     [2, 0, 1],
    //   ],
    //   triangles: [[0, 1, 2]],
    // },
  ];
  var inputSpheres = [
    {
      x: -0.3,
      y: 0.3,
      z: 0,
      a: 0.6,
      b: 0.6,
      c: 0.6,
      ambient: [0.05, 0.05, 0.05],
      diffuse: [0.78, 0.8, 0.0],
      specular: [0.3, 0.3, 0.3],
      n: 9,
    },
    {
      x: 0.1,
      y: -0.5,
      z: 0,
      a: 0.05,
      b: 0.06,
      c: 0.04,
      ambient: [0.1, 0.1, 0.1],
      diffuse: [0.9, 0.1, 0.05],
      specular: [0.3, 0.3, 0.3],
      n: 5,
    },
    {
      x: 0.3,
      y: -0.5,
      z: 0,
      a: 0.05,
      b: 0.06,
      c: 0.04,
      ambient: [0.1, 0.1, 0.1],
      diffuse: [0.8, 0.4, 0.05],
      specular: [0.3, 0.3, 0.3],
      n: 5,
    },
    {
      x: 0.5,
      y: -0.5,
      z: 0,
      a: 0.05,
      b: 0.06,
      c: 0.04,
      ambient: [0.1, 0.1, 0.1],
      diffuse: [0.2, 0.8, 0.9],
      specular: [0.3, 0.3, 0.3],
      n: 5,
    },
    {
      x: 0.7,
      y: -0.5,
      z: 0,
      a: 0.05,
      b: 0.06,
      c: 0.04,
      ambient: [0.1, 0.1, 0.1],
      diffuse: [0.9, 0.5, 0.9],
      specular: [0.3, 0.3, 0.3],
      n: 5,
    },
    {
      x: -0.12,
      y: -0.5,
      z: 0.27,
      a: 0.06,
      b: 0.06,
      c: 0.06,
      ambient: [0.1, 0.1, 0.1],
      diffuse: [0, 0, 0],
      specular: [0.3, 0.3, 0.3],
      n: 5,
    },
  ];

  const eyePos = {
    coordinates: [[0, -3, 0]],
  };

  var eye = new Vector(
    eyePos.coordinates[0][0],
    eyePos.coordinates[0][1],
    eyePos.coordinates[0][2]
  );

  const light = {
    coordinates: [[0.75, -2, 2]],
    ambient: [1, 1, 1],
    diffuse: [1, 1, 1],
    specular: [1, 1, 1],
  };

  // used the vector class from github that was provided in one of the exercises
  var lightPos = new Vector(
    light.coordinates[0][0],
    light.coordinates[0][1],
    light.coordinates[0][2]
  );

  // original
  // const projWin = {
  //   corners: [
  //     [0, 1, 0],
  //     [1, 1, 0],
  //     [0, 0, 0],
  //     [1, 0, 0],
  //   ],
  // };

  // experiment
  const projWin = {
    corners: [
      [-1, -1, 1],
      [1, -1, 1],
      [-1, -1, -1],
      [1, -1, -1],
    ],
  };

  var lookAt = new Vector(0, 0, 1);
  var lookUp = new Vector(0, 1, 0);

  // original viewport corners according to prog 1
  var UL = projWin.corners[0];
  var UR = projWin.corners[1];
  var LL = projWin.corners[2];
  var LR = projWin.corners[3];

  // paint the screen black
  for (var t = 0; t < w; t++) {
    for (var s = 0; s < h; s++) {
      drawPixel(imagedata, s, t, new Color(0, 0, 0, 255));
    }
  }
  // ray-casting starts here
  //triangles
  for (var t = 0; t < w; t++) {
    for (var s = 0; s < h; s++) {
      var PLx = UL[0] + (t / w) * (LL[0] - UL[0]);
      var PRx = UR[0] + (t / w) * (LR[0] - UR[0]);
      var Px = PLx + (s / h) * (PRx - PLx);

      var PLy = UL[1] + (t / w) * (LL[1] - UL[1]);
      var PRy = UR[1] + (t / w) * (LR[1] - UR[1]);
      var Py = PLy + (s / h) * (PRy - PLy);

      var PLz = UL[2] + (t / w) * (LL[2] - UL[2]);
      var PRz = UR[2] + (t / w) * (LR[2] - UR[2]);
      var Pz = PLz + (s / h) * (PRz - PLz);

      var P = new Vector(Px, Py, Pz); // pixel coordinates
      var D = Vector.subtract(P, eye); // direction vector
      var nTri = inputTriangles.length; // the number of input Triangle files
      var nSph = inputSpheres.length; // the number of input Sphere files
      // console.log("number of files: " + n);
      var t1 = Number.MAX_VALUE;
      if (inputTriangles != String.null) {
        var c = new Color(0, 0, 0, 255); // init the triangle color
        for (var f = 0; f < nTri; f++) {
          var tn = inputTriangles[f].triangles.length;
          // console.log("number of triangles in this files: " + tn);
          // Loop over the triangles
          for (var i = 0; i < tn; i++) {
            var vertex1 = inputTriangles[f].triangles[i][0];
            var vertex2 = inputTriangles[f].triangles[i][1];
            var vertex3 = inputTriangles[f].triangles[i][2];

            var vertexPos1 = inputTriangles[f].vertices[vertex1];
            var vertexPos2 = inputTriangles[f].vertices[vertex2];
            var vertexPos3 = inputTriangles[f].vertices[vertex3];
            // vertices of the triangle in vector
            var A = new Vector(vertexPos1[0], vertexPos1[1], vertexPos1[2]);
            var B = new Vector(vertexPos2[0], vertexPos2[1], vertexPos2[2]);
            var C = new Vector(vertexPos3[0], vertexPos3[1], vertexPos3[2]);

            // c.change(
            //   inputTriangles[f].material.diffuse[0] * 255,
            //   inputTriangles[f].material.diffuse[1] * 255,
            //   inputTriangles[f].material.diffuse[2] * 255,
            //   255
            // );

            // normal of the triangle ABC
            var N = Vector.cross(Vector.subtract(A, B), Vector.subtract(A, C));
            var normN = Vector.normalize(N);

            var d = Vector.dot(A, N); // plane constant

            // console.log("N: " + N);
            // console.log("d: " + d);

            var NdotE = Vector.dot(N, eye);
            var NdotD = Vector.dot(N, D);

            // console.log("N.E: " + NdotE);
            // console.log("N.D: " + NdotD);
            if (NdotD === 0) {
              continue;
            } else {
              var tempT = (d - NdotE) / NdotD;
              if (tempT >= 1) {
                var I = Vector.add(eye, Vector.scale(tempT, D)); // point of intersection

                // blinn-phong illumination
                var normV = Vector.normalize(Vector.subtract(eye, I));
                var L = Vector.subtract(lightPos, I);
                var normL = Vector.normalize(L);
                var H = Vector.normalize(Vector.add(normV, normL));
                // console.log(H);
                // console.log("I: ", I);
                var sign1 = sameSide(N, I, A, B);
                var sign2 = sameSide(N, I, B, C);
                var sign3 = sameSide(N, I, C, A);
                // console.log(tempT);
                // var tempT = t1;
                if (
                  (sign1 < 0 && sign2 < 0 && sign3 < 0) ||
                  (sign1 > 0 && sign2 > 0 && sign3 > 0)
                ) {
                  if (tempT < t1) {
                    var S = shadowLight(I, L);
                    if (Vector.dot(N, D) < 0) {
                      c.change(
                        Math.max(
                          Math.min(
                            light.ambient[0] *
                              inputTriangles[f].material.ambient[0] +
                              (light.diffuse[0] *
                                inputTriangles[f].material.diffuse[0] *
                                Vector.dot(normN, normL) +
                                light.specular[0] *
                                  inputTriangles[f].material.specular[0] *
                                  Math.pow(
                                    Vector.dot(normN, H),
                                    inputTriangles[f].material.n
                                  )) *
                                S,
                            Math.max(0, 1)
                          ),
                          Math.min(0, 1)
                        ) * 255,
                        Math.max(
                          Math.min(
                            light.ambient[1] *
                              inputTriangles[f].material.ambient[1] +
                              (light.diffuse[1] *
                                inputTriangles[f].material.diffuse[1] *
                                Vector.dot(normN, normL) +
                                light.specular[1] *
                                  inputTriangles[f].material.specular[1] *
                                  Math.pow(
                                    Vector.dot(normN, H),
                                    inputTriangles[f].material.n
                                  )) *
                                S,
                            Math.max(0, 1)
                          ),
                          Math.min(0, 1)
                        ) * 255,
                        Math.max(
                          Math.min(
                            light.ambient[2] *
                              inputTriangles[f].material.ambient[2] +
                              (light.diffuse[2] *
                                inputTriangles[f].material.diffuse[2] *
                                Vector.dot(normN, normL) +
                                light.specular[2] *
                                  inputTriangles[f].material.specular[2] *
                                  Math.pow(
                                    Vector.dot(normN, H),
                                    inputTriangles[f].material.n
                                  )) *
                                S,
                            Math.max(0, 1)
                          ),
                          Math.min(0, 1)
                        ) * 255,
                        255
                      );
                      t1 = tempT;
                      drawPixel(imagedata, s, t, c);
                    } else {
                      // shadow test should be here
                      c.change(
                        light.ambient[0] *
                          inputTriangles[f].material.ambient[0] *
                          255,
                        light.ambient[1] *
                          inputTriangles[f].material.ambient[1] *
                          255,
                        light.ambient[2] *
                          inputTriangles[f].material.ambient[2] *
                          255,
                        255
                      );
                      t1 = tempT;
                      drawPixel(imagedata, s, t, c);
                    }
                  }
                }
              }
            }
          }
        }
      }
      if (inputSpheres != String.null) {
        var c = new Color(0, 0, 0, 0); // init the ellipsoid color
        // var n = inputSpheres.length; // the number of input ellipsoids
        //console.log("number of ellipses: " + n);

        // Loop over the ellipsoids
        for (var e = 0; e < nSph; e++) {
          var C = new Vector(
            inputSpheres[e].x,
            inputSpheres[e].y,
            inputSpheres[e].z
          );
          var A = new Vector(
            inputSpheres[e].a,
            inputSpheres[e].b,
            inputSpheres[e].c
          );

          var normN = Vector.normalize(Vector.subtract(P, C));
          // console.log(inputSpheres[e].a);
          var aDisc =
            Math.pow(D.x / A.x, 2) +
            Math.pow(D.y / A.y, 2) +
            Math.pow(D.z / A.z, 2);
          var EminusC = Vector.subtract(eye, C);
          var bDisc =
            2 *
            ((D.x / A.x) * (EminusC.x / A.x) +
              (D.y / A.y) * (EminusC.y / A.y) +
              (D.z / A.z) * (EminusC.z / A.z));
          var cDisc =
            Math.pow(EminusC.x / A.x, 2) +
            Math.pow(EminusC.y / A.y, 2) +
            Math.pow(EminusC.z / A.z, 2) -
            1;

          var discriminant = Math.pow(bDisc, 2) - 4 * aDisc * cDisc;

          // console.log(cDisc);
          if (discriminant === 0) {
            var tempT = -bDisc / (2 * aDisc);
            console.log(tempT);
          } else if (discriminant < 0) {
            continue;
          } else if (discriminant > 0) {
            var tempT = Math.min(
              (-bDisc + Math.pow(discriminant, 0.5)) / (2 * aDisc),
              (-bDisc - Math.pow(discriminant, 0.5)) / (2 * aDisc)
            );
            if (tempT > 1) {
              var I = Vector.add(eye, Vector.scale(tempT, D));
              // console.log(I);
              var normV = Vector.normalize(Vector.subtract(eye, I));
              var L = Vector.subtract(lightPos, I);
              var normL = Vector.normalize(L);
              var H = Vector.normalize(Vector.add(normV, normL));
              // var S = shadowLight(I, L);
              if (tempT < t1) {
                // shadow test should be here
                c.change(
                  Math.max(
                    Math.min(
                      light.ambient[0] * inputSpheres[e].ambient[0] +
                        (light.diffuse[0] *
                          inputSpheres[e].diffuse[0] *
                          Vector.dot(normN, normL) +
                          light.specular[0] *
                            inputSpheres[e].specular[0] *
                            Math.pow(Vector.dot(normN, H), inputSpheres[e].n)),
                      Math.max(0, 1)
                    ),
                    Math.min(0, 1)
                  ) * 255,
                  Math.max(
                    Math.min(
                      light.ambient[1] * inputSpheres[e].ambient[1] +
                        (light.diffuse[1] *
                          inputSpheres[e].diffuse[1] *
                          Vector.dot(normN, normL) +
                          light.specular[1] *
                            inputSpheres[e].specular[1] *
                            Math.pow(Vector.dot(normN, H), inputSpheres[e].n)),
                      Math.max(0, 1)
                    ),
                    Math.min(0, 1)
                  ) * 255,
                  Math.max(
                    Math.min(
                      light.ambient[2] * inputSpheres[e].ambient[2] +
                        (light.diffuse[2] *
                          inputSpheres[e].diffuse[2] *
                          Vector.dot(normN, normL) +
                          light.specular[2] *
                            inputSpheres[e].specular[2] *
                            Math.pow(Vector.dot(normN, H), inputSpheres[e].n)),
                      Math.max(0, 1)
                    ),
                    Math.min(0, 1)
                  ) * 255,
                  255
                );
                t1 = tempT;
                drawPixel(imagedata, s, t, c);
              }
            }
          }
        }
      }
    }
  }
  context.putImageData(imagedata, 0, 0);
}

function intersectTriangleTest(context) {
  var w = context.canvas.width;
  var h = context.canvas.height;

  var E = new Vector(0, 0, 0); // eye coordinates
  var P = new Vector(2, 1, 1); // pixel coordinates

  console.log("Eye coordinates: ", E);

  var D = Vector.subtract(P, E); // direction vector

  var A = new Vector(1, 1, 3);
  var B = new Vector(5, 1, 3);
  var C = new Vector(5, 5, 3);

  // normal of the triangle ABC
  var N = Vector.cross(Vector.subtract(A, B), Vector.subtract(A, C));

  var d = Vector.dot(A, N); // plane constant

  // console.log("N: " + N);
  // console.log("d: " + d);

  var NdotE = Vector.dot(N, E);
  var NdotD = Vector.dot(N, D);

  // console.log("N.E: " + NdotE);
  // console.log("N.D: " + NdotD);

  var t = (d - NdotE) / NdotD;
  console.log("t: ", t);

  var I = Vector.add(E, Vector.scale(t, D));
  console.log("I: ", I);
  var sign1 = sameSide(N, I, A, B);
  var sign2 = sameSide(N, I, B, C);
  var sign3 = sameSide(N, I, C, A);

  console.log(sign1, sign2, sign3);
}

function sameSide(N, I, V1, V2) {
  var sign = Vector.dot(
    N,
    Vector.cross(Vector.subtract(I, V1), Vector.subtract(V2, V1))
  );
  return sign;
}

function shadowLight(Eye, Dir) {
  var inputTriangles = [
    {
      material: {
        ambient: [0, 0, 0],
        diffuse: [0.0, 0.0, 0.0],
        specular: [1, 1, 1],
        n: 5,
      },
      vertices: [
        [-0.3, -0.3, 0],
        [0.6, -0.3, 0.5],
        [0.6, -0.3, -0.5],
      ],
      triangles: [[0, 1, 2]],
    },
    // {
    //   material: {
    //     ambient: [0.1, 0.1, 0.1],
    //     diffuse: [0.9, 0.2, 0.5],
    //     specular: [0.8, 0.8, 0.8],
    //     n: 7,
    //   },
    //   vertices: [
    //     [0, 0, 0],
    //     [1, 2, -1],
    //     [2, 0, 1],
    //   ],
    //   triangles: [[0, 1, 2]],
    // },
  ];
  var inputSpheres = [
    {
      x: -0.3,
      y: 0.3,
      z: 0,
      a: 0.6,
      b: 0.6,
      c: 0.6,
      ambient: [0.1, 0.1, 0.1],
      diffuse: [0.78, 0.8, 0.0],
      specular: [0.3, 0.3, 0.3],
      n: 5,
    },
    {
      x: 0.1,
      y: -0.5,
      z: 0,
      a: 0.05,
      b: 0.06,
      c: 0.04,
      ambient: [0.1, 0.1, 0.1],
      diffuse: [0.9, 0.1, 0.05],
      specular: [0.3, 0.3, 0.3],
      n: 5,
    },
    {
      x: 0.3,
      y: -0.5,
      z: 0,
      a: 0.05,
      b: 0.06,
      c: 0.04,
      ambient: [0.1, 0.1, 0.1],
      diffuse: [0.8, 0.4, 0.05],
      specular: [0.3, 0.3, 0.3],
      n: 5,
    },
    {
      x: 0.5,
      y: -0.5,
      z: 0,
      a: 0.05,
      b: 0.06,
      c: 0.04,
      ambient: [0.1, 0.1, 0.1],
      diffuse: [0.2, 0.8, 0.9],
      specular: [0.3, 0.3, 0.3],
      n: 5,
    },
    {
      x: 0.7,
      y: -0.5,
      z: 0,
      a: 0.05,
      b: 0.06,
      c: 0.04,
      ambient: [0.1, 0.1, 0.1],
      diffuse: [0.9, 0.5, 0.9],
      specular: [0.3, 0.3, 0.3],
      n: 5,
    },
    {
      x: -0.12,
      y: -0.5,
      z: 0.27,
      a: 0.06,
      b: 0.06,
      c: 0.06,
      ambient: [0.1, 0.1, 0.1],
      diffuse: [0, 0, 0],
      specular: [0.3, 0.3, 0.3],
      n: 5,
    },
  ];
  var nTri = inputTriangles.length; // the number of input Triangle files
  var nSph = inputSpheres.length; // the number of input Sphere files
  var surfPoint = Eye;
  var lightDir = Dir;
  var ogLen = Math.pow(
    Math.pow(lightDir.x, 2) + Math.pow(lightDir.y, 2) + Math.pow(lightDir.z, 2),
    0.5
  );
  var t1 = Number.MAX_VALUE;
  if (inputSpheres != String.null) {
    // var c = new Color(0, 0, 0, 0); // init the ellipsoid color
    // var n = inputSpheres.length; // the number of input ellipsoids
    //console.log("number of ellipses: " + n);
    // Loop over the ellipsoids
    for (var e = 0; e < nSph; e++) {
      var C = new Vector(
        inputSpheres[e].x,
        inputSpheres[e].y,
        inputSpheres[e].z
      );
      var A = new Vector(
        inputSpheres[e].a,
        inputSpheres[e].b,
        inputSpheres[e].c
      );
      // var normN = Vector.normalize(Vector.subtract(P, C));
      var aDisc =
        Math.pow(lightDir.x / A.x, 2) +
        Math.pow(lightDir.y / A.y, 2) +
        Math.pow(lightDir.z / A.z, 2);
      var EminusC = Vector.subtract(surfPoint, C);
      var bDisc =
        2 *
        ((lightDir.x / A.x) * (EminusC.x / A.x) +
          (lightDir.y / A.y) * (EminusC.y / A.y) +
          (lightDir.z / A.z) * (EminusC.z / A.z));
      var cDisc =
        Math.pow(EminusC.x / A.x, 2) +
        Math.pow(EminusC.y / A.y, 2) +
        Math.pow(EminusC.z / A.z, 2) -
        1;

      var discriminant = Math.pow(bDisc, 2) - 4 * aDisc * cDisc;

      // console.log(cDisc);
      if (discriminant === 0) {
        var tempT = -bDisc / (2 * aDisc);
        console.log(tempT);
      } else if (discriminant < 0) {
        continue;
      } else if (discriminant > 0) {
        var tempT = Math.min(
          (-bDisc + Math.pow(discriminant, 0.5)) / (2 * aDisc),
          (-bDisc - Math.pow(discriminant, 0.5)) / (2 * aDisc)
        );

        var I = Vector.add(surfPoint, Vector.scale(tempT, lightDir));
        var checkLen = Vector.subtract(I, surfPoint);
        // console.log(I);
        // var normV = Vector.normalize(Vector.subtract(eye, I));
        // var normL = Vector.normalize(Vector.subtract(lightPos, I));
        // var H = Vector.normalize(Vector.add(normV, normL));
        if (tempT < t1) {
          var Len = Math.pow(
            Math.pow(checkLen.x, 2) +
              Math.pow(checkLen.y, 2) +
              Math.pow(checkLen.z, 2),
            0.5
          );
          t1 = tempT;
        }
      }
    }
  }
  if (inputTriangles != String.null) {
    var c = new Color(0, 0, 0, 255); // init the triangle color
    for (var f = 0; f < nTri; f++) {
      var tn = inputTriangles[f].triangles.length;
      // console.log("number of triangles in this files: " + tn);
      // Loop over the triangles
      for (var i = 0; i < tn; i++) {
        var vertex1 = inputTriangles[f].triangles[i][0];
        var vertex2 = inputTriangles[f].triangles[i][1];
        var vertex3 = inputTriangles[f].triangles[i][2];

        var vertexPos1 = inputTriangles[f].vertices[vertex1];
        var vertexPos2 = inputTriangles[f].vertices[vertex2];
        var vertexPos3 = inputTriangles[f].vertices[vertex3];
        // vertices of the triangle in vector
        var A = new Vector(vertexPos1[0], vertexPos1[1], vertexPos1[2]);
        var B = new Vector(vertexPos2[0], vertexPos2[1], vertexPos2[2]);
        var C = new Vector(vertexPos3[0], vertexPos3[1], vertexPos3[2]);

        // c.change(
        //   inputTriangles[f].material.diffuse[0] * 255,
        //   inputTriangles[f].material.diffuse[1] * 255,
        //   inputTriangles[f].material.diffuse[2] * 255,
        //   255
        // );

        // normal of the triangle ABC
        var N = Vector.cross(Vector.subtract(A, B), Vector.subtract(A, C));
        var normN = Vector.normalize(N);

        var d = Vector.dot(A, N); // plane constant

        // console.log("N: " + N);
        // console.log("d: " + d);

        var NdotE = Vector.dot(N, surfPoint);
        var NdotD = Vector.dot(N, lightDir);

        // console.log("N.E: " + NdotE);
        // console.log("N.D: " + NdotD);
        if (NdotD === 0) {
          continue;
        } else {
          var tempT = (d - NdotE) / NdotD;

          var I = Vector.add(surfPoint, Vector.scale(tempT, lightDir)); // point of intersection

          // console.log(H);
          // console.log("I: ", I);
          var sign1 = sameSide(N, I, A, B);
          var sign2 = sameSide(N, I, B, C);
          var sign3 = sameSide(N, I, C, A);
          // console.log(tempT);
          // var tempT = t1;
          if (
            (sign1 < 0 && sign2 < 0 && sign3 < 0) ||
            (sign1 > 0 && sign2 > 0 && sign3 > 0)
          ) {
            if (tempT < t1) {
              var checkLen = Vector.subtract(I, surfPoint);
              var Len = Math.pow(
                Math.pow(checkLen.x, 2) +
                  Math.pow(checkLen.y, 2) +
                  Math.pow(checkLen.z, 2),
                0.5
              );
              t1 = tempT;
            }
          }
        }
      }
    }
  }
  return Len < ogLen ? 0 : 1;
}

//draw 2d projections traingle from the JSON file at class github
function drawInputTrainglesUsingPaths(context) {
  var inputTriangles = getInputTriangles();

  if (inputTriangles != String.null) {
    var c = new Color(0, 0, 0, 0); // the color at the pixel: black
    var w = context.canvas.width;
    var h = context.canvas.height;
    var n = inputTriangles.length;
    //console.log("number of files: " + n);

    // Loop over the input files
    for (var f = 0; f < n; f++) {
      var tn = inputTriangles[f].triangles.length;
      //console.log("number of triangles in this files: " + tn);

      // Loop over the triangles, draw each in 2d
      for (var t = 0; t < tn; t++) {
        var vertex1 = inputTriangles[f].triangles[t][0];
        var vertex2 = inputTriangles[f].triangles[t][1];
        var vertex3 = inputTriangles[f].triangles[t][2];

        var vertexPos1 = inputTriangles[f].vertices[vertex1];
        var vertexPos2 = inputTriangles[f].vertices[vertex2];
        var vertexPos3 = inputTriangles[f].vertices[vertex3];
        //console.log("vertexPos1 " + vertexPos1);
        //console.log("vertexPos2 " + vertexPos2);
        //console.log("vertexPos3 " + vertexPos3);

        context.fillStyle =
          "rgb(" +
          Math.floor(inputTriangles[f].material.diffuse[0] * 255) +
          "," +
          Math.floor(inputTriangles[f].material.diffuse[1] * 255) +
          "," +
          Math.floor(inputTriangles[f].material.diffuse[2] * 255) +
          ")"; // diffuse color

        var path = new Path2D();
        path.moveTo(w * vertexPos1[0], h * vertexPos1[1]);
        path.lineTo(w * vertexPos2[0], h * vertexPos2[1]);
        path.lineTo(w * vertexPos3[0], h * vertexPos3[1]);
        path.closePath();
        context.fill(path);
      } // end for triangles
    } // end for files
  } // end if triangle files found
} // end draw input triangles

// put random points in the boxes from the class github
function drawRandPixelsInInputBoxes(context) {
  var inputBoxes = getInputBoxes();
  var w = context.canvas.width;
  var h = context.canvas.height;
  var imagedata = context.createImageData(w, h);
  const PIXEL_DENSITY = 0.1;
  var numCanvasPixels = w * h * PIXEL_DENSITY;

  if (inputBoxes != String.null) {
    var x = 0;
    var y = 0; // pixel coord init
    var lx = 0;
    var rx = 0; // input lx, rx from boxes.json
    var by = 0;
    var ty = 0; // input by, ty from boxes.json
    var fz = 0;
    var rz = 0; // input fz, rz from boxes.json
    var numBoxPixels = 0; // init num pixels in boxes
    var c = new Color(0, 0, 0, 0); // init the box color
    var n = inputBoxes.length; // the number of input boxes
    //console.log("number of ellipses: " + n);

    // Loop over the ellipsoids, draw rand pixels in each
    for (var b = 0; b < n; b++) {
      // input lx,rx,by,ty on canvas
      lx = w * inputBoxes[b].lx;
      rx = w * inputBoxes[b].rx;
      by = h * inputBoxes[b].by;
      ty = h * inputBoxes[b].ty;

      numBoxesPixels = (rx - lx) * (ty - by); // projected box area
      numBoxesPixels *= PIXEL_DENSITY; // percentage of box area to render to pixels
      numBoxesPixels = Math.round(numBoxesPixels);

      //console.log("num box pixels: "+numBoxesPixels);

      c.change(
        inputBoxes[b].diffuse[0] * 255,
        inputBoxes[b].diffuse[1] * 255,
        inputBoxes[b].diffuse[2] * 255,
        255
      ); // box diffuse color
      for (var p = 0; p < numBoxesPixels; p++) {
        do {
          x = Math.floor(Math.random() * w);
          y = Math.floor(Math.random() * h);
        } while (x < lx || x > rx || y > ty || y < by); // inside the projection
        drawPixel(imagedata, x, y, c);
        //console.log("color: ("+c.r+","+c.g+","+c.b+")");
        //console.log("x: " + x);
        //console.log("y: " + y);
      } // end for pixels in box
    } // end for boxes
    context.putImageData(imagedata, 0, 0);
  } // end if boxes found
} // end draw rand pixels in input boxes

//draw 2d projections boxes from the JSON file at class github
function drawInputBoxesUsingPaths(context) {
  var inputBoxes = getInputBoxes();
  var n = inputBoxes.length; // the number of input boxes

  if (inputBoxes != String.null) {
    var w = context.canvas.width;
    var h = context.canvas.height;
    var c = new Color(0, 0, 0, 0); // the color at the pixel: black
    var x = 0;
    var y = 0; // pixel coord init
    var lx = 0;
    var rx = 0; // input lx, rx from boxes.json
    var by = 0;
    var ty = 0; // input by, ty from boxes.json
    var fz = 0;
    var rz = 0; // input fz, rz from boxes.json
    //console.log("number of files: " + n);

    // Loop over the input files
    for (var b = 0; b < n; b++) {
      // input lx,rx,by,ty on canvas
      lx = w * inputBoxes[b].lx;
      rx = w * inputBoxes[b].rx;
      by = h * inputBoxes[b].by;
      ty = h * inputBoxes[b].ty;

      context.fillStyle =
        "rgb(" +
        Math.floor(inputBoxes[b].diffuse[0] * 255) +
        "," +
        Math.floor(inputBoxes[b].diffuse[1] * 255) +
        "," +
        Math.floor(inputBoxes[b].diffuse[2] * 255) +
        ")"; // diffuse color

      var path = new Path2D();
      path.moveTo(lx, ty);
      path.lineTo(lx, by);
      path.lineTo(rx, by);
      path.lineTo(rx, ty);
      path.closePath();
      context.fill(path);
    } // end for files
  } // end if box files found
} // end draw input boxes

/* main -- here is where execution begins after window load */

function main() {
  // Get the canvas and context
  var canvas = document.getElementById("viewport");
  var context = canvas.getContext("2d");

  // Create the image
  //drawRandPixels(context);
  // shows how to draw pixels

  //drawRandPixelsInInputEllipsoids(context);
  // shows how to draw pixels and read input file

  //drawInputEllipsoidsUsingArcs(context);
  // shows how to read input file, but not how to draw pixels

  // drawRandPixelsInInputTriangles(context);
  // shows how to draw pixels and read input file

  //performs rayCasting over the file
  rayCastingOriginal(context);
  // Adding the event listener for spacebar press
  document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
      rayCasting(context);
    }
  });
  // rayCasting(context);

  // rayCastingSpheres(context);

  // intersectTriangleTest(context);

  //drawInputTrainglesUsingPaths(context);
  // shows how to read input file, but not how to draw pixels

  //drawRandPixelsInInputBoxes(context);
  // shows how to draw pixels and read input file

  //drawInputBoxesUsingPaths(context);
  // shows how to read input file, but not how to draw pixels
}
