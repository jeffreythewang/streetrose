function render() {
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

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

    // if 'a' or 'd' keys are not pressed
    // return wheels back to normal position
    if (!pressed_keys[65] && !pressed_keys[68]) {
        if (CAR_wheel_degrees > 0) {
            CAR_wheel_degrees -=1;
        }

        if (CAR_wheel_degrees < 0) {
            CAR_wheel_degrees += 1;
        }
    }

    // if 'a' or 'd' keys are pressed
    // adjust wheels accordingly
    if (pressed_keys[65] && pressed_keys[87] || pressed_keys[68] && pressed_keys[83]) {
        CAR_wheel_degrees = CAR_wheel_degrees >= 45 ? 45 : CAR_wheel_degrees + 1;
    }

    if (pressed_keys[68] && pressed_keys[87] || pressed_keys[65] && pressed_keys[83]) {
        CAR_wheel_degrees = CAR_wheel_degrees <= -45 ? -45 : CAR_wheel_degrees - 1;
    }

    console.log(CAR_wheel_degrees);

    window.requestAnimFrame( render );
}

