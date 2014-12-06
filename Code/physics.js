function moveForward() {
    for (var i = 0; i < buildingActors.length; i++) {
        var currentBuilding = buildingActors[i];
        currentBuilding.forward();
    }

    for (var i = 0; i < treeActors.length; i++) {
        var currentTree = treeActors[i];
        currentTree.forward();
    }
}

function moveBackward() {
    for (var i = 0; i < buildingActors.length; i++) {
        var currentBuilding = buildingActors[i];
        currentBuilding.backward();
    }

    for (var i = 0; i < treeActors.length; i++) {
        var currentTree = treeActors[i];
        currentTree.backward();
    }
}

/* Begin debugging code
// Left and Right make debugging easier
function moveLeftward() {
    for (var i = 0; i < buildingActors.length; i++) {
        var currentBuilding = buildingActors[i];
        currentBuilding.leftward();
    }

    for (var i = 0; i < treeActors.length; i++) {
        var currentTree = treeActors[i];
        currentTree.leftward();
    }
}

function moveRightward() {
    for (var i = 0; i < buildingActors.length; i++) {
        var currentBuilding = buildingActors[i];
        currentBuilding.rightward();
    }

    for (var i = 0; i < treeActors.length; i++) {
        var currentTree = treeActors[i];
        currentTree.rightward();
    }
}

function maneuverLeft() {
    for (var i = 0; i < buildingActors.length; i++) {
        var currentBuilding = buildingActors[i];
        currentBuilding.maneuverLeft();
    }

    for (var i = 0; i < treeActors.length; i++) {
        var currentTree = treeActors[i];
        currentTree.maneuverLeft();
    }
}

function maneuverRight() {
    for (var i = 0; i < buildingActors.length; i++) {
        var currentBuilding = buildingActors[i];
        currentBuilding.maneuverRight();
    }

    for (var i = 0; i < treeActors.length; i++) {
        var currentTree = treeActors[i];
        currentTree.maneuverRight();
    }
}
*/

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
            eye_x = 0;
            eye_y = 0.4;
            eye_z = -0.6;
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
    if (pressed_keys[87]) {
        NSMutableCar.physical_x = CAR_position * Math.sin(degreesToRadians(CAR_wheel_position));
        NSMutableCar.physical_z = CAR_position * Math.cos(degreesToRadians(CAR_wheel_position));
        moveForward();
        //console.log('Car x: ' + NSMutableCar.physical_x);
        //console.log('Car z: ' + NSMutableCar.physical_z);
    }

    if (pressed_keys[83]) {
        NSMutableCar.physical_x = CAR_position * Math.sin(degreesToRadians(CAR_wheel_position));
        NSMutableCar.physical_z = CAR_position * Math.cos(degreesToRadians(CAR_wheel_position));
        moveBackward();
    }

    /* Debug code
    if (pressed_keys[65]) {
        moveLeftward();
    }

    if (pressed_keys[68]) {
        moveRightward();
    }

    // 'q'
    if (pressed_keys[81]) {
        maneuverLeft();
    }

    // 'e'
    if (pressed_keys[69]) {
        maneuverRight();
    }
    */

    // if 'a' or 'd' keys are not pressed
    // return wheels back to normal position
    if (!pressed_keys[65] && !pressed_keys[68]) {
        if (Math.abs(CAR_wheel_turn) < 3) {
            CAR_wheel_turn = 0
        }

        if (CAR_wheel_turn > 0) {
            CAR_wheel_turn -= 3;
        }

        if (CAR_wheel_turn < 0) {
            CAR_wheel_turn += 3;
        }

        CAR_wheel_turn = 0;
    }

    // if 'a' or 'd' keys are pressed
    // adjust wheels accordingly
    if (pressed_keys[65] && pressed_keys[87] || pressed_keys[68] && pressed_keys[83]) {
        CAR_wheel_turn = CAR_wheel_turn >= 45 ? 45 : CAR_wheel_turn + 1;
    }

    if (pressed_keys[68] && pressed_keys[87] || pressed_keys[65] && pressed_keys[83]) {
        CAR_wheel_turn = CAR_wheel_turn <= -45 ? -45 : CAR_wheel_turn - 1;
    }

    //console.log(CAR_wheel_turn);


    /* Begin Internal Tools */
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
