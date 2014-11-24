Building = function(x_t, y_t, z_t, length, width, height, mvMatrix) {
    this.x_t = x_t;
    this.y_t = y_t;
    this.z_t = z_t;
    this.length = length;
    this.width = width;
    this.height = height;
};

Building.prototype.render(vertices, startIndex) {
    // TODO: render the building by appending it to the buffer
    //gl.drawArrays( gl.TRIANGLES, startIndex, 36);
};
