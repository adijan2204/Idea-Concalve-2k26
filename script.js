/**
 * Innovative Minds PPT Competition 2026
 * Main Logic Script
 */

function toggleTeamFields(show) {
    const teamFields = document.getElementById('teamFields');
    const teamNameInput = document.getElementById('teamName');
    const teamMembersInput = document.getElementById('teamMembers');

    if (show) {
        teamFields.style.display = 'block';
        teamNameInput.setAttribute('required', 'true');
        teamMembersInput.setAttribute('required', 'true');
    } else {
        teamFields.style.display = 'none';
        teamNameInput.removeAttribute('required');
        teamMembersInput.removeAttribute('required');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Countdown Timer
    const targetDate = new Date('March 27, 2026 14:00:00').getTime();

    const updateTimer = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days.toString().padStart(2, '0');
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(timerInterval);
            document.querySelector('.timer').innerHTML = "<h3>Competition Started!</h3>";
        }
    };

    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer();

    // 2. Sticky Header
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(15, 23, 42, 0.95)';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
        } else {
            header.style.background = 'rgba(15, 23, 42, 0.8)';
            header.style.boxShadow = 'none';
        }
    });

    // 3. Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Registration Form Submission
    const registrationForm = document.getElementById('registrationForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');

    // IMPORTANT: Replace this with your Google Apps Script URL
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzcLMFTASR8DqyH0Qc-ymZRW01ZlTYLNkC_k8ogDvRlKaGsAqnRIQJ5TCl8nPRyrsXRKw/exec';

    // COORDINATOR WHATSAPP NUMBER (With Country Code, No Spaces/Punctuation)
    const COORDINATOR_PHONE = '917499032210'; // Defaulting to Aditya's number per earlier chat

    registrationForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        submitBtn.disabled = true;
        submitBtn.innerText = 'Processing...';
        formStatus.innerText = 'Preparing your registration...';
        formStatus.className = 'form-status';

        const formData = new FormData(registrationForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // 1. Format WhatsApp Message
        const messageHeader = `*🚨 New Registration: Innovative Minds 2026 🚨*\n\n`;
        const messageBody =
            `* Name:* ${data.name}\n` +
            `* Branch:* ${data.branch}\n` +
            `* Year:* ${data.year}\n` +
            `* Phone:* ${data.phone}\n` +
            `* Topic:* ${data.topic}\n` +
            `* Type:* ${data.type}${data.teamName ? ` (${data.teamName})` : ''}\n` +
            (data.teamMembers ? `*👥 Members:* ${data.teamMembers}\n` : '') +
            (data.notes ? `*📝 Notes:* ${data.notes}\n` : '') +
            `\n_Sent via GNIET Event Portal_`;

        const waLink = `https://wa.me/${COORDINATOR_PHONE}?text=${encodeURIComponent(messageHeader + messageBody)}`;

        // 2. Optional: Save to Google Sheets (if URL exists)
        if (SCRIPT_URL && SCRIPT_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
            try {
                // We don't 'await' here to ensure the WhatsApp response feels instant
                fetch(SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    cache: 'no-cache',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });
            } catch (error) {
                console.error('Sheet Logging Error:', error);
            }
        }

        // 3. Finalize and Redirect
        formStatus.innerText = 'Success! Opening WhatsApp...';
        formStatus.className = 'form-status success';

        // Use direct assignment to prevent pop-up blockers
        setTimeout(() => {
            window.location.href = waLink;
            submitBtn.disabled = false;
            submitBtn.innerText = 'Submit Registration';
            registrationForm.reset();
        }, 1000);
    });

    // 5. Scroll Reveal Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.animate-up, .about-card, .topic-item, .prize-card, .coordinator-card, .judge-card, .format-card');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 6. Neural Network Animation for Hero
    const initNeuralBg = () => {
        const container = document.getElementById('neural-bg');
        if (!container) return;

        const canvas = document.createElement('canvas');
        container.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        let width, height, particles;
        let mouse = { x: -1000, y: -1000 };

        const resize = () => {
            width = canvas.width = container.offsetWidth;
            height = canvas.height = container.offsetHeight;
            particles = [];

            // Adjust particle density based on screen size
            const particleCount = Math.min((width * height) / 10000, 150);

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    r: Math.random() * 1.5 + 0.5
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // Create a gradient for the lines
            const lineGradient = ctx.createLinearGradient(0, 0, width, height);
            lineGradient.addColorStop(0, 'rgba(99, 102, 241, 0.15)');
            lineGradient.addColorStop(1, 'rgba(34, 211, 238, 0.15)');

            ctx.fillStyle = 'rgba(99, 102, 241, 0.6)';
            ctx.strokeStyle = lineGradient;

            particles.forEach((p, i) => {
                // Mouse interaction: soft push
                const dxMouse = p.x - mouse.x;
                const dyMouse = p.y - mouse.y;
                const distMouse = Math.hypot(dxMouse, dyMouse);

                if (distMouse < 150) {
                    const force = (150 - distMouse) / 150;
                    p.vx += (dxMouse / distMouse) * force * 0.05;
                    p.vy += (dyMouse / distMouse) * force * 0.05;
                }

                // Smooth movement
                p.x += p.vx;
                p.y += p.vy;

                // Friction
                p.vx *= 0.99;
                p.vy *= 0.99;

                // Boundary check with wrapping or bounce
                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();

                // Draw connections
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                    if (dist < 120) {
                        ctx.globalAlpha = 1 - dist / 120;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                }
            });
            requestAnimationFrame(draw);
        };

        window.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = -1000;
            mouse.y = -1000;
        });

        window.addEventListener('resize', resize);
        resize();
        draw();
    };

    initNeuralBg();

    // 7. Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
});
