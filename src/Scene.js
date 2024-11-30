import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import ThirdPersonCamera from './ThirdPersonCamera';
import VehicleController from './VehicleContoller';
import { OrbitControls } from '@react-three/drei';
import { createVehicle } from './VehicleModel';


function Scene({command , cameraCommand, isCameraFollowing, isVehicleMoving}) {
    const { scene } = useThree();
    const { set } = useThree();
    const cameraRef = useRef();
    const vehicleRef = useRef(new THREE.Mesh());
    const vehicleControllerRef = useRef(null);
    const cameraControllerRef = useRef();
    const orbitControlsRef = useRef();
    const previousVehiclePosition = useRef(new THREE.Vector3());
    const wsConnection = useRef(null);

    useEffect(() => {
        if (!wsConnection.current) {
            wsConnection.current = new WebSocket('ws://localhost:8080');
        }
    }, []);


    useEffect(() => {
        if (!cameraControllerRef.current) return;
    
        // Enable or disable the ThirdPersonCamera
        cameraControllerRef.current?.setEnabled(isCameraFollowing);

    
        if (orbitControlsRef.current) {
          orbitControlsRef.current.enabled = !isCameraFollowing;

          if (!isCameraFollowing) {
            // start at the same position as the previous camera

            const vehiclePosition = new THREE.Vector3();
            // first reset to centalise the camera
            vehicleRef.current.getWorldPosition(vehiclePosition);
            previousVehiclePosition.current.copy(vehiclePosition);
    
            orbitControlsRef.current.object.position.copy(cameraControllerRef.current._currentPosition);
            orbitControlsRef.current.target.copy(cameraControllerRef.current._currentLookAt);
            
          }
        }
      }, [isCameraFollowing]);

    useEffect(() => {
        if (!vehicleControllerRef.current) return;
        vehicleControllerRef.current.setMoving(isVehicleMoving);
    }, [isVehicleMoving]);
    
  
    useEffect(() => {
      if (!cameraRef.current) return;

      const vehicleMesh = createVehicle()
      vehicleMesh.position.set(0, 0, 0);
      scene.add(vehicleMesh);
      vehicleRef.current = vehicleMesh;
      const camera = cameraRef.current;      
      cameraControllerRef.current = new ThirdPersonCamera({
        camera: camera,
        target: vehicleMesh,
      });
      set({ camera: cameraRef.current });
      vehicleControllerRef.current = new VehicleController(vehicleMesh);

      
  
      return () => {
        scene.remove(vehicleMesh);
      };
    }, [scene]);
    





  
    useFrame((state, delta) => {

        if (wsConnection.current.readyState === WebSocket.OPEN) {
            const position = {
                x: vehicleRef.current.position.x,
                y: vehicleRef.current.position.y,
                z: vehicleRef.current.position.z,
            }

            const orientation = {
                x: vehicleRef.current.rotation.x,
                y: vehicleRef.current.rotation.y,
                z: vehicleRef.current.rotation.z,
            }
          }

      vehicleControllerRef.current?.update(command, delta);


      cameraControllerRef.current?.Update(delta);



      const currentVehiclePosition = new THREE.Vector3();
      vehicleRef.current.getWorldPosition(currentVehiclePosition);


      const deltaPosition = currentVehiclePosition.clone().sub(previousVehiclePosition.current);
      


      if (deltaPosition.lengthSq() > 0.0001) {
            console.log(deltaPosition)
            const newTrailPoint = new THREE.Mesh(
            new THREE.SphereGeometry(0.1),
            new THREE.MeshBasicMaterial({ color: 0xff0000 })
            );
            newTrailPoint.position.copy(currentVehiclePosition);
            scene.add(newTrailPoint);
            console.log("printing")
        }


    
        


      if (orbitControlsRef.current && !isCameraFollowing) {
     

        const camera = orbitControlsRef.current.object;
        camera.position.add(deltaPosition);
        orbitControlsRef.current.target.add(deltaPosition);
   
      }
      previousVehiclePosition.current.copy(currentVehiclePosition);

      // if position changed add a point to the trail

    
    });
  
    return (
      <>
        <perspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 0]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 20, 10]} angle={0.3} />
        <gridHelper />
        <OrbitControls ref={orbitControlsRef} enabled={!isCameraFollowing} />
    </>
  );
   
  }


  export default Scene;