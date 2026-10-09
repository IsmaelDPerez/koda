// koda-api.js - SIMULADOR DEL CEREBRO DE GOOGLE APPS SCRIPT
// Si KODA está conectado a Google Sheets, oculta la página hasta tener los datos reales (evita ver datos de ejemplo un instante)
(function () {
    try {
        let c = null;
        try { c = JSON.parse(localStorage.getItem('koda_nube') || sessionStorage.getItem('koda_nube') || 'null'); } catch (e) {}
        const conectado = !!(c && c.url && c.token);
        // Sin sesión: todas las páginas (menos login.html) llevan al inicio de sesión
        if (!conectado && !window.KODA_PUBLICA) { location.replace('login.html'); return; }
        // En un teléfono se usa siempre la app móvil (?web=1 para forzar la versión de escritorio)
        try {
            if (new URLSearchParams(location.search).get('web') === '1') sessionStorage.setItem('koda_web', '1');
            const esTelefono = matchMedia('(max-width: 820px)').matches && matchMedia('(pointer: coarse)').matches;
            if (conectado && esTelefono && !window.KODA_PUBLICA && !window.KODA_SIN_NUBE && sessionStorage.getItem('koda_web') !== '1') { location.replace('movil.html'); return; }
        } catch (e) {}
        if (window.KODA_SIN_NUBE || !conectado) return;
        if (localStorage.getItem('koda_copia')) return;   // hay copia local: la página se muestra al instante
        const st = document.createElement('style');
        st.id = 'koda-ocultar';
        st.textContent = 'html{opacity:0;background:#131722}';
        document.head.appendChild(st);
        setTimeout(() => document.getElementById('koda-ocultar')?.remove(), 8000);
    } catch (e) {}
})();

const KodaAPI = {
    // Simulador genérico para cualquier acción de guardado, edición o eliminación
    simularPeticion: function(nombreAccion, paqueteDatos, tiempo = 1500) {
        return new Promise((resolve) => {
            console.log(`📡 [KodaAPI] Ejecutando: ${nombreAccion}...`, paqueteDatos || '');
            setTimeout(() => {
                console.log(`✅ [KodaAPI] Éxito: ${nombreAccion}`);
                resolve({ success: true, data: paqueteDatos });
            }, tiempo);
        });
    },

    // (Se mantiene tu función original del dashboard)
    obtenerDashboardMetas: function() {
        return new Promise((resolve) => {
            console.log("📡 Conectando a Google Sheets (Simulando 800ms)...");
            setTimeout(() => {
                const datos = {
                    metas: [
                        { id: 1, nombre: "Toyota Supra MK4", montoActual: 450000, metaTotal: 1000000, fechaInicio: "2025-01-01", fechaLimite: "2027-12-31", completadaReal: false, fechaFinReal: null, cuotaIdeal: 15000 },
                        { id: 2, nombre: "UNICARIBE", montoActual: 15000, metaTotal: 85000, fechaInicio: "2026-04-01", fechaLimite: "2027-02-15", completadaReal: false, fechaFinReal: null, cuotaIdeal: 6000 },
                        { id: 3, nombre: "Viaje Colombia", montoActual: 45000, metaTotal: 45000, fechaInicio: "2026-01-01", fechaLimite: "2026-11-15", completadaReal: false, fechaFinReal: null, cuotaIdeal: 5000 }, 
                        { id: 4, nombre: "Celular Nuevo", montoActual: 12000, metaTotal: 30000, fechaInicio: "2026-08-01", fechaLimite: "2027-01-15", completadaReal: false, fechaFinReal: null, cuotaIdeal: 4000 },
                        { id: 5, nombre: "Fondo Emergencia", montoActual: 30000, metaTotal: 30000, fechaInicio: "2024-05-01", fechaLimite: "2026-12-31", completadaReal: true, fechaFinReal: "2026-06-15", cuotaIdeal: 5000 },
                        { id: 6, nombre: "Laptop Secundaria", montoActual: 0, metaTotal: 40000, fechaInicio: "2026-09-01", fechaLimite: "2027-06-01", completadaReal: false, fechaFinReal: null, cuotaIdeal: 5000 }
                    ],
                    historial: {
                        1: { labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'], aportes: [15000, 20000, 10000, 15000, 15000, 30000, 20000, 15000], ideal: [15000, 30000, 45000, 60000, 75000, 90000, 105000, 120000], realAcumulado: [15000, 35000, 45000, 60000, 75000, 105000, 125000, 140000] },
                        2: { labels: ['Aug', 'Sep', 'Oct', 'Nov'], aportes: [2000, 3000, 5000, 5000], ideal: [5000, 10000, 15000, 20000], realAcumulado: [2000, 5000, 10000, 15000] },
                        3: { labels: ['Sep', 'Oct', 'Nov'], aportes: [15000, 15000, 15000], ideal: [15000, 30000, 45000], realAcumulado: [15000, 30000, 45000] },
                        4: { labels: ['Oct', 'Nov'], aportes: [6000, 6000], ideal: [8000, 12000], realAcumulado: [6000, 12000] },
                        6: { labels: ['Nov'], aportes: [0], ideal: [5000], realAcumulado: [0] }
                    }
                };
                console.log("✅ Datos descargados");
                resolve(datos);
            }, 800);
        });
    }
};