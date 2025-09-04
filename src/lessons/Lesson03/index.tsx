import * as THREE from "three";
import LessonLayout from "@/components/Layout/LessonLayout";
import { useThreeScene } from "@/hooks/useThreeScene";

export default function Lesson03() {
	const { mountRef } = useThreeScene({
		backgroundColor: "#0f0f23",
		enableControls: true,
		enableHelpers: true,
		lightingType: "studio",
		onSceneReady: (scene) => {
			// 创建多个光源演示
			const geometry = new THREE.SphereGeometry(0.5, 16, 16);
			const material = new THREE.MeshStandardMaterial({
				color: "#ffffff",
				roughness: 0.1,
				metalness: 0.9,
			});

			// 创建多个球体
			for (let i = 0; i < 9; i++) {
				const sphere = new THREE.Mesh(geometry, material);
				sphere.position.x = ((i % 3) - 1) * 2;
				sphere.position.z = Math.floor(i / 3 - 1) * 2;
				scene.add(sphere);
			}

			// 添加点光源
			const pointLight1 = new THREE.PointLight(0xff0000, 1, 10);
			pointLight1.position.set(3, 3, 3);
			scene.add(pointLight1);

			const pointLight2 = new THREE.PointLight(0x00ff00, 1, 10);
			pointLight2.position.set(-3, -3, -3);
			scene.add(pointLight2);

			const pointLight3 = new THREE.PointLight(0x0000ff, 1, 10);
			pointLight3.position.set(0, 5, 0);
			scene.add(pointLight3);
		},
		onAnimate: (scene) => {
			const spheres = scene.children.filter(
				(child) => child instanceof THREE.Mesh
			);
			const time = Date.now() * 0.001;

			spheres.forEach((sphere, index) => {
				sphere.rotation.y = time * (0.5 + index * 0.1);
				sphere.rotation.x = time * (0.3 + index * 0.05);
			});
		},
	});

	return (
		<LessonLayout
			title="课程3: 光照系统"
			description="学习Three.js中的光照技术"
		>
			<canvas
				ref={mountRef}
				className="w-full h-screen"
			/>
		</LessonLayout>
	);
}
