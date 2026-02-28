 const profile = {
            name: 'Пулат Зафаров',
            role: 'Frontend Developer | Startup Founder',
            location: 'Ташкент, Узбекистан',
            timezone: 'UTC+5',
            telegram: '@zafarovpolat',
            telegramUrl: 'https://t.me/zafarovpolat',
            github: 'github.com/Zafarovpolat',
            githubUrl: 'https://github.com/Zafarovpolat',
            email: 'atuin59354081@gmail.com',
            whatsapp: '+998959738888',
            updated: 'Февраль 2026',
            years: 2,
            headlineRotating: [
                'Building scalable web apps…',
                'React / Next.js / TypeScript…',
                'Telegram Mini Apps • AI integration…',
                'Open to opportunities…'
            ],
            featured: {
                title: 'IshTop.Uz',
                url: 'https://ishtopuz.vercel.app',
            }
        };

        const toast = (msg) => {
            const el = document.getElementById('toast');
            const t = document.getElementById('toastText');
            t.textContent = msg;
            el.classList.remove('hidden');
            clearTimeout(toast._t);
            toast._t = setTimeout(() => el.classList.add('hidden'), 1400);
        };

        const safeCopy = async (text) => {
            try {
                await navigator.clipboard.writeText(text);
                toast('Copied');
            } catch {
                const ta = document.createElement('textarea');
                ta.value = text;
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                document.body.removeChild(ta);
                toast('Copied');
            }
        };

        // Селектор всех фокусируемых элементов внутри модалки
        const FOCUSABLE = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

        function openModal(id) {
            const m = document.getElementById(id);
            if (!m) return;
            // Запоминаем триггер для возврата фокуса
            m._prevFocus = document.activeElement;
            m.classList.add('open');
            m.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            // Переносим фокус в модалку
            requestAnimationFrame(() => {
                const first = m.querySelector(FOCUSABLE);
                if (first) first.focus();
            });
        }

        function closeModal(modalEl) {
            if (!modalEl) return;
            modalEl.classList.remove('open');
            modalEl.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            // Возвращаем фокус на триггер
            if (modalEl._prevFocus) {
                modalEl._prevFocus.focus();
                modalEl._prevFocus = null;
            }
        }

        function wireModal(id) {
            const m = document.getElementById(id);
            m.addEventListener('click', (e) => {
                if (e.target.closest('[data-close]')) closeModal(m);
            });
            // Focus trap: Tab/Shift+Tab остаётся внутри открытой модалки
            m.addEventListener('keydown', (e) => {
                if (!m.classList.contains('open') || e.key !== 'Tab') return;
                const focusable = [...m.querySelectorAll(FOCUSABLE)].filter(el => !el.closest('[aria-hidden="true"]'));
                if (!focusable.length) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            });
        }

        function applyProfileToUI() {
            ['emailValue', 'emailValue2', 'emailValue3'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.textContent = profile.email;
            });
            ['whatsappValue', 'whatsappValue2'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.textContent = profile.whatsapp;
            });
        }

        function buildMarquee() {
            // SVG paths for recognizable tech icons; text fallback for others
            const items = [
                { name: 'React', svg: `<circle cx="12" cy="12" r="2.2" fill="currentColor"/><ellipse cx="12" cy="12" rx="9.5" ry="3.5" fill="none" stroke="currentColor" stroke-width="1.3"/><ellipse cx="12" cy="12" rx="9.5" ry="3.5" fill="none" stroke="currentColor" stroke-width="1.3" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9.5" ry="3.5" fill="none" stroke="currentColor" stroke-width="1.3" transform="rotate(-60 12 12)"/>` },
                { name: 'Next.js', svg: `<path fill="currentColor" stroke="none" d="M12 3L22 20H2L12 3z"/><path stroke="rgba(255,255,255,0.18)" fill="none" stroke-width="1" d="M15 14l5 6"/>` },
                { name: 'TypeScript', text: 'TS' },
                { name: 'Node.js', svg: `<polygon points="12,2.5 20.5,7.5 20.5,17.5 12,22.5 3.5,17.5 3.5,7.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><text x="12" y="16.5" text-anchor="middle" font-size="7.5" font-weight="800" font-family="Inter,system-ui,sans-serif" fill="currentColor">N</text>` },
                { name: 'FastAPI', text: 'FA' },
                { name: 'PostgreSQL', text: 'PG' },
                { name: 'Firebase', svg: `<path fill="currentColor" stroke="none" d="M5.5 19L9 5l3 5.5 1.8-4.5L19 19H5.5zm7.5-4l-2-3 2 5.5 2-5.5-2 3z"/>` },
                { name: 'Tailwind', svg: `<path fill="currentColor" stroke="none" d="M12 6C9.33 6 7.67 7.33 7 10c1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35C13.3 10.8 14.53 12 17 12c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.7 7.2 14.47 6 12 6zm-5 6C4.33 12 2.67 13.33 2 16c1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35C8.3 16.8 9.53 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.7 13.2 9.47 12 7 12z"/>` },
                { name: 'Docker', svg: `<rect x="1.5" y="8" width="3" height="2.5" rx="0.5" fill="currentColor"/><rect x="5.5" y="8" width="3" height="2.5" rx="0.5" fill="currentColor"/><rect x="9.5" y="8" width="3" height="2.5" rx="0.5" fill="currentColor"/><rect x="9.5" y="4.5" width="3" height="2.5" rx="0.5" fill="currentColor"/><rect x="5.5" y="4.5" width="3" height="2.5" rx="0.5" fill="currentColor"/><path stroke="currentColor" fill="none" stroke-width="1.3" d="M1 11.8s.8.6 2.5.7c1 0 2-.3 2-.3H14c1.5 0 3.5-1 4-3.5.2-1.2-.5-2.2-1.2-2.7M22 8c-.5-.3-1.3-.5-2.2-.4"/>` },
                { name: 'Vercel', svg: `<path fill="currentColor" stroke="none" d="M12 3L22 21H2L12 3z"/>` },
                { name: 'Supabase', svg: `<path fill="currentColor" stroke="none" d="M13.5 3L4 15h8.5l-2 6L21 9H12.5l1-6z"/>` },
                { name: 'Zustand', text: 'Zu' },
                { name: 'Redux', svg: `<path fill="none" stroke="currentColor" stroke-width="1.4" d="M15.5 5c1.5-1 4.5-.5 4.5 3 0 1.5-1 2.8-2.3 3.5M8.5 19c-1.5 1-4.5.5-4.5-3 0-1.5 1-2.8 2.3-3.5M7 9.5c-1-.7-2-2-1.7-3.8.3-1.5 1.5-2.7 3.2-2.7h9c1.5 0 3 1 3 3 0 1.5-1 2.5-2 3"/>` },
                { name: 'Framer Motion', svg: `<path fill="currentColor" stroke="none" d="M5 3h14v8h-7L5 3zm0 8h7l7 8H5v-8z"/>` },
                { name: 'GSAP', text: 'GS' },
                { name: 'Telegram', svg: `<path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M22 2L11 13M22 2 15 22l-4-9-9-4 20-8z"/>` },
                { name: 'AI / LLM', text: 'AI' },
            ];

            const track = document.getElementById('marqueeTrack');

            const createChip = (it) => {
                const d = document.createElement('div');
                d.className = 'tech-item relative shrink-0';

                let inner;
                if (it.svg) {
                    inner = `<svg viewBox="0 0 24 24" width="20" height="20" style="color:inherit;">${it.svg}</svg>`;
                } else {
                    inner = `<span class="chip-text text-xs font-bold tracking-wider" style="color: rgba(255,255,255,0.72);">${it.text}</span>`;
                }

                d.innerHTML = `
                    <div class="marquee-chip w-12 h-12 rounded-2xl border flex items-center justify-center select-none"
                        style="border-color: rgba(255,255,255,0.12); background: rgba(255,255,255,0.02); color: rgba(255,255,255,0.72); transition: transform 180ms ease, background 180ms ease, border-color 180ms ease, color 180ms ease;">
                        ${inner}
                    </div>
                    <div class="tip">${it.name}</div>
                `;

                const box = d.querySelector('.marquee-chip');
                d.addEventListener('mouseenter', () => {
                    box.style.transform = 'scale(1.18)';
                    box.style.borderColor = 'rgba(99,163,255,0.45)';
                    box.style.background = 'linear-gradient(135deg, rgba(59,130,246,0.18), rgba(139,92,246,0.14))';
                    box.style.color = document.body.classList.contains('light') ? 'rgba(24,24,27,0.92)' : 'rgba(255,255,255,0.95)';
                });
                d.addEventListener('mouseleave', () => {
                    box.style.transform = '';
                    box.style.borderColor = '';
                    box.style.background = '';
                    box.style.color = document.body.classList.contains('light') ? 'rgba(24,24,27,0.72)' : 'rgba(255,255,255,0.72)';
                });

                return d;
            };

            // Duplicate for seamless loop; add trailing gap to fix -50% alignment
            [...items, ...items].forEach(it => track.appendChild(createChip(it)));
            track.style.paddingRight = '12px'; // closes the gap at the loop seam
        }

        function makeHeatmap() {
            const grid = document.getElementById('heatmapGrid');
            if (!grid) return;
            grid.innerHTML = '';
            const levels = [
                'rgba(255,255,255,0.06)',
                'rgba(59,130,246,0.22)',
                'rgba(59,130,246,0.38)',
                'rgba(139,92,246,0.50)',
            ];
            for (let i = 0; i < 48; i++) {
                const c = document.createElement('div');
                c.className = 'heatmap-cell h-2 rounded-[3px]';
                const r = Math.random();
                const idx = r < 0.50 ? 0 : r < 0.74 ? 1 : r < 0.90 ? 2 : 3;
                c.style.background = levels[idx];
                c.style.border = '1px solid rgba(255,255,255,0.04)';
                c.style.animationDelay = `${i * 18}ms`;
                grid.appendChild(c);
            }
        }

        function toggleAccordion(btn) {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('.accordion-icon');
            const isOpen = content.style.maxHeight !== '0px';
            if (isOpen) {
                content.style.maxHeight = '0px';
                content.style.opacity = '0';
                icon.style.transform = 'rotate(-90deg)';
                btn.setAttribute('aria-expanded', 'false');
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.opacity = '1';
                icon.style.transform = 'rotate(0deg)';
                btn.setAttribute('aria-expanded', 'true');
            }
        }

        function initAccordions() {
            document.querySelectorAll('.accordion-content').forEach(content => {
                if (content.style.maxHeight !== '0px') {
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            });
        }

        function typewriter(el, lines) {
            let line = 0;
            let i = 0;
            let deleting = false;
            const speed = 34;
            const pause = 900;

            const tick = () => {
                const current = lines[line];
                if (!deleting) {
                    i++;
                    el.textContent = current.slice(0, i);
                    if (i >= current.length) {
                        deleting = true;
                        setTimeout(tick, pause);
                        return;
                    }
                } else {
                    i--;
                    // '\u200B' = zero-width space: span не схлопывается при i=0
                    el.textContent = i > 0 ? current.slice(0, i) : '\u200B';
                    if (i <= 0) {
                        deleting = false;
                        line = (line + 1) % lines.length;
                    }
                }
                setTimeout(tick, deleting ? speed * 0.55 : speed);
            };
            tick();

            const caret = document.getElementById('caret');
            setInterval(() => caret.classList.toggle('opacity-0'), 520);
        }

        function revealCards() {
            const cards = [...document.querySelectorAll('[data-reveal]')].sort((a, b) => (+a.dataset.reveal) - (+b.dataset.reveal));
            cards.forEach((c, idx) => setTimeout(() => c.classList.add('is-visible'), 120 + idx * 90));
        }


        function setupCursorGlow() {
            const glow = document.getElementById('cursorGlow');
            let raf = null;
            let x = window.innerWidth / 2, y = window.innerHeight / 2;
            window.addEventListener('pointermove', (e) => {
                x = e.clientX; y = e.clientY;
                if (raf) return;
                raf = requestAnimationFrame(() => {
                    glow.style.setProperty('--mx', x + 'px');
                    glow.style.setProperty('--my', y + 'px');
                    raf = null;
                });
            }, { passive: true });
        }

        function setupFeaturedHover() {
            const card = document.querySelector('#featuredGlow');
            const host = card?.closest('article');
            if (!card || !host) return;
            host.addEventListener('pointermove', (e) => {
                const r = host.getBoundingClientRect();
                const px = ((e.clientX - r.left) / r.width) * 100;
                const py = ((e.clientY - r.top) / r.height) * 100;
                card.style.background = `radial-gradient(420px circle at ${px}% ${py}%, rgba(139,92,246,0.22), transparent 55%)`;
            });
        }

        function setupTheme() {
            const btn = document.getElementById('themeToggle');
            const key = 'pz-theme';
            const saved = localStorage.getItem(key);
            if (saved === 'light') document.body.classList.add('light');
            btn.addEventListener('click', () => {
                // Paint all color transitions smoothly
                document.body.classList.add('theme-transitioning');
                document.body.classList.toggle('light');
                localStorage.setItem(key, document.body.classList.contains('light') ? 'light' : 'dark');
                setTimeout(() => document.body.classList.remove('theme-transitioning'), 420);
            });
        }

        function setupGitHubCard() {
            const el = document.getElementById('githubCard');
            const open = () => window.open(profile.githubUrl, '_blank', 'noopener,noreferrer');
            el.addEventListener('click', open);
            el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') open(); });
        }

        function downloadText(filename, text) {
            const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        }

        function setupDownloads() {
            const dl1 = document.getElementById('downloadCv');
            const dl2 = document.getElementById('downloadCv2');
            const act = () => {
                const a = document.createElement('a');
                a.href = 'https://zafarovpolat.github.io/resume/resume.pdf';
                a.download = 'Polat-Zafarov-Resume.pdf';
                a.target = '_blank';
                document.body.appendChild(a);
                a.click();
                a.remove();
            };
            dl1.addEventListener('click', act);
            dl2.addEventListener('click', act);
        }

        function setupCopyButtons() {
            document.getElementById('copyTelegram').addEventListener('click', () => safeCopy(profile.telegram));
            document.getElementById('copySite').addEventListener('click', () => safeCopy(profile.githubUrl));

            document.addEventListener('click', (e) => {
                const btn = e.target.closest('[data-copy]');
                if (!btn) return;
                const key = btn.getAttribute('data-copy');
                if (key === 'telegram') return safeCopy(profile.telegram);
                if (key === 'email') return safeCopy(profile.email);
                if (key === 'whatsapp') return safeCopy(profile.whatsapp);
            });
        }

        function setupNavigation() {
            document.getElementById('openFull').addEventListener('click', () => openModal('modalFull'));
            document.getElementById('openProjects').addEventListener('click', () => openModal('modalProjects'));
            document.getElementById('viewProject').addEventListener('click', () => openModal('modalIshTop'));
            document.getElementById('openStack').addEventListener('click', () => openModal('modalStack'));
            document.getElementById('openContacts').addEventListener('click', () => openModal('modalContacts'));
            document.getElementById('openAchievements').addEventListener('click', () => openModal('modalAchievements'));

            ['modalFull', 'modalProjects', 'modalStack', 'modalContacts', 'modalAchievements', 'modalIshTop'].forEach(wireModal);

            window.addEventListener('keydown', (e) => {
                if (e.key !== 'Escape') return;
                document.querySelectorAll('.modal.open').forEach(m => closeModal(m));
            });
        }

        function setupParticles() {
            const canvas = document.getElementById('particles');
            const ctx = canvas.getContext('2d');
            let w, h, dpr;
            let points = [];
            let animId = null;

            const resize = () => {
                dpr = Math.min(2, window.devicePixelRatio || 1);
                w = canvas.width = Math.floor(window.innerWidth * dpr);
                h = canvas.height = Math.floor(window.innerHeight * dpr);
                canvas.style.width = window.innerWidth + 'px';
                canvas.style.height = window.innerHeight + 'px';

                const count = Math.floor((window.innerWidth * window.innerHeight) / 32000);
                points = new Array(Math.max(28, Math.min(90, count))).fill(0).map(() => ({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    vx: (Math.random() - 0.5) * 0.25 * dpr,
                    vy: (Math.random() - 0.5) * 0.25 * dpr,
                    r: (Math.random() * 1.2 + 0.6) * dpr,
                    a: Math.random() * 0.6 + 0.2
                }));
            };

            const draw = () => {
                ctx.clearRect(0, 0, w, h);
                for (const p of points) {
                    p.x += p.vx;
                    p.y += p.vy;
                    if (p.x < 0 || p.x > w) p.vx *= -1;
                    if (p.y < 0 || p.y > h) p.vy *= -1;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(59,130,246,${p.a * 0.35})`;
                    ctx.fill();
                }
                for (let i = 0; i < points.length; i++) {
                    for (let j = i + 1; j < points.length; j++) {
                        const a = points[i], b = points[j];
                        const dx = a.x - b.x;
                        const dy = a.y - b.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const max = 140 * dpr;
                        if (dist < max) {
                            const alpha = (1 - dist / max) * 0.08;
                            ctx.strokeStyle = `rgba(139,92,246,${alpha})`;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(a.x, a.y);
                            ctx.lineTo(b.x, b.y);
                            ctx.stroke();
                        }
                    }
                }
                animId = requestAnimationFrame(draw);
            };

            // Останавливаем анимацию когда вкладка скрыта
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    cancelAnimationFrame(animId);
                    animId = null;
                } else if (!animId) {
                    animId = requestAnimationFrame(draw);
                }
            });

            resize();
            animId = requestAnimationFrame(draw);
            window.addEventListener('resize', resize, { passive: true });
        }

        /* ---- Custom cursor ---- */
        function setupCustomCursor() {
            if (!window.matchMedia('(pointer: fine)').matches) return;

            const dot = document.createElement('div');
            dot.id = 'cursor-dot';
            const ring = document.createElement('div');
            ring.id = 'cursor-ring';
            document.body.appendChild(dot);
            document.body.appendChild(ring);

            let mx = window.innerWidth / 2, my = window.innerHeight / 2;
            let rx = mx, ry = my;
            let prevRx = rx, prevRy = ry;
            let hoverScale = 1, targetHoverScale = 1;
            const lerp = (a, b, t) => a + (b - a) * t;

            window.addEventListener('pointermove', (e) => {
                mx = e.clientX;
                my = e.clientY;
                const el = e.target.closest('a, button, [role="button"], input, textarea, [tabindex], .marquee-chip, .chat-chip');
                targetHoverScale = el ? 1.5 : 1;
            }, { passive: true });

            const loop = () => {
                // Dot: exact position
                dot.style.transform = `translate(${mx}px,${my}px)`;

                // Ring: lagged with physics
                prevRx = rx; prevRy = ry;
                rx = lerp(rx, mx, 0.13);
                ry = lerp(ry, my, 0.13);

                const vx = rx - prevRx;
                const vy = ry - prevRy;
                const speed = Math.sqrt(vx * vx + vy * vy);

                hoverScale = lerp(hoverScale, targetHoverScale, 0.12);

                // Velocity stretch: ellipse aligned to direction of motion
                const stretchX = 1 + speed * 0.055;
                const stretchY = 1 / stretchX;
                const angle = speed > 0.2 ? Math.atan2(vy, vx) * (180 / Math.PI) : 0;

                ring.style.transform = `translate(${rx}px,${ry}px) rotate(${angle}deg) scale(${stretchX * hoverScale},${stretchY * hoverScale})`;
                ring.style.opacity = (speed > 0.05 || hoverScale > 1.1) ? '1' : '0.55';

                requestAnimationFrame(loop);
            };
            requestAnimationFrame(loop);
        }

        /* ---- Smooth scroll (lerp wheel) ---- */
        function setupSmoothScroll() {
            if (!window.matchMedia('(pointer: fine)').matches) return;

            let curr = window.scrollY;
            let dest = window.scrollY;
            let raf = null;
            const lerpF = (a, b, t) => a + (b - a) * t;

            const loop = () => {
                curr = lerpF(curr, dest, 0.09);
                if (Math.abs(curr - dest) > 0.4) {
                    window.scrollTo(0, curr);
                    raf = requestAnimationFrame(loop);
                } else {
                    window.scrollTo(0, dest);
                    raf = null;
                }
            };

            window.addEventListener('wheel', (e) => {
                // Skip over modals or chat panel (they have their own scroll)
                if (e.target.closest('.modal.open, #chatPanel, #chatMsgs')) return;
                e.preventDefault();
                const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
                dest = Math.max(0, Math.min(dest + e.deltaY * 0.85, maxScroll));
                if (!raf) raf = requestAnimationFrame(loop);
            }, { passive: false });

            // Keep in sync when scrolled by other means (keyboard, anchor links)
            window.addEventListener('scroll', () => {
                if (!raf) { curr = window.scrollY; dest = window.scrollY; }
            }, { passive: true });
        }

        /* ---- GitHub recent commits ---- */
        async function loadGitHubActivity() {
            const HEADERS = { 'Accept': 'application/vnd.github.v3+json' };

            const timeAgo = (iso) => {
                const diff = (Date.now() - new Date(iso)) / 1000;
                if (diff < 60) return 'только что';
                if (diff < 3600) return `${Math.floor(diff / 60)} мин назад`;
                if (diff < 86400) return `${Math.floor(diff / 3600)} ч назад`;
                return `${Math.floor(diff / 86400)} д назад`;
            };

            const track = document.getElementById('ghCommitsTrack');
            if (!track) return;

            try {
                const res = await fetch('https://api.github.com/users/Zafarovpolat/events/public', { headers: HEADERS });
                if (!res.ok) throw new Error('events fetch failed');
                const events = await res.json();

                const pushEvents = events.filter(e => e.type === 'PushEvent').slice(0, 3);
                if (!pushEvents.length) return;

                const commitData = await Promise.all(pushEvents.map(async (ev) => {
                    const sha = ev.payload.head;
                    const repoFull = ev.repo.name;
                    try {
                        const cRes = await fetch(`https://api.github.com/repos/${repoFull}/commits/${sha}`, { headers: HEADERS });
                        if (!cRes.ok) throw new Error();
                        const cData = await cRes.json();
                        return {
                            msg: cData.commit.message.split('\n')[0].slice(0, 54),
                            repo: repoFull.replace('Zafarovpolat/', ''),
                            time: timeAgo(ev.created_at)
                        };
                    } catch {
                        return { msg: sha.slice(0, 7), repo: repoFull.replace('Zafarovpolat/', ''), time: timeAgo(ev.created_at) };
                    }
                }));

                // Дублируем для бесшовного луп (как marquee tech stack)
                const makeItem = (c) => {
                    const d = document.createElement('div');
                    d.className = 'commit-item';
                    d.innerHTML = `
                        <div class="text-xs font-medium truncate" style="color:var(--text)">${c.msg}</div>
                        <div class="text-xs" style="color:var(--muted)">${c.repo} · ${c.time}</div>`;
                    return d;
                };

                [...commitData, ...commitData].forEach(c => track.appendChild(makeItem(c)));
                track.style.paddingRight = '8px'; // закрываем зазор на стыке луп
            } catch {
                // fail silently
            }
        }



        /* ---- Burger / Mobile nav ---- */
        function setupBurgerMenu() {
            const btn = document.getElementById('burgerBtn');
            const nav = document.getElementById('mobileNav');
            const backdrop = document.getElementById('mobileNavBackdrop');
            const closeBtn = document.getElementById('mobileNavClose');
            if (!btn || !nav) return;

            const open = () => {
                nav.classList.add('open');
                btn.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
                document.body.style.overflow = 'hidden';
            };

            const close = () => {
                nav.classList.remove('open');
                btn.classList.remove('open');
                btn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            };

            btn.addEventListener('click', () =>
                nav.classList.contains('open') ? close() : open()
            );
            if (closeBtn)  closeBtn.addEventListener('click', close);
            if (backdrop)  backdrop.addEventListener('click', close);

            // Мобильные кнопки — делегируют к десктопным
            const map = {
                mobileDownloadCv: 'downloadCv',
                mobileContacts:   'openContacts',
                mobileFull:       'openFull',
                mobileTheme:      'themeToggle',
            };
            Object.entries(map).forEach(([mId, dId]) => {
                const mb = document.getElementById(mId);
                const db = document.getElementById(dId);
                if (mb && db) {
                    mb.addEventListener('click', () => {
                        close();
                        // Небольшая задержка, чтобы меню успело закрыться
                        setTimeout(() => db.click(), 180);
                    });
                }
            });

            // Закрытие по Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && nav.classList.contains('open')) close();
            });
        }

        function bootstrap() {
            setTimeout(() => {
                document.getElementById('skeleton').classList.add('hidden');
                document.getElementById('content').classList.remove('hidden');
                revealCards();
                setTimeout(initAccordions, 100);
            }, 550);

            // Критичные — запускаем сразу
            applyProfileToUI();
            buildMarquee();
            makeHeatmap();
            typewriter(document.getElementById('typewriter'), profile.headlineRotating);
            setupCursorGlow();
            setupFeaturedHover();
            setupTheme();
            setupGitHubCard();
            setupDownloads();
            setupCopyButtons();
            setupNavigation();
            setupBurgerMenu();
            setupAIChat();

            // Некритичные — откладываем до idle
            const idle = (fn) => 'requestIdleCallback' in window
                ? requestIdleCallback(fn, { timeout: 2000 })
                : setTimeout(fn, 300);

            idle(() => {
                if (window.innerWidth > 768) setupParticles();
                if (window.matchMedia('(pointer: fine)').matches) setupCustomCursor();
                setupSmoothScroll();
                loadGitHubActivity();
            });
        }

        document.addEventListener('DOMContentLoaded', bootstrap);