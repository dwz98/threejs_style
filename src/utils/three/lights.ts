import * as THREE from "three";

export const createBasicLighting = (scene: THREE.Scene) => {
	// 环境光
	const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
	scene.add(ambientLight);

	// 方向光
	const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
	directionalLight.position.set(5, 5, 5);
	scene.add(directionalLight);

	return { ambientLight, directionalLight };
};

export const createStudioLighting = (scene: THREE.Scene) => {
	// 主光源
	const keyLight = new THREE.DirectionalLight(0xffffff, 1);
	keyLight.position.set(5, 5, 5);
	scene.add(keyLight);

	// 补光
	const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
	fillLight.position.set(-5, 0, 5);
	scene.add(fillLight);

	// 背景光
	const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
	backLight.position.set(0, 5, -5);
	scene.add(backLight);

	return { keyLight, fillLight, backLight };
};
