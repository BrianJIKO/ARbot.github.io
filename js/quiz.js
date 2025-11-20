// ============================================
// DATOS DEL QUIZ - Seguridad Digital
// ============================================
const quizData = {
    id: 'seguridad-digital',
    title: 'Seguridad Digital',
    questions: [
        {
            id: 1,
            question: 'Según el documento, ¿cuál es la longitud mínima recomendada para una contraseña y por qué se considera más segura?',
            options: [
                'A. 10 caracteres, siempre que se combine con letras, números y símbolos.',
                'B. 8 caracteres, porque es el estándar aceptado en la mayoría de los sitios web.',
                'C. 15 caracteres, ya que es la única longitud que ofrece protección garantizada contra cualquier tipo de ciberataque.',
                'D. 12 caracteres, porque aumenta exponencialmente el tiempo que le tomaría a un programa descifrarla, pudiendo tardar años.'
            ],
            correct: 3, // índice 3 = opción D
            explanation: '12 caracteres es la longitud mínima recomendada porque aumenta exponencialmente el tiempo de descifrado.',
            hint: 'El documento compara el tiempo necesario para romper contraseñas de diferentes longitudes.'
        },
        {
            id: 2,
            question: '¿Por qué es fundamental evitar el uso de datos personales obvios (como fechas de nacimiento o nombres de mascotas) en una contraseña?',
            options: [
                'A. Porque este tipo de información es intrínsecamente corta y no cumple con los requisitos de longitud.',
                'B. Porque son difíciles de recordar para el usuario y provocan más solicitudes de restablecimiento de contraseña.',
                'C. Porque los sistemas modernos de ciberseguridad, como los del CONPES 3995, los detectan y bloquean automáticamente.',
                'D. Porque los atacantes investigan las redes sociales y otros perfiles públicos para obtener esta información y usarla en sus intentos de acceso.'
            ],
            correct: 3,
            explanation: 'Los ciberdelincuentes revisan redes sociales y perfiles públicos para obtener información personal que puedan usar en ataques.',
            hint: 'Piensa en cómo los ciberdelincuentes obtienen pistas para adivinar tus credenciales.'
        },
        {
            id: 3,
            question: '¿Cuál es el principio de seguridad clave detrás de la Autenticación de Dos Factores (2FA)?',
            options: [
                'A. Funciona duplicando la complejidad de la contraseña al añadir un código numérico al final.',
                'B. Requiere la combinación de algo que sabes (la contraseña) con algo que tienes (como tu celular).',
                'C. Su objetivo principal es enviar una notificación por SMS o correo electrónico cada vez que hay un inicio de sesión exitoso.',
                'D. Obliga al usuario a cambiar su contraseña cada vez que inicia sesión desde un dispositivo desconocido.'
            ],
            correct: 1,
            explanation: 'La 2FA combina dos tipos diferentes de evidencia: algo que sabes (contraseña) y algo que tienes (dispositivo/token).',
            hint: 'La fortaleza de este sistema radica en la necesidad de presentar dos tipos diferentes de evidencia para probar tu identidad.'
        },
        {
            id: 4,
            question: 'Según el documento, ¿cuál es el mayor riesgo asociado con la reutilización de la misma contraseña en diferentes cuentas?',
            options: [
                'A. Si un servicio sufre una filtración de datos, los atacantes usarán esa contraseña para intentar acceder a tus otras cuentas importantes.',
                'B. Los sitios web pueden detectar que la contraseña se usa en otro lugar y bloquear la cuenta preventivamente.',
                'C. La mayoría de los gestores de contraseñas no permiten almacenar la misma contraseña para diferentes sitios web.',
                'D. Aumenta la probabilidad de que el usuario olvide esa única contraseña, perdiendo el acceso a todo a la vez.'
            ],
            correct: 0,
            explanation: 'Si una sola contraseña es comprometida en un sitio, los atacantes la probarán en todas tus otras cuentas.',
            hint: 'Considera cómo un problema de seguridad en un sitio web puede afectar a tus otras cuentas.'
        },
        {
            id: 5,
            question: '¿Qué herramienta se recomienda en el documento para manejar de forma segura la necesidad de tener contraseñas únicas y complejas para cada servicio?',
            options: [
                'A. Usar un gestor de contraseñas, que es una aplicación diseñada para almacenar y generar credenciales de forma cifrada.',
                'B. Anotar las contraseñas en un papel guardado en un lugar seguro y físico.',
                'C. Utilizar la función de "Guardar contraseña" que ofrecen los navegadores web.',
                'D. Crear un sistema personal donde se usa una contraseña base y se modifica ligeramente para cada sitio.'
            ],
            correct: 0,
            explanation: 'Los gestores de contraseñas son la herramienta más segura para almacenar y generar contraseñas únicas de forma cifrada.',
            hint: 'El texto sugiere una solución tecnológica para no tener que memorizar docenas de contraseñas complicadas.'
        },
        {
            id: 6,
            question: '¿En qué situación, según el documento, NO es estrictamente necesario cambiar una contraseña que ya es fuerte?',
            options: [
                'A. Después de que termine tu relación con alguien que conocía tus contraseñas.',
                'B. Cada 3-6 meses para cuentas críticas como el banco o el correo principal.',
                'C. Si la contraseña es fuerte y única, y además se tiene la autenticación de dos factores (2FA) activada, sin incidentes de seguridad.',
                'D. Cuando un sitio web que usas informa que ha sufrido un ataque cibernético.'
            ],
            correct: 2,
            explanation: 'Si tienes una contraseña fuerte y única con 2FA activada, y no ha habido incidentes, no es necesario cambiarla.',
            hint: 'Considera el escenario donde ya tienes múltiples capas de seguridad robustas y no ha habido ninguna alerta.'
        },
        {
            id: 7,
            question: 'Una de las peores contraseñas mencionadas es "qwerty". ¿Por qué este tipo de contraseña es extremadamente insegura?',
            options: [
                'A. Es una secuencia de teclas adyacentes en el teclado, lo que la hace muy predecible y una de las primeras en ser probadas por los atacantes.',
                'B. Es demasiado corta para cumplir con el estándar de 8 caracteres requerido por la mayoría de los servicios.',
                'C. Contiene solo letras minúsculas, lo que la hace incompatible con los requisitos de complejidad de muchos sitios.',
                'D. Es una palabra en inglés que significa "contraseña", por lo que es fácil de adivinar.'
            ],
            correct: 0,
            explanation: '"Qwerty" es una secuencia de teclas consecutivas en el teclado, haciéndola extremadamente predecible para los atacantes.',
            hint: 'Observa la disposición de las letras en un teclado estándar.'
        },
        {
            id: 8,
            question: 'Según el mito desacreditado en el texto, ¿por qué la simple sustitución de letras por símbolos (como "a" por "@") no es suficiente para crear una contraseña segura?',
            options: [
                'A. Porque hace que la contraseña sea muy difícil de recordar para el propio usuario.',
                'B. Porque los programas de hackeo ya conocen y prueban automáticamente estas sustituciones comunes.',
                'C. Porque este método generalmente resulta en contraseñas que son demasiado cortas.',
                'D. Porque los símbolos como "@" o "$" no son considerados caracteres especiales por los sistemas de seguridad.'
            ],
            correct: 1,
            explanation: 'Los programas de ataque ya incluyen estas sustituciones comunes (a=@, e=3, etc.) en sus diccionarios de prueba.',
            hint: 'Piensa si los atacantes se han adaptado a los trucos más comunes que usan las personas.'
        },
        {
            id: 9,
            question: '¿Cuál de las siguientes es una señal de alerta clara de que tu contraseña pudo haber sido comprometida?',
            options: [
                'A. Recibes una notificación de inicio de sesión desde una ubicación desconocida en la que no te encuentras.',
                'B. Recibir un correo para restablecer tu contraseña después de haberlo solicitado tú mismo.',
                'C. Tener que cambiar tu contraseña porque el sitio web actualizó su política de seguridad.',
                'D. El sistema te pide un código de 2FA al iniciar sesión desde un nuevo navegador.'
            ],
            correct: 0,
            explanation: 'Un inicio de sesión desde una ubicación donde no estás es una clara señal de que alguien más accedió a tu cuenta.',
            hint: 'Busca una actividad en tu cuenta que definitivamente no fue realizada por ti.'
        },
        {
            id: 10,
            question: 'El documento menciona el CONPES 3995 como el marco de su contenido. ¿Cuál es uno de los objetivos de esta política nacional colombiana?',
            options: [
                'A. Reemplazar el uso de contraseñas por sistemas biométricos en todos los servicios del país.',
                'B. Aumentar la cultura en seguridad digital y fomentar la "ciber higiene" en la población.',
                'C. Sancionar a los ciudadanos que no utilicen contraseñas con más de 12 caracteres.',
                'D. Crear una base de datos centralizada con las contraseñas de todos los ciudadanos para protegerlas.'
            ],
            correct: 1,
            explanation: 'El CONPES 3995 busca educar a la población en seguridad digital y promover buenos hábitos de "ciber higiene".',
            hint: 'La política se centra en el conocimiento y el comportamiento de los usuarios como primera línea de defensa.'
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
    
    // Guardar en el sistema de gestión de quizzes
    if (window.quizManager) {
        window.quizManager.completeQuiz(quizData.id, score);
    }
    
    // Determinar emoji y mensaje
    let emoji, message;
    if (score >= 90) {
        emoji = '🎉';
        message = '¡Excelente! Dominas completamente el tema de seguridad digital. ¡Eres un experto en ciberseguridad!';
    } else if (score >= 70) {
        emoji = '😊';
        message = '¡Muy bien! Tienes un buen conocimiento sobre seguridad digital. Sigue practicando para perfeccionar tus habilidades.';
    } else if (score >= 50) {
        emoji = '😐';
        message = 'Buen intento. Tienes conocimientos básicos, pero te recomendamos repasar las lecciones para mejorar.';
    } else {
        emoji = '😞';
        message = 'Necesitas repasar. Te sugerimos volver a las lecciones sobre seguridad digital antes de reintentar.';
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
    const text = `¡Obtuve ${score}% en el quiz de Seguridad Digital de AR Bot! 🔒 ¿Puedes superarme?`;
    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
}

function shareResultsWhatsApp() {
    const score = Math.round((correctCount / quizData.questions.length) * 100);
    const text = `¡Obtuve ${score}% en el quiz de Seguridad Digital de AR Bot! 🔒`;
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
    console.log('🎮 Quiz de Seguridad Digital cargado');
    initQuiz();
});

// Exponer funciones para compartir (llamadas desde HTML)
window.shareResultsTwitter = shareResultsTwitter;
window.shareResultsWhatsApp = shareResultsWhatsApp;