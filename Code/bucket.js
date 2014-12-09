var CONST_BUCKET_SLICES = 100;
var CONST_BUCKET_RADIUS = 1;
var CONST_BUCKET_LENGTH = 2;

Bucket = function() {
  this.vertexBegin = points.length;
  this.slices = CONST_BUCKET_SLICES;

  this.radius = CONST_BUCKET_RADIUS;
  this.half = CONST_BUCKET_LENGTH / 2;

  this.num_vertices = 0;

  for (var i = 0; i < this.slices; i++) {
    var theta = i * (2*Math.PI/this.slices);
    var nextTheta = (i + 1) * (2*Math.PI/this.slices);
    points.push(vec3(0.0, this.half, 0.0));

    points.push(vec3(
      this.radius * Math.cos(theta),
      this.half,
      this.radius * Math.sin(theta)
    ));

    points.push(vec3(
      this.radius * Math.cos(nextTheta),
      this.half,
      this.radius * Math.sin(nextTheta)
    ));

    points.push(vec3(
      this.radius * Math.cos(nextTheta),
      -this.half,
      this.radius * Math.sin(nextTheta)
    ));

    points.push(vec3(
      this.radius * Math.cos(theta),
      -this.half,
      this.radius * Math.sin(theta)
    ));

    points.push(vec3(0.0, -this.half, 0.0));

    normals.push(vec3(0, 1, 0));
    normals.push(vec3(0, 1, 0));
    normals.push(vec3(Math.cos(theta), 0, Math.sin(theta)));
    normals.push(vec3(Math.cos(theta), 0, Math.sin(theta)));
    normals.push(vec3(0, -1, 0));
    normals.push(vec3(0, -1, 0));

    uv.push(vec2(0,0));
    uv.push(vec2(1,0));
    uv.push(vec2(1,1));
    uv.push(vec2(0,0));
    uv.push(vec2(1,1));
    uv.push(vec2(0,1));

    this.num_vertices += 6;
  }

}

Bucket.prototype.render = function() {
  var mvMatrix = mult(viewMatrix, translate(0, 0, 2));

  gl.uniformMatrix4fv(UNIFORM_mvMatrix, false, flatten(mvMatrix));
  gl.uniformMatrix4fv(UNIFORM_pMatrix, false, flatten(projectionMatrix));

  gl.uniform3fv(UNIFORM_lightPosition,  flatten(vec3(0, 5, 0)));
  gl.uniform1f(UNIFORM_shininess,  100);
  gl.uniform1i(UNIFORM_sampler, 0);
  gl.drawArrays(gl.TRIANGLE_STRIP, this.vertexBegin, this.num_vertices);

}
