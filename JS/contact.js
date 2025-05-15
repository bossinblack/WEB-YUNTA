// contact.js
document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById('contactForm');
    
    // Validación en tiempo real
    contactForm.addEventListener('input', function(e) {
        const input = e.target;
        if (input.validity.valid) {
            input.classList.remove('invalid');
        } else {
            input.classList.add('invalid');
        }
    });

    // Manejo del envío
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value.trim()
        };

        if (validateForm(formData)) {
            try {
                // Simular envío a API
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                showNotification('✅ Mensaje enviado correctamente', 'success');
                contactForm.reset();
            } catch (error) {
                showNotification('❌ Error al enviar el mensaje', 'error');
            }
        }
    });

    function validateForm(data) {
        let isValid = true;
        
        // Validar nombre
        if (data.name.length < 3) {
            showError('name', 'Nombre debe tener al menos 3 caracteres');
            isValid = false;
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showError('email', 'Ingrese un email válido');
            isValid = false;
        }

        // Validar teléfono
        const phoneRegex = /^[0-9]{10,15}$/;
        if (!phoneRegex.test(data.phone)) {
            showError('phone', 'Teléfono inválido');
            isValid = false;
        }

        // Validar asunto
        if (data.subject === '') {
            showError('subject', 'Seleccione un asunto');
            isValid = false;
        }

        // Validar mensaje
        if (data.message.length < 10) {
            showError('message', 'Mensaje demasiado corto');
            isValid = false;
        }

        return isValid;
    }

    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        field.classList.add('invalid');
        
        let errorElement = field.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            field.parentNode.insertBefore(errorElement, field.nextSibling);
        }
        errorElement.textContent = message;
    }

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <div class="progress-bar"></div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
});