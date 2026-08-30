import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const skillsList = [
  { name: "React", url: "/Images/stack/React.png", color: "#61DAFB" },
  { name: "Next.js", url: "/Images/stack/NextJsCircle.png", color: "#222222" },
  { name: "Node.js", url: "/Images/stack/NodeJs.svg", color: "#339933" },
  { name: "Express", url: "/Images/stack/Express.png", color: "#2d3748" },
  { name: "MongoDB", url: "/Images/stack/MongoDB.svg", color: "#47A248" },
  { name: "JS", url: "/Images/stack/Javascript.svg", color: "#F7DF1E" },
  { name: "TS", url: "/Images/stack/Typescript.svg", color: "#3178C6" },
  { name: "Git", url: "/Images/stack/Git.svg", color: "#F05032" },
  { name: "GitHub", url: "/Images/stack/Github.svg", color: "#181717" },
  { name: "Vercel", url: "/Images/stack/Vercel.svg", color: "#111111" },
  { name: "Tailwind", url: "/Images/stack/Tailwind.png", color: "#38B2AC" },
  { name: "CSS", url: "/Images/stack/CSS.png", color: "#1572B6" },
  { name: "HTML", url: "/Images/stack/HTML.png", color: "#E34F26" },
  { name: "Python", url: "", color: "#3776AB" },
  { name: "C++", url: "", color: "#00599C" },
  { name: "Java", url: "", color: "#5382A1" },
  { name: "SQL", url: "", color: "#00758F" },
  { name: "GCP", url: "", color: "#4285F4" },
  { name: "AWS", url: "", color: "#FF9900" },
  { name: "Azure", url: "", color: "#0078D4" },
  { name: "Angular", url: "", color: "#DD0031" },
  { name: "Django", url: "", color: "#092E20" },
  { name: "Postman", url: "", color: "#FF6C37" },
  { name: "JWT", url: "", color: "#A855F7" },
  { name: "RBAC", url: "", color: "#FF3A5C" }
];

export default function TechStackCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Dimensions
    let width = canvas.clientWidth || 800;
    let height = canvas.clientHeight || 500;
    if (width < 100) {
      width = canvas.parentElement ? canvas.parentElement.clientWidth : 800;
    }
    if (height < 100) {
      height = 500;
    }

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(32.5, width / height, 1, 100);
    camera.position.z = 20;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 2);
    spotLight.position.set(20, 20, 25);
    spotLight.angle = 0.2;
    spotLight.penumbra = 1;
    spotLight.castShadow = true;
    scene.add(spotLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(0, 5, -4);
    scene.add(dirLight);

    // Procedural text texture
    function createDynamicTexture(name, logoUrl, brandColor) {
      const size = 256;
      const canvasTex = document.createElement("canvas");
      canvasTex.width = size;
      canvasTex.height = size;
      const ctx = canvasTex.getContext("2d");

      const drawSphereBackground = () => {
        const gradient = ctx.createRadialGradient(size / 3, size / 3, 10, size / 2, size / 2, size / 2);
        gradient.addColorStop(0, "#ffffff");
        gradient.addColorStop(0.8, "#eaeaea");
        gradient.addColorStop(1, "#c8c8cc");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);

        ctx.strokeStyle = "rgba(0, 0, 0, 0.05)";
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2 - 6, 0, Math.PI * 2);
        ctx.stroke();
      };

      drawSphereBackground();

      ctx.font = "bold 44px 'Space Grotesk', 'Outfit', 'Segoe UI', sans-serif";
      ctx.fillStyle = brandColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      let displayWord = name;
      const lower = name.toLowerCase();
      if (lower === "javascript") displayWord = "JS";
      else if (lower === "typescript") displayWord = "TS";
      else if (lower === "googlecloud") displayWord = "GCP";
      else if (lower === "amazonwebservices") displayWord = "AWS";
      else if (lower === "mongodb") displayWord = "Mongo";
      else if (lower === "cplusplus") displayWord = "C++";
      else if (lower === "jwt") displayWord = "JWT";
      else if (lower === "rbac") displayWord = "RBAC";

      ctx.fillText(displayWord, size / 2, size / 2);

      const texture = new THREE.CanvasTexture(canvasTex);
      texture.minFilter = THREE.LinearFilter;
      texture.needsUpdate = true;

      if (logoUrl) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          ctx.clearRect(0, 0, size, size);
          drawSphereBackground();
          const scale = 0.6;
          const imgSize = size * scale;
          const offset = (size - imgSize) / 2;
          ctx.drawImage(img, offset, offset, imgSize, imgSize);
          texture.needsUpdate = true;
        };
        img.onerror = () => {
          console.warn(`Failed loading image logo for ${name}. Keeping text fallback.`);
        };
        img.src = logoUrl;
      }

      return texture;
    }

    const materials = skillsList.map(skill => {
      const tex = createDynamicTexture(skill.name, skill.url, skill.color);
      return new THREE.MeshPhysicalMaterial({
        map: tex,
        emissive: 0xffffff,
        emissiveMap: tex,
        emissiveIntensity: 0.15,
        metalness: 0.25,
        roughness: 0.35,
        clearcoat: 0.3,
        clearcoatRoughness: 0.1
      });
    });

    const spheresCount = 30;
    const spheres = [];
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const randSpread = (range) => (Math.random() - 0.5) * range;

    for (let i = 0; i < spheresCount; i++) {
      const scale = [0.65, 0.75, 0.85, 0.95, 1.05][Math.floor(Math.random() * 5)];
      const material = materials[i % materials.length];
      
      const mesh = new THREE.Mesh(sphereGeometry, material);
      mesh.scale.setScalar(scale);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.position.set(randSpread(10), randSpread(10), randSpread(4));
      
      const body = {
        mesh: mesh,
        radius: scale,
        position: mesh.position,
        velocity: new THREE.Vector3(randSpread(1), randSpread(1), randSpread(1)),
        mass: scale * scale * scale
      };

      scene.add(mesh);
      spheres.push(body);
    }

    // Pointer tracking variables
    const pointerPos = new THREE.Vector3(100, 100, 100);
    const pointerRadius = 1.8;
    let isMouseOver = false;
    const tempV = new THREE.Vector3();

    const updatePointer = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((clientY - rect.top) / rect.height) * 2 + 1;
      
      tempV.set(x, y, 0.5);
      tempV.unproject(camera);
      const dir = tempV.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      pointerPos.copy(camera.position).add(dir.multiplyScalar(distance));
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      if (
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top && e.clientY <= rect.bottom
      ) {
        isMouseOver = true;
        updatePointer(e.clientX, e.clientY);
      } else {
        isMouseOver = false;
        pointerPos.set(100, 100, 100);
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        if (
          touch.clientX >= rect.left && touch.clientX <= rect.right &&
          touch.clientY >= rect.top && touch.clientY <= rect.bottom
        ) {
          isMouseOver = true;
          updatePointer(touch.clientX, touch.clientY);
        } else {
          isMouseOver = false;
          pointerPos.set(100, 100, 100);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    let isCanvasActive = true;
    let hasFlownIn = false;

    const triggerFlyIn = () => {
      spheres.forEach(b => {
        b.position.set(16 + Math.random() * 8, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 4);
        b.velocity.set(-8 - Math.random() * 8, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 2);
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isCanvasActive = entry.isIntersecting;
        if (entry.isIntersecting && !hasFlownIn) {
          hasFlownIn = true;
          triggerFlyIn();
        } else if (!entry.isIntersecting) {
          hasFlownIn = false;
        }
      });
    }, { threshold: 0.15 });
    observer.observe(canvas);

    // Physics boundaries & gravity Center
    const gravityCenter = new THREE.Vector3(0, 0, 0);
    let boundaryX = 8;
    let boundaryY = 5;
    const boundaryZ = 4;
    const clock = new THREE.Clock();

    const updateBoundaries = () => {
      const vFOV = (camera.fov * Math.PI) / 180;
      const heightAtZ0 = 2 * Math.tan(vFOV / 2) * camera.position.z;
      const widthAtZ0 = heightAtZ0 * camera.aspect;
      boundaryY = heightAtZ0 / 2 - 0.8;
      boundaryX = widthAtZ0 / 2 - 0.8;
    };
    updateBoundaries();

    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      let delta = clock.getDelta();
      delta = Math.min(0.05, delta);

      // 1. Group attraction & Pointer collision
      for (let i = 0; i < spheresCount; i++) {
        const b = spheres[i];
        const toCenter = tempV.copy(gravityCenter).sub(b.position);
        toCenter.normalize();
        b.velocity.add(toCenter.multiplyScalar(3.2 * delta));

        b.velocity.x += (Math.random() - 0.5) * 0.22 * delta;
        b.velocity.y += (Math.random() - 0.5) * 0.22 * delta;
        b.velocity.z += (Math.random() - 0.5) * 0.12 * delta;

        if (isMouseOver) {
          const toPointer = tempV.copy(b.position).sub(pointerPos);
          const distToPointer = toPointer.length();
          const minDist = b.radius + pointerRadius;
          if (distToPointer < minDist) {
            toPointer.normalize();
            const pushForce = (minDist - distToPointer) * 32 * delta;
            b.velocity.add(toPointer.multiplyScalar(pushForce));
            const overlap = minDist - distToPointer;
            b.position.add(toPointer.multiplyScalar(overlap * 0.25));
          }
        }

        b.velocity.multiplyScalar(0.975);
        b.position.addScaledVector(b.velocity, delta * 10);
        b.mesh.rotation.x += 0.004;
        b.mesh.rotation.y += 0.004;
      }

      // 2. Pairwise ball-to-ball collisions
      for (let i = 0; i < spheresCount; i++) {
        const bA = spheres[i];
        for (let j = i + 1; j < spheresCount; j++) {
          const bB = spheres[j];
          const collisionVec = tempV.copy(bB.position).sub(bA.position);
          const dist = collisionVec.length();
          const minDist = bA.radius + bB.radius;
          if (dist < minDist) {
            collisionVec.normalize();
            const overlap = minDist - dist;
            const totalMass = bA.mass + bB.mass;
            const ratioA = bB.mass / totalMass;
            const ratioB = bA.mass / totalMass;
            bA.position.addScaledVector(collisionVec, -overlap * ratioA);
            bB.position.addScaledVector(collisionVec, overlap * ratioB);

            const relVelocity = new THREE.Vector3().copy(bB.velocity).sub(bA.velocity);
            const velAlongNormal = relVelocity.dot(collisionVec);
            if (velAlongNormal < 0) {
              const restitution = 0.45;
              const impulseScalar = -(1 + restitution) * velAlongNormal / totalMass;
              bA.velocity.addScaledVector(collisionVec, -bB.mass * impulseScalar);
              bB.velocity.addScaledVector(collisionVec, bA.mass * impulseScalar);
            }
          }
        }
      }

      // 3. Constrain balls inside screen borders
      for (let i = 0; i < spheresCount; i++) {
        const b = spheres[i];
        if (b.position.x < -boundaryX + b.radius) {
          b.position.x = -boundaryX + b.radius;
          b.velocity.x *= -0.5;
        } else if (b.position.x > boundaryX - b.radius) {
          b.position.x = boundaryX - b.radius;
          b.velocity.x *= -0.5;
        }
        if (b.position.y < -boundaryY + b.radius) {
          b.position.y = -boundaryY + b.radius;
          b.velocity.y *= -0.5;
        } else if (b.position.y > boundaryY - b.radius) {
          b.position.y = boundaryY - b.radius;
          b.velocity.y *= -0.5;
        }
        if (b.position.z < -boundaryZ + b.radius) {
          b.position.z = -boundaryZ + b.radius;
          b.velocity.z *= -0.5;
        } else if (b.position.z > boundaryZ - b.radius) {
          b.position.z = boundaryZ - b.radius;
          b.velocity.z *= -0.5;
        }
      }

      renderer.render(scene, camera);
    };

    const handleResize = () => {
      const newWidth = canvas.clientWidth;
      const newHeight = canvas.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight, false);
      updateBoundaries();
    };

    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      // clean up WebGL
      renderer.dispose();
      sphereGeometry.dispose();
      materials.forEach(m => {
        if (m.map) m.map.dispose();
        m.dispose();
      });
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      id="techstack-canvas" 
      style={{ 
        width: "100%", 
        height: "400px", 
        marginTop: "24px", 
        borderRadius: "12px", 
        background: "rgba(0, 0, 0, 0.2)", 
        border: "1px solid rgba(255, 255, 255, 0.05)",
        display: "block" 
      }} 
    />
  );
}
