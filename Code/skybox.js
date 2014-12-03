var length = 0.5;

var UNIFORM_mvpMatrix;
var UNIFORM_lightPosition;
var UNIFORM_shininess;
var ATTRIBUTE_position;
var ATTRIBUTE_normal;

var positionBuffer;
var normalBuffer;
var uvBuffer;

var texture;

Skybox = function() {
    this.vertexBegin = points.length;
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
	
	myTexture.image.src = "../Images/sky.jpg";
	
	myTexture1 = gl.createTexture();
    myTexture1.image = new Image();
    myTexture1.image.onload = function(){
    gl.bindTexture(gl.TEXTURE_2D, myTexture1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, myTexture1.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
    }
	
	myTexture1.image.src = "../Images/chrome.jpg";
};

function Cube(vertices, points, normals, uv, scale){
    Quad(vertices, points, normals, uv, 0, 1, 2, 3, vec3(0, 0, -1), scale);
    Quad(vertices, points, normals, uv, 4, 0, 6, 2, vec3(0, -1, 0), scale);
    Quad(vertices, points, normals, uv, 4, 5, 0, 1, vec3(-1, 0, 0), scale);
    Quad(vertices, points, normals, uv, 2, 3, 6, 7, vec3(-1, 0, -1), scale);
    Quad(vertices, points, normals, uv, 6, 7, 4, 5, vec3(0, -1, -1), scale);
    Quad(vertices, points, normals, uv, 1, 5, 3, 7, vec3(-1, -1, 0 ), scale);
}

function Quad( vertices, points, normals, uv, v1, v2, v3, v4, normal, scale){

    normals.push(normal);
    normals.push(normal);
    normals.push(normal);
    normals.push(normal);
    normals.push(normal);
    normals.push(normal);

    if (!scale) {
        uv.push(vec2(0,0));
        uv.push(vec2(1,0));
        uv.push(vec2(1,1));
        uv.push(vec2(0,0));
        uv.push(vec2(1,1));
        uv.push(vec2(0,1));
    } else {
        uv.push(vec2(0,0));
        uv.push(vec2(2,0));
        uv.push(vec2(2,2));
        uv.push(vec2(0,0));
        uv.push(vec2(2,2));
        uv.push(vec2(0,2));
    }

    points.push(vertices[v1]);
    points.push(vertices[v3]);
    points.push(vertices[v4]);
    points.push(vertices[v1]);
    points.push(vertices[v4]);
    points.push(vertices[v2]);
}

Skybox.prototype.render = function() {
	var mvMatrix = mult(viewMatrix, translate(vec3(0, 0, 0.0)));
	mvMatrix = mult(viewMatrix, scale(100, 100, 100));
	
    gl.activeTexture(gl.TEXTURE0);
	

    gl.uniformMatrix4fv(UNIFORM_mvMatrix, false, flatten(mvMatrix));
    gl.uniformMatrix4fv(UNIFORM_pMatrix, false, flatten(projectionMatrix));

    gl.uniform3fv(UNIFORM_lightPosition,  flatten(lightPosition));
    gl.uniform1f(UNIFORM_shininess,  shininess);
    gl.uniform1i(UNIFORM_sampler, 0);
	
	gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, myTexture);
    gl.drawArrays( gl.TRIANGLES, this.vertexBegin, 30);
	
	gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, myTexture1);
    gl.drawArrays( gl.TRIANGLES, this.vertexBegin + 30, 6);
};

