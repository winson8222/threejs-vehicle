import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import { createVehicle } from './VehicleModel';

function ReplayScene({ history, index }) {
  const { scene, camera } = useThree();
  const vehicleRef = useRef();
  const pathSpheres = useRef([]);
  const orbitControlsRef = useRef()

  useEffect(() => {
    if (!history.length || index < 0 || index >= history.length || !vehicleRef.current) {
        
        return;
      }
    pathSpheres.current.forEach((sphere) => {
      scene.remove(sphere);
    });
    pathSpheres.current = [];


    const {position} = history[index];
    

    vehicleRef.current.position.set(position.x, position.y, position.z);

    console.log(vehicleRef.current.position)
    

    for (let i = 0; i <= index; i++) {
      const {position} = history[i];
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.2),
        new THREE.MeshBasicMaterial({ color: 'red' })
      );
      sphere.position.set(position.x, position.y, position.z);
      scene.add(sphere);
      pathSpheres.current.push(sphere);
    }

    return () => {
      pathSpheres.current.forEach((sphere) => {
        scene.remove(sphere);
      });
      pathSpheres.current = [];
    };
  }, [index, history, scene]);

  useEffect(() => {
    const vehicleMesh = createVehicle();
    vehicleMesh.position.set(0, 0, 0);
    scene.add(vehicleMesh);
    vehicleRef.current = vehicleMesh;

    if (history.length > 0) {
        const firstPosition = history[0].position;
        // Define the custom angles (in radians)
    const pitch = Math.PI / 6; // Tilt angle (30 degrees upward)
    const yaw = Math.PI / 4;   // Rotation angle (45 degrees around)

    // Compute the camera's position based on angles
    const distance = 20; // Distance from the target
    const cameraX = firstPosition.x + distance * Math.cos(yaw);
    const cameraY = firstPosition.y + distance * Math.sin(pitch); // Height
    const cameraZ = firstPosition.z + distance * Math.sin(yaw);

    // Set the camera's position
    camera.position.set(cameraX, cameraY, cameraZ);

   

      if (orbitControlsRef.current) {
        orbitControlsRef.current.target.set(firstPosition.x, firstPosition.y, firstPosition.z);
      }
    }

    return () => {
      scene.remove(vehicleMesh);
    };
  }, [scene]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <gridHelper />
      <OrbitControls enabled={true} ref={orbitControlsRef}/>
    </>
  );
}

export default ReplayScene;