import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
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
		onSceneReady: ({ scene, camera, renderer, clock, controls }) => {
			console.log("camera", camera);
		},
		onAnimate: ({ scene, camera, renderer, clock, controls }) => {},
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
