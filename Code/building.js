var CONST_BUILDING_VERTICES = 8;
Building = function(x_t, y_t, z_t, length, width, height) {
    this.x_t = x_t;
    this.y_t = y_t;
    this.z_t = z_t;
    this.length = length;
    this.width = width;
    this.height = height;
    this.vertexBegin = vertices.length();
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

    this.objectData = [this.vertexBegin, CONST_BUILDING_VERTICES];
    objectData.push(this.objectData);
};

Building.prototype.render = function(vertices, startIndex) {
    // TODO: render the building by appending it to the buffer
    //gl.drawArrays( gl.TRIANGLES, startIndex, 36);
};
