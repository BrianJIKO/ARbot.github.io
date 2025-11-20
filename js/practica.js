// ============================================
// GESTIÓN DE PROGRESO DE QUIZZES
// ============================================

// Estructura de datos para los quizzes
const quizzesData = {
    'transformacion-digital': {
        totalQuestions: 10,
        completed: false,
        score: 0,
        attempts: 0
    },
    'seguridad-digital': {
        totalQuestions: 10,
        completed: false,
        score: 0,
        attempts: 0
    },
    'proteccion-datos': {
        totalQuestions: 8,
        completed: false,
        score: 0,
        attempts: 0
    }
};

// ============================================
// CARGAR PROGRESO GUARDADO
// ============================================
function loadQuizProgress() {
    const savedProgress = localStorage.getItem('quizzesProgress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        // Actualizar datos con progreso guardado
        Object.keys(progress).forEach(quizId => {
            if (quizzesData[quizId]) {
                quizzesData[quizId] = { ...quizzesData[quizId], ...progress[quizId] };
            }
        });
    }
}

// ============================================
// GUARDAR PROGRESO
// ============================================
function saveQuizProgress() {
    localStorage.setItem('quizzesProgress', JSON.stringify(quizzesData));
}

// ============================================
// ACTUALIZAR UI DE TARJETAS DE QUIZ
// ============================================
function updateQuizCards() {
    const quizCards = document.querySelectorAll('.quiz-card');
    
    quizCards.forEach(card => {
        const quizId = card.getAttribute('data-quiz-id');
        const quizData = quizzesData[quizId];
        
        if (!quizData) return;
        
        // Elementos de la tarjeta
        const progressFill = card.querySelector('.progress-fill');
        const progressText = card.querySelector('.progress-text');
        const quizBtn = card.querySelector('.quiz-btn');
        
        // Calcular progreso
        let progressPercent = 0;
        let statusText = 'No iniciado';
        let buttonText = 'Comenzar Quiz';
        
        if (quizData.completed) {
            progressPercent = 100;
            statusText = `Completado ✓ - ${quizData.score}% de aciertos`;
            buttonText = 'Reintentar';
            card.setAttribute('data-status', 'completed');
        } else if (quizData.attempts > 0) {
            progressPercent = 50;
            statusText = 'En progreso';
            buttonText = 'Continuar';
            card.setAttribute('data-status', 'in-progress');
        }
        
        // Actualizar UI
        if (progressFill) {
            progressFill.style.width = progressPercent + '%';
        }
        if (progressText) {
            progressText.textContent = statusText;
        }
        if (quizBtn) {
            quizBtn.textContent = buttonText;
        }
    });
}

// ============================================
// ACTUALIZAR ESTADÍSTICAS DEL USUARIO
// ============================================
function updateUserStats() {
    let completedQuizzes = 0;
    let totalScore = 0;
    let badgesEarned = 0;
    
    Object.values(quizzesData).forEach(quiz => {
        if (quiz.completed) {
            completedQuizzes++;
            totalScore += quiz.score;
            
            // Ganar insignia si el puntaje es mayor a 70%
            if (quiz.score >= 70) {
                badgesEarned++;
            }
        }
    });
    
    // Calcular promedio
    const averageScore = completedQuizzes > 0 
        ? Math.round(totalScore / completedQuizzes) 
        : 0;
    
    // Actualizar UI
    const quizzesCompletedEl = document.getElementById('quizzesCompleted');
    const totalScoreEl = document.getElementById('totalScore');
    const badgesEarnedEl = document.getElementById('badgesEarned');
    
    if (quizzesCompletedEl) {
        animateNumber(quizzesCompletedEl, completedQuizzes);
    }
    if (totalScoreEl) {
        animateNumber(totalScoreEl, averageScore, '%');
    }
    if (badgesEarnedEl) {
        animateNumber(badgesEarnedEl, badgesEarned);
    }
}

// ============================================
// ANIMAR NÚMEROS
// ============================================
function animateNumber(element, target, suffix = '') {
    const duration = 1000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

// ============================================
// RESETEAR TODO EL PROGRESO (para testing)
// ============================================
function resetAllProgress() {
    if (confirm('¿Estás seguro de que quieres resetear todo tu progreso?')) {
        localStorage.removeItem('quizzesProgress');
        Object.keys(quizzesData).forEach(quizId => {
            quizzesData[quizId] = {
                totalQuestions: quizzesData[quizId].totalQuestions,
                completed: false,
                score: 0,
                attempts: 0
            };
        });
        updateQuizCards();
        updateUserStats();
        console.log('✅ Progreso reseteado');
    }
}

// ============================================
// FUNCIONES PÚBLICAS PARA USO EN QUIZZES
// ============================================
window.quizManager = {
    // Marcar quiz como completado
    completeQuiz: function(quizId, score) {
        if (quizzesData[quizId]) {
            quizzesData[quizId].completed = true;
            quizzesData[quizId].score = score;
            quizzesData[quizId].attempts++;
            saveQuizProgress();
            console.log(`✅ Quiz ${quizId} completado con ${score}%`);
        }
    },
    
    // Obtener datos de un quiz
    getQuizData: function(quizId) {
        return quizzesData[quizId] || null;
    },
    
    // Resetear un quiz específico
    resetQuiz: function(quizId) {
        if (quizzesData[quizId]) {
            quizzesData[quizId].completed = false;
            quizzesData[quizId].score = 0;
            quizzesData[quizId].attempts = 0;
            saveQuizProgress();
        }
    }
};

// ============================================
// ANIMACIÓN DE ENTRADA PARA TARJETAS
// ============================================
function animateQuizCards() {
    const cards = document.querySelectorAll('.quiz-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
}

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎮 Página de Practica cargada');
    
    // Cargar progreso guardado
    loadQuizProgress();
    
    // Actualizar UI
    updateQuizCards();
    updateUserStats();
    
    // Animaciones
    animateQuizCards();
    
    // Agregar botón de reset en consola (para desarrollo)
    console.log('💡 Usa resetAllProgress() en la consola para resetear tu progreso');
});

// ============================================
// DATOS DE EJEMPLO (para testing - remover en producción)
// ============================================
// Descomentar estas líneas para ver cómo se ve con datos de ejemplo:
/*
quizzesData['transformacion-digital'].completed = true;
quizzesData['transformacion-digital'].score = 85;
quizzesData['transformacion-digital'].attempts = 1;

quizzesData['seguridad-digital'].attempts = 1;
saveQuizProgress();
*/