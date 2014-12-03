function render() {
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    time += timer.getElapsedTime() / 1000;

    drawBackground();
    displayCar();

    for (var i = 0; i < buildingActors.length; i++) {
        var currentBuilding = objectData[i];
        currentBuilding.render();
    }

    for (var i = 0; i < treeActors.length; i++) {
        var currentTree = objectData[i];
        currentTree.render();
    }

    window.requestAnimFrame( render );
}

