function render() {
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    if (intro_offset >= 7) {
      in_intro = false;
    }

    if (NSMutableCar.physical_x >= 14 && NSMutableCar.physical_z >= 14) {
      in_sweetrose = true;
      document.getElementById('speed').innerHTML = '0 mph';
    }

    if (in_intro) {
      single_intro.render();
      intro_offset += 0.01;
    } else if (in_sweetrose) {
      single_sweetrose.render();
    } else {
      time += timer.getElapsedTime() / 200;

      skybox.render();

      document.getElementById('time').innerHTML = formatTime(900 - time);
      NSMutableCar.render();
      var normal_velocity = Math.abs(Math.floor(NSMutableCar.velocity * 2000));
      document.getElementById('speed').innerHTML = normal_velocity + ' mph';
      for (var i = 0; i < buildingActors.length; i++) {
          var currentBuilding = buildingActors[i];
          currentBuilding.render();
      }

      for (var i = 0; i < treeActors.length; i++) {
          var currentTree = treeActors[i];
          currentTree.render();
      }

    }

    handleAllKeys();
    window.requestAnimFrame( render );
}
