document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        dot.style.left = `${posX}px`;
        dot.style.top = `${posY}px`;

        outline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Cursor interaction
    const links = document.querySelectorAll('button, .image-container');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            outline.style.transform = 'scale(1.5)';
            outline.style.backgroundColor = 'rgba(255, 77, 109, 0.1)';
        });
        link.addEventListener('mouseleave', () => {
            outline.style.transform = 'scale(1)';
            outline.style.backgroundColor = 'transparent';
        });
    });

    // Scroll Progress Bar
    const progressBar = document.querySelector('.progress-bar');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    });

    // Scroll Reveal Logic (Advanced Staggered Reveal)
    const revealElements = document.querySelectorAll('[data-reveal]');
    const revealOnScroll = () => {
        revealElements.forEach((el, index) => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top < windowHeight * 0.9) {
                setTimeout(() => {
                    el.classList.add('revealed');
                }, index * 100);
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Runaway "NO" Button Logic
    const noBtn = document.getElementById('noBtn');
    const moveButton = () => {
        const randomX = Math.random() * (window.innerWidth - 150);
        const randomY = Math.random() * (window.innerHeight - 80);

        noBtn.style.position = 'fixed';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        noBtn.style.zIndex = '1000';
        noBtn.style.transition = 'all 0.2s cubic-bezier(0.23, 1, 0.32, 1)';
    };

    noBtn.addEventListener('mouseover', moveButton);
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveButton();
    });

    // "YES" Button Celebration
    const yesBtn = document.getElementById('yesBtn');
    const successOverlay = document.getElementById('success-overlay');

    yesBtn.addEventListener('click', () => {
        successOverlay.classList.remove('hidden');
        setTimeout(() => {
            successOverlay.classList.add('visible');
            triggerConfetti();
        }, 10);
    });

    function triggerConfetti() {
        const duration = 15 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 45, spread: 360, ticks: 100, zIndex: 6000, colors: ['#ff4d6d', '#ff758f', '#ffccd5'] };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 60 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    }

    // 3D Tilt Effect for Photo Cards
    const cards = document.querySelectorAll('.image-container');
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice) {
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
            });
        });
    }

    // Sparkle Trail
    const spawnSparkle = (x, y) => {
        if (Math.random() > 0.1) return;
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 800);
    };

    window.addEventListener('mousemove', (e) => spawnSparkle(e.clientX, e.clientY));
    window.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        spawnSparkle(touch.clientX, touch.clientY);
    });

    // Love Letter Reveal
    const envelope = document.getElementById('envelope');
    if (envelope) {
        const toggleEnvelope = () => envelope.classList.toggle('open');
        envelope.addEventListener('click', toggleEnvelope);
        envelope.addEventListener('touchstart', (e) => {
            e.preventDefault();
            toggleEnvelope();
        });
    }

    // Floating Hearts Background
    const createHeart = () => {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '110vh';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heart.style.opacity = Math.random() * 0.5 + 0.2;
        heart.style.zIndex = '-1';
        heart.style.pointerEvents = 'none';
        heart.style.transition = `transform ${Math.random() * 10 + 10}s linear, top ${Math.random() * 10 + 10}s linear`;

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.style.top = '-10vh';
            heart.style.transform = `translateX(${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg)`;
        }, 100);

        setTimeout(() => {
            heart.remove();
        }, 20000);
    };

    setInterval(createHeart, 800);

    // --- CINEMATIC ENHANCEMENTS ---

    // 1. Cinematic Intro & Typewriter
    const introScreen = document.getElementById('intro-screen');
    const typewriter = document.getElementById('typewriter');
    const introText = "It all started with a smile… and now it's our forever story. ❤️";
    let textIndex = 0;

    const typeEffect = () => {
        if (textIndex < introText.length) {
            typewriter.textContent += introText.charAt(textIndex);
            textIndex++;
            setTimeout(typeEffect, 70);
        } else {
            setTimeout(() => {
                introScreen.classList.add('fade-out');
                document.body.classList.remove('is-loading');
            }, 1500);
        }
    };

    // Start intro after a small delay
    setTimeout(typeEffect, 1000);

    // 2. Background Music Logic
    const musicBtn = document.getElementById('music-btn');
    const bgMusic = document.getElementById('bg-music');
    let isPlaying = false;

    if (musicBtn && bgMusic) {
        // Function to unlock audio (required by modern browsers)
        const unlockAudio = () => {
            if (bgMusic.paused && !isPlaying) {
                // Just prepare it without playing
                bgMusic.play().then(() => {
                    bgMusic.pause();
                    bgMusic.currentTime = 0;
                }).catch(() => { });
            }
            window.removeEventListener('click', unlockAudio);
            window.removeEventListener('touchstart', unlockAudio);
        };

        window.addEventListener('click', unlockAudio);
        window.addEventListener('touchstart', unlockAudio);

        musicBtn.addEventListener('click', () => {
            if (isPlaying) {
                bgMusic.pause();
                musicBtn.innerHTML = '<span class="music-icon">🎵</span>';
                musicBtn.style.background = 'rgba(255, 255, 255, 0.4)';
            } else {
                bgMusic.play().catch(e => {
                    // If play still fails, we just don't alert, 
                    // most users will naturally click again or have interacted by now
                    console.log("Play failed, interaction needed.");
                });
                musicBtn.innerHTML = '<span class="music-icon">⏸️</span>';
                musicBtn.style.background = 'var(--primary)';
            }
            isPlaying = !isPlaying;
        });

        // Add cursor interaction for music button
        musicBtn.addEventListener('mouseenter', () => {
            outline.style.transform = 'scale(1.5)';
            outline.style.backgroundColor = 'rgba(255, 77, 109, 0.1)';
        });
        musicBtn.addEventListener('mouseleave', () => {
            outline.style.transform = 'scale(1)';
            outline.style.backgroundColor = 'transparent';
        });
    }

    // 3. Scroll-based Timeline Reveal
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });

    timelineItems.forEach(item => timelineObserver.observe(item));

    // 4. Easter Eggs
    let clickCount = 0;
    const secretModal = document.getElementById('secret-message');
    const proposalModal = document.getElementById('proposal-modal');

    // Click anywhere 10 times
    window.addEventListener('click', (e) => {
        if (e.target.closest('button') || e.target.closest('.modal')) return;

        clickCount++;
        if (clickCount === 10) {
            if (secretModal) secretModal.classList.remove('hidden');
            clickCount = 0;
        }
    });

    // Press "L" key
    window.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'l') {
            if (proposalModal) proposalModal.classList.remove('hidden');
        }
    });

    // Modal Close Logic
    const closeBtns = document.querySelectorAll('.btn-close');
    closeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const modal = btn.closest('.modal');
            if (modal) {
                modal.classList.add('hidden');
            } else {
                // Fallback for both modals
                const sm = document.getElementById('secret-message');
                const pm = document.getElementById('proposal-modal');
                if (sm) sm.classList.add('hidden');
                if (pm) pm.classList.add('hidden');
            }
        });

        btn.addEventListener('mouseenter', () => {
            outline.style.transform = 'scale(1.5)';
            outline.style.backgroundColor = 'rgba(255, 77, 109, 0.1)';
        });
        btn.addEventListener('mouseleave', () => {
            outline.style.transform = 'scale(1)';
            outline.style.backgroundColor = 'transparent';
        });
    });

    // Close on click outside modal content
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    });

    // Initial check
    revealOnScroll();
});
