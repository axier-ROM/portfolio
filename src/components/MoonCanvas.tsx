import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Text } from 'troika-three-text';

interface TextData {
  text: Text;
  originalZ: number;
  phi: number;
  theta: number;
  index: number;
  charTimer: number;
}

const densityChars: Record<number, string[]> = {
  0: ['.', ',', '-', '~', ':', ' '],
  1: ['+', '=', '^', ';', '"', "'"],
  2: ['i', 'l', '!', 't', 'r', 's', 'z', 'c', 'v', 'x', 'j', 'n', 'u', 'y'],
  3: ['o', 'a', 'e', 'd', 'p', 'q', 'b', 'k', 'h', 'd', 'm', 'w', 'f', 'g'],
  4: ['@', '%', '#', '&', '*', 'M', 'W', 'N'],
};

function getRandomChar(displacement: number): string {
  const d = Math.abs(displacement);
  if (d < 0.1) {
    const chars = densityChars[0];
    return chars[Math.floor(Math.random() * chars.length)];
  } else if (d < 0.25) {
    const chars = densityChars[1];
    return chars[Math.floor(Math.random() * chars.length)];
  } else if (d < 0.5) {
    const chars = densityChars[2];
    return chars[Math.floor(Math.random() * chars.length)];
  } else if (d < 1.0) {
    const chars = densityChars[3];
    return chars[Math.floor(Math.random() * chars.length)];
  } else {
    const chars = densityChars[4];
    return chars[Math.floor(Math.random() * chars.length)];
  }
}

function fbm(x: number, y: number, z: number): number {
  let value = 0.0;
  let amplitude = 1.0;
  let frequency = 1.0;
  for (let i = 0; i < 4; i++) {
    value += amplitude * Math.sin(x * frequency) * Math.sin(y * frequency) * Math.sin(z * frequency);
    amplitude *= 0.5;
    frequency *= 2.0;
  }
  return value;
}

function getVerticesOnSphere(radius: number): THREE.Vector3[] {
  const geometry = new THREE.IcosahedronGeometry(radius, 24);
  geometry.toNonIndexed();
  const positions = geometry.attributes.position.array;
  const gridSize = Math.PI / 40;
  const spherical = new THREE.Spherical();
  const grid = new Map<string, THREE.Vector3>();

  for (let i = 0; i < positions.length; i += 3) {
    const vertex = new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]);
    spherical.setFromVector3(vertex);
    const row = Math.round(spherical.phi / gridSize);
    const col = Math.round(spherical.theta / gridSize);
    const key = `${row}-${col}`;
    if (!grid.has(key)) {
      grid.set(key, vertex);
    }
  }

  const vertices = Array.from(grid.values());
  geometry.dispose();
  return vertices;
}

const FONT_URL = 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf';
const TEXT_COLOR = '#a0a0a0';
const HIGHLIGHT_COLOR = '#ffffff';
const RADIUS = 5;

export default function MoonCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 18);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Moon group
    const moonGroup = new THREE.Group();
    scene.add(moonGroup);

    // Generate vertices
    const vertices = getVerticesOnSphere(RADIUS);

    // Create text material
    const textMaterial = new THREE.MeshStandardMaterial({
      color: TEXT_COLOR,
      transparent: true,
      opacity: 1.0,
    });

    // Create text sprites
    const textData: TextData[] = [];

    vertices.forEach((vertex, index) => {
      const text = new Text();
      const phi = Math.acos(vertex.y / RADIUS);
      const theta = Math.atan2(vertex.z, vertex.x);

      text.text = getRandomChar(0);
      text.fontSize = 0.12;
      text.color = TEXT_COLOR;
      text.anchor = 'center';
      text.font = FONT_URL;
      text.material = textMaterial;
      text.position.copy(vertex.clone().multiplyScalar(0.99));

      const normal = vertex.clone().normalize();
      text.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
      text.sync();

      moonGroup.add(text);

      const originalZ = text.position.z;

      textData.push({
        text,
        originalZ,
        phi,
        theta,
        index,
        charTimer: Math.random() * 2,
      });
    });

    // Animation loop
    function animate() {
      frameRef.current = requestAnimationFrame(animate);

      textData.forEach((data) => {
        data.charTimer -= 0.016;

        if (data.charTimer <= 0) {
          data.charTimer = 0.5 + Math.random() * 2.0;

          const t = data.text;
          const originalZ = data.originalZ;
          const time = performance.now() * 0.0005;

          const noisePos = new THREE.Vector3(t.position.x, t.position.y, t.position.z);
          noisePos.applyAxisAngle(new THREE.Vector3(0, 1, 0), time);

          const displacement = fbm(noisePos.x * 0.5, noisePos.y * 0.5, noisePos.z * 0.5) * 0.5;
          t.position.z = originalZ + displacement;

          const absDisplacement = Math.abs(displacement);
          t.text = getRandomChar(absDisplacement);
          t.color = absDisplacement > 0.4 ? HIGHLIGHT_COLOR : TEXT_COLOR;
          t.sync();
        }
      });

      moonGroup.rotation.y += 0.001;
      renderer.render(scene, camera);
    }

    animate();

    // Resize handler
    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameRef.current);
      renderer.dispose();
      textData.forEach((d) => {
        d.text.dispose();
      });
      textMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      rendererRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
}
