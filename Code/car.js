var CONST_CAR_VERTICES = 36;
var CONST_ACCEL_VALUE = 0.0001;
var CONST_STALL_VALUE = 0.0005;
var CONST_MAX_SPEED = 0.5;
var CONST_BRAKE_MULTIPLIER = 1.5;

Car = function() {
    this.physical_x = 1;
    this.physical_z = 1;
    this.velocity = 0;
    this.acceleration = 0;

    this.wheel_angle = 90;
    this.length = 0.05;
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
    mvMatrix = mult(mvMatrix, scale(vec3(1.3, 1, 1)));
    mvMatrix = mult(mvMatrix, rotate(this.wheel_angle, vec3(0, 1, 0)));

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, car_texture);

    gl.uniformMatrix4fv(UNIFORM_mvMatrix, false, flatten(mvMatrix));
    gl.uniformMatrix4fv(UNIFORM_pMatrix, false, flatten(projectionMatrix));

    gl.uniform3fv(UNIFORM_lightPosition,  flatten(lightPosition));
    gl.uniform1f(UNIFORM_shininess,  shininess);
    gl.uniform1i(UNIFORM_sampler, 0);

    gl.drawArrays( gl.TRIANGLES, this.vertexBegin, CONST_CAR_VERTICES);

    mvMatrix = viewMatrix;
    mvMatrix = mult(mvMatrix, scale(vec3(1, 0.7, 0.5)));
    mvMatrix = mult(mvMatrix, rotate(this.wheel_angle, vec3(0, 1, 0)));
    mvMatrix = mult(mvMatrix, translate(vec3(-(1.3*this.length+2*this.length), 0, 0)));

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, car_texture);

    gl.uniformMatrix4fv(UNIFORM_mvMatrix, false, flatten(mvMatrix));
    gl.uniformMatrix4fv(UNIFORM_pMatrix, false, flatten(projectionMatrix));

    gl.uniform3fv(UNIFORM_lightPosition,  flatten(lightPosition));
    gl.uniform1f(UNIFORM_shininess,  shininess);
    gl.uniform1i(UNIFORM_sampler, 0);

    gl.drawArrays( gl.TRIANGLES, this.vertexBegin, CONST_CAR_VERTICES);


    mvMatrix = viewMatrix;
    mvMatrix = mult(mvMatrix, scale(vec3(1, 0.7, 0.5)));
    mvMatrix = mult(mvMatrix, rotate(this.wheel_angle, vec3(0, 1, 0)));
    mvMatrix = mult(mvMatrix, translate(vec3(1.3*this.length+2*this.length, 0, 0)));

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, car_texture);

    gl.uniformMatrix4fv(UNIFORM_mvMatrix, false, flatten(mvMatrix));
    gl.uniformMatrix4fv(UNIFORM_pMatrix, false, flatten(projectionMatrix));

    gl.uniform3fv(UNIFORM_lightPosition,  flatten(lightPosition));
    gl.uniform1f(UNIFORM_shininess,  shininess);
    gl.uniform1i(UNIFORM_sampler, 0);

    gl.drawArrays( gl.TRIANGLES, this.vertexBegin, CONST_CAR_VERTICES);

};

Car.prototype.accelerate = function(){
    if (this.velocity + CONST_ACCEL_VALUE >= this.maxSpeed) {
        this.velocity = this.maxSpeed;
    }
    else if (this.velocity < 0) {
        this.velocity += (CONST_ACCEL_VALUE*CONST_BRAKE_MULTIPLIER);
    } else {
        this.velocity += CONST_ACCEL_VALUE;
    }
}

//stall when car is neither accelerating nor decelerating
Car.prototype.stall = function(){
    if (this.velocity >= 0) {
        if(this.velocity - CONST_STALL_VALUE <= 0) {
            this.velocity = 0;
        } else {
            this.velocity -= CONST_STALL_VALUE;
        }
    } else {
        if(this.velocity + CONST_STALL_VALUE >= 0) {
            this.velocity = 0;
        } else {
            this.velocity += CONST_STALL_VALUE;
        }
    }
}

//brake when decelerate is being pressed
//go backwards if velocity is negative
Car.prototype.decelerate = function(){
    if(this.velocity - CONST_ACCEL_VALUE <= -this.maxSpeed) {
        this.velocity = -this.maxSpeed;
    }
    else if (this.velocity > 0) {
        this.velocity -= (CONST_ACCEL_VALUE*CONST_BRAKE_MULTIPLIER);
    } else {
        this.velocity -= CONST_ACCEL_VALUE;
    }
}

Car.prototype.collide = function() {
    this.velocity = -this.velocity;

    if (this.velocity >= 0) {
        this.velocity += 0.00001;
    } else {
        this.velocity -= 0.00001;
    }
}
