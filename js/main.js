// ============================================
// MENÚ HAMBURGUESA
// ============================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Cerrar menú al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ============================================
// ANIMACIÓN DE CONTADORES
// ============================================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 segundos
    const increment = target / (duration / 16); // 60 FPS
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };
    
    updateCounter();
}

// Intersection Observer para activar contadores cuando sean visibles
const statNumbers = document.querySelectorAll('.stat-number[data-target]');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target); // Solo animar una vez
        }
    });
}, {
    threshold: 0.5
});

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// ============================================
// EFECTO PARALLAX EN HERO
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent) {
        // Efecto parallax suave
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / 700);
    }
});

// ============================================
// AÑADIR CLASE AL NAVBAR AL HACER SCROLL
// ============================================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)';
    }
});

// ============================================
// LAZY LOADING DE IMÁGENES
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// ANIMACIÓN DE ENTRADA PARA FEATURE CARDS
// ============================================
const featureCards = document.querySelectorAll('.feature-card');
const cardsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100); // Efecto escalonado
            cardsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

featureCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.5s ease-out';
    cardsObserver.observe(card);
});

// ============================================
// SMOOTH SCROLL (por si acaso)
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});
// ============================================
// HERRAMIENTAS PRÁCTICAS - HOME
// ============================================

// Generador de Contraseñas - Home
class HomePasswordGenerator {
    constructor() {
        this.lengthSlider = document.getElementById('homePasswordLength');
        this.lengthValue = document.getElementById('homeLengthValue');
        this.includeUppercase = document.getElementById('homeIncludeUppercase');
        this.includeNumbers = document.getElementById('homeIncludeNumbers');
        this.includeSymbols = document.getElementById('homeIncludeSymbols');
        this.generateBtn = document.getElementById('homeGeneratePassword');
        this.passwordOutput = document.getElementById('homePasswordOutput');
        this.copyBtn = document.getElementById('homeCopyPassword');
        this.strengthBar = document.getElementById('homeStrengthBar');
        this.strengthText = document.getElementById('homeStrengthText');
        
        this.init();
    }
    
    init() {
        if (!this.lengthSlider) return;
        
        // Actualizar valor del slider
        this.lengthSlider.addEventListener('input', (e) => {
            this.lengthValue.textContent = e.target.value;
        });
        
        // Generar contraseña
        this.generateBtn.addEventListener('click', () => {
            this.generatePassword();
        });
        
        // Copiar contraseña
        this.copyBtn.addEventListener('click', () => {
            this.copyToClipboard();
        });
        
        // Generar automáticamente al cambiar opciones
        this.includeUppercase.addEventListener('change', () => this.generatePassword());
        this.includeNumbers.addEventListener('change', () => this.generatePassword());
        this.includeSymbols.addEventListener('change', () => this.generatePassword());
    }
    
    generatePassword() {
        const length = parseInt(this.lengthSlider.value);
        
        let chars = 'abcdefghijklmnopqrstuvwxyz';
        
        if (this.includeUppercase.checked) {
            chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        }
        if (this.includeNumbers.checked) {
            chars += '0123456789';
        }
        if (this.includeSymbols.checked) {
            chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
        }
        
        if (chars === 'abcdefghijklmnopqrstuvwxyz') {
            this.includeUppercase.checked = true;
            chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        }
        
        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            password += chars[randomIndex];
        }
        
        this.passwordOutput.value = password;
        this.updateStrength(password);
    }
    
    updateStrength(password) {
        let strength = 0;
        
        if (password.length >= 12) strength += 1;
        if (password.length >= 16) strength += 1;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
        
        this.strengthBar.className = 'strength-bar';
        this.strengthText.className = 'strength-text';
        
        if (strength <= 2) {
            this.strengthBar.classList.add('weak');
            this.strengthText.classList.add('weak');
            this.strengthText.textContent = 'Contraseña Débil';
        } else if (strength <= 4) {
            this.strengthBar.classList.add('medium');
            this.strengthText.classList.add('medium');
            this.strengthText.textContent = 'Contraseña Media';
        } else {
            this.strengthBar.classList.add('strong');
            this.strengthText.classList.add('strong');
            this.strengthText.textContent = 'Contraseña Fuerte';
        }
    }
    
    copyToClipboard() {
        const password = this.passwordOutput.value;
        
        if (!password) {
            showToast('Genera una contraseña primero');
            return;
        }
        
        navigator.clipboard.writeText(password).then(() => {
            showToast('¡Contraseña copiada al portapapeles!');
            
            this.copyBtn.textContent = '✓';
            setTimeout(() => {
                this.copyBtn.textContent = '📋';
            }, 2000);
        }).catch(() => {
            showToast('Error al copiar la contraseña');
        });
    }
}

// Verificador de Email - Home
class HomeEmailChecker {
    constructor() {
        this.emailInput = document.getElementById('homeEmailInput');
        this.checkBtn = document.getElementById('homeCheckEmail');
        
        this.init();
    }
    
    init() {
        if (!this.checkBtn) return;
        
        this.checkBtn.addEventListener('click', () => {
            this.checkEmail();
        });
        
        this.emailInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkEmail();
            }
        });
    }
    
    checkEmail() {
        const email = this.emailInput.value.trim();
        
        if (!email) {
            showToast('Por favor ingresa un email');
            return;
        }
        
        if (!this.isValidEmail(email)) {
            showToast('Por favor ingresa un email válido');
            return;
        }
        
        const url = `https://haveibeenpwned.com/account/${encodeURIComponent(email)}`;
        window.open(url, '_blank');
        
        showToast('Abriendo verificador en nueva pestaña...');
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Toast Notification
function showToast(message) {
    let toast = document.getElementById('toast');
    
    // Crear toast si no existe
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        toast.innerHTML = `
            <span class="toast-icon">✓</span>
            <span class="toast-message"></span>
        `;
        document.body.appendChild(toast);
    }
    
    const toastMessage = toast.querySelector('.toast-message');
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Inicializar herramientas cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new HomePasswordGenerator();
    new HomeEmailChecker();
});

// ============================================
// MENSAJE DE CONSOLA
// ============================================
console.log('%c¡Bienvenido a AR Bot! 🤖', 'font-size: 20px; color: #0066CC; font-weight: bold;');
console.log('%cProyecto educativo sobre CONPES 3975 y 3995', 'font-size: 14px; color: #00CC66;');