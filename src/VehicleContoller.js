import * as THREE from 'three';

class VehicleController {
    constructor(vehicle) {
      this._vehicle = vehicle; // Reference to the vehicle's THREE.Mesh
      this._speed = 5; // Movement speed
      this._velocity = new THREE.Vector3(0, 0, 0); // Movement vector
      this._lastFireTime = performance.now();
      this._isMoving = false;
      this._x_axis = new THREE.Vector3(1, 0, 0);
      this._y_axis = new THREE.Vector3(0, 1, 0);
    }

    _fire() {

        if (performance.now() - this._lastFireTime < 500) {
            return;
        }
        const fireball = new THREE.SphereGeometry(1, 32, 32);
        const fireballMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const fireballMesh = new THREE.Mesh(fireball, fireballMaterial);

        fireballMesh.position.copy(this._vehicle.position);
    
        this._vehicle.parent.add(fireballMesh);

        const forwardDirection = new THREE.Vector3(0, 0, -1);
        forwardDirection.applyQuaternion(this._vehicle.quaternion);
    
        const fireballVelocity = forwardDirection.multiplyScalar(10);
    
        const fireballStartingPosition = fireballMesh.position.clone();
        const distanceThreshold = 200;
    
        const moveFireball = () => {
            // calculate the distance from the starting position
            const currentDistance = fireballMesh.position.distanceTo(fireballStartingPosition);
        
            if (currentDistance > distanceThreshold) {
                fireballMesh.parent.remove(fireballMesh);
                return; 
            }
        
            fireballMesh.position.add(fireballVelocity.clone().multiplyScalar(0.03));
        
            requestAnimationFrame(moveFireball);
        };
    
        moveFireball();
        this._lastFireTime = performance.now();
        console.log('fire');
    }

    setMoving(isMoving) {
        this._isMoving = isMoving;
    }

  
    // Update method to move the vehicle based on the command
    update(command, deltaTime) {
      if (!this._vehicle) return;
  
      //reset velocity
      this._velocity.set(0, 0, 0);
  
    
      switch (command) {
          case 'rotateLeft': {
            const angle = Math.PI * deltaTime; 
            this._vehicle.rotateOnAxis(this._y_axis, angle);
            break;
          }
          case 'rotateRight': {
            const angle = -Math.PI * deltaTime; 
            this._vehicle.rotateOnAxis(this._y_axis, angle);
            break;
          }
          case 'rotateUp': {
            const angle = Math.PI * deltaTime; 
            this._vehicle.rotateOnAxis(this._x_axis, angle);
            break;
          }
          case 'rotateDown': {
            const angle = -Math.PI * deltaTime;
            this._vehicle.rotateOnAxis(this._x_axis, angle);
            break;
          }
          case 'fire': {
            this._fire();
            break;
          }
        default:
          break;
      }
  
        
        if (this._isMoving) {
            const forwardDirection = new THREE.Vector3(0, 0, -1).applyQuaternion(this._vehicle.quaternion);
            const movement = forwardDirection.multiplyScalar(this._speed * deltaTime);
            this._vehicle.position.add(movement);
        }
    }
  }
  
  export default VehicleController;