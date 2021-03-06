Jeffrey Wang    UID: 104148158
James Wu        UID: 204135990
Emily Hwang     UID: 504158819
Soomin Jeong    UID: 304116854
Jonathan Chu    UID: 804141479

## STREET ROSE: THE GAME ##

This is a final term project for CS174A for Fall Quarter, 2014 with Professor Friedman.

HOW TO RUN THE GAME:
1. Run a local server in the root directory (the one that contains this file, the README):
`python -m SimpleHTTPServer 1337`

2. Point the browser to `localhost:1337`.

3. Navigate through the files to open `Code/game.html`

4. Enjoy the game :^)

TO PLAY:
Accelerate or decelerate with W and S. Turn left or right with A or D. Click an ice cream flavor to win!

Overview

Our game is a racing simulation game based on real life events with one main objective: get to Sweet Rose Creamery, the premier ice cream shop of the WebGL world, before it closes. Our product features fifteen minutes of fast-paced racing action. The only enemy is time itself, that is, the player is racing against the clock.

The path to Sweet Rose Creamery is not an easy one. There are several obstacles along the way that slow down the player’s car, making it harder to reach the goal on time. It is the player’s job to dodge as many of these obstacles as possible.

The game is scored based on how close the player arrives to Sweet Rose Creamery to the closing time. The closer the arrival, the higher the score. However, if the player reaches Sweet Rose after it closes, he or she loses. This scoring model is meant to reflect the suspense and rush involved with arriving at an ice cream parlor that is about to close.

Upon completion of the main mission, a side quest follows - now that the player has won, another question presents itself: aim for the double scoop or settle for a single? And will one of those scoops be the mint? The player’s preference in ice cream does not affect his or her score.

Advanced Topics

The original specification said that we would implement 4 topics: Picking, Collision Detection, Shadows, and Parallel Rendering. However, after implementing a good portion of the game, we realized that some of these topics were not suited for our game. Picking and collision detection are still viable choices, as they are integral parts of our game.

However, we chose not to do shadows or parallel rendering.  After talking with the TA, we realized that our project was not computationally intensive enough to warrant parallel rendering.

In addition, without ray tracing, shadows would not have made sense. To offset this, we decided to implement another advanced topics: physics (friction/acceleration/deceleration).

Thus, the three advanced topics that we implemented are as follows:
Collision Detection (car collisions with buildings)
Picking (choosing ice cream flavors)
Physics (friction/acceleration/deceleration)


Distribution of workload:

Jeffrey Wang - implemented car physics and collision detection for the car
             - implemented picking at the end of the racing simulating

James Wu - implemented several textures, including car, buildings, final ice cream shop
         - styled the html page with css

Emily Hwang - created skybox including textures for the faces

Soomin Jeong - created map of the world for the car to drive including textures

Jonathan Chu - developed intelligent coordinate systems to take into account physical and graphical positions
