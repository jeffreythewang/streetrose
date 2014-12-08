// Work in progress
IceCream.prototype.InitializePickingBuffers = function () {
    // This procress is similar to renderring to a buffer. The only difference is that it will be externally read on demand.
    this.fb = this.gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.fb);
    rttTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, rttTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.viewportWidth, this.viewportHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    var renderbuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.viewportWidth, this.viewportHeight);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, rttTexture, 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer);
}

    this.lastCapturedColourMap = new Uint8Array(this.viewportWidth * this.viewportHeight * 4);
    this.fb = this.gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.fb);
    iceCreamTexture = gl.createTexture();
    iceCreamTexture.image = new Image();
    iceCreamTexture.image.onload = function(){
		gl.bindTexture(gl.TEXTURE_2D, iceCreamTexture);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, iceCreamTexture.image);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.generateMipmap(gl.TEXTURE_2D);
		gl.bindTexture(gl.TEXTURE_2D, null);
    }

	iceCreamTexture.image.src = "../Tiles/road.jpg";

IceCream.prototype.StartRenderLoop = function () {
    // Render scene to screen
    this.renderColourMap = false;
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
    this.Draw();
    // Render picking colour map buffer off-screen
    if (this.grabColourMapFrame) {
        this.renderColourMap = true;
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fb);
        this.Draw();
        this.gl.readPixels(0, 0, this.viewportWidth, this.viewportHeight, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.lastCapturedColourMap);
        if (this.mouseState.mouseClickPosition) {
            var colour = this.GetColourMapColour(this.mouseState.mouseClickPosition[0], this.mouseState.mouseClickPosition[1]);
            var vertexBufferIndex = colour[0] * 65536 + colour[1] * 256 + colour[2];
            if (this.pickingList && this.pickingList[vertexBufferIndex]) {
            this.VertexBufferMouseEvent(this.mouseState, this.pickingList[vertexBufferIndex]);
            }
        }
        this.grabColourMapFrame = false;
    }
}
