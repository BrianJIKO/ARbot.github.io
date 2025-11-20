// ============================================
// DATOS DEL QUIZ - Protección de Datos Personales
// ============================================
const quizData = {
    id: 'proteccion-datos',
    title: 'Protección de Datos Personales',
    questions: [
        {
            id: 1,
            question: '¿Cuál es la autoridad encargada de proteger tus datos personales en Colombia?',
            options: [
                'A. La Policía Nacional de Colombia',
                'B. Superintendencia de Industria y Comercio (SIC)',
                'C. El Ministerio de Tecnologías de la Información (MinTIC)',
                'D. La Presidencia de la República'
            ],
            correct: 1, // índice 1 = opción B
            explanation: 'La Superintendencia de Industria y Comercio (SIC) es la autoridad que vigila y protege tus datos personales en Colombia. Tienes derecho a saber qué datos tienen sobre ti, corregirlos, eliminarlos y oponerte a su uso indebido.',
            hint: 'Es la entidad encargada de velar por la protección del consumidor y la regulación de datos personales.'
        },
        {
            id: 2,
            question: '¿Qué NO es considerado un dato personal según la legislación colombiana?',
            options: [
                'A. Tu nombre completo y número de cédula',
                'B. Tu ubicación GPS y dirección de residencia',
                'C. El clima actual de tu ciudad',
                'D. Tus fotografías y datos biométricos'
            ],
            correct: 2,
            explanation: 'El clima es información pública que no te identifica personalmente. Los datos personales son cualquier información que te identifica: nombre, cédula, dirección, teléfono, fotos, ubicación personal, datos biométricos, etc.',
            hint: 'Piensa en qué información puede identificarte como individuo específico versus información general disponible para todos.'
        },
        {
            id: 3,
            question: '¿En qué situación puede una empresa vender o compartir tus datos personales?',
            options: [
                'A. Siempre que la empresa lo considere necesario para su negocio',
                'B. Solo si gana una cantidad significativa de dinero con ello',
                'C. Únicamente con tu consentimiento explícito e informado',
                'D. Pueden hacerlo libremente sin informarte'
            ],
            correct: 2,
            explanation: 'Las empresas solo pueden compartir o vender tus datos con tu autorización clara y explícita. Deben informarte para qué los usarán y no pueden cambiar ese uso sin tu nuevo consentimiento. ¡Lee siempre los términos y condiciones!',
            hint: 'Tus datos te pertenecen, y las empresas necesitan tu permiso para usarlos.'
        },
        {
            id: 4,
            question: '¿Es seguro usar redes WiFi públicas para realizar transacciones bancarias o ingresar contraseñas?',
            options: [
                'A. Sí, todas las redes WiFi públicas son completamente seguras',
                'B. No, es muy riesgoso porque pueden ser interceptadas por atacantes',
                'C. Solo es seguro usar WiFi público los fines de semana',
                'D. Es seguro únicamente si la red WiFi es gratuita'
            ],
            correct: 1,
            explanation: 'Las redes WiFi públicas pueden ser interceptadas fácilmente por atacantes que buscan robar información. Evita hacer transacciones bancarias o ingresar contraseñas sensibles en WiFi público. Si es necesario, usa una VPN y verifica que los sitios tengan "https://".',
            hint: 'Las redes públicas no tienen las mismas medidas de seguridad que tu red privada en casa.'
        },
        {
            id: 5,
            question: '¿Qué protección especial tienen los datos de menores de edad en Colombia?',
            options: [
                'A. No necesitan ninguna protección especial',
                'B. Requieren autorización de padres o tutores legales para ser procesados',
                'C. Pueden ser usados libremente por cualquier empresa',
                'D. Solo se protegen después de que cumplen 15 años'
            ],
            correct: 1,
            explanation: 'Los niños, niñas y adolescentes tienen protección especial. Sus datos requieren autorización de padres o tutores legales, y las empresas deben ser extra cuidadosas. Es importante educar a los menores sobre seguridad digital desde temprana edad.',
            hint: 'Los menores son considerados población vulnerable que requiere protección adicional.'
        },
        {
            id: 6,
            question: 'Según el CONPES 3995, ¿cuáles son derechos que tienes sobre tus datos personales?',
            options: [
                'A. Solo el derecho a saber quién tiene tus datos',
                'B. Conocer, actualizar, rectificar y solicitar la supresión de tus datos',
                'C. Ningún derecho, las empresas son dueñas de los datos que recolectan',
                'D. Solo el derecho a actualizar tus datos una vez al año'
            ],
            correct: 1,
            explanation: 'Tienes múltiples derechos sobre tus datos personales: conocer qué datos tienen sobre ti, actualizarlos si están incorrectos, rectificarlos, solicitar su eliminación (supresión) y oponerte a su uso para ciertos fines. Estos derechos están protegidos por ley.',
            hint: 'Tus datos te pertenecen y tienes control sobre qué se hace con ellos.'
        },
        {
            id: 7,
            question: '¿Qué debe hacer una empresa cuando sufre una filtración de datos que afecta tu información personal?',
            options: [
                'A. No tiene obligación de informar y puede mantenerlo en secreto',
                'B. Debe notificarte inmediatamente y reportar el incidente a la SIC',
                'C. Solo debe informar si más de 10,000 personas fueron afectadas',
                'D. Puede esperar hasta un año para notificarte'
            ],
            correct: 1,
            explanation: 'Las empresas tienen la obligación legal de notificarte de manera inmediata cuando ocurre una filtración de datos que pueda afectarte. También deben reportar el incidente a la Superintendencia de Industria y Comercio para que tome las medidas correspondientes.',
            hint: 'La transparencia y la notificación oportuna son fundamentales para proteger a las personas afectadas.'
        },
        {
            id: 8,
            question: '¿Qué información debe darte una empresa ANTES de recolectar tus datos personales?',
            options: [
                'A. No están obligados a darte ninguna información previa',
                'B. Solo deben decirte que recolectarán datos, sin más detalles',
                'C. Deben informarte qué datos recolectan, para qué los usarán, con quién los compartirán y cuánto tiempo los conservarán',
                'D. Solo necesitan tu firma, sin explicar nada'
            ],
            correct: 2,
            explanation: 'Las empresas deben darte una Política de Tratamiento de Datos clara que explique: qué datos recolectan, para qué finalidad los usarán, con quién pueden compartirlos, cuánto tiempo los conservarán y cómo puedes ejercer tus derechos. Esta información debe ser clara y comprensible.',
            hint: 'El consentimiento informado significa que debes saber exactamente qué estás autorizando antes de dar tu aprobación.'
        }
    ]
};

// ============================================
// ESTADO DEL QUIZ
// ============================================
let currentQuestionIndex = 0;
let userAnswers = [];
let correctCount = 0;
let startTime = Date.now();

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
    elements.totalQuestions.textContent = quizData.questions.length;
    loadQuestion();
    setupEventListeners();
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
    const score = Math.round((correctCount / quizData.questions.length) * 100);
    const incorrectCount = quizData.questions.length - correctCount;
    
    // Guardar resultados para la página de resultados
    const resultsData = {
        quizId: quizData.id,
        quizName: quizData.title,
        totalQuestions: quizData.questions.length,
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
        message = '¡Excelente! Dominas completamente el tema de protección de datos personales. ¡Conoces tus derechos digitales!';
    } else if (score >= 70) {
        emoji = '😊';
        message = '¡Muy bien! Tienes un buen conocimiento sobre protección de datos. Sigue aprendiendo para fortalecer tu seguridad digital.';
    } else if (score >= 50) {
        emoji = '😐';
        message = 'Buen intento. Tienes conocimientos básicos, pero te recomendamos repasar las lecciones sobre protección de datos personales.';
    } else {
        emoji = '😞';
        message = 'Necesitas repasar. Te sugerimos volver a las lecciones sobre derechos digitales y protección de datos antes de reintentar.';
    }
    
    // Actualizar modal
    document.getElementById('resultsEmoji').textContent = emoji;
    document.getElementById('finalScorePercentage').textContent = score + '%';
    document.getElementById('correctAnswers').textContent = correctCount;
    document.getElementById('incorrectAnswers').textContent = incorrectCount;
    document.getElementById('resultsMessage').textContent = message;
    
    // Animar círculo de progreso
    const circumference = 2 * Math.PI * 90; // radio = 90
    const offset = circumference - (score / 100) * circumference;
    const circle = document.getElementById('scoreCircle');
    circle.style.strokeDashoffset = offset;
    
    // Color del círculo según puntuación
    if (score >= 70) {
        circle.style.stroke = '#00CC66';
    } else if (score >= 50) {
        circle.style.stroke = '#F59E0B';
    } else {
        circle.style.stroke = '#EF4444';
    }
    
    // Mostrar modal
    elements.resultsModal.style.display = 'flex';
}

// ============================================
// REINTENTAR QUIZ
// ============================================
function retryQuiz() {
    currentQuestionIndex = 0;
    userAnswers = [];
    correctCount = 0;
    startTime = Date.now();
    elements.resultsModal.style.display = 'none';
    loadQuestion();
}

// ============================================
// COMPARTIR RESULTADOS
// ============================================
function shareResultsTwitter() {
    const score = Math.round((correctCount / quizData.questions.length) * 100);
    const text = `¡Obtuve ${score}% en el quiz de Protección de Datos Personales de AR Bot! 🔐 ¿Puedes superarme?`;
    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
}

function shareResultsWhatsApp() {
    const score = Math.round((correctCount / quizData.questions.length) * 100);
    const text = `¡Obtuve ${score}% en el quiz de Protección de Datos Personales de AR Bot! 🔐`;
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
    console.log('🎮 Quiz de Protección de Datos Personales cargado');
    initQuiz();
});

// Exponer funciones para compartir (llamadas desde HTML)
window.shareResultsTwitter = shareResultsTwitter;
window.shareResultsWhatsApp = shareResultsWhatsApp;