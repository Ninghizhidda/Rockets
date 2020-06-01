# Rockets
Rockets game 

https://ninghizhidda.github.io/Rockets/


Recreate all rockets from the SpaceX API and visualize them on the page. At first, all rockets should be at the bottom of the stage and should launch at the same time and should move towards the top of the stage. All rockets have a certain amount of fuel (first_stage, second_stage).

Requirements:
- Data from SpaceX API (See "Resources" below) must be obtained dynamically (not hardcoded)
- 1 tone of fuel per second is consumed by each rocket
- When all the fuel is depleted the rocket disappears
- When all rockets have depleted their fuel a "Success" text message shows on the page
- Code structure is Object Oriented
- The project uses the provided project assets

Bonus points:
- Code uses ES6 features
- Implement rocket stages. When the fuel in first_stage is wasted the rocket should lose it's bottom half and continue on the second_stage fuel supply
- The rocket should have exhaust flames shooting from the bottom while it moves
- Rocket exhaust flames should be "pulsating" (mimicing real flames)
- Implements the usage of promises
- Implements the usage of events
- Implements the usage of async/await
- App uses a library like EaselJS or PIXI.js or uses the Canvas API
- Implement a "REPLAY" button at the success screen
- Rockets visualize the ammount of fuel left
- Rockets fade out when their fuel is depleted

Resources: 
- SpaceX API: https://api.spacexdata.com/v2/rockets
- Assets available in the assets folder in the archive
