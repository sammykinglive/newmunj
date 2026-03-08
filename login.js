// login.js - Email and Password login system

// Member credentials database with EMAIL addresses
const memberCredentials = {
    'jonathan.harrington@aethelvault.com': {
        password: 'harrington2025',
        memberId: 'JHARRINGTON',
        name: 'Jonathan Harrington'
    },
    'james.smith@aethelvault.com': {
        password: 'smith123',
        memberId: 'SMITHJ',
        name: 'James Smith'
    },
    'li.wong@aethelvault.com': {
        password: 'wong2024',
        memberId: 'WONGL',
        name: 'Li Wei Wong'
    },
    'carlos.rodriguez@aethelvault.com': {
        password: 'rodriguez2025',
        memberId: 'RODRIGUEZ',
        name: 'Carlos Rodriguez'
    },
    // Add your new member HERE with EMAIL
    'rita@gmail.com': {
        password: 'rita2026',
        memberId: 'RITA',
        name: 'Rita Aryee'
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('memberLoginForm');
    const errorMessage = document.getElementById('errorMessage');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim().toLowerCase();
            const password = document.getElementById('password').value.trim();
            
            // Clear any previous error
            if (errorMessage) {
                errorMessage.style.display = 'none';
            }
            
            // Check if email exists and password matches
            if (memberCredentials[email] && memberCredentials[email].password === password) {
                // Store member info for dashboard
                localStorage.setItem('vaultMember', memberCredentials[email].memberId);
                localStorage.setItem('memberEmail', email);
                localStorage.setItem('memberName', memberCredentials[email].name);
                localStorage.setItem('lastAccess', new Date().toLocaleString());
                localStorage.setItem('sessionStart', new Date().toISOString());
                
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            } else {
                // Show error message
                if (errorMessage) {
                    errorMessage.textContent = 'Invalid Email or Password';
                    errorMessage.style.display = 'block';
                } else {
                    alert('Invalid Email or Password');
                }
            }
        });
    }
    
    // Add floating label effect
    const inputs = document.querySelectorAll('.input-group input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.borderColor = '#d4af37';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.borderColor = '#2f3846';
        });
    });
});

// Function to add new member (for admin use)
function addNewMember(email, password, memberId, fullName) {
    memberCredentials[email.toLowerCase()] = {
        password: password,
        memberId: memberId.toUpperCase(),
        name: fullName
    };
    console.log(`Member ${fullName} added successfully with email ${email}`);
}