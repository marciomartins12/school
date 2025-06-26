// Importa o Three.js

import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.165.0/three.module.min.js';
document.addEventListener('DOMContentLoaded', function () {
   
    toggleLoginFields();

    // --- Lógica do Three.js para o Fundo 3D ---
    const canvas = document.getElementById('background-canvas');
    let scene, camera, renderer, particles;
    let mouseX = 0, mouseY = 0;

    function initThreeJS() {
        scene = new THREE.Scene();
        scene.background = null;

        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 2;

        renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        const geometry = new THREE.BoxGeometry(0.15, 0.15, 0.15);

        particles = new THREE.Group();
        const numParticles = 100;

        for (let i = 0; i < numParticles; i++) {
            // Criação de textura com letra
            const canvasSize = 64;
            const canvasTex = document.createElement('canvas');
            canvasTex.width = canvasTex.height = canvasSize;

            const ctx = canvasTex.getContext('2d');
            ctx.fillStyle = '#038';
            ctx.fillRect(0, 0, canvasSize, canvasSize);

            ctx.font = 'bold 32px sans-serif';
            ctx.fillStyle = '#fff';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // A-Z
            ctx.fillText(letter, canvasSize / 2, canvasSize / 2);

            const texture = new THREE.CanvasTexture(canvasTex);
            const material = new THREE.MeshBasicMaterial({ map: texture });

            const particle = new THREE.Mesh(geometry, material);
            particle.position.x = (Math.random() - 0.5) * 10;
            particle.position.y = (Math.random() - 0.5) * 10;
            particle.position.z = (Math.random() - 0.5) * 10;

            particle.userData.velocity = new THREE.Vector3(
                (Math.random() - 0.5) * 0.005,
                (Math.random() - 0.5) * 0.005,
                (Math.random() - 0.5) * 0.005
            );

            particles.add(particle);
        }

        scene.add(particles);
        animateThreeJS();
    }

    function animateThreeJS() {
        requestAnimationFrame(animateThreeJS);

        particles.children.forEach(particle => {
            particle.position.add(particle.userData.velocity);

            if (particle.position.x > 5 || particle.position.x < -5) particle.position.x *= -1;
            if (particle.position.y > 5 || particle.position.y < -5) particle.position.y *= -1;
            if (particle.position.z > 5 || particle.position.z < -5) particle.position.z *= -1;

            particle.rotation.x += 0.01;
            particle.rotation.y += 0.01;
        });

        camera.position.x += (mouseX * 0.005 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 0.005 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = (event.clientY / window.innerHeight) * 2 - 1;
    });

    initThreeJS();
});

// --- Lógica de Toggle de Campos (mantida) ---
function toggleLoginFields() {
    const accountType = document.getElementById('account-type').value;
    const alunoFields = document.getElementById('aluno-fields');
    const professorFields = document.getElementById('professor-fields');
    const adminFields = document.getElementById('admin-fields');
    const cantinaFields = document.getElementById('cantina-fields');

    alunoFields.classList.add('hidden');
    professorFields.classList.add('hidden');
    adminFields.classList.add('hidden');
    cantinaFields.classList.add('hidden');

    if (accountType === 'aluno') {
        alunoFields.classList.remove('hidden');
    } else if (accountType === 'professor') {
        professorFields.classList.remove('hidden');
    } else if (accountType === 'admin') {
        adminFields.classList.remove('hidden');
    } else if (accountType === 'cantina') {
        cantinaFields.classList.remove('hidden');
    }
}
