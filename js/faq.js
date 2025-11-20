// ============================================
// FAQ - JAVASCRIPT
// ============================================

// ============================================
// CLASE PRINCIPAL DE FAQ
// ============================================
class FAQManager {
    constructor() {
        this.init();
        this.trackStats();
    }
    
    init() {
        this.initCategoryAccordions();
        this.initFAQAccordions();
        this.initScrollAnimations();
        this.loadFirstCategory();
    }
    
    // ============================================
    // ACORDEONES DE CATEGORÍAS
    // ============================================
    initCategoryAccordions() {
        const categoryHeaders = document.querySelectorAll('.category-header');
        
        categoryHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const category = header.parentElement;
                const isActive = category.classList.contains('active');
                
                // Cerrar todas las categorías
                document.querySelectorAll('.faq-category').forEach(cat => {
                    cat.classList.remove('active');
                });
                
                // Si no estaba activa, abrirla
                if (!isActive) {
                    category.classList.add('active');
                    
                    // Track evento
                    this.trackCategoryClick(header.querySelector('.category-title').textContent);
                }
            });
        });
    }
    
    // ============================================
    // ACORDEONES DE PREGUNTAS
    // ============================================
    initFAQAccordions() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                const isActive = faqItem.classList.contains('active');
                
                // Toggle la pregunta
                faqItem.classList.toggle('active');
                
                // Scroll suave a la pregunta si se está abriendo
                if (!isActive) {
                    setTimeout(() => {
                        const yOffset = -100;
                        const y = faqItem.getBoundingClientRect().top + window.pageYOffset + yOffset;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                    }, 100);
                    
                    // Track evento
                    this.trackQuestionClick(question.querySelector('.question-text').textContent);
                }
            });
        });
    }
    
    // ============================================
    // CARGAR PRIMERA CATEGORÍA ABIERTA
    // ============================================
    loadFirstCategory() {
        // Abrir la primera categoría por defecto
        const firstCategory = document.querySelector('.faq-category');
        if (firstCategory) {
            firstCategory.classList.add('active');
        }
        
        // Abrir la primera pregunta destacada
        const firstFeatured = document.querySelector('.faq-item.featured');
        if (firstFeatured) {
            firstFeatured.classList.add('active');
        }
    }
    
    // ============================================
    // ANIMACIONES AL SCROLL
    // ============================================
    initScrollAnimations() {
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
        
        // Observar elementos
        document.querySelectorAll('.faq-item, .faq-category, .contact-card').forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease';
            observer.observe(element);
        });
    }
    
    // ============================================
    // SISTEMA DE ESTADÍSTICAS
    // ============================================
    trackStats() {
        this.stats = this.loadStats();
    }
    
    loadStats() {
        const saved = localStorage.getItem('faqStats');
        return saved ? JSON.parse(saved) : {
            questionsViewed: [],
            categoriesViewed: [],
            totalVisits: 0,
            lastVisit: null
        };
    }
    
    saveStats() {
        localStorage.setItem('faqStats', JSON.stringify(this.stats));
    }
    
    trackQuestionClick(questionText) {
        const question = {
            text: questionText,
            timestamp: new Date().toISOString()
        };
        
        this.stats.questionsViewed.push(question);
        this.saveStats();
        
        console.log('Question viewed:', questionText);
    }
    
    trackCategoryClick(categoryName) {
        const category = {
            name: categoryName,
            timestamp: new Date().toISOString()
        };
        
        this.stats.categoriesViewed.push(category);
        this.saveStats();
        
        console.log('Category viewed:', categoryName);
    }
    
    trackVisit() {
        this.stats.totalVisits++;
        this.stats.lastVisit = new Date().toISOString();
        this.saveStats();
    }
    
    getMostViewedQuestions(limit = 5) {
        const questionCounts = {};
        
        this.stats.questionsViewed.forEach(q => {
            questionCounts[q.text] = (questionCounts[q.text] || 0) + 1;
        });
        
        return Object.entries(questionCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, limit)
            .map(([text, count]) => ({ text, count }));
    }
    
    getStats() {
        return {
            ...this.stats,
            mostViewed: this.getMostViewedQuestions()
        };
    }
}

// ============================================
// BÚSQUEDA DE FAQ (Para fase 2)
// ============================================
class FAQSearch {
    constructor() {
        this.allFAQs = [];
        this.collectFAQs();
    }
    
    collectFAQs() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.question-text').textContent;
            const answer = item.querySelector('.faq-answer').textContent;
            
            this.allFAQs.push({
                element: item,
                question: question.toLowerCase(),
                answer: answer.toLowerCase()
            });
        });
    }
    
    search(query) {
        if (!query || query.length < 3) {
            return this.allFAQs.map(faq => faq.element);
        }
        
        query = query.toLowerCase();
        
        const results = this.allFAQs.filter(faq => {
            return faq.question.includes(query) || faq.answer.includes(query);
        });
        
        return results.map(faq => faq.element);
    }
    
    highlightResults(elements) {
        // Ocultar todos
        this.allFAQs.forEach(faq => {
            faq.element.style.display = 'none';
        });
        
        // Mostrar solo resultados
        elements.forEach(element => {
            element.style.display = 'block';
        });
    }
    
    showAll() {
        this.allFAQs.forEach(faq => {
            faq.element.style.display = 'block';
        });
    }
}

// ============================================
// UTILIDADES
// ============================================

// Cerrar todas las preguntas
function closeAllQuestions() {
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
}

// Abrir todas las preguntas
function openAllQuestions() {
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.add('active');
    });
}

// Cerrar todas las categorías
function closeAllCategories() {
    document.querySelectorAll('.faq-category').forEach(category => {
        category.classList.remove('active');
    });
}

// Abrir todas las categorías
function openAllCategories() {
    document.querySelectorAll('.faq-category').forEach(category => {
        category.classList.add('active');
    });
}

// Scroll a una categoría específica
function scrollToCategory(categoryName) {
    const categories = document.querySelectorAll('.category-title');
    
    categories.forEach(title => {
        if (title.textContent.toLowerCase().includes(categoryName.toLowerCase())) {
            const category = title.closest('.faq-category');
            
            // Abrir categoría
            category.classList.add('active');
            
            // Scroll suave
            const yOffset = -100;
            const y = category.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    });
}

// Buscar pregunta por texto
function findQuestion(searchText) {
    const questions = document.querySelectorAll('.question-text');
    
    questions.forEach(question => {
        if (question.textContent.toLowerCase().includes(searchText.toLowerCase())) {
            const faqItem = question.closest('.faq-item');
            
            // Abrir pregunta
            faqItem.classList.add('active');
            
            // Abrir su categoría si está dentro de una
            const category = faqItem.closest('.faq-category');
            if (category) {
                category.classList.add('active');
            }
            
            // Scroll suave
            setTimeout(() => {
                const yOffset = -100;
                const y = faqItem.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }, 300);
        }
    });
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl + K: Abrir búsqueda (para fase 2)
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            console.log('Búsqueda activada (Fase 2)');
        }
        
        // Ctrl + O: Abrir todas las preguntas
        if (e.ctrlKey && e.key === 'o') {
            e.preventDefault();
            openAllQuestions();
        }
        
        // Ctrl + C: Cerrar todas las preguntas
        if (e.ctrlKey && e.key === 'c') {
            e.preventDefault();
            closeAllQuestions();
        }
    });
}

// ============================================
// PRINT STATS (PARA DEBUGGING)
// ============================================
function showFAQStats() {
    const faqManager = window.faqManager;
    if (faqManager) {
        const stats = faqManager.getStats();
        console.table(stats);
        
        console.log('\n📊 Estadísticas de FAQ:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`Total de visitas: ${stats.totalVisits}`);
        console.log(`Última visita: ${stats.lastVisit}`);
        console.log(`Preguntas vistas: ${stats.questionsViewed.length}`);
        console.log(`Categorías vistas: ${stats.categoriesViewed.length}`);
        console.log('\nPreguntas más vistas:');
        stats.mostViewed.forEach((q, i) => {
            console.log(`${i + 1}. ${q.text} (${q.count} veces)`);
        });
    }
}

// Reset de estadísticas
function resetFAQStats() {
    localStorage.removeItem('faqStats');
    console.log('✅ Estadísticas de FAQ reseteadas');
    location.reload();
}

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar FAQ Manager
    window.faqManager = new FAQManager();
    
    // Track visita
    window.faqManager.trackVisit();
    
    // Inicializar búsqueda (para fase 2)
    window.faqSearch = new FAQSearch();
    
    // Inicializar keyboard shortcuts
    initKeyboardShortcuts();
    
    // Scroll suave al inicio
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Log stats en consola
    console.log('FAQ Manager initialized');
    console.log('Tip: Usa showFAQStats() para ver estadísticas');
    console.log('Keyboard shortcuts:');
    console.log('  Ctrl+O: Abrir todas las preguntas');
    console.log('  Ctrl+C: Cerrar todas las preguntas');
});

// Hacer funciones disponibles globalmente
window.showFAQStats = showFAQStats;
window.resetFAQStats = resetFAQStats;
window.closeAllQuestions = closeAllQuestions;
window.openAllQuestions = openAllQuestions;
window.closeAllCategories = closeAllCategories;
window.openAllCategories = openAllCategories;
window.scrollToCategory = scrollToCategory;
window.findQuestion = findQuestion;