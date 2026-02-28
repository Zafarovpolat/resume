function setupAIChat() {
    const SYSTEM_PROMPT = `Ты — персональный AI-ассистент Пулата Зафарова, Frontend Developer и Startup Founder из Ташкента, Узбекистан.
Ты помогаешь посетителям резюме-сайта узнать о Пулате: его проектах, навыках, опыте и возможностях для сотрудничества.
Отвечай дружелюбно, чётко и по делу. Коротко (2–4 предложения), если не просят подробностей. Пиши на языке вопроса.

О Пулате:
- 2+ года опыта: React, Next.js 15, TypeScript, Tailwind, Framer Motion, GSAP, Redux, Zustand, Vue 3
- Backend: Node.js, FastAPI, PostgreSQL, Supabase, Firebase, Docker, Vercel
- Telegram Bot API, Telegram Mini Apps SDK, AI-интеграции (Gemini, OpenAI, Claude)

Проекты:
1. IshTop.Uz — основатель первой фриланс-биржи Узбекистана. Next.js 15.3, Firebase, Google Auth, Vercel. В разработке: wallet, escrow, real-time чат, AI matching, Payme/HUMO.
2. Lecto (Study Buddy) @lectoaibot — AI-помощник для учёбы. React 18, FastAPI, PostgreSQL, Gemini 2.0, Telegram Mini App. OCR, RAG, flashcards, PPTX-экспорт. MVP в production.
3. FUTURA Architects — сайт архитектурного бюро, GSAP/premium UI.
4. Electro New Tech — магазин электроники, WooCommerce.
5. Идеология еды — корпоративный сайт производителя продуктов.
6. Dekor House — Telegram Mini App магазин декора.

Контакты: Telegram @zafarovpolat, email atuin59354081@gmail.com, GitHub github.com/Zafarovpolat, WhatsApp +998959738888.
Локация: Ташкент, UTC+5. Открыт к remote, office, hybrid; рассматривает релокацию.`;

    const toggle = document.getElementById('chatToggle');
    const panel = document.getElementById('chatPanel');
    const msgs = document.getElementById('chatMsgs');
    const input = document.getElementById('chatInput');
    const send = document.getElementById('chatSend');
    const closeBtn = document.getElementById('chatClose');
    const chips = document.querySelectorAll('.chat-chip');

    let isOpen = false;
    let isLoading = false;
    const history = [];

    const openChat = () => {
        isOpen = true;
        panel.classList.remove('chat-closed');
        if (!msgs.children.length) {
            addMsg('a', 'Привет! Я AI-ассистент Пулата. Спрашивай о проектах, стеке, опыте или сотрудничестве 👋');
        }
        setTimeout(() => input.focus(), 260);
    };

    const closeChat = () => {
        isOpen = false;
        panel.classList.add('chat-closed');
    };

    toggle.addEventListener('click', () => isOpen ? closeChat() : openChat());
    closeBtn.addEventListener('click', closeChat);

    document.addEventListener('click', (e) => {
        if (isOpen && !panel.contains(e.target) && e.target !== toggle && !toggle.contains(e.target)) {
            closeChat();
        }
    });

    const addMsg = (role, text) => {
        const d = document.createElement('div');
        d.className = `cmsg ${role}`;
        d.textContent = text;
        msgs.appendChild(d);
        msgs.scrollTop = msgs.scrollHeight;
        return d;
    };

    const showTyping = () => {
        const d = document.createElement('div');
        d.className = 'cmsg a';
        d.id = 'chatTyping';
        d.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
        msgs.appendChild(d);
        msgs.scrollTop = msgs.scrollHeight;
    };

    const hideTyping = () => {
        const t = document.getElementById('chatTyping');
        if (t) t.remove();
    };

    const sendMsg = async (text) => {
        text = text.trim();
        if (!text || isLoading) return;

        const chipsEl = document.getElementById('chatChips');
        if (chipsEl) chipsEl.style.display = 'none';

        addMsg('u', text);
        input.value = '';
        history.push({ role: 'user', text });

        isLoading = true;
        showTyping();

        const contents = history.slice(-14).map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
        }));

        try {
            // ← единственное изменение: вместо Gemini напрямую — свой endpoint
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
                    contents,
                    generationConfig: { maxOutputTokens: 420, temperature: 0.72 }
                })
            });

            hideTyping();

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                addMsg('a', `Ошибка: ${err.error?.message || res.status}`);
                history.pop();
                return;
            }

            const data = await res.json();
            const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || '…';
            addMsg('a', reply);
            history.push({ role: 'model', text: reply });
        } catch {
            hideTyping();
            addMsg('a', 'Не удалось соединиться. Проверь интернет.');
            history.pop();
        } finally {
            isLoading = false;
        }
    };

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            if (!isOpen) openChat();
            setTimeout(() => sendMsg(chip.textContent), 120);
        });
    });

    send.addEventListener('click', () => sendMsg(input.value));
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMsg(input.value); }
    });
}