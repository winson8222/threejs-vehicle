## Deployment

Required:
- Node.js

Deployment tool:
- Vercel

Step to deploy:
- Install Vercel on machine (npm install -g vercel)
- Create a vercel accoutn
- Install all dependencies of the application (npm install)
- Build production version of application (npm run build)

- run Vercel in command line (vercel)
- Login in to vercel account
- Project directory is set under ./underwater-vehicle if you are not already inside
- Use default project setting (Create React App)
- Use the URL created to access the application

- Test deployment at (https://test-deployment-3bc5xaunl-winson8222s-projects.vercel.app)

## Use Descriptions

- Pedal Icon to toggle stop/move of vehicle
- Joystick to control the rotation of vehicle
- Camera Icon to toggle FreeCam Movement around the vehicle/ Following the Vehicle in its direction
- Fire icon to shoot fireball

- Toggle ReplayMode to read from test .bag file (Pending test file)
- Scroll progress bar to see the location of the vehicle at different point of history
- Free Camera movement in Replay mode

## AI used
Making the front and back of vehicles different colors
Calculate camera initial position in 
Set CSS properties to prevent img from being selected on touch screen mode

## Reference Used
- Third Person Camera
https://github.com/simondevyoutube/ThreeJS_Tutorial_ThirdPersonCamera/blob/main/main.js