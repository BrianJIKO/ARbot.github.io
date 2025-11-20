// ============================================
// QUIZ RESULTADOS - JAVASCRIPT
// ============================================

// Datos de ejemplo (reemplazar con datos reales del localStorage)
const quizResultsData = {
    quizId: 'seguridad-digital',
    quizName: 'Seguridad Digital',
    totalQuestions: 10,
    correctAnswers: 8,
    percentage: 80,
    questions: [
        {
            question: '¿Qué es la autenticación de dos factores (2FA)?',
            userAnswer: 'Un método que requiere dos formas diferentes de verificar tu identidad',
            correctAnswer: 'Un método que requiere dos formas diferentes de verificar tu identidad',
            isCorrect: true,
            explanation: 'La autenticación de dos factores (2FA) añade una capa extra de seguridad al requerir dos métodos diferentes de verificación.'
        },
        {
            question: '¿Qué debe incluir una contraseña segura?',
            userAnswer: 'Solo letras mayúsculas',
            correctAnswer: 'Combinación de letras, números y símbolos',
            isCorrect: false,
            explanation: 'Una contraseña segura debe combinar letras mayúsculas y minúsculas, números y símbolos especiales.'
        },
        {
            question: '¿Qué es el phishing?',
            userAnswer: 'Un intento de robar información personal mediante engaños',
            correctAnswer: 'Un intento de robar información personal mediante engaños',
            isCorrect: true,
            explanation: 'El phishing es una técnica de fraude donde los atacantes se hacen pasar por entidades confiables.'
        },
        {
            question: '¿Qué hacer si recibes un correo sospechoso?',
            userAnswer: 'Abrirlo y responder',
            correctAnswer: 'No hacer clic en enlaces y reportarlo',
            isCorrect: false,
            explanation: 'Nunca hagas clic en enlaces sospechosos. Repórtalo como spam.'
        },
        {
            question: '¿Qué es un firewall?',
            userAnswer: 'Un sistema que protege tu red de accesos no autorizados',
            correctAnswer: 'Un sistema que protege tu red de accesos no autorizados',
            isCorrect: true,
            explanation: 'Un firewall actúa como una barrera de seguridad entre tu computadora y el internet.'
        },
        {
            question: '¿Es seguro usar WiFi público sin VPN?',
            userAnswer: 'Sí, es completamente seguro',
            correctAnswer: 'No, puede exponer tus datos',
            isCorrect: false,
            explanation: 'Las redes WiFi públicas pueden ser interceptadas fácilmente. Usa una VPN.'
        },
        {
            question: '¿Qué es el ransomware?',
            userAnswer: 'Un malware que cifra tus archivos y pide rescate',
            correctAnswer: 'Un malware que cifra tus archivos y pide rescate',
            isCorrect: true,
            explanation: 'El ransomware es un tipo de malware que cifra archivos y exige pago.'
        },
        {
            question: '¿Con qué frecuencia actualizar software?',
            userAnswer: 'Tan pronto como haya actualizaciones',
            correctAnswer: 'Tan pronto como haya actualizaciones',
            isCorrect: true,
            explanation: 'Las actualizaciones incluyen parches de seguridad críticos.'
        },
        {
            question: '¿Qué es la verificación en dos pasos?',
            userAnswer: 'Un método adicional de seguridad',
            correctAnswer: 'Un método adicional de seguridad',
            isCorrect: true,
            explanation: 'La verificación en dos pasos requiere un segundo factor de autenticación.'
        },
        {
            question: '¿Qué hacer si tu cuenta fue hackeada?',
            userAnswer: 'Cambiar la contraseña inmediatamente',
            correctAnswer: 'Cambiar la contraseña inmediatamente',
            isCorrect: true,
            explanation: 'Cambia tu contraseña inmediatamente y activa 2FA.'
        }
    ]
};

// Recomendaciones según rendimiento
const recommendations = {
    lessons: {
        low: [
            'Fundamentos de Ciberseguridad',
            'Contraseñas Seguras 101',
            'Identificación de Phishing'
        ],
        medium: [
            'Protección Avanzada de Datos',
            'Autenticación Multifactor',
            'Navegación Segura en Internet'
        ],
        high: [
            'Criptografía Aplicada',
            'Gestión de Incidentes de Seguridad',
            'Arquitectura de Seguridad'
        ]
    },
    nextQuiz: {
        low: 'Fundamentos de Seguridad Digital (Básico)',
        medium: 'Transformación Digital (Intermedio)',
        high: 'Protección Avanzada de Datos (Avanzado)'
    }
};

// ============================================
// CLASE PRINCIPAL
// ============================================
class QuizResults {
    constructor() {
        this.loadData();
        this.calculateStats();
        this.init();
    }
    
    loadData() {
        // Intentar cargar desde localStorage
        const savedResults = localStorage.getItem('currentQuizResults');
        if (savedResults) {
            const data = JSON.parse(savedResults);
            this.quizId = data.quizId;
            this.quizName = data.quizName;
            this.totalQuestions = data.totalQuestions;
            this.questions = data.questions;
            this.correctAnswers = data.questions.filter(q => q.isCorrect).length;
        } else {
            // Usar datos de ejemplo
            this.quizId = quizResultsData.quizId;
            this.quizName = quizResultsData.quizName;
            this.totalQuestions = quizResultsData.totalQuestions;
            this.questions = quizResultsData.questions;
            this.correctAnswers = quizResultsData.correctAnswers;
        }
    }
    
    calculateStats() {
        this.percentage = Math.round((this.correctAnswers / this.totalQuestions) * 100);
        this.performanceLevel = this.getPerformanceLevel();
    }
    
    getPerformanceLevel() {
        if (this.percentage <= 40) return 'low';
        if (this.percentage <= 70) return 'medium';
        return 'high';
    }
    
    init() {
        this.renderQuizName();
        this.renderScore();
        this.renderAnswers();
        this.renderRecommendations();
        this.setupEventListeners();
        this.animateProgressBar();
        this.saveResult();
    }
    
    // ============================================
    // RENDER METHODS
    // ============================================
    
    renderQuizName() {
        document.getElementById('quizName').textContent = this.quizName;
    }
    
    renderScore() {
        const emojiData = this.getEmojiAndMessage();
        
        document.getElementById('scoreEmoji').textContent = emojiData.emoji;
        document.getElementById('scoreMessage').textContent = emojiData.message;
        document.getElementById('scoreNumber').textContent = `${this.correctAnswers} de ${this.totalQuestions}`;
        document.getElementById('scorePercentage').textContent = `${this.percentage}%`;
        
        // Insignia
        if (this.percentage >= 70) {
            document.getElementById('badgeEarned').style.display = 'inline-flex';
        }
    }
    
    getEmojiAndMessage() {
        if (this.percentage <= 40) {
            return { emoji: '😞', message: 'Necesitas repasar' };
        } else if (this.percentage <= 70) {
            return { emoji: '😊', message: '¡Buen intento!' };
        } else {
            return { emoji: '🎉', message: '¡Excelente!' };
        }
    }
    
    animateProgressBar() {
        setTimeout(() => {
            document.getElementById('scoreProgressFill').style.width = `${this.percentage}%`;
        }, 300);
    }
    
    renderAnswers() {
        const answersList = document.getElementById('answersList');
        answersList.innerHTML = '';
        
        this.questions.forEach((q, index) => {
            const answerItem = this.createAnswerItem(q, index + 1);
            answersList.appendChild(answerItem);
        });
    }
    
    createAnswerItem(question, number) {
        const item = document.createElement('div');
        item.className = `answer-item ${question.isCorrect ? 'correct' : 'incorrect'}`;
        
        item.innerHTML = `
            <div class="answer-header">
                <span class="question-number">Pregunta ${number}</span>
                <div class="answer-status ${question.isCorrect ? 'correct' : 'incorrect'}">
                    <span class="status-icon">${question.isCorrect ? '✓' : '✗'}</span>
                    <span>${question.isCorrect ? 'Correcta' : 'Incorrecta'}</span>
                </div>
            </div>
            
            <p class="question-text">${question.question}</p>
            
            <div class="answer-options">
                ${!question.isCorrect ? `
                    <div class="option-row user-answer">
                        <span class="option-label">Opción que elegiste:</span>
                        <span class="option-text">${question.userAnswer}</span>
                    </div>
                ` : ''}
                
                <div class="option-row correct-answer">
                    <span class="option-label">Respuesta correcta:</span>
                    <span class="option-text">${question.correctAnswer}</span>
                </div>
            </div>
            
            <div class="explanation-section">
                <button class="explanation-toggle" onclick="toggleExplanation(this)">
                    <span class="toggle-icon">▼</span>
                    <span>Ver explicación</span>
                </button>
                <div class="explanation-content">
                    <p class="explanation-text">${question.explanation}</p>
                </div>
            </div>
        `;
        
        return item;
    }
    
    renderRecommendations() {
        // Lecciones
        const lessonsList = document.getElementById('lessonsList');
        const lessons = recommendations.lessons[this.performanceLevel];
        lessonsList.innerHTML = lessons.map(lesson => `<li>${lesson}</li>`).join('');
        
        // Siguiente Quiz
        const nextQuizInfo = document.getElementById('nextQuizInfo');
        const nextQuiz = recommendations.nextQuiz[this.performanceLevel];
        const difficulty = nextQuiz.includes('Básico') ? 'Básico' : 
                          nextQuiz.includes('Intermedio') ? 'Intermedio' : 'Avanzado';
        
        nextQuizInfo.innerHTML = `
            <div class="next-quiz-name">${nextQuiz}</div>
            <div class="next-quiz-details">
                Nivel: ${difficulty} • 10 preguntas
            </div>
        `;
    }
    
    // ============================================
    // EVENT LISTENERS
    // ============================================
    
    setupEventListeners() {
        // Reintentar
        document.getElementById('btnRetry').addEventListener('click', () => {
            if (confirm('¿Estás seguro de que quieres reintentar el quiz?')) {
                this.retryQuiz();
            }
        });
        
        // Compartir
        document.getElementById('btnShare').addEventListener('click', () => {
            this.shareResults();
        });
    }
    
    retryQuiz() {
        window.location.href = `quiz-seguridad-digital.html?retry=true`;
    }
    
    shareResults() {
        const shareText = `¡Obtuve ${this.percentage}% en el quiz "${this.quizName}" de AR Bot! 🎉`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Mis Resultados - AR Bot',
                text: shareText,
                url: window.location.href
            }).then(() => {
                this.showToast('¡Resultado compartido!');
            }).catch(() => {
                this.copyToClipboard(shareText);
            });
        } else {
            this.copyToClipboard(shareText);
        }
    }
    
    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            this.showToast('¡Texto copiado al portapapeles!');
        }).catch(() => {
            this.showToast('No se pudo copiar el texto');
        });
    }
    
    showToast(message) {
        const toast = document.getElementById('toast');
        toast.querySelector('.toast-message').textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
    
    // ============================================
    // GUARDAR RESULTADO
    // ============================================
    
    saveResult() {
        const result = {
            quizId: this.quizId,
            quizName: this.quizName,
            score: this.percentage,
            correctAnswers: this.correctAnswers,
            totalQuestions: this.totalQuestions,
            date: new Date().toISOString(),
            badgeEarned: this.percentage >= 70
        };
        
        // Guardar en historial
        let history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
        history.push(result);
        localStorage.setItem('quizHistory', JSON.stringify(history));
        
        // Actualizar progreso del quiz
        let quizzesData = JSON.parse(localStorage.getItem('quizzesData') || '{}');
        if (!quizzesData[this.quizId]) {
            quizzesData[this.quizId] = {};
        }
        
        quizzesData[this.quizId].completed = true;
        quizzesData[this.quizId].score = this.percentage;
        quizzesData[this.quizId].attempts = (quizzesData[this.quizId].attempts || 0) + 1;
        quizzesData[this.quizId].bestScore = Math.max(
            quizzesData[this.quizId].bestScore || 0,
            this.percentage
        );
        
        localStorage.setItem('quizzesData', JSON.stringify(quizzesData));
    }
}

// ============================================
// FUNCIONES GLOBALES
// ============================================

function toggleExplanation(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('.toggle-icon');
    const text = button.querySelector('span:last-child');
    
    content.classList.toggle('show');
    icon.classList.toggle('open');
    text.textContent = content.classList.contains('show') ? 
        'Ocultar explicación' : 'Ver explicación';
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    new QuizResults();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});