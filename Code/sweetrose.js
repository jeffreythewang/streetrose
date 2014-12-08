var length = 1.0;

var UNIFORM_mvpMatrix;
var UNIFORM_lightPosition;
var UNIFORM_shininess;
var ATTRIBUTE_position;
var ATTRIBUTE_normal;

var positionBuffer;
var normalBuffer;
var uvBuffer;

//var texture;

SweetRose = function() {
    this.vertexBegin = points.length;

    this.eye = vec3(0, 4, -0.2);
    this.at = vec3(0, 3.9, 0);
    this.up = vec3(0, 1, 0);

    this.vertices = [
        vec3(  length,   2*length, length ), //vertex 0
        vec3(  length,  0, length ), //vertex 1
        vec3( -length,   2*length, length ), //vertex 2
        vec3( -length,  0, length ),  //vertex 3
        vec3(  length,   2*length, -length ), //vertex 4
        vec3(  length,  0, -length ), //vertex 5
        vec3( -length,   2*length, -length ), //vertex 6
        vec3( -length,  0, -length )  //vertex 7
    ];

    Cube(this.vertices, points, normals, uv, false);

    sr_texture = gl.createTexture();
    sr_texture.image = new Image();
    sr_texture.image.onload = function(){
		gl.bindTexture(gl.TEXTURE_2D, sr_texture);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, sr_texture.image);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.generateMipmap(gl.TEXTURE_2D);
		gl.bindTexture(gl.TEXTURE_2D, null);
    }

	sr_texture.image.src = "../Images/sr_bg_texture.jpg";

  sr_texture1 = gl.createTexture();
    sr_texture1.image = new Image();
    sr_texture1.image.onload = function(){
		gl.bindTexture(gl.TEXTURE_2D, sr_texture1);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, sr_texture1.image);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.generateMipmap(gl.TEXTURE_2D);
		gl.bindTexture(gl.TEXTURE_2D, null);
    }

	sr_texture1.image.src = "../Images/sr_floor_texture.jpg";

  sr_texture2 = gl.createTexture();
    sr_texture2.image = new Image();
    sr_texture2.image.onload = function(){
		gl.bindTexture(gl.TEXTURE_2D, sr_texture2);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, sr_texture2.image);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.generateMipmap(gl.TEXTURE_2D);
		gl.bindTexture(gl.TEXTURE_2D, null);
    }

	sr_texture2.image.src = "../Images/metal.jpg";
};

SweetRose.prototype.render = function() {
  var mvMatrix = lookAt(this.eye, this.at, this.up);
  mvMatrix = mult(mvMatrix, translate(0, 0, 1.2));
  mvMatrix = mult(mvMatrix, scale(vec3(3, 3, 1.5)));

	gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, sr_texture2);

  gl.uniformMatrix4fv(UNIFORM_mvMatrix, false, flatten(mvMatrix));
  gl.uniformMatrix4fv(UNIFORM_pMatrix, false, flatten(projectionMatrix));

  gl.uniform3fv(UNIFORM_lightPosition,  flatten(vec3(0, 5, 0)));
  gl.uniform1f(UNIFORM_shininess,  100);
  gl.uniform1i(UNIFORM_sampler, 0);
  gl.drawArrays(gl.TRIANGLES, this.vertexBegin, 36);

  mvMatrix = lookAt(this.eye, this.at, this.up);
	mvMatrix = mult(mvMatrix, scale(15, 15, 15));

    gl.uniformMatrix4fv(UNIFORM_mvMatrix, false, flatten(mvMatrix));
    gl.uniformMatrix4fv(UNIFORM_pMatrix, false, flatten(projectionMatrix));

    gl.uniform3fv(UNIFORM_lightPosition,  flatten(lightPosition));
    gl.uniform1f(UNIFORM_shininess,  shininess);
    gl.uniform1i(UNIFORM_sampler, 0);

	gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, sr_texture);
    gl.drawArrays( gl.TRIANGLES, this.vertexBegin, 30);

	gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, sr_texture1);
    gl.drawArrays( gl.TRIANGLES, this.vertexBegin + 30, 6);
};

