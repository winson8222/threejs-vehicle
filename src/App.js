import logo from './logo.svg';
import { Progress } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Joystick from './components/Joystick';
import ControlButton from './components/ControlButton';
import ToggleButton from './components/ToggleButton';
import React, { useRef, useState } from 'react';
import ProgressBar from './components/ProgressBar';
import Scene from './Scene';
import ReplayScene from './ReplayScene';
import './App.css';


function App() {
  const [command, setCommand] = useState(null);
  const [cameraCommand, setCameraCommand] = useState(null);
  const [isCameraFollowing, setIsCameraFollowing] = useState(true);
  const [isVehicleMoving, setIsVehicleMoving] = useState(false);
  const [isReplayMode, setReplayMode] = useState(false);
  const [currentIndex, setcurrentIndex] = useState(0)


  const history = [
    { position: { x: 0, y: 0, z: 0 } },
    { position: { x: 1, y: 0, z: 0 } },
    { position: { x: 2, y: 0, z: 0 } },
  ];

  const handleCameraToggle = () => setIsCameraFollowing(!isCameraFollowing);
  const handleMovementToggle = () => setIsVehicleMoving(!isVehicleMoving);
  const handleReplayToggle = () => setReplayMode(!isReplayMode)
  

  const changeIndex = (index) => setcurrentIndex(index)

  return (
    <div className="App" style={{ height: '100vh', position: 'relative', justifyContent: "center" }}>
    <button onClick={handleReplayToggle}>Toggle Replay Mode</button>
      {isReplayMode ? (
        <>
        <ProgressBar history={history} progressHandler={changeIndex} />
          <Canvas>
            <ReplayScene
            history={history}
            index={currentIndex}
            ></ReplayScene>
          </Canvas>      
        </>
      ) : (
        <>
          <Joystick commandHandler={setCommand} />
          <div className="buttons-container">
            <ControlButton commandHandler={setCommand} command={'fire'} img='/burn.png' text={"Fire"} />
            <div className='toggle-buttons-container'>
              <ToggleButton
                commandHandler={handleMovementToggle}
                img='/accelerator.png'
                text={["Stopped", "Moving"]}
              />
              <ToggleButton
                commandHandler={handleCameraToggle}
                img='/camera.png'
                text={["Camera Following", "Free Camera"]}
              />
            </div>
          </div>
          <Canvas>
            <Scene
              command={command}
              isReplayMode={false}
              cameraCommand={cameraCommand}
              isCameraFollowing={isCameraFollowing}
              isVehicleMoving={isVehicleMoving}
            />
          </Canvas>
          
        </>
      )}
    </div>
  );
}


export default App;
