var CONST_BUILDING_VERTICES = 36;

var UNIFORM_mvpMatrix;
var UNIFORM_lightPosition;
var UNIFORM_shininess;
var ATTRIBUTE_position;
var ATTRIBUTE_normal;

var positionBuffer;
var normalBuffer;
var uvBuffer;

var texture;

Building = function(x_t, y_t, z_t, length, scale_height) {
    this.x_t = x_t;
    this.y_t = y_t;
    this.z_t = z_t;
    this.theta = 0;
    this.length = length;
    this.height = scale_height;
    this.vertexBegin = points.length;
    this.vertices = [
        vec3(  this.length,   2*this.length, this.length ), //vertex 0
        vec3(  this.length,  0, this.length ), //vertex 1
        vec3( -this.length,   2*this.length, this.length ), //vertex 2
        vec3( -this.length,  0, this.length ),  //vertex 3
        vec3(  this.length,   2*this.length, -this.length ), //vertex 4
        vec3(  this.length,  0, -this.length ), //vertex 5
        vec3( -this.length,  2*this.length, -this.length ), //vertex 6
        vec3( -this.length,  0, -this.length )  //vertex 7
    ];

    for (var i = 0; i < this.vertices.length; i++) {
      this.vertices[i][1] = this.vertices[i][1] * this.height;
    }
    Cube(this.vertices, points, normals, uv, false);

    building_texture = gl.createTexture();
    building_texture.image = new Image();
    building_texture.image.onload = function(){
    gl.bindTexture(gl.TEXTURE_2D, building_texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, building_texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
    }

    building_texture.image.src = "../Images/building.jpg";
    this.initialized = false;
};

Building.prototype.render = function() {
    // TODO: render the building by appending it to the buffer

    // Multiply this rotation by the current velocity
    var mvMatrix = mult(viewMatrix, translate(vec3(NSMutableCar.physical_x, 0, NSMutableCar.physical_z)));
    mvMatrix = mult(mvMatrix, rotate(CAR_wheel_position, [0, 1, 0]));
    mvMatrix = mult(mvMatrix, translate(vec3(this.x_t, this.y_t, this.z_t)));
    mvMatrix = mult(mvMatrix, rotate(-CAR_wheel_position, [0, 1, 0]));
    mvMatrix = mult(mvMatrix, translate(vec3(-NSMutableCar.physical_x, 0, -NSMutableCar.physical_z)));

    mvMatrix = mult(mvMatrix, translate(vec3(0, 0, CAR_position)));
    mvMatrix = mult(mvMatrix, rotate(CAR_wheel_position, [0, 1, 0]));
    this.initialized = true;

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, building_texture);

    gl.uniformMatrix4fv(UNIFORM_mvMatrix, false, flatten(mvMatrix));
    gl.uniformMatrix4fv(UNIFORM_pMatrix, false, flatten(projectionMatrix));

    gl.uniform3fv(UNIFORM_lightPosition,  flatten(lightPosition));
    gl.uniform1f(UNIFORM_shininess,  shininess);
    gl.uniform1i(UNIFORM_sampler, 0);

    gl.drawArrays( gl.TRIANGLES, this.vertexBegin, 36);
};

/*
Building.prototype.forward = function () {
    this.z_t -= 0.05;
}

Building.prototype.backward = function () {
    this.z_t += 0.05;
}
Building.prototype.leftward = function () {
    this.x_t -= 0.05;
}

Building.prototype.rightward = function () {
    this.x_t += 0.05;
}

Building.prototype.maneuverLeft = function () {
    this.theta -= 1;
}

Building.prototype.maneuverRight = function () {
    this.theta += 1;
}
*/

//The real way to do it, but let's be debug friendly for now.
Building.prototype.forward = function () {
    //this.z_t -= 0.1;
    //this.x_t -= 0.05 * Math.sin(degreesToRadians(CAR_wheel_position));
    //this.z_t -= 0.05 * Math.cos(degreesToRadians(CAR_wheel_position));
    CAR_position -= 0.0001 * Math.cos(degreesToRadians(CAR_wheel_turn));

    CAR_wheel_position -= degreesToRadians(CAR_wheel_turn) * 0.01;
}

Building.prototype.backward = function () {
    //this.z_t += 0.1;
    //this.x_t += 0.05 * Math.sin(degreesToRadians(CAR_wheel_position));
    //this.z_t += 0.05 * Math.cos(degreesToRadians(CAR_wheel_position));
    CAR_position += 0.0001 * Math.cos(degreesToRadians(CAR_wheel_turn));

    CAR_wheel_position -= degreesToRadians(CAR_wheel_turn) * 0.01;
}
