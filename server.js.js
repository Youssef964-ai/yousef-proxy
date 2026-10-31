const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// إعداد البروكسي العكسي وحقن البيانات وإخفاء الوجهة الحقيقية
app.use('/tunnel', createProxyMiddleware({
    target: 'https://www.youtube.com', // الموقع غير المسموح المراد فتحه
    changeOrigin: true,
    secure: false,
    pathRewrite: {
        '^/tunnel': '', // إعادة كتابة المسار أمام فاحص الشبكة
    },
    onProxyReq: (proxyReq, req, res) => {
        // تزوير الـ Headers لإقناع الـ Host بأن الاتصال مخصص للنطاق التعليمي المسموح
        proxyReq.setHeader('Host', 'me-portal.qureo.education');
        proxyReq.setHeader('X-Forwarded-Host', 'me-portal.qureo.education');
        proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) EducationalSystemAgent');
    },
    onProxyRes: (proxyRes, req, res) => {
        // إزالة قيود حماية الحظر داخل الإطارات للسماح بعرض المحتوى بسلاسة
        delete proxyRes.headers['x-frame-options'];
        delete proxyRes.headers['content-security-policy'];
    }
}));

// واجهة التحكم الخاصة بك (Joe Escobar / Yousef Ragab)
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="ar" dir="rtl">
        <head>
            <meta charset="UTF-8">
            <title>Qureo Education - Secure Portal</title>
            <style>
                body { background: #050505; color: #00ff66; font-family: monospace; text-align: center; padding-top: 20px; }
                .browser-bar { background: #0f0f0f; border-bottom: 1px solid #00ff66; padding: 8px; text-align: left; direction: ltr; margin-bottom: 20px; }
                iframe { width: 95vw; height: 75vh; border: 2px solid #00ff66; background: #000; border-radius: 6px; }
            </style>
        </head>
        <body>
            <div class="browser-bar">
                <span style="color:#ff5555;">●</span> <span style="color:#ffcc00;">●</span> <span style="color:#55ff55;">●</span>
                &nbsp;&nbsp; <b>https://me-portal.qureo.education/login</b> [SECURED SSL]
            </div>
            <h1>JOE ESCOBAR 😎</h1>
            <h3>Operator: Yousef Ragab</h3>
            <p>Status: True Reverse Proxy & Deep Packet Cloaking Active</p>
            <iframe src="/tunnel"></iframe>
        </body>
        </html>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`True Proxy Tunnel running on port ${PORT}`);
});