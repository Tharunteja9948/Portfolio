import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function HeroCanvas3D({ isDark, spinTrigger = 0 }) {
  const mountRef = useRef(null);
  const [hasWebGLError, setHasWebGLError] = useState(false);
  const sceneRef = useRef(null);
  const lightsRef = useRef(null);
  const spinBoostRef = useRef(null);

  useEffect(() => {
    if (spinTrigger > 0 && spinBoostRef.current) {
      spinBoostRef.current();
    }
  }, [spinTrigger]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer, scene, camera, animationFrameId;
    let coreGroup, outerMesh, wireframeMesh, rings = [], particles;
    let targetRotX = 0, targetRotY = 0;
    let currentRotX = 0, currentRotY = 0;

    try {
      // 1. Scene setup
      scene = new THREE.Scene();
      sceneRef.current = scene;

      const width = container.clientWidth || 500;
      const height = container.clientHeight || 500;

      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.z = 8.5;

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;

      // Clean old canvas if any
      container.innerHTML = '';
      container.appendChild(renderer.domElement);

      // 2. Lighting setup
      const ambientLight = new THREE.AmbientLight(isDark ? 0x242d45 : 0xf1f5f9, 1.4);
      scene.add(ambientLight);

      const light1 = new THREE.PointLight(0x6366f1, isDark ? 4.5 : 3.0, 50);
      light1.position.set(5, 5, 5);
      scene.add(light1);

      const light2 = new THREE.PointLight(0x06b6d4, isDark ? 4.0 : 2.5, 50);
      light2.position.set(-5, -4, 4);
      scene.add(light2);

      const dirLight = new THREE.DirectionalLight(0xffffff, isDark ? 1.0 : 1.4);
      dirLight.position.set(0, 8, 4);
      scene.add(dirLight);

      lightsRef.current = { ambientLight, light1, light2, dirLight };

      // 3. Central Core Group (Icosahedron & Gyroscope)
      coreGroup = new THREE.Group();
      scene.add(coreGroup);

      // Outer crystal icosahedron
      const geomIcosa = new THREE.IcosahedronGeometry(1.4, 0);
      const matOuter = new THREE.MeshPhysicalMaterial({
        color: isDark ? 0x6366f1 : 0x4f46e5,
        roughness: 0.15,
        metalness: 0.35,
        transmission: 0.55,
        opacity: 0.85,
        transparent: true,
        clearcoat: 0.8,
        clearcoatRoughness: 0.1,
        reflectivity: 0.9,
      });
      outerMesh = new THREE.Mesh(geomIcosa, matOuter);
      coreGroup.add(outerMesh);

      // Inner wireframe sphere
      const geomWire = new THREE.IcosahedronGeometry(1.15, 1);
      const matWire = new THREE.MeshBasicMaterial({
        color: isDark ? 0x38bdf8 : 0x06b6d4,
        wireframe: true,
        transparent: true,
        opacity: isDark ? 0.6 : 0.4
      });
      wireframeMesh = new THREE.Mesh(geomWire, matWire);
      coreGroup.add(wireframeMesh);

      // 4. Orbital Rings
      const ringSpecs = [
        { radius: 2.1, tube: 0.02, color: 0x6366f1, rx: Math.PI / 4, ry: 0 },
        { radius: 2.65, tube: 0.018, color: 0x06b6d4, rx: -Math.PI / 3, ry: Math.PI / 6 },
        { radius: 3.2, tube: 0.015, color: 0x818cf8, rx: Math.PI / 6, ry: -Math.PI / 4 }
      ];

      ringSpecs.forEach((spec, idx) => {
        const ringGeom = new THREE.TorusGeometry(spec.radius, spec.tube, 16, 100);
        const ringMat = new THREE.MeshStandardMaterial({
          color: spec.color,
          roughness: 0.2,
          metalness: 0.8,
          emissive: spec.color,
          emissiveIntensity: isDark ? 0.4 : 0.2
        });
        const ringMesh = new THREE.Mesh(ringGeom, ringMat);
        ringMesh.rotation.x = spec.rx;
        ringMesh.rotation.y = spec.ry;
        coreGroup.add(ringMesh);

        // Add a small satellite node to each ring
        const satGeom = new THREE.SphereGeometry(0.08 + idx * 0.02, 16, 16);
        const satMat = new THREE.MeshBasicMaterial({
          color: idx % 2 === 0 ? 0x06b6d4 : 0x818cf8
        });
        const satMesh = new THREE.Mesh(satGeom, satMat);
        satMesh.position.x = spec.radius;
        ringMesh.add(satMesh);

        rings.push({ mesh: ringMesh, speed: (idx + 1) * 0.008 });
      });

      // 5. Floating Particles Field
      const particleCount = 200;
      const particlePositions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i += 3) {
        const r = 3.5 + Math.random() * 4.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        particlePositions[i] = r * Math.sin(phi) * Math.cos(theta);
        particlePositions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
        particlePositions[i + 2] = r * Math.cos(phi);
      }

      const particleGeom = new THREE.BufferGeometry();
      particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

      const particleMat = new THREE.PointsMaterial({
        color: isDark ? 0x93c5fd : 0x6366f1,
        size: 0.05,
        transparent: true,
        opacity: isDark ? 0.75 : 0.45,
        blending: THREE.AdditiveBlending
      });
      particles = new THREE.Points(particleGeom, particleMat);
      scene.add(particles);

      // 6. Pointer & Parallax tracking
      const handlePointerMove = (e) => {
        const rect = container.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const x = ((clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((clientY - rect.top) / rect.height) * 2 - 1);

        targetRotY = x * 0.8;
        targetRotX = -y * 0.6;
      };

      const handlePointerLeave = () => {
        targetRotX = 0;
        targetRotY = 0;
      };

      window.addEventListener('mousemove', handlePointerMove, { passive: true });
      window.addEventListener('touchmove', handlePointerMove, { passive: true });
      window.addEventListener('mouseleave', handlePointerLeave, { passive: true });

      // 7. Resize handling
      const handleResize = () => {
        if (!container || !renderer || !camera) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener('resize', handleResize);

      // 8. Animation Loop
      let clock = new THREE.Clock();
      let spinOffset = 0;
      let spinVelocity = 0;

      spinBoostRef.current = () => {
        spinVelocity = 0.42; // swift rotational burst
      };

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Parallax lerp
        currentRotX += (targetRotX - currentRotX) * 0.05;
        currentRotY += (targetRotY - currentRotY) * 0.05;

        // Apply and damp spin impulse
        spinOffset += spinVelocity;
        spinVelocity *= 0.93; // Smooth deceleration

        // Core continuous rotation + levitation + impulse
        if (coreGroup) {
          coreGroup.rotation.y = elapsedTime * 0.35 + currentRotY + spinOffset;
          coreGroup.rotation.x = Math.sin(elapsedTime * 0.25) * 0.2 + currentRotX;
          coreGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.18;
        }

        if (outerMesh) {
          outerMesh.rotation.y = elapsedTime * 0.2;
          outerMesh.rotation.z = Math.cos(elapsedTime * 0.3) * 0.15;
        }

        if (wireframeMesh) {
          wireframeMesh.rotation.y = -elapsedTime * 0.3;
          wireframeMesh.rotation.x = elapsedTime * 0.15;
        }

        // Ring individual differential rotations
        rings.forEach(({ mesh, speed }, idx) => {
          mesh.rotation.z += (idx % 2 === 0 ? 1 : -1) * speed;
        });

        // Slow particle field drift
        if (particles) {
          particles.rotation.y = elapsedTime * 0.03;
          particles.rotation.x = Math.sin(elapsedTime * 0.05) * 0.05;
        }

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('mousemove', handlePointerMove);
        window.removeEventListener('touchmove', handlePointerMove);
        window.removeEventListener('mouseleave', handlePointerLeave);
        window.removeEventListener('resize', handleResize);
        if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
          renderer.dispose();
        }
      };
    } catch (err) {
      console.warn("Three.js WebGL initialization skipped or failed:", err);
      setHasWebGLError(true);
    }
  }, []);

  // Update lighting and materials when theme changes
  useEffect(() => {
    if (!lightsRef.current) return;
    const { ambientLight, light1, light2, dirLight } = lightsRef.current;
    if (ambientLight) {
      ambientLight.color.setHex(isDark ? 0x242d45 : 0xf1f5f9);
      ambientLight.intensity = isDark ? 1.4 : 1.6;
    }
    if (light1) {
      light1.intensity = isDark ? 4.5 : 3.0;
    }
    if (light2) {
      light2.intensity = isDark ? 4.0 : 2.5;
    }
    if (dirLight) {
      dirLight.intensity = isDark ? 1.0 : 1.4;
    }
  }, [isDark]);

  if (hasWebGLError) {
    return (
      <div className="fallback-3d-graphic" aria-label="Interactive 3D geometry representation">
        <div className="fallback-crystal">
          <div className="fallback-ring ring-1"></div>
          <div className="fallback-ring ring-2"></div>
          <div className="fallback-ring ring-3"></div>
          <div className="fallback-core"></div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={mountRef} 
      className="hero-3d-canvas-container"
      role="img"
      aria-label="Interactive 3D technological core responding to cursor movement"
    />
  );
}
