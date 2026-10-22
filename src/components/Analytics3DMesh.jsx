import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function Analytics3DMesh({ isDark, selectedDistrict, onSelectDistrict }) {
  const mountRef = useRef(null);

  const districtsData = [
    { name: 'Visakhapatnam', calls: 3840, height: 3.4, color: 0x6366f1, x: -2.2, z: -1.2 },
    { name: 'Vijayawada', calls: 4120, height: 3.8, color: 0x06b6d4, x: 0.0, z: -1.8 },
    { name: 'Guntur', calls: 2950, height: 2.7, color: 0x10b981, x: 2.2, z: -0.8 },
    { name: 'Prakasam', calls: 1870, height: 1.9, color: 0xf59e0b, x: -1.2, z: 1.4 },
    { name: 'Tirupati', calls: 2430, height: 2.4, color: 0xa78bfa, x: 1.4, z: 1.2 }
  ];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer, scene, camera, animationFrameId;
    let gridGroup, pillarMeshes = [];
    let isDragging = false;
    let prevMouseX = 0, prevMouseY = 0;
    let rotX = 0.5, rotY = -0.4;
    let targetRotX = 0.5, targetRotY = -0.4;

    try {
      scene = new THREE.Scene();
      const width = container.clientWidth || 460;
      const height = container.clientHeight || 260;

      camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
      camera.position.set(0, 4.5, 7.5);
      camera.lookAt(0, 0, 0);

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
      const ambientLight = new THREE.AmbientLight(isDark ? 0x1e293b : 0xf8fafc, 1.6);
      scene.add(ambientLight);

      const light1 = new THREE.PointLight(0x6366f1, isDark ? 4.0 : 2.5, 30);
      light1.position.set(4, 6, 4);
      scene.add(light1);

      const light2 = new THREE.PointLight(0x06b6d4, isDark ? 3.5 : 2.0, 30);
      light2.position.set(-4, 3, -4);
      scene.add(light2);

      gridGroup = new THREE.Group();
      scene.add(gridGroup);

      // 3D Wireframe Plane Grid
      const gridHelper = new THREE.GridHelper(7, 14, isDark ? 0x6366f1 : 0x4f46e5, isDark ? 0x334155 : 0xe2e8f0);
      gridHelper.position.y = -0.01;
      gridGroup.add(gridHelper);

      // Create 3D District Volume Pillars
      districtsData.forEach((d) => {
        const isCurrent = selectedDistrict === d.name;
        const pillarGeo = new THREE.BoxGeometry(0.7, d.height, 0.7);
        const pillarMat = new THREE.MeshStandardMaterial({
          color: d.color,
          roughness: 0.25,
          metalness: 0.65,
          transparent: true,
          opacity: isCurrent ? 0.95 : 0.75,
          emissive: d.color,
          emissiveIntensity: isCurrent ? 0.5 : 0.2
        });
        const mesh = new THREE.Mesh(pillarGeo, pillarMat);
        mesh.position.set(d.x, d.height / 2, d.z);
        gridGroup.add(mesh);

        // Edges wireframe highlight
        const edges = new THREE.EdgesGeometry(pillarGeo);
        const line = new THREE.LineSegments(
          edges, 
          new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: isCurrent ? 0.8 : 0.4 })
        );
        mesh.add(line);

        pillarMeshes.push({ mesh, data: d });
      });

      // Controls
      const handleMouseDown = (e) => {
        isDragging = true;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      };

      const handleMouseMove = (e) => {
        if (isDragging) {
          const deltaX = e.clientX - prevMouseX;
          const deltaY = e.clientY - prevMouseY;
          targetRotY += deltaX * 0.007;
          targetRotX = Math.max(0.1, Math.min(1.2, targetRotX + deltaY * 0.007));
          prevMouseX = e.clientX;
          prevMouseY = e.clientY;
        }
      };

      const handleMouseUp = () => {
        isDragging = false;
      };

      container.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        if (!isDragging) {
          targetRotY += 0.002; // slow drift
        }
        rotX += (targetRotX - rotX) * 0.08;
        rotY += (targetRotY - rotY) * 0.08;

        gridGroup.rotation.x = rotX;
        gridGroup.rotation.y = rotY;

        renderer.render(scene, camera);
      };

      animate();

      const handleResize = () => {
        if (!container) return;
        const w = container.clientWidth || 460;
        const h = container.clientHeight || 260;
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
        window.removeEventListener('resize', handleResize);
        if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    } catch (err) {
      console.warn('3D Analytics Mesh fallback:', err);
    }
  }, [isDark, selectedDistrict]);

  return (
    <div className="analytics-3d-mesh-box">
      <div className="mesh-top-bar">
        <span className="badge badge-indigo">Three.js Spatial Terrain</span>
        <span className="mesh-hint">Interactive 3D District Incident Columns (Drag to Rotate)</span>
      </div>
      <div ref={mountRef} className="mesh-canvas-stage" />
      <div className="mesh-district-legend">
        {districtsData.map(d => (
          <button 
            key={d.name}
            type="button" 
            className={`mesh-legend-item ${selectedDistrict === d.name ? 'active' : ''}`}
            onClick={() => onSelectDistrict && onSelectDistrict(d.name)}
          >
            <span className="mesh-legend-dot" style={{ backgroundColor: `#${d.color.toString(16).padStart(6, '0')}` }} />
            <span className="mesh-legend-name">{d.name}</span>
            <span className="mesh-legend-num">({d.calls.toLocaleString()})</span>
          </button>
        ))}
      </div>
    </div>
  );
}
