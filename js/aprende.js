// ============================================
// FUNCIONALIDAD DE TABS Y FILTRADO
// ============================================

// Obtener elementos
const tabButtons = document.querySelectorAll('.tab-btn');
const lessonCards = document.querySelectorAll('.lesson-card');
const noResults = document.getElementById('noResults');

// Función para filtrar lecciones
function filterLessons(category) {
    let visibleCount = 0;
    
    lessonCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'todos' || cardCategory === category) {
            // Mostrar la tarjeta con animación
            card.style.display = 'flex';
            card.style.animation = 'fadeInUp 0.5s ease-out';
            visibleCount++;
        } else {
            // Ocultar la tarjeta
            card.style.display = 'none';
        }
    });
    
    // Mostrar mensaje si no hay resultados
    if (visibleCount === 0) {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
    }
}

// Event listeners para los tabs
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remover clase active de todos los botones
        tabButtons.forEach(btn => btn.classList.remove('active'));
        
        // Agregar clase active al botón clickeado
        button.classList.add('active');
        
        // Obtener la categoría del data-attribute
        const category = button.getAttribute('data-tab');
        
        // Filtrar lecciones
        filterLessons(category);
        
        // Scroll suave a la sección de lecciones
        document.querySelector('.lessons-section').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// ============================================
// ANIMACIÓN DE ENTRADA PARA LAS TARJETAS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            cardObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplicar animación de entrada inicial
lessonCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
    cardObserver.observe(card);
});

// ============================================
// GUARDAR PREFERENCIA DE TAB EN LOCALSTORAGE
// (Opcional: recordar qué tab estaba activo)
// ============================================
function saveActiveTab(category) {
    localStorage.setItem('activeTab', category);
}

function loadActiveTab() {
    const savedTab = localStorage.getItem('activeTab');
    if (savedTab) {
        const targetButton = document.querySelector(`[data-tab="${savedTab}"]`);
        if (targetButton) {
            targetButton.click();
        }
    }
}

// Guardar tab al cambiar
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-tab');
        saveActiveTab(category);
    });
});

// Cargar tab guardado al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    loadActiveTab();
});

// ============================================
// CONTADOR DE LECCIONES POR CATEGORÍA
// ============================================
function updateTabCounts() {
    const transformacionCount = document.querySelectorAll('[data-category="transformacion"]').length;
    const seguridadCount = document.querySelectorAll('[data-category="seguridad"]').length;
    const totalCount = lessonCards.length;
    
    console.log(`📚 Total de lecciones: ${totalCount}`);
    console.log(`💡 Transformación Digital: ${transformacionCount}`);
    console.log(`🔒 Seguridad Digital: ${seguridadCount}`);
}

updateTabCounts();

// ============================================
// EFECTO HOVER EN TARJETAS (OPCIONAL)
// ============================================
lessonCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderLeft = '4px solid var(--primary-blue)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.borderLeft = 'none';
    });
});

// ============================================
// ANIMACIÓN CSS ADICIONAL
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);