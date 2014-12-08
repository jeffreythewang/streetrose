function render() {
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    if (intro_offset >= 7) {
      in_intro = false;
    }

    if (in_intro) {
      single_intro.render();
      intro_offset += 0.0025;
    } else {
      time += timer.getElapsedTime() / 1000;

      skybox.render();

      NSMutableCar.render();
      for (var i = 0; i < buildingActors.length; i++) {
          var currentBuilding = buildingActors[i];
          currentBuilding.render();
      }

      for (var i = 0; i < treeActors.length; i++) {
          var currentTree = treeActors[i];
          currentTree.render();
      }

      handleAllKeys();
    }

    window.requestAnimFrame( render );
}
