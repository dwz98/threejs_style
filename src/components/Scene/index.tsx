import { useEffect, useRef } from "react";
import * as THREE from "three";
import { size } from "@/utils/config.ts";

export const scene = new THREE.Scene();

export const camera = new THREE.PerspectiveCamera(
	75,
	size.width / size.height,
	0.1,
	1000
);

export default function SceneCompoent() {
	const mountRef = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		// 基础场景
		scene.background = new THREE.Color("#222333");

		camera.position.z = 5;

		const renderer = new THREE.WebGLRenderer({
			antialias: true,
			canvas: mountRef.current,
		});
		renderer.setSize(size.width, size.height);

		// 光源
		const light = new THREE.DirectionalLight(0xffffff, 1);
		light.position.set(5, 5, 5);
		scene.add(light);

		// 球体
		const geometry = new THREE.SphereGeometry(1, 32, 32);
		const material = new THREE.MeshStandardMaterial({
			color: "#4CAF50",
			roughness: 0.5,
		});
		const sphere1 = new THREE.Mesh(geometry, material);
		sphere1.position.x = -3;
		scene.add(sphere1);

		const sphere2 = new THREE.Mesh(geometry, material.clone());
		sphere2.position.x = 0;
		scene.add(sphere2);

		const sphere3 = new THREE.Mesh(geometry, material.clone());
		sphere3.position.x = 3;
		scene.add(sphere3);

		const axesHelper = new THREE.AxesHelper(10);
		scene.add(axesHelper);

		// 控制器
		const controls = new OrbitControls(camera, renderer.domElement);

		// 时钟
		const clock = new THREE.Clock();

		function animate() {
			requestAnimationFrame(animate);

			// 方式 1：基于 elapsedTime
			const elapsedTime = clock.getElapsedTime();
			sphere1.rotation.y = 0.5 * elapsedTime; // 匀速转动

			// 方式 2：直接 += (依赖 FPS, 高帧率更快)
			sphere2.rotation.y += 0.01;

			// 方式 3：基于 deltaTime
			const deltaTime = clock.getDelta();
			sphere3.rotation.y += 0.5 * deltaTime;

			controls.update();
			renderer.render(scene, camera);
		}

		animate();

		// 自适应窗口大小
		const handleResize = () => {
			camera.aspect = size.width / size.height;
			camera.updateProjectionMatrix();
			renderer.setSize(size.width, size.height);
		};
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<canvas
			className="overflow-hidden"
			ref={mountRef}
			style={{ width: "100vw", height: "100vh" }}
		/>
	);
}
