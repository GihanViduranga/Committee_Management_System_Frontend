/*
// Main navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get navigation links
    const dashboardLink = document.getElementById('dashboard');
    const profileLink = document.getElementById('updateProfile');
    const membershipFeeLink = document.getElementById('membershipFee');

// Get content sections
    const mainContent = document.getElementById('mainContent');
    const memberDetails = document.getElementById('memberDetails');
    const memberFeeContent = document.getElementById('memberFee');

    // Initially hide memberDetails section
    if (memberDetails) {
        memberDetails.style.display = 'none';
    }

    // Initially hide memberFee section
    if (memberFeeContent) {
        memberFeeContent.style.display = 'none';
    }

    // Handle dashboard link click
    dashboardLink.addEventListener('click', function(event) {
        event.preventDefault();

        // Update active class for navigation
        setActiveNavLink(dashboardLink);

        // Show main content, hide other sections
        mainContent.style.display = 'block';
        if (memberDetails) memberDetails.style.display = 'none';
        if (memberFeeContent) memberFeeContent.style.display = 'none';
    });

    // Handle profile link click
    profileLink.addEventListener('click', function(event) {
        event.preventDefault();

        // Update active class for navigation
        setActiveNavLink(profileLink);

        // Show member details, hide other sections
        mainContent.style.display = 'none';
        if (memberDetails) memberDetails.style.display = 'block';
        if (memberFeeContent) memberFeeContent.style.display = 'none';
    });

    // Handle membership fee link click
    membershipFeeLink.addEventListener('click', function(event) {
        event.preventDefault();

        // Update active class for navigation
        setActiveNavLink(membershipFeeLink);

        // Show membership fee, hide other sections
        mainContent.style.display = 'none';
        if (memberDetails) memberDetails.style.display = 'none';
        if (memberFeeContent) memberFeeContent.style.display = 'block';
    });

    // Function to set active nav link
    function setActiveNavLink(activeLink) {
        // Remove active class from all links
        dashboardLink.classList.remove('active');
        profileLink.classList.remove('active');
        membershipFeeLink.classList.remove('active');

        // Add active class to clicked link
        activeLink.classList.add('active');
    }
});
*/

// Main navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const dashboardLink = document.getElementById('dashboard');
    const profileLink = document.getElementById('updateProfile');
    const membershipFeeLink = document.getElementById('membershipFee');
    const meetingLink = document.getElementById('MeetingTbl');

    const mainContent = document.getElementById('mainContent');
    const memberDetails = document.getElementById('memberDetails');
    const memberFee = document.getElementById('memberFee');
    const Meeting = document.getElementById('meeting');

    // Set initial state
    mainContent.style.display = 'block';
    memberDetails.style.display = 'none';
    memberFee.style.display = 'none';
    Meeting.style.display = 'none';
    dashboardLink.classList.add('active');

    // Navigation click handlers
    dashboardLink.addEventListener('click', function(e) {
        e.preventDefault();
        switchSection(mainContent, dashboardLink);
    });

    profileLink.addEventListener('click', function(e) {
        e.preventDefault();
        switchSection(memberDetails, profileLink);
    });

    membershipFeeLink.addEventListener('click', function(e) {
        e.preventDefault();
        switchSection(memberFee, membershipFeeLink);
    });

    meetingLink.addEventListener('click', function(e) {
        e.preventDefault();
        switchSection(Meeting, meetingLink);
    });

    function switchSection(sectionToShow, linkToActivate) {
        // Hide all sections
        [mainContent, memberDetails, memberFee, Meeting].forEach(section => {
            section.style.display = 'none';
        });

        // Remove active class from all links
        [dashboardLink, profileLink, membershipFeeLink,meetingLink].forEach(link => {
            link.classList.remove('active');
        });

        // Show selected section and activate link
        sectionToShow.style.display = 'block';
        linkToActivate.classList.add('active');
    }
});

// Logout functionality
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        alert('Logged out successfully!');
        // Redirect to login page or handle logout
        // window.location.href = 'login.html';
    }
}