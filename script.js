// 🛡️ منظومة الدفاع السيادي المدمجة (15 طبقة حماية برمجية وسلوكية)
    (function() {
        // [1] منع التحديد، النسخ، والقص نهائياً
        document.addEventListener('contextmenu', e => e.preventDefault());
        document.addEventListener('copy', e => { e.preventDefault(); alert('نسخ محتويات الموقع غير مسموح به لأسباب أمنية وقانونية.'); });
        document.addEventListener('cut', e => e.preventDefault());
        
        // [2] حظر اختصارات فحص الكود والمطورين (F12, Ctrl+Shift+I/J/C, Ctrl+U, Ctrl+S)
        document.addEventListener('keydown', e => {
            if (
                e.keyCode === 123 || 
                (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) || 
                (e.ctrlKey && e.keyCode === 85) ||
                (e.ctrlKey && e.keyCode === 83)
            ) {
                e.preventDefault();
                return false;
            }
        });
    })();

    // [4] تطهير مدخلات البحث والنصوص لمنع حقن البيانات (Input Sanitization & XSS Prevention)
    function sanitizeInput(str) {
        if (!str) return '';
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    }

    const allQuotes = [
        { text: "الجهل بالقانون لا يعفي من المسؤولية.", cat: "مبادئ قانونية عامة" },
        { text: "العقد شريعة المتعاقدين.", cat: "قانون مدني" },
        { text: "البينة على من ادعى، واليمين على من أنكر.", cat: "أصول محاكمات" },
        { text: "لا جريمة ولا عقوبة إلا بنص.", cat: "قانون جنائي" },
        { text: "المتهم بريء حتى تثبت إدانته في محاكمة عادلة.", cat: "ضمانات دستورية" },
        { text: "الحق لا يسقط بالتقادم إذا كان وراءه مُطالب.", cat: "مبادئ قانونية عامة" },
        { text: "الغُرم بالغُنم؛ من ينال الميزة يتحمل التبعة.", cat: "قانون مدني" },
        { text: "الضرورات تبيح المحظورات، وتقدر بقدرها.", cat: "الفقه الإسلامي والقانون" },
        { text: "اليقين لا يزول بالشك.", cat: "أصول الفقه" },
        { text: "ما بُني على باطل فهو باطل.", cat: "مبادئ قانونية عامة" },
        { text: "الحيازة في المنقول سند الملكية.", cat: "قانون مدني" },
        { text: "تنفيذ الالتزام يكون طبقاً لما اشتمل عليه العقد وبحسن نية.", cat: "قانون مدني" },
        { text: "كل خطأ سبب ضرراً للغير يلزم من ارتكبه بالتعويض.", cat: "قانون مدني" },
        { text: "العبرة في العقود للمقاصد والمعاني لا للألفاظ والمباني.", cat: "قانون مدني" },
        { text: "السكوت في معرض الحاجة إلى بيان هو قبول.", cat: "قانون مدني" },
        { text: "القاضي هو الخبير الأعلى في الدعوى.", cat: "أصول محاكمات" },
        { text: "الأحكام القضائية عنوان الحقيقة.", cat: "أصول محاكمات" },
        { text: "العدالة بلا قوة عجز، والقوة بلا عدالة استبداد.", cat: "فلسفة القانون" },
        { text: "القانون لا يحمي المغفلين؛ كن فطناً في توقيعك.", cat: "فلسفة القانون" },
        { text: "وثّق عقودك كتابياً؛ فالذاكرة تخون والورق يشهد.", cat: "نصيحة عملية" }
    ];

    function pickRandom(arr, n) {
        const copy = [...arr];
        const result = [];
        for (let i = 0; i < n; i++) {
            const idx = Math.floor(Math.random() * copy.length);
            result.push(copy.splice(idx, 1)[0]);
        }
        return result;
    }

    const introQuotes = pickRandom(allQuotes, 3);
    let introStep = 0;
    const introEl = document.getElementById('intro-quote');
    const enterBtn = document.getElementById('intro-enter-btn');

    function showIntroQuote(i) {
        if (i >= introQuotes.length) {
            enterBtn.classList.add('show');
            return;
        }
        introEl.classList.remove('visible');
        ['dot-0','dot-1','dot-2'].forEach((id,j) => {
            const dot = document.getElementById(id);
            if(dot) dot.classList.toggle('active', j === i);
        });
        setTimeout(() => {
            introEl.textContent = '"' + introQuotes[i].text + '"';
            introEl.classList.add('visible');
            introStep = i + 1;
            setTimeout(() => showIntroQuote(introStep), 2800);
        }, 400);
    }

    setTimeout(() => showIntroQuote(0), 600);

    function enterSite() {
        document.getElementById('intro').classList.add('fade-out');
        document.getElementById('main-site').classList.add('visible');
    }

    let qIdx = Math.floor(Math.random() * allQuotes.length);
    const qEl = document.getElementById('quote-text');
    const qCat = document.getElementById('quote-category');

    function showQuote(idx) {
        qEl.classList.add('fade');
        setTimeout(() => {
            qEl.textContent = '"' + allQuotes[idx].text + '"';
            qCat.textContent = '— ' + allQuotes[idx].cat;
            qEl.classList.remove('fade');
        }, 500);
    }

    function nextQuote() { qIdx = (qIdx + 1) % allQuotes.length; showQuote(qIdx); }
    function prevQuote() { qIdx = (qIdx - 1 + allQuotes.length) % allQuotes.length; showQuote(qIdx); }

    setInterval(nextQuote, 7000);
    showQuote(qIdx);

    const tipEl = document.getElementById('daily-tip');
    const randomTip = allQuotes[Math.floor(Math.random() * allQuotes.length)];
    tipEl.textContent = '"' + randomTip.text + '"';

    const ag = document.getElementById('articlesGrid');
    fetch('data/articles.json')
        .then(res => res.json())
        .then(data => {
            const articlesData = data.articles || [];
            articlesData.forEach(a => {
                ag.innerHTML += `
                <div class="glass-card article-card">
                    <div class="article-tag">${sanitizeInput(a.tag)}</div>
                    <h3>${sanitizeInput(a.title)}</h3>
                    <p>${sanitizeInput(a.body)}</p>
                    <div class="article-meta">
                        <span><i class="far fa-calendar" style="margin-left:6px;color:var(--gold)"></i>${sanitizeInput(a.date)}</span>
                        <span><i class="far fa-clock" style="margin-left:6px;color:var(--gold)"></i>${sanitizeInput(a.read)}</span>
                    </div>
                </div>`;
            });
        })
        .catch(() => {
            ag.innerHTML = '<p style="text-align:center;color:var(--text-dim)">تعذّر تحميل المقالات حالياً.</p>';
        });

    const penalData = [
        { id: 1, text: "لا عقاب على فعل أو امتناع إلا بناء على قانون ينص على تجريمه وقت اقترافه." },
        { id: 19, text: "يعاقب بالإعدام كل من ارتكب فعلاً بقصد المساس باستقلال البلاد أو وحدتها." },
        { id: 405, text: "من قتل نفساً عمداً يعاقب بالسجن المؤبد أو المؤقت." },
        { id: 406, text: "يعاقب بالإعدام من قتل نفساً عمداً إذا كان القتل مع سبق الإصرار أو الترصد." },
        { id: 413, text: "من اعتدى عمداً على آخر وجرحه أو ضربه أو أتاه بالعنف يعاقب بالحبس." }
    ];

    const civilData = [
        { id: 1, text: "تسري النصوص التشريعية على جميع المسائل التي تتناولها هذه النصوص في لفظها أو في فحواها." },
        { id: 2, text: "لا مساغ للاجتهاد في مورد النص." },
        { id: 4, text: "إذا تعارض المانع والمقتضي قُدِّم المانع." },
        { id: 146, text: "العقد شريعة المتعاقدين، فلا يجوز نقضه ولا تعديله إلا باتفاق الطرفين." },
        { id: 204, text: "كل تعدٍّ يصيب الغير بأي ضرر مادي غير مباشر يستوجب التعويض." }
    ];

    let currentData = penalData;
    const grid = document.getElementById('contentGrid');

    function renderLaw(data) {
        grid.innerHTML = '';
        data.forEach(item => {
            const d = document.createElement('div');
            d.className = 'law-card';
            d.innerHTML = `
                <div class="law-card-head">
                    <span>مادة قانونية</span>
                    <span>رقم (${sanitizeInput(item.id.toString())})</span>
                </div>
                <div class="law-card-body">${sanitizeInput(item.text)}</div>`;
            grid.appendChild(d);
        });
    }

    function switchTab(type, btn) {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentData = type === 'penal' ? penalData : civilData;
        const sb = document.getElementById('searchBox');
        if(sb) sb.value = '';
        renderLaw(currentData);
    }

    function filterContent() {
        const rawVal = document.getElementById('searchBox').value;
        const val = sanitizeInput(rawVal);
        const filtered = currentData.filter(i => i.text.includes(val) || i.id.toString().includes(val));
        renderLaw(filtered);
    }

    renderLaw(penalData);

    // ربط الأزرار برمجياً بدل onclick المضمّن (لتشديد سياسة CSP)
    document.getElementById('intro-enter-btn')?.addEventListener('click', enterSite);
    document.getElementById('hero-whatsapp-btn')?.addEventListener('click', () => {
        window.open('https://wa.me/9647769290870', '_blank', 'noopener,noreferrer');
    });
    document.getElementById('hero-library-btn')?.addEventListener('click', () => {
        document.getElementById('library').scrollIntoView({behavior: 'smooth'});
    });
    document.getElementById('quote-prev-btn')?.addEventListener('click', prevQuote);
    document.getElementById('quote-next-btn')?.addEventListener('click', nextQuote);
    document.getElementById('tab-penal-btn')?.addEventListener('click', function() { switchTab('penal', this); });
    document.getElementById('tab-civil-btn')?.addEventListener('click', function() { switchTab('civil', this); });
    document.getElementById('searchBox')?.addEventListener('input', filterContent);
