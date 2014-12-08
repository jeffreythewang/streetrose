// Put this somewhere useful
function isPointOnRoad(proposed_x, proposed_z) {
    x_floor = Math.floor(proposed_x);
    z_floor = Math.floor(proposed_z);
    if (master_grid[x_floor][z_floor] == 'r') {
        return true;
    } else {
        return false;
    }
}

var pressed_keys = [];

// Event handler for keydown events
function handleKeydown(e) {
    pressed_keys[e.keyCode] = true;
    switch(e.keyCode) {
        /* Car Direction Keys */
        case 87: // 'w' key for forward
            break;
        case 65: // 'a' key for left
            break;
        case 83: // 's' key for backwards
            break;
        case 68: // 'd' key for right
            break;
        case 82: // 'r' reset camera view
            NSMutableCar.physical_x = 1;
            NSMutableCar.physical_z = 1;
            CAR_angle = 0;
            eye_x = 0;
            eye_y = 0.2;
            eye_z = -0.4;
            eye = vec3(eye_x, eye_y, eye_z);
            viewMatrix = lookAt(eye, at, up);
            break;

        /* Direction Keys */
        case 73: // 'i' key for forward
            break;
        case 79: // 'o' key for backwards
            break;
    }
}

// Event handler for keyup events
function handleKeyup(e) {
    pressed_keys[e.keyCode] = false;
    switch(e.keyCode) {
        case 65: // 'a' key for left
            break;
        case 68: // 'd' key for right
            break;
    }
}

// Called in render function
function handleAllKeys() {
    NSMutableCar.physical_x += NSMutableCar.velocity * Math.sin(degreesToRadians(CAR_angle));
    NSMutableCar.physical_z += NSMutableCar.velocity * Math.cos(degreesToRadians(CAR_angle));

    if (!pressed_keys[87] && !pressed_keys[83]) {
        NSMutableCar.stall();
    }

    if (pressed_keys[87]) {
        NSMutableCar.accelerate();
    }

    if (pressed_keys[83]) {
        NSMutableCar.decelerate();
    }

    if (pressed_keys[65] || pressed_keys[68]) {
        CAR_isRotating = true;
        if (pressed_keys[65] && NSMutableCar.velocity > 0 || pressed_keys[68] && NSMutableCar.velocity < 0) {
            CAR_angle -= 0.5;
        }

        if (pressed_keys[68] && NSMutableCar.velocity > 0 || pressed_keys[65] && NSMutableCar.velocity < 0) {
            CAR_angle += 0.5;
        }
    } else {
        CAR_isRotating = false;
    }

    /* Begin Internal Tools */
    // 'g'
    if (pressed_keys[71]) {
      in_intro = false;
    }

    // 'i'
    if (pressed_keys[73]) {
        eye_y -= 0.1;
        eye = vec3(eye_x, eye_y, eye_z);
        viewMatrix = lookAt(eye, at, up);
    }

    // 'j'
    if (pressed_keys[74]) {
        eye_x -= 0.1;
        eye = vec3(eye_x, eye_y, eye_z);
        viewMatrix = lookAt(eye, at, up);
    }

    // 'k'
    if (pressed_keys[75]) {
        eye_x += 0.1;
        eye = vec3(eye_x, eye_y, eye_z);
        viewMatrix = lookAt(eye, at, up);
    }

    // 'm'
    if (pressed_keys[77]) {
        eye_y += 0.1;
        eye = vec3(eye_x, eye_y, eye_z);
        viewMatrix = lookAt(eye, at, up);
    }
    /* End Internal Tools */
}
