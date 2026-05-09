import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";

function Model() {
  const { scene } = useGLTF("/models/model.glb");
  return <primitive object={scene} />;
}

useGLTF.preload("/models/model.glb");

export function RotatingModel() {
  return (
    <Canvas
      shadows={false}
      gl={{ alpha: true, antialias: true, preserveDrawingBuffer: false }}
      camera={{ position: [0, 0.2, 3.2], fov: 35 }}
      style={{ background: "transparent" }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 2]} intensity={1.1} />
      <directionalLight position={[-3, 2, -2]} intensity={0.4} />
      <Suspense fallback={null}>
        <PresentationControls
          global
          cursor
          snap
          speed={1.2}
          rotation={[0, 0, 0]}
          polar={[0, 0]}
          azimuth={[-Math.PI, Math.PI]}
        >
          <Stage environment={null} adjustCamera={1.1} intensity={0.4} shadows={false}>
            <Model />
          </Stage>
        </PresentationControls>
      </Suspense>
    </Canvas>
  );
}
