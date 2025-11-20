// ============================================
// ACERCA DE - JAVASCRIPT
// ============================================

class AboutPage {
    constructor() {
        this.init();
    }
    
    init() {
        this.initScrollAnimations();
        this.initTeamCards();
        this.initTechBadges();
        this.trackPageView();
    }
    
    // ============================================
    // ANIMACIONES AL SCROLL
    // ============================================
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Añadir clase para animaciones específicas
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);
        
        // Observar elementos
        const elementsToAnimate = document.querySelectorAll(`
            .project-text,
            .project-conpes,
            .team-card,
            .university-content,
            .tech-category,
            .contact-card-main,
            .cta-card
        `);
        
        elementsToAnimate.forEach((element, index) => {
            // Añadir delay progresivo
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `all 0.6s ease ${index * 0.1}s`;
            
            observer.observe(element);
        });
    }
    
    // ============================================
    // TARJETAS DEL EQUIPO
    // ============================================
    initTeamCards() {
        const teamCards = document.querySelectorAll('.team-card');
        
        teamCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.highlightTeamCard(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.unhighlightTeamCard(card);
            });
        });
    }
    
    highlightTeamCard(card) {
        const avatar = card.querySelector('.avatar-placeholder');
        if (avatar) {
            avatar.style.transform = 'scale(1.1) rotate(5deg)';
        }
    }
    
    unhighlightTeamCard(card) {
        const avatar = card.querySelector('.avatar-placeholder');
        if (avatar) {
            avatar.style.transform = 'scale(1) rotate(0deg)';
        }
    }
    
    // ============================================
    // BADGES DE TECNOLOGÍA
    // ============================================
    initTechBadges() {
        const badges = document.querySelectorAll('.tech-badge');
        
        badges.forEach((badge, index) => {
            // Animación de entrada escalonada
            badge.style.opacity = '0';
            badge.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                badge.style.transition = 'all 0.5s ease';
                badge.style.opacity = '1';
                badge.style.transform = 'scale(1)';
            }, index * 50);
            
            // Click para mostrar info
            badge.addEventListener('click', () => {
                this.showTechInfo(badge);
            });
        });
    }
    
    showTechInfo(badge) {
        const techName = badge.querySelector('.tech-name').textContent;
        console.log(`Tecnología: ${techName}`);
        
        // Animación de click
        badge.style.transform = 'scale(0.95)';
        setTimeout(() => {
            badge.style.transform = 'scale(1)';
        }, 150);
    }
    
    // ============================================
    // CONTADOR ANIMADO
    // ============================================
    animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }
    
    // ============================================
    // TRACKING
    // ============================================
    trackPageView() {
        const pageViews = JSON.parse(localStorage.getItem('aboutPageViews') || '0');
        const newViews = parseInt(pageViews) + 1;
        localStorage.setItem('aboutPageViews', newViews.toString());
        
        console.log(`Vista #${newViews} de la página Acerca de`);
    }
}

// ============================================
// COPIAR EMAIL AL PORTAPAPELES
// ============================================
function setupEmailCopy() {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const email = link.textContent.trim();
            
            navigator.clipboard.writeText(email).then(() => {
                showToast('Email copiado al portapapeles');
            }).catch(() => {
                // Si falla, abrir mailto normal
                window.location.href = link.href;
            });
        });
    });
}

// ============================================
// SMOOTH SCROLL A SECCIONES
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// EASTER EGG - CÓDIGO KONAMI
// ============================================
function initKonamiCode() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
                        'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

function activateEasterEgg() {
    // Modo desarrollador activado
    document.body.style.animation = 'rainbow 3s ease infinite';
    
    showToast('🎉 ¡Modo Desarrollador Activado!');
    
    console.log(`
    ╔══════════════════════════════════════╗
    ║         AR BOT - DEV MODE           ║
    ║                                      ║
    ║  Desarrollado con ❤️ por:           ║
    ║  • Brian Jimenez Korzelius          ║
    ║  • Santiago Medina Delgado          ║
    ║  • Juan Esteban Torres              ║
    ║  • David Estiven Garzón             ║
    ║                                      ║
    ║  Universidad Militar Nueva Granada  ║
    ║  Ingeniería de Sistemas - 2025      ║
    ╚══════════════════════════════════════╝
    `);
    
    // Resetear después de 3 segundos
    setTimeout(() => {
        document.body.style.animation = '';
    }, 3000);
}

// CSS para el easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// ============================================
// GENERAR VCARD
// ============================================
function generateVCard() {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:AR Bot - Equipo de Desarrollo
ORG:Universidad Militar Nueva Granada
EMAIL:contacto@arbot.edu.co
TEL:+57 123 456 7890
ADR:;;Cajicá;Cundinamarca;;Colombia
URL:https://www.arbot.edu.co
NOTE:Proyecto educativo sobre Transformación y Seguridad Digital
END:VCARD`;
    
    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'arbot-contacto.vcf';
    a.click();
    
    showToast('Contacto descargado');
}

// ============================================
// COMPARTIR PÁGINA
// ============================================
function sharePage() {
    const shareData = {
        title: 'AR Bot - Proyecto Educativo',
        text: 'Conoce AR Bot: Plataforma educativa sobre Transformación Digital y Seguridad con Realidad Aumentada',
        url: window.location.href
    };
    
    if (navigator.share) {
        navigator.share(shareData)
            .then(() => showToast('¡Gracias por compartir!'))
            .catch(() => {});
    } else {
        // Fallback: copiar URL
        navigator.clipboard.writeText(window.location.href)
            .then(() => showToast('URL copiada al portapapeles'))
            .catch(() => showToast('No se pudo compartir'));
    }
}

// ============================================
// TOAST NOTIFICATION
// ============================================
function showToast(message) {
    // Crear toast si no existe
    let toast = document.getElementById('toast');
    
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        toast.innerHTML = `
            <span class="toast-icon">✓</span>
            <span class="toast-message"></span>
        `;
        document.body.appendChild(toast);
        
        // Añadir estilos
        const style = document.createElement('style');
        style.textContent = `
            .toast {
                position: fixed;
                bottom: 32px;
                right: 32px;
                background: #1f2937;
                color: white;
                padding: 16px 24px;
                border-radius: 12px;
                display: flex;
                align-items: center;
                gap: 12px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.3s ease;
                pointer-events: none;
                z-index: 10000;
            }
            .toast.show {
                opacity: 1;
                transform: translateY(0);
            }
            .toast-icon {
                font-size: 20px;
                width: 28px;
                height: 28px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #10b981;
                border-radius: 50%;
            }
            .toast-message {
                font-size: 14px;
                font-weight: 600;
            }
        `;
        document.head.appendChild(style);
    }
    
    const toastMessage = toast.querySelector('.toast-message');
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ============================================
// ESTADÍSTICAS
// ============================================
function getAboutStats() {
    return {
        pageViews: parseInt(localStorage.getItem('aboutPageViews') || '0'),
        teamMembers: 4,
        technologies: document.querySelectorAll('.tech-badge').length,
        sections: document.querySelectorAll('section').length
    };
}

function showAboutStats() {
    const stats = getAboutStats();
    console.table(stats);
    console.log('\n📊 Estadísticas de la página:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Vistas de página: ${stats.pageViews}`);
    console.log(`Miembros del equipo: ${stats.teamMembers}`);
    console.log(`Tecnologías mostradas: ${stats.technologies}`);
    console.log(`Secciones: ${stats.sections}`);
}

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar página
    window.aboutPage = new AboutPage();
    
    // Inicializar funcionalidades
    setupEmailCopy();
    initSmoothScroll();
    initKonamiCode();
    
    // Scroll al inicio
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Log
    console.log('About Page initialized');
    console.log('Tip: Usa showAboutStats() para ver estadísticas');
    console.log('Tip: Usa generateVCard() para descargar contacto');
    console.log('Tip: Usa sharePage() para compartir');
    console.log('Easter Egg: Prueba el código Konami 😉');
});

// Hacer funciones disponibles globalmente
window.showAboutStats = showAboutStats;
window.generateVCard = generateVCard;
window.sharePage = sharePage;
window.showToast = showToast;