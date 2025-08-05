// Music Control
const music = document.getElementById('background-music');
const musicToggleButtons = document.querySelectorAll('.music-toggle');
let isPlaying = false;

function toggleMusic() {
    if (isPlaying) {
        music.pause();
        musicToggleButtons.forEach(btn => btn.textContent = 'Play Music');
    } else {
        music.play().catch(e => console.log('Music play failed:', e));
        musicToggleButtons.forEach(btn => btn.textContent = 'Pause Music');
    }
    isPlaying = !isPlaying;
}

// Auto-play music on page load
document.addEventListener('DOMContentLoaded', () => {
    music.play().then(() => {
        isPlaying = true;
        musicToggleButtons.forEach(btn => btn.textContent = 'Pause Music');
    }).catch(e => console.log('Auto-play failed:', e));
});

// Timeline Animation
const timelineItems = document.querySelectorAll('.timeline-item');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // Trigger confetti for birthday item
            if (entry.target.classList.contains('birthday-item')) {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#d81b60', '#f06292', '#fce4ec']
                });
            }
            // Auto-play video for timeline entry 3.5 (only once)
            if (
                entry.target.querySelector('video') &&
                !entry.target.querySelector('video').hasAttribute('data-played')
            ) {
                const video = entry.target.querySelector('video');
                video.play().catch(() => {});
                video.setAttribute('data-played', 'true');
            }
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

timelineItems.forEach(item => observer.observe(item));

// Love Letter Animation
function revealLetter() {
    const letterText = document.getElementById('letter-text');
    const letterContainer = document.getElementById('love-letter');
    // Customize your letter here
    const fullText = `My love, Zinhle,\n\nFrom the moment we met, you've been the light in my life. Every call, every message, every shared laugh across the miles has made me fall deeper for you. Today, on your birthday, I want you to know that you're my everything. Here's to celebrating you today and always.\nI love you!\n\nForever Yours,\nGrace`;
    
    letterContainer.classList.add('show');
    let i = 0;
    letterText.textContent = '';
    function typeWriter() {
        if (i < fullText.length) {
            letterText.textContent += fullText.charAt(i);
            i++;
            setTimeout(typeWriter, 50); // Adjust speed of typing
        }
    }
    typeWriter();
}

// Modal for Images
const imageModal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const modalCaption = document.getElementById('modal-caption');

function openModal(imageSrc, caption) {
    modalImage.src = imageSrc;
    modalCaption.textContent = caption;
    imageModal.style.display = 'flex';
}

function closeModal() {
    imageModal.style.display = 'none';
}

// Modal for Surprise Message
const surpriseModal = document.getElementById('surprise-modal');

function openSurpriseModal() {
    surpriseModal.style.display = 'flex';
}

function closeSurpriseModal() {
    surpriseModal.style.display = 'none';
}

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === imageModal) closeModal();
    if (e.target === surpriseModal) closeSurpriseModal();
});

// Heart Particles
particlesJS('particles-js', {
    particles: {
        number: { value: 20, density: { enable: true, value_area: 800 } },
        color: { value: '#d81b60' },
        shape: { type: 'image', image: { src: 'pictures!/heart.png', width: 100, height: 100 } },
        opacity: { value: 0.5, random: true },
        size: { value: 20, random: true },
        line_linked: { enable: false },
        move: { enable: true, speed: 2, direction: 'none', random: true, out_mode: 'out' }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: { enable: true, mode: 'repulse' },
            onclick: { enable: true, mode: 'push' },
            resize: true
        },
        modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
    }
});

// Show particles only on hover for specific elements
const interactiveElements = document.querySelectorAll('.welcome-text, .timeline-content img');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        document.getElementById('particles-js').style.opacity = 1;
    });
    el.addEventListener('mouseleave', () => {
        document.getElementById('particles-js').style.opacity = 0;
    });
});