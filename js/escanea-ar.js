// ============================================
// ESCANEA AR - JAVASCRIPT
// ============================================

class ARExperience {
    constructor() {
        this.welcomeScreen = document.getElementById('welcomeScreen');
        this.arCameraView = document.getElementById('arCameraView');
        this.noPosterSection = document.getElementById('noPosterSection');
        this.markerDetected = document.getElementById('markerDetected');
        this.markerModal = document.getElementById('markerModal');
        
        this.cameraActive = false;
        this.markerVisible = false;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.checkCameraPermissions();
    }
    
    // ============================================
    // EVENT LISTENERS
    // ============================================
    setupEventListeners() {
        // Activar cámara
        document.getElementById('activateCameraBtn').addEventListener('click', () => {
            this.activateCamera();
        });
        
        // Cerrar cámara AR
        document.getElementById('closeArBtn').addEventListener('click', () => {
            this.closeCamera();
        });
        
        // Enlace "No tengo afiche"
        document.getElementById('noPosterLink').addEventListener('click', (e) => {
            e.preventDefault();
            this.showNoPosterSection();
        });
        
        // Volver a bienvenida
        document.getElementById('backToWelcome').addEventListener('click', () => {
            this.showWelcomeScreen();
        });
        
        // Ver lección completa
        document.getElementById('viewLessonBtn').addEventListener('click', () => {
            window.location.href = 'aprende.html';
        });
        
        // Capturar foto
        document.getElementById('capturePhotoBtn').addEventListener('click', () => {
            this.capturePhoto();
        });
        
        // Mostrar marcador en modal
        document.getElementById('showMarkerBtn').addEventListener('click', () => {
            this.showMarkerModal();
        });
        
        // Cerrar modal de marcador
        document.getElementById('closeMarkerModal').addEventListener('click', () => {
            this.closeMarkerModal();
        });
        
        // Pantalla completa del marcador
        document.getElementById('fullscreenMarkerBtn').addEventListener('click', () => {
            this.fullscreenMarker();
        });
        
        // Detectar marcador con AR.js
        this.setupARDetection();
    }
    
    // ============================================
    // NAVEGACIÓN ENTRE PANTALLAS
    // ============================================
    showWelcomeScreen() {
        this.welcomeScreen.style.display = 'block';
        this.arCameraView.style.display = 'none';
        this.noPosterSection.style.display = 'none';
        document.querySelector('.navbar').style.display = 'block';
        document.querySelector('.footer').style.display = 'block';
    }
    
    showNoPosterSection() {
        this.welcomeScreen.style.display = 'none';
        this.arCameraView.style.display = 'none';
        this.noPosterSection.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // ============================================
    // CÁMARA AR
    // ============================================
    async activateCamera() {
        try {
            // Solicitar permiso de cámara
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: 'environment' } 
            });
            
            // Ocultar pantallas anteriores
            this.welcomeScreen.style.display = 'none';
            this.noPosterSection.style.display = 'none';
            document.querySelector('.navbar').style.display = 'none';
            document.querySelector('.footer').style.display = 'none';
            
            // Mostrar vista de cámara
            this.arCameraView.style.display = 'block';
            this.cameraActive = true;
            
            // Iniciar AR.js
            this.startARScene();
            
            showToast('Cámara activada. Apunta al afiche AR Bot');
            
            // Track evento
            this.trackEvent('camera_activated');
            
        } catch (error) {
            console.error('Error al acceder a la cámara:', error);
            
            if (error.name === 'NotAllowedError') {
                showToast('Permiso de cámara denegado. Por favor, permite el acceso.');
            } else if (error.name === 'NotFoundError') {
                showToast('No se encontró ninguna cámara en tu dispositivo.');
            } else {
                showToast('Error al acceder a la cámara. Intenta de nuevo.');
            }
        }
    }
    
    closeCamera() {
        // Detener stream de video
        const video = document.querySelector('video');
        if (video && video.srcObject) {
            video.srcObject.getTracks().forEach(track => track.stop());
        }
        
        this.cameraActive = false;
        this.showWelcomeScreen();
        
        showToast('Cámara desactivada');
    }
    
    async checkCameraPermissions() {
        try {
            const result = await navigator.permissions.query({ name: 'camera' });
            
            if (result.state === 'granted') {
                console.log('Permiso de cámara ya concedido');
            } else if (result.state === 'prompt') {
                console.log('Permiso de cámara pendiente');
            } else {
                console.log('Permiso de cámara denegado');
            }
        } catch (error) {
            console.log('No se pudo verificar el permiso de cámara');
        }
    }
    
    // ============================================
    // AR.JS DETECTION
    // ============================================
    setupARDetection() {
        // Esperar a que AR.js esté listo
        setTimeout(() => {
            const marker = document.getElementById('marker');
            
            if (marker) {
                // Cuando el marcador es encontrado
                marker.addEventListener('markerFound', () => {
                    console.log('Marcador detectado!');
                    this.onMarkerFound();
                });
                
                // Cuando el marcador se pierde
                marker.addEventListener('markerLost', () => {
                    console.log('Marcador perdido');
                    this.onMarkerLost();
                });
            }
        }, 1000);
    }
    
    startARScene() {
        const scene = document.getElementById('arScene');
        if (scene) {
            // AR.js se inicializa automáticamente
            console.log('AR Scene iniciada');
        }
    }
    
    onMarkerFound() {
        this.markerVisible = true;
        
        // Mostrar panel de detección
        this.markerDetected.style.display = 'block';
        
        // Vibrar si está disponible
        if (navigator.vibrate) {
            navigator.vibrate(200);
        }
        
        // Track evento
        this.trackEvent('marker_detected');
        
        showToast('¡Marcador detectado! AR Bot apareció');
    }
    
    onMarkerLost() {
        this.markerVisible = false;
        
        // Ocultar panel
        setTimeout(() => {
            if (!this.markerVisible) {
                this.markerDetected.style.display = 'none';
            }
        }, 500);
    }
    
    // ============================================
    // CAPTURA DE FOTO
    // ============================================
    capturePhoto() {
        const scene = document.getElementById('arScene');
        
        if (!scene) {
            showToast('Error al capturar foto');
            return;
        }
        
        try {
            // Capturar screenshot del canvas de A-Frame
            const canvas = scene.components.screenshot.getCanvas('perspective');
            
            if (canvas) {
                // Convertir a blob
                canvas.toBlob((blob) => {
                    // Crear enlace de descarga
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `arbot-${Date.now()}.png`;
                    a.click();
                    
                    showToast('Foto capturada exitosamente');
                    
                    // Track evento
                    this.trackEvent('photo_captured');
                });
            } else {
                // Fallback: Capturar todo el elemento
                this.captureScreenshot();
            }
        } catch (error) {
            console.error('Error al capturar foto:', error);
            this.captureScreenshot();
        }
    }
    
    captureScreenshot() {
        // Método alternativo de captura
        showToast('📸 Usa la captura de pantalla de tu dispositivo');
    }
    
    // ============================================
    // MODAL DE MARCADOR
    // ============================================
    showMarkerModal() {
        this.markerModal.style.display = 'flex';
    }
    
    closeMarkerModal() {
        this.markerModal.style.display = 'none';
    }
    
    fullscreenMarker() {
        const markerImage = document.querySelector('.marker-image');
        
        if (markerImage.requestFullscreen) {
            markerImage.requestFullscreen();
        } else if (markerImage.webkitRequestFullscreen) {
            markerImage.webkitRequestFullscreen();
        } else if (markerImage.mozRequestFullScreen) {
            markerImage.mozRequestFullScreen();
        } else {
            showToast('Pantalla completa no disponible en tu navegador');
        }
    }
    
    // ============================================
    // ANALYTICS / TRACKING
    // ============================================
    trackEvent(eventName) {
        const events = JSON.parse(localStorage.getItem('arEvents') || '[]');
        events.push({
            event: eventName,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('arEvents', JSON.stringify(events));
        
        console.log('Event tracked:', eventName);
    }
}

// ============================================
// TOAST NOTIFICATION
// ============================================
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = toast.querySelector('.toast-message');
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ============================================
// VERIFICAR COMPATIBILIDAD
// ============================================
function checkARCompatibility() {
    const hasCamera = navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
    const hasWebGL = (() => {
        try {
            const canvas = document.createElement('canvas');
            return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
        } catch(e) {
            return false;
        }
    })();
    
    if (!hasCamera) {
        console.warn('Dispositivo sin cámara');
        showToast('⚠️ Tu dispositivo no tiene cámara compatible');
    }
    
    if (!hasWebGL) {
        console.warn('WebGL no disponible');
        showToast('⚠️ Tu navegador no soporta WebGL');
    }
    
    return hasCamera && hasWebGL;
}

// ============================================
// DETECCIÓN DE ORIENTACIÓN
// ============================================
function detectOrientation() {
    if (window.innerHeight > window.innerWidth) {
        // Modo vertical
        console.log('Orientación: Vertical');
    } else {
        // Modo horizontal
        console.log('Orientación: Horizontal');
    }
}

window.addEventListener('orientationchange', detectOrientation);
window.addEventListener('resize', detectOrientation);

// ============================================
// ESTADÍSTICAS DE AR
// ============================================
function getARStats() {
    const events = JSON.parse(localStorage.getItem('arEvents') || '[]');
    
    const stats = {
        totalSessions: events.filter(e => e.event === 'camera_activated').length,
        markersDetected: events.filter(e => e.event === 'marker_detected').length,
        photosCaptured: events.filter(e => e.event === 'photo_captured').length
    };
    
    return stats;
}

function showARStats() {
    const stats = getARStats();
    console.table(stats);
    console.log('\n📊 Estadísticas de AR:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Sesiones AR: ${stats.totalSessions}`);
    console.log(`Marcadores detectados: ${stats.markersDetected}`);
    console.log(`Fotos capturadas: ${stats.photosCaptured}`);
}

function resetARStats() {
    localStorage.removeItem('arEvents');
    console.log('✅ Estadísticas de AR reseteadas');
}

// ============================================
// HELPER: DESCARGAR MARCADOR
// ============================================
function downloadMarker() {
    // Crear un enlace de descarga para el marcador
    const link = document.createElement('a');
    link.href = 'images/hiro-marker.png'; // o tu marcador personalizado
    link.download = 'arbot-marker.png';
    link.click();
    
    showToast('Descargando marcador AR Bot...');
}

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Verificar compatibilidad
    const isCompatible = checkARCompatibility();
    
    if (isCompatible) {
        // Inicializar experiencia AR
        window.arExperience = new ARExperience();
        
        console.log('AR Experience initialized');
        console.log('Tip: Usa showARStats() para ver estadísticas');
    } else {
        console.error('Dispositivo no compatible con AR');
    }
    
    // Detectar orientación inicial
    detectOrientation();
    
    // Scroll al inicio
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Hacer funciones disponibles globalmente
window.showARStats = showARStats;
window.resetARStats = resetARStats;
window.downloadMarker = downloadMarker;
window.showToast = showToast;