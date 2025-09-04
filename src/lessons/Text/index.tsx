import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import LessonLayout from "@/components/Layout/LessonLayout";
import { useThreeScene } from "@/hooks/useThreeScene";
import { useRouteMeta } from "@/hooks/useRouteMeta";

export default function Lesson01() {
	const textureLoader = new THREE.TextureLoader();
	const matcapTexture = textureLoader.load("/Text/textures/matcaps/6.png");

	const addTorus = (scene, material) => {
		const torusGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
		// 三百个圆环
		for (let i = 0; i < 300; i++) {
			// 范围为-5，5
			let x = (Math.random() - 0.5) * 10;
			let y = (Math.random() - 0.5) * 10;
			let z = (Math.random() - 0.5) * 10;
			// 方向为圆弧的任意角度
			let rotateX = Math.random() * Math.PI;
			let rotateY = Math.random() * Math.PI;
			let rotateZ = Math.random() * Math.PI;
			// 设置圆环的材质
			let mesh = new THREE.Mesh(torusGeometry, material);
			mesh.position.set(x, y, z);
			mesh.rotation.set(rotateX, rotateY, rotateZ);

			let scale = Math.random();
			mesh.scale.set(scale, scale, scale);

			scene.add(mesh);
		}
	};

	const { meta } = useRouteMeta();
	const { mountRef } = useThreeScene({
		backgroundColor: meta?.backgroundColor || "#222333",
		enableControls: true,
		enableHelpers: meta?.enableHelpers || false,
		lightingType: meta?.lightingType || "basic",
		onSceneReady: (scene, camera, renderer) => {
			camera.position.x = 1;
			camera.position.y = 1;
			camera.position.z = 2;
			const loader = new FontLoader();
			loader.load(
				"/Text/fonts/helvetiker_regular.typeface.json",
				function (font) {
					console.log(font);
					const textGeometry = new TextGeometry("Hello three.js.", {
						font: font,
						size: 0.5,
						depth: 0.2,
						curveSegments: 6,
						bevelEnabled: true,
						bevelThickness: 0.03,
						bevelSize: 0.02,
						bevelSegments: 5,
					});
					// geometry.computeBoundingBox();
					// geometry.translate(
					// 	-(geometry.boundingBox.max.x - geometry.boundingBox.min.x) * 0.5,
					// 	-(geometry.boundingBox.max.y - geometry.boundingBox.min.y) * 0.5,
					// 	-(geometry.boundingBox.max.z - geometry.boundingBox.min.z) * 0.5
					// );
					textGeometry.center();

					const material = new THREE.MeshMatcapMaterial({
						matcap: matcapTexture,
					});
					const text = new THREE.Mesh(textGeometry, material);
					scene.add(text);

					addTorus(scene, material);
				},
				function (xhr) {
					console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
				},

				// onError回调
				function (err) {
					console.log("An error happened");
				}
			);
		},
		onAnimate: (scene) => {},
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
