/* ==========================================
   ÍNDICE DE FUNCIONES
   [APP-01] INICIALIZADOR Y ENRUTADOR 
   [APP-02] BASES DE DATOS Y GLOBALES
   [APP-03] LÓGICA DE NOTIFICACIONES
   [APP-04] LÓGICA MODAL MOVIMIENTOS Y REVERSIÓN
   [APP-05] PÁGINA HISTORIAL Y BÚSQUEDA FUZZY
   [APP-06] PÁGINA COMPROMISOS (PAGOS FIJOS Y DEUDAS)
   ========================================== */

// ==========================================
// [APP-02] BASES DE DATOS (Mocks) Y GLOBALES
// ==========================================
// ==========================================
// [APP-02] BASES DE DATOS (Mocks) Y GLOBALES
// ==========================================
let cuentasDB = [];

let sobresDB = [];

let compromisosDB = [];

let metasDB = [];

let prestamosDB = [];

let historialDB = [];

let categoriasDB = ["Groceries", "Transport", "Health", "Utilities", "Leisure", "Education", "Home", "General"];



// Variables Globales Maestras
let idEdicionActual = null;
let movimientosSeleccionados = [];

// Utilidades de Fecha
// Etiquetas visibles (los valores internos de "tipo" se mantienen en español)
function kodaTipoLabel(tipo) {
    const mapa = {
        'Gasto': 'Expense', 'Ingreso': 'Income', 'Transferencia': 'Transfer',
        'Aporte a Meta': 'Goal contribution', 'Pago de Deuda': 'Debt payment',
        'Pago de Compromiso': 'Bill payment', 'Fondeo de Sobre': 'Envelope funding', 'Préstamo': 'Loan'
    };
    return mapa[tipo] || tipo;
}

function formatearFechaUI(fechaISO) {
    const fObj = new Date(fechaISO.split('T')[0] + 'T00:00:00');
    return fObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatearFechaHoraUI(fechaISO) {
    let str = fechaISO.includes('T') ? fechaISO : fechaISO + 'T12:00:00';
    const fObj = new Date(str);
    const fecha = fObj.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
    const hora = fObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    return { fecha, hora };
}

function toggleTheme() { document.documentElement.classList.toggle('dark'); }

// --- UTILIDAD DE ESTADOS DE CARGA (UI) ---
// ==========================================
// [APP-01] INICIALIZADOR Y ENRUTADOR
// ==========================================
async function inicializarKODA() {
    try {
        // 1. Cargar Navbar si existe el contenedor
        const contNav = document.getElementById('contenedor-navbar');
        if(contNav) {
            const navRes = await fetch('navbar.html');
            contNav.innerHTML = await navRes.text();
        }
        
        // 2. Cargar Modal General si existe el contenedor (Evita el error en Metas)
        const contModal = document.getElementById('contenedor-modal');
        if(contModal) {
            const modRes = await fetch('modal_movimientos.html');
            contModal.innerHTML = await modRes.text();
        }

        // 2b. Cargar los datos reales desde Google Sheets (si está conectado)
        await kodaNubeCargar();

        // 3. Posicionar el Slider Apple (Píldora) de forma segura
        const ruta = window.location.pathname.toLowerCase();
        let btnActivo = document.getElementById('nav-btn-dashboard'); // Por defecto
        
        if (ruta.includes('sobres')) btnActivo = document.getElementById('nav-btn-sobres');
        else if (ruta.includes('compromisos')) btnActivo = document.getElementById('nav-btn-compromisos');
        else if (ruta.includes('metas')) btnActivo = document.getElementById('nav-btn-metas');
        else if (ruta.includes('checkpay')) btnActivo = document.getElementById('nav-btn-checkpay');
        
        if (btnActivo) {
            setTimeout(() => {
                const slider = document.getElementById('nav-slider');
                if (!slider) return;
                let prev = null;
                try { prev = JSON.parse(sessionStorage.getItem('koda_nav_prev') || 'null'); sessionStorage.removeItem('koda_nav_prev'); } catch (e) {}

                btnActivo.classList.remove('text-koda-textMuted');
                btnActivo.classList.add('text-gray-900', 'dark:text-white');
                const destino = { width: `${btnActivo.offsetWidth}px`, transform: `translateX(${btnActivo.offsetLeft}px)` };

                slider.classList.remove('transition-all', 'duration-300');
                if (prev && prev.transform) {
                    // Arranca donde estaba en la página anterior y se desliza hasta aquí
                    slider.style.width = prev.width; slider.style.transform = prev.left;
                    void slider.offsetWidth;
                    slider.classList.add('transition-all', 'duration-300');
                    requestAnimationFrame(() => { slider.style.width = destino.width; slider.style.transform = destino.transform; });
                } else {
                    slider.style.width = destino.width; slider.style.transform = destino.transform;
                    setTimeout(() => { slider.classList.add('transition-all', 'duration-300'); }, 50);
                }
            }, 50);
        }

        // 4. Llenar dinámicamente selectores si existen
        const selectSobre = document.getElementById('filtro-sobre');
        if(selectSobre) {
            sobresDB.forEach(s => selectSobre.innerHTML += `<option value="${s.nombre}">${s.nombre}</option>`);
        }

        // 5. Inicializar vistas dependiendo de las funciones disponibles en la página actual
        if (typeof renderizarCuentas === 'function') renderizarCuentas();
        if (typeof renderizarSobresDashboard === 'function') renderizarSobresDashboard();
        if (typeof renderizarHistorialMini === 'function') renderizarHistorialMini();
        if (typeof renderizarPaginaSobres === 'function') renderizarPaginaSobres();
        if (typeof renderizarProximaMetaHome === 'function') renderizarProximaMetaHome();
        if (typeof renderizarPaginaHistorial === 'function') renderizarPaginaHistorial();
        if (typeof renderizarPaginaCompromisos === 'function') renderizarPaginaCompromisos('fijo');
        if (typeof renderizarWidgetCompromisos === 'function') renderizarWidgetCompromisos();
        if (typeof renderizarWidgetComparativa === 'function') renderizarWidgetComparativa('6M');
        if (typeof renderizarWidgetDistribucion === 'function') renderizarWidgetDistribucion();
        if (typeof renderizarWidgetCheckPayHome === 'function') renderizarWidgetCheckPayHome();
        
        if (typeof inicializarVistaMetas === 'function') inicializarVistaMetas();
        if (typeof chequearNotificaciones === 'function') chequearNotificaciones();

    } catch (error) {
        console.error("Error cargando componentes:", error);
    }
}
document.addEventListener('DOMContentLoaded', inicializarKODA);

const KODA_RUTAS = { dashboard: 'index.html', inicio: 'index.html', sobres: 'sobres.html', historial: 'historial.html', compromisos: 'compromisos.html', metas: 'metas.html', checkpay: 'checkpay.html' };

// Navega con la misma animación de salida en todas las páginas
function navegarConTransicion(url) {
    if (document.body.classList.contains('koda-saliendo')) return;
    document.body.classList.add('koda-saliendo');
    setTimeout(() => { window.location.href = url; }, 170);
}

function navegarA(pagina) {
    navegarConTransicion(KODA_RUTAS[pagina] || pagina);
}

function animarYNavegar(btn, pagina) {
    const slider = document.getElementById('nav-slider');
    
    // Si por alguna razón el slider no cargó, navegamos directo como plan B de seguridad
    if (!slider) { 
        navegarA(pagina); 
        return; 
    }

    // 1. Animamos la píldora a la posición correcta
    slider.style.width = `${btn.offsetWidth}px`;
    slider.style.transform = `translateX(${btn.offsetLeft}px)`;

    // 2. Cambiamos el color de los textos al instante
    document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.remove('text-gray-900', 'dark:text-white');
        el.classList.add('text-koda-textMuted');
    });
    btn.classList.remove('text-koda-textMuted');
    btn.classList.add('text-gray-900', 'dark:text-white');

    // 3. Recordamos de dónde venimos para que la píldora siga deslizándose en la página nueva
    try { sessionStorage.setItem('koda_nav_prev', JSON.stringify({ left: slider.style.transform, width: slider.style.width })); } catch (e) {}
    setTimeout(() => {
        navegarA(pagina);
    }, 120);
}

// ==========================================
// [APP-03] LÓGICA DE NOTIFICACIONES
// ==========================================
// ==========================================
// [APP-04] LÓGICA MODAL MOVIMIENTOS Y REVERSIÓN (ESTILO APPLE ZEN)
// ==========================================
let cuentaOrigenSeleccionadaId = null;
let cuentaDestinoSeleccionadaId = null;
let sobreSeleccionado = null;
let categoriaSeleccionada = "General";
let tipoActual = 'gasto';

const fechaHoy = new Date(); // Toma la fecha dinámica de tu PC
let fechaNavegacion = new Date();
let fechaSeleccionada = new Date();
const meses = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function animarTab(btn, tipo) {
    const slider = document.getElementById('tab-slider');
    if (slider && btn) {
        slider.style.width = `${btn.offsetWidth}px`;
        slider.style.transform = `translateX(${btn.offsetLeft - 4}px)`;
    }

    document.querySelectorAll('.tab-item').forEach(b => {
        b.classList.remove('text-white');
        b.classList.add('text-koda-steel');
    });
    if (btn) {
        btn.classList.add('text-white');
        btn.classList.remove('text-koda-steel');
    }

    tipoActual = tipo;
    const secSobre = document.getElementById('seccion-afectar-sobre');
    const secCat = document.getElementById('seccion-categorias');
    const panelMover = document.getElementById('panel-mover-destino');
    const panelPagar = document.getElementById('panel-pagar-opciones');
    const panelMeta = document.getElementById('panel-meta-opciones');

    if (secSobre) secSobre.classList.add('hidden');
    if (secCat) secCat.classList.add('hidden');
    if (panelMover) panelMover.classList.add('hidden');
    if (panelPagar) panelPagar.classList.add('hidden');
    if (panelMeta) panelMeta.classList.add('hidden');

    if (tipo === 'gasto') {
        if (secSobre) secSobre.classList.remove('hidden');
        if (secCat) secCat.classList.remove('hidden');
        renderizarSobresParaGasto();
    } else if (tipo === 'ingreso') {
        if (secCat) secCat.classList.remove('hidden');
    } else if (tipo === 'mover') {
        if (panelMover) panelMover.classList.remove('hidden');
        renderizarCuentasDestinoMover();
    } else if (tipo === 'pagar') {
        if (panelPagar) panelPagar.classList.remove('hidden');
        const primerSub = document.querySelectorAll('.btn-subpago')[0];
        if (primerSub) setSubtipoPago('fijos', primerSub);
    } else if (tipo === 'meta') {
        if (panelMeta) panelMeta.classList.remove('hidden');
        renderizarMetasFondeo();
    }
}

function toggleAnimacionSobres(activo) {
    const wrapper = document.getElementById('wrapper-sobres-reveal');
    const card = document.getElementById('card-toggle-sobre');
    const secCat = document.getElementById('seccion-categorias'); // El contenedor de categorías

    if (!wrapper || !card) return;
    if (activo) {
        wrapper.style.gridTemplateRows = "1fr";
        wrapper.style.opacity = "1";
        wrapper.style.transform = "translateY(0)";
        card.classList.remove('border-white/5');
        card.classList.add('border-koda-blue');
        
        // Ocultamos las categorías
        if(secCat) secCat.classList.add('hidden'); 
    } else {
        wrapper.style.gridTemplateRows = "0fr";
        wrapper.style.opacity = "0";
        wrapper.style.transform = "translateY(-4px)";
        card.classList.remove('border-koda-blue');
        card.classList.add('border-white/5');
        
        // Mostramos las categorías nuevamente
        if(secCat) secCat.classList.remove('hidden'); 
        
        // Reseteamos la selección del sobre y la alerta
        sobreSeleccionado = null;
        document.querySelectorAll('.pill-sobre-gasto').forEach(b => {
            b.className = 'pill-sobre-gasto px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-colors bg-[#0A0D12] text-koda-steel border-white/5 hover:border-white/10 cursor-pointer';
        });
        evaluarAlertaSobre();
    }
}

function toggleMasElementos(panelId, btn) {
    const panel = document.getElementById(panelId);
    if (!panel) return;
    const estaOculto = panel.classList.contains('hidden');
    if (estaOculto) {
        panel.classList.remove('hidden');
        if (btn) btn.innerHTML = `<span class="material-symbols-outlined text-[16px]">remove</span>`;
    } else {
        panel.classList.add('hidden');
        if (btn) btn.innerHTML = `<span class="material-symbols-outlined text-[16px]">add</span>`;
    }
}

function seleccionarCuentaOrigen(btn, id) {
    cuentaOrigenSeleccionadaId = id;
    document.querySelectorAll('.pill-cuenta').forEach(el => {
        el.className = 'pill-cuenta px-4 py-2.5 rounded-2xl text-[13.5px] font-semibold border transition-colors flex items-center gap-2.5 bg-[#0A0D12] text-koda-steel border-white/5 hover:border-white/10 cursor-pointer';
    });
    if (btn) btn.className = 'pill-cuenta active-pill px-4 py-2.5 rounded-2xl text-[13.5px] font-semibold border transition-colors flex items-center gap-2.5 bg-white/10 text-white border-white/30 cursor-pointer';

    if (tipoActual === 'mover') renderizarCuentasDestinoMover();
}

function renderizarCuentasDestinoMover() {
    const cont = document.getElementById('contenedor-mover-destino');
    if (!cont) return;
    cont.innerHTML = '';
    const filtradas = cuentasDB.filter(c => c.id !== cuentaOrigenSeleccionadaId);

    if (filtradas.length === 0 || !cuentaOrigenSeleccionadaId) {
        cont.innerHTML = `<span class="text-xs text-koda-steel italic">Elige cuenta origen primero.</span>`;
        return;
    }

    filtradas.forEach(c => {
        let siglaStr = c.sigla || "CTA";
        let bgClass = "bg-gray-800"; let textClass = "text-white";
        if (siglaStr === "BP") { bgClass = "bg-[#003b7a]/40"; textClass = "text-[#66b5ff]"; }
        else if (siglaStr === "BR") { bgClass = "bg-[#00558c]/40"; textClass = "text-[#66c2ff]"; }
        else if (siglaStr === "BHD") { bgClass = "bg-[#50ba40]/20"; textClass = "text-[#7ae66a]"; }

        cont.innerHTML += `
            <button type="button" onclick="seleccionarPillMoverDestino(this, ${c.id})" class="pill-mover-dest px-4 py-2.5 rounded-2xl text-[13.5px] font-semibold border transition-colors flex items-center gap-2.5 bg-[#0A0D12] text-koda-steel border-white/5 hover:border-white/10 cursor-pointer">
                <span class="w-6 h-6 rounded-full flex items-center justify-center text-[10px] shrink-0 font-semibold ${bgClass} ${textClass}">${siglaStr}</span>
                ${c.apodo}
            </button>
        `;
    });
}

function seleccionarPillMoverDestino(btn, id) {
    cuentaDestinoSeleccionadaId = id;
    document.querySelectorAll('.pill-mover-dest').forEach(b => {
        b.className = 'pill-mover-dest px-4 py-2.5 rounded-2xl text-[13.5px] font-semibold border transition-colors flex items-center gap-2.5 bg-[#0A0D12] text-koda-steel border-white/5 hover:border-white/10 cursor-pointer';
    });
    if (btn) btn.className = 'pill-mover-dest px-4 py-2.5 rounded-2xl text-[13.5px] font-semibold border transition-colors flex items-center gap-2.5 bg-white/10 text-white border-white/30 cursor-pointer';
}

function renderizarSobresParaGasto() {
    const cont = document.getElementById('contenedor-sobres-gasto');
    if (!cont) return;
    cont.innerHTML = '';
    const listado = typeof sobresDB !== 'undefined' ? sobresDB : [];
    let visibles = listado.slice(0, 3);
    let ocultos = listado.slice(3);

    visibles.forEach(s => {
        cont.innerHTML += `
            <button type="button" onclick="seleccionarSobreAqua(this, '${s.nombre}')" class="pill-sobre-gasto px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-colors bg-[#0A0D12] text-koda-steel border-white/5 hover:border-white/10 cursor-pointer">
                ${s.nombre}
            </button>
        `;
    });

    if (ocultos.length > 0) {
        cont.innerHTML += `
            <button type="button" onclick="toggleMasElementos('sobres-expandibles', this)" class="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 border border-white/5 flex items-center justify-center text-koda-steel hover:text-white transition-colors cursor-pointer">
                <span class="material-symbols-outlined text-[16px]">add</span>
            </button>
            <div id="sobres-expandibles" class="hidden flex flex-wrap justify-center gap-2 w-full pt-1"></div>
        `;
        const contOcultos = document.getElementById('sobres-expandibles');
        ocultos.forEach(s => {
            contOcultos.innerHTML += `
                <button type="button" onclick="seleccionarSobreAqua(this, '${s.nombre}')" class="pill-sobre-gasto px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-colors bg-[#0A0D12] text-koda-steel border-white/5 hover:border-white/10 cursor-pointer">
                    ${s.nombre}
                </button>
            `;
        });
    }
}

function seleccionarPillSimple(btn, grupo) {
    categoriaSeleccionada = btn ? btn.innerText.trim() : "General";
    document.querySelectorAll(`.pill-${grupo}`).forEach(b => {
        b.className = `pill-${grupo} px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors bg-[#0A0D12] text-koda-steel border-white/5 hover:border-white/10 cursor-pointer`;
    });
    if (btn) btn.className = `pill-${grupo} px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors bg-white/10 text-white border-white/20 cursor-pointer`;
}

// --- CALENDARIO DARK ZEN ---
function toggleCalendario() {
    const popover = document.getElementById('popover-calendario');
    if (!popover) return;
    popover.classList.toggle('hidden');
    renderizarCalendario();
}

function cambiarMes(delta) {
    fechaNavegacion.setMonth(fechaNavegacion.getMonth() + delta);
    renderizarCalendario();
}

function renderizarCalendario() {
    const mesAnoLabel = document.getElementById('cal-mes-ano');
    const grid = document.getElementById('cal-dias-grid');
    if (!mesAnoLabel || !grid) return;
    grid.innerHTML = '';

    const ano = fechaNavegacion.getFullYear();
    const mes = fechaNavegacion.getMonth();
    mesAnoLabel.innerText = `${meses[mes]} ${ano}`;

    const primerDia = new Date(ano, mes, 1).getDay();
    const totalDias = new Date(ano, mes + 1, 0).getDate();

    for (let i = 0; i < primerDia; i++) {
        grid.innerHTML += `<div class="p-1"></div>`;
    }

    for (let d = 1; d <= totalDias; d++) {
        const esHoy = fechaHoy.getDate() === d && fechaHoy.getMonth() === mes && fechaHoy.getFullYear() === ano;
        const esSeleccionado = fechaSeleccionada.getDate() === d && fechaSeleccionada.getMonth() === mes && fechaSeleccionada.getFullYear() === ano;

        let estiloDia = 'text-gray-300 hover:bg-white/5';
        if (esSeleccionado) {
            estiloDia = 'bg-koda-blue text-[#131722] font-semibold shadow-md';
        } else if (esHoy) {
            estiloDia = 'border border-koda-blue/40 text-koda-blue font-semibold bg-koda-blue/10';
        }

        grid.innerHTML += `
            <button type="button" onclick="seleccionarDiaCal(${d}, ${mes}, ${ano})" class="w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs transition-colors cursor-pointer ${estiloDia}">
                ${d}
            </button>
        `;
    }
}

function seleccionarDiaCal(dia, mes, ano) {
    fechaSeleccionada = new Date(ano, mes, dia);
    const display = document.getElementById('fecha-display');
    if (display) display.innerText = `${dia} de ${meses[mes]} ${ano}`;
    const popover = document.getElementById('popover-calendario');
    if (popover) popover.classList.add('hidden');
}

// Confirmación y guardado reactivo final
// Controles de Préstamos
// ==========================================
// [APP-04.1] CAPA DE VALIDACIÓN PRE-VUELO (PASOS 3 Y 4)
// ==========================================
// ==========================================
// [APP-04.2] GUARDADO ASÍNCRONO LIMPIO
// ==========================================
// ==========================================
// [APP-05] PÁGINA HISTORIAL Y BÚSQUEDA FUZZY
// ==========================================
function textoCoincideGoogleStyle(textoTarget, busqueda) {
    if(!busqueda) return true;
    let target = (textoTarget || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    let q = busqueda.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if(target.includes(q)) return true;
    
    const levenshtein = (a, b) => {
        if(a.length === 0) return b.length;
        if(b.length === 0) return a.length;
        let matrix = Array(a.length + 1).fill().map(() => Array(b.length + 1).fill(0));
        for(let i = 0; i <= a.length; i++) matrix[i][0] = i;
        for(let j = 0; j <= b.length; j++) matrix[0][j] = j;
        for(let i = 1; i <= a.length; i++) {
            for(let j = 1; j <= b.length; j++) {
                let cost = a[i-1] === b[j-1] ? 0 : 1;
                matrix[i][j] = Math.min(matrix[i-1][j] + 1, matrix[i][j-1] + 1, matrix[i-1][j-1] + cost);
            }
        }
        return matrix[a.length][b.length];
    };

    let palabras = target.split(/[\s,]+/);
    for(let p of palabras) {
        if (p.length > 3 && levenshtein(p, q) <= 2) return true;
    }
    return false;
}

// ==========================================
// [APP-06] OBLIGATIONS (FIXED BILLS, DEBTS & RECEIVABLES)
// La lógica de esta página vive ahora dentro de compromisos.html (script inline),
// igual que sobres.html. Aquí NO debe quedar ninguna copia de esas funciones.
// ==========================================

// ==========================================
// [APP-07] WIDGET COMPROMISOS (DASHBOARD)
// ==========================================
// ==========================================
// [APP-07] WIDGET COMPROMISOS (DASHBOARD)
// ==========================================
function renderizarWidgetCompromisos() {
    const cont = document.getElementById('widget-compromisos-container');
    if (!cont) return;

    let ingresosTotales = 0;
    historialDB.forEach(m => { if (m.tipo === 'Ingreso') ingresosTotales += m.monto; });
    let divisorIngreso = ingresosTotales > 0 ? ingresosTotales : 1; 

    let totalFijos = 0;
    let deudasOrdenadas = [];

    compromisosDB.forEach(c => {
        if (c.tipo === 'fijo') {
            totalFijos += (c.montoQ1 || 0) + (c.montoQ2 || 0);
        } else if (c.tipo === 'deuda') {
            let deudaTotal = c.deudaTotal || 1;
            let deudaActual = c.deudaActual || 0;
            let pagado = deudaTotal - deudaActual;
            let porcPagado = Math.round((pagado / deudaTotal) * 100);
            if (porcPagado < 0) porcPagado = 0;
            if (porcPagado > 100) porcPagado = 100;
            deudasOrdenadas.push({ ...c, porcPagado: porcPagado, cuota: (c.montoQ1 || 0) + (c.montoQ2 || 0) });
        }
    });

    let porcFijos = Math.round((totalFijos / divisorIngreso) * 100);
    let anchoBarraFijos = porcFijos > 100 ? 100 : porcFijos;

    deudasOrdenadas.sort((a, b) => b.porcPagado - a.porcPagado);
    let topDeudas = deudasOrdenadas.slice(0, 2);

    let html = `
        <!-- Tarjeta: Pagos Fijos -->
        <div class="bg-white dark:bg-koda-darkCard border border-gray-100 dark:border-koda-darkBorder rounded-[1.5rem] p-6 relative overflow-hidden shadow-sm flex flex-col justify-center cursor-pointer hover:border-gray-300 dark:hover:border-gray-600 transition-colors" onclick="navegarA('compromisos')">
            <div class="flex justify-between items-center mb-4">
                <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-koda-blue text-[18px]">event_repeat</span>
                    <p class="text-[15px] font-semibold text-gray-900 dark:text-white">Fixed bills</p>
                </div>
            </div>
            <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">$${totalFijos.toLocaleString()}</h3>
            <div class="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full mb-3 overflow-hidden">
                <div class="h-full bg-koda-blue rounded-full transition-all duration-500" style="width: ${anchoBarraFijos}%"></div>
            </div>
            <div class="flex justify-between items-center mt-1">
                <p class="text-[11.5px] font-semibold text-gray-500 dark:text-gray-400">of income goes to bills</p>
                <span class="text-[11.5px] font-semibold text-koda-blue bg-koda-blue/10 px-2 py-0.5 rounded">${porcFijos}%</span>
            </div>
        </div>
    `;

    topDeudas.forEach(d => {
        html += `
        <!-- Tarjeta: Deuda -->
        <div class="bg-white dark:bg-koda-darkCard border border-gray-100 dark:border-koda-darkBorder rounded-[1.5rem] p-6 relative overflow-hidden shadow-sm flex flex-col justify-center cursor-pointer hover:border-gray-300 dark:hover:border-gray-600 transition-colors" onclick="navegarA('compromisos.html?debt=${d.id}')">
            <div class="flex justify-between items-center mb-4">
                <div class="flex items-center gap-2 min-w-0 pr-2">
                    <span class="material-symbols-outlined text-koda-red text-[18px]">account_balance</span>
                    <p class="text-[15px] font-semibold text-gray-900 dark:text-white truncate">${d.nombre}</p>
                </div>
                <span class="text-[11.5px] font-semibold text-gray-500 dark:text-gray-400 flex-shrink-0">${d.porcPagado}%</span>
            </div>
            <h3 class="text-2xl font-semibold text-koda-red mb-2">$${(d.deudaActual || 0).toLocaleString()}</h3>
            <div class="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full mb-3 overflow-hidden">
                <div class="h-full bg-koda-red rounded-full transition-all duration-500" style="width: ${d.porcPagado}%"></div>
            </div>
            <p class="text-[11.5px] font-semibold text-gray-500 dark:text-gray-400">$${d.cuota.toLocaleString()} monthly</p>
        </div>
        `;
    });

    cont.innerHTML = html;
}

// ==========================================
// [APP-08] WIDGET COMPARATIVA (GRÁFICO APEXCHARTS)
// ==========================================
let chartComparativaInstancia = null;

function renderizarWidgetComparativa(periodo = '6M') {
    const contenedorFiltros = document.querySelectorAll('.btn-periodo');
    if (contenedorFiltros.length === 0) return;

    // 1. Actualizar estilo visual del botón seleccionado
    contenedorFiltros.forEach(b => {
        b.className = 'btn-periodo px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer outline-none ' +
            (b.getAttribute('data-periodo') === periodo ? 'bg-white/10 text-white shadow-sm activo' : 'text-koda-steel hover:text-white');
    });

    // 2. Datos reales: se agrupan los movimientos de historialDB por mes (o por semana en 1M)
    const GASTOS = ['Gasto', 'Pago de Compromiso', 'Pago de Deuda'];   // salida de dinero hacia terceros
    const mesesCortos = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const hoy = new Date();
    const fechaDe = m => new Date((m.fechaStr || '').split('T')[0] + 'T00:00:00');
    let categorias = [], dataIngresos = [], dataGastos = [];

    if (periodo === '1M') {
        // Últimas 4 semanas (la última termina hoy)
        const ini = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - 27);
        categorias = ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4'];
        dataIngresos = [0, 0, 0, 0]; dataGastos = [0, 0, 0, 0];
        historialDB.forEach(m => {
            const f = fechaDe(m);
            const idx = Math.floor((f - ini) / (7 * 86400000));
            if (isNaN(idx) || idx < 0 || idx > 3) return;
            if (m.tipo === 'Ingreso') dataIngresos[idx] += m.monto;
            else if (GASTOS.includes(m.tipo)) dataGastos[idx] += m.monto;
        });
    } else {
        const n = periodo === '3M' ? 3 : periodo === '1A' ? 12 : 6;
        const claves = [];
        for (let i = n - 1; i >= 0; i--) {
            const d = new Date(hoy.getFullYear(), hoy.getMonth() - i, 1);
            claves.push(`${d.getFullYear()}-${d.getMonth()}`);
            categorias.push(mesesCortos[d.getMonth()]);
        }
        dataIngresos = Array(n).fill(0); dataGastos = Array(n).fill(0);
        historialDB.forEach(m => {
            const f = fechaDe(m);
            if (isNaN(f)) return;
            const idx = claves.indexOf(`${f.getFullYear()}-${f.getMonth()}`);
            if (idx === -1) return;
            if (m.tipo === 'Ingreso') dataIngresos[idx] += m.monto;
            else if (GASTOS.includes(m.tipo)) dataGastos[idx] += m.monto;
        });
    }
    dataIngresos = dataIngresos.map(v => Math.round(v * 100) / 100);
    dataGastos = dataGastos.map(v => Math.round(v * 100) / 100);

    // 3. Actualizar Widgets Superiores (Basado en el último mes del rango)
    let mesActualIngreso = dataIngresos[dataIngresos.length - 1] || 0;
    let mesActualGasto = dataGastos[dataGastos.length - 1] || 0;
    
    document.getElementById('kpi-ingresos').innerText = `$${mesActualIngreso.toLocaleString()}`;
    document.getElementById('kpi-gastos').innerText = `$${mesActualGasto.toLocaleString()}`;
    document.getElementById('kpi-diferencia').innerText = `$${(mesActualIngreso - mesActualGasto).toLocaleString()}`;

    // 4. Configurar y renderizar ApexCharts
    const esModoOscuro = document.documentElement.classList.contains('dark');
    const colorTexto = esModoOscuro ? '#8B96A5' : '#6B7280';
    const colorBorde = esModoOscuro ? '#2A323D' : '#F3F4F6';

    const opcionesChart = {
        series: [
            { name: 'Ingresos', data: dataIngresos },
            { name: 'Gastos', data: dataGastos }
        ],
        chart: {
            type: 'area',
            height: 280,
            fontFamily: 'Maven Pro, sans-serif',
            toolbar: { show: false },
            background: 'transparent',
            animations: { enabled: true, easing: 'easeinout', speed: 800 }
        },
        colors: ['#66A5AD', '#787886'], // Ingresos en Aqua, Gastos en Gris Acero
        fill: {
            type: 'gradient',
            gradient: { shadeIntensity: 1, opacityFrom: 0.35, opacityTo: 0.05, stops: [0, 100] }
        },
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth', width: 3 },
        xaxis: {
            categories: categorias,
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { style: { colors: colorTexto, fontSize: '11px', fontWeight: 600 } }
        },
        yaxis: {
            labels: {
                style: { colors: colorTexto, fontSize: '11px', fontWeight: 600 },
                formatter: (value) => value >= 1000 ? (value / 1000) + 'k' : value
            }
        },
        grid: {
            borderColor: colorBorde,
            strokeDashArray: 0,
            xaxis: { lines: { show: false } },
            yaxis: { lines: { show: true } }
        },
        theme: { mode: esModoOscuro ? 'dark' : 'light' },
        legend: { 
            position: 'bottom', 
            horizontalAlign: 'left', 
            markers: { radius: 12, strokeWidth: 0 }, // <-- AQUÍ SE QUITA EL BORDE BLANCO
            itemMargin: { horizontal: 15, vertical: 0 } 
        },
        tooltip: {
            theme: esModoOscuro ? 'dark' : 'light',
            y: { formatter: (val) => "$" + val.toLocaleString() }
        }
    };

    if (chartComparativaInstancia) {
        chartComparativaInstancia.updateOptions(opcionesChart);
    } else {
        chartComparativaInstancia = new ApexCharts(document.querySelector("#chart-comparativa"), opcionesChart);
        chartComparativaInstancia.render();
    }
}

// ==========================================
// [APP-09] WIDGET DISTRIBUCIÓN DE GASTOS (DONUT)
// ==========================================
let chartDistribucionInstancia = null;

function renderizarWidgetDistribucion() {
    const contLeyenda = document.getElementById('leyenda-distribucion');
    if(!contLeyenda) return;

    // 1. Filtrar y agrupar gastos
    let gastos = historialDB.filter(m => m.tipo === 'Gasto');
    let totalGastos = 0;
    let agrupados = {};

    gastos.forEach(g => {
        // Priorizar el sobre, si no tiene, usar la categoría simple, si no, "Otros"
        let nombreGrupo = g.sobre || g.categoria || 'Otros';
        if(!agrupados[nombreGrupo]) agrupados[nombreGrupo] = 0;
        
        let montoAbsoluto = Math.abs(g.monto);
        agrupados[nombreGrupo] += montoAbsoluto;
        totalGastos += montoAbsoluto;
    });

    // 2. Convertir a Array y ordenar de mayor a menor
    let arrGastos = Object.keys(agrupados).map(k => ({ nombre: k, monto: agrupados[k] }));
    arrGastos.sort((a,b) => b.monto - a.monto);

// 3. Paleta de colores KODA extendida (Dark Zen)
    const colores = ['#66A5AD', '#787886', '#C1A35F', '#4A6B7C', '#487B82', '#5F6368'];    let seriesData = [];
    let labelsData = [];
    contLeyenda.innerHTML = '';

    if (arrGastos.length === 0) {
        contLeyenda.innerHTML = `<p class="text-xs text-gray-500 col-span-2">No expenses to show.</p>`;
        return;
    }

    // 4. Construir Leyenda Personalizada HTML con tipografía ampliada
    arrGastos.forEach((item, index) => {
        seriesData.push(item.monto);
        labelsData.push(item.nombre);
        
        let color = colores[index % colores.length];
        let porc = Math.round((item.monto / totalGastos) * 100);

        contLeyenda.innerHTML += `
            <div class="flex flex-col">
                <div class="flex items-center gap-2 mb-2">
                    <span class="w-3 h-3 rounded-full" style="background-color: ${color}"></span>
                    <p class="text-xs text-gray-500 dark:text-gray-400 font-semibold truncate">${item.nombre}</p>
                </div>
                <p class="text-xl font-semibold text-gray-900 dark:text-white leading-none mb-1">$${item.monto.toLocaleString()}</p>
                <p class="text-sm font-semibold" style="color: ${color}">${porc}%</p>
            </div>
        `;
    });;

    // 5. Configurar ApexCharts (Donut)
    // 5. Configurar ApexCharts (Donut) con tipografía escalada
    const esModoOscuro = document.documentElement.classList.contains('dark');
    const colorTexto = esModoOscuro ? '#8B96A5' : '#6B7280';
    const colorCentro = esModoOscuro ? '#FFFFFF' : '#111827';
    const colorFondoStroke = esModoOscuro ? '#1B212B' : '#FFFFFF';

    const opcionesDonut = {
        series: seriesData,
        labels: labelsData,
        chart: {
            type: 'donut',
            height: 240,
            fontFamily: 'Maven Pro, sans-serif',
            background: 'transparent',
            animations: { enabled: true, easing: 'easeinout', speed: 800 }
        },
        colors: colores,
        stroke: {
            show: true,
            colors: [colorFondoStroke],
            width: 3
        },
        dataLabels: { enabled: false }, 
        legend: { show: false }, 
        plotOptions: {
            pie: {
                donut: {
                    size: '75%',
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '10px',
                            fontWeight: 600,
                            color: colorTexto,
                            offsetY: 28 // <-- AUMENTA ESTO (ej. de 22 a 28 o 30) para bajar "TOTAL GASTOS"
                        },
                        value: {
                            show: true,
                            fontSize: '24px',
                            fontWeight: 800,
                            color: colorCentro,
                            offsetY: -10, // <-- RESTA ESTO (ej. de -5 a -10 o -15) para subir el número "$..."
                            formatter: function (val) {
                                return "$" + parseInt(val).toLocaleString();
                            }
                        },
                        total: {
                            show: true,
                            showAlways: true,
                            label: 'TOTAL GASTOS',
                            fontSize: '10px',
                            fontWeight: 300,
                            color: colorTexto,
                            formatter: function (w) {
                                let total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                                return "$" + total.toLocaleString();
                            }
                        }
                    }
                }
            }
        },
        tooltip: {
            theme: esModoOscuro ? 'dark' : 'light',
            y: { formatter: (val) => "$" + val.toLocaleString() }
        }
    };

    // Renderizar o actualizar
    // Limpiamos el contenedor por completo para evitar colisiones
    document.querySelector("#chart-distribucion").innerHTML = '';
    
    // Generamos la gráfica nueva
    chartDistribucionInstancia = new ApexCharts(document.querySelector("#chart-distribucion"), opcionesDonut);
    chartDistribucionInstancia.render();
}


// ==========================================
// [APP-10] MÓDULO CHECK PAY (LISTA DE QUINCENA)
// ==========================================

let checkpayDB = [];

// Base de datos de la Plantilla (Setup) unificada
let checkpayTemplateDB = [];

// La interfaz y la lógica de esta página (render, modales, setup, orden) viven ahora
// dentro de checkpay.html, igual que sobres.html y compromisos.html.
// Aquí solo quedan los datos, porque el widget del dashboard también los lee.

// ==========================================
// [APP-12] WIDGET CHECK PAY (DASHBOARD)
// ==========================================
function renderizarWidgetCheckPayHome() {
    const conteoEl = document.getElementById('home-cp-conteo');
    const barraEl = document.getElementById('home-cp-barra');
    const subEl = document.getElementById('home-cp-sub');
    
    if (!conteoEl || !barraEl) return;

    // Si checkpayDB tiene elementos cargados, calcula el real; si no, toma un valor por defecto o 0
    let total = typeof checkpayDB !== 'undefined' ? checkpayDB.length : 0;
    let pagados = typeof checkpayDB !== 'undefined' ? checkpayDB.filter(c => c.pagado).length : 0;
    let porcentaje = total === 0 ? 0 : Math.round((pagados / total) * 100);

    conteoEl.innerText = `${pagados} / ${total} paid`;
    barraEl.style.width = `${porcentaje}%`;
    if (subEl) subEl.innerText = `${porcentaje}% complete this period`;
}


// ==========================================
// [APP-14] EVENTOS GLOBALES DE TECLADO Y UI
// ==========================================

// Cerrar cualquier modal abierto presionando ESC
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        if (typeof cerrarModalMovimiento === 'function') cerrarModalMovimiento();
        if (typeof cerrarModalCrearCuenta === 'function') cerrarModalCrearCuenta();
        if (typeof cerrarModalCompromiso === 'function') cerrarModalCompromiso();
        if (typeof cerrarModalDetallePrestamo === 'function') cerrarModalDetallePrestamo();
        
        const popoverCal = document.getElementById('popover-calendario');
        if (popoverCal && !popoverCal.classList.contains('hidden')) {
            popoverCal.classList.add('hidden');
        }
    }
});

// Bloqueo estricto del scroll de la página cuando se abre un modal
function bloquearScrollBody(bloquear) {
    if (bloquear) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Función para inyectar dinámicamente las categorías en el modal de movimientos (PC)
// Se asegura de leer desde categoriasDB (definida en app.js) en vez de estar fijas en HTML
function inyectarCategoriasEnModal() {
    const contenedor = document.getElementById('contenedor-categorias');
    if (!contenedor) return;
    
    // Asumimos que categoriasDB está definido arriba. Ej: let categoriasDB = ["Supermercado", "Transporte"...]
    if (typeof categoriasDB === 'undefined' || categoriasDB.length === 0) return;

    contenedor.innerHTML = '';
    
    // Las 3 más frecuentes siempre a la vista
    let frecuentes = categoriasDB.slice(0, 3);
    let ocultas = categoriasDB.slice(3);

    frecuentes.forEach(cat => {
        contenedor.innerHTML += `
            <button type="button" onclick="seleccionarPillSimple(this, 'cat')" class="pill-cat px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors bg-[#0A0D12] text-koda-steel border-white/5 hover:border-white/10 cursor-pointer">
                ${cat}
            </button>
        `;
    });

    if (ocultas.length > 0) {
        contenedor.innerHTML += `
            <button type="button" id="btn-toggle-mas-cats" onclick="toggleMasElementos('cats-expandibles', this)" class="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 border border-white/5 flex items-center justify-center text-koda-steel hover:text-white transition-colors cursor-pointer outline-none">
                <span class="material-symbols-outlined text-[16px]">add</span>
            </button>
            <div id="cats-expandibles" class="hidden flex flex-wrap justify-center items-center gap-2 w-full pt-1"></div>
        `;
        
        const contOcultas = document.getElementById('cats-expandibles');
        ocultas.forEach(cat => {
            contOcultas.innerHTML += `
                <button type="button" onclick="seleccionarPillSimple(this, 'cat')" class="pill-cat px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors bg-[#0A0D12] text-koda-steel border-white/5 hover:border-white/10 cursor-pointer">
                    ${cat}
                </button>
            `;
        });
    }
}

// Inyectamos las categorías al momento de cargar el DOM (junto con el resto de initKODA)
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(inyectarCategoriasEnModal, 200); 
});


function renderizarCuentasEnModal() {
    const cont = document.getElementById('contenedor-pills-cuentas');
    if (!cont) return;
    cont.innerHTML = '';

    if (typeof cuentasDB === 'undefined' || cuentasDB.length === 0) {
        cont.innerHTML = `<span class="text-xs text-koda-steel italic">No accounts yet.</span>`;
        return;
    }

    // Función interna para mantener el código limpio y no repetir el HTML
    const generarHTMLCuenta = (c) => {
        let siglaStr = c.sigla || "CTA";
        let bgClass = "bg-gray-800"; let textClass = "text-white";
        if (c.colorClass && c.colorClass.includes('003b7a')) { bgClass = "bg-[#003b7a]/40"; textClass = "text-[#66b5ff]"; }
        else if (c.colorClass && c.colorClass.includes('00558c')) { bgClass = "bg-[#00558c]/40"; textClass = "text-[#66c2ff]"; }
        else if (c.colorClass && c.colorClass.includes('50ba40')) { bgClass = "bg-[#50ba40]/20"; textClass = "text-[#7ae66a]"; }
        else if (c.colorClass && c.colorClass.includes('ed111b')) { bgClass = "bg-[#ed111b]/20"; textClass = "text-[#ff6666]"; }
        
        return `
            <button type="button" onclick="seleccionarCuentaOrigen(this, ${c.id})" class="pill-cuenta px-4 py-2.5 rounded-2xl text-[13.5px] font-semibold border transition-colors flex items-center gap-2.5 bg-[#0A0D12] text-koda-steel border-white/5 hover:border-white/10 cursor-pointer">
                <span class="w-6 h-6 rounded-full flex items-center justify-center text-[10px] shrink-0 font-semibold ${bgClass} ${textClass}">${siglaStr}</span>
                ${c.apodo}
            </button>`;
    };

    // Tomamos las 2 primeras para mostrarlas, el resto se ocultan
    let visibles = cuentasDB.slice(0, 2);
    let ocultas = cuentasDB.slice(2);

    visibles.forEach(c => cont.innerHTML += generarHTMLCuenta(c));

    // Si hay más de 2 cuentas, inyectamos el botón "+" y el contenedor colapsable
    if (ocultas.length > 0) {
        cont.innerHTML += `
            <button type="button" onclick="toggleMasElementos('cuentas-expandibles', this)" class="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 border border-white/5 flex items-center justify-center text-koda-steel hover:text-white transition-colors cursor-pointer outline-none">
                <span class="material-symbols-outlined text-[16px]">add</span>
            </button>
            <div id="cuentas-expandibles" class="hidden flex flex-wrap justify-center items-center gap-3 w-full pt-1"></div>
        `;
        
        const contOcultas = document.getElementById('cuentas-expandibles');
        ocultas.forEach(c => contOcultas.innerHTML += generarHTMLCuenta(c));
    }
}

// NUEVA FUNCIÓN: Evalúa el monto vs el sobre en tiempo real
function evaluarAlertaSobre() {
    const alerta = document.getElementById('alerta-sobre-vacio');
    const txtAlerta = document.getElementById('txt-alerta-sobre');
    const montoInput = parseFloat(document.getElementById('input-monto')?.value) || 0;

    if (sobreSeleccionado && alerta) {
        const sob = sobresDB.find(s => s.nombre === sobreSeleccionado);
        if (sob) {
            if (sob.monto <= 0) {
                alerta.classList.remove('hidden');
                txtAlerta.innerHTML = `<strong class="text-koda-blue">Balance unavailable.</strong>`;
            } else if (montoInput > sob.monto) {
                alerta.classList.remove('hidden');
                txtAlerta.innerHTML = `<strong class="text-koda-blue">Heads up:</strong> This exceeds the available balance ($${sob.monto.toLocaleString()}). The envelope will go negative.`;
            } else {
                alerta.classList.add('hidden');
            }
        }
    } else if (alerta) {
        alerta.classList.add('hidden');
    }
}

// ACTUALIZA TU FUNCIÓN EXISTENTE PARA QUE LLAME A LA ALERTA AL HACER CLIC
function seleccionarSobreAqua(btn, nombre) {
    sobreSeleccionado = nombre;
    document.querySelectorAll('.pill-sobre-gasto').forEach(b => {
        b.className = 'pill-sobre-gasto px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-colors bg-[#0A0D12] text-koda-steel border-white/5 hover:border-white/10 cursor-pointer';
    });
    if (btn) btn.className = 'pill-sobre-gasto px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-colors bg-koda-blue/20 text-koda-blue border-koda-blue cursor-pointer';
    
    // Disparamos la evaluación al cambiar de sobre
    evaluarAlertaSobre();
}


// Confirmación con el mismo modal (sustituye a window.confirm)
// ==========================================
// [APP-03] NOTIFICACIONES (EVENTOS + ALERTAS DERIVADAS)
// - Derivadas: se recalculan solas (sobre en negativo/vacío, cuenta en rojo, metas...)
// - Eventos: errores, movimientos automáticos (lectura de correos), etc. Persisten hasta borrarlas.
// ==========================================
const KODA_NOTIF_KEY = 'koda_notifs_v1';
const KODA_NOTIF_READ_KEY = 'koda_notifs_read_v1';
let notificacionesDB = [];
let _notifLeidasDerivadas = {};

const kodaEsc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function _notifCargar() {
    try { const r = JSON.parse(localStorage.getItem(KODA_NOTIF_KEY) || '[]'); notificacionesDB = Array.isArray(r) ? r : []; } catch (e) { notificacionesDB = []; }
    try { _notifLeidasDerivadas = JSON.parse(localStorage.getItem(KODA_NOTIF_READ_KEY) || '{}') || {}; } catch (e) { _notifLeidasDerivadas = {}; }
}
function _notifGuardar() {
    try {
        localStorage.setItem(KODA_NOTIF_KEY, JSON.stringify(notificacionesDB.filter(n => !n.derivada)));
        localStorage.setItem(KODA_NOTIF_READ_KEY, JSON.stringify(_notifLeidasDerivadas));
    } catch (e) { /* sin almacenamiento: las notificaciones viven solo en memoria */ }
}

// tipo: 'error' | 'warning' | 'info' | 'auto'
function kodaNotificar(titulo, mensaje, opciones = {}) {
    const { tipo = 'info', link = null, clave = null, derivada = false } = opciones;
    if (clave) {
        const existente = notificacionesDB.find(n => n.clave === clave);
        if (existente) { existente.titulo = titulo; existente.mensaje = mensaje; existente.link = link; return existente; }
    }
    const n = {
        id: Date.now() + Math.floor(Math.random() * 1000),
        tipo, titulo, mensaje, link, clave, derivada,
        fecha: new Date().toISOString(),
        leida: derivada && clave ? !!_notifLeidasDerivadas[clave] : false
    };
    notificacionesDB.unshift(n);
    if (notificacionesDB.length > 60) notificacionesDB.length = 60;
    if (!derivada) { _notifGuardar(); renderizarNotificaciones(); }
    return n;
}

function _notifHace(iso) {
    const s = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 1000));
    if (s < 60) return 'Just now';
    if (s < 3600) return `${Math.floor(s / 60)}m ago`;
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
    return `${Math.floor(s / 86400)}d ago`;
}

function renderizarNotificaciones() {
    const badge = document.getElementById('badge-notif');
    const lista = document.getElementById('lista-notificaciones');
    const sinLeer = notificacionesDB.filter(n => !n.leida).length;
    if (badge) badge.classList.toggle('hidden', sinLeer === 0);
    if (!lista) return;

    if (notificacionesDB.length === 0) {
        lista.innerHTML = `<p class="text-[11.5px] font-medium text-koda-steel text-center py-6">All clear</p>`;
        return;
    }
    const iconos = { error: 'error', warning: 'warning', info: 'info', auto: 'bolt' };
    lista.innerHTML = notificacionesDB.map(n => `
        <div onclick="abrirNotificacion(${n.id})" class="flex gap-3 p-3 rounded-xl cursor-pointer transition-colors ${n.leida ? 'hover:bg-white/5' : 'bg-white/5 hover:bg-white/10'}">
            <div class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 ${n.tipo === 'info' || n.tipo === 'auto' ? 'text-koda-blue' : 'text-white'}">
                <span class="material-symbols-outlined text-[18px]">${iconos[n.tipo] || 'info'}</span>
            </div>
            <div class="min-w-0 flex-1">
                <div class="flex items-center justify-between gap-2">
                    <p class="text-xs font-semibold text-white truncate">${kodaEsc(n.titulo)}</p>
                    ${n.leida ? '' : '<span class="w-1.5 h-1.5 rounded-full bg-koda-blue flex-shrink-0"></span>'}
                </div>
                <p class="text-[11.5px] font-medium text-koda-steel leading-snug mt-0.5">${kodaEsc(n.mensaje)}</p>
                <p class="text-[10.5px] font-medium text-koda-steel/70 mt-1">${_notifHace(n.fecha)}</p>
            </div>
        </div>`).join('');
}

function abrirNotificacion(id) {
    const n = notificacionesDB.find(x => x.id === id);
    if (!n) return;
    n.leida = true;
    if (n.derivada && n.clave) _notifLeidasDerivadas[n.clave] = true;
    _notifGuardar();
    renderizarNotificaciones();
    if (n.link) navegarConTransicion(n.link);
}

function marcarNotificacionesLeidas() {
    notificacionesDB.forEach(n => { n.leida = true; if (n.derivada && n.clave) _notifLeidasDerivadas[n.clave] = true; });
    _notifGuardar();
    renderizarNotificaciones();
}

function limpiarNotificaciones() {
    // Las derivadas siguen existiendo mientras el problema exista; se marcan como leídas
    notificacionesDB = notificacionesDB.filter(n => n.derivada);
    marcarNotificacionesLeidas();
}

function toggleNotificaciones() {
    const panel = document.getElementById('panel-notificaciones');
    if (panel) panel.classList.toggle('hidden');
}
document.addEventListener('click', (e) => {
    const panel = document.getElementById('panel-notificaciones');
    if (panel && !panel.classList.contains('hidden') && !e.target.closest('#panel-notificaciones') && !e.target.closest('[onclick^="toggleNotificaciones"]')) {
        panel.classList.add('hidden');
    }
});

// Recalcula las alertas derivadas de los datos actuales
function chequearNotificaciones() {
    if (!_notifCargadas) { _notifCargar(); _notifCargadas = true; }
    notificacionesDB = notificacionesDB.filter(n => !n.derivada);

    const fmt = (n) => `$${Math.abs(n).toLocaleString()}`;
    const derivadas = [];

    sobresDB.forEach(s => {
        if (s.monto < 0) derivadas.push({ clave: `sobre-neg-${s.id}`, tipo: 'warning', titulo: 'Envelope overdrawn', mensaje: `${s.nombre} is over by ${fmt(s.monto)}.`, link: `sobres.html?sobre=${s.id}` });
        else if (s.monto === 0) derivadas.push({ clave: `sobre-vacio-${s.id}`, tipo: 'info', titulo: 'Envelope empty', mensaje: `${s.nombre} has no funds left.`, link: `sobres.html?sobre=${s.id}` });
    });
    cuentasDB.forEach(c => {
        if (c.tipo !== 'Tarjeta Crédito' && c.saldo < 0) derivadas.push({ clave: `cuenta-neg-${c.id}`, tipo: 'warning', titulo: 'Negative balance', mensaje: `${c.apodo} is at -${fmt(c.saldo)}.`, link: 'index.html' });
        if (c.tipo === 'Tarjeta Crédito' && c.limite && (c.limite + c.saldo) <= c.limite * 0.1) derivadas.push({ clave: `tc-limite-${c.id}`, tipo: 'warning', titulo: 'Credit limit almost used', mensaje: `${c.apodo} has ${fmt(c.limite + c.saldo)} available.`, link: 'index.html' });
    });
    const hoy = new Date().toISOString().split('T')[0];
    metasDB.forEach(m => {
        if (m.completadaReal) return;
        if (m.montoActual >= m.metaTotal) derivadas.push({ clave: `meta-lista-${m.id}`, tipo: 'info', titulo: 'Goal reached', mensaje: `${m.nombre} is fully funded. Mark it complete.`, link: 'metas.html' });
        else if (m.fechaLimite && m.fechaLimite < hoy) derivadas.push({ clave: `meta-vencida-${m.id}`, tipo: 'warning', titulo: 'Goal past its date', mensaje: `${m.nombre} is ${fmt(m.metaTotal - m.montoActual)} short.`, link: 'metas.html' });
    });

    derivadas.reverse().forEach(d => kodaNotificar(d.titulo, d.mensaje, { ...d, derivada: true }));
    renderizarNotificaciones();
}
let _notifCargadas = false;

// ==========================================
// [APP-02] UI COMPARTIDA: BOTÓN CARGANDO + ALERTA / CONFIRMACIÓN
// ==========================================
function kodaBotonCargando(btn, cargando) {
    if (!btn) return;
    if (cargando) {
        btn.style.minWidth = btn.offsetWidth + 'px';
        btn.disabled = true;
        btn.classList.add('btn-cargando');
    } else {
        btn.disabled = false;
        btn.classList.remove('btn-cargando');
        btn.style.minWidth = '';
    }
}
// Compatibilidad con código anterior
function toggleLoaderBoton(btn, estado) { kodaBotonCargando(btn, estado === 'loading'); }

let _alertaKodaOk = null;

function mostrarAlertaKoda(titulo = "Not enough funds", descripcion = "Check the balance of your account or envelope.", opciones = {}) {
    const modal = document.getElementById('modal-alerta-koda');
    const card = document.getElementById('card-alerta-koda');
    if (!modal || !card) return;
    const set = (id, txt) => { const el = document.getElementById(id); if (el) el.innerText = txt; };

    set('titulo-alerta-koda', titulo);
    set('desc-alerta-koda', descripcion);
    set('icono-alerta-koda', opciones.icon || 'warning');
    _alertaKodaOk = opciones.onConfirm || null;

    const okBtn = document.getElementById('btn-ok-alerta-koda');
    const cancelBtn = document.getElementById('btn-cancel-alerta-koda');
    if (okBtn) okBtn.innerText = opciones.okLabel || 'Got it';
    if (cancelBtn) cancelBtn.classList.toggle('hidden', !opciones.onConfirm);

    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100', 'pointer-events-auto');
    card.classList.remove('scale-95');
    card.classList.add('scale-100');
}

// Confirmación genérica (sustituye a window.confirm)
function kodaConfirmar(titulo, descripcion, onConfirm, okLabel = 'Confirm', icon = 'help') {
    mostrarAlertaKoda(titulo, descripcion, { onConfirm, okLabel, icon });
}

// Confirmación estándar para eliminar cualquier cosa
function kodaConfirmarEliminar(nombre, onConfirm, detalle = "This can't be undone.") {
    kodaConfirmar(`Delete ${nombre}?`, detalle, onConfirm, 'Delete', 'delete');
}

function aceptarAlertaKoda() {
    const cb = _alertaKodaOk;
    cerrarAlertaKoda();
    if (typeof cb === 'function') setTimeout(cb, 120);
}

function cerrarAlertaKoda() {
    const modal = document.getElementById('modal-alerta-koda');
    const card = document.getElementById('card-alerta-koda');
    if (!modal || !card) return;
    _alertaKodaOk = null;
    modal.classList.remove('opacity-100', 'pointer-events-auto');
    modal.classList.add('opacity-0', 'pointer-events-none');
    card.classList.remove('scale-100');
    card.classList.add('scale-95');
}

// ==========================================
// [APP-04] MOVIMIENTOS: NÚCLEO CONTABLE
// Cada movimiento sabe a qué cuenta / sobre / meta / deuda / compromiso afecta,
// de modo que se puede aplicar, revertir y editar sin descuadrar saldos.
// ==========================================
let movimientoEnCurso = false;
let pagarSeleccion = null;   // { sub: 'fijos' | 'deudas' | 'sobres', id }
let metaFondeoId = null;

const kodaQuincenaActual = () => (new Date().getDate() <= 15 ? 1 : 2);
function kodaCuotaQuincena(item) {
    const q = kodaQuincenaActual();
    const v = q === 1 ? (item.montoQ1 ?? item.q1) : (item.montoQ2 ?? item.q2);
    return v || 0;
}

function abrirModalMovimiento(esEdicion = false) {
    const m = document.getElementById('modal-movimiento');
    const card = document.getElementById('modal-card');
    if (!m || !card) return;

    document.body.style.overflow = 'hidden';

    if (!esEdicion) {
        idEdicionActual = null;
        cuentaOrigenSeleccionadaId = null;
        cuentaDestinoSeleccionadaId = null;
        sobreSeleccionado = null;
        categoriaSeleccionada = "General";
        pagarSeleccion = null;
        metaFondeoId = null;

        const inputMonto = document.getElementById('input-monto');
        if (inputMonto) inputMonto.value = '';
        const inputNombre = document.getElementById('input-nombre-mov');
        if (inputNombre) inputNombre.value = '';

        const toggleS = document.getElementById('toggle-sobre');
        if (toggleS) toggleS.checked = false;
        toggleAnimacionSobres(false);

        const btnSubmit = document.querySelector('#modal-movimiento button[type="submit"]');
        if (btnSubmit) btnSubmit.innerText = "Confirm";
    }

    renderizarCuentasEnModal();

    m.classList.remove('opacity-0', 'pointer-events-none');
    m.classList.add('opacity-100', 'pointer-events-auto');
    card.classList.remove('scale-95');
    card.classList.add('scale-100');
}

function cerrarModalMovimiento() {
    if (movimientoEnCurso) return;   // no se cierra mientras KODA guarda
    const m = document.getElementById('modal-movimiento');
    const card = document.getElementById('modal-card');
    if (!m || !card) return;

    document.body.style.overflow = '';
    m.classList.remove('opacity-100', 'pointer-events-auto');
    m.classList.add('opacity-0', 'pointer-events-none');
    card.classList.remove('scale-100');
    card.classList.add('scale-95');
}

const PILL_BASE = 'px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer';
const PILL_OFF = 'bg-[#0A0D12] text-koda-steel border-white/5 hover:border-white/10';
const PILL_ON_NEUTRAL = 'bg-white/10 text-white border-white/30';
const PILL_ON_CYAN = 'bg-koda-blue/20 text-koda-blue border-koda-blue';

// valor === null → solo marca la píldora, sin tocar el monto (se usa al editar)
function autoAsignarMonto(btn, valor, claseGrupo, tonoColor) {
    document.querySelectorAll(`.pill-${claseGrupo}`).forEach(b => {
        b.className = `pill-${claseGrupo} ${PILL_BASE} ${PILL_OFF}`;
    });
    if (btn) btn.className = `pill-${claseGrupo} ${PILL_BASE} ${tonoColor === 'gold' ? PILL_ON_CYAN : PILL_ON_NEUTRAL}`;
    if (valor !== null && valor !== undefined) {
        const inputM = document.getElementById('input-monto');
        if (inputM) inputM.value = valor || '';
    }
}

function seleccionarPagarItem(btn, sub, id, valor) {
    pagarSeleccion = { sub, id };
    autoAsignarMonto(btn, valor, 'pagar-item', 'neutral');
}
function seleccionarMetaFondeo(btn, id, valor) {
    metaFondeoId = id;
    autoAsignarMonto(btn, valor, 'meta-item', 'gold');
}

function _pillsConExpandible(items, htmlPill, idExpandible, contenedor) {
    const visibles = items.slice(0, 3), ocultos = items.slice(3);
    let html = visibles.map(htmlPill).join('');
    if (ocultos.length) {
        html += `
            <button type="button" onclick="toggleMasElementos('${idExpandible}', this)" class="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 border border-white/5 flex items-center justify-center text-koda-steel hover:text-white transition-all cursor-pointer outline-none">
                <span class="material-symbols-outlined text-[16px]">add</span>
            </button>
            <div id="${idExpandible}" class="hidden flex flex-wrap justify-center gap-2 w-full pt-1">${ocultos.map(htmlPill).join('')}</div>`;
    }
    contenedor.innerHTML = html;
}

function setSubtipoPago(subtipo, btn) {
    document.querySelectorAll('.btn-subpago').forEach(b => {
        b.classList.remove('bg-white/10', 'text-white');
        b.classList.add('text-koda-steel');
    });
    if (btn) {
        btn.classList.add('bg-white/10', 'text-white');
        btn.classList.remove('text-koda-steel');
    }
    if (!pagarSeleccion || pagarSeleccion.sub !== subtipo) pagarSeleccion = null;

    const cont = document.getElementById('contenedor-pills-pagar');
    if (!cont) return;

    let data = [];
    if (subtipo === 'fijos') data = compromisosDB.filter(c => c.tipo === 'fijo');
    else if (subtipo === 'deudas') data = compromisosDB.filter(c => c.tipo === 'deuda' && (c.deudaActual || 0) > 0);
    else if (subtipo === 'sobres') data = sobresDB;

    _pillsConExpandible(data, (item) => {
        const valor = kodaCuotaQuincena(item);
        return `<button type="button" data-id="${item.id}" onclick="seleccionarPagarItem(this, '${subtipo}', ${item.id}, ${valor})" class="pill-pagar-item ${PILL_BASE} ${PILL_OFF}">${kodaEsc(item.nombre)}</button>`;
    }, 'pagar-expandibles', cont);
}

function renderizarMetasFondeo() {
    const cont = document.getElementById('contenedor-pills-metas');
    if (!cont) return;
    const activas = metasDB.filter(m => !m.completadaReal && m.montoActual < m.metaTotal);
    _pillsConExpandible(activas, (m) =>
        `<button type="button" data-id="${m.id}" onclick="seleccionarMetaFondeo(this, ${m.id}, ${m.cuotaIdeal ? Math.round(m.cuotaIdeal / 2) : 0})" class="pill-meta-item ${PILL_BASE} ${PILL_OFF}">${kodaEsc(m.nombre)}</button>`,
        'metas-expandibles', cont);
}

// ----- Contabilidad -----
function aplicarMovimientoContable(mov) {
    const cuenta = cuentasDB.find(c => c.id === mov.cuentaId);
    if (!cuenta) return;
    const monto = mov.monto;

    if (mov.tipo === 'Ingreso') {
        cuenta.saldo += monto;
        return;
    }
    if (mov.tipo === 'Préstamo') return;   // lo gestiona la página de Obligations
    if (mov.tipo === 'Fondeo de Sobre') {  // asignar dinero al sobre: la cuenta no cambia
        const sobF = sobresDB.find(s => s.nombre === mov.sobre);
        if (sobF) sobF.monto += monto;
        return;
    }

    cuenta.saldo -= monto;                 // todo lo demás sale de la cuenta origen
    if (mov.tipo === 'Transferencia') {
        const dest = cuentasDB.find(c => c.id === mov.cuentaDestinoId);
        if (dest) dest.saldo += monto;
    } else if (mov.tipo === 'Aporte a Meta') {
        const meta = metasDB.find(m => m.id === mov.metaId);
        if (meta) meta.montoActual += monto;
    } else if (mov.tipo === 'Pago de Deuda') {
        const deuda = compromisosDB.find(d => d.id === mov.deudaId);
        if (deuda) deuda.deudaActual = Math.max(0, (deuda.deudaActual || 0) - monto);
    }
    if (mov.sobre) {
        const sob = sobresDB.find(s => s.nombre === mov.sobre);
        if (sob) sob.monto -= monto;
    }
}

function revertirMovimientoContable(idMovimiento) {
    const mov = historialDB.find(m => m.id === idMovimiento);
    if (!mov) return;
    const cuenta = cuentasDB.find(c => c.id === mov.cuentaId || c.apodo === mov.cuentaOrigen);
    if (!cuenta) return;
    const monto = mov.monto;

    if (mov.tipo === 'Ingreso') { cuenta.saldo -= monto; return; }
    if (mov.tipo === 'Fondeo de Sobre') {
        const sobF = sobresDB.find(s => s.nombre === mov.sobre);
        if (sobF) sobF.monto -= monto;
        return;
    }
    if (mov.tipo === 'Préstamo') {
        // Cobro = entró dinero a la cuenta; préstamo otorgado = salió dinero
        if (mov.categoria && mov.categoria.includes('Cobro')) cuenta.saldo -= monto;
        else cuenta.saldo += monto;
        return;
    }

    cuenta.saldo += monto;
    if (mov.tipo === 'Transferencia') {
        const dest = cuentasDB.find(c => c.id === mov.cuentaDestinoId);
        if (dest) dest.saldo -= monto;
    } else if (mov.tipo === 'Aporte a Meta') {
        const meta = metasDB.find(m => m.id === mov.metaId);
        if (meta) meta.montoActual -= monto;
    } else if (mov.tipo === 'Pago de Deuda') {
        const deuda = compromisosDB.find(d => d.id === mov.deudaId);
        if (deuda) deuda.deudaActual = Math.min(deuda.deudaTotal || Infinity, (deuda.deudaActual || 0) + monto);
    }
    if (mov.sobre) {
        const sob = sobresDB.find(s => s.nombre === mov.sobre);
        if (sob) sob.monto += monto;
    }
}

// Refresca lo que exista en la página actual
function kodaRefrescarVistas() {
    const llamar = (n, ...args) => { if (typeof window[n] === 'function') { try { window[n](...args); } catch (e) { console.error(n, e); } } };
    ['renderizarCuentas', 'renderizarSobresDashboard', 'renderizarHistorialMini', 'renderizarPaginaSobres', 'renderizarPaginaCompromisos',
     'renderizarWidgetCompromisos', 'renderizarWidgetDistribucion', 'renderizarProximaMetaHome', 'renderizarPaginaHistorial',
     'renderizarWidgetCheckPayHome', 'initGlobalDashboard', 'cmpRefrescarDetalleDeuda'].forEach(n => llamar(n));
    if (typeof renderizarWidgetComparativa === 'function') {
        const activo = document.querySelector('.btn-periodo.activo');
        renderizarWidgetComparativa(activo ? activo.getAttribute('data-periodo') : '6M');
    }
    if (typeof sobreAbiertoId !== 'undefined' && sobreAbiertoId !== null && typeof abrirDetalleSobre === 'function') abrirDetalleSobre(sobreAbiertoId, false);
    chequearNotificaciones();
}

async function confirmarMovimiento() {
    if (movimientoEnCurso) return;

    const monto = parseFloat(document.getElementById('input-monto')?.value);
    const descRaw = (document.getElementById('input-nombre-mov')?.value || '').trim();

    if (!monto || monto <= 0) return mostrarAlertaKoda("Invalid amount", "Enter an amount greater than 0.");
    if (!cuentaOrigenSeleccionadaId) return mostrarAlertaKoda("Account required", "Select an account.");
    const cOrigen = cuentasDB.find(c => c.id === cuentaOrigenSeleccionadaId);
    if (!cOrigen) return mostrarAlertaKoda("Account error", "Selected account not found.");

    const base = { monto, cuentaOrigen: cOrigen.apodo, cuentaId: cOrigen.id };
    let mov;

    if (tipoActual === 'gasto') {
        const afecta = document.getElementById('toggle-sobre')?.checked && sobreSeleccionado;
        mov = { ...base, tipo: 'Gasto', desc: descRaw || 'Expense', categoria: afecta ? sobreSeleccionado : categoriaSeleccionada, sobre: afecta ? sobreSeleccionado : null };
    } else if (tipoActual === 'ingreso') {
        mov = { ...base, tipo: 'Ingreso', desc: descRaw || 'Income', categoria: categoriaSeleccionada, sobre: null };
    } else if (tipoActual === 'mover') {
        if (!cuentaDestinoSeleccionadaId) return mostrarAlertaKoda("Destination required", "Select the account to move money to.");
        if (cuentaDestinoSeleccionadaId === cOrigen.id) return mostrarAlertaKoda("Same account", "Choose a different destination account.");
        const dest = cuentasDB.find(c => c.id === cuentaDestinoSeleccionadaId);
        mov = { ...base, tipo: 'Transferencia', desc: descRaw || 'Transfer', categoria: `To ${dest.apodo}`, sobre: null, cuentaDestinoId: dest.id };
    } else if (tipoActual === 'pagar') {
        if (!pagarSeleccion) return mostrarAlertaKoda("Nothing selected", "Select what you are paying.");
        const { sub, id } = pagarSeleccion;
        if (sub === 'fijos') {
            const it = compromisosDB.find(c => c.id === id);
            mov = { ...base, tipo: 'Pago de Compromiso', desc: descRaw || it.nombre, categoria: it.nombre, sobre: null, compromisoId: it.id };
        } else if (sub === 'deudas') {
            const it = compromisosDB.find(c => c.id === id);
            // Al editar, el saldo ya incluye este pago: se compara contra lo que había antes
            const previo = idEdicionActual !== null ? (historialDB.find(m => m.id === idEdicionActual && m.deudaId === id)?.monto || 0) : 0;
            const restante = (it.deudaActual || 0) + previo;
            if (monto > restante) return mostrarAlertaKoda("Payment too high", `${it.nombre} only has $${restante.toLocaleString()} remaining.`);
            mov = { ...base, tipo: 'Pago de Deuda', desc: descRaw || it.nombre, categoria: it.nombre, sobre: null, deudaId: it.id };
        } else {
            const it = sobresDB.find(s => s.id === id);
            mov = { ...base, tipo: 'Fondeo de Sobre', desc: descRaw || `Fund ${it.nombre}`, categoria: it.nombre, sobre: it.nombre };
        }
    } else if (tipoActual === 'meta') {
        if (metaFondeoId === null) return mostrarAlertaKoda("Nothing selected", "Select the goal to fund.");
        const meta = metasDB.find(m => m.id === metaFondeoId);
        mov = { ...base, tipo: 'Aporte a Meta', desc: descRaw || meta.nombre, categoria: meta.nombre, sobre: null, metaId: meta.id };
    } else {
        return;
    }

    const fISO = `${fechaSeleccionada.getFullYear()}-${String(fechaSeleccionada.getMonth() + 1).padStart(2, '0')}-${String(fechaSeleccionada.getDate()).padStart(2, '0')}T${new Date().toTimeString().split(' ')[0]}`;
    const btn = document.querySelector('#modal-movimiento button[type="submit"]');

    movimientoEnCurso = true;
    kodaBotonCargando(btn, true);
    try {
        // Aquí se llamará a Apps Script (1-3 s). Mientras tanto el botón queda bloqueado.
        await KodaAPI.simularPeticion('guardarMovimiento', mov);

        if (idEdicionActual !== null) {
            const idx = historialDB.findIndex(m => m.id === idEdicionActual);
            if (idx !== -1) {
                const previo = historialDB[idx];
                revertirMovimientoContable(previo.id);
                const mismaFecha = (previo.fechaStr || '').split('T')[0] === fISO.split('T')[0];
                historialDB[idx] = { ...mov, id: previo.id, fechaStr: mismaFecha ? previo.fechaStr : fISO, automatico: previo.automatico };
                aplicarMovimientoContable(historialDB[idx]);
            }
        } else {
            const nuevo = { ...mov, id: Date.now(), fechaStr: fISO };
            aplicarMovimientoContable(nuevo);
            historialDB.push(nuevo);
        }
        idEdicionActual = null;

        movimientoEnCurso = false;
        cerrarModalMovimiento();
        kodaRefrescarVistas();
        setTimeout(() => kodaBotonCargando(btn, false), 350);
    } catch (error) {
        console.error('Error guardando movimiento:', error);
        movimientoEnCurso = false;
        kodaBotonCargando(btn, false);
        kodaNotificar('Could not save the entry', error.message || 'Unknown error. Try again.', { tipo: 'error' });
        mostrarAlertaKoda("Could not save", error.message || "Something went wrong. Try again.");
    }
}

// Punto de entrada para movimientos creados solos (p. ej. lectura de correos del banco desde Apps Script)
async function registrarMovimientoAutomatico({ desc, monto, cuentaId, cuentaDestinoId = null, tipo = 'Gasto', categoria = 'General', sobre = null, fechaStr = null, origen = 'email', id = null, notificar = true, refCorreo = null }) {
    const cuenta = cuentasDB.find(c => c.id === cuentaId);
    if (!cuenta || !monto || monto <= 0) {
        kodaNotificar('Automatic entry failed', `Could not register "${desc || 'unknown'}". Check the account and amount.`, { tipo: 'error', link: 'historial.html' });
        return null;
    }
    const mov = {
        id: id || Date.now(), tipo, monto, desc, categoria: sobre || categoria, sobre,
        cuentaOrigen: cuenta.apodo, cuentaId: cuenta.id,
        fechaStr: fechaStr || new Date().toISOString().split('.')[0], automatico: true, origen
    };
    if (refCorreo) mov.refCorreo = refCorreo;
    if (tipo === 'Transferencia') {
        const dest = cuentasDB.find(c => c.id === cuentaDestinoId);
        if (!dest) return null;
        mov.cuentaDestinoId = dest.id;
        mov.categoria = `To ${dest.apodo}`;
    }
    aplicarMovimientoContable(mov);
    historialDB.push(mov);
    if (notificar) {
        const titulo = tipo === 'Ingreso' ? 'Automatic income registered' : tipo === 'Transferencia' ? 'Automatic transfer registered' : 'Automatic expense registered';
        kodaNotificar(titulo, `${desc} · $${monto.toLocaleString()} · ${cuenta.apodo}`, { tipo: 'auto', link: 'historial.html' });
    }
    kodaRefrescarVistas();
    return mov;
}

// Registra en KODA los movimientos que el servidor leyó de los correos del banco (pestaña "bandeja")
let kodaBandejaProcesando = false;
async function kodaProcesarBandeja() {
    if (!kodaNubeActiva || kodaBandejaProcesando || movimientoEnCurso) return;
    kodaBandejaProcesando = true;
    try {
        const { items } = await kodaNubeLlamar('bandeja');
        if (!items || !items.length) return;

        const listos = items.filter(i => i.estado === 'pendiente');
        const sinCuenta = items.filter(i => i.estado === 'sin_cuenta');
        const revisar = items.filter(i => i.estado === 'revisar');
        const duplicados = items.filter(i => i.estado === 'duplicado');
        const registrados = [];

        const resumen = listos.length > 3;   // muchos de golpe: una sola notificación
        for (let n = 0; n < listos.length; n++) {
            const it = listos[n];
            if (historialDB.some(m => m.refCorreo === it.id)) { registrados.push(it.id); continue; }   // ya estaba guardado
            const mov = await registrarMovimientoAutomatico({
                desc: it.desc, monto: it.monto, cuentaId: it.cuentaId, cuentaDestinoId: it.cuentaDestinoId,
                tipo: it.tipo, categoria: it.categoria, sobre: it.sobre, fechaStr: it.fechaStr, origen: 'email',
                id: Date.now() + n, notificar: !resumen, refCorreo: it.id
            });
            if (mov) registrados.push(it.id);
        }
        if (resumen && registrados.length) kodaNotificar('Automatic entries registered', `${registrados.length} entries from your bank emails.`, { tipo: 'auto', link: 'historial.html' });

        if (registrados.length) {
            // Primero se guardan en la hoja; solo entonces se marcan como registrados (así nunca se duplican ni se pierden)
            for (let w = 0; w < 50 && kodaNubeSincronizando; w++) await new Promise(r => setTimeout(r, 200));
            await kodaNubeSync();
            const pendiente = Object.keys(KODA_TABLAS_NUBE).some(t => JSON.stringify(kodaNubeSerializar(t)) !== kodaNubeSnapshot[t]);
            if (!pendiente) await kodaNubeLlamar('marcarBandeja', { ids: registrados, estado: 'registrado' });
        }

        if (sinCuenta.length) {
            kodaNotificar('Bank emails need a link', `${sinCuenta.length} email${sinCuenta.length > 1 ? 's' : ''} could not be matched to an account. ${sinCuenta[0].detalle}`,
                { tipo: 'warning', clave: 'bandeja-sin-cuenta' });
        }
        if (duplicados.length) {
            duplicados.forEach(it => kodaNotificar('Possible duplicate skipped', it.detalle || `${it.desc} looks like a repeated charge.`, { tipo: 'info', link: 'index.html' }));
            await kodaNubeLlamar('marcarBandeja', { ids: duplicados.map(i => i.id), estado: 'avisado' });
        }
        if (revisar.length) {
            revisar.forEach(it => kodaNotificar('Needs your attention', it.detalle || 'A bank email could not be read.', { tipo: 'warning', link: 'index.html' }));
            await kodaNubeLlamar('marcarBandeja', { ids: revisar.map(i => i.id), estado: 'avisado' });
        }
    } catch (e) {
        console.error('Bandeja falló:', e);
    } finally {
        kodaBandejaProcesando = false;
    }
}

// Editar un movimiento desde el historial / ledger
function abrirModalEdicion(id) {
    const mov = historialDB.find(m => m.id === id);
    if (!mov) return;
    if (mov.tipo === 'Préstamo') return;   // los préstamos se editan desde Obligations

    idEdicionActual = id;
    abrirModalMovimiento(true);

    const claves = { 'Gasto': 'gasto', 'Ingreso': 'ingreso', 'Aporte a Meta': 'meta', 'Transferencia': 'mover', 'Pago de Deuda': 'pagar', 'Pago de Compromiso': 'pagar', 'Fondeo de Sobre': 'pagar' };
    const tipoClave = claves[mov.tipo] || 'gasto';

    setTimeout(() => {
        const inputMonto = document.getElementById('input-monto');
        const inputNombre = document.getElementById('input-nombre-mov');
        if (inputMonto) inputMonto.value = Math.abs(mov.monto);
        if (inputNombre) inputNombre.value = mov.desc || '';

        const tab = [...document.querySelectorAll('.tab-item')].find(t => (t.getAttribute('onclick') || '').includes(`'${tipoClave}'`));
        if (tab) animarTab(tab, tipoClave);

        cuentaOrigenSeleccionadaId = mov.cuentaId;
        renderizarCuentasEnModal();

        if (tipoClave === 'mover' && mov.cuentaDestinoId) {
            cuentaDestinoSeleccionadaId = mov.cuentaDestinoId;
            renderizarCuentasDestinoMover();
        }
        if (tipoClave === 'pagar') {
            const sub = mov.tipo === 'Pago de Deuda' ? 'deudas' : (mov.tipo === 'Fondeo de Sobre' ? 'sobres' : 'fijos');
            const subBtn = [...document.querySelectorAll('.btn-subpago')].find(b => (b.getAttribute('onclick') || '').includes(`'${sub}'`));
            setSubtipoPago(sub, subBtn);
            const itemId = mov.tipo === 'Pago de Deuda' ? mov.deudaId : (mov.tipo === 'Fondeo de Sobre' ? (sobresDB.find(s => s.nombre === mov.sobre) || {}).id : mov.compromisoId);
            pagarSeleccion = { sub, id: itemId };
            autoAsignarMonto(document.querySelector(`.pill-pagar-item[data-id="${itemId}"]`), null, 'pagar-item', 'neutral');
        }
        if (tipoClave === 'meta') {
            renderizarMetasFondeo();
            metaFondeoId = mov.metaId ?? null;
            autoAsignarMonto(document.querySelector(`.pill-meta-item[data-id="${mov.metaId}"]`), null, 'meta-item', 'gold');
        }

        const toggleSobre = document.getElementById('toggle-sobre');
        if (tipoClave === 'gasto' && mov.sobre && toggleSobre) {
            toggleSobre.checked = true;
            toggleAnimacionSobres(true);
            sobreSeleccionado = mov.sobre;
            setTimeout(() => {
                document.querySelectorAll('.pill-sobre-gasto').forEach(btn => {
                    if (btn.innerText.trim() === mov.sobre) {
                        btn.className = 'pill-sobre-gasto px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-colors bg-koda-blue/20 text-koda-blue border-koda-blue cursor-pointer';
                    }
                });
            }, 80);
        } else if (toggleSobre) {
            toggleSobre.checked = false;
            toggleAnimacionSobres(false);
        }

        const btnSubmit = document.querySelector('#modal-movimiento button[type="submit"]');
        if (btnSubmit) btnSubmit.innerText = "Update";
    }, 80);
}

// Los inputs numéricos no cambian de valor con la rueda del mouse (global)
document.addEventListener('wheel', (e) => {
    const el = document.activeElement;
    if (el && el.tagName === 'INPUT' && el.type === 'number') el.blur();
}, { passive: true });


// ==========================================
// [APP-15] CONEXIÓN CON GOOGLE SHEETS (Apps Script)
// Si hay una dirección y una clave guardadas (página setup.html), KODA carga sus datos
// desde la hoja al abrir y guarda en ella cada cambio. Sin configuración sigue en modo demo.
// ==========================================
const KODA_NUBE_KEY = 'koda_nube';
const KODA_TABLAS_NUBE = {
    cuentas: () => cuentasDB, sobres: () => sobresDB, compromisos: () => compromisosDB, metas: () => metasDB,
    historial: () => historialDB, prestamos: () => prestamosDB, checkpay: () => checkpayDB,
    checkpay_plantilla: () => checkpayTemplateDB, categorias: () => categoriasDB
};
let kodaNubeActiva = false;      // true solo cuando los datos se cargaron bien (evita pisar la hoja con datos demo)
let kodaNubeSnapshot = {};
let kodaNubeSincronizando = false;
let kodaNubeFalloAvisado = false;

function kodaNubeConfig() {
    try {
        const c = JSON.parse(localStorage.getItem(KODA_NUBE_KEY) || sessionStorage.getItem(KODA_NUBE_KEY) || 'null');
        return c && c.url && c.token ? c : null;
    } catch (e) { return null; }
}

async function kodaNubeLlamar(action, extra = {}, cfg = kodaNubeConfig()) {
    if (!cfg) throw new Error('KODA no está conectado a Google Sheets.');
    const res = await fetch(cfg.url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },   // evita la comprobación previa (CORS) de Apps Script
        body: JSON.stringify({ token: cfg.token, action, ...extra })
    });
    if (!res.ok) throw new Error('El servidor respondió ' + res.status);
    let data;
    try { data = await res.json(); } catch (e) { throw new Error('Respuesta no válida. Revisa que la dirección sea la de la aplicación web.'); }
    if (!data.ok) throw new Error(data.error || 'Error desconocido del servidor');
    return data;
}

// Cierra la sesión de este dispositivo (la dirección del servidor se recuerda, la clave no)
function kodaCerrarSesion(ir = true) {
    try { localStorage.removeItem(KODA_NUBE_KEY); sessionStorage.removeItem(KODA_NUBE_KEY); } catch (e) {}
    kodaNubeActiva = false;
    if (ir) window.location.href = 'login.html';
}

function kodaNubeSerializar(tabla) {
    const arr = KODA_TABLAS_NUBE[tabla]();
    return tabla === 'categorias' ? arr.map(c => ({ nombre: c })) : arr;
}

function kodaNubeTomarSnapshot() {
    Object.keys(KODA_TABLAS_NUBE).forEach(t => { kodaNubeSnapshot[t] = JSON.stringify(kodaNubeSerializar(t)); });
}

async function kodaNubeCargar() {
    const cfg = kodaNubeConfig();
    if (!cfg || window.KODA_SIN_NUBE) return;
    try {
        await kodaNubeCargarInterno(cfg);
    } finally {
        document.getElementById('koda-ocultar')?.remove();
    }
}

async function kodaNubeCargarInterno(cfg) {
    try {
        const { datos, inicializado } = await kodaNubeLlamar('cargar', {}, cfg);
        const hayDatos = Object.keys(KODA_TABLAS_NUBE).some(t => (datos[t] || []).length > 0);
        if (!hayDatos && !inicializado) {
            // Hoja sin preparar: NO se guarda nada hasta que pulses "Start empty" en setup.html
            kodaNotificar('Your sheet is not set up', 'Open the setup page and press Start empty to begin saving.', { tipo: 'warning', clave: 'nube-vacia', link: 'login.html' });
            return;
        }
        Object.keys(KODA_TABLAS_NUBE).forEach(t => {
            const filas = datos[t] || [];
            const destino = KODA_TABLAS_NUBE[t]();
            const nuevas = t === 'categorias' ? filas.map(f => f.nombre) : filas;
            destino.splice(0, destino.length, ...nuevas);
        });
        notificacionesDB = notificacionesDB.filter(n => n.clave !== 'nube-vacia');
        kodaNubeTomarSnapshot();
        kodaNubeActiva = true;
        kodaRefrescarVistas();
        setTimeout(kodaProcesarBandeja, 800);
        setInterval(kodaProcesarBandeja, 60000);
        ['initializeGoalsView', 'renderizarPaginaCheckpay'].forEach(n => { if (typeof window[n] === 'function') { try { window[n](); } catch (e) { console.error(n, e); } } });
    } catch (e) {
        console.error('Carga desde Google Sheets falló:', e);
        kodaNotificar('Could not load your data', e.message, { tipo: 'error', clave: 'nube-carga' });
        mostrarAlertaKoda('Could not load your data', 'KODA is showing sample data and will not save changes. ' + e.message);
    }
}

async function kodaNubeSync() {
    if (!kodaNubeActiva || kodaNubeSincronizando) return;
    const cambiadas = Object.keys(KODA_TABLAS_NUBE).filter(t => JSON.stringify(kodaNubeSerializar(t)) !== kodaNubeSnapshot[t]);
    if (!cambiadas.length) return;
    kodaNubeSincronizando = true;
    try {
        for (const t of cambiadas) {
            const filas = kodaNubeSerializar(t);
            await kodaNubeLlamar('guardarTabla', { tabla: t, filas });
            kodaNubeSnapshot[t] = JSON.stringify(filas);
        }
        kodaNubeFalloAvisado = false;
    } catch (e) {
        console.error('Sincronización falló:', e);
        if (!kodaNubeFalloAvisado) {
            kodaNubeFalloAvisado = true;
            kodaNotificar('Changes not saved', e.message + ' KODA will keep retrying.', { tipo: 'error', clave: 'nube-sync' });
        }
    } finally {
        kodaNubeSincronizando = false;
    }
}

// En modo conectado, las "peticiones" de las páginas disparan el guardado real justo después de aplicar el cambio
(function () {
    if (typeof KodaAPI === 'undefined' || !kodaNubeConfig() || window.KODA_SIN_NUBE) return;
    const original = KodaAPI.simularPeticion;
    KodaAPI.simularPeticion = async function (nombre, datos, tiempo) {
        await original.call(KodaAPI, nombre, datos, Math.min(tiempo || 400, 400));
        setTimeout(kodaNubeSync, 150);
        return { success: true, data: datos };
    };
    setInterval(kodaNubeSync, 3000);   // red de seguridad: guarda cualquier cambio pendiente
    document.addEventListener('visibilitychange', () => { if (document.hidden) kodaNubeSync(); });
    window.addEventListener('beforeunload', e => {
        const pendiente = kodaNubeActiva && Object.keys(KODA_TABLAS_NUBE).some(t => JSON.stringify(kodaNubeSerializar(t)) !== kodaNubeSnapshot[t]);
        if (pendiente) { e.preventDefault(); e.returnValue = ''; }
    });
})();


// ==========================================
// [APP-16] SIN AUTOCOMPLETADO DEL NAVEGADOR
// Quita las sugerencias de "Saved info" / autofill en todos los campos, incluidos los de modales cargados después.
// ==========================================
function kodaSinAutocompletar(raiz = document) {
    raiz.querySelectorAll('input, textarea, select, form').forEach(el => {
        if (el.type === 'password' || el.dataset.kodaAc === '1') return;
        const esTexto = el.tagName === 'TEXTAREA' || ['text', 'search', 'tel', 'email', 'url', ''].includes(el.type || '');
        // "off" lo ignoran algunos navegadores en campos que parecen nombre/dirección; "new-password" no activa sugerencias en texto
        el.setAttribute('autocomplete', esTexto && el.tagName !== 'FORM' ? 'new-password' : 'off');
        if (esTexto) { el.setAttribute('autocorrect', 'off'); el.setAttribute('autocapitalize', 'off'); el.setAttribute('spellcheck', 'false'); }
        el.dataset.kodaAc = '1';
    });
}
document.addEventListener('DOMContentLoaded', () => {
    kodaSinAutocompletar();
    new MutationObserver(m => { if (m.some(x => x.addedNodes.length)) kodaSinAutocompletar(); })
        .observe(document.body, { childList: true, subtree: true });
});
