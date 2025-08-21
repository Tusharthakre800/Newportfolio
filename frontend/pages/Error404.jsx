import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// WaterWave component using a custom shader
function WaterWave() {
  const mesh = useRef();
  const material = useRef();
  useFrame((state) => {
    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={mesh} position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[12, 12, 128, 128]} />
      <shaderMaterial
        ref={material}
        attach="material"
        vertexShader={`
          uniform float uTime;
          varying vec2 vUv;
          void main() {
            vUv = uv;
            vec3 pos = position;
            float freq = 2.0;
            float amp = 0.25;
            pos.z += (
              sin((pos.x + uTime) * freq) +
              cos((pos.y + uTime * 0.7) * freq)
            ) * amp;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          void main() {
            vec3 color = mix(vec3(0.2,0.4,0.8), vec3(0.6,0.8,1.0), vUv.y);
            gl_FragColor = vec4(color, 0.45);
          }
        `}
        uniforms={{
          uTime: { value: 0 }
        }}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

function WaterWaveScene() {
  return (
    <Canvas
      camera={{ position: [0, 2.5, 7], fov: 50 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1,
        pointerEvents: "none",
      }}
      gl={{ alpha: true }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} />
      <WaterWave />
    </Canvas>
  );
}

const Error404 = () => {
  const codeRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const canvasRef = useRef(null); // Starfield canvas

  useEffect(() => {
    // Starfield animation with twinkle
    const canvas = canvasRef.current;
    let animationId;
    let width = window.innerWidth;
    let height = window.innerHeight;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    // 404 code pop
    gsap.fromTo(
      codeRef.current,
      { scale: 0.7, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, delay: 0.3, ease: "back.out(1.7)" }
    );
    // Subtitle fade in
    gsap.fromTo(
      textRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.7, ease: "power2.out" }
    );
    // Button bounce in
    gsap.fromTo(
      buttonRef.current,
      { scale: 0.7, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.7, delay: 1, ease: "back.out(1.7)" }
    );
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#181e2a] to-[#0f172a] text-white px-6 overflow-hidden">
      {/* Starfield animation */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
        style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh" }}
      />
      {/* Water Wave animation */}
      <WaterWaveScene />
      {/* Floating shapes */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-gradient-to-br from-pink-500/30 to-blue-500/20 rounded-full blur-2xl animate-bounce"></div>
      <div className="absolute bottom-10 right-10 w-20 h-20 bg-gradient-to-tr from-blue-500/30 to-purple-500/20 rounded-full blur-2xl animate-float-delay"></div>
      <div className="absolute top-1/2 left-0 w-16 h-16 bg-gradient-to-br from-purple-500/30 to-pink-500/20 rounded-full blur-2xl animate-float" style={{top: "60%"}}></div>
      {/* Main content */}
      <div className="relative z-10 text-center space-y-8">
        <h1
          ref={codeRef}
          className="text-[4rem] md:text-[7rem] font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-[0_0_40px_rgba(96,165,250,0.7)] select-none"
        >
          404
        </h1>
        <div
          ref={textRef}
          className="text-xl md:text-2xl font-semibold text-white/90"
        >
          Lost in space? The page you're looking for isn't here.
        </div>
        <button
          ref={buttonRef}
          onClick={() => window.location.href = "/"}
          className="mt-4 px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-blue-500 text-white rounded-2xl text-lg font-bold shadow-xl transition-all duration-300 ease-in-out hover:scale-110 focus:outline-none"
        >
          Beam Me Home
        </button>
      </div>
      {/* Floating animation keyframes */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px);}
            50% { transform: translateY(-30px);}
          }
          .animate-float {
            animation: float 14s ease-in-out infinite;
          }
          .animate-float-delay {
            animation: float 18s ease-in-out infinite;
            animation-delay: 2s;
          }
        `}
      </style>
    </div>
  );
};

export default Error404;
