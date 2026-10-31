const express = require('express');
const path = require('path');
const app = express();

// تقديم واجهة المستخدم مباشرة عند فتح الموقع
app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Qureo Education - Secure Authentication Portal</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
            --bg-color: #080b10;
            --card-bg: rgba(15, 22, 32, 0.9);
            --text-color: #00ff88;
            --border-color: #00ff88;
            --accent-glow: rgba(0, 255, 136, 0.3);
            --input-bg: #030508;
            --subtext-color: #00bb66;
        }
        body.light-theme {
            --bg-color: #f4f6f9;
            --card-bg: #ffffff;
            --text-color: #0f172a;
            --border-color: #2563eb;
            --accent-glow: rgba(37, 99, 235, 0.15);
            --input-bg: #ffffff;
            --subtext-color: #475569;
        }
        body {
            background-color: var(--bg-color);
            color: var(--text-color);
            font-family: 'Outfit', sans-serif;
            overflow-x: hidden;
            height: 100vh;
            display: flex;
            flex-direction: column;
        }
        canvas#matrix {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; opacity: 0.08;
        }
        body.light-theme canvas#matrix { display: none; }
        .browser-bar {
            background-color: var(--card-bg);
            border-bottom: 1px solid var(--border-color);
            padding: 8px 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 13px;
        }
        .browser-dots { display: flex; gap: 6px; }
        .dot { width: 10px; height: 10px; border-radius: 50%; }
        .dot-red { background: #ff5555; }
        .dot-yellow { background: #ffcc00; }
        .dot-green { background: #55ff55; }
        .url-bar {
            background: var(--input-bg);
            border: 1px solid var(--border-color);
            padding: 4px 14px;
            border-radius: 6px;
            color: var(--text-color);
            flex-grow: 1;
            margin: 0 16px;
            text-align: left;
            direction: ltr;
            font-size: 13px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .container {
            flex: 1; display: flex; flex-direction: column; align-items: center; padding: 16px; z-index: 1;
        }
        .identity-box { text-align: center; margin: 8px 0; }
        h1.title { font-size: 1.75rem; font-weight: 700; margin-bottom: 2px; text-shadow: 0 0 10px var(--accent-glow); }
        .identity-subtitle { font-size: 0.95rem; color: var(--subtext-color); font-weight: 600; }
        .identity-subtitle span.real-name { color: var(--text-color); }
        .terminal-box {
            background: var(--input-bg);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 8px 14px;
            width: 100%;
            max-width: 800px;
            margin-bottom: 12px;
            font-size: 13px;
            height: 38px;
            display: flex;
            align-items: center;
        }
        .terminal-text::before { content: "sys@yousef-ragab:~# "; color: var(--subtext-color); font-weight: 600; }
        .control-panel {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            padding: 14px;
            border-radius: 10px;
            width: 100%;
            max-width: 800px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-bottom: 14px;
        }
        .input-group { display: flex; }
        input[type="text"] {
            flex: 1; background: var(--input-bg); border: 1px solid var(--border-color);
            padding: 9px 14px; color: var(--text-color); font-family: inherit; font-size: 14px;
            border-radius: 6px; outline: none; direction: ltr; text-align: left;
        }
        input[type="text"]::placeholder { color: var(--subtext-color); direction: rtl; text-align: right; opacity: 0.7; }
        .btn-group { display: flex; gap: 8px; flex-wrap: wrap; }
        button {
            flex: 1; min-width: 120px; background: var(--input-bg); color: var(--text-color);
            border: 1px solid var(--border-color); padding: 8px 12px; font-family: inherit;
            font-size: 13.5px; font-weight: 600; border-radius: 6px; cursor: pointer;
        }
        button:hover { background: var(--border-color); color: var(--bg-color); }
        .screen-container {
            width: 100%; max-width: 900px; flex: 1; min-height: 450px; background: #000;
            border: 1px solid var(--border-color); border-radius: 10px; display: flex; flex-direction: column; overflow: hidden;
        }
        iframe { width: 100%; height: 100%; flex: 1; border: none; background: #000; }
    </style>
</head>
<body>
    <canvas id="matrix"></canvas>
    <div class="browser-bar">
        <div class="browser-dots">
            <div class="dot dot-red"></div><div class="dot dot-yellow"></div><div class="dot dot-green"></div>
        </div>
        <div class="url-bar">
            <span>https://me-portal.qureo.education/login</span>
            <span class="lock">🔒 [SECURED]</span>
        </div>
        <div style="font-size:12px; font-weight:600;">● PROXY: ACTIVE</div>
    </div>
    <div class="container">
        <div class="identity-box">
            <h1 class="title">JOE ESCOBAR 😎</h1>
            <div class="identity-subtitle">Operator: <span class="real-name">Yousef Ragab</span></div>
        </div>
        <div class="terminal-box">
            <div class="terminal-text" id="terminal">Secure tunnel initialized for Yousef Ragab...</div>
        </div>
        <div class="control-panel">
            <div class="input-group">
                <input type="text" id="targetInput" placeholder="ضع رابط يوتيوب أو اسم فيديو أو رابط تصفح...">
            </div>
            <div class="btn-group">
                <button onclick="launchTarget()">تشغيل المحتوى</button>
                <button onclick="loadYouTubeHome()">YouTube Home</button>
                <button onclick="loadSearchMode()">بحث ذكي</button>
                <button onclick="toggleTheme()">الوضع الداكن / الفاتح</button>
            </div>
        </div>
        <div class="screen-container">
            <iframe id="coreFrame" src="https://www.youtube.com/embed/3JZ_D3ELwOQ" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    </div>
    <script>
        const canvas = document.getElementById('matrix');
        const ctx = canvas.getContext('2d');
        function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
        window.addEventListener('resize', resizeCanvas); resizeCanvas();
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';
        const fontSize = 13; let columns = canvas.width / fontSize;
        const rainDrops = []; for (let x = 0; x < columns; x++) { rainDrops[x] = 1; }
        function drawMatrix() {
            ctx.fillStyle = 'rgba(8, 11, 16, 0.05)'; ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#00ff88'; ctx.font = fontSize + 'px Outfit, monospace';
            for (let i = 0; i < rainDrops.length; i++) {
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
                if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) { rainDrops[i] = 0; }
                rainDrops[i]++;
            }
        }
        setInterval(drawMatrix, 40);

        const hackerQuotes = [
            "System Status: Host environment securely bypassed.",
            "Network View: User Yousef Ragab active on educational portal.",
            "Tunnel security: Encrypted and stable.",
            "Operator Identity: Joe Escobar (Yousef Ragab) verified."
        ];
        let quoteIndex = 0;
        const terminalElem = document.getElementById('terminal');
        setInterval(() => {
            terminalElem.textContent = hackerQuotes[quoteIndex];
            quoteIndex = (quoteIndex + 1) % hackerQuotes.length;
        }, 5000);

        function extractVideoID(url) {
            let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            let match = url.match(regExp);
            return (match && match[2].length === 11) ? match[2] : null;
        }

        function launchTarget() {
            const val = document.getElementById('targetInput').value.trim();
            const frame = document.getElementById('coreFrame');
            if (!val) return;
            if (val.startsWith('http://') || val.startsWith('https://')) {
                let vid = extractVideoID(val);
                if (vid) {
                    frame.src = \`https://www.youtube.com/embed/\${vid}?autoplay=1\`;
                } else {
                    frame.src = val;
                }
            } else {
                frame.src = \`https://www.youtube.com/embed?q=\${encodeURIComponent(val)}&autoplay=1\`;
            }
        }

        function loadYouTubeHome() {
            document.getElementById('coreFrame').src = 'https://www.youtube.com/embed/videoseries?list=PLw-VjHDlEOgs658kAHR_LAaILBXb-s6Qc';
        }

        function loadSearchMode() {
            let query = prompt("أدخل كلمة البحث المطلوبة:");
            if(query) {
                document.getElementById('coreFrame').src = \`https://www.youtube.com/embed?q=\${encodeURIComponent(query)}&autoplay=1\`;
            }
        }

        function toggleTheme() { document.body.classList.toggle('light-theme'); }
    </script>
</body>
</html>`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
