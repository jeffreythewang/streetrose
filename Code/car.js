var CONST_CAR_VERTICES = 36;

Car = function() {
    this.velocity = 0;
    this.acceleration = 0;
    this.wheel_angle = 0;
    this.length = 0.1;
    this.vertexBegin = points.length;
    this.chassis_vertices = [
        vec3(  this.length,   2*this.length, this.length ), //vertex 0
        vec3(  this.length,  0, this.length ), //vertex 1
        vec3( -this.length,   2*this.length, this.length ), //vertex 2
        vec3( -this.length,  0, this.length ),  //vertex 3
        vec3(  this.length,   2*this.length, -this.length ), //vertex 4
        vec3(  this.length,  0, -this.length ), //vertex 5
        vec3( -this.length,   2*this.length, -this.length ), //vertex 6
        vec3( -this.length,  0, -this.length )  //vertex 7
    ];

    Cube(this.chassis_vertices, points, normals, uv, false);

    car_texture = gl.createTexture();
    car_texture.image = new Image();
    car_texture.image.onload = function(){
      gl.bindTexture(gl.TEXTURE_2D, car_texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, car_texture.image);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.bindTexture(gl.TEXTURE_2D, null);
    }

    car_texture.image.src = "../Images/chrome.jpg";
};

Car.prototype.render = function() {
    var mvMatrix = viewMatrix;
    mvMatrix = mult(mvMatrix, scale(vec3(1.5, 1, 1)));

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, car_texture);

    gl.uniformMatrix4fv(UNIFORM_mvMatrix, false, flatten(mvMatrix));
    gl.uniformMatrix4fv(UNIFORM_pMatrix, false, flatten(projectionMatrix));

    gl.uniform3fv(UNIFORM_lightPosition,  flatten(lightPosition));
    gl.uniform1f(UNIFORM_shininess,  shininess);
    gl.uniform1i(UNIFORM_sampler, 0);

    gl.drawArrays( gl.TRIANGLES, this.vertexBegin, CONST_CAR_VERTICES);
};

Car.prototype.move = function() {
};

Car.prototype.left = function() {
};

Car.prototype.right = function() {
};
