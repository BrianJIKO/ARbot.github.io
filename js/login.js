// ============================================
// SISTEMA DE AUTENTICACIÓN - AR BOT
// ============================================

// Clase principal de Autenticación
class AuthSystem {
    constructor() {
        this.currentPage = this.detectPage();
        this.init();
    }
    
    // Detectar en qué página estamos
    detectPage() {
        const path = window.location.pathname;
        if (path.includes('login.html')) return 'login';
        if (path.includes('registro.html')) return 'register';
        if (path.includes('recuperar-password.html')) return 'recover';
        return 'other';
    }
    
    // Inicializar
    init() {
        if (this.currentPage === 'login') {
            this.initLogin();
        } else if (this.currentPage === 'register') {
            this.initRegister();
        } else if (this.currentPage === 'recover') {
            this.initRecover();
        }
        
        // Inicializar funcionalidades comunes
        this.initPasswordToggle();
        this.checkAuth();
    }
    
    // ==================== LOGIN ==================== //
    initLogin() {
        const form = document.getElementById('loginForm');
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });
    }
    
    handleLogin() {
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;
        
        // Validaciones
        if (!this.validateEmail(email)) {
            this.showError('emailError', 'Por favor ingresa un email válido');
            return;
        }
        
        if (password.length < 6) {
            this.showError('passwordError', 'La contraseña debe tener al menos 6 caracteres');
            return;
        }
        
        // Limpiar errores
        this.clearErrors();
        
        // Obtener usuarios registrados
        const users = this.getUsers();
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Login exitoso
            this.loginUser(user, rememberMe);
            this.showMessage('¡Inicio de sesión exitoso! Redirigiendo...', 'success');
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            // Credenciales incorrectas
            this.showMessage('Email o contraseña incorrectos', 'error');
        }
    }
    
    // ==================== REGISTRO ==================== //
    initRegister() {
        const form = document.getElementById('registerForm');
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegister();
        });
        
        // Password strength indicator
        const passwordInput = document.getElementById('password');
        if (passwordInput) {
            passwordInput.addEventListener('input', (e) => {
                this.updatePasswordStrength(e.target.value);
            });
        }
    }
    
    handleRegister() {
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const acceptTerms = document.getElementById('acceptTerms').checked;
        
        // Limpiar errores previos
        this.clearErrors();
        
        let hasErrors = false;
        
        // Validar nombre
        if (fullName.length < 3) {
            this.showError('fullNameError', 'El nombre debe tener al menos 3 caracteres');
            hasErrors = true;
        }
        
        // Validar email
        if (!this.validateEmail(email)) {
            this.showError('emailError', 'Por favor ingresa un email válido');
            hasErrors = true;
        }
        
        // Validar contraseña
        if (password.length < 8) {
            this.showError('passwordError', 'La contraseña debe tener al menos 8 caracteres');
            hasErrors = true;
        }
        
        // Validar confirmación de contraseña
        if (password !== confirmPassword) {
            this.showError('confirmPasswordError', 'Las contraseñas no coinciden');
            hasErrors = true;
        }
        
        // Validar términos
        if (!acceptTerms) {
            this.showError('termsError', 'Debes aceptar los términos y condiciones');
            hasErrors = true;
        }
        
        if (hasErrors) return;
        
        // Verificar si el usuario ya existe
        const users = this.getUsers();
        const userExists = users.some(u => u.email === email);
        
        if (userExists) {
            this.showMessage('Este email ya está registrado', 'error');
            return;
        }
        
        // Crear nuevo usuario
        const newUser = {
            id: Date.now(),
            fullName,
            email,
            password,
            createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('arbot_users', JSON.stringify(users));
        
        // Mostrar mensaje de éxito
        this.showMessage('¡Cuenta creada exitosamente! Redirigiendo...', 'success');
        
        // Auto-login
        this.loginUser(newUser, false);
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }
    
    // ==================== RECUPERAR PASSWORD ==================== //
    initRecover() {
        const form = document.getElementById('recoverForm');
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRecover();
        });
    }
    
    handleRecover() {
        const email = document.getElementById('email').value.trim();
        
        // Limpiar errores
        this.clearErrors();
        
        // Validar email
        if (!this.validateEmail(email)) {
            this.showError('emailError', 'Por favor ingresa un email válido');
            return;
        }
        
        // Verificar si el usuario existe
        const users = this.getUsers();
        const userExists = users.some(u => u.email === email);
        
        if (userExists) {
            // Simular envío de correo
            this.showMessage(
                '¡Instrucciones enviadas! Revisa tu correo electrónico para restablecer tu contraseña.',
                'success'
            );
            
            // En una app real, aquí se enviaría el email
            console.log('Recuperación de contraseña solicitada para:', email);
        } else {
            // Por seguridad, mostramos el mismo mensaje aunque el usuario no exista
            this.showMessage(
                '¡Instrucciones enviadas! Revisa tu correo electrónico para restablecer tu contraseña.',
                'success'
            );
        }
    }
    
    // ==================== UTILIDADES ==================== //
    
    // Toggle password visibility
    initPasswordToggle() {
        const toggleButtons = document.querySelectorAll('.toggle-password');
        
        toggleButtons.forEach(button => {
            button.addEventListener('click', () => {
                const input = button.previousElementSibling;
                const icon = button.querySelector('.eye-icon');
                
                if (input.type === 'password') {
                    input.type = 'text';
                    icon.textContent = '🙈';
                } else {
                    input.type = 'password';
                    icon.textContent = '👁️';
                }
            });
        });
    }
    
    // Password strength indicator
    updatePasswordStrength(password) {
        const strengthBar = document.getElementById('strengthBar');
        const strengthText = document.getElementById('strengthText');
        
        if (!strengthBar || !strengthText) return;
        
        let strength = 0;
        
        // Criterios de fuerza
        if (password.length >= 8) strength += 1;
        if (password.length >= 12) strength += 1;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
        
        // Actualizar barra
        strengthBar.className = 'strength-bar';
        strengthText.className = 'strength-text';
        
        if (strength <= 2) {
            strengthBar.classList.add('weak');
            strengthText.classList.add('weak');
            strengthText.textContent = 'Contraseña débil';
        } else if (strength <= 4) {
            strengthBar.classList.add('medium');
            strengthText.classList.add('medium');
            strengthText.textContent = 'Contraseña media';
        } else {
            strengthBar.classList.add('strong');
            strengthText.classList.add('strong');
            strengthText.textContent = 'Contraseña fuerte';
        }
    }
    
    // Validar email
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Mostrar error en campo
    showError(errorId, message) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('visible');
            
            // Añadir borde rojo al input
            const input = errorElement.previousElementSibling;
            if (input && input.classList.contains('form-input')) {
                input.style.borderColor = '#ef4444';
            }
        }
    }
    
    // Limpiar todos los errores
    clearErrors() {
        const errors = document.querySelectorAll('.form-error');
        errors.forEach(error => {
            error.textContent = '';
            error.classList.remove('visible');
        });
        
        const inputs = document.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.style.borderColor = '#e5e7eb';
        });
    }
    
    // Mostrar mensaje general
    showMessage(message, type = 'success') {
        const messageElement = document.getElementById('authMessage');
        if (!messageElement) return;
        
        messageElement.className = `auth-message ${type}`;
        messageElement.textContent = message;
        messageElement.style.display = 'flex';
        
        // Auto-ocultar después de 5 segundos
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 5000);
    }
    
    // ==================== GESTIÓN DE USUARIOS ==================== //
    
    // Obtener usuarios del localStorage
    getUsers() {
        const users = localStorage.getItem('arbot_users');
        return users ? JSON.parse(users) : [];
    }
    
    // Loguear usuario
    loginUser(user, rememberMe) {
        const userData = {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            loggedAt: new Date().toISOString()
        };
        
        // Guardar sesión
        if (rememberMe) {
            localStorage.setItem('arbot_user', JSON.stringify(userData));
        } else {
            sessionStorage.setItem('arbot_user', JSON.stringify(userData));
        }
    }
    
    // Verificar si hay usuario logueado
    checkAuth() {
        const userLocal = localStorage.getItem('arbot_user');
        const userSession = sessionStorage.getItem('arbot_user');
        
        if (userLocal || userSession) {
            // Usuario logueado
            const user = JSON.parse(userLocal || userSession);
            this.updateNavbar(user);
        }
    }
    
    // Actualizar navbar con usuario logueado
    updateNavbar(user) {
        // Esta función se puede expandir para mostrar el nombre del usuario en el navbar
        console.log('Usuario logueado:', user.fullName);
    }
    
    // Cerrar sesión
    logout() {
        localStorage.removeItem('arbot_user');
        sessionStorage.removeItem('arbot_user');
        window.location.href = 'index.html';
    }
}

// ============================================
// INICIALIZAR SISTEMA DE AUTENTICACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    new AuthSystem();
});

// ============================================
// FUNCIÓN GLOBAL PARA LOGOUT
// ============================================
function logout() {
    const auth = new AuthSystem();
    auth.logout();
}