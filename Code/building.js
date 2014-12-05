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

    Cube(this.vertices, points, normals, uv, false);

    myTexture = gl.createTexture();
    myTexture.image = new Image();
    myTexture.image.onload = function(){
    gl.bindTexture(gl.TEXTURE_2D, myTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, myTexture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
    }

    myTexture.image.src = "../Images/chrome.jpg";
};

Building.prototype.render = function() {
    // TODO: render the building by appending it to the buffer

    var mvMatrix = mult(viewMatrix, translate(vec3(this.x_t, this.y_t, this.z_t)));

    mvMatrix = mult(mvMatrix, scale(vec3(1, this.height, 1)));

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, myTexture);

    gl.uniformMatrix4fv(UNIFORM_mvMatrix, false, flatten(mvMatrix));
    gl.uniformMatrix4fv(UNIFORM_pMatrix, false, flatten(projectionMatrix));

    gl.uniform3fv(UNIFORM_lightPosition,  flatten(lightPosition));
    gl.uniform1f(UNIFORM_shininess,  shininess);
    gl.uniform1i(UNIFORM_sampler, 0);

    gl.drawArrays( gl.TRIANGLES, this.vertexBegin, 36);
};

Building.prototype.forward = function () {
    this.z_t -= 0.1;
}

Building.prototype.backward = function () {
    this.z_t += 0.1;
}
