var CAR_wheel_degrees = 0;
var CAR_wheel_turning = false;

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
        moveForward();
    }

    if (pressed_keys[83]) {
        moveBackward();
    }

    // if 'a' or 'd' keys are not pressed
    // return wheels back to normal position
    if (!pressed_keys[65] && !pressed_keys[68]) {
        if (CAR_wheel_degrees > 0) {
            CAR_wheel_degrees -= 1;
        }

        if (CAR_wheel_degrees < 0) {
            CAR_wheel_degrees += 1;
        }
    }

    // if 'a' or 'd' keys are pressed
    // adjust wheels accordingly
    if (pressed_keys[65] && pressed_keys[87] || pressed_keys[68] && pressed_keys[83]) {
        CAR_wheel_degrees = CAR_wheel_degrees >= 60 ? 60 : CAR_wheel_degrees + 1;
    }

    if (pressed_keys[68] && pressed_keys[87] || pressed_keys[65] && pressed_keys[83]) {
        CAR_wheel_degrees = CAR_wheel_degrees <= -60 ? -60 : CAR_wheel_degrees - 1;
    }

    console.log(CAR_wheel_degrees);
}
