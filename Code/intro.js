Intro = function()
{
  this.vertices = [
    vec3(2, 0, 2),
    vec3(2, -4, 2),
    vec3(-2, 0, 2),
    vec3(-2, -4, 2),
    vec3(2, 0, -2),
    vec3(2, -4, -2),
    vec3(-2, 0, -2),
    vec3(-2, -4, -2)
  ];

  this.vertexBegin = points.length;
  Cube(this.vertices, points, normals, uv, false);

  this.eye = vec3(0, 0, -0.6);
  this.at = vec3(0, 0.2, 0);
  this.up = vec3(0, 1, 0);

  intro_texture = gl.createTexture();
  intro_texture.image = new Image();
  intro_texture.image.onload = function(){
    gl.bindTexture(gl.TEXTURE_2D, intro_texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, intro_texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
  }

  intro_texture.image.src = "../Images/intro.jpg";
};

Intro.prototype.render = function() {
  var mvMatrix = lookAt(this.eye, this.at, this.up);
  mvMatrix = mult(mvMatrix, translate(vec3(0, intro_offset, 0)));

  //mvMatrix = viewMatrix;
  gl.uniformMatrix4fv(UNIFORM_mvMatrix, false, flatten(mvMatrix));
  gl.uniformMatrix4fv(UNIFORM_pMatrix, false, flatten(projectionMatrix));

  gl.uniform3fv(UNIFORM_lightPosition,  flatten(lightPosition));
  gl.uniform1f(UNIFORM_shininess,  shininess);
  gl.uniform1i(UNIFORM_sampler, 0);

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, intro_texture);


  gl.drawArrays( gl.TRIANGLES, this.vertexBegin, 6);

};
