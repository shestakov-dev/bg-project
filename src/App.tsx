import {
	BrowserRouter as Router,
	Routes,
	Route,
	useNavigate,
} from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import SpaceScene from "./components/SpaceScene";
import AboutPage from "./pages/AboutPage";
import ArtworkPage from "./pages/ArtworkPage";
import { Suspense, createContext, useState } from "react";
import * as THREE from "three";
import HelpOverlay from "./components/HelpOverlay";

// Create a context for camera state
const CameraContext = createContext<{
	position: THREE.Vector3;
	rotation: THREE.Euler;
	targetRotation: THREE.Euler;
} | null>(null);

// Provider component
function CameraProvider({ children }: { children: React.ReactNode }) {
	const [cameraState] = useState(() => ({
		position: new THREE.Vector3(15, 15, 15),
		rotation: new THREE.Euler(0, 0, 0, "YXZ"),
		targetRotation: new THREE.Euler(0, 0, 0, "YXZ"),
	}));

	return (
		<CameraContext.Provider value={cameraState}>
			{children}
		</CameraContext.Provider>
	);
}

// AboutButton component
function AboutButton() {
	const navigate = useNavigate();

	return (
		<div
			style={{
				position: "fixed",
				top: "20px",
				right: "20px",
				zIndex: 1000,
				background: "rgba(255, 255, 255, 0.1)",
				backdropFilter: "blur(10px)",
				padding: "10px 20px",
				borderRadius: "5px",
				cursor: "pointer",
				color: "white",
				fontFamily: "Arial, sans-serif",
				fontSize: "16px",
				border: "1px solid rgba(255, 255, 255, 0.2)",
				transition: "all 0.3s ease",
			}}
			onClick={() => navigate("/about")}
			onMouseOver={e => {
				e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
			}}
			onMouseOut={e => {
				e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
			}}>
			За проекта
		</div>
	);
}

function SceneWrapper() {
	return (
		<div style={{ width: "100vw", height: "100vh" }}>
			<AboutButton />
			<HelpOverlay />
			<Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
				<Suspense fallback={null}>
					<SpaceScene />
				</Suspense>
			</Canvas>
		</div>
	);
}

function App() {
	return (
		<CameraProvider>
			<Router>
				<Routes>
					<Route
						path="/"
						element={<SceneWrapper />}
					/>
					<Route
						path="/about"
						element={<AboutPage />}
					/>
					<Route
						path="/artwork/:id"
						element={<ArtworkPage />}
					/>
				</Routes>
			</Router>
		</CameraProvider>
	);
}

export default App;
