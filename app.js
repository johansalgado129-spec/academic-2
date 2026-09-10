const app = document.getElementById('app');
const title = document.getElementById('pageTitle');
const storageKey = 'dotnetAcademyProgressV1';
let state = JSON.parse(localStorage.getItem(storageKey) || '{"modules":[],"quiz":{},"capstone":[]}');
let currentModule = MODULES[0];
let testTimer = null;
let testRemaining = 25 * 60;

function save(){ localStorage.setItem(storageKey, JSON.stringify(state)); updateProgressUI(); }
function completedCount(){ return state.modules.filter(id => MODULES.some(m => m.id === id)).length; }
function progressPct(){ return Math.round((completedCount()/MODULES.length)*100); }
function updateProgressUI(){
  const pct=progressPct();
  document.getElementById('sidebarProgressText').textContent=`${pct}% completado`;
  document.getElementById('sidebarProgressBar').style.width=`${pct}%`;
}
function esc(s=''){ return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c])); }
function codeBlock(code, lang=''){ return `<div class="code-block"><div class="code-toolbar"><span>${lang}</span><button class="copy-btn" data-code="${encodeURIComponent(code)}">Copiar</button></div><pre><code>${esc(code)}</code></pre></div>`; }
function viewName(view){ return ({dashboard:'Panel de entrenamiento',roadmap:'Ruta de aprendizaje',lesson:'Lecciones guiadas','csharp-lab':'Laboratorio C#','sql-lab':'Laboratorio SQL',quiz:'Banco de preguntas','technical-test':'Simulador de prueba técnica',cheatsheets:'Cheatsheets',videos:'Videos en español',capstone:'Proyecto final',glossary:'Glosario técnico'})[view]; }

function navigate(view){
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.view===view));
  title.textContent=viewName(view);
  if(testTimer && view!=='technical-test'){ clearInterval(testTimer); testTimer=null; }
  ({dashboard:renderDashboard,roadmap:renderRoadmap,lesson:renderLesson,'csharp-lab':renderCSharpLab,'sql-lab':renderSqlLab,quiz:renderQuiz,'technical-test':renderTechnicalTest,cheatsheets:renderCheats,videos:renderVideos,capstone:renderCapstone,glossary:renderGlossary}[view])();
  window.scrollTo({top:0,behavior:'smooth'});
}

document.getElementById('nav').addEventListener('click',e=>{ const b=e.target.closest('.nav-btn'); if(b) navigate(b.dataset.view); });
document.addEventListener('click',async e=>{
  const c=e.target.closest('.copy-btn'); if(c){ await navigator.clipboard.writeText(decodeURIComponent(c.dataset.code)); const old=c.textContent;c.textContent='Copiado';setTimeout(()=>c.textContent=old,1000); }
  const go=e.target.closest('[data-go]'); if(go) navigate(go.dataset.go);
  const open=e.target.closest('[data-open-module]'); if(open){ currentModule=MODULES.find(m=>m.id===Number(open.dataset.openModule)); navigate('lesson'); }
  const mark=e.target.closest('[data-mark-module]'); if(mark){ toggleModule(Number(mark.dataset.markModule)); renderRoadmap(); }
});

document.getElementById('resetProgress').addEventListener('click',()=>{
  if(confirm('¿Seguro que quieres reiniciar todo el progreso?')){ state={modules:[],quiz:{},capstone:[]}; save(); navigate('dashboard'); }
});

function toggleModule(id){
  state.modules=state.modules.includes(id)?state.modules.filter(x=>x!==id):[...state.modules,id]; save();
}

function renderDashboard(){
  const pct=progressPct();
  const next=MODULES.find(m=>!state.modules.includes(m.id)) || MODULES.at(-1);
  app.innerHTML=`
    <div class="hero">
      <span class="eyebrow">Aprender → practicar → demostrar</span>
      <h2>Entrena .NET, C# y SQL como si ya estuvieras en la prueba técnica.</h2>
      <p>Esta academia combina fundamentos, código real, ejercicios, arquitectura, bases de datos y preguntas de entrevista. No intentes memorizar snippets: escribe, rompe, depura y explica cada solución.</p>
      <div class="hero-actions"><button class="primary" data-go="roadmap">Continuar ruta</button><button class="secondary" data-go="technical-test">Hacer simulacro</button></div>
    </div>
    <div class="stats">
      <div class="stat"><strong>${completedCount()}/${MODULES.length}</strong><span>Módulos completados</span></div>
      <div class="stat"><strong>${CSHARP_CHALLENGES.length}</strong><span>Retos C#</span></div>
      <div class="stat"><strong>${SQL_CHALLENGES.length}</strong><span>Retos SQL</span></div>
      <div class="stat"><strong>${QUIZ.length}</strong><span>Preguntas técnicas</span></div>
    </div>
    <div class="section-title"><h2>Tu siguiente paso</h2><p>Avance guardado automáticamente en este navegador</p></div>
    <div class="grid two">
      <div class="card dashboard-progress"><div class="progress-ring" style="--progress:${pct}%"><span>${pct}%</span></div><div><span class="module-number">MÓDULO ${next.id}</span><h3>${next.title}</h3><p class="muted">${next.duration} · ${next.level}</p><button class="primary" data-open-module="${next.id}">Estudiar ahora</button></div></div>
      <div class="card"><h3>Regla de preparación</h3><p class="muted">Para cada tema debes alcanzar tres niveles:</p><div class="checklist"><div class="check-row">1. <span><strong>Reconocer:</strong> sabes qué significa el concepto.</span></div><div class="check-row">2. <span><strong>Aplicar:</strong> puedes escribirlo sin copiar.</span></div><div class="check-row">3. <span><strong>Explicar:</strong> puedes defender decisiones y trade-offs.</span></div></div></div>
    </div>
    <div class="section-title"><h2>Mapa de dominio</h2></div>
    <div class="grid three">
      ${[['C#','Sintaxis · POO · LINQ · async · excepciones'],['Datos','Modelo relacional · SQL · índices · transacciones'],['Backend','ASP.NET Core · REST · DI · middleware'],['Persistencia','EF Core · migraciones · consultas · tracking'],['Calidad','SOLID · testing · patrones · arquitectura'],['Vacante','Debugging · seguridad · performance · entrevista']].map(x=>`<div class="card"><h3>${x[0]}</h3><p class="muted">${x[1]}</p></div>`).join('')}
    </div>`;
}

function renderRoadmap(){
  app.innerHTML=`<div class="card"><h2>Ruta completa: de cero a nivel de vacante</h2><p class="muted">Completa los módulos en orden las primeras veces. Después usa el contenido como mapa de repaso.</p></div><div class="grid three" style="margin-top:16px">${MODULES.map(m=>{
    const done=state.modules.includes(m.id); return `<article class="card module-card"><div class="module-top"><span class="module-number">MÓDULO ${String(m.id).padStart(2,'0')}</span><span class="level">${m.level}</span></div><h3>${m.title}</h3><p>${m.goals.slice(0,2).join(' · ')}</p><span class="pill">${m.duration}</span><div class="module-actions"><button class="outline-btn" data-open-module="${m.id}">Abrir</button><button class="status-btn ${done?'done':''}" data-mark-module="${m.id}">${done?'✓ Completado':'Marcar completo'}</button></div></article>`}).join('')}</div>`;
}

function renderLesson(){
  const m=currentModule;
  app.innerHTML=`<div class="lesson-shell">
    <aside class="card lesson-list">${MODULES.map(x=>`<button class="lesson-item ${x.id===m.id?'active':''}" data-lesson-id="${x.id}"><span class="module-number">${String(x.id).padStart(2,'0')}</span><br>${x.title}</button>`).join('')}</aside>
    <article class="card lesson-content"><div class="module-top"><span class="module-number">MÓDULO ${m.id}</span><span class="level">${m.level} · ${m.duration}</span></div><h2>${m.title}</h2><h3>Qué debes dominar</h3><ul>${m.goals.map(g=>`<li>${g}</li>`).join('')}</ul><h3>Explicación</h3>${m.theory}<h3>Código / comandos</h3>${codeBlock(m.code,m.id===9||m.id===10?'SQL':m.id===1?'Terminal':'C#')}<div class="callout"><strong>Para entrevista:</strong> ${m.key}</div><h3>Autoevaluación oral</h3><p>Sin mirar arriba, explica el tema en 90 segundos. Después escribe un ejemplo diferente al mostrado y menciona un error frecuente.</p><div class="module-actions"><button id="lessonDone" class="status-btn ${state.modules.includes(m.id)?'done':''}">${state.modules.includes(m.id)?'✓ Completado':'Marcar módulo como completado'}</button>${m.id<MODULES.length?`<button id="nextLesson" class="primary">Siguiente módulo</button>`:''}</div></article>
  </div>`;
  document.querySelector('.lesson-list').addEventListener('click',e=>{const b=e.target.closest('[data-lesson-id]');if(b){currentModule=MODULES.find(x=>x.id===Number(b.dataset.lessonId));renderLesson();}});
  document.getElementById('lessonDone').onclick=()=>{toggleModule(m.id);renderLesson();};
  const next=document.getElementById('nextLesson'); if(next) next.onclick=()=>{currentModule=MODULES.find(x=>x.id===m.id+1);renderLesson();window.scrollTo(0,0);};
}

function labTemplate(kind, challenges){
  const c=challenges[0];
  return `<div class="card"><h2>${kind==='C#'?'Laboratorio de C#':'Laboratorio SQL'}</h2><p class="muted">El validador local no compila ni ejecuta código: revisa elementos esperados para darte una señal rápida. Comprueba la solución real en tu IDE/base de datos.</p></div><div class="lab-wrap" style="margin-top:16px"><div class="card lab-pane"><select id="challengeSelect" class="challenge-select">${challenges.map((x,i)=>`<option value="${i}">${x.level} · ${x.title}</option>`).join('')}</select><h3 id="challengeTitle">${c.title}</h3><p id="challengePrompt" class="muted">${c.prompt}</p><textarea id="labEditor" spellcheck="false">${c.starter}</textarea><div class="hero-actions"><button id="validateLab" class="primary">Validar enfoque</button><button id="resetLab" class="secondary">Restablecer</button></div></div><div class="card"><h3>Resultado del entrenador</h3><div id="labResult" class="lab-result">Escribe tu solución y pulsa “Validar enfoque”.</div><h3 style="margin-top:24px">Cómo trabajar el reto</h3><div class="checklist"><div class="check-row">① <span>Resuélvelo sin buscar la respuesta.</span></div><div class="check-row">② <span>Prueba casos normales, borde y entradas inválidas.</span></div><div class="check-row">③ <span>Explica complejidad, decisiones y alternativas.</span></div><div class="check-row">④ <span>Reescríbelo buscando legibilidad.</span></div></div></div></div>`;
}
function bindLab(challenges){
  let current=0; const sel=document.getElementById('challengeSelect'), editor=document.getElementById('labEditor'), res=document.getElementById('labResult');
  function load(){ const c=challenges[current]; document.getElementById('challengeTitle').textContent=c.title;document.getElementById('challengePrompt').textContent=c.prompt;editor.value=c.starter;res.textContent='Escribe tu solución y pulsa “Validar enfoque”.'; }
  sel.onchange=()=>{current=Number(sel.value);load();}; document.getElementById('resetLab').onclick=load;
  document.getElementById('validateLab').onclick=()=>{const c=challenges[current], text=editor.value;const hit=c.checks.filter(k=>text.toLowerCase().includes(k.toLowerCase()));const missing=c.checks.filter(k=>!text.toLowerCase().includes(k.toLowerCase()));const score=Math.round(hit.length/c.checks.length*100);res.innerHTML=`<strong class="${score===100?'success':score>=60?'':'error'}">Cobertura orientativa: ${score}%</strong><p>Detectado: ${hit.length?hit.map(esc).join(', '):'ningún elemento esperado todavía'}.</p>${missing.length?`<p>Revisa si tu solución debería incluir o justificar: <strong>${missing.map(esc).join(', ')}</strong>.</p>`:'<p class="success">Tu enfoque contiene todos los elementos clave esperados. Ahora compílalo/ejecútalo y prueba casos borde.</p>'}`;};
}
function renderCSharpLab(){app.innerHTML=labTemplate('C#',CSHARP_CHALLENGES);bindLab(CSHARP_CHALLENGES)}
function renderSqlLab(){app.innerHTML=labTemplate('SQL',SQL_CHALLENGES);bindLab(SQL_CHALLENGES)}

function renderQuiz(){
  let answered=0, correct=0;
  app.innerHTML=`<div class="card"><div class="module-top"><div><h2>Banco de ${QUIZ.length} preguntas</h2><p class="muted">Responde y lee la explicación, incluso cuando aciertes.</p></div><div><span id="quizScore" class="quiz-score">0 / 0</span></div></div></div><div id="questions" class="card" style="margin-top:16px">${QUIZ.map((q,qi)=>`<div class="question" data-q="${qi}"><span class="module-number">PREGUNTA ${qi+1}</span><h3>${q.q}</h3><div class="options">${q.o.map((o,oi)=>`<button class="option" data-o="${oi}">${o}</button>`).join('')}</div><div class="interview-answer"></div></div>`).join('')}</div>`;
  document.getElementById('questions').onclick=e=>{const o=e.target.closest('.option');if(!o)return;const qel=o.closest('.question');if(qel.dataset.done)return;qel.dataset.done='1';const qi=Number(qel.dataset.q),oi=Number(o.dataset.o),q=QUIZ[qi];answered++;if(oi===q.a)correct++;qel.querySelectorAll('.option').forEach((b,i)=>b.classList.add(i===q.a?'correct':i===oi?'wrong':''));const expl=qel.querySelector('.interview-answer');expl.textContent=q.e;expl.classList.add('show');document.getElementById('quizScore').textContent=`${correct} / ${answered}`;state.quiz={answered,correct};save();};
}

function renderTechnicalTest(){
  testRemaining=25*60; const selected=[...QUIZ].sort(()=>Math.random()-.5).slice(0,10);
  app.innerHTML=`<div class="card test-head"><div><h2>Simulacro de 25 minutos</h2><p class="muted">10 preguntas + 1 reto C# + 1 reto SQL. Intenta completarlo sin documentación.</p></div><div id="timer" class="timer">25:00</div></div><div class="grid two" style="margin-top:16px"><div class="card"><h3>Parte A · Teoría</h3><div id="testQuestions">${selected.map((q,i)=>`<div class="question" data-ti="${i}"><h3>${i+1}. ${q.q}</h3><div class="options">${q.o.map((o,j)=>`<button class="option" data-to="${j}">${o}</button>`).join('')}</div></div>`).join('')}</div></div><div><div class="card"><h3>Parte B · C#</h3><p class="muted">${CSHARP_CHALLENGES[5].prompt}</p><textarea id="testCs" style="width:100%;min-height:220px;background:#050b14;color:#d8e6ff;border:1px solid var(--line);border-radius:12px;padding:12px;font-family:Consolas">${CSHARP_CHALLENGES[5].starter}</textarea></div><div class="card" style="margin-top:16px"><h3>Parte C · SQL</h3><p class="muted">${SQL_CHALLENGES[4].prompt}</p><textarea id="testSql" style="width:100%;min-height:180px;background:#050b14;color:#d8e6ff;border:1px solid var(--line);border-radius:12px;padding:12px;font-family:Consolas">${SQL_CHALLENGES[4].starter}</textarea></div><button id="finishTest" class="primary" style="margin-top:16px;width:100%">Finalizar simulacro</button></div></div><div id="testResult" class="card hidden" style="margin-top:16px"></div>`;
  let testAnswers={};document.getElementById('testQuestions').onclick=e=>{const b=e.target.closest('.option');if(!b)return;const qe=b.closest('.question');if(qe.dataset.done)return;qe.dataset.done='1';const i=Number(qe.dataset.ti);testAnswers[i]=Number(b.dataset.to);qe.querySelectorAll('.option').forEach(x=>x.classList.remove('correct','wrong'));b.classList.add('correct');};
  testTimer=setInterval(()=>{testRemaining--;const m=Math.floor(testRemaining/60),s=testRemaining%60;const t=document.getElementById('timer');if(t)t.textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;if(testRemaining<=0){clearInterval(testTimer);testTimer=null;finish();}},1000);
  function finish(){if(testTimer){clearInterval(testTimer);testTimer=null;}let score=0;selected.forEach((q,i)=>{if(testAnswers[i]===q.a)score++;});const cs=document.getElementById('testCs').value,sql=document.getElementById('testSql').value;const csPct=Math.round(CSHARP_CHALLENGES[5].checks.filter(k=>cs.toLowerCase().includes(k.toLowerCase())).length/CSHARP_CHALLENGES[5].checks.length*100);const sqlPct=Math.round(SQL_CHALLENGES[4].checks.filter(k=>sql.toLowerCase().includes(k.toLowerCase())).length/SQL_CHALLENGES[4].checks.length*100);const total=Math.round((score/10*60)+(csPct*.2)+(sqlPct*.2));const r=document.getElementById('testResult');r.classList.remove('hidden');r.innerHTML=`<h2>Resultado orientativo: ${total}%</h2><p>Teoría: <strong>${score}/10</strong> · C#: <strong>${csPct}%</strong> de elementos esperados · SQL: <strong>${sqlPct}%</strong>.</p><div class="callout ${total<70?'warn':''}">${total>=85?'Buen nivel. Repite explicando cada decisión y añade pruebas.':total>=70?'Vas bien, pero repasa las áreas falladas y repite el simulacro.':'Conviene reforzar fundamentos antes de simular bajo tiempo.'}</div>`;r.scrollIntoView({behavior:'smooth'});}
  document.getElementById('finishTest').onclick=finish;
}

function renderCheats(){
  app.innerHTML=`<div class="card"><h2>Cheatsheets de repaso rápido</h2><p class="muted">Úsalas para repasar; durante la práctica intenta escribir sin mirar.</p></div>${Object.entries(CHEATS).map(([name,rows])=>`<div class="card" style="margin-top:16px"><h3>${name}</h3><div style="overflow:auto"><table class="cheat-table"><thead><tr><th>Comando / concepto</th><th>Uso</th></tr></thead><tbody>${rows.map(r=>`<tr><td><code>${esc(r[0])}</code></td><td>${r[1]}</td></tr>`).join('')}</tbody></table></div></div>`).join('')}`;
}

function renderVideos(){
  app.innerHTML=`<div class="card"><h2>Videos en español para acompañar la ruta</h2><p class="muted">Úsalos como apoyo. Pausa cada sección y reproduce el código por tu cuenta. La disponibilidad depende de YouTube.</p></div><div class="grid two" style="margin-top:16px">${VIDEOS.map(v=>`<article class="card video-card"><iframe src="https://www.youtube-nocookie.com/embed/${v.id}" title="${esc(v.title)}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe><h3>${v.title}</h3><p class="muted">${v.desc}</p></article>`).join('')}</div><div class="card" style="margin-top:16px"><h3>Documentación oficial</h3><p class="muted">Complementa los videos con Microsoft Learn: <a style="color:#a9a1ff" href="https://learn.microsoft.com/es-es/dotnet/" target="_blank">.NET</a> · <a style="color:#a9a1ff" href="https://learn.microsoft.com/es-es/dotnet/csharp/" target="_blank">C#</a> · <a style="color:#a9a1ff" href="https://learn.microsoft.com/es-es/aspnet/core/" target="_blank">ASP.NET Core</a> · <a style="color:#a9a1ff" href="https://learn.microsoft.com/es-es/ef/core/" target="_blank">EF Core</a>.</p></div>`;
}

const CAPSTONE=[
 'Crear solución y API ASP.NET Core','Diseñar entidades Cliente, Producto, Pedido y DetallePedido','Crear relaciones y restricciones','Configurar EF Core y SQLite/SQL Server','Crear migración inicial','Implementar CRUD con DTOs','Agregar filtros, paginación y ordenamiento','Crear consulta de top productos y ventas por cliente','Validar entradas y devolver códigos HTTP correctos','Agregar manejo global de errores','Agregar autenticación/autorización o explicar diseño','Crear pruebas unitarias de servicios','Crear al menos una prueba de integración','Agregar logging estructurado','Revisar consultas y evitar N+1','Documentar ejecución y decisiones en README','Explicar 3 trade-offs de arquitectura','Preparar demo de 5 minutos sin leer notas'
];
function renderCapstone(){
  app.innerHTML=`<div class="hero"><span class="eyebrow">Proyecto integrador</span><h2>Construye una API de pedidos como prueba técnica real</h2><p>El repositorio ya incluye una API pequeña en <code>src/TechTest.Api</code>. Tu misión es entenderla y evolucionarla hasta cubrir este checklist. No copies una arquitectura enorme: demuestra criterio.</p></div><div class="grid two" style="margin-top:16px"><div class="card"><h3>Checklist</h3><div class="checklist">${CAPSTONE.map((x,i)=>`<label class="check-row"><input type="checkbox" data-cap="${i}" ${state.capstone.includes(i)?'checked':''}><span>${x}</span></label>`).join('')}</div></div><div class="card"><h3>Criterios con los que te evaluarían</h3><div class="checklist"><div class="check-row"><strong>20%</strong><span>Corrección funcional y casos borde</span></div><div class="check-row"><strong>20%</strong><span>Diseño de datos y SQL</span></div><div class="check-row"><strong>20%</strong><span>C# limpio, async y manejo de errores</span></div><div class="check-row"><strong>15%</strong><span>REST, validación y seguridad</span></div><div class="check-row"><strong>15%</strong><span>Testing</span></div><div class="check-row"><strong>10%</strong><span>README y explicación técnica</span></div></div><h3 style="margin-top:24px">Preguntas que debes poder responder</h3><p class="muted">¿Por qué esta relación? ¿Por qué Scoped? ¿Qué consulta podría ser lenta? ¿Cómo evitarías doble envío? ¿Qué harías distinto a gran escala? ¿Qué pruebas priorizaste?</p></div></div>`;
  app.querySelectorAll('[data-cap]').forEach(x=>x.onchange=()=>{const i=Number(x.dataset.cap);state.capstone=x.checked?[...new Set([...state.capstone,i])]:state.capstone.filter(v=>v!==i);save();});
}

function renderGlossary(){
  app.innerHTML=`<div class="card"><h2>Glosario técnico</h2><input id="glossarySearch" class="glossary-search" placeholder="Buscar: LINQ, JWT, índice, Task..."><div id="terms"></div></div>`;
  const terms=document.getElementById('terms'),input=document.getElementById('glossarySearch');function draw(){const q=input.value.toLowerCase();terms.innerHTML=GLOSSARY.filter(x=>x.join(' ').toLowerCase().includes(q)).map(x=>`<div class="term"><strong>${x[0]}</strong><span>${x[1]}</span></div>`).join('')||'<p class="muted">Sin coincidencias.</p>';}input.oninput=draw;draw();
}

updateProgressUI();
navigate('dashboard');
