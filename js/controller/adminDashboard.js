// Function to load the form
function loadForm(){
    document.getElementById('loadFormButton').addEventListener('click', function() {
        document.getElementById('form').style.display = 'block'; // Show the form
    });
}

// Function to load dynamic content
function loadContent(contentId) {
    const dynamicContent = document.getElementById('dynamicContent');
    let content = '';

    switch (contentId) {
        case 'updateUser':
            content = `
<div class="container">
    <!-- User Table -->
    <h3>User List</h3>
    <div class="table-responsive">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>User ID</th>
                    <th>Full Name</th>
                    <th>Birthday</th>
                    <th>Address</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Active Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody id="userTableBody">
                <!-- User rows will be dynamically added here -->
            </tbody>
        </table>
    </div>
    
    <!-- Pagination Controls -->
    <div class="d-flex justify-content-between align-items-center mt-3 mb-4">
        <div>
            <span>Showing <span id="currentEntries">0</span> of <span id="totalEntries">0</span> entries</span>
        </div>
        <div>
            <select id="pageSize" class="form-select form-select-sm d-inline-block me-2" style="width: auto;">
                <option value="5">5</option>
                <option value="10" selected>10</option>
                <option value="25">25</option>
                <option value="50">50</option>
            </select>
            <div class="btn-group" id="paginationControls">
                <button class="btn btn-outline-secondary" id="prevPage">Previous</button>
                <div id="pageNumbers" class="btn-group"></div>
                <button class="btn btn-outline-secondary" id="nextPage">Next</button>
            </div>
        </div>
    </div>

    <!-- Update User Form (Initially Hidden) -->
    <div class="form-container" id="updateUserFormContainer" style="display: none;">
        <h3>Update User</h3>
        <form id="updateUserForm">
            <!-- Hidden input for userId -->
            <input type="hidden" id="userId" name="userId" value="">

            <!-- Full Name -->
            <div class="mb-3">
                <label for="fullName" class="form-label">Full Name</label>
                <input type="text" class="form-control" id="fullName" name="fullName" disabled>
            </div>

            <!-- Birthday -->
            <div class="mb-3">
                <label for="birthday" class="form-label">Birthday</label>
                <input type="date" class="form-control" id="birthday" name="birthday" disabled>
            </div>

            <!-- Address -->
            <div class="mb-3">
                <label for="address" class="form-label">Address</label>
                <input type="text" class="form-control" id="address" name="address" disabled>
            </div>

            <!-- Phone Number -->
            <div class="mb-3">
                <label for="phoneNumber" class="form-label">Phone Number</label>
                <input type="tel" class="form-control" id="phoneNumber" name="phoneNumber" disabled>
            </div>

            <!-- Email -->
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" name="email" disabled>
            </div>

            <!-- Password 
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" name="password" required>
            </div>-->

            <!-- Role -->
            <div class="mb-3">
                <label for="role" class="form-label">Role</label>
                <select class="form-select" id="role" name="role" required>
                    <option value="ADMIN">Admin</option>
                    <option value="MEMBER">Member</option>
                </select>
            </div>

            <!--&lt;!&ndash; isActive Radio Button &ndash;&gt;
            <div class="mb-3">
                <label class="form-label">Active Status</label>
                <div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="isActive" id="isActiveTrue" value="true" required>
                        <label class="form-check-label" for="isActiveTrue">Active</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="isActive" id="isActiveFalse" value="false">
                        <label class="form-check-label" for="isActiveFalse">Inactive</label>
                    </div>
                </div>
            </div>-->

            <!-- Submit Button -->
            <button type="submit" class="btn btn-primary" onclick="loadForm()">Update</button>
            <!-- Cancel Button -->
            <button type="button" class="btn btn-secondary" onclick="hideForm()">Cancel</button>
        </form>
    </div>
</div>`
            // Load users after the content is loaded
            setTimeout(initializeUserManagement, 100);
            break;
        // Other cases remain unchanged
        case 'members':
            content = `<h3>Members Content</h3>`;
            break;
        case 'meetings':
            content = `<h3>Meetings Content</h3>`;
            break;
        case 'events':
            content = `<h3>Events Content</h3>
     <div class="form-container">
        <h1>Create Event</h1>
        <form id="eventForm">
            <!-- Event ID -->
            <div class="form-group">
                <label for="eventId">Event ID</label>
                <input type="number" class="form-control" id="eventId" name="eventId" disabled>
            </div>

            <!-- Event Title -->
            <div class="form-group">
                <label for="eventTitle">Event Title</label>
                <input type="text" class="form-control" id="eventTitle" name="eventTitle" required>
            </div>

            <!-- Description -->
            <div class="form-group">
                <label for="description">Description</label>
                <textarea class="form-control" id="description" name="description" rows="3" required></textarea>
            </div>

            <!-- Start Date and End Date (Left and Right) -->
            <div class="two-column">
                <div class="form-group">
                    <label for="startDateTime">Start Date and Time</label>
                    <input type="datetime-local" class="form-control" id="startDateTime" name="startDateTime" required>
                </div>
                <div class="form-group">
                    <label for="endDateTime">End Date and Time</label>
                    <input type="datetime-local" class="form-control" id="endDateTime" name="endDateTime" required>
                </div>
            </div>

            <!-- Admin Name and Admin ID (Left and Right) -->
            <div class="two-column">
                <div class="form-group">
                    <label for="adminName">Admin Name</label>
                    <select class="form-select" id="adminName" name="adminName" required>
                        <option value="" disabled selected>Select an Admin Name</option>
                        <!-- Populated dynamically -->
                    </select>
                </div>
                <div class="form-group">
                    <label for="adminID">Admin ID</label>
                    <select class="form-select" id="adminID" name="adminID" required>
                        <option value="" disabled selected>Select an Admin ID</option>
                        <!-- Populated dynamically -->
                    </select>
                </div>
            </div>

            <!-- Event Type and Event Type ID (Left and Right) -->
            <div class="two-column">
                <div class="form-group">
                    <label for="eventType">Event Type</label>
                    <select class="form-select" id="eventType" name="eventType" required>
                        <option value="" disabled selected>Select an Event Type</option>
                        <!-- Populated dynamically -->
                    </select>
                </div>
                <div class="form-group">
                    <label for="eventTypeID">Event Type ID</label>
                    <select class="form-select" id="eventTypeID" name="eventTypeID" required>
                        <option value="" disabled selected>Select an Event Type ID</option>
                        <!-- Populated dynamically -->
                    </select>
                </div>
            </div>

            <!-- Event Facilities -->
            <div class="form-group">
                <label for="eventFacilities">Event Facilities</label>
                <select class="form-select" id="eventFacilities" name="eventFacilities" multiple required>
                    <!-- Populated dynamically -->
                </select>
            </div>

            <!-- Submit Button -->
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>

            `;
            break;
        case 'eventFacility':
            content = `<h3>Event Facility Content</h3>`;
            break;
        case 'eventType':
            content = `<h3>Event Type Content</h3>`;
            break;
        case 'meetingAttendance':
            content = `<h3>Meeting Attendance Content</h3>`;
            break;
        default:
            content = `
                        <div class="row">
                            <div class="col-md-3">
                                <div class="card text-center p-4">
                                    <i class="fas fa-users card-icon"></i>
                                    <h5 class="mt-3">Users</h5>
                                    <p class="text-muted">Total: 1,234</p>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="card text-center p-4">
                                    <i class="fas fa-chart-line card-icon"></i>
                                    <h5 class="mt-3">Revenue</h5>
                                    <p class="text-muted">$12,345</p>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="card text-center p-4">
                                    <i class="fas fa-shopping-cart card-icon"></i>
                                    <h5 class="mt-3">Orders</h5>
                                    <p class="text-muted">Total: 567</p>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="card text-center p-4">
                                    <i class="fas fa-tasks card-icon"></i>
                                    <h5 class="mt-3">Tasks</h5>
                                    <p class="text-muted">Completed: 89%</p>
                                </div>
                            </div>
                        </div>
                    `;
    }

    dynamicContent.innerHTML = content;

    // Set up event listeners for forms after content is added
    if (contentId === 'updateUser') {
        setupUserFormListeners();
    }
}

// Add event listeners to sidebar links
document.querySelectorAll('.sidebar .nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        // Remove active class from all links
        document.querySelectorAll('.sidebar .nav-link').forEach(link => link.classList.remove('active'));
        // Add active class to the clicked link
        this.classList.add('active');
        // Load the corresponding content
        const contentId = this.getAttribute('data-content');
        loadContent(contentId);
    });
});

// Load default content (Dashboard)
document.addEventListener('DOMContentLoaded', function() {
    loadContent('dashboard');
});

///////////////////////////////////////////////////////////////////////////////
/*User Activation*/
///////////////////////////////////////////////////////////////////////////////

// Set up event listeners for the user form
function setupUserFormListeners() {
    const updateUserForm = document.getElementById('updateUserForm');

    if (updateUserForm) {
        updateUserForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the default form submission

            // Get the form data
            const userId = document.getElementById('userId').value;
            const fullName = document.getElementById('fullName').value;
            const birthday = document.getElementById('birthday').value;
            const address = document.getElementById('address').value;
            const phoneNumber = document.getElementById('phoneNumber').value;
            const email = document.getElementById('email').value;
            const role = document.getElementById('role').value;

            // Create the payload object
            const payload = {
                userId,
                fullName,
                birthday,
                address,
                phoneNumber,
                email,
                role
            };
            console.log(payload)
            // Get the token from localStorage
            const token = localStorage.getItem("authToken");

            if (!token) {
                alert("You are not authenticated. Please log in.");
                return;
            }

            // Send the PUT request to update the user
            fetch('http://localhost:8080/api/v1/User/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`  // Include the token
                },
                body: JSON.stringify(payload)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('User updated successfully:', data);
                    alert('User updated successfully!');
                    hideForm();  // Hide the form after successful update
                    loadUsers(); // Reload the user list
                })
                .catch(error => {
                    console.error('Error updating user:', error);
                    alert('Error updating user. Please try again.');
                });
        });
    }
}

///////////////////////////////////////////////////////////////////////////////
/*User Update and Table Load*/
///////////////////////////////////////////////////////////////////////////////

// Function to show the edit form with user data
function showEditForm(userId, fullName, birthday, address, phoneNumber, email, role, isActive) {
    // Set values in the form
    document.getElementById('userId').value = userId;
    document.getElementById('fullName').value = fullName;
    document.getElementById('birthday').value = formatDateForInput(birthday);
    document.getElementById('address').value = address;
    document.getElementById('phoneNumber').value = phoneNumber;
    document.getElementById('email').value = email;
    /*document.getElementById('password').value = ''; // Clear password field for security*/

    // Set the role dropdown
    const roleSelect = document.getElementById('role');
    for (let i = 0; i < roleSelect.options.length; i++) {
        if (roleSelect.options[i].value === role) {
            roleSelect.selectedIndex = i;
            break;
        }
    }

    // Set the active status radio buttons
    /*if (isActive) {
        document.getElementById('isActiveTrue').checked = isActive;
    } else {
        document.getElementById('isActiveFalse').checked = isActive;
    }*/

    // Show the form
    document.getElementById('updateUserFormContainer').style.display = 'block';

    // Scroll to the form
    document.getElementById('updateUserFormContainer').scrollIntoView({ behavior: 'smooth' });
}

// Function to hide the form
function hideForm() {
    document.getElementById('updateUserFormContainer').style.display = 'none';
}

// Helper function to format date for input field (expects MM/DD/YYYY or similar and converts to YYYY-MM-DD)
function formatDateForInput(dateString) {
    if (!dateString) return '';

    try {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
    } catch (e) {
        console.error("Error formatting date:", e);
        return dateString; // Return original if there's an error
    }
}

// Global variables for pagination
let allUsers = [];
let currentPage = 1;
let pageSize = 10;
let totalPages = 1;

// Function to initialize user management
function initializeUserManagement() {
    // Set up pagination event listeners
    document.getElementById('pageSize').addEventListener('change', function() {
        pageSize = parseInt(this.value);
        currentPage = 1; // Reset to first page when changing page size
        displayUsers();
    });

    document.getElementById('prevPage').addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            displayUsers();
        }
    });

    document.getElementById('nextPage').addEventListener('click', function() {
        if (currentPage < totalPages) {
            currentPage++;
            displayUsers();
        }
    });

    // Set up event listeners for activate/deactivate buttons
    document.getElementById('userTableBody').addEventListener('click', function(event) {
        const target = event.target;

        // Check if the clicked element is an activate button or its icon
        if (target.classList.contains('activate-btn') ||
            (target.parentElement && target.parentElement.classList.contains('activate-btn'))) {
            const btn = target.classList.contains('activate-btn') ? target : target.parentElement;
            const userId = btn.getAttribute('data-id');
            activateUser(userId);
        }

        // Check if the clicked element is a deactivate button or its icon
        if (target.classList.contains('deactivate-btn') ||
            (target.parentElement && target.parentElement.classList.contains('deactivate-btn'))) {
            const btn = target.classList.contains('deactivate-btn') ? target : target.parentElement;
            const userId = btn.getAttribute('data-id');
            deactivateUser(userId);
        }
    });

    // Load users
    loadUsers();
}

// Function to load users
function loadUsers() {
    const token = localStorage.getItem("authToken"); // Retrieve the token from localStorage

    if (!token) {
        alert("You are not authenticated. Please log in.");
        return;
    }

    // Show loading indicator if available
    if (typeof toggleLoading === 'function') {
        toggleLoading(true);
    }

    fetch("http://localhost:8080/api/v1/User/getAll", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }

    })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error("Unauthorized");
                }
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(response => {
            if (response.data) {
                allUsers = response.data;
                displayUsers();
            }
        })
        .catch(error => {
            console.error("Error loading users:", error);
            if (error.message === "Unauthorized") {
                alert("Your session has expired. Please log in again.");
                localStorage.removeItem("authToken"); // Clear the invalid token
                window.location.href = "/login"; // Redirect to login page
            } else {
                alert("Failed to load users. Please try again later.");
            }
        })
        .finally(() => {
            // Hide loading indicator if available
            if (typeof toggleLoading === 'function') {
                toggleLoading(false);
            }
        });

}

// Function to display paginated users
function displayUsers() {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, allUsers.length);
    const paginatedUsers = allUsers.slice(startIndex, endIndex);


    // Update table
    const userTableBody = document.getElementById('userTableBody');
    userTableBody.innerHTML = '';

    paginatedUsers.forEach(user => {
        console.log(user.active);//methanata enne undifined
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.userId}</td>
            <td>${user.fullName}</td>
            <td>${formatDate(user.birthday)}</td>
            <td>${user.address}</td>
            <td>${user.phoneNumber}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td class="text-center">
                <span class="badge ${user.active === 'true' ? 'bg-success' : 'bg-danger'}">
                    ${user.active === 'true' ? 'Active' : 'Inactive'}
                </span>
            </td>
            <td>
                <div class="btn-group">
                    <button class="btn btn-warning btn-sm" onclick="showEditForm('${user.userId}', '${user.fullName}', '${user.birthday}', '${user.address}', '${user.phoneNumber}', '${user.email}', '${user.role}', ${user.active})">
                        <i class="fas fa-edit" ></i> Edit
                    </button>
                    ${!user.active ?
            `<button class="btn btn-success btn-sm activate-btn" data-id="${user.userId}">
                            <i class="fas fa-user-check"></i> Activate
                        </button>` :
            `<button class="btn btn-danger btn-sm deactivate-btn" data-id="${user.userId}">
                            <i class="fas fa-user-slash"></i> Deactivate
                        </button>`
        }
                </div>
            </td>
        `;

        userTableBody.appendChild(row);
    });

    // Update pagination information
    document.getElementById('currentEntries').textContent = allUsers.length > 0 ?
        `${startIndex + 1}-${endIndex}` : '0';
    document.getElementById('totalEntries').textContent = allUsers.length;

    // Calculate total pages
    totalPages = Math.ceil(allUsers.length / pageSize);

    // Update page numbers
    updatePageNumbers();

    // Update button states
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage === totalPages;
}

// Function to format date for display
function formatDate(dateString) {
    if (!dateString) return '';

    try {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    } catch (e) {
        console.error("Error formatting date:", e);
        return dateString;
    }
}

// Function to update page number buttons
function updatePageNumbers() {
    const pageNumbersContainer = document.getElementById('pageNumbers');
    pageNumbersContainer.innerHTML = '';

    // Calculate range of pages to show
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    // Adjust startPage if we're near the end
    if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4);
    }

    // Add first page button if not already included
    if (startPage > 1) {
        const firstPageBtn = document.createElement('button');
        firstPageBtn.className = 'btn btn-outline-secondary';
        firstPageBtn.textContent = '1';
        firstPageBtn.addEventListener('click', () => {
            currentPage = 1;
            displayUsers();
        });
        pageNumbersContainer.appendChild(firstPageBtn);

        // Add ellipsis if needed
        if (startPage > 2) {
            const ellipsis = document.createElement('button');
            ellipsis.className = 'btn btn-outline-secondary disabled';
            ellipsis.textContent = '...';
            ellipsis.disabled = true;
            pageNumbersContainer.appendChild(ellipsis);
        }
    }

    // Add page number buttons
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = i === currentPage ?
            'btn btn-primary' : 'btn btn-outline-secondary';
        pageBtn.textContent = i.toString();

        if (i !== currentPage) {
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                displayUsers();
            });
        }

        pageNumbersContainer.appendChild(pageBtn);
    }

    // Add last page button if not already included
    if (endPage < totalPages) {
        // Add ellipsis if needed
        if (endPage < totalPages - 1) {
            const ellipsis = document.createElement('button');
            ellipsis.className = 'btn btn-outline-secondary disabled';
            ellipsis.textContent = '...';
            ellipsis.disabled = true;
            pageNumbersContainer.appendChild(ellipsis);
        }

        const lastPageBtn = document.createElement('button');
        lastPageBtn.className = 'btn btn-outline-secondary';
        lastPageBtn.textContent = totalPages.toString();
        lastPageBtn.addEventListener('click', () => {
            currentPage = totalPages;
            displayUsers();
        });
        pageNumbersContainer.appendChild(lastPageBtn);
    }
}

// Function to activate a user
function activateUser(userId) {
    const token = localStorage.getItem("authToken");

    if (!token) {
        alert("You are not authenticated. Please log in.");
        return;
    }

    // Show loading indicator if available
    if (typeof toggleLoading === 'function') {
        toggleLoading(true);
    }

    // Make API call to activate user
    fetch(`http://localhost:8080/api/v1/User/activate/${userId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error("Unauthorized");
                }
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            console.log('User Activated successfully:', data);
            showToast('success', 'User Activated successfully!');

            // Update the user's status in the local data without a full reload
            updateUserStatus(userId, true);

            // If the API doesn't return the updated user, reload all users
            if (!data.data) {
                loadUsers();
            }
        })
        .catch(error => {
            console.error('Error activating user:', error);
            if (error.message === "Unauthorized") {
                alert("Your session has expired. Please log in again.");
                localStorage.removeItem("authToken");
                window.location.href = "/login";
            } else {
                showToast('error', 'Error activating user. Please try again.');
            }
        })
        .finally(() => {
            // Hide loading indicator if available
            if (typeof toggleLoading === 'function') {
                toggleLoading(false);
            }
        });
}

// Function to update user status in local data and refresh the display
function updateUserStatus(userId, isActive) {
    // Find the user in the local data array
    const userIndex = allUsers.findIndex(user => user.userId === userId);

    if (userIndex !== -1) {
        // Update the user's active status
        allUsers[userIndex].isActive = isActive;

        // Refresh the display to reflect the changes
        displayUsers();
    }
}

// Function to deactivate a user
function deactivateUser(userId) {
    const token = localStorage.getItem("authToken");

    if (!token) {
        alert("You are not authenticated. Please log in.");
        return;
    }

    // Show loading indicator if available
    if (typeof toggleLoading === 'function') {
        toggleLoading(true);
    }

    // Make API call to deactivate user
    fetch(`http://localhost:8080/api/v1/User/deactivate/${userId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error("Unauthorized");
                }
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            console.log('User deactivated successfully:', data);
            showToast('success', 'User deactivated successfully!');

            // Update the user's status in the local data without a full reload
            updateUserStatus(userId, false);

            // If the API doesn't return the updated user, reload all users
            if (!data.data) {
                loadUsers();
            }
        })
        .catch(error => {
            console.error('Error deactivating user:', error);
            if (error.message === "Unauthorized") {
                alert("Your session has expired. Please log in again.");
                localStorage.removeItem("authToken");
                window.location.href = "/login";
            } else {
                showToast('error', 'Error deactivating user. Please try again.');
            }
        })
        .finally(() => {
            // Hide loading indicator if available
            if (typeof toggleLoading === 'function') {
                toggleLoading(false);
            }
        });
}

// Helper function to show toast notifications
function showToast(type, message) {
    // Check if we have a toast system already defined
    if (typeof showSuccess === 'function' && typeof showError === 'function') {
        if (type === 'success') {
            showSuccess(message);
        } else {
            showError(message);
        }
        return;
    }

    // Fallback to alert if no toast system
    alert(message);
}