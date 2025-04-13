function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast';

    if (type === 'error') {
        toast.classList.add('error');
    } else if (type === 'success') {
        toast.classList.add('success');
    }

    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Password Reset Modal Logic
const forgotModal = document.getElementById('forgotModal');
const forgotLink = document.querySelector('.forgot-link');
const closeModal = document.querySelector('.close-modal');
const steps = document.querySelectorAll('.step');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const forgotEmail = document.getElementById('forgotEmail');
const otpInputs = document.querySelectorAll('.otp-input');
const newPassword = document.getElementById('newPassword');
const confirmPassword = document.getElementById('confirmPassword');
const resendOtp = document.getElementById('resendOtp');
const countdown = document.getElementById('countdown');
const otpError = document.getElementById('otpError');
const passwordError = document.getElementById('passwordError');

let currentStep = 1;
let email = '';
let countdownInterval;
let timeLeft = 60;

// Open modal when forgot password is clicked
forgotLink.addEventListener('click', (e) => {
    e.preventDefault();
    forgotModal.classList.add('show');
});

// Close modal
closeModal.addEventListener('click', () => {
    closeForgotModal();
});

// Close modal when clicking outside
forgotModal.addEventListener('click', (e) => {
    if (e.target === forgotModal) {
        closeForgotModal();
    }
});

function closeForgotModal() {
    forgotModal.classList.remove('show');
    resetModal();
}

function resetModal() {
    currentStep = 1;
    updateSteps();
    forgotEmail.value = '';
    otpInputs.forEach(input => input.value = '');
    newPassword.value = '';
    confirmPassword.value = '';
    otpError.style.display = 'none';
    passwordError.style.display = 'none';
    clearInterval(countdownInterval);
    timeLeft = 60;
    updateCountdown();
}

function updateSteps() {
    steps.forEach(step => step.classList.remove('active'));
    document.getElementById(`step${currentStep}`).classList.add('active');

    prevBtn.style.display = currentStep === 1 ? 'none' : 'block';

    if (currentStep === 3) {
        nextBtn.textContent = 'Reset Password';
    } else {
        nextBtn.textContent = 'Next';
    }
}

function startCountdown() {
    clearInterval(countdownInterval);
    timeLeft = 60;
    updateCountdown();
    resendOtp.classList.add('disabled');

    countdownInterval = setInterval(() => {
        timeLeft--;
        updateCountdown();

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            resendOtp.classList.remove('disabled');
        }
    }, 1000);
}

function updateCountdown() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    countdown.textContent = `Resend available in ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

function getOtp() {
    let otp = '';
    otpInputs.forEach(input => {
        otp += input.value;
    });
    return otp;
}

// OTP input auto-focus
otpInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
        if (e.target.value.length === 1 && index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && index > 0 && e.target.value.length === 0) {
            otpInputs[index - 1].focus();
        }
    });
});

// Next/Previous button logic
nextBtn.addEventListener('click', async () => {
    if (currentStep === 1) {
        // Step 1: Send OTP
        email = forgotEmail.value.trim();
        if (!email) {
            showToast('Please enter your email address', 'error');
            return;
        }

        try {
            nextBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending';
            nextBtn.disabled = true;

            const response = await fetch('http://localhost:8080/api/v1/auth/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            if (!response.ok) {
                throw new Error('Failed to send OTP');
            }

            currentStep++;
            updateSteps();
            startCountdown();
            showToast('OTP sent to your email', 'success');
        } catch (error) {
            showToast(error.message || 'Failed to send OTP', 'error');
        } finally {
            nextBtn.innerHTML = 'Next';
            nextBtn.disabled = false;
        }
    } else if (currentStep === 2) {
        // Step 2: Verify OTP
        const otp = getOtp();
        if (otp.length !== 6) {
            otpError.textContent = 'Please enter a 6-digit OTP';
            otpError.style.display = 'block';
            return;
        }

        // Move to password step without verification yet
        currentStep++;
        updateSteps();
        otpError.style.display = 'none';

    } else if (currentStep === 3) {
        // Step 3: Verify OTP and Reset Password (combined as per your backend)
        const otp = getOtp();
        const password = newPassword.value;
        const confirm = confirmPassword.value;

        if (password !== confirm) {
            passwordError.textContent = 'Passwords do not match';
            passwordError.style.display = 'block';
            return;
        }

        if (password.length < 6) {
            passwordError.textContent = 'Password must be at least 6 characters';
            passwordError.style.display = 'block';
            return;
        }

        try {
            nextBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Resetting';
            nextBtn.disabled = true;

            const response = await fetch('http://localhost:8080/api/v1/auth/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    otp: otp,
                    newPassword: password
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to reset password');
            }

            showToast('Password reset successfully!', 'success');

            // Auto-fill the login form with the reset credentials
            document.getElementById('email').value = email;
            document.getElementById('password').value = password;

            setTimeout(() => {
                closeForgotModal();
            }, 1500);
        } catch (error) {
            showToast(error.message, 'error');
        } finally {
            nextBtn.innerHTML = 'Reset Password';
            nextBtn.disabled = false;
        }
    }
});

prevBtn.addEventListener('click', () => {
    if (currentStep > 1) {
        currentStep--;
        updateSteps();
    }
});

// Resend OTP
resendOtp.addEventListener('click', async () => {
    if (resendOtp.classList.contains('disabled')) return;

    try {
        resendOtp.classList.add('disabled');
        showToast('Resending OTP...', 'info');

        const response = await fetch('http://localhost:8080/api/v1/auth/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        if (!response.ok) {
            throw new Error('Failed to resend OTP');
        }

        startCountdown();
        showToast('OTP resent to your email', 'success');
    } catch (error) {
        showToast(error.message || 'Failed to resend OTP', 'error');
        resendOtp.classList.remove('disabled');
    }
});
