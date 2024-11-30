import * as THREE from 'three';



class ThirdPersonCamera {
    constructor(params) {
      this._params = params; 
      this._camera = params.camera;
  
      this._currentPosition = new THREE.Vector3();
      this._currentLookAt = new THREE.Vector3();
      this._enabled = true;
  

      this._lastPosition = new THREE.Vector3();
      this._lastLookAt = new THREE.Vector3();

      this._idealFixedOffset = new THREE.Vector3(0, 10, 30);
      this._ideaFixedLookAt = new THREE.Vector3(0, 10, 0);
    }
  

  

    _CalculateIdealOffset() {
      const idealOffset = new THREE.Vector3(0, 10, 40); 

    idealOffset.applyQuaternion(this._params.target.quaternion); 
   
 
      idealOffset.add(this._params.target.position); 
      this._idealFixedOffset = idealOffset;
      return idealOffset;
    }
  
    _CalculateIdealLookAt() {
      const idealLookAt = new THREE.Vector3(0, 0, 0); 
     
        idealLookAt.applyQuaternion(this._params.target.quaternion); 
  
      idealLookAt.add(this._params.target.position);
        this._ideaFixedLookAt = idealLookAt;
      return idealLookAt;
    }
  
    setEnabled(enabled) {

      this._enabled = enabled;
    }
  
    ManualRotate(direction) {
      this._params.target.rotation.y += direction;
    }
  
    Update(deltaTime) {

        if (!this._enabled) return;

        const idealOffset = this._CalculateIdealOffset();
        const idealLookAt = this._CalculateIdealLookAt();
  

        const t = 1.0 - Math.pow(0.001, deltaTime); 
        this._currentPosition.lerp(idealOffset, t);
        this._currentLookAt.lerp(idealLookAt, t);
  
      
        this._camera.position.copy(this._currentPosition);
        this._camera.lookAt(this._currentLookAt);

    }
  }
  
  export default ThirdPersonCamera;