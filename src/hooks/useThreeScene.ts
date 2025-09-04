import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { createScene } from "@/utils/three/scene";
import { createCamera, updateCameraAspect } from "@/utils/three/camera";
import { createBasicLighting } from "@/utils/three/lights";

interface UseThreeSceneOptions {
	backgroundColor?: string;
	enableControls?: boolean;
	enableHelpers?: boolean;
	lightingType?: "basic" | "studio" | "none";
	onSceneReady?: (
		scene: THREE.Scene,
		camera: THREE.Camera,
		renderer: THREE.WebGLRenderer
	) => void;
	onAnimate?: (
		scene: THREE.Scene,
		camera: THREE.Camera,
		renderer: THREE.WebGLRenderer,
		clock: THREE.Clock
	) => void;
}

export const useThreeScene = (options: UseThreeSceneOptions = {}) => {
	const {
		backgroundColor = "#222333",
		enableControls = true,
		enableHelpers = false,
		lightingType = "basic",
		onSceneReady,
		onAnimate,
	} = options;

	const mountRef = useRef<HTMLCanvasElement | null>(null);
	const sceneRef = useRef<THREE.Scene>();
	const cameraRef = useRef<THREE.Camera>();
	const rendererRef = useRef<THREE.WebGLRenderer>();
	const controlsRef = useRef<OrbitControls>();
	const animationIdRef = useRef<number>();

	const cleanup = useCallback(() => {
		if (animationIdRef.current) {
			cancelAnimationFrame(animationIdRef.current);
		}
		if (controlsRef.current) {
			controlsRef.current.dispose();
		}
		if (rendererRef.current) {
			rendererRef.current.dispose();
		}
	}, []);

	useEffect(() => {
		if (!mountRef.current) return;

		// 创建场景、相机、渲染器
		const scene = createScene(backgroundColor);
		const camera = createCamera();
		camera.position.x = 1;
		camera.position.y = 1;
		camera.position.z = 2;

		const renderer = new THREE.WebGLRenderer({
			antialias: true,
			canvas: mountRef.current,
		});
		renderer.setSize(window.innerWidth, window.innerHeight);

		// 设置光照
		if (lightingType === "basic") {
			createBasicLighting(scene);
		}

		// 添加辅助工具
		if (enableHelpers) {
			const axesHelper = new THREE.AxesHelper(10);
			scene.add(axesHelper);
		}

		// 控制器
		let controls: OrbitControls | undefined;
		if (enableControls) {
			controls = new OrbitControls(camera, renderer.domElement);
			controls.enableDamping = true;
			controlsRef.current = controls;
		}

		// 保存引用
		sceneRef.current = scene;
		cameraRef.current = camera;
		rendererRef.current = renderer;

		// 调用场景准备回调
		onSceneReady?.(scene, camera, renderer);

		// 动画循环
		const clock = new THREE.Clock();
		const animate = () => {
			animationIdRef.current = requestAnimationFrame(animate);

			// 调用自定义动画回调
			onAnimate?.(scene, camera, renderer, clock);

			if (controls) {
				controls.update();
			}
			renderer.render(scene, camera);
		};
		animate();

		// 窗口大小调整
		const handleResize = () => {
			renderer.setSize(window.innerWidth, window.innerHeight);
			updateCameraAspect(camera as THREE.PerspectiveCamera);
		};
		window.addEventListener("resize", handleResize);

		return () => {
			cleanup();
			window.removeEventListener("resize", handleResize);
		};
	}, [
		backgroundColor,
		enableControls,
		enableHelpers,
		lightingType,
		onSceneReady,
		onAnimate,
		cleanup,
	]);

	return {
		mountRef,
		scene: sceneRef.current,
		camera: cameraRef.current,
		renderer: rendererRef.current,
		controls: controlsRef.current,
	};
};
