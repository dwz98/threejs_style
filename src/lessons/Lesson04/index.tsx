import * as THREE from "three";
import LessonLayout from "@/components/Layout/LessonLayout";
import { useThreeScene } from "@/hooks/useThreeScene";
import { useRouteMeta } from "@/hooks/useRouteMeta";

export default function Lesson04() {
	const { meta } = useRouteMeta();

	const { mountRef } = useThreeScene({
		backgroundColor: meta?.backgroundColor || "#1a1a2e",
		enableControls: true,
		enableHelpers: meta?.enableHelpers || false,
		lightingType: meta?.lightingType || "basic",
		onSceneReady: ({ scene }) => {
			// 创建动画几何体
			const geometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
			const material = new THREE.MeshStandardMaterial({
				color: "#ff6b6b",
				wireframe: false,
			});

			const torus = new THREE.Mesh(geometry, material);
			scene.add(torus);

			// 创建粒子系统
			const particleCount = 1000;
			const positions = new Float32Array(particleCount * 3);
			const colors = new Float32Array(particleCount * 3);

			for (let i = 0; i < particleCount; i++) {
				positions[i * 3] = (Math.random() - 0.5) * 20;
				positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
				positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

				colors[i * 3] = Math.random();
				colors[i * 3 + 1] = Math.random();
				colors[i * 3 + 2] = Math.random();
			}

			const particleGeometry = new THREE.BufferGeometry();
			particleGeometry.setAttribute(
				"position",
				new THREE.BufferAttribute(positions, 3)
			);
			particleGeometry.setAttribute(
				"color",
				new THREE.BufferAttribute(colors, 3)
			);

			const particleMaterial = new THREE.PointsMaterial({
				size: 0.1,
				vertexColors: true,
			});

			const particles = new THREE.Points(particleGeometry, particleMaterial);
			scene.add(particles);
		},
		onAnimate: ({ scene }) => {
			const torus = scene.children.find((child) => child instanceof THREE.Mesh);
			const particles = scene.children.find(
				(child) => child instanceof THREE.Points
			);

			if (torus) {
				torus.rotation.x += 0.01;
				torus.rotation.y += 0.005;
			}

			if (particles) {
				particles.rotation.y += 0.002;
			}
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
