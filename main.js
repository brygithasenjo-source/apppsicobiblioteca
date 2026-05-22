import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const appContent = document.getElementById('app-content');
const authScreen = document.getElementById('auth-screen');
const authMessage = document.getElementById('auth-message');

function setLoading(isLoading) {
    if (isLoading) {
        authScreen.style.display = 'flex';
        appContent.style.display = 'none';
        authMessage.innerHTML = `<h2 style="color: var(--sage); font-family: 'DM Serif Display', serif; font-size: 2rem;">Validando acceso...</h2>`;
    }
}

function setHasAccess(hasAccess, customMessage = null) {
    if (hasAccess) {
        authScreen.style.display = 'none';
        appContent.style.display = 'block';
    } else {
        appContent.innerHTML = ''; // Destruimos el dom de la app por seguridad
        authScreen.style.display = 'flex';
        authMessage.innerHTML = customMessage || `
            <div style="background: var(--white); padding: 3rem 2rem; border-radius: var(--radius-md); box-shadow: var(--shadow-lg); border: 1.5px solid var(--sage-pale); max-width: 440px; margin: 0 20px;">
                <h2 style="color: var(--terracotta); font-size: 1.8rem; margin-bottom: 1rem; font-family: 'DM Serif Display', serif;">Acceso restringido</h2>
                <p style="color: var(--ink-light); margin-bottom: 2rem; font-size: 1rem; line-height: 1.5; font-family: 'DM Sans', sans-serif;">Esta herramienta pertenece al ecosistema privado IA para Psicólogos. Inicia sesión desde el portal o renueva tu membresía.</p>
                <a href="https://ia-para-psicologos.vercel.app/" class="btn btn-sage" style="text-decoration: none; display: inline-flex; width: 100%; justify-content: center;">Ir al portal</a>
            </div>
        `;
    }
}

setLoading(true);

// Validación segura de que import.meta.env existe (por si Vercel falla el build)
const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : {};

if (!env.VITE_FIREBASE_API_KEY) {
    // Evitamos el loading infinito si Vite no cargó las variables
    setHasAccess(false, `
        <div style="background: #fff0f0; padding: 2rem; border: 1px solid #ffcccc; border-radius: 12px; max-width: 500px; margin: 0 20px;">
            <h3 style="color: #c0392b; margin-bottom: 10px; font-family: 'DM Serif Display', serif;">Error de Configuración Vite</h3>
            <p style="color: #333; font-size: 0.95rem; font-family: 'DM Sans', sans-serif;">Faltan las variables de Firebase. Por favor, asegúrate de haber creado el archivo <b>package.json</b> en el repositorio y que Vercel ejecute el comando <code>vite build</code> en sus ajustes.</p>
        </div>
    `);
    setLoading(false);
} else {
    // Configuración segura
    const firebaseConfig = {
        apiKey: env.VITE_FIREBASE_API_KEY,
        authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: env.VITE_FIREBASE_APP_ID
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    onAuthStateChanged(auth, async (user) => {
        if (!user) {
            setHasAccess(false);
            setLoading(false); // SIEMPRE antes del return
            return;
        }

        try {
            const userDoc = await getDoc(doc(db, "membership_users", user.uid));
            
            if (!userDoc.exists()) {
                setHasAccess(false);
                setLoading(false); // SIEMPRE antes del return
                return;
            }

            const data = userDoc.data();
            const { role, status, plan, end_date } = data || {};
            
            let accessGranted = false;

            if (role === "admin") {
                accessGranted = true;
            } else if (status === "active") {
                if (plan === "lifetime") {
                    accessGranted = true;
                } else if (end_date) {
                    const endDateObj = end_date.toDate ? end_date.toDate() : new Date(end_date);
                    if (endDateObj > new Date()) {
                        accessGranted = true;
                    }
                }
            }

            setHasAccess(accessGranted);
        } catch (error) {
            console.error("Error al validar membresía en Firestore:", error);
            setHasAccess(false, `
                <div style="background: #fff0f0; padding: 2rem; border: 1px solid #ffcccc; border-radius: 12px; max-width: 500px; margin: 0 20px;">
                    <h3 style="color: #c0392b; margin-bottom: 10px; font-family: 'DM Serif Display', serif;">Error de Conexión</h3>
                    <p style="color: #333; font-size: 0.95rem; font-family: 'DM Sans', sans-serif;">Hubo un error al verificar tu membresía con la base de datos.</p>
                </div>
            `);
        } finally {
            // Este bloque se ejecuta SIEMPRE sin importar éxito o error
            setLoading(false);
        }
    });
}

/* =====================================================================
   LÓGICA ORIGINAL DE LA APLICACIÓN (INTACTA)
===================================================================== */
function makeFmt(n,c,d,o,i,w,psy,r,hv,ht,hb,s,cta,p,ej,err){ return{n,c,d,o,i,w,psy,r,hv,ht,hb,s,cta,p,ej,err}; }

const videoFormats = [ /* Pega aquí tu array original completo */ ];
const recursosFormats = [ /* Pega aquí tu array original completo */ ];
const htFormats = [ /* Pega aquí tu array original completo */ ];
const facelessFormats = [ /* Pega aquí tu array original completo */ ];
const hooksDB = { /* Pega aquí tu array original completo */ };
const ctasDB = { /* Pega aquí tu array original completo */ };
const visualHooksDB = { /* Pega aquí tu array original completo */ };
const peaksDB = { /* Pega aquí tu array original completo */ };
const structuresDB = [ /* Pega aquí tu array original completo */ ];
const promptsIA = [ /* Pega aquí tu array original completo */ ];
const situations = [ /* Pega aquí tu array original completo */ ];
const errorsDB = { /* Pega aquí tu array original completo */ };
const glossaryData = [ /* Pega aquí tu array original completo */ ];

function renderVideoFormats() {
    const grid = document.getElementById('grid-video-formats');
    grid.innerHTML = videoFormats.map((item, idx) => `
        <div class="data-card">
            <span class="card-tag">${item.c}</span>
            <h4>${item.n}</h4>
            <div class="meta">
                <p><strong>Objetivo:</strong> ${item.o}</p>
                <p><strong>Dificultad:</strong> ${item.d}</p>
            </div>
            <div class="card-actions">
                <button class="btn btn-sage btn-sm" onclick="openFormatModal(${idx}, 'video')">Ver Estructura</button>
                <button class="btn btn-outline btn-sm" onclick="copyText('${item.p.replace(/'/g, "\\'").replace(/\n/g, "\\n")}')">Copiar Prompt</button>
            </div>
        </div>
    `).join('');
}

function renderObjectives() {
    const acc = document.getElementById('acc-objectives');
    const data = [
        {t:"Quiero atraer pacientes (BoF)", p:"Señales de que necesitas apoyo, Error que frena el proceso, Caso de transformación, Sin proceso vs Con proceso, Cómo es trabajar conmigo."},
        {t:"Quiero educar sobre salud mental (Autoridad)", p:"Mito + Verdad, Explicación de mecanismo psicológico, ¿Esto es normal?, Emoción que confundes con otra, Categoría A vs B."},
        {t:"Quiero romper el estigma (ToF)", p:"Lo que se ve vs Lo que pasa por dentro, ¿Qué pasaría si normalizáramos?, Respuesta a crítica frecuente, Tipos de perfiles emocionales."},
        {t:"Quiero vender recurso digital", p:"El recurso en uso, Antes/Después de usarlo, No lo descargues si, Lo que incluye que no te esperabas, Mitos que este recurso desmonta."},
        {t:"Quiero generar comunidad", p:"Pregunta que nadie se atreve a hacer, Reflexión semanal, La parte que nadie quiere escuchar, Debate empático, Diario de consulta."},
        {t:"Quiero contenido sin rostro", p:"Faceless clips + texto, Manos escribiendo en diario, Metáfora con objetos, B-roll reflexivo, Carrusel herramientas."}
    ];
    acc.innerHTML = data.map(d => `
        <div class="accordion">
            <div class="accordion-head" onclick="toggleAccordion(this)">
                <span>${d.t}</span><span>▼</span>
            </div>
            <div class="accordion-body">
                <p style="margin-bottom:10px;"><strong>Formatos recomendados:</strong><br>${d.p}</p>
                <button class="btn btn-sm btn-outline" onclick="copyText('${d.p}')">Copiar Lista</button>
            </div>
        </div>
    `).join('');
}

function renderRecursos() {
    const grid = document.getElementById('grid-recursos');
    grid.innerHTML = recursosFormats.map((item, idx) => `
        <div class="data-card">
            <span class="card-tag terra">Recurso Digital</span>
            <h4>${item.n}</h4>
            <div class="meta">
                <p><strong>Cuándo usar:</strong> ${item.w}</p>
                <p><strong>Hook:</strong> ${item.h}</p>
            </div>
            <div class="card-actions">
                <button class="btn btn-sage btn-sm" onclick="openRecursoModal(${idx})">Ver Detalles</button>
            </div>
        </div>
    `).join('');
}

function renderHighTicket() {
    const grid = document.getElementById('grid-highticket');
    grid.innerHTML = htFormats.map((item, idx) => `
        <div class="data-card">
            <span class="card-tag">Servicio Premium</span>
            <h4>${item.n}</h4>
            <div class="meta">
                <p><strong>Objetivo:</strong> ${item.o}</p>
                <p><strong>Hook:</strong> ${item.h}</p>
            </div>
            <div class="card-actions">
                <button class="btn btn-sage btn-sm" onclick="openHTModal(${idx})">Ver Detalles</button>
            </div>
        </div>
    `).join('');
}

function renderFaceless() {
    const grid = document.getElementById('grid-faceless');
    grid.innerHTML = facelessFormats.map(item => `
        <div class="data-card">
            <span class="card-tag">Faceless</span>
            <h4>${item.n}</h4>
            <div class="meta">
                <p><strong>Dirección:</strong> ${item.r}</p>
                <p><strong>Hook texto:</strong> ${item.h}</p>
            </div>
        </div>
    `).join('');
}

function renderListDB(elementId, dataObj) {
    const el = document.getElementById(elementId);
    let html = '';
    for (const [cat, items] of Object.entries(dataObj)) {
        let itemsHtml = items.map(t => `
            <div class="copy-row">
                <span class="copy-text">"${t}"</span>
                <button class="btn btn-sm btn-outline" onclick="copyText('${t.replace(/'/g, "\\'")}')">Copiar</button>
            </div>
        `).join('');
        html += `
            <div class="accordion">
                <div class="accordion-head" onclick="toggleAccordion(this)"><span>${cat}</span><span>▼</span></div>
                <div class="accordion-body">${itemsHtml}</div>
            </div>
        `;
    }
    el.innerHTML = html;
}

function renderStructures() {
    const acc = document.getElementById('acc-structures');
    acc.innerHTML = structuresDB.map(s => `
        <div class="accordion">
            <div class="accordion-head" onclick="toggleAccordion(this)"><span>${s.n}</span><span>▼</span></div>
            <div class="accordion-body">
                <p style="margin-bottom:8px; color:var(--sage);"><strong>${s.p}</strong></p>
                <p style="margin-bottom:14px; font-size:0.84rem;"><em>Ideal para: ${s.w}</em></p>
                <div style="background:var(--sage-pale); padding:1rem; border-radius:8px; white-space:pre-line; font-family:monospace; font-size:0.88rem; margin-bottom:14px;">${s.s}</div>
                <button class="btn btn-sm btn-sage" onclick="copyText('${s.s.replace(/\n/g, '\\n').replace(/'/g, "\\'")}')">Copiar Estructura</button>
            </div>
        </div>
    `).join('');
}

function renderPrompts() {
    const acc = document.getElementById('acc-prompts');
    acc.innerHTML = promptsIA.map((p, idx) => `
        <div class="accordion">
            <div class="accordion-head" onclick="toggleAccordion(this)"><span>Prompt Maestro #${idx+1}</span><span>▼</span></div>
            <div class="accordion-body">
                <div class="prompt-box" id="p-box-${idx}">${p}</div>
                <button class="btn btn-sm btn-sage" onclick="copyText(document.getElementById('p-box-${idx}').innerText)">Copiar Prompt</button>
            </div>
        </div>
    `).join('');
}

function renderSituations() {
    const grid = document.getElementById('grid-situations');
    grid.innerHTML = situations.map((s, idx) => `
        <div class="data-card" style="align-items:flex-start; cursor:pointer;" onclick="openSituationModal(${idx})">
            <h4 style="margin:0;">${s.n}</h4>
            <p style="font-size:0.82rem;">${s.fmt.split(',')[0]}...</p>
        </div>
    `).join('');
}

function renderGlossary() {
    const container = document.getElementById('acc-glossary');
    if (!container) return;
    container.innerHTML = `
        <div class="gloss-grid">
            ${glossaryData.map(g => `
                <div class="gloss-item">
                    <div class="gloss-level">${g.level} · ${g.tag}</div>
                    <div class="gloss-term">${g.term}</div>
                    <div class="gloss-def">${g.def}</div>
                </div>
            `).join('')}
        </div>
    `;
}

// Vinculación al objeto global Window para que funcionen tus "onclick" del HTML
window.openSection = function(id) {
    const target = document.getElementById(id);
    if (!target) return;
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
    document.getElementById('hero').style.display = 'none';
    document.getElementById('hub').style.display = 'none';
    target.classList.add('active');
    window.scrollTo({top:0, behavior:'smooth'});
};

window.closeSection = function() {
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
    document.getElementById('hero').style.display = 'block';
    document.getElementById('hub').style.display = 'block';
    window.scrollTo({top:0, behavior:'smooth'});
};

window.toggleAccordion = function(el) { el.parentElement.classList.toggle('open'); };

window.openFormatModal = function(idx, type) {
    const data = videoFormats[idx];
    document.getElementById('fm-title').innerText = data.n;
    document.getElementById('fm-cat').innerText = data.c;
    document.getElementById('fm-obj').innerText = data.o;
    document.getElementById('fm-idl').innerText = data.i;
    document.getElementById('fm-dif').innerText = data.d;
    document.getElementById('fm-whe').innerText = data.w;
    document.getElementById('fm-psy').innerText = data.psy;
    document.getElementById('fm-rec').innerText = data.r;
    document.getElementById('fm-hv').innerText = data.hv;
    document.getElementById('fm-ht').innerText = data.ht;
    document.getElementById('fm-hb').innerText = data.hb;
    document.getElementById('fm-str').innerText = data.s;
    document.getElementById('fm-cta').innerText = data.cta;
    document.getElementById('fm-ej').innerText = data.ej;
    document.getElementById('fm-err').innerText = data.err;
    document.getElementById('fm-prm').innerText = data.p;
    document.getElementById('formatModal').classList.add('active');
};

window.openRecursoModal = function(idx) {
    const e = recursosFormats[idx];
    document.getElementById('fm-title').innerText = e.n;
    document.getElementById('fm-cat').innerText = 'Recurso Digital';
    document.getElementById('fm-obj').innerText = 'Vender o promocionar recurso digital terapéutico.';
    document.getElementById('fm-idl').innerText = 'Psicólogos con guías, workbooks o talleres.';
    document.getElementById('fm-dif').innerText = 'Variable';
    document.getElementById('fm-whe').innerText = e.w;
    document.getElementById('fm-psy').innerText = 'Generación de deseo y confianza a través de la transparencia sobre el recurso.';
    document.getElementById('fm-rec').innerText = e.r;
    document.getElementById('fm-hv').innerText = e.h;
    document.getElementById('fm-ht').innerText = e.h;
    document.getElementById('fm-hb').innerText = 'N/A - usar el hook textual como apertura verbal.';
    document.getElementById('fm-str').innerText = '1. Hook visual\n2. Desarrollo del valor del recurso\n3. Para quién es\n4. CTA';
    document.getElementById('fm-cta').innerText = e.c;
    document.getElementById('fm-ej').innerText = e.e;
    document.getElementById('fm-err').innerText = 'Mostrar el recurso sin enseñar su interior o prometer que reemplaza la terapia.';
    document.getElementById('fm-prm').innerText = e.p;
    document.getElementById('formatModal').classList.add('active');
};

window.openHTModal = function(idx) {
    const h = htFormats[idx];
    document.getElementById('fm-title').innerText = h.n;
    document.getElementById('fm-cat').innerText = 'Servicio Premium';
    document.getElementById('fm-obj').innerText = h.o;
    document.getElementById('fm-idl').innerText = 'Psicólogos con servicios de consulta, mentoría o programas.';
    document.getElementById('fm-dif').innerText = 'Avanzada';
    document.getElementById('fm-whe').innerText = h.w;
    document.getElementById('fm-psy').innerText = 'Filtro de autoridad y reducción del miedo a dar el primer paso.';
    document.getElementById('fm-rec').innerText = 'Tono empático y profesional, entorno cálido.';
    document.getElementById('fm-hv').innerText = 'Visual asociado al proceso o al bienestar.';
    document.getElementById('fm-ht').innerText = h.h;
    document.getElementById('fm-hb').innerText = h.h;
    document.getElementById('fm-str').innerText = '1. Hook\n2. Diagnóstico o dolor\n3. Reencuadre empático\n4. Solución/proceso\n5. CTA ético';
    document.getElementById('fm-cta').innerText = h.c;
    document.getElementById('fm-ej').innerText = h.e;
    document.getElementById('fm-err').innerText = 'Sonar desesperado por llenar agenda o prometer resultados garantizados.';
    document.getElementById('fm-prm').innerText = h.p;
    document.getElementById('formatModal').classList.add('active');
};

window.openSituationModal = function(idx) {
    const s = situations[idx];
    document.getElementById('sm-title').innerText = s.n;
    document.getElementById('sm-fmt').innerHTML = `<li>${s.fmt}</li>`;
    document.getElementById('sm-hv').innerText = s.hv;
    document.getElementById('sm-txt').innerText = s.txt;
    document.getElementById('sm-cta').innerText = s.cta;
    document.getElementById('sm-prm').innerText = s.p;
    document.getElementById('sitModal').classList.add('active');
};

window.closeModal = function(id) { document.getElementById(id).classList.remove('active'); };

window.showToast = function() {
    const t = document.getElementById('toast');
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2500);
};

window.copyText = function(text) {
    const decoded = text.replace(/\\n/g, '\n');
    const temp = document.createElement('textarea');
    temp.value = decoded;
    document.body.appendChild(temp);
    temp.select();
    try { document.execCommand('copy'); window.showToast(); } catch(e) {}
    document.body.removeChild(temp);
};

window.copyFromElement = function(id) {
    const el = document.getElementById(id);
    if (!el) return;
    window.copyText(el.innerText);
};

window.buildFormula = function() {
    const obj = document.getElementById('b-obj').value;
    const fmt = document.getElementById('b-fmt').value;
    const eng = document.getElementById('b-eng').value;
    const cta = document.getElementById('b-cta').value;

    document.getElementById('r-fmt').innerText = `${fmt} con tono ${eng}`;
    document.getElementById('r-hvis').innerText = 'Si es Faceless: B-roll de naturaleza, manos o espacio terapéutico. Si es a cámara: mirada directa con pausa empática.';
    document.getElementById('r-htex').innerText = `Texto ancla en pantalla conectando con el dolor para el objetivo de "${obj.toLowerCase()}".`;
    document.getElementById('r-hver').innerText = `Apertura ${eng.toLowerCase()} que valide y active reconocimiento emocional.`;
    document.getElementById('r-str').innerText = '1. Hook empático\n2. Validación / Contexto clínico\n3. Herramienta o perspectiva\n4. Cierre esperanzador\n5. CTA';
    document.getElementById('r-cta').innerText = cta;

    const prompt = `Actúa como Estratega de Contenido especializado en Psicología y Salud Mental.
Objetivo del video: ${obj}.
Formato visual: ${fmt}.
Tono de marca: ${eng}.
Llamado a la acción: Que la persona termine haciendo "${cta}".

Genera 3 ideas de guion usando la estructura 'Dolor → Validación → Herramienta → Invitación' para este formato exacto.
Aplica neuroventas éticas y lenguaje accesible sin trivializar la salud mental.
Incluye: dirección visual de los primeros 3 segundos, texto en pantalla y guion narrado completo.
Especialidad: [MI ESPECIALIDAD]. Paciente ideal: [DESCRIBE A TU PACIENTE IDEAL].`;

    document.getElementById('r-prompt').innerText = prompt;
    const resultBox = document.getElementById('builder-result');
    resultBox.style.display = 'block';
    resultBox.scrollIntoView({behavior:'smooth', block:'nearest'});
};

window.onload = function() {
    renderVideoFormats();
    renderObjectives();
    renderRecursos();
    renderHighTicket();
    renderFaceless();
    renderListDB('acc-hooks', hooksDB);
    renderListDB('acc-ctas', ctasDB);
    renderListDB('acc-visual-hooks', visualHooksDB);
    renderListDB('acc-peaks', peaksDB);
    renderStructures();
    renderPrompts();
    renderSituations();
    renderGlossary();
    renderListDB('acc-errors', errorsDB);
};
