var canvas;
var gl;

var UNIFORM_mvpMatrix;
var UNIFORM_lightPosition;
var UNIFORM_shininess;
var ATTRIBUTE_position;
var ATTRIBUTE_normal;

var positionBuffer;
var normalBuffer;

var viewMatrix;
var projectionMatrix;
var mvpMatrix;
var rotateTexture;

var vertices = [];
var points = [];
var normals = [];

var eye = vec3(0, 0.2, 1.5);
var at = vec3(0, 0, 0);
var up = vec3(0, 1, 0);

// stores objects of all the data
// object name
var objectData = []
