var CONST_CAR_VERTICES = 36;

Car = function(length, width, height) {
    this.velocity = 0;
    this.acceleration = 0;
    this.wheel_angle = 0;
    this.length = length;
    this.width = width;
    this.height = height;
    this.vertexBegin = vertices.length;
    this.vertices = [
        vec3(  length,   length, length ), //vertex 0
        vec3(  length,  -length, length ), //vertex 1
        vec3( -length,   length, length ), //vertex 2
        vec3( -length,  -length, length ),  //vertex 3
        vec3(  length,   length, -length ), //vertex 4
        vec3(  length,  -length, -length ), //vertex 5
        vec3( -length,   length, -length ), //vertex 6
        vec3( -length,  -length, -length )  //vertex 7
    ];

    Cube(vertices, points, normals, uv2, false);

    this.objectData = [this.vertexBegin, CONST_CAR_VERTICES];
    objectData.push(this.objectData);
};

Car.prototype.move = function() {
};

Car.prototype.left = function() {
};

Car.prototype.right = function() {
};
