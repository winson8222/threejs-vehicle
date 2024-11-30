import * as THREE from 'three';

const vehicleGeometry = new THREE.BoxGeometry(1, 1, 2);

const vehicleMaterials = [
  new THREE.MeshStandardMaterial({ color: 'blue' }), 
  new THREE.MeshStandardMaterial({ color: 'blue' }),
  new THREE.MeshStandardMaterial({ color: 'blue' }), 
  new THREE.MeshStandardMaterial({ color: 'blue' }), 
  new THREE.MeshStandardMaterial({ color: 'yellow' }),  
  new THREE.MeshStandardMaterial({ color: 'red' }),
];




export function createVehicle() {
    return new THREE.Mesh(vehicleGeometry, vehicleMaterials);
}
