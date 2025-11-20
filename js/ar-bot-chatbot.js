// ============================================
// AR BOT CHATBOT - SISTEMA MEJORADO CON NAVEGACIÓN POR MENÚS
// ============================================

class ARBotChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.currentMenu = 'main';
        this.menuHistory = [];
        this.init();
    }

    // Definir estructura de menús jerárquicos
    getMenuStructure() {
        return {
            main: {
                message: '¡Hola! 👋 Soy el Asistente Virtual de AR Bot. Estoy aquí para ayudarte a navegar por el mundo de la Transformación Digital y la Ciberseguridad en Colombia.\n\n¿Qué te gustaría hacer hoy?',
                options: [
                    { icon: '🎓', text: 'Quiero aprender', action: 'menu', target: 'aprender' },
                    { icon: '🛡️', text: 'Quiero practicar y evaluar', action: 'menu', target: 'practicar' },
                    { icon: '🛠️', text: 'Necesito herramientas de seguridad', action: 'menu', target: 'herramientas' },
                    { icon: '📑', text: 'Busco documentos oficiales', action: 'menu', target: 'recursos' },
                    { icon: '📷', text: 'Ayuda con la Realidad Aumentada', action: 'menu', target: 'ar_support' },
                    { icon: '❓', text: 'Preguntas Frecuentes (FAQ)', action: 'menu', target: 'faq' },
                    { icon: '👥', text: '¿Quiénes somos?', action: 'menu', target: 'about' }
                ]
            },

            aprender: {
                message: 'Perfecto, el conocimiento es poder. Tenemos micro-lecciones diseñadas según los documentos CONPES. ¿Qué tema te interesa?',
                options: [
                    { icon: '🚀', text: 'Transformación Digital (CONPES 3975)', action: 'menu', target: 'transformacion_digital' },
                    { icon: '🔒', text: 'Seguridad y Confianza Digital (CONPES 3995)', action: 'menu', target: 'seguridad_digital' },
                    { icon: '🔙', text: 'Volver al menú principal', action: 'back', target: 'main' }
                ]
            },

            transformacion_digital: {
                message: 'La política 3975 impulsa la innovación en el país. Aquí tienes los temas clave:',
                options: [
                    { icon: '💡', text: '¿Qué es la Transformación Digital?', action: 'navigate', target: 'leccion-transformacion-digital.html' },
                    { icon: '🏗️', text: 'Los 4 Pilares de la IA en Colombia', action: 'navigate', target: 'leccion-4-pilares-ia.html' },
                    { icon: '💼', text: 'Casos de uso reales en Colombia', action: 'navigate', target: 'leccion-casos-uso.html' },
                    { icon: '✨', text: 'Beneficios para ciudadanos', action: 'navigate', target: 'leccion-beneficios.html' },
                    { icon: '🔙', text: 'Volver al menú anterior', action: 'back' }
                ]
            },

            seguridad_digital: {
                message: 'La seguridad es vital para navegar tranquilo. Aprende sobre:',
                options: [
                    { icon: '📊', text: 'Protección de Datos Personales', action: 'navigate', target: 'leccion-proteccion-datos.html' },
                    { icon: '⚠️', text: 'Amenazas Cibernéticas (Phishing, etc.)', action: 'navigate', target: 'leccion-amenazas-ciberneticas.html' },
                    { icon: '🔐', text: 'Contraseñas Seguras', action: 'navigate', target: 'leccion-contraseñas.html' },
                    { icon: '🚨', text: '¿Cómo y dónde denunciar?', action: 'navigate', target: 'leccion-denunciar.html' },
                    { icon: '🔙', text: 'Volver al menú anterior', action: 'back' }
                ]
            },

            practicar: {
                message: '¡Es hora de ponerte a prueba! 🧠 En nuestra sección de práctica puedes ganar insignias. ¿Qué desafío aceptas hoy?',
                options: [
                    { icon: '🚀', text: 'Quiz: Transformación Digital', action: 'navigate', target: 'quiz-transformacion-digital.html', description: 'Evalúa tu comprensión sobre la 4ta Revolución Industrial (10 preguntas, 5 min)' },
                    { icon: '🔒', text: 'Quiz: Seguridad Digital', action: 'navigate', target: 'quiz-seguridad-digital.html', description: 'Pon a prueba tus conocimientos sobre contraseñas y ciberseguridad (10 preguntas)' },
                    { icon: '🛡️', text: 'Quiz: Protección de Datos', action: 'navigate', target: 'quiz-proteccion-datos.html', description: 'Aprende sobre tus derechos digitales y privacidad (8 preguntas)' },
                    { icon: '🔙', text: 'Volver al menú principal', action: 'back', target: 'main' }
                ]
            },

            herramientas: {
                message: 'La prevención es la mejor defensa. He reunido estas herramientas prácticas para ti. ¿Cuál necesitas usar ahora?',
                options: [
                    { icon: '🔐', text: 'Generador de Contraseñas', action: 'navigate', target: 'recursos.html#password-gen', description: 'Crea una contraseña fuerte y única ahora mismo' },
                    { icon: '💪', text: 'Test de Fuerza de Contraseña', action: 'navigate', target: 'recursos.html#password-test', description: 'Verifica qué tan segura es tu clave actual' },
                    { icon: '📧', text: 'Verificador de Email Hackeado', action: 'navigate', target: 'recursos.html#email-check', description: 'Descubre si tu correo ha sido comprometido' },
                    { icon: '🌐', text: 'Verificador de Seguridad de URL', action: 'navigate', target: 'recursos.html#url-check', description: 'Analiza si un enlace es seguro antes de hacer clic' },
                    { icon: '✅', text: 'Checklist de Seguridad', action: 'navigate', target: 'recursos.html#checklist', description: 'Revisa tu nivel de seguridad digital paso a paso' },
                    { icon: '🔙', text: 'Volver al menú principal', action: 'back', target: 'main' }
                ]
            },

            recursos: {
                message: 'Aquí está la biblioteca oficial. Puedes acceder a los documentos originales del gobierno o enlaces de interés.',
                options: [
                    { icon: '📄', text: 'Documentos CONPES (PDF)', action: 'menu', target: 'documentos_conpes' },
                    { icon: '🔗', text: 'Enlaces Oficiales', action: 'menu', target: 'enlaces_oficiales' },
                    { icon: '🔙', text: 'Volver al menú principal', action: 'back', target: 'main' }
                ]
            },

            documentos_conpes: {
                message: 'Descarga los documentos oficiales CONPES:',
                options: [
                    { icon: '📥', text: 'Descargar CONPES 3975 (Transformación Digital)', action: 'navigate', target: 'recursos.html#conpes3975' },
                    { icon: '📥', text: 'Descargar CONPES 3995 (Seguridad Digital)', action: 'navigate', target: 'recursos.html#conpes3995' },
                    { icon: '🔙', text: 'Volver al menú anterior', action: 'back' }
                ]
            },

            enlaces_oficiales: {
                message: 'Enlaces a entidades oficiales colombianas:',
                options: [
                    { icon: '🏛️', text: 'MinTIC (Ministerio TIC)', action: 'navigate', target: 'https://www.mintic.gov.co', external: true },
                    { icon: '🏛️', text: 'DNP (Departamento Nacional de Planeación)', action: 'navigate', target: 'https://www.dnp.gov.co', external: true },
                    { icon: '💻', text: 'Gobierno Digital', action: 'navigate', target: 'https://www.gobiernoenlinea.gov.co', external: true },
                    { icon: '🔬', text: 'MinCiencias', action: 'navigate', target: 'https://minciencias.gov.co', external: true },
                    { icon: '🔙', text: 'Volver al menú anterior', action: 'back' }
                ]
            },

            ar_support: {
                message: 'AR Bot usa Realidad Aumentada para enseñar. ¿Tienes problemas o dudas sobre cómo usarla?',
                options: [
                    { icon: '📱', text: '¿Cómo escaneo un afiche?', action: 'show_message', message: 'Simplemente presiona el botón "Escanear AR" en el menú superior, permite el acceso a tu cámara y apunta al afiche o imagen marcador del proyecto.', then: 'ar_support' },
                    { icon: '📷', text: 'No funciona mi cámara', action: 'show_message', message: 'Asegúrate de haber dado permisos al navegador para usar la cámara. Si estás en iPhone (iOS), usa Safari. Si estás en Android, usa Chrome.', then: 'ar_support' },
                    { icon: '📲', text: '¿Necesito instalar una app?', action: 'show_message', message: '¡No! Esa es la mejor parte. AR Bot funciona directamente desde el navegador web (WebAR).', then: 'ar_support' },
                    { icon: '🚀', text: 'Ir a Escanear AR', action: 'navigate', target: 'escanea-ar.html' },
                    { icon: '🔙', text: 'Volver al menú principal', action: 'back', target: 'main' }
                ]
            },

            faq: {
                message: 'He recopilado las preguntas que más nos hacen. Selecciona una para ver la respuesta rápida:',
                options: [
                    { icon: '🎣', text: '¿Qué es el Phishing?', action: 'show_message', message: 'Es una técnica de engaño donde los ciberdelincuentes se hacen pasar por entidades confiables para robar tus datos. Aprende a detectarlo en la sección "Aprende".', links: [{ text: 'Ver lección completa', url: 'leccion-phishing.html' }], then: 'faq' },
                    { icon: '🤖', text: '¿Cómo uso la IA en mi negocio?', action: 'show_message', message: 'La IA puede automatizar procesos y mejorar la atención al cliente. Revisa la lección "Casos de Uso" para ejemplos reales.', links: [{ text: 'Ver casos de uso', url: 'leccion-casos-uso.html' }], then: 'faq' },
                    { icon: '🤖', text: '¿Qué es AR Bot?', action: 'show_message', message: 'Es un asistente educativo multimedia desarrollado en la Universidad Militar Nueva Granada para enseñar sobre tecnología y seguridad.', then: 'faq' },
                    { icon: '📧', text: 'No encontré mi pregunta', action: 'navigate', target: 'faq.html' },
                    { icon: '🔙', text: 'Volver al menú principal', action: 'back', target: 'main' }
                ]
            },

            about: {
                message: 'Este proyecto es una iniciativa académica y de innovación.',
                options: [
                    { icon: '👨‍💻', text: '¿Quiénes crearon AR Bot?', action: 'show_message', message: 'AR Bot fue creado por Brian Jimenez, Santiago Medina, Juan Esteban Torres y David Estiven Garzón, estudiantes de Ingeniería Multimedia de la Universidad Militar Nueva Granada.', then: 'about' },
                    { icon: '🎯', text: 'Propósito del Proyecto', action: 'show_message', message: 'Buscamos cerrar la brecha de conocimiento ciudadano sobre las políticas públicas de tecnología (CONPES) usando métodos innovadores como la Realidad Aumentada.', then: 'about' },
                    { icon: 'ℹ️', text: 'Más información', action: 'navigate', target: 'acerca-de.html' },
                    { icon: '🔙', text: 'Volver al menú principal', action: 'back', target: 'main' }
                ]
            }
        };
    }

    // Inicializar chatbot
    init() {
        this.injectStyles();
        this.createChatInterface();
        this.attachEventListeners();
        this.showWelcomeMessage();
    }

    // Inyectar estilos CSS
    injectStyles() {
        const styles = `
            /* Contenedor principal del chatbot */
            .ar-chatbot-container {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 10000;
                font-family: 'Inter', system-ui, -apple-system, sans-serif;
            }

            /* Botón flotante del chat */
            .ar-chatbot-button {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: linear-gradient(135deg, #0066CC, #00CC66);
                box-shadow: 0 4px 20px rgba(0, 102, 204, 0.4);
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s ease;
                animation: pulse 2s infinite;
            }

            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }

            .ar-chatbot-button:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 30px rgba(0, 102, 204, 0.5);
            }

            .ar-chatbot-button svg {
                width: 30px;
                height: 30px;
                fill: white;
            }

            .ar-chatbot-button.active {
                animation: none;
            }

            /* Indicador de nuevo mensaje */
            .ar-chat-notification {
                position: absolute;
                top: -5px;
                right: -5px;
                width: 20px;
                height: 20px;
                background: #FF6600;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                color: white;
                font-weight: bold;
                animation: bounce 1s infinite;
            }

            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-5px); }
            }

            /* Ventana del chat */
            .ar-chatbot-window {
                position: absolute;
                bottom: 80px;
                right: 0;
                width: 380px;
                max-width: 90vw;
                height: 600px;
                max-height: 80vh;
                background: white;
                border-radius: 20px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                display: none;
                flex-direction: column;
                overflow: hidden;
                animation: slideIn 0.3s ease;
            }

            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .ar-chatbot-window.active {
                display: flex;
            }

            /* Header del chat */
            .ar-chat-header {
                background: linear-gradient(135deg, #0066CC, #00CC66);
                padding: 20px;
                color: white;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-radius: 20px 20px 0 0;
            }

            .ar-chat-header-info {
                display: flex;
                align-items: center;
                gap: 12px;
            }

            .ar-chat-avatar {
                width: 40px;
                height: 40px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
            }

            .ar-chat-header-text h3 {
                margin: 0;
                font-size: 18px;
                font-weight: 600;
            }

            .ar-chat-header-text p {
                margin: 0;
                font-size: 12px;
                opacity: 0.9;
            }

            .ar-chat-close {
                width: 30px;
                height: 30px;
                background: rgba(255, 255, 255, 0.2);
                border: none;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
                color: white;
                font-size: 18px;
            }

            .ar-chat-close:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: scale(1.1);
            }

            /* Área de mensajes */
            .ar-chat-messages {
                flex: 1;
                padding: 20px;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                gap: 16px;
                background: #F9FAFB;
            }

            .ar-chat-messages::-webkit-scrollbar {
                width: 6px;
            }

            .ar-chat-messages::-webkit-scrollbar-track {
                background: #F3F4F6;
                border-radius: 3px;
            }

            .ar-chat-messages::-webkit-scrollbar-thumb {
                background: #9CA3AF;
                border-radius: 3px;
            }

            /* Mensajes */
            .ar-message {
                display: flex;
                gap: 10px;
                animation: fadeIn 0.3s ease;
            }

            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }

            .ar-message.bot {
                align-self: flex-start;
            }

            .ar-message.user {
                align-self: flex-end;
                flex-direction: row-reverse;
            }

            .ar-message-avatar {
                width: 32px;
                height: 32px;
                background: linear-gradient(135deg, #0066CC, #00CC66);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                flex-shrink: 0;
            }

            .ar-message.user .ar-message-avatar {
                background: #6366F1;
            }

            .ar-message-content {
                max-width: 85%;
                padding: 12px 16px;
                background: white;
                border-radius: 18px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            }

            .ar-message.user .ar-message-content {
                background: #0066CC;
                color: white;
            }

            .ar-message-text {
                margin: 0;
                font-size: 14px;
                line-height: 1.5;
                white-space: pre-wrap;
            }

            /* Enlaces en mensajes */
            .ar-message-links {
                margin-top: 8px;
                display: flex;
                flex-direction: column;
                gap: 6px;
            }

            .ar-message-link {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                padding: 6px 12px;
                background: linear-gradient(135deg, #0066CC, #00CC66);
                color: white;
                text-decoration: none;
                border-radius: 12px;
                font-size: 13px;
                font-weight: 500;
                transition: all 0.3s ease;
            }

            .ar-message-link:hover {
                transform: translateX(5px);
                box-shadow: 0 2px 10px rgba(0, 102, 204, 0.3);
            }

            /* Opciones del menú */
            .ar-menu-options {
                display: flex;
                flex-direction: column;
                gap: 8px;
                margin-top: 12px;
            }

            .ar-menu-option {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 12px 16px;
                background: white;
                border: 2px solid #E5E7EB;
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.3s ease;
                text-align: left;
                font-size: 14px;
                font-weight: 500;
                color: #374151;
            }

            .ar-menu-option:hover {
                border-color: #0066CC;
                background: linear-gradient(135deg, rgba(0, 102, 204, 0.05), rgba(0, 204, 102, 0.05));
                transform: translateX(5px);
            }

            .ar-menu-option-icon {
                font-size: 20px;
                flex-shrink: 0;
            }

            .ar-menu-option-text {
                flex: 1;
            }

            .ar-menu-option-description {
                font-size: 12px;
                color: #6B7280;
                margin-top: 4px;
            }

            /* Indicador de escritura */
            .ar-typing-indicator {
                display: flex;
                align-items: center;
                gap: 6px;
                padding: 12px;
                background: white;
                border-radius: 18px;
                width: fit-content;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            }

            .ar-typing-dot {
                width: 8px;
                height: 8px;
                background: #9CA3AF;
                border-radius: 50%;
                animation: typing 1.4s infinite;
            }

            .ar-typing-dot:nth-child(2) {
                animation-delay: 0.2s;
            }

            .ar-typing-dot:nth-child(3) {
                animation-delay: 0.4s;
            }

            @keyframes typing {
                0%, 60%, 100% {
                    transform: translateY(0);
                    opacity: 0.5;
                }
                30% {
                    transform: translateY(-10px);
                    opacity: 1;
                }
            }

            /* Acciones rápidas */
            .ar-chat-quick-actions {
                padding: 12px;
                background: white;
                border-top: 1px solid #E5E7EB;
                display: flex;
                gap: 8px;
                overflow-x: auto;
            }

            .ar-quick-action-btn {
                display: flex;
                align-items: center;
                gap: 6px;
                padding: 8px 14px;
                background: #F3F4F6;
                border: none;
                border-radius: 12px;
                font-size: 13px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.3s ease;
                white-space: nowrap;
                color: #374151;
            }

            .ar-quick-action-btn:hover {
                background: linear-gradient(135deg, #0066CC, #00CC66);
                color: white;
                transform: translateY(-2px);
                box-shadow: 0 2px 10px rgba(0, 102, 204, 0.3);
            }

            /* Responsive */
            @media (max-width: 480px) {
                .ar-chatbot-window {
                    width: 100vw;
                    height: 100vh;
                    bottom: 0;
                    right: 0;
                    border-radius: 0;
                    max-height: 100vh;
                }

                .ar-chat-header {
                    border-radius: 0;
                }

                .ar-chatbot-button {
                    bottom: 20px;
                    right: 20px;
                }

                .ar-message-content {
                    max-width: 85%;
                }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    // Crear interfaz del chat
    createChatInterface() {
        const container = document.createElement('div');
        container.className = 'ar-chatbot-container';
        container.innerHTML = `
            <!-- Botón flotante -->
            <div class="ar-chatbot-button" id="arChatButton">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3 .97 4.29L2 22l5.71-.97C9 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.41 0-2.73-.36-3.88-.99l-.28-.15-2.9.49.49-2.9-.15-.28C4.64 14.73 4.28 13.41 4.28 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z"/>
                    <circle cx="8.5" cy="12" r="1"/>
                    <circle cx="12" cy="12" r="1"/>
                    <circle cx="15.5" cy="12" r="1"/>
                </svg>
                <span class="ar-chat-notification" style="display: none;">1</span>
            </div>

            <!-- Ventana del chat -->
            <div class="ar-chatbot-window" id="arChatWindow">
                <!-- Header -->
                <div class="ar-chat-header">
                    <div class="ar-chat-header-info">
                        <div class="ar-chat-avatar">🤖</div>
                        <div class="ar-chat-header-text">
                            <h3>AR Bot Assistant</h3>
                            <p>🟢 En línea - Aquí para ayudarte</p>
                        </div>
                    </div>
                    <button class="ar-chat-close" id="arChatClose">✕</button>
                </div>

                <!-- Mensajes -->
                <div class="ar-chat-messages" id="arChatMessages"></div>

                <!-- Acciones rápidas -->
                <div class="ar-chat-quick-actions" id="arQuickActions">
                    <button class="ar-quick-action-btn" data-action="menu" data-target="aprender">
                        📚 Aprender
                    </button>
                    <button class="ar-quick-action-btn" data-action="menu" data-target="practicar">
                        🎮 Practicar
                    </button>
                    <button class="ar-quick-action-btn" data-action="navigate" data-target="escanea-ar.html">
                        📱 Escanear AR
                    </button>
                    <button class="ar-quick-action-btn" data-action="menu" data-target="herramientas">
                        🛠️ Herramientas
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(container);
        
        // Guardar referencias a elementos
        this.elements = {
            button: document.getElementById('arChatButton'),
            window: document.getElementById('arChatWindow'),
            messages: document.getElementById('arChatMessages'),
            closeBtn: document.getElementById('arChatClose'),
            quickActions: document.getElementById('arQuickActions')
        };
    }

    // Adjuntar event listeners
    attachEventListeners() {
        // Toggle chat
        this.elements.button.addEventListener('click', () => this.toggleChat());
        this.elements.closeBtn.addEventListener('click', () => this.toggleChat());

        // Acciones rápidas
        this.elements.quickActions.addEventListener('click', (e) => {
            const btn = e.target.closest('.ar-quick-action-btn');
            if (btn) {
                const action = btn.dataset.action;
                const target = btn.dataset.target;
                this.handleAction(action, target);
            }
        });
    }

    // Toggle chat abierto/cerrado
    toggleChat() {
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            this.elements.window.classList.add('active');
            this.elements.button.classList.add('active');
            // Ocultar notificación
            const notification = this.elements.button.querySelector('.ar-chat-notification');
            if (notification) notification.style.display = 'none';
        } else {
            this.elements.window.classList.remove('active');
            this.elements.button.classList.remove('active');
        }
    }

    // Mostrar mensaje de bienvenida
    showWelcomeMessage() {
        setTimeout(() => {
            this.showMenu('main');

            // Mostrar notificación
            const notification = this.elements.button.querySelector('.ar-chat-notification');
            if (notification && !this.isOpen) {
                notification.style.display = 'flex';
            }
        }, 1500);
    }

    // Mostrar menú
    showMenu(menuKey) {
        const menus = this.getMenuStructure();
        const menu = menus[menuKey];

        if (!menu) {
            console.error('Menú no encontrado:', menuKey);
            return;
        }

        // Añadir mensaje del bot
        this.addBotMessage(menu.message);

        // Crear opciones del menú
        setTimeout(() => {
            this.addMenuOptions(menu.options);
        }, 300);

        this.currentMenu = menuKey;
    }

    // Añadir mensaje del bot
    addBotMessage(text, links = null) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'ar-message bot';
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'ar-message-avatar';
        avatarDiv.textContent = '🤖';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'ar-message-content';
        
        const textP = document.createElement('p');
        textP.className = 'ar-message-text';
        textP.textContent = text;
        contentDiv.appendChild(textP);
        
        // Añadir enlaces si existen
        if (links && links.length > 0) {
            const linksDiv = document.createElement('div');
            linksDiv.className = 'ar-message-links';
            
            links.forEach(link => {
                const linkEl = document.createElement('a');
                linkEl.className = 'ar-message-link';
                linkEl.href = link.url;
                linkEl.textContent = `→ ${link.text}`;
                if (link.external || link.url.startsWith('http')) {
                    linkEl.target = '_blank';
                    linkEl.rel = 'noopener noreferrer';
                }
                linksDiv.appendChild(linkEl);
            });
            
            contentDiv.appendChild(linksDiv);
        }
        
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        
        this.elements.messages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    // Añadir mensaje del usuario
    addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'ar-message user';
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'ar-message-avatar';
        avatarDiv.textContent = '👤';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'ar-message-content';
        
        const textP = document.createElement('p');
        textP.className = 'ar-message-text';
        textP.textContent = text;
        contentDiv.appendChild(textP);
        
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        
        this.elements.messages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    // Añadir opciones del menú
    addMenuOptions(options) {
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'ar-message bot';
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'ar-message-avatar';
        avatarDiv.textContent = '💡';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'ar-message-content';
        
        const menuOptions = document.createElement('div');
        menuOptions.className = 'ar-menu-options';
        
        options.forEach(option => {
            const optionBtn = document.createElement('button');
            optionBtn.className = 'ar-menu-option';
            
            const iconSpan = document.createElement('span');
            iconSpan.className = 'ar-menu-option-icon';
            iconSpan.textContent = option.icon;
            
            const textDiv = document.createElement('div');
            textDiv.className = 'ar-menu-option-text';
            textDiv.textContent = option.text;
            
            if (option.description) {
                const descDiv = document.createElement('div');
                descDiv.className = 'ar-menu-option-description';
                descDiv.textContent = option.description;
                textDiv.appendChild(descDiv);
            }
            
            optionBtn.appendChild(iconSpan);
            optionBtn.appendChild(textDiv);
            
            optionBtn.addEventListener('click', () => {
                this.addUserMessage(option.text);
                setTimeout(() => {
                    this.handleOptionClick(option);
                }, 300);
            });
            
            menuOptions.appendChild(optionBtn);
        });
        
        contentDiv.appendChild(menuOptions);
        optionsContainer.appendChild(avatarDiv);
        optionsContainer.appendChild(contentDiv);
        
        this.elements.messages.appendChild(optionsContainer);
        this.scrollToBottom();
    }

    // Manejar clic en opción
    handleOptionClick(option) {
        this.showTypingIndicator();
        
        setTimeout(() => {
            this.hideTypingIndicator();
            this.handleAction(option.action, option.target, option);
        }, 800);
    }

    // Manejar acción
    handleAction(action, target, option = null) {
        switch(action) {
            case 'menu':
                if (this.currentMenu !== 'main') {
                    this.menuHistory.push(this.currentMenu);
                }
                this.showMenu(target);
                break;
                
            case 'back':
                if (target) {
                    // Ir a un menú específico
                    this.showMenu(target);
                } else if (this.menuHistory.length > 0) {
                    // Volver al menú anterior
                    const previousMenu = this.menuHistory.pop();
                    this.showMenu(previousMenu);
                } else {
                    // Volver al menú principal
                    this.showMenu('main');
                }
                break;
                
            case 'navigate':
                this.addBotMessage(`✅ Te estoy redirigiendo. ¡Que tengas un buen aprendizaje!`);
                setTimeout(() => {
                    if (option && option.external) {
                        window.open(target, '_blank', 'noopener,noreferrer');
                    } else if (target.startsWith('http')) {
                        window.open(target, '_blank', 'noopener,noreferrer');
                    } else {
                        window.location.href = target;
                    }
                }, 1000);
                break;
                
            case 'show_message':
                if (option && option.message) {
                    this.addBotMessage(option.message, option.links);
                    if (option.then) {
                        setTimeout(() => {
                            this.showMenu(option.then);
                        }, 1500);
                    }
                }
                break;
        }
    }

    // Mostrar indicador de escritura
    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'ar-message bot';
        typingDiv.id = 'typingIndicator';
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'ar-message-avatar';
        avatarDiv.textContent = '🤖';
        
        const indicatorDiv = document.createElement('div');
        indicatorDiv.className = 'ar-typing-indicator';
        indicatorDiv.innerHTML = `
            <span class="ar-typing-dot"></span>
            <span class="ar-typing-dot"></span>
            <span class="ar-typing-dot"></span>
        `;
        
        typingDiv.appendChild(avatarDiv);
        typingDiv.appendChild(indicatorDiv);
        
        this.elements.messages.appendChild(typingDiv);
        this.scrollToBottom();
    }

    // Ocultar indicador de escritura
    hideTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }

    // Scroll al final del chat
    scrollToBottom() {
        this.elements.messages.scrollTop = this.elements.messages.scrollHeight;
    }
}

// Inicializar el chatbot cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.arBotChat = new ARBotChatbot();
    });
} else {
    // DOM ya está listo
    window.arBotChat = new ARBotChatbot();
}

// Exportar para uso global si es necesario
window.ARBotChatbot = ARBotChatbot;