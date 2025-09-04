import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { size } from "@/utils/config.ts";

export const scene = new THREE.Scene();

export const camera = new THREE.PerspectiveCamera(
	75,
	size.width / size.height,
	0.1,
	1000
);

export const renderer = (canvas) => {
	return new THREE.WebGLRenderer({
		antialias: true,
		canvas,
	});
};

// 控制器
const controls = new OrbitControls(camera, renderer.domElement);
