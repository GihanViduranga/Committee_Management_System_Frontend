// Main navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get navigation links
    const dashboardLink = document.getElementById('dashboard');
    const profileLink = document.getElementById('updateProfile');
    const membershipFeeLink = document.getElementById('membershipFee');

    // Get content sections
    const mainContent = document.getElementById('mainContent');
    const memberDetails = document.getElementById('memberDetails');
    const memberFee = document.getElementById('memberFee');

    // Initially hide memberDetails section
    if (memberDetails) {
        memberDetails.style.display = 'none';
    }

    // Initially hide memberFee section
    if (memberFee) {
        memberFee.style.display = 'none';
    }

    // Handle dashboard link click
    dashboardLink.addEventListener('click', function(event) {
        event.preventDefault();

        // Update active class for navigation
        setActiveNavLink(dashboardLink);

        // Show main content, hide other sections
        mainContent.style.display = 'block';
        if (memberDetails) memberDetails.style.display = 'none';
        if (memberFee) memberFee.style.display = 'none';
    });

    // Handle profile link click
    profileLink.addEventListener('click', function(event) {
        event.preventDefault();

        // Update active class for navigation
        setActiveNavLink(profileLink);

        // Show member details, hide other sections
        mainContent.style.display = 'none';
        if (memberDetails) memberDetails.style.display = 'block';
        if (memberFee) memberFee.style.display = 'none';
    });

    // Handle membership fee link click
    membershipFeeLink.addEventListener('click', function(event) {
        event.preventDefault();

        // Update active class for navigation
        setActiveNavLink(membershipFeeLink);

        // Show membership fee, hide other sections
        mainContent.style.display = 'none';
        if (memberDetails) memberDetails.style.display = 'none';
        if (memberFee) memberFee.style.display = 'block';
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

// Member form functionality
/*function initMemberForm() {
    const memberForm = document.getElementById('memberForm');
    const clearBtn = document.getElementById('clearBtn');
    const memberTable = document.getElementById('memberTable');

    if (!memberForm || !clearBtn || !memberTable) {
        console.warn('Member form elements not found');
        return;
    }

    // Generate a unique member ID when the form is loaded
    const memberIdInput = document.getElementById('memberId');
    if (memberIdInput) {
        memberIdInput.value = generateMemberId();
    }

    // Clear form button functionality
    clearBtn.addEventListener('click', function() {
        memberForm.reset();
        if (memberIdInput) {
            memberIdInput.value = generateMemberId();
        }
    });

    // Form submission handling
    memberForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Get form data
        const memberId = document.getElementById('memberId').value;
        const fullName = document.getElementById('fullName').value;
        const joinDate = document.getElementById('joinDate').value;
        const nic = document.getElementById('nic').value;
        const positionsHeld = document.getElementById('positionsHeld').value;

        // Add new row to table or update existing row
        const existingRow = document.querySelector(`#memberTable tr[data-id="${memberId}"]`);

        if (existingRow) {
            // Update existing row
            existingRow.cells[1].textContent = fullName;
            existingRow.cells[2].textContent = formatDate(joinDate);
            existingRow.cells[3].textContent = nic;
            existingRow.cells[4].textContent = positionsHeld;
        } else {
            // Create new row
            const tbody = memberTable.querySelector('tbody');
            const newRow = tbody.insertRow();
            newRow.setAttribute('data-id', memberId);

            // Add cells
            const cell1 = newRow.insertCell(0);
            const cell2 = newRow.insertCell(1);
            const cell3 = newRow.insertCell(2);
            const cell4 = newRow.insertCell(3);
            const cell5 = newRow.insertCell(4);
            const cell6 = newRow.insertCell(5);

            // Add content to cells
            cell1.textContent = memberId;
            cell2.textContent = fullName;
            cell3.textContent = formatDate(joinDate);
            cell4.textContent = nic;
            cell5.textContent = positionsHeld;

            // Add action buttons
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.className = 'editBtn';
            editBtn.addEventListener('click', function() {
                editMember(memberId);
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'deleteBtn';
            deleteBtn.addEventListener('click', function() {
                if (confirm('Are you sure you want to delete this member?')) {
                    newRow.remove();
                }
            });

            cell6.appendChild(editBtn);
            cell6.appendChild(deleteBtn);
        }

        // Clear form and generate new ID
        memberForm.reset();
        if (memberIdInput) {
            memberIdInput.value = generateMemberId();
        }

        // Show success message
        alert('Member saved successfully!');
    });

    // Add event listeners to existing edit buttons
    document.querySelectorAll('.editBtn').forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const memberId = row.cells[0].textContent;
            editMember(memberId);
        });
    });

    // Add event listeners to existing delete buttons
    document.querySelectorAll('.deleteBtn').forEach(button => {
        button.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete this member?')) {
                this.closest('tr').remove();
            }
        });
    });
}

// Function to edit member
function editMember(memberId) {
    const row = document.querySelector(`#memberTable tr[data-id="${memberId}"]`) ||
        document.querySelector(`#memberTable td:first-child`);

    if (row) {
        const memberIdInput = document.getElementById('memberId');
        const fullNameInput = document.getElementById('fullName');
        const joinDateInput = document.getElementById('joinDate');
        const nicInput = document.getElementById('nic');
        const positionsHeldInput = document.getElementById('positionsHeld');

        // Get the actual row if we found a cell
        const actualRow = row.tagName === 'TR' ? row : row.closest('tr');

        if (memberIdInput) memberIdInput.value = memberId;
        if (fullNameInput) fullNameInput.value = actualRow.cells[1].textContent;

        // Parse date from table format back to input format
        if (joinDateInput) {
            const displayedDate = actualRow.cells[2].textContent;
            const dateObj = new Date(displayedDate);
            const formattedDate = dateObj.toISOString().split('T')[0];
            joinDateInput.value = formattedDate;
        }

        if (nicInput) nicInput.value = actualRow.cells[3].textContent;
        if (positionsHeldInput) positionsHeldInput.value = actualRow.cells[4].textContent;

        // Scroll to form
        const memberForm = document.getElementById('memberForm');
        if (memberForm) {
            memberForm.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Helper function to generate member ID
function generateMemberId() {
    return Math.floor(1000 + Math.random() * 9000);
}

// Helper function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Extend jQuery-like functionality for older browsers
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;
        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}

// Theme toggler functionality
const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', function() {
        document.body.setAttribute('data-theme',
            document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
}*/

// Logout functionality
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        alert('Logged out successfully!');
        // Redirect to login page or handle logout
        // window.location.href = 'login.html';
    }
}