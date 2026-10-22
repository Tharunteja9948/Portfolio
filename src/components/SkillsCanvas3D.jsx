import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function SkillsCanvas3D({ isDark, onSelectSkill }) {
  const mountRef = useRef(null);
  const [activeNodeName, setActiveNodeName] = useState('Python');

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer, scene, camera, animationFrameId;
    let constellationGroup, coreMesh, orbitalRings = [], nodeMeshes = [];
    let isDragging = false;
    let prevMouseX = 0, prevMouseY = 0;
    let rotX = 0.2, rotY = 0.3;
    let targetRotX = 0.2, targetRotY = 0.3;

    try {
      scene = new THREE.Scene();
      const width = container.clientWidth || 380;
      const height = container.clientHeight || 380;

      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.z = 7.5;

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      container.innerHTML = '';
      container.appendChild(renderer.domElement);

      // Lighting
      const ambientLight = new THREE.AmbientLight(isDark ? 0x242d45 : 0xf8fafc, 1.8);
      scene.add(ambientLight);

      const lightIndigo = new THREE.PointLight(0x6366f1, isDark ? 4.5 : 3.0, 40);
      lightIndigo.position.set(4, 4, 4);
      scene.add(lightIndigo);

      const lightCyan = new THREE.PointLight(0x06b6d4, isDark ? 4.0 : 2.5, 40);
      lightCyan.position.set(-4, -4, 4);
      scene.add(lightCyan);

      constellationGroup = new THREE.Group();
      scene.add(constellationGroup);

      // Core Geometric Icosahedron Wireframe
      const coreGeo = new THREE.IcosahedronGeometry(1.2, 1);
      const coreMat = new THREE.MeshStandardMaterial({
        color: isDark ? 0x6366f1 : 0x4f46e5,
        wireframe: true,
        transparent: true,
        opacity: isDark ? 0.45 : 0.35,
        roughness: 0.2,
        metalness: 0.8
      });
      coreMesh = new THREE.Mesh(coreGeo, coreMat);
      constellationGroup.add(coreMesh);

      // Inner glowing core
      const innerGeo = new THREE.SphereGeometry(0.7, 16, 16);
      const innerMat = new THREE.MeshStandardMaterial({
        color: isDark ? 0x818cf8 : 0x6366f1,
        emissive: isDark ? 0x4338ca : 0x6366f1,
        emissiveIntensity: 0.5,
        roughness: 0.3,
        transparent: true,
        opacity: 0.85
      });
      const innerMesh = new THREE.Mesh(innerGeo, innerMat);
      constellationGroup.add(innerMesh);

      // 3 Gyroscopic Orbital Rings
      const ringRadii = [2.0, 2.5, 2.9];
      const ringRotations = [
        [Math.PI / 4, 0, 0],
        [0, Math.PI / 3, Math.PI / 6],
        [-Math.PI / 5, Math.PI / 4, 0]
      ];

      ringRadii.forEach((r, idx) => {
        const ringGeo = new THREE.RingGeometry(r - 0.015, r + 0.015, 64);
        const ringMat = new THREE.MeshBasicMaterial({
          color: idx === 0 ? 0x6366f1 : idx === 1 ? 0x06b6d4 : 0x10b981,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: isDark ? 0.35 : 0.25
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.set(...ringRotations[idx]);
        constellationGroup.add(ring);
        orbitalRings.push({ mesh: ring, rotSpeed: (idx + 1) * 0.003 * (idx % 2 === 0 ? 1 : -1) });
      });

      // Orbiting Skill Nodes (Python, SQL, Django, REST APIs, EDA, Git)
      const skillsData = [
        { name: 'Python', color: 0x38bdf8, size: 0.32, dist: 2.1, speed: 0.018, angle: 0 },
        { name: 'SQL / MySQL', color: 0x818cf8, size: 0.28, dist: 2.5, speed: -0.014, angle: 1.2 },
        { name: 'Django', color: 0x34d399, size: 0.27, dist: 2.0, speed: 0.016, angle: 2.4 },
        { name: 'Data Analytics', color: 0xf59e0b, size: 0.30, dist: 2.8, speed: -0.012, angle: 3.6 },
        { name: 'REST APIs', color: 0xa78bfa, size: 0.26, dist: 2.4, speed: 0.015, angle: 4.8 },
        { name: 'Git & GitHub', color: 0xf43f5e, size: 0.25, dist: 2.9, speed: -0.013, angle: 5.6 }
      ];

      skillsData.forEach((s) => {
        const nodeGeo = new THREE.DodecahedronGeometry(s.size, 0);
        const nodeMat = new THREE.MeshStandardMaterial({
          color: s.color,
          emissive: s.color,
          emissiveIntensity: 0.45,
          roughness: 0.2,
          metalness: 0.7
        });
        const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
        constellationGroup.add(nodeMesh);
        nodeMeshes.push({
          mesh: nodeMesh,
          ...s
        });
      });

      // Mouse drag rotation controls
      const handleMouseDown = (e) => {
        isDragging = true;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      };

      const handleMouseMove = (e) => {
        if (isDragging) {
          const deltaX = e.clientX - prevMouseX;
          const deltaY = e.clientY - prevMouseY;
          targetRotY += deltaX * 0.008;
          targetRotX += deltaY * 0.008;
          prevMouseX = e.clientX;
          prevMouseY = e.clientY;
        }
      };

      const handleMouseUp = () => {
        isDragging = false;
      };

      // Raycaster for clicking skill nodes
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      const handleClick = (e) => {
        const rect = container.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(nodeMeshes.map(n => n.mesh));

        if (intersects.length > 0) {
          const hit = nodeMeshes.find(n => n.mesh === intersects[0].object);
          if (hit) {
            setActiveNodeName(hit.name);
            if (onSelectSkill) onSelectSkill(hit.name);
          }
        }
      };

      container.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      container.addEventListener('click', handleClick);

      // Animation Loop
      let clock = new THREE.Clock();

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const delta = clock.getDelta();

        // Smooth damping rotation
        if (!isDragging) {
          targetRotY += 0.005; // Gentle idle spin
        }
        rotX += (targetRotX - rotX) * 0.08;
        rotY += (targetRotY - rotY) * 0.08;

        constellationGroup.rotation.x = rotX;
        constellationGroup.rotation.y = rotY;

        // Core pulsating & rotation
        coreMesh.rotation.x += 0.004;
        coreMesh.rotation.y += 0.006;

        // Orbiting rings
        orbitalRings.forEach(r => {
          r.mesh.rotation.z += r.rotSpeed;
        });

        // Orbiting nodes position updates
        nodeMeshes.forEach(n => {
          n.angle += n.speed;
          n.mesh.position.x = Math.cos(n.angle) * n.dist;
          n.mesh.position.y = Math.sin(n.angle * 1.2) * 0.8;
          n.mesh.position.z = Math.sin(n.angle) * n.dist;
          n.mesh.rotation.x += 0.02;
          n.mesh.rotation.y += 0.03;
        });

        renderer.render(scene, camera);
      };

      animate();

      const handleResize = () => {
        if (!container) return;
        const w = container.clientWidth || 380;
        const h = container.clientHeight || 380;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        cancelAnimationFrame(animationFrameId);
        container.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        container.removeEventListener('click', handleClick);
        window.removeEventListener('resize', handleResize);
        if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    } catch (err) {
      console.warn('3D Skills Canvas fallback:', err);
    }
  }, [isDark, onSelectSkill]);

  return (
    <div className="skills-3d-container">
      <div className="skills-3d-header">
        <span className="skills-3d-pill">
          <span className="live-dot" />
          Interactive 3D Skill Galaxy
        </span>
        <span className="skills-3d-hint">Drag to rotate &middot; Click nodes to inspect</span>
      </div>
      <div ref={mountRef} className="skills-3d-canvas-wrap" />
      <div className="skills-3d-status-bar">
        <span className="skills-3d-focus-lbl">Active Core Orbit:</span>
        <strong className="skills-3d-focus-val gradient-text">{activeNodeName}</strong>
      </div>
    </div>
  );
}
