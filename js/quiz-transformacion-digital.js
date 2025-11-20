// ============================================
// DATOS DEL QUIZ - Transformación Digital
// ============================================
const quizData = {
    id: 'transformacion-digital',
    title: 'Transformación Digital',
    questions: [
        {
            id: 1,
            question: '¿Qué es la transformación digital según el CONPES 3975?',
            options: [
                'A. Tener un celular inteligente y usarlo para redes sociales',
                'B. Usar tecnología para generar valor social y económico de forma estratégica',
                'C. Trabajar desde casa usando computadora',
                'D. Comprar productos por internet en lugar de tiendas físicas'
            ],
            correct: 1, // índice 1 = opción B
            explanation: 'La transformación digital es el uso estratégico de tecnologías digitales para generar valor social y económico, mejorando la productividad, la innovación y la calidad de vida.',
            hint: 'No es solo tener o usar tecnología, sino aprovecharla estratégicamente para crear valor.'
        },
        {
            id: 2,
            question: '¿Cuál NO es uno de los 4 pilares (habilitadores) de la política de IA en Colombia según el CONPES 3975?',
            options: [
                'A. Ética y Gobernanza',
                'B. Datos e Infraestructura',
                'C. Redes Sociales y Marketing',
                'D. Capacidades y Talento Digital'
            ],
            correct: 2,
            explanation: 'Los 4 pilares son: Ética y Gobernanza, Datos e Infraestructura, Investigación e Innovación (I+D+i), y Capacidades y Talento Digital. Las redes sociales son herramientas, pero no un pilar oficial.',
            hint: 'Los pilares se enfocan en aspectos fundamentales de desarrollo tecnológico, no en herramientas específicas de comunicación.'
        },
        {
            id: 3,
            question: '¿Qué significa usar la Inteligencia Artificial de forma "ética" según el CONPES 3975?',
            options: [
                'A. Usarla exclusivamente para generar ganancias económicas sin restricciones',
                'B. Respetar derechos humanos, evitar discriminación, ser transparente y proteger privacidad',
                'C. Permitir que la IA tome todas las decisiones sin supervisión humana',
                'D. Restringir el uso de IA solo a ingenieros y expertos en tecnología'
            ],
            correct: 1,
            explanation: 'Usar IA éticamente significa respetar derechos humanos, no discriminar, ser transparente en las decisiones, proteger la privacidad y garantizar que la tecnología sirva al bienestar de las personas.',
            hint: 'La ética en IA se centra en el respeto a las personas y sus derechos fundamentales.'
        },
        {
            id: 4,
            question: 'Según el CONPES 3975, ¿quiénes se benefician de la transformación digital?',
            options: [
                'A. Solo las empresas grandes y multinacionales',
                'B. Únicamente personas con educación universitaria en tecnología',
                'C. Todos los ciudadanos, empresas y el Estado sin importar su ubicación o condición',
                'D. Solo quienes viven en las principales ciudades del país'
            ],
            correct: 2,
            explanation: 'La transformación digital busca ser inclusiva, beneficiando a todos los colombianos sin importar su ubicación, educación o condición económica. Es una política para toda la sociedad.',
            hint: 'El objetivo es la inclusión digital para todos, no solo para grupos privilegiados.'
        },
        {
            id: 5,
            question: '¿Cuál es el objetivo principal del CONPES 3975 para Colombia?',
            options: [
                'A. Que todos los ciudadanos compren el último modelo de teléfono inteligente',
                'B. Impulsar productividad, innovación y desarrollo social y económico mediante tecnología digital e IA',
                'C. Eliminar todos los empleos tradicionales y reemplazarlos con robots',
                'D. Crear más empresas tecnológicas extranjeras en el país'
            ],
            correct: 1,
            explanation: 'El objetivo central es aprovechar las tecnologías digitales e IA para impulsar la productividad, innovación y desarrollo social y económico de Colombia, mejorando la calidad de vida de todos.',
            hint: 'Se trata de usar la tecnología como motor de desarrollo, no solo de consumirla.'
        },
        {
            id: 6,
            question: '¿Cuál es uno de los principales problemas que el CONPES 3975 busca resolver en Colombia?',
            options: [
                'A. La falta de acceso equitativo a internet y habilidades digitales en la población',
                'B. El exceso de profesionales en tecnología sin empleo',
                'C. Que hay demasiada innovación tecnológica en el país',
                'D. La sobrepoblación de empresas tecnológicas'
            ],
            correct: 0,
            explanation: 'Uno de los problemas centrales es la brecha digital: solo 47% de hogares tenían internet en 2019 y muchas personas carecían de habilidades digitales básicas.',
            hint: 'El problema está relacionado con el acceso y las capacidades, no con el exceso.'
        },
        {
            id: 7,
            question: '¿Qué ejemplo de la vida cotidiana representa mejor la transformación digital?',
            options: [
                'A. Usar una calculadora para hacer operaciones matemáticas',
                'B. Pagar servicios públicos desde tu celular en lugar de ir a un punto físico',
                'C. Ver televisión en un televisor moderno',
                'D. Escuchar música en un reproductor digital'
            ],
            correct: 1,
            explanation: 'La transformación digital implica cambiar procesos completos usando tecnología. Pagar servicios desde el celular elimina desplazamientos, filas y tiempo, mejorando significativamente la experiencia.',
            hint: 'Busca el ejemplo donde la tecnología transforma completamente cómo se hace algo, no solo lo digitaliza.'
        },
        {
            id: 8,
            question: 'Según el CONPES 3975, ¿qué son los "habilitadores" en el contexto de transformación digital?',
            options: [
                'A. Personas que instalan internet en las casas',
                'B. Aplicaciones móviles populares como WhatsApp',
                'C. Las condiciones necesarias para que la transformación digital sea exitosa (infraestructura, talento, datos, etc.)',
                'D. Dispositivos electrónicos como celulares y computadoras'
            ],
            correct: 2,
            explanation: 'Los habilitadores son las 8 condiciones fundamentales que deben existir para lograr la transformación digital: infraestructura, marco legal, talento, confianza, datos, innovación, Estado digital y ética en IA.',
            hint: 'Son las bases o pilares que sostienen todo el proceso de transformación digital.'
        },
        {
            id: 9,
            question: '¿Qué papel juega la educación en la política de transformación digital del CONPES 3975?',
            options: [
                'A. La educación debe ser solo presencial, sin componentes digitales',
                'B. Es fundamental formar personas con competencias digitales desde el colegio hasta educación avanzada',
                'C. La educación no es relevante para la transformación digital',
                'D. Solo importa la educación universitaria en ingeniería'
            ],
            correct: 1,
            explanation: 'La formación de talento digital es uno de los 8 habilitadores clave. Se necesita educación desde el nivel básico hasta formación avanzada para crear el capital humano que impulse la transformación.',
            hint: 'Sin personas capacitadas en todos los niveles, la tecnología no puede ser aprovechada efectivamente.'
        },
        {
            id: 10,
            question: '¿Cuál es la visión de Colombia según el CONPES 3975 respecto a la Inteligencia Artificial?',
            options: [
                'A. Ser solo consumidores de tecnología IA desarrollada en otros países',
                'B. Prohibir el uso de IA para proteger empleos tradicionales',
                'C. Convertirse en líder regional en desarrollo y uso ético de IA para 2030',
                'D. Usar IA sin regulaciones ni principios éticos'
            ],
            correct: 2,
            explanation: 'El CONPES 3975 (actualizado por CONPES 4144 en 2025) busca que Colombia sea líder regional en IA, desarrollando capacidades propias, usando la IA de forma ética y generando soluciones para problemas locales.',
            hint: 'La visión es ambiciosa y ética: no solo usar IA, sino ser creadores y líderes con responsabilidad.'
        }
    ]
};

// ============================================
// ESTADO DEL QUIZ - SIEMPRE RESETEAR
// ============================================
let currentQuestionIndex = 0;
let userAnswers = [];
let correctCount = 0;
let startTime = Date.now();

// FUNCIÓN PARA RESETEAR COMPLETAMENTE EL ESTADO
function resetQuizState() {
    currentQuestionIndex = 0;
    userAnswers = [];
    correctCount = 0;
    startTime = Date.now();
    console.log('🔄 Estado del quiz reseteado');
}

// ============================================
// ELEMENTOS DEL DOM
// ============================================
const elements = {
    currentQuestion: document.getElementById('currentQuestion'),
    totalQuestions: document.getElementById('totalQuestions'),
    progressPercentage: document.getElementById('progressPercentage'),
    progressFill: document.getElementById('progressFill'),
    questionNumber: document.getElementById('questionNumber'),
    questionText: document.getElementById('questionText'),
    answerOptions: document.getElementById('answerOptions'),
    feedbackBox: document.getElementById('feedbackBox'),
    feedbackIcon: document.getElementById('feedbackIcon'),
    feedbackTitle: document.getElementById('feedbackTitle'),
    feedbackExplanation: document.getElementById('feedbackExplanation'),
    feedbackHint: document.getElementById('feedbackHint'),
    btnNext: document.getElementById('btnNext'),
    btnExit: document.getElementById('btnExit'),
    resultsModal: document.getElementById('resultsModal'),
    exitModal: document.getElementById('exitModal'),
    btnCancelExit: document.getElementById('btnCancelExit'),
    btnRetry: document.getElementById('btnRetry')
};

// ============================================
// INICIALIZAR QUIZ
// ============================================
function initQuiz() {
    // CRÍTICO: Resetear estado al inicio
    resetQuizState();
    
    elements.totalQuestions.textContent = quizData.questions.length;
    loadQuestion();
    setupEventListeners();
    
    console.log('✅ Quiz inicializado correctamente');
}

// ============================================
// CARGAR PREGUNTA
// ============================================
function loadQuestion() {
    const question = quizData.questions[currentQuestionIndex];
    
    // Actualizar progreso
    const progress = ((currentQuestionIndex + 1) / quizData.questions.length) * 100;
    elements.currentQuestion.textContent = currentQuestionIndex + 1;
    elements.progressPercentage.textContent = Math.round(progress) + '%';
    elements.progressFill.style.width = progress + '%';
    
    // Actualizar pregunta
    elements.questionNumber.textContent = `Pregunta ${currentQuestionIndex + 1}`;
    elements.questionText.textContent = question.question;
    
    // Limpiar opciones anteriores
    elements.answerOptions.innerHTML = '';
    elements.feedbackBox.style.display = 'none';
    elements.btnNext.disabled = true;
    
    // Crear opciones
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'answer-option';
        optionDiv.innerHTML = `
            <input type="radio" name="answer" id="option${index}" value="${index}">
            <span class="radio-custom"></span>
            <label for="option${index}" class="answer-text">${option}</label>
        `;
        
        // Event listener para seleccionar
        optionDiv.addEventListener('click', () => selectAnswer(index));
        
        elements.answerOptions.appendChild(optionDiv);
    });
}

// ============================================
// SELECCIONAR RESPUESTA
// ============================================
function selectAnswer(selectedIndex) {
    const question = quizData.questions[currentQuestionIndex];
    const options = document.querySelectorAll('.answer-option');
    
    // Marcar como seleccionada
    options.forEach((opt, idx) => {
        opt.classList.remove('selected');
        if (idx === selectedIndex) {
            opt.classList.add('selected');
            opt.querySelector('input[type="radio"]').checked = true;
        }
    });
    
    // Verificar respuesta
    checkAnswer(selectedIndex);
}

// ============================================
// VERIFICAR RESPUESTA
// ============================================
function checkAnswer(selectedIndex) {
    const question = quizData.questions[currentQuestionIndex];
    const isCorrect = selectedIndex === question.correct;
    const options = document.querySelectorAll('.answer-option');
    
    // Deshabilitar todas las opciones
    options.forEach((opt, idx) => {
        opt.classList.add('disabled');
        if (idx === question.correct) {
            opt.classList.add('correct');
        } else if (idx === selectedIndex && !isCorrect) {
            opt.classList.add('incorrect');
        }
    });
    
    // Guardar respuesta
    userAnswers[currentQuestionIndex] = {
        selected: selectedIndex,
        correct: question.correct,
        isCorrect: isCorrect
    };
    
    if (isCorrect) {
        correctCount++;
    }
    
    // Mostrar feedback
    showFeedback(isCorrect, question);
    
    // Habilitar botón siguiente
    elements.btnNext.disabled = false;
}

// ============================================
// MOSTRAR FEEDBACK
// ============================================
function showFeedback(isCorrect, question) {
    elements.feedbackBox.style.display = 'flex';
    elements.feedbackBox.className = 'feedback-box ' + (isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
        elements.feedbackIcon.textContent = '✅';
        elements.feedbackTitle.textContent = '¡Correcto!';
    } else {
        elements.feedbackIcon.textContent = '❌';
        elements.feedbackTitle.textContent = 'No es correcto';
    }
    
    elements.feedbackExplanation.textContent = question.explanation;
    elements.feedbackHint.textContent = '💡 Pista: ' + question.hint;
}

// ============================================
// SIGUIENTE PREGUNTA
// ============================================
function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizData.questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

// ============================================
// MOSTRAR RESULTADOS
// ============================================
function showResults() {
    // CALCULAR CORRECTAMENTE
    const totalQuestions = quizData.questions.length;
    const score = Math.round((correctCount / totalQuestions) * 100);
    const incorrectCount = totalQuestions - correctCount;
    
    console.log(`📊 Resultado: ${correctCount}/${totalQuestions} correctas = ${score}%`);
    
    // IMPORTANTE: Guardar en el sistema de gestión
    if (window.quizManager) {
        window.quizManager.completeQuiz('transformacion-digital', score);
    }
    
    // Guardar resultados para la página de resultados
    const resultsData = {
        quizId: quizData.id,
        quizName: quizData.title,
        totalQuestions: totalQuestions,
        correctAnswers: correctCount,
        incorrectAnswers: incorrectCount,
        score: score,
        questions: quizData.questions.map((q, idx) => ({
            question: q.question,
            userAnswer: q.options[userAnswers[idx].selected],
            correctAnswer: q.options[q.correct],
            isCorrect: userAnswers[idx].isCorrect,
            explanation: q.explanation
        }))
    };
    
    localStorage.setItem('currentQuizResults', JSON.stringify(resultsData));
    
    // Determinar emoji y mensaje
    let emoji, message;
    if (score >= 90) {
        emoji = '🎉';
        message = '¡Excelente! Dominas completamente el tema de transformación digital. ¡Entiendes perfectamente el CONPES 3975!';
    } else if (score >= 70) {
        emoji = '😊';
        message = '¡Muy bien! Tienes un buen conocimiento sobre transformación digital. Sigue aprendiendo para perfeccionar tu comprensión.';
    } else if (score >= 50) {
        emoji = '😐';
        message = 'Buen intento. Tienes conocimientos básicos, pero te recomendamos repasar las lecciones sobre el CONPES 3975.';
    } else {
        emoji = '😞';
        message = 'Necesitas repasar. Te sugerimos volver a las lecciones sobre transformación digital antes de reintentar.';
    }
    
    // Actualizar contenido del modal
    document.getElementById('resultsEmoji').textContent = emoji;
    document.getElementById('finalScorePercentage').textContent = score + '%';
    document.getElementById('correctAnswers').textContent = correctCount;
    document.getElementById('incorrectAnswers').textContent = incorrectCount;
    document.getElementById('resultsMessage').textContent = message;
    
    // Animar círculo de progreso
    const circumference = 2 * Math.PI * 90;
    const offset = circumference - (score / 100) * circumference;
    const circle = document.getElementById('scoreCircle');
    
    if (circle) {
        circle.style.strokeDashoffset = offset;
        
        // Color del círculo según puntuación
        if (score >= 70) {
            circle.style.stroke = '#00CC66';
        } else if (score >= 50) {
            circle.style.stroke = '#F59E0B';
        } else {
            circle.style.stroke = '#EF4444';
        }
    }
    
    // MOSTRAR MODAL
    const modal = document.getElementById('resultsModal');
    if (modal) {
        modal.style.display = 'flex';
        console.log('✅ Modal de resultados mostrado');
    } else {
        console.error('❌ No se encontró el modal de resultados');
    }
}

// ============================================
// REINTENTAR QUIZ
// ============================================
function retryQuiz() {
    // Usar la función de reset
    resetQuizState();
    
    // Cerrar modal
    elements.resultsModal.style.display = 'none';
    
    // Reiniciar el quiz
    initQuiz();
    
    console.log('🔄 Quiz reiniciado');
}

// ============================================
// COMPARTIR RESULTADOS
// ============================================
function shareResultsTwitter() {
    const score = Math.round((correctCount / quizData.questions.length) * 100);
    const text = `¡Obtuve ${score}% en el quiz de Transformación Digital de AR Bot! 🚀 ¿Puedes superarme?`;
    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
}

function shareResultsWhatsApp() {
    const score = Math.round((correctCount / quizData.questions.length) * 100);
    const text = `¡Obtuve ${score}% en el quiz de Transformación Digital de AR Bot! 🚀`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
}

// ============================================
// EVENT LISTENERS
// ============================================
function setupEventListeners() {
    // Botón siguiente
    elements.btnNext.addEventListener('click', nextQuestion);
    
    // Botón salir
    elements.btnExit.addEventListener('click', () => {
        elements.exitModal.style.display = 'flex';
    });
    
    // Cancelar salida
    elements.btnCancelExit.addEventListener('click', () => {
        elements.exitModal.style.display = 'none';
    });
    
    // Reintentar
    elements.btnRetry.addEventListener('click', retryQuiz);
    
    // Cerrar modales al hacer clic fuera
    elements.exitModal.addEventListener('click', (e) => {
        if (e.target === elements.exitModal) {
            elements.exitModal.style.display = 'none';
        }
    });
}

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎮 Quiz de Transformación Digital cargado');
    initQuiz();
});

// Exponer funciones para compartir (llamadas desde HTML)
window.shareResultsTwitter = shareResultsTwitter;
window.shareResultsWhatsApp = shareResultsWhatsApp;