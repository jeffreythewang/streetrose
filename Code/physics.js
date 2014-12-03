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

// Event handler for keydown events
function handleKeydown(e) {
    switch(e.keyCode) {
        /* Car Direction Keys */
        case 87: // 'w' key for forward
            moveForward();
            break;
        case 65: // 'a' key for left
            x_t += 0.25;
            break;
        case 83: // 's' key for backwards
            moveBackward();
            break;
        case 68: // 'd' key for right
            x_t -= 0.25;
            break;

        /* Direction Keys */
        case 73: // 'i' key for forward
            z_t += 0.25;
            break;
        case 79: // 'o' key for backwards
            z_t -= 0.25;
            break;
    }
}
