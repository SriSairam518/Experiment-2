document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const inputs = form.querySelectorAll('input');

    const validateField = (input) => {
        const errorElement = document.getElementById(`${input.id}Error`);
        let isValid = true;
        let errorMessage = '';

        // Reset styles
        input.classList.remove('error', 'success');
        errorElement.textContent = '';

        // Required check
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        // Email validation
        else if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value.trim())) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        // Password length check
        else if (input.id === 'password') {
            if (input.value.length < 8) {
                isValid = false;
                errorMessage = 'Password must be at least 8 characters';
            }
        }
        // Confirm password check
        else if (input.id === 'confirmPassword') {
            const password = document.getElementById('password').value;
            if (input.value !== password) {
                isValid = false;
                errorMessage = 'Passwords do not match';
            }
        }

        if (!isValid) {
            input.classList.add('error');
            errorElement.textContent = errorMessage;
        } else {
            input.classList.add('success');
        }

        return isValid;
    };

    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isFormValid = true;

        inputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            // Simulate API call
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Creating Account...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Registration successful! Welcome aboard.');
                form.reset();
                inputs.forEach(input => input.classList.remove('success'));
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        }
    });
});
