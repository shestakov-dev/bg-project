import React, { useRef, useState, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
	Stars,
	PerspectiveCamera,
	useTexture,
	Sphere,
	Html,
} from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import { artworksWithZ } from "../data/artworks";

// List of planet textures
const planetTextures = [
	"/images/mars.jpg",
	"/images/jupiter.jpg",
	"/images/saturn.jpg",
	"/images/venus.jpg",
	"/images/mercury.jpg",
	"/images/neptune.jpg",
	"/images/uranus.jpg",
	"/images/ceres.jpg",
	"/images/haumea.jpg",
	"/images/makemake.jpg",
	"/images/eris.jpg",
];

// Create a grid helper for better spatial orientation
function GridHelper() {
	return (
		<gridHelper
			args={[100, 100, "#444444", "#222222"]}
			position={[0, 0, 0]}
			rotation={[0, 0, 0]}
		/>
	);
}

// Create axis helpers with labels
function AxisHelpers() {
	return (
		<group>
			{/* X-axis (Red) */}
			<mesh position={[0, 0, 0]}>
				<boxGeometry args={[100, 0.1, 0.1]} />
				<meshBasicMaterial
					color="red"
					transparent
					opacity={0.5}
				/>
			</mesh>
			<Html
				position={[50, 0.5, 0]}
				center
				style={{
					background: "rgba(255, 0, 0, 0.7)",
					padding: "0.5rem 1rem",
					borderRadius: "4px",
					color: "white",
					fontSize: "1rem",
					whiteSpace: "nowrap",
					pointerEvents: "none",
					transform: "translate3d(-50%, -50%, 0)",
				}}>
				Положително отношение към чуждото
			</Html>
			<Html
				position={[-50, 0.5, 0]}
				center
				style={{
					background: "rgba(255, 0, 0, 0.7)",
					padding: "0.5rem 1rem",
					borderRadius: "4px",
					color: "white",
					fontSize: "1rem",
					whiteSpace: "nowrap",
					pointerEvents: "none",
					transform: "translate3d(-50%, -50%, 0)",
				}}>
				Отрицателно отношение към чуждото
			</Html>

			{/* Y-axis (Green) */}
			<mesh position={[0, 0, 0]}>
				<boxGeometry args={[0.1, 100, 0.1]} />
				<meshBasicMaterial
					color="green"
					transparent
					opacity={0.5}
				/>
			</mesh>
			<Html
				position={[0, 50.5, 0]}
				center
				style={{
					background: "rgba(0, 255, 0, 0.7)",
					padding: "0.5rem 1rem",
					borderRadius: "4px",
					color: "white",
					fontSize: "1rem",
					whiteSpace: "nowrap",
					pointerEvents: "none",
					transform: "translate3d(-50%, -50%, 0)",
				}}>
				Гордост от родното
			</Html>
			<Html
				position={[0, -50.5, 0]}
				center
				style={{
					background: "rgba(0, 255, 0, 0.7)",
					padding: "0.5rem 1rem",
					borderRadius: "4px",
					color: "white",
					fontSize: "1rem",
					whiteSpace: "nowrap",
					pointerEvents: "none",
					transform: "translate3d(-50%, -50%, 0)",
				}}>
				Срам от родното
			</Html>

			{/* Z-axis (Blue) */}
			<mesh position={[0, 0, 0]}>
				<boxGeometry args={[0.1, 0.1, 100]} />
				<meshBasicMaterial
					color="blue"
					transparent
					opacity={0.5}
				/>
			</mesh>
			<Html
				position={[0, 0.5, 50]}
				center
				style={{
					background: "rgba(0, 0, 255, 0.7)",
					padding: "0.5rem 1rem",
					borderRadius: "4px",
					color: "white",
					fontSize: "1rem",
					whiteSpace: "nowrap",
					pointerEvents: "none",
					transform: "translate3d(-50%, -50%, 0)",
				}}>
				Съвременно изкуство
			</Html>
			<Html
				position={[0, 0.5, -50]}
				center
				style={{
					background: "rgba(0, 0, 255, 0.7)",
					padding: "0.5rem 1rem",
					borderRadius: "4px",
					color: "white",
					fontSize: "1rem",
					whiteSpace: "nowrap",
					pointerEvents: "none",
					transform: "translate3d(-50%, -50%, 0)",
				}}>
				Минало изкуство
			</Html>
		</group>
	);
}

function CelestialBody({
	position,
	title,
	id,
}: {
	position: [number, number, number];
	title: string;
	id: string;
}) {
	const meshRef = useRef<THREE.Mesh>(null);
	const [isHovered, setIsHovered] = useState(false);
	const navigate = useNavigate();

	// Randomly select a planet texture
	const selectedTexture = useMemo(() => {
		const randomIndex = Math.floor(Math.random() * planetTextures.length);
		return planetTextures[randomIndex];
	}, []); // Empty dependency array means this will be calculated once when the component mounts

	// Load the selected texture
	const planetTexture = useTexture(selectedTexture);
	planetTexture.wrapS = THREE.RepeatWrapping;
	planetTexture.wrapT = THREE.RepeatWrapping;

	useFrame(state => {
		if (meshRef.current) {
			meshRef.current.rotation.y += 0.01;
			// Add a gentle floating motion
			meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
		}
	});

	const handleClick = () => {
		// Force exit pointer lock in multiple ways
		if (document.pointerLockElement) {
			document.exitPointerLock();
		}
		if (document.exitPointerLock) {
			document.exitPointerLock();
		}
		// Force cursor style
		document.body.style.cursor = "auto";

		// Small delay to ensure pointer lock is released before navigation
		setTimeout(() => {
			// Double check cursor is visible
			document.body.style.cursor = "auto";
			navigate(`/artwork/${id}`);
		}, 100);
	};

	return (
		<group position={position}>
			<mesh
				ref={meshRef}
				onPointerOver={() => setIsHovered(true)}
				onPointerOut={() => setIsHovered(false)}
				onClick={handleClick}>
				<sphereGeometry args={[6, 32, 32]} />
				<meshStandardMaterial
					map={planetTexture}
					normalMap={planetTexture}
					roughnessMap={planetTexture}
					metalnessMap={planetTexture}
					normalScale={[0.5, 0.5]}
					roughness={0.5}
					metalness={0.2}
				/>
			</mesh>
			<Html
				position={[0, 7, 0]}
				center
				style={{
					background: "rgba(0, 0, 0, 0.8)",
					padding: "8px 16px",
					borderRadius: "4px",
					color: "white",
					fontSize: "14px",
					whiteSpace: "nowrap",
					pointerEvents: "none",
					transform: "translate3d(-50%, -50%, 0)",
					opacity: isHovered ? 1 : 0.7,
				}}>
				{title}
			</Html>
		</group>
	);
}

// Replace the Nebula component with StarsBackground
function StarsBackground() {
	const starsTexture = useTexture("/images/stars_milky_way.jpg");
	return (
		<Sphere args={[200, 32, 32]}>
			<meshBasicMaterial
				map={starsTexture}
				side={THREE.BackSide}
				transparent
				opacity={0.8}
			/>
		</Sphere>
	);
}

// Module-level camera state
const cameraState = {
	position: new THREE.Vector3(100, 100, 100),
	rotation: new THREE.Euler(-Math.PI / 4, Math.PI / 4, 0, "YXZ"),
	targetRotation: new THREE.Euler(-Math.PI / 4, Math.PI / 4, 0, "YXZ"),
	hasInitialized: false,
};

export default function SpaceScene() {
	const { camera } = useThree();
	const moveSpeed = 0.3;
	const mouseSensitivity = 0.002;
	const rotationSpeed = 0.1;
	const keys = useRef({
		forward: false, // W key
		left: false, // A key
		backward: false, // S key
		right: false, // D key
		up: false, // E key
		down: false, // Q key
	});

	const isPointerLocked = useRef(false);
	const euler = useRef(cameraState.rotation);
	const targetEuler = useRef(cameraState.targetRotation);

	// Force initial position
	React.useEffect(() => {
		// Force position immediately
		camera.position.set(100, 100, 100);
		camera.quaternion.setFromEuler(cameraState.rotation);

		// Set up an interval to ensure position stays correct for the first few frames
		const interval = setInterval(() => {
			if (camera.position.distanceTo(new THREE.Vector3(100, 100, 100)) > 0.1) {
				camera.position.set(100, 100, 100);
				camera.quaternion.setFromEuler(cameraState.rotation);
			}
		}, 100);

		// Clean up interval after 2 seconds
		setTimeout(() => clearInterval(interval), 2000);

		return () => clearInterval(interval);
	}, [camera]);

	// Handle keyboard and mouse events
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			// Only handle keys when pointer is locked
			if (document.pointerLockElement !== document.body) return;

			// Use keyCode for physical key position
			switch (event.keyCode) {
				case 87: // W
					keys.current.forward = true;
					break;
				case 65: // A
					keys.current.left = true;
					break;
				case 83: // S
					keys.current.backward = true;
					break;
				case 68: // D
					keys.current.right = true;
					break;
				case 69: // E
					keys.current.up = true;
					break;
				case 81: // Q
					keys.current.down = true;
					break;
			}
		};

		const handleKeyUp = (event: KeyboardEvent) => {
			// Only handle keys when pointer is locked
			if (document.pointerLockElement !== document.body) return;

			// Use keyCode for physical key position
			switch (event.keyCode) {
				case 87: // W
					keys.current.forward = false;
					break;
				case 65: // A
					keys.current.left = false;
					break;
				case 83: // S
					keys.current.backward = false;
					break;
				case 68: // D
					keys.current.right = false;
					break;
				case 69: // E
					keys.current.up = false;
					break;
				case 81: // Q
					keys.current.down = false;
					break;
			}
		};

		const handleMouseMove = (e: MouseEvent) => {
			if (isPointerLocked.current) {
				// Update target rotation instead of current rotation
				targetEuler.current.y -= e.movementX * mouseSensitivity;
				targetEuler.current.x -= e.movementY * mouseSensitivity;

				// Limit vertical look angle
				targetEuler.current.x = Math.max(
					-Math.PI / 2,
					Math.min(Math.PI / 2, targetEuler.current.x)
				);
			}
		};

		const handleClick = () => {
			if (document.pointerLockElement !== document.body) {
				document.body.requestPointerLock();
			}
		};

		const handlePointerLockChange = () => {
			isPointerLocked.current = document.pointerLockElement === document.body;
			// Reset all keys when pointer lock changes
			keys.current = {
				forward: false,
				left: false,
				backward: false,
				right: false,
				up: false,
				down: false,
			};
		};

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);
		window.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("pointerlockchange", handlePointerLockChange);
		document.addEventListener("click", handleClick);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
			window.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("pointerlockchange", handlePointerLockChange);
			document.removeEventListener("click", handleClick);
		};
	}, []);

	// Update camera position and rotation based on input
	useFrame(() => {
		// Smoothly interpolate current rotation to target rotation
		euler.current.x += (targetEuler.current.x - euler.current.x) * rotationSpeed;
		euler.current.y += (targetEuler.current.y - euler.current.y) * rotationSpeed;
		camera.quaternion.setFromEuler(euler.current);

		// Calculate movement direction
		const direction = new THREE.Vector3();
		camera.getWorldDirection(direction);
		const right = new THREE.Vector3();
		right.crossVectors(camera.up, direction).normalize();

		// Apply movement
		if (keys.current.forward)
			camera.position.addScaledVector(direction, moveSpeed);
		if (keys.current.backward)
			camera.position.addScaledVector(direction, -moveSpeed);
		if (keys.current.right) camera.position.addScaledVector(right, -moveSpeed);
		if (keys.current.left) camera.position.addScaledVector(right, moveSpeed);

		// Vertical movement
		if (keys.current.up) {
			camera.position.y += moveSpeed;
		}
		if (keys.current.down) {
			camera.position.y -= moveSpeed;
		}

		// Update module-level state
		cameraState.position.copy(camera.position);
		cameraState.rotation.copy(euler.current);
		cameraState.targetRotation.copy(targetEuler.current);
	});

	return (
		<>
			<PerspectiveCamera
				makeDefault
				position={[100, 100, 100]}
			/>

			<ambientLight intensity={1.5} />
			<directionalLight
				position={[10, 10, 5]}
				intensity={2}
			/>
			<Stars
				radius={200}
				depth={50}
				count={5000}
				factor={4}
				saturation={0}
				fade
				speed={1}
			/>

			<StarsBackground />
			<GridHelper />
			<AxisHelpers />

			{artworksWithZ.map(artwork => (
				<CelestialBody
					key={artwork.id}
					position={[
						artwork.coordinates.x,
						artwork.coordinates.y,
						artwork.coordinates.z!,
					]}
					title={artwork.title}
					id={artwork.id}
				/>
			))}
		</>
	);
}
