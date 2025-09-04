import * as THREE from "three";

export const createScene = (backgroundColor: string = "#222333") => {
	const scene = new THREE.Scene();
	scene.background = new THREE.Color(backgroundColor);
	return scene;
};
