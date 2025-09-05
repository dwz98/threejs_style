import * as THREE from "three";
import LessonLayout from "@/components/Layout/LessonLayout";
import { useThreeScene } from "@/hooks/useThreeScene";
import { useRouteMeta } from "@/hooks/useRouteMeta";

export default function Lesson01() {
	const { meta } = useRouteMeta();

	const { mountRef } = useThreeScene({
		backgroundColor: meta?.backgroundColor || "#222333",
		enableControls: true,
		enableHelpers: meta?.enableHelpers || false,
		lightingType: meta?.lightingType || "basic",
		onSceneReady: ({ scene }) => {
			// 创建三个球体
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
		},
		onAnimate: ({ scene }) => {
			const spheres = scene.children.filter(
				(child) => child instanceof THREE.Mesh
			);
			const time = Date.now() * 0.001;

			spheres.forEach((sphere, index) => {
				sphere.rotation.y = time * (0.5 + index * 0.1);
			});
		},
	});

	return (
		<LessonLayout>
			<canvas
				ref={mountRef}
				className="w-full h-screen"
			/>
		</LessonLayout>
	);
}
