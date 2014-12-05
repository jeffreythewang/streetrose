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

var pressed_keys = [];

// Event handler for keydown events
function handleKeydown(e) {
    pressed_keys[e.keyCode] = true;
    switch(e.keyCode) {
        /* Car Direction Keys */
        case 87: // 'w' key for forward
            moveForward();
            break;
        case 65: // 'a' key for left
            break;
        case 83: // 's' key for backwards
            moveBackward();
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
