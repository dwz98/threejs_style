import * as THREE from "three";
import LessonLayout from "@/components/Layout/LessonLayout";
import { useThreeScene } from "@/hooks/useThreeScene";
import { useRouteMeta } from "@/hooks/useRouteMeta";

export default function Lesson02() {
	const { meta } = useRouteMeta();

	const { mountRef } = useThreeScene({
		backgroundColor: meta?.backgroundColor || "#1a1a2e",
		enableControls: true,
		enableHelpers: meta?.enableHelpers || false,
		lightingType: meta?.lightingType || "studio",
		onSceneReady: (scene) => {
			// 创建不同材质的立方体
			const geometry = new THREE.BoxGeometry(2, 2, 2);

			const materials = [
				new THREE.MeshBasicMaterial({ color: 0xff0000 }),
				new THREE.MeshLambertMaterial({ color: 0x00ff00 }),
				new THREE.MeshPhongMaterial({ color: 0x0000ff, shininess: 100 }),
				new THREE.MeshStandardMaterial({
					color: 0xffff00,
					roughness: 0.5,
					metalness: 0.8,
				}),
			];

			materials.forEach((material, index) => {
				const cube = new THREE.Mesh(geometry, material);
				cube.position.x = (index - 1.5) * 3;
				scene.add(cube);
			});
		},
		onAnimate: (scene) => {
			const cubes = scene.children.filter(
				(child) => child instanceof THREE.Mesh
			);
			const time = Date.now() * 0.001;

			cubes.forEach((cube, index) => {
				cube.rotation.x = time * (0.5 + index * 0.1);
				cube.rotation.y = time * (0.3 + index * 0.05);
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
