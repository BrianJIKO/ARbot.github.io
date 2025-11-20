// ============================================
// BARRA DE PROGRESO DE LECTURA
// ============================================
function updateReadingProgress() {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    const progressBar = document.getElementById('readingProgress');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
}

window.addEventListener('scroll', updateReadingProgress);

// ============================================
// ÍNDICE DE CONTENIDO INTERACTIVO
// ============================================
const tocLinks = document.querySelectorAll('.toc-link');
const sections = document.querySelectorAll('.lesson-content section');

// Función para actualizar el link activo en el índice
function updateActiveLink() {
    let currentSection = '';
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    tocLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Smooth scroll al hacer clic en links del índice
tocLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// TOGGLE SIDEBAR EN MÓVIL
// ============================================
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarContent = document.getElementById('sidebarContent');

if (sidebarToggle && sidebarContent) {
    sidebarToggle.addEventListener('click', () => {
        sidebarContent.classList.toggle('active');
        
        // Cambiar el texto del botón
        if (sidebarContent.classList.contains('active')) {
            sidebarToggle.textContent = '❌ Cerrar índice';
        } else {
            sidebarToggle.textContent = '📑 Índice de contenido';
        }
    });
}

// ============================================
// FUNCIONES PARA COMPARTIR EN REDES SOCIALES
// ============================================
function shareOnTwitter() {
    const url = window.location.href;
    const title = document.querySelector('.lesson-main-title').textContent;
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title + ' - AR Bot')}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
}

function shareOnFacebook() {
    const url = window.location.href;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
}

function shareOnWhatsApp() {
    const url = window.location.href;
    const title = document.querySelector('.lesson-main-title').textContent;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(title + ' - ' + url)}`;
    window.open(whatsappUrl, '_blank');
}

function copyLink() {
    const url = window.location.href;
    
    // Usar la API de portapapeles si está disponible
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
            showCopyNotification();
        }).catch(err => {
            console.error('Error al copiar:', err);
            fallbackCopyLink(url);
        });
    } else {
        fallbackCopyLink(url);
    }
}

// Método alternativo para copiar (para navegadores antiguos)
function fallbackCopyLink(url) {
    const tempInput = document.createElement('input');
    tempInput.value = url;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showCopyNotification();
}

// Mostrar notificación de copiado
function showCopyNotification() {
    const copyBtn = document.querySelector('.share-copy');
    const originalText = copyBtn.textContent;
    
    copyBtn.textContent = '✅ ¡Copiado!';
    copyBtn.style.backgroundColor = 'var(--success)';
    
    setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.style.backgroundColor = '';
    }, 2000);
}

// ============================================
// LAZY LOADING DE IMÁGENES
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ============================================
// ANIMACIÓN DE ENTRADA PARA SECCIONES
// ============================================
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            sectionObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease-out';
    sectionObserver.observe(section);
});

// ============================================
// ESTIMADOR DE TIEMPO DE LECTURA
// ============================================
function calculateReadingTime() {
    const content = document.querySelector('.lesson-content');
    if (!content) return;
    
    const text = content.textContent;
    const wordCount = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // 200 palabras por minuto
    
    console.log(`📖 Palabras: ${wordCount} | Tiempo estimado: ${readingTime} min`);
}

calculateReadingTime();

// ============================================
// GUARDAR PROGRESO DE LECTURA (OPCIONAL)
// ============================================
function saveReadingProgress() {
    const lessonId = window.location.pathname;
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    if (scrollPercent > 90) {
        localStorage.setItem(`lesson-completed-${lessonId}`, 'true');
        console.log('✅ Lección completada');
    }
}

// Guardar progreso cada 5 segundos
let saveProgressInterval;
window.addEventListener('scroll', () => {
    clearTimeout(saveProgressInterval);
    saveProgressInterval = setTimeout(saveReadingProgress, 5000);
});

// ============================================
// DESTACAR TEXTO SELECCIONADO (OPCIONAL)
// ============================================
document.addEventListener('mouseup', () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    
    if (selectedText.length > 10) {
        console.log(`📝 Texto seleccionado: "${selectedText}"`);
        // Aquí podrías agregar funcionalidad para compartir el texto seleccionado
    }
});

// ============================================
// INICIALIZACIÓN AL CARGAR
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('📚 Lección cargada correctamente');
    updateReadingProgress();
    updateActiveLink();
});
// ============================================
// ASEGURAR QUE EL VIDEO TENGA AUDIO
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('videoLeccion');
    
    if (video) {
        // Asegurar que el video NO esté silenciado
        video.muted = false;
        
        // Establecer volumen al máximo
        video.volume = 1.0;
        
        // Cuando el video esté listo para reproducirse
        video.addEventListener('loadedmetadata', () => {
            console.log('✅ Video cargado');
            console.log('🔊 Audio:', video.muted ? 'Silenciado' : 'Activo');
            console.log('📊 Volumen:', video.volume);
        });
        
        // Cuando se intente reproducir
        video.addEventListener('play', () => {
            if (video.muted) {
                video.muted = false;
                console.log('🔊 Audio activado automáticamente');
            }
        });
        
        // Detectar si el navegador bloqueó el audio
        video.addEventListener('volumechange', () => {
            console.log('🔊 Cambio de volumen:', video.volume);
        });
    }
});