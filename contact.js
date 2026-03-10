// contact.js - Handle contact form AJAX submission

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
            
            // Hide any previous status
            if (formStatus) {
                formStatus.style.display = 'none';
                formStatus.className = 'form-status';
            }
            
            // Collect form data
            const formData = new FormData(contactForm);
            
            // Send AJAX request
            fetch('contact.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // Show status message
                if (formStatus) {
                    formStatus.textContent = data.message;
                    formStatus.className = 'form-status ' + (data.success ? 'success' : 'error');
                    formStatus.style.display = 'block';
                    
                    // If success, reset form
                    if (data.success) {
                        contactForm.reset();
                        
                        // Redirect if specified
                        if (data.redirect) {
                            setTimeout(() => {
                                window.location.href = data.redirect;
                            }, 2000);
                        }
                    }
                    
                    // Scroll to status message
                    formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                if (formStatus) {
                    formStatus.textContent = 'Network error. Please try again.';
                    formStatus.className = 'form-status error';
                    formStatus.style.display = 'block';
                }
            })
            .finally(() => {
                // Restore button
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Submit Inquiry <i class="fas fa-arrow-right"></i>';
                
                // Hide status after 5 seconds on success
                if (formStatus && formStatus.classList.contains('success')) {
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                    }, 5000);
                }
            });
        });
    }
});




// Force login trigger to work
document.addEventListener('DOMContentLoaded', function() {
  // Find all login triggers
  const loginTriggers = document.querySelectorAll('.login-trigger');
  
  loginTriggers.forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      e.preventDefault(); // Remove this line if you want normal navigation
      
      // Force redirect to login page
      window.location.href = 'login.html';
      
      // Close mobile menu if open
      const menuToggle = document.getElementById('menuToggle');
      const mainNav = document.getElementById('mainNav');
      const body = document.body;
      
      if (menuToggle && menuToggle.classList.contains('active')) {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        body.classList.remove('menu-open');
      }
    });
  });
});