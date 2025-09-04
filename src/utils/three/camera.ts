import * as THREE from "three";

export const createCamera = (
	fov: number = 75,
	near: number = 0.1,
	far: number = 1000
) => {
	const camera = new THREE.PerspectiveCamera(
		fov,
		window.innerWidth / window.innerHeight,
		near,
		far
	);
	return camera;
};

export const updateCameraAspect = (camera: THREE.PerspectiveCamera) => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
};
