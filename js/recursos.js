// ============================================
// RECURSOS - JAVASCRIPT
// ============================================

// ============================================
// GENERADOR DE CONTRASEÑAS
// ============================================

class PasswordGenerator {
    constructor() {
        this.lengthSlider = document.getElementById('passwordLength');
        this.lengthValue = document.getElementById('lengthValue');
        this.includeUppercase = document.getElementById('includeUppercase');
        this.includeNumbers = document.getElementById('includeNumbers');
        this.includeSymbols = document.getElementById('includeSymbols');
        this.generateBtn = document.getElementById('generatePassword');
        this.passwordOutput = document.getElementById('passwordOutput');
        this.copyBtn = document.getElementById('copyPassword');
        this.strengthBar = document.getElementById('strengthBar');
        this.strengthText = document.getElementById('strengthText');
        
        this.init();
    }
    
    init() {
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
        
        // Caracteres disponibles
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
        
        // Validar que al menos una opción esté seleccionada
        if (chars === 'abcdefghijklmnopqrstuvwxyz') {
            // Si solo hay minúsculas, activar al menos mayúsculas
            this.includeUppercase.checked = true;
            chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        }
        
        // Generar contraseña
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
        
        // Criterios de fortaleza
        if (password.length >= 12) strength += 1;
        if (password.length >= 16) strength += 1;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
        
        // Actualizar UI
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
            
            // Feedback visual
            this.copyBtn.textContent = '✓';
            setTimeout(() => {
                this.copyBtn.textContent = '📋';
            }, 2000);
        }).catch(() => {
            showToast('Error al copiar la contraseña');
        });
    }
}

// ============================================
// TEST DE FUERZA DE CONTRASEÑA
// ============================================

class PasswordStrengthTest {
    constructor() {
        this.testInput = document.getElementById('testPasswordInput');
        this.toggleBtn = document.getElementById('togglePasswordVisibility');
        this.resultsDiv = document.getElementById('testResults');
        this.strengthFill = document.getElementById('testStrengthFill');
        this.strengthLabel = document.getElementById('testStrengthLabel');
        this.checklist = document.getElementById('testChecklist');
        this.crackTime = document.getElementById('crackTimeEstimate');
        
        this.init();
    }
    
    init() {
        // Test en tiempo real
        this.testInput.addEventListener('input', () => {
            this.testPassword();
        });
        
        // Toggle visibilidad
        this.toggleBtn.addEventListener('click', () => {
            this.toggleVisibility();
        });
    }
    
    toggleVisibility() {
        if (this.testInput.type === 'password') {
            this.testInput.type = 'text';
            this.toggleBtn.textContent = '🙈';
        } else {
            this.testInput.type = 'password';
            this.toggleBtn.textContent = '👁️';
        }
    }
    
    testPassword() {
        const password = this.testInput.value;
        
        if (!password) {
            this.resultsDiv.style.display = 'none';
            return;
        }
        
        this.resultsDiv.style.display = 'block';
        
        // Análisis
        const checks = {
            length: password.length >= 12,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            numbers: /[0-9]/.test(password),
            symbols: /[^a-zA-Z0-9]/.test(password),
            noPersonal: !/^(123|password|qwerty|admin)/i.test(password)
        };
        
        const score = Object.values(checks).filter(v => v).length;
        const percentage = (score / 6) * 100;
        
        // Actualizar barra
        this.strengthFill.style.width = percentage + '%';
        
        if (score <= 2) {
            this.strengthFill.style.background = '#EF4444';
            this.strengthLabel.textContent = 'Contraseña Muy Débil';
            this.strengthLabel.style.color = '#EF4444';
        } else if (score <= 4) {
            this.strengthFill.style.background = '#F59E0B';
            this.strengthLabel.textContent = 'Contraseña Media';
            this.strengthLabel.style.color = '#F59E0B';
        } else {
            this.strengthFill.style.background = '#00CC66';
            this.strengthLabel.textContent = 'Contraseña Fuerte';
            this.strengthLabel.style.color = '#00CC66';
        }
        
        // Actualizar checklist
        this.checklist.innerHTML = `
            <li class="${checks.length ? 'check-pass' : 'check-fail'}">
                ${checks.length ? '✅' : '❌'} Al menos 12 caracteres
            </li>
            <li class="${checks.uppercase ? 'check-pass' : 'check-fail'}">
                ${checks.uppercase ? '✅' : '❌'} Letras mayúsculas
            </li>
            <li class="${checks.lowercase ? 'check-pass' : 'check-fail'}">
                ${checks.lowercase ? '✅' : '❌'} Letras minúsculas
            </li>
            <li class="${checks.numbers ? 'check-pass' : 'check-fail'}">
                ${checks.numbers ? '✅' : '❌'} Números
            </li>
            <li class="${checks.symbols ? 'check-pass' : 'check-fail'}">
                ${checks.symbols ? '✅' : '❌'} Símbolos especiales
            </li>
            <li class="${checks.noPersonal ? 'check-pass' : 'check-fail'}">
                ${checks.noPersonal ? '✅' : '❌'} No usa patrones comunes
            </li>
        `;
        
        // Calcular tiempo de hackeo
        const crackTimeText = this.calculateCrackTime(password);
        this.crackTime.textContent = crackTimeText;
    }
    
    calculateCrackTime(password) {
        let charSet = 0;
        if (/[a-z]/.test(password)) charSet += 26;
        if (/[A-Z]/.test(password)) charSet += 26;
        if (/[0-9]/.test(password)) charSet += 10;
        if (/[^a-zA-Z0-9]/.test(password)) charSet += 32;
        
        const combinations = Math.pow(charSet, password.length);
        const attemptsPerSecond = 1000000000; // 1 billón por segundo
        const seconds = combinations / attemptsPerSecond;
        
        if (seconds < 1) return 'Menos de 1 segundo';
        if (seconds < 60) return `${Math.round(seconds)} segundos`;
        if (seconds < 3600) return `${Math.round(seconds / 60)} minutos`;
        if (seconds < 86400) return `${Math.round(seconds / 3600)} horas`;
        if (seconds < 31536000) return `${Math.round(seconds / 86400)} días`;
        if (seconds < 31536000000) return `${Math.round(seconds / 31536000)} años`;
        return 'Siglos';
    }
}

// ============================================
// VERIFICADOR DE EMAIL HACKEADO
// ============================================

class EmailChecker {
    constructor() {
        this.emailInput = document.getElementById('emailInput');
        this.checkBtn = document.getElementById('checkEmail');
        
        this.init();
    }
    
    init() {
        this.checkBtn.addEventListener('click', () => {
            this.checkEmail();
        });
        
        // Permitir Enter en el input
        this.emailInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkEmail();
            }
        });
    }
    
    checkEmail() {
        const email = this.emailInput.value.trim();
        
        // Validar email
        if (!email) {
            showToast('Por favor ingresa un email');
            return;
        }
        
        if (!this.isValidEmail(email)) {
            showToast('Por favor ingresa un email válido');
            return;
        }
        
        // Redirigir a Have I Been Pwned
        const url = `https://haveibeenpwned.com/account/${encodeURIComponent(email)}`;
        window.open(url, '_blank');
        
        showToast('Abriendo verificador en nueva pestaña...');
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// ============================================
// VERIFICADOR DE SEGURIDAD DE URL
// ============================================

class URLChecker {
    constructor() {
        this.urlInput = document.getElementById('urlInput');
        this.checkBtn = document.getElementById('checkUrl');
        this.resultsDiv = document.getElementById('urlResults');
        this.statusDiv = document.getElementById('urlStatus');
        this.checklist = document.getElementById('urlChecklist');
        
        this.init();
    }
    
    init() {
        this.checkBtn.addEventListener('click', () => {
            this.checkURL();
        });
        
        this.urlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkURL();
            }
        });
    }
    
    checkURL() {
        const url = this.urlInput.value.trim();
        
        if (!url) {
            showToast('Por favor ingresa una URL');
            return;
        }
        
        this.resultsDiv.style.display = 'block';
        
        // Análisis básico
        const checks = {
            hasHttps: url.startsWith('https://'),
            lengthOk: url.length < 100,
            noSuspiciousChars: !/[<>{}|\\^`]/.test(url),
            noIpAddress: !/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(url),
            noExcessiveDashes: (url.match(/-/g) || []).length < 5,
            validTld: /\.(com|org|net|edu|gov|co|io|es)$/i.test(url)
        };
        
        const score = Object.values(checks).filter(v => v).length;
        const isSafe = score >= 5;
        
        // Actualizar estado
        this.statusDiv.className = 'url-status ' + (isSafe ? 'safe' : 'warning');
        this.statusDiv.innerHTML = isSafe ? 
            '<span class="status-icon">✅</span><span>URL parece segura</span>' :
            '<span class="status-icon">⚠️</span><span>URL sospechosa - Ten cuidado</span>';
        
        // Actualizar checklist
        this.checklist.innerHTML = `
            <li class="${checks.hasHttps ? 'check-pass' : 'check-fail'}">
                ${checks.hasHttps ? '✅' : '❌'} Usa HTTPS (conexión segura)
            </li>
            <li class="${checks.lengthOk ? 'check-pass' : 'check-fail'}">
                ${checks.lengthOk ? '✅' : '❌'} Longitud razonable (no excesivamente larga)
            </li>
            <li class="${checks.noSuspiciousChars ? 'check-pass' : 'check-fail'}">
                ${checks.noSuspiciousChars ? '✅' : '❌'} Sin caracteres sospechosos
            </li>
            <li class="${checks.noIpAddress ? 'check-pass' : 'check-fail'}">
                ${checks.noIpAddress ? '✅' : '❌'} No es una dirección IP directa
            </li>
            <li class="${checks.noExcessiveDashes ? 'check-pass' : 'check-fail'}">
                ${checks.noExcessiveDashes ? '✅' : '❌'} No tiene exceso de guiones
            </li>
            <li class="${checks.validTld ? 'check-pass' : 'check-fail'}">
                ${checks.validTld ? '✅' : '❌'} Dominio de nivel superior común
            </li>
        `;
    }
}

// ============================================
// CALCULADORA DE TIEMPO DE HACKEO
// ============================================

class CrackTimeCalculator {
    constructor() {
        this.lengthSlider = document.getElementById('calcLength');
        this.lengthValue = document.getElementById('calcLengthValue');
        this.uppercase = document.getElementById('calcUppercase');
        this.numbers = document.getElementById('calcNumbers');
        this.symbols = document.getElementById('calcSymbols');
        this.calculateBtn = document.getElementById('calculateCrackTime');
        this.resultsDiv = document.getElementById('crackResults');
        this.timeDisplay = document.getElementById('crackTimeDisplay');
        this.explanation = document.getElementById('crackExplanation');
        
        this.init();
    }
    
    init() {
        this.lengthSlider.addEventListener('input', (e) => {
            this.lengthValue.textContent = e.target.value;
        });
        
        this.calculateBtn.addEventListener('click', () => {
            this.calculate();
        });
    }
    
    calculate() {
        const length = parseInt(this.lengthSlider.value);
        let charSet = 26; // lowercase por defecto
        
        if (this.uppercase.checked) charSet += 26;
        if (this.numbers.checked) charSet += 10;
        if (this.symbols.checked) charSet += 32;
        
        const combinations = Math.pow(charSet, length);
        const attemptsPerSecond = 1000000000; // 1 billón por segundo
        const seconds = combinations / attemptsPerSecond;
        
        this.resultsDiv.style.display = 'block';
        
        // Convertir a formato legible
        let timeText = '';
        let colorClass = '';
        
        if (seconds < 1) {
            timeText = 'Instantáneo';
            colorClass = 'danger';
        } else if (seconds < 60) {
            timeText = `${Math.round(seconds)} segundos`;
            colorClass = 'danger';
        } else if (seconds < 3600) {
            timeText = `${Math.round(seconds / 60)} minutos`;
            colorClass = 'danger';
        } else if (seconds < 86400) {
            timeText = `${Math.round(seconds / 3600)} horas`;
            colorClass = 'warning';
        } else if (seconds < 2592000) {
            timeText = `${Math.round(seconds / 86400)} días`;
            colorClass = 'warning';
        } else if (seconds < 31536000) {
            timeText = `${Math.round(seconds / 2592000)} meses`;
            colorClass = 'ok';
        } else if (seconds < 31536000000) {
            timeText = `${Math.round(seconds / 31536000)} años`;
            colorClass = 'safe';
        } else {
            timeText = 'Siglos';
            colorClass = 'safe';
        }
        
        this.timeDisplay.textContent = timeText;
        this.timeDisplay.className = 'crack-time ' + colorClass;
        
        // Explicación
        let advice = '';
        if (seconds < 86400) {
            advice = '⚠️ ¡Muy débil! Esta contraseña se puede hackear en menos de un día. Usa al menos 12 caracteres con mayúsculas, números y símbolos.';
        } else if (seconds < 31536000) {
            advice = '⚠️ Débil. Aunque toma tiempo, aún es vulnerable. Aumenta la longitud y agrega más variedad de caracteres.';
        } else if (seconds < 31536000000) {
            advice = '✅ Buena. Esta contraseña tardaría años en romperse, pero siempre puedes mejorarla con más longitud.';
        } else {
            advice = '🎉 ¡Excelente! Esta contraseña es muy segura y tardaría siglos en romperse. ¡Mantén estas buenas prácticas!';
        }
        
        this.explanation.innerHTML = `
            <p><strong>Combinaciones posibles:</strong> ${combinations.toExponential(2)}</p>
            <p><strong>Conjunto de caracteres:</strong> ${charSet}</p>
            <p class="advice">${advice}</p>
        `;
    }
}

// ============================================
// CHECKLIST DE SEGURIDAD DIGITAL
// ============================================

class SecurityChecklist {
    constructor() {
        this.progressCircle = document.getElementById('checklistProgressCircle');
        this.percentage = document.getElementById('checklistPercentage');
        this.count = document.getElementById('checklistCount');
        this.itemsDiv = document.getElementById('checklistItems');
        this.resetBtn = document.getElementById('resetChecklist');
        
        this.items = [
            '¿Usas contraseñas únicas para cada cuenta importante?',
            '¿Tienes activada la autenticación de dos factores (2FA)?',
            '¿Actualizas regularmente tu sistema operativo y aplicaciones?',
            '¿Usas un gestor de contraseñas confiable?',
            '¿Verificas que los sitios web tengan HTTPS antes de ingresar datos?',
            '¿Evitas usar redes WiFi públicas para transacciones sensibles?',
            '¿Haces copias de seguridad de tus archivos importantes?',
            '¿Revisas los permisos de las apps antes de instalarlas?',
            '¿Desconfías de correos sospechosos y enlaces no solicitados?',
            '¿Tienes instalado y actualizado un antivirus confiable?'
        ];
        
        this.init();
    }
    
    init() {
        this.loadState();
        this.renderItems();
        this.updateProgress();
        
        this.resetBtn.addEventListener('click', () => {
            this.reset();
        });
    }
    
    loadState() {
        const saved = localStorage.getItem('securityChecklist');
        this.checked = saved ? JSON.parse(saved) : new Array(this.items.length).fill(false);
    }
    
    saveState() {
        localStorage.setItem('securityChecklist', JSON.stringify(this.checked));
    }
    
    renderItems() {
        this.itemsDiv.innerHTML = this.items.map((item, index) => `
            <label class="checklist-item ${this.checked[index] ? 'checked' : ''}">
                <input type="checkbox" ${this.checked[index] ? 'checked' : ''} data-index="${index}">
                <span class="checkbox-custom"></span>
                <span class="checklist-text">${item}</span>
            </label>
        `).join('');
        
        // Event listeners
        this.itemsDiv.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.checked[index] = e.target.checked;
                this.saveState();
                this.updateProgress();
                
                // Actualizar clase
                e.target.closest('.checklist-item').classList.toggle('checked', e.target.checked);
            });
        });
    }
    
    updateProgress() {
        const completed = this.checked.filter(v => v).length;
        const total = this.items.length;
        const percent = Math.round((completed / total) * 100);
        
        this.percentage.textContent = percent + '%';
        this.count.textContent = completed;
        
        // Animar círculo
        const circumference = 2 * Math.PI * 35;
        const offset = circumference - (percent / 100) * circumference;
        this.progressCircle.style.strokeDashoffset = offset;
    }
    
    reset() {
        if (confirm('¿Estás seguro de que quieres reiniciar el checklist?')) {
            this.checked = new Array(this.items.length).fill(false);
            this.saveState();
            this.renderItems();
            this.updateProgress();
            showToast('Checklist reiniciado');
        }
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
// SMOOTH SCROLL
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
// ANIMACIONES AL SCROLL
// ============================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar tarjetas
    document.querySelectorAll('.conpes-card, .enlace-card, .herramienta-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// ============================================
// TRACK CLICKS EN ENLACES EXTERNOS
// ============================================

function trackExternalLinks() {
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const url = link.href;
            console.log('External link clicked:', url);
        });
    });
}

// ============================================
// ESTADÍSTICAS DE USO
// ============================================

class UsageStats {
    constructor() {
        this.stats = this.loadStats();
    }
    
    loadStats() {
        const saved = localStorage.getItem('resourcesUsageStats');
        return saved ? JSON.parse(saved) : {
            passwordsGenerated: 0,
            emailsChecked: 0,
            urlsChecked: 0,
            strengthTests: 0
        };
    }
    
    saveStats() {
        localStorage.setItem('resourcesUsageStats', JSON.stringify(this.stats));
    }
    
    increment(key) {
        this.stats[key]++;
        this.saveStats();
    }
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar herramientas
    const passwordGenerator = new PasswordGenerator();
    const passwordTest = new PasswordStrengthTest();
    const emailChecker = new EmailChecker();
    const urlChecker = new URLChecker();
    const crackCalc = new CrackTimeCalculator();
    const securityChecklist = new SecurityChecklist();
    
    // Inicializar estadísticas
    const usageStats = new UsageStats();
    
    // Conectar stats con acciones
    document.getElementById('generatePassword').addEventListener('click', () => {
        usageStats.increment('passwordsGenerated');
    });
    
    document.getElementById('checkEmail').addEventListener('click', () => {
        usageStats.increment('emailsChecked');
    });
    
    document.getElementById('checkUrl').addEventListener('click', () => {
        usageStats.increment('urlsChecked');
    });
    
    document.getElementById('testPasswordInput').addEventListener('input', () => {
        usageStats.increment('strengthTests');
    });
    
    // Inicializar otras funcionalidades
    initSmoothScroll();
    initScrollAnimations();
    trackExternalLinks();
    
    // Scroll suave al inicio
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    console.log('✅ Recursos cargados correctamente');
});