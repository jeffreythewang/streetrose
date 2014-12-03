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

var points = [];
var normals = [];
var uv = [];

var eye = vec3(0, 0.2, 1.5);
var at = vec3(0, 0, 0);
var up = vec3(0, 1, 0);

// stores objects of all the data
// [ [objectA vertexBegin, objectA numVertices],
//   [objectB vertexBegin, objectB numVertices],
//   [objectC vertexBegin, objectC numVertices] ];
var objectData = [];
var buildingActors = [];
var treeActors = [];

function Cube(vertices, points, normals, uv, scale){
    Quad(vertices, points, normals, uv, 0, 1, 2, 3, vec3(0, 0, 1), scale);
    Quad(vertices, points, normals, uv, 4, 0, 6, 2, vec3(0, 1, 0), scale);
    Quad(vertices, points, normals, uv, 4, 5, 0, 1, vec3(1, 0, 0), scale);
    Quad(vertices, points, normals, uv, 2, 3, 6, 7, vec3(1, 0, 1), scale);
    Quad(vertices, points, normals, uv, 6, 7, 4, 5, vec3(0, 1, 1), scale);
    Quad(vertices, points, normals, uv, 1, 5, 3, 7, vec3(1, 1, 0 ), scale);
}

function Quad( vertices, points, normals, uv, v1, v2, v3, v4, normal, scale){

    normals.push(normal);
    normals.push(normal);
    normals.push(normal);
    normals.push(normal);
    normals.push(normal);
    normals.push(normal);

    if (!scale) {
        uv.push(vec2(0,0));
        uv.push(vec2(1,0));
        uv.push(vec2(1,1));
        uv.push(vec2(0,0));
        uv.push(vec2(1,1));
        uv.push(vec2(0,1));
    } else {
        uv.push(vec2(0,0));
        uv.push(vec2(2,0));
        uv.push(vec2(2,2));
        uv.push(vec2(0,0));
        uv.push(vec2(2,2));
        uv.push(vec2(0,2));
    }

    points.push(vertices[v1]);
    points.push(vertices[v3]);
    points.push(vertices[v4]);
    points.push(vertices[v1]);
    points.push(vertices[v4]);
    points.push(vertices[v2]);
}
