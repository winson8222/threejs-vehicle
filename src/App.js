import logo from './logo.svg';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Joystick from './components/Joystick';
import ControlButton from './components/ControlButton';
import ToggleButton from './components/ToggleButton';
import React, { useRef, useState } from 'react';
import Scene from './Scene';
import './App.css';


function App() {
  const [command, setCommand] = useState(null);
  const [cameraCommand, setCameraCommand] = useState(null);
  const [isCameraFollowing, setIsCameraFollowing] = useState(true);
  const [isVehicleMoving, setIsVehicleMoving] = useState(false);


  // const handleCameraCommand = (cmd) => setCameraCommand(cmd);
  // const handleCameraMouseUp = () => setCameraCommand(null); // stop rotating when the button is released

  const handleCameraToggle = () => setIsCameraFollowing(!isCameraFollowing);
  const handleMovementToggle = () => setIsVehicleMoving(!isVehicleMoving);

  return (
    <div className="App" style={{ height: '100vh', position: 'relative' }}>

      <Joystick commandHandler={setCommand}/>
      <div className="buttons-container">
      <ControlButton commandHandler={setCommand} command ={'fire'} img='/burn.png' text={"Fire"}/>
        <div className='toggle-buttons-container'>
          <ToggleButton commandHandler={handleMovementToggle} img='/accelerator.png' text={["Stopped", "Moving"]}/>
          <ToggleButton commandHandler={handleCameraToggle} img='/camera.png' text={["Camera Following", "Free Camera"]}/>
        </div>
      </div>
      <Canvas>
        <Scene command={command} cameraCommand={cameraCommand} isCameraFollowing={isCameraFollowing} isVehicleMoving={isVehicleMoving}/>
      </Canvas>

    </div>
  );
}

export default App;
