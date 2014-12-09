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
    this.initial_x = x_t;
    this.initial_y = y_t;
    this.initial_z = z_t;
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
    this.x_t = this.initial_x - NSMutableCar.physical_x;
    this.z_t = this.initial_z - NSMutableCar.physical_z;

    // check for collisions
    if (Math.abs(this.x_t) < 0.55 && Math.abs(this.z_t) < 0.55) {
        if (this.checkCollision) {
            NSMutableCar.collide();
        }
    }

    // Multiply this rotation by the current velocity
    var mvMatrix = viewMatrix;
    mvMatrix = mult(mvMatrix, rotate(CAR_angle, [0, 1, 0]));
    mvMatrix = mult(mvMatrix, translate(vec3(-this.x_t, 0, this.z_t)));
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

Building.prototype.checkCollision = function() {
    var top_left = this.vertices[0] + this.length * Math.cos(NSMutableCar.physical_x);
    var top_right = this.vertices[0] - this.length * Math.cos(NSMutableCar.physical_x);
    for (var i = 0; i < this.vertices.length; i++) {
       if (Math.abs(this.vertices[0]) < 0.1) {
          var x_range = Math.cos(this.x_t - this.length) + Math.sin(this.z_t - this.length);;
          if (this.vertices[0] < x_range || this.vertices[0] > 0) {
            return true;
          } else if (NSMutableCar.physical_x > this.x_t && NSMutableCar.physical_x < this.x_t + this.length) {
            return true;
          }
        }
       if (Math.abs(this.vertices[0]) < 0.1) {
          var z_range = Math.cos(this.z_t - this.length) + Math.sin(this.x_t - this.length);;
          if (this.vertices[0] < z_range || this.vertices[0] > 0) {
            return true;
          } else if (NSMutableCar.physical_z > this.z_t && NSMutableCar.physical_z < this.z_t + this.length) {
            return true;
          }
        }
        // no need to check y coordinates
    }
    return true;
}
