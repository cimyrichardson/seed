// Gestion du formulaire de liste d'attente
document.addEventListener('DOMContentLoaded', function() {
    const waitlistForm = document.getElementById('waitlist-form');
    const submitButton = waitlistForm.querySelector('.submit-button');
    
    waitlistForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        
        // Validation simple
        if (!name) {
            showNotification('Erreur de validation', 'Le nom est requis', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Erreur de validation', 'Email invalide', 'error');
            return;
        }
        
        // Désactiver le bouton
        submitButton.disabled = true;
        submitButton.textContent = 'Envoi...';
        
        try {
            // Simulation d'envoi
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            showNotification('Inscription réussie !', 'Vous recevrez bientôt des mises à jour.', 'success');
            
            // Réinitialiser le formulaire
            waitlistForm.reset();
            
        } catch (error) {
            showNotification('Erreur', 'Une erreur est survenue. Veuillez réessayer.', 'error');
        } finally {
            // Réactiver le bouton
            submitButton.disabled = false;
            submitButton.textContent = 'Rejoindre maintenant';
        }
    });
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showNotification(title, message, type) {
        // Créer une notification simple
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#ef4444' : '#10b981'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            max-width: 400px;
        `;
        
        notification.innerHTML = `
            <strong>${title}</strong>
            <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem;">${message}</p>
        `;
        
        document.body.appendChild(notification);
        
        // Supprimer après 5 secondes
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
    
    // Animation au scroll
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
    
    // Observer les éléments à animer
    document.querySelectorAll('.feature-card, .subject-card, .step-item, .benefit-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
