// Your existing code
function logout() {
    // Add logout functionality here
    window.location.href = "login.html";
}

// Add animation classes on scroll
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.animate__animated');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(entry.target.dataset.animate);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animateElements.forEach(element => {
        observer.observe(element);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", logout);
    }

    let Dashboard = document.getElementById("dashboard");
    let UpdateProfile = document.getElementById("updateProfile");
    let MembershipFee = document.getElementById("membershipFee");

    let MainContent = document.getElementById("mainContent");
    let MemberUpdate = document.getElementById("profileUpdate");
    let MemberFee = document.getElementById("memberFee");

    MainContent.style.display = "block";
    MemberUpdate.style.display = "none";
    MemberFee.style.display = "none";
    Dashboard.classList.add('active'); // Add active class to Dashboard initially

    // Toggle dashboard and update profile sections with color change
    Dashboard.addEventListener("click", (e) => {
        e.preventDefault();
        MainContent.style.display = "block";
        MemberUpdate.style.display = "none";
        MemberFee.style.display = "none";

        Dashboard.classList.add('active');
        UpdateProfile.classList.remove('active');
        MembershipFee.classList.remove('active');
    });

    UpdateProfile.addEventListener("click", (e) => {
        e.preventDefault();
        MainContent.style.display = "none";
        MemberUpdate.style.display = "block";
        MemberFee.style.display = "none";

        UpdateProfile.classList.add('active');
        Dashboard.classList.remove('active');
        MembershipFee.classList.remove('active');
    });

    MembershipFee.addEventListener("click", (e) => {
        e.preventDefault();
        MainContent.style.display = "none";
        MemberUpdate.style.display = "none";
        MemberFee.style.display = "block";

        MembershipFee.classList.add('active');
        Dashboard.classList.remove('active');
        UpdateProfile.classList.remove('active');
    })
});