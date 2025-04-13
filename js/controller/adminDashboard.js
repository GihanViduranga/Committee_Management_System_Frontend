document.getElementById('#memberDash', function () {
    location.href = '../../memberDashboard.html'
});
// Global variables
/*let allUsersList = [];
let authToken = localStorage.getItem('authToken') || '';

// DOM Elements
const elements = {
    loading: document.getElementById('all-loading'),
    noData: document.getElementById('all-no-data'),
    tableContainer: document.getElementById('all-table-container'),
    tableBody: document.getElementById('all-users-table-body'),
    totalUsers: document.getElementById('all-users-total'),
    activeCount: document.getElementById('all-active-count'),
    inactiveCount: document.getElementById('all-inactive-count')
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (!authToken) {
        showToast('Please login to access user data', 'error');
        // Redirect to login or handle authentication
        return;
    }
    fetchAllUsers();
});

// API Request Helper
async function makeAuthRequest(url, method = 'GET', body = null) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
    };

    const options = {
        method,
        headers
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Request failed');
    }

    return response.json();
}

// Fetch all users
async function fetchAllUsers() {
    try {
        showLoading(true);

        const data = await makeAuthRequest("http://localhost:8080/api/v1/User/getAll");

        if (data.code === 200 && data.data) {
            allUsersList = data.data;
            updateStatistics();
            renderUserTable();
        } else {
            throw new Error(data.message || 'Failed to fetch users');
        }
    } catch (error) {
        console.error("Error:", error);
        showToast(error.message, 'error');
        showNoData();
    } finally {
        showLoading(false);
    }
}

// Update statistics counters
function updateStatistics() {
    const activeUsers = allUsersList.filter(user => user.isActive).length;
    const inactiveUsers = allUsersList.filter(user => !user.isActive).length;

    elements.totalUsers.textContent = allUsersList.length;
    elements.activeCount.textContent = activeUsers;
    elements.inactiveCount.textContent = inactiveUsers;
}

// Render user table
function renderUserTable() {
    elements.tableBody.innerHTML = '';

    if (allUsersList.length === 0) {
        showNoData();
        return;
    }

    allUsersList.forEach(user => {
        const row = document.createElement('tr');

        // Format birthday if it exists
        const birthday = user.birthday
            ? new Date(user.birthday).toLocaleDateString()
            : 'N/A';

        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">${user.userId}</td>
            <td class="px-6 py-4 whitespace-nowrap">${user.fullName || 'N/A'}</td>
            <td class="px-6 py-4 whitespace-nowrap">${user.email || 'N/A'}</td>
            <td class="px-6 py-4 whitespace-nowrap">${birthday}</td>
            <td class="px-6 py-4 whitespace-nowrap">${user.role || 'N/A'}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                    ${user.isActive ? 'Active' : 'Inactive'}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap space-x-2">
                ${user.isActive
            ? `<button onclick="toggleUserStatus(${user.userId}, false)" 
                       class="text-red-600 hover:text-red-800">Deactivate</button>`
            : `<button onclick="toggleUserStatus(${user.userId}, true)" 
                       class="text-green-600 hover:text-green-800">Activate</button>`
        }
                <button onclick="editUser(${user.userId})" 
                    class="text-blue-600 hover:text-blue-800">Edit</button>
            </td>
        `;

        elements.tableBody.appendChild(row);
    });

    elements.tableContainer.classList.remove('hidden');
}

// Toggle user status (activate/deactivate)
async function toggleUserStatus(userId, activate) {
    if (!confirm(`Are you sure you want to ${activate ? 'activate' : 'deactivate'} this user?`)) {
        return;
    }

    try {
        showLoading(true);
        const endpoint = activate
            ? `User/activate/${userId}`
            : `User/deactivate/${userId}`;

        const data = await makeAuthRequest(
            `http://localhost:8080/api/v1/${endpoint}`,
            'PUT'
        );

        if (data.code === 200) {
            showToast(`User ${activate ? 'activated' : 'deactivated'} successfully`, 'success');
            await fetchAllUsers(); // Refresh data
        } else {
            throw new Error(data.message || 'Status update failed');
        }
    } catch (error) {
        console.error("Error:", error);
        showToast(error.message, 'error');
    } finally {
        showLoading(false);
    }
}

// Edit user function (placeholder - implement as needed)
function editUser(userId) {
    const user = allUsersList.find(u => u.userId === userId);
    if (user) {
        // Implement your edit modal or form here
        console.log("Editing user:", user);
        showToast(`Edit functionality for user ${userId} would go here`, 'info');
    }
}

// UI Helpers
function showLoading(show) {
    if (show) {
        elements.loading.classList.remove('hidden');
        elements.tableContainer.classList.add('hidden');
        elements.noData.classList.add('hidden');
    } else {
        elements.loading.classList.add('hidden');
    }
}

function showNoData() {
    elements.tableContainer.classList.add('hidden');
    elements.noData.classList.remove('hidden');
}

function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');

    toast.className = `px-4 py-2 rounded-lg shadow-lg ${
        type === 'success' ? 'bg-green-500' :
            type === 'error' ? 'bg-red-500' :
                'bg-blue-500'
    } text-white flex items-center justify-between`;

    toast.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" class="ml-4">×</button>
    `;

    toastContainer.appendChild(toast);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        toast.remove();
    }, 5000);
}

// Make functions available globally
window.toggleUserStatus = toggleUserStatus;
window.editUser = editUser;*/
// document.addEventListener('DOMContentLoaded', function() {
//     // Initialize animations
//     const navLinks = document.querySelectorAll('.nav-link');
//
//     // Handle click events
//     navLinks.forEach(link => {
//         link.addEventListener('click', function(e) {
//             e.preventDefault();
//
//             // Remove active class from all links
//             navLinks.forEach(item => item.classList.remove('active'));
//
//             // Add active class to clicked link
//             this.classList.add('active');
//
//             // Hide all content sections
//             document.querySelectorAll('.content-section').forEach(section => {
//                 section.classList.add('d-none');
//             });
//
//             // Show the target section
//             /*const targetId = this.getAttribute('data-target');
//             document.getElementById(targetId).classList.remove('d-none');*/
//         });
//     });
//
//     // Initialize first link as active (optional)
//     document.querySelector('.nav-link').click();
//
//     // Initialize content sections
//     const Dashboard = document.getElementById("dashboard");
//     const UpdateUser = document.getElementById("updateUser");
//     const Event = document.getElementById("Event");
//     const Member = document.getElementById("members");
//     const Meetings = document.getElementById("meetings");
//     const EventFacility = document.getElementById("eventFacility");
//     const EventType = document.getElementById("event_types");
//     const MeetingAttendens = document.getElementById("meetingsAddtendens")
//
//     const MainContent = document.getElementById("MainContent");
//     const MemberUpdate = document.getElementById("UserList");
//     const EventCreation = document.getElementById("eventCreation");
//     const MemberList = document.getElementById("memberList");
//     const MeetingCreate = document.getElementById("meetingsCreate");
//     const Event_Facility = document.getElementById("eventFac");
//     const EventTypeCreate = document.getElementById("Event_type");
//     const MeetingAttend = document.getElementById("MeetingAttend");
//
//     // Set initial display
//     //MainContent.style.display = "block";
//     MemberUpdate.style.display = "none";
//     EventCreation.style.display = "none";
//     MemberList.style.display = "none";
//     MeetingCreate.style.display = "none";
//     Event_Facility.style.display = "none";
//     EventTypeCreate.style.display = "none";
//     MeetingAttend.style.display = "none";
//
//     // Set up event listeners for navigation
//     Dashboard.addEventListener("click", (e) => {
//         MainContent.style.display = "block";
//         MemberUpdate.style.display = "none";
//         EventCreation.style.display = "none";
//         MemberList.style.display = "none";
//         MeetingCreate.style.display = "none";
//         Event_Facility.style.display = "none";
//         EventTypeCreate.style.display = "none";
//         MeetingAttend.style.display = "none";
//     });
//
//     UpdateUser.addEventListener("click", (e) => {
//         MainContent.style.display = "none";
//         MemberUpdate.style.display = "block";
//         EventCreation.style.display = "none";
//         MemberList.style.display = "none";
//         MeetingCreate.style.display = "none";
//         Event_Facility.style.display = "none";
//         EventTypeCreate.style.display = "none";
//         MeetingAttend.style.display = "none";
//
//         loadUsers(); // Load users when the Update User section is shown
//     });
//
//     Event.addEventListener("click",(e)=>{
//         MainContent.style.display = "none";
//         MemberUpdate.style.display = "none";
//         EventCreation.style.display = "block";
//         MemberList.style.display = "none";
//         MeetingCreate.style.display = "none";
//         Event_Facility.style.display = "none";
//         EventTypeCreate.style.display = "none";
//         MeetingAttend.style.display = "none";
//     });
//
//     Member.addEventListener("click", (e) => {
//         MainContent.style.display = "none";
//         MemberUpdate.style.display = "none";
//         EventCreation.style.display = "none";
//         MemberList.style.display = "block";
//         MeetingCreate.style.display = "none";
//         Event_Facility.style.display = "none";
//         EventTypeCreate.style.display = "none";
//         MeetingAttend.style.display = "none";
//     });
//
//     Meetings.addEventListener("click", (e) => {
//         MainContent.style.display = "none";
//         MemberUpdate.style.display = "none";
//         EventCreation.style.display = "none";
//         MemberList.style.display = "none";
//         MeetingCreate.style.display = "block";
//         Event_Facility.style.display = "none";
//         EventTypeCreate.style.display = "none";
//         MeetingAttend.style.display = "none";
//     })
//
//     EventFacility.addEventListener("click", (e) => {
//         MainContent.style.display = "none";
//         MemberUpdate.style.display = "none";
//         EventCreation.style.display = "none";
//         MemberList.style.display = "none";
//         MeetingCreate.style.display = "none";
//         Event_Facility.style.display = "block";
//         EventTypeCreate.style.display = "none";
//         MeetingAttend.style.display = "none";
//     })
//
//     EventType.addEventListener("click", (e) => {
//         MainContent.style.display = "none";
//         MemberUpdate.style.display = "none";
//         EventCreation.style.display = "none";
//         MemberList.style.display = "none";
//         MeetingCreate.style.display = "none";
//         Event_Facility.style.display = "none";
//         EventTypeCreate.style.display = "block";
//         MeetingAttend.style.display = "none";
//     })
//
//     MeetingAttendens.addEventListener("click", (e) => {
//         MainContent.style.display = "none";
//         MemberUpdate.style.display = "none";
//         EventCreation.style.display = "none";
//         MemberList.style.display = "none";
//         MeetingCreate.style.display = "none";
//         Event_Facility.style.display = "none";
//         EventTypeCreate.style.display = "none";
//         MeetingAttend.style.display = "block";
//     })
//     // Initialize user management functionality
//     setupUserFormListeners();
//     initializeUserManagement();
// });

///////////////////////////////////////////////////////////////////////////////
/* User Activation */
///////////////////////////////////////////////////////////////////////////////

function setupUserFormListeners() {
    const updateUserForm = document.getElementById('updateUserForm');

    if (updateUserForm) {
        updateUserForm.addEventListener('submit', function(event) {
            event.preventDefault();
            updateUser();
        });
    }
}

///////////////////////////////////////////////////////////////////////////////
/* User Update and Table Load */
///////////////////////////////////////////////////////////////////////////////
//
// function showEditForm(userId, fullName, birthday, address, phoneNumber, email, role) {
//     document.getElementById('userId').value = userId;
//     document.getElementById('fullName').value = fullName;
//     document.getElementById('birthday').value = formatDateForInput(birthday);
//     document.getElementById('address').value = address;
//     document.getElementById('phoneNumber').value = phoneNumber;
//     document.getElementById('email').value = email;
//
//     const roleSelect = document.getElementById('role');
//     for (let i = 0; i < roleSelect.options.length; i++) {
//         if (roleSelect.options[i].value === role) {
//             roleSelect.selectedIndex = i;
//             break;
//         }
//     }
//
//     document.getElementById('updateUserFormContainer').style.display = 'block';
//     document.getElementById('updateUserFormContainer').scrollIntoView({ behavior: 'smooth' });
// }
//
// function hideForm() {
//     document.getElementById('updateUserFormContainer').style.display = 'none';
// }
//
// function formatDateForInput(dateString) {
//     if (!dateString) return '';
//     try {
//         const date = new Date(dateString);
//         return date.toISOString().split('T')[0];
//     } catch (e) {
//         console.error("Error formatting date:", e);
//         return dateString;
//     }
// }
//
// // Global variables for pagination
// let allUsers = [];
// let currentPage = 1;
// let pageSize = 10;
// let totalPages = 1;
//
// function initializeUserManagement() {
//     document.getElementById('pageSize').addEventListener('change', function() {
//         pageSize = parseInt(this.value);
//         currentPage = 1;
//         displayUsers();
//     });
//
//     document.getElementById('prevPage').addEventListener('click', function() {
//         if (currentPage > 1) {
//             currentPage--;
//             displayUsers();
//         }
//     });
//
//     document.getElementById('nextPage').addEventListener('click', function() {
//         if (currentPage < totalPages) {
//             currentPage++;
//             displayUsers();
//         }
//     });
//
//     document.getElementById('userTableBody').addEventListener('click', function(event) {
//         const target = event.target;
//         const btn = target.closest('.activate-btn, .deactivate-btn');
//
//         if (btn) {
//             const userId = btn.getAttribute('data-id');
//             if (btn.classList.contains('activate-btn')) {
//                 activateUser(userId);
//             } else {
//                 deactivateUser(userId);
//             }
//         }
//     });
// }
//
// function loadUsers() {
//     const token = localStorage.getItem("authToken");
//     if (!token) {
//         alert("You are not authenticated. Please log in.");
//         return;
//     }
//
//     toggleLoading(true);
//
//     fetch("http://localhost:8080/api/v1/User/getAll", {
//         method: "GET",
//         headers: {
//             "Authorization": `Bearer ${token}`
//         }
//     })
//         .then(response => {
//             if (!response.ok) {
//                 if (response.status === 401) {
//                     throw new Error("Unauthorized");
//                 }
//                 throw new Error("Network response was not ok");
//             }
//             return response.json();
//         })
//         .then(response => {
//             if (response.data) {
//                 allUsers = response.data;
//                 displayUsers();
//             }
//         })
//         .catch(error => {
//             console.error("Error loading users:", error);
//             if (error.message === "Unauthorized") {
//                 alert("Your session has expired. Please log in again.");
//                 localStorage.removeItem("authToken");
//                 window.location.href = "/login";
//             } else {
//                 alert("Failed to load users. Please try again later.");
//             }
//         })
//         .finally(() => {
//             toggleLoading(false);
//         });
// }
//
// function displayUsers() {
//     const startIndex = (currentPage - 1) * pageSize;
//     const endIndex = Math.min(startIndex + pageSize, allUsers.length);
//     const paginatedUsers = allUsers.slice(startIndex, endIndex);
//
//     const userTableBody = document.getElementById('userTableBody');
//     userTableBody.innerHTML = '';
//
//     paginatedUsers.forEach(user => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${user.userId}</td>
//             <td>${user.fullName}</td>
//             <td>${formatDate(user.birthday)}</td>
//             <td>${user.address}</td>
//             <td>${user.phoneNumber}</td>
//             <td>${user.email}</td>
//             <td>${user.role}</td>
//             <td class="text-center">
//                 <span class="badge ${user.active ? 'bg-success' : 'bg-danger'}">
//                     ${user.active ? 'Active' : 'Inactive'}
//                 </span>
//             </td>
//             <td>
//                 <div class="btn-group">
//                     <button class="btn btn-warning btn-sm" onclick="showEditForm('${user.userId}', '${escapeHtml(user.fullName)}', '${user.birthday}', '${escapeHtml(user.address)}', '${user.phoneNumber}', '${user.email}', '${user.role}')">
//                         <i class="fas fa-edit"></i> Edit
//                     </button>
//                     ${!user.active ?
//             `<button class="btn btn-success btn-sm activate-btn" data-id="${user.userId}">
//                             <i class="fas fa-user-check"></i> Activate
//                         </button>` :
//             `<button class="btn btn-danger btn-sm deactivate-btn" data-id="${user.userId}">
//                             <i class="fas fa-user-slash"></i> Deactivate
//                         </button>`
//         }
//                 </div>
//             </td>
//         `;
//         userTableBody.appendChild(row);
//     });
//
//     // Update pagination info
//     document.getElementById('currentEntries').textContent = allUsers.length > 0 ?
//         `${startIndex + 1}-${endIndex}` : '0';
//     document.getElementById('totalEntries').textContent = allUsers.length;
//
//     totalPages = Math.ceil(allUsers.length / pageSize);
//     updatePageNumbers();
//
//     document.getElementById('prevPage').disabled = currentPage === 1;
//     document.getElementById('nextPage').disabled = currentPage === totalPages;
// }
//
// function formatDate(dateString) {
//     if (!dateString) return '';
//     try {
//         const date = new Date(dateString);
//         return date.toLocaleDateString();
//     } catch (e) {
//         console.error("Error formatting date:", e);
//         return dateString;
//     }
// }
//
// function updatePageNumbers() {
//     const pageNumbersContainer = document.getElementById('pageNumbers');
//     pageNumbersContainer.innerHTML = '';
//
//     let startPage = Math.max(1, currentPage - 2);
//     let endPage = Math.min(totalPages, startPage + 4);
//
//     if (endPage - startPage < 4) {
//         startPage = Math.max(1, endPage - 4);
//     }
//
//     if (startPage > 1) {
//         addPageButton(1, pageNumbersContainer);
//         if (startPage > 2) {
//             addEllipsis(pageNumbersContainer);
//         }
//     }
//
//     for (let i = startPage; i <= endPage; i++) {
//         addPageButton(i, pageNumbersContainer, i === currentPage);
//     }
//
//     if (endPage < totalPages) {
//         if (endPage < totalPages - 1) {
//             addEllipsis(pageNumbersContainer);
//         }
//         addPageButton(totalPages, pageNumbersContainer);
//     }
// }
//
// function addPageButton(pageNumber, container, isActive = false) {
//     const pageBtn = document.createElement('button');
//     pageBtn.className = isActive ? 'btn btn-primary' : 'btn btn-outline-secondary';
//     pageBtn.textContent = pageNumber;
//
//     if (!isActive) {
//         pageBtn.addEventListener('click', () => {
//             currentPage = pageNumber;
//             displayUsers();
//         });
//     }
//
//     container.appendChild(pageBtn);
// }
//
// function addEllipsis(container) {
//     const ellipsis = document.createElement('button');
//     ellipsis.className = 'btn btn-outline-secondary disabled';
//     ellipsis.textContent = '...';
//     ellipsis.disabled = true;
//     container.appendChild(ellipsis);
// }
//
// function updateUser() {
//     const userId = document.getElementById('userId').value;
//     const fullName = document.getElementById('fullName').value;
//     const birthday = document.getElementById('birthday').value;
//     const address = document.getElementById('address').value;
//     const phoneNumber = document.getElementById('phoneNumber').value;
//     const email = document.getElementById('email').value;
//     const role = document.getElementById('role').value;
//
//     const payload = {
//         userId,
//         fullName,
//         birthday,
//         address,
//         phoneNumber,
//         email,
//         role
//     };
//
//     const token = localStorage.getItem("authToken");
//     if (!token) {
//         alert("You are not authenticated. Please log in.");
//         return;
//     }
//
//     toggleLoading(true);
//
//     fetch('http://localhost:8080/api/v1/User/update', {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(payload)
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log('User updated successfully:', data);
//             showToast('success', 'User updated successfully!');
//             hideForm();
//             loadUsers();
//         })
//         .catch(error => {
//             console.error('Error updating user:', error);
//             showToast('error', 'Error updating user. Please try again.');
//         })
//         .finally(() => {
//             toggleLoading(false);
//         });
// }
//
// function activateUser(userId) {
//     const token = localStorage.getItem("authToken");
//     if (!token) {
//         alert("You are not authenticated. Please log in.");
//         return;
//     }
//
//     toggleLoading(true);
//
//     fetch(`http://localhost:8080/api/v1/User/activate/${userId}`, {
//         method: 'PUT',
//         headers: {
//             'Authorization': `Bearer ${token}`
//         }
//     })
//         .then(response => {
//             if (!response.ok) {
//                 if (response.status === 401) {
//                     throw new Error("Unauthorized");
//                 }
//                 throw new Error("Network response was not ok");
//             }
//             return response.json();
//         })
//         .then(data => {
//             showToast('success', 'User activated successfully!');
//             updateUserStatus(userId, true);
//             if (!data.data) {
//                 loadUsers();
//             }
//         })
//         .catch(error => {
//             console.error('Error activating user:', error);
//             if (error.message === "Unauthorized") {
//                 handleUnauthorized();
//             } else {
//                 showToast('error', 'Error activating user. Please try again.');
//             }
//         })
//         .finally(() => {
//             toggleLoading(false);
//         });
// }
//
// function deactivateUser(userId) {
//     const token = localStorage.getItem("authToken");
//     if (!token) {
//         alert("You are not authenticated. Please log in.");
//         return;
//     }
//
//     toggleLoading(true);
//
//     fetch(`http://localhost:8080/api/v1/User/deactivate/${userId}`, {
//         method: 'PUT',
//         headers: {
//             'Authorization': `Bearer ${token}`
//         }
//     })
//         .then(response => {
//             if (!response.ok) {
//                 if (response.status === 401) {
//                     throw new Error("Unauthorized");
//                 }
//                 throw new Error("Network response was not ok");
//             }
//             return response.json();
//         })
//         .then(data => {
//             showToast('success', 'User deactivated successfully!');
//             updateUserStatus(userId, false);
//             if (!data.data) {
//                 loadUsers();
//             }
//         })
//         .catch(error => {
//             console.error('Error deactivating user:', error);
//             if (error.message === "Unauthorized") {
//                 handleUnauthorized();
//             } else {
//                 showToast('error', 'Error deactivating user. Please try again.');
//             }
//         })
//         .finally(() => {
//             toggleLoading(false);
//         });
// }
//
// function updateUserStatus(userId, isActive) {
//     const userIndex = allUsers.findIndex(user => user.userId === userId);
//     if (userIndex !== -1) {
//         allUsers[userIndex].active = isActive;
//         displayUsers();
//     }
// }
//
// function handleUnauthorized() {
//     alert("Your session has expired. Please log in again.");
//     localStorage.removeItem("authToken");
//     window.location.href = "/login";
// }
//
// function showToast(type, message) {
//     if (typeof showSuccess === 'function' && typeof showError === 'function') {
//         type === 'success' ? showSuccess(message) : showError(message);
//         return;
//     }
//     alert(message);
// }
//
// function toggleLoading(show) {
//     // Implement your loading indicator logic here
//     console.log(show ? "Loading..." : "Done loading");
// }
//
// function escapeHtml(unsafe) {
//     if (!unsafe) return '';
//     return unsafe.toString()
//         .replace(/&/g, "&amp;")
//         .replace(/</g, "&lt;")
//         .replace(/>/g, "&gt;")
//         .replace(/"/g, "&quot;")
//         .replace(/'/g, "&#039;");
// }

/*Event Facility*/



/*Event Creation*/
/*Facility Table update*/
document.addEventListener("DOMContentLoaded", function () {
    const facilityID = document.getElementById("facilityID");
    const facilitySelect = document.getElementById("facilitySelect");
    const facilityQty = document.getElementById("facilityQty");
    const facilityDes = document.getElementById("facilityDes");
    const addFacilityBtn = document.getElementById("addFacilityBtn");
    const facilitiesCart = document.getElementById("facilitiesCart");
    const facilitiesTotalQTY = document.getElementById("facilitiesTotalQTY");

    let facilities = [];

    addFacilityBtn.addEventListener("click", function () {
        const id = facilityID.value.trim();
        const name = facilitySelect.value.trim();
        const qty = parseInt(facilityQty.value);
        const desc = facilityDes.value.trim();

        if (!id || !name || qty <= 0) {
            alert("Please enter valid facility details.");
            return;
        }

        const existingFacility = facilities.find(f => f.id === id);
        if (existingFacility) {
            existingFacility.qty += qty;
        } else {
            facilities.push({ id, name, qty, desc });
        }

        updateFacilitiesTable();
        clearFacilityFields();
    });

    function updateFacilitiesTable() {
        facilitiesCart.innerHTML = "";
        let totalQty = 0;

        facilities.forEach((facility, index) => {
            totalQty += facility.qty;
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${facility.id}</td>
                <td>${facility.name}</td>
                <td>${facility.qty}</td>
                <td>${facility.desc}</td>
                <td><button class="btn btn-danger btn-sm" onclick="removeFacility(${index})">Remove</button></td>
            `;
            facilitiesCart.appendChild(row);
        });

        facilitiesTotalQTY.textContent = totalQty;
    }

    window.removeFacility = function (index) {
        facilities.splice(index, 1);
        updateFacilitiesTable();
    };

    function clearFacilityFields() {
        facilityID.value = "";
        facilitySelect.value = "";
        facilityQty.value = "1";
        facilityDes.value = "";
    }
});
/////////////////////////////////////////////////////////////////////////////////////////
/*Member List*/
/////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
    loadMembers();
});

let allMembers = [];
/*let currentPage = 1;
let pageSize = 10;
let totalPages = 1;*/

function loadMembers() {
    const token = localStorage.getItem("authToken");
    if (!token) {
        alert("You are not authenticated. Please log in.");
        return;
    }

    toggleLoading(true);

    fetch("http://localhost:8080/api/v1/member/getAllMembers", {
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
                allMembers = response.data;
                displayMembers();
            }
        })
        .catch(error => {
            console.error("Error loading members:", error);
            if (error.message === "Unauthorized") {
                alert("Your session has expired. Please log in again.");
                localStorage.removeItem("authToken");
                window.location.href = "/login";
            } else {
                alert("Failed to load members. Please try again later.");
            }
        })
        .finally(() => {
            toggleLoading(false);
        });
}

function displayMembers() {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, allMembers.length);
    const paginatedMembers = allMembers.slice(startIndex, endIndex);

    const memberTableBody = document.getElementById('memberListTableBody');
    memberTableBody.innerHTML = '';

    paginatedMembers.forEach(member => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${member.memberId}</td>
            <td>${member.fullName}</td>
            <td>${formatDate(member.joinDate)}</td>
            <td>${member.nic}</td>
            <td>${member.positionsHeld}</td>
        `;
        memberTableBody.appendChild(row);
    });

    document.getElementById('currentEntries').textContent = allMembers.length > 0 ?
        `${startIndex + 1}-${endIndex}` : '0';
    document.getElementById('totalEntries').textContent = allMembers.length;

    totalPages = Math.ceil(allMembers.length / pageSize);
    updatePageNumbers();

    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage === totalPages;
}
/////////////////////////////////////////////////////////////////////////////////////////
/*Event Facility*/
/////////////////////////////////////////////////////////////////////////////////////////
$("#SaveFacility").off("click").on("click", function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    // Get form values
    const facilityName = $("#facilityName").val();
    const description = $("#FacilityDescriptions").val();
    const qty = $("#qty").val();

    // Validation
    if (!facilityName || !qty) {
        alert("Please fill in all required fields");
        return;
    }

    // Prepare payload
    const payload = {
        facilityName: facilityName,
        description: description,
        qty: qty
    };

    // Check authentication
    const token = localStorage.getItem("authToken");
    if (!token) {
        alert("You are not authenticated. Please log in.");
        return;
    }

    // Get button reference
    const $saveButton = $("#SaveFacility");
    $saveButton.prop("disabled", true).text("Saving...");

    // AJAX call
    $.ajax({
        url: 'http://localhost:8080/api/v1/event_facility/save',
        type: 'POST',
        contentType: 'application/json',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        data: JSON.stringify(payload),
        success: function(data, textStatus, xhr) {
            // Check the response code from your backend
            if (data.code === "00") {
                alert(data.message || "Facility saved successfully!");
                $("#facilityName").val("");
                $("#FacilityDescriptions").val("");
                $("#qty").val("");
            } else {
                alert(data.message || "Failed to save facility");
            }
        },
        error: function(xhr, textStatus, errorThrown) {
            try {
                const errorData = JSON.parse(xhr.responseText);
                alert(errorData.message || 'Request failed');
            } catch (e) {
                alert(xhr.statusText || 'An error occurred');
            }
        },
        complete: function() {
            $saveButton.prop("disabled", false).text("Save");
        }
    });
});

function getAllEventFacilities() {
    const tableBody = $('#facilityTableBody');

    // Clear the table and show loading
    tableBody.empty();
    tableBody.append(`<tr><td colspan="5" class="text-center">Loading...</td></tr>`);

    const token = localStorage.getItem("authToken");
    if (!token) {
        alert("You are not authenticated. Please log in.");
        tableBody.html(`<tr><td colspan="5" class="text-center text-danger">Authentication error</td></tr>`);
        return;
    }

    $.ajax({
        url: 'http://localhost:8080/api/v1/event_facility/getAll',
        type: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        success: function(response) {
            console.log("Full response:", response);
            tableBody.empty(); // Clear loading row

            const facilities = response.content || response.data; // Handle different response formats

            if (!facilities || facilities.length === 0) {
                tableBody.html(`<tr><td colspan="5" class="text-center">No facilities found</td></tr>`);
                return;
            }

            facilities.forEach(function(facility) {
                const row = `
                    <tr data-id="${facility.eventFacilityId}">
                        <td>${facility.eventFacilityId}</td>
                        <td>${facility.facilityName}</td>
                        <td>${facility.description || '-'}</td>
                        <td>${facility.qty}</td>
                        <td>
                            <button class="btn btn-warning btn-sm edit-facility">Edit</button>
                            <button class="btn btn-danger btn-sm delete-facility">Delete</button>
                        </td>
                    </tr>
                `;
                tableBody.append(row);
            });
        },
        error: function(xhr, status, error) {
            console.error("Error loading facilities:", xhr, status, error);
            tableBody.html(`<tr><td colspan="5" class="text-center text-danger">Error loading data: ${error}</td></tr>`);
        }
    });
}

// Use event delegation for dynamically added elements
$(document).on("click", ".edit-facility", function() {
    const row = $(this).closest("tr");
    const id = row.data("id");
    const facilityName = row.find("td:eq(1)").text();
    const description = row.find("td:eq(2)").text();
    const qty = row.find("td:eq(3)").text();

    $("#facilityName").val(facilityName);
    $("#FacilityDescriptions").val(description);
    $("#qty").val(qty);

    $("#SaveFacility").text("Update").data("mode", "update").data("id", id);
});

$(document).on("click", ".delete-facility", function() {
    const id = $(this).closest("tr").data("id");
    if (confirm("Are you sure you want to delete this facility?")) {
        deleteFacility(id);
    }
});

// Function to delete a facility
function deleteFacility(id) {
    console.log("Deleting facility ID:", id);
    const token = localStorage.getItem("authToken");

    if (!token) {
        alert("You are not authenticated. Please log in.");
        return;
    }

    $.ajax({
        url: `http://localhost:8080/api/v1/event_facility/delete/${id}`,
        type: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        success: function(response) {
            console.log("Delete response:", response);
            alert(response.message || "Facility deleted successfully");
            getAllEventFacilities(); // Reload the table
        },
        error: function(xhr, status, error) {
            console.error("Error deleting facility:", xhr, status, error);
            alert("You Can't delete this facility because this facility added to Event" /*+ (xhr.responseJSON?.message || error)*/);
        }
    });
}

// Function to edit a facility
$(document).on("click", ".edit-facility", function() {
    const row = $(this).closest("tr");
    const id = row.data("id");
    const facilityName = row.find("td:eq(1)").text();
    const description = row.find("td:eq(2)").text();
    const qty = row.find("td:eq(3)").text();

    $("#facilityName").val(facilityName);
    $("#FacilityDescriptions").val(description);
    $("#qty").val(qty);

    // Set the ID for updating
    $("#UpdateFacility").data("id", id);

    // Show the Update button and hide the Submit button
    $("#SaveFacility").hide();
    $("#UpdateFacility").show();
});

// Function to update a facility
$("#UpdateFacility").on("click", function () {
    const id = $(this).data("id");
    if (!id) {
        alert("No facility selected for update.");
        return;
    }

    // Get updated values from form
    const facilityName = $("#facilityName").val();
    const description = $("#FacilityDescriptions").val();
    const qty = $("#qty").val();

    const token = localStorage.getItem("authToken");
    if (!token) {
        alert("You are not authenticated. Please log in.");
        return;
    }

    $.ajax({
        url: `http://localhost:8080/api/v1/event_facility/update`,
        type: "PUT",
        contentType: "application/json",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        data: JSON.stringify({
            eventFacilityId: id,
            facilityName: facilityName,
            description: description,
            qty: qty
        }),
        success: function (response) {
            console.log("Update response:", response);
            alert("Facility updated successfully");

            // Reset form and buttons
            $("#facilityName").val("");
            $("#FacilityDescriptions").val("");
            $("#qty").val("");

            // Show submit button again and hide update
            $("#UpdateFacility").hide();
            $("#SaveFacility").show();

            // Reload the facilities table
            getAllEventFacilities();
        },
        error: function (xhr, status, error) {
            console.error("Error updating facility:", xhr, status, error);
            alert("Error updating facility: " + error);
        }
    });
});

// Load facilities on page load
$(document).ready(getAllEventFacilities);

/////////////////////////////////////////////////////////////////////////////////////////
/*Event Types*/
/////////////////////////////////////////////////////////////////////////////////////////

$("#addEventType").off("click").on("click", function () {
    const token = localStorage.getItem("authToken");
    if (!token) {
        alert("You are not authenticated. Please log in.");
        return;
    }

    // Get values from form
    const eventType = $("#eventTypeN").val();
    const description = $("#descriptionType").val();

    const payload = {
        eventType,
        description
    }

    $.ajax({
        url: 'http://localhost:8080/api/v1/event_type/save',
        type: 'POST',
        contentType: 'application/json',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        data: JSON.stringify(payload),
        success: function(data, textStatus, xhr) {

            if (data.code === "00") {
                alert(data.message || "Event type saved successfully!");
                $("#eventTypeN").val("");
                $("#descriptionType").val("");
            } else {
                alert(data.message || "Failed to save event type");
            }
        },
    });
})

$(document).ready(function () {
    loadEventTypes();


    function loadEventTypes() {
        let token = localStorage.getItem("authToken");
        $.ajax({
            url: "http://localhost:8080/api/v1/event_type/getAllEventTypes",
            method: "GET",
            dataType: "json",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            success: function (response) {
                let tableBody = $("#eventTypeTableBody");
                tableBody.empty();
                response.data.forEach(event => {
                    tableBody.append(`
                        <tr data-id="${event.eventTypeId}">
                            <td>${event.eventTypeId}</td>
                            <td>${event.eventType}</td>
                            <td>${event.description}</td>
                            <td>
                                <button class="btn btn-warning btn-sm edit-btn">Edit</button>
                                <button class="btn btn-danger btn-sm delete-btn">Delete</button>
                            </td>
                        </tr>
                    `);
                });
            },
            error: function () {
                alert("Failed to load event types.");
            }
        });
    }

    $(document).on("click", ".edit-btn", function () {
        let row = $(this).closest("tr");
        let eventTypeId = row.data("id");
        let eventType = row.find("td:eq(1)").text();
        let description = row.find("td:eq(2)").text();

        $("#eventTypeN").val(eventType);
        $("#descriptionType").val(description);

        $("#typeUpdate").data("id", eventTypeId);
    });

    $(document).on("click", ".delete-btn", function () {
        let row = $(this).closest("tr");
        let eventTypeId = row.data("id");
        let token = localStorage.getItem("authToken");

        if (confirm("Are you sure you want to delete this event type?")) {
            $.ajax({
                url: `http://localhost:8080/api/v1/event_type/delete/${eventTypeId}`,
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                success: function () {
                    alert("Event type deleted successfully.");
                    loadEventTypes();
                },
                error: function () {
                    alert("Failed to delete event type.");
                }
            });
        }
    });


    $("#typeUpdate").off("click").on("click", function (e) {
        e.preventDefault();

        let Id = $(this).data("id");
        const eventType = $("#eventTypeN").val();
        const description = $("#descriptionType").val();
        let token = localStorage.getItem("authToken");

        console.log($(this).data("id"));

        $.ajax({
            url: "http://localhost:8080/api/v1/event_type/update",
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify({
                eventTypeId: Id,
                eventType: eventType,
                description: description
            }),
            headers: {
                'Authorization': `Bearer ${token}`
            },
            success: function () {
                alert("Event type updated successfully.");
                loadEventTypes();
            },
            error: function (xhr) {
                console.log(xhr.responseText);
                alert("Failed to update event type.");
            }
        });
    });
});

/////////////////////////////////////////////////////////////////////////////////////////
/*Meeting*/
/////////////////////////////////////////////////////////////////////////////////////////

/*
$('#addMeeting').off("click").on("click", function (e) {
    const token = localStorage.getItem("authToken");

    if (!token) {
        alert("You are not authenticated. Please log in.");
        return;
    }
    e.preventDefault();

    const meetingTitle = $("#meetingTitle").val();
    const meetingDate = $("#meetingDate").val();
    const meetingTime = $("#meetingTime").val();
    const description = $("#descriptions").val();

    const payload ={
        meetingTitle,
        meetingDate,
        meetingTime,
        description
    }

    $.ajax({
        url: 'http://localhost:8080/api/v1/meeting/createMeeting',
        type: 'POST',
        contentType: 'application/json',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        data: JSON.stringify(payload),
        success: function(data, textStatus, xhr) {
            if (data.code === "00") {
                loadMeetings();
                alert(data.message || "Meeting saved successfully!");

                $("#meetingTitle").val("");
                $("#meetingDate").val("");
                $("#meetingTime").val("");
                $("#descriptions").val("");
            } else {
                alert(data.message || "Failed to save meeting");
            }
        },
    });
});

$(document).ready(function () {
    loadMeetings();
    function loadMeetings() {
       const token = localStorage.getItem("authToken");

       $.ajax({
           url:"http://localhost:8080/api/v1/meeting/getAllMeetings",
           method: "GET",
           dataType: "json",
           headers: {
               'Authorization': `Bearer ${token}`
           },
           success: function (response) {
               let tableBody = $("#meetingTableBody");
               tableBody.empty();
               response.data.forEach(meeting => {
                   tableBody.append(`
                       <tr data-id="${meeting.meetingId}">
                           <td>${meeting.meetingId}</td>
                           <td>${meeting.meetingTitle}</td>
                           <td>${meeting.meetingDate}</td>
                           <td>${meeting.meetingTime}</td>
                           <td>${meeting.description}</td>
                           <td>
                               <button class="btn btn-warning btn-sm edit-btns">Edit</button>
                               <button class="btn btn-danger btn-sm delete-btns">Delete</button>
                           </td>
                       </tr>
                   `);
               });
           },
           error: function () {
               alert("Failed to load meetings.");
           }
       });
    }

    $(document).on("click", ".edit-btns", function () {
        let row = $(this).closest("tr");
        let meetingId = row.data("id");
        let meetingTitle = row.find("td:eq(1)").text();
        let meetingDate = row.find("td:eq(2)").text();
        let meetingTime = row.find("td:eq(3)").text();
        let description = row.find("td:eq(4)").text();

        $("#meetingTitle").val(meetingTitle);
        $("#meetingDate").val(meetingDate);
        $("#meetingTime").val(meetingTime);
        $("#descriptions").val(description);

        $("#meetingUpdate").data("id", meetingId);
    });

    $(document).on("click", ".delete-btns", function () {
        let row = $(this).closest("tr");
        let meetingId = row.data("id");
        let token = localStorage.getItem("authToken");

        if (confirm("Are you sure you want to delete this meeting?")) {
            $.ajax({
                url: `http://localhost:8080/api/v1/meeting/delete/${meetingId}`,
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                success: function () {
                    alert("Meeting deleted successfully.");
                    loadMeetings();
                },
                error: function () {
                    alert("Failed to delete meeting.");
                }
            });
        }
    });

    $("#updateMeeting").off("click").on("click", function (e) {
        e.preventDefault();

        let id = $(this).data("id");
        const meetingTitle = $("#meetingTitle").val();
        const meetingDate = $("#meetingDate").val();
        const meetingTime = $("#meetingTime").val();
        const description = $("#descriptions").val();
        let token = localStorage.getItem("authToken");

        $.ajax({
            url: "http://localhost:8080/api/v1/meeting/update",
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify({
                meetingId: id,
                meetingTitle,
                meetingDate,
                meetingTime,
                description
            }),
            headers: {
                'Authorization': `Bearer ${token}`
            },
            success: function () {
                alert("Meeting updated successfully.");
                loadMeetings();
            },
            error: function (xhr) {
                console.log(xhr.responseText);
                alert("Failed to update meeting.");
            }
        });
    });
});*/

// 1. Define loadMeetings in global scope with enhanced error handling
/*$(document).ready(function() {
    const token = localStorage.getItem("authToken");
    if (!token) {
        console.error("No auth token found");
        return;
    }

    console.log("Loading meetings..."); // Debug log
    $.ajax({
        url: "http://localhost:8080/api/v1/meeting/getAllMeetings",
        method: "GET",
        dataType: "json",
        headers: {
            'Authorization': `Bearer ${token}`
        },
        success: function(response) {
            console.log("API Response:", response); // Debug log

            // Verify response structure
            if (!response || !response.data) {
                console.error("Invalid response format");
                return;
            }

            const tableBody = $("#meetingTableBody");
            if (tableBody.length === 0) {
                console.error("Table body not found - check your HTML ID");
                return;
            }

            tableBody.empty();

            response.data.forEach(meeting => {
                tableBody.append(`
                    <tr data-id="${meeting.meetingId}">
                        <td>${meeting.meetingId}</td>
                        <td>${meeting.meetingTitle}</td>
                        <td>${meeting.meetingDate}</td>
                        <td>${meeting.meetingTime}</td>
                        <td>${meeting.description}</td>
                        <td>
                            <button class="btn btn-warning btn-sm edit-btns">Edit</button>
                            <button class="btn btn-danger btn-sm delete-btns">Delete</button>
                        </td>
                    </tr>
                `);
            });
            console.log("Meetings loaded successfully"); // Debug log
        },
        error: function(xhr, status, error) {
            console.error("Error loading meetings:", status, error);
            alert("Error loading meetings. Check console for details.");
        }
    });


// 2. Enhanced save meeting function

    // Initial load
    loadMeetings();

    $('#addMeeting').off("click").on("click", function(e) {
        e.preventDefault();
        const token = localStorage.getItem("authToken");

        if (!token) {
            alert("Please login first");
            return;
        }

        const meetingTitle = $("#meetingTitle").val().trim();
        const meetingDate = $("#meetingDate").val().trim();
        const meetingTime = $("#meetingTime").val().trim();
        const description = $("#descriptions").val().trim();

        if (!meetingTitle || !meetingDate || !meetingTime) {
            alert("Required fields are missing");
            return;
        }

        const payload = {
            meetingTitle,
            meetingDate,
            meetingTime,
            description
        };

        console.log("Saving meeting:", payload); // Debug log

        $.ajax({
            url: 'http://localhost:8080/api/v1/meeting/createMeeting',
            type: 'POST',
            contentType: 'application/json',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: JSON.stringify(payload),
            success: function(response) {
                console.log("Save response:", response); // Debug log

                if (response.code === "00") {
                    // Clear form
                    $("#meetingTitle, #meetingDate, #meetingTime, #descriptions").val("");

                    // Refresh table - with small delay to ensure server has updated
                    setTimeout(function() {
                        loadMeetings();
                        console.log("Table refreshed after save"); // Debug log
                    }, 300);

                    alert(response.message || "Meeting saved successfully!");
                } else {
                    alert(response.message || "Error saving meeting");
                }
            },
            error: function(xhr) {
                console.error("Save error:", xhr.responseText);
                alert("Failed to save meeting. Check console for details.");
            }
        });
    });

$(document).ready(function () {
    // Initial load
    loadMeetings();

    $(document).on("click", ".edit-btns", function () {
        let row = $(this).closest("tr");
        let meetingId = row.data("id");
        let meetingTitle = row.find("td:eq(1)").text();
        let meetingDate = row.find("td:eq(2)").text();
        let meetingTime = row.find("td:eq(3)").text();
        let description = row.find("td:eq(4)").text();

        $("#meetingTitle").val(meetingTitle);
        $("#meetingDate").val(meetingDate);
        $("#meetingTime").val(meetingTime);
        $("#descriptions").val(description);

        $("#updateMeeting").data("id", meetingId);
    });

    $(document).on("click", ".delete-btns", function () {
        let row = $(this).closest("tr");
        let meetingId = row.data("id");
        let token = localStorage.getItem("authToken");

        if (confirm("Are you sure you want to delete this meeting?")) {
            $.ajax({
                url: `http://localhost:8080/api/v1/meeting/delete/${meetingId}`,
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                success: function () {
                    alert("Meeting deleted successfully.");
                    loadMeetings();
                },
                error: function () {
                    alert("Failed to delete meeting.");
                }
            });
        }
    });

    $("#updateMeeting").off("click").on("click", function (e) {
        e.preventDefault();

        let id = $(this).data("id");
        const meetingTitle = $("#meetingTitle").val();
        const meetingDate = $("#meetingDate").val();
        const meetingTime = $("#meetingTime").val();
        const description = $("#descriptions").val();
        let token = localStorage.getItem("authToken");

        $.ajax({
            url: "http://localhost:8080/api/v1/meeting/update",
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify({
                meetingId: id,
                meetingTitle,
                meetingDate,
                meetingTime,
                description
            }),
            headers: {
                'Authorization': `Bearer ${token}`
            },
            success: function () {
                alert("Meeting updated successfully.");
                loadMeetings();
            },
            error: function (xhr) {
                console.log(xhr.responseText);
                alert("Failed to update meeting.");
            }
        });
    });
});
});*/
$(document).ready(function() {
    const token = localStorage.getItem("authToken");
    if (!token) {
        console.error("No auth token found");
        // Consider redirecting to login page if no token
        return;
    }

    // Function to load meetings
    function loadMeetings() {
        console.log("Loading meetings...");
        $.ajax({
            url: "http://localhost:8080/api/v1/meeting/getAllMeetings",
            method: "GET",
            dataType: "json",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            success: function(response) {
                console.log("API Response:", response);

                if (!response || !response.data) {
                    console.error("Invalid response format");
                    return;
                }

                const tableBody = $("#meetingTableBody");
                if (tableBody.length === 0) {
                    console.error("Table body not found - check your HTML ID");
                    return;
                }

                tableBody.empty();

                response.data.forEach(meeting => {
                    tableBody.append(`
                        <tr data-id="${meeting.meetingId}">
                            <td>${meeting.meetingId}</td>
                            <td>${meeting.meetingTitle}</td>
                            <td>${meeting.meetingDate}</td>
                            <td>${meeting.meetingTime}</td>
                            <td>${meeting.description}</td>
                            <td>
                                <button class="btn btn-warning btn-sm edit-btns">Edit</button>
                                <button class="btn btn-danger btn-sm delete-btns">Delete</button>
                            </td>
                        </tr>
                    `);
                });
            },
            error: function(xhr, status, error) {
                console.error("Error loading meetings:", status, error);
                alert("Error loading meetings. Check console for details.");
            }
        });
    }

    // Initial load
    loadMeetings();
    loadAdmins();

    function loadAdmins() {
        const token = localStorage.getItem("authToken");
        $.ajax({
            url: "http://localhost:8080/api/v1/meeting/getAllAdminEmails",
            method: "GET",
            dataType: "json",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            success: function(response) {
                console.log("API Response:", response);

                if (!response || !response.data) {
                    console.error("Invalid response format");
                    return;
                }

                const selectUsers = $("#userEmail");
                if (selectUsers.length === 0) {
                    console.error("Select users dropdown not found");
                    return;
                }

                selectUsers.empty().append('<option value="">Select Admin Email</option>');

                response.data.forEach(user => {
                    selectUsers.append(`
                    <option value="${user.email}" data-user-id="${user.userId}">
                        ${user.email}
                    </option>
                `);
                });

                selectUsers.off('change').on('change', function() {
                    const userId = $(this).find('option:selected').data('user-id') || '';
                    console.log("Selected Admin ID:", userId);
                    $('#userIds').val(userId);
                    localStorage.setItem('selectedUserId', userId);
                });
            },
            error: function(xhr, status, error) {
                console.error("Error loading admins:", error);
                alert("Failed to load admins. Please try again.");
            }
        });
    }
    // Add Meeting handler
    $('#addMeeting').on("click", function(e) {
        e.preventDefault();

        const userId = $("#userIds").val().trim();
        const meetingTitle = $("#meetingTitle").val().trim();
        const meetingDate = $("#meetingDate").val().trim();
        const meetingTime = $("#meetingTime").val().trim();
        const description = $("#descriptions").val().trim();

        if (!meetingTitle || !meetingDate || !meetingTime) {
            alert("Please fill in all required fields (Title, Date, Time)");
            return;
        }

        const payload = {
            meetingTitle,
            meetingDate,
            meetingTime,
            description,
            userId
        };

        console.log("Saving meeting:", payload);

        $.ajax({
            url: 'http://localhost:8080/api/v1/meeting/createMeeting',
            type: 'POST',
            contentType: 'application/json',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: JSON.stringify(payload),
            success: function(response) {
                console.log("Save response:", response);

                if (response.code === "00") {
                    $("#meetingTitle, #meetingDate, #meetingTime, #descriptions").val("");
                    loadMeetings();
                    alert(response.message || "Meeting saved successfully!");
                } else {
                    alert(response.message || "Error saving meeting");
                }
            },
            error: function(xhr) {
                console.error("Save error:", xhr.responseText);
                alert("Failed to save meeting. " + (xhr.responseJSON?.message || "Check console for details."));
            }
        });
    });

    // Edit button handler
    $(document).on("click", ".edit-btns", function() {
        let row = $(this).closest("tr");
        let meetingId = row.data("id");
        let meetingTitle = row.find("td:eq(1)").text();
        let meetingDate = row.find("td:eq(2)").text();
        let meetingTime = row.find("td:eq(3)").text();
        let description = row.find("td:eq(4)").text();

        $("#meetingTitle").val(meetingTitle);
        $("#meetingDate").val(meetingDate);
        $("#meetingTime").val(meetingTime);
        $("#descriptions").val(description);

        $("#updateMeeting").data("id", meetingId).show();
        $("#addMeeting").hide();
    });

    // Delete button handler
    $(document).on("click", ".delete-btns", function() {
        let row = $(this).closest("tr");
        let meetingId = row.data("id");

        if (confirm("Are you sure you want to delete this meeting?")) {
            $.ajax({
                url: `http://localhost:8080/api/v1/meeting/delete/${meetingId}`,
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                success: function() {
                    alert("Meeting deleted successfully.");
                    loadMeetings();
                },
                error: function(xhr) {
                    console.error("Delete error:", xhr.responseText);
                    alert("Failed to delete meeting.");
                }
            });
        }
    });

    // Update button handler
    $("#updateMeeting").on("click", function(e) {
        e.preventDefault();

        let id = $(this).data("id");
        const meetingTitle = $("#meetingTitle").val().trim();
        const meetingDate = $("#meetingDate").val().trim();
        const meetingTime = $("#meetingTime").val().trim();
        const description = $("#descriptions").val().trim();

        if (!meetingTitle || !meetingDate || !meetingTime) {
            alert("Please fill in all required fields (Title, Date, Time)");
            return;
        }

        $.ajax({
            url: "http://localhost:8080/api/v1/meeting/update",
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify({
                meetingId: id,
                meetingTitle,
                meetingDate,
                meetingTime,
                description
            }),
            headers: {
                'Authorization': `Bearer ${token}`
            },
            success: function(response) {
                alert("Meeting updated successfully.");
                $("#meetingTitle, #meetingDate, #meetingTime, #descriptions").val("");
                $("#updateMeeting").hide().removeData("id");
                $("#addMeeting").show();
                loadMeetings();
            },
            error: function(xhr) {
                console.error("Update error:", xhr.responseText);
                alert("Failed to update meeting. " + (xhr.responseJSON?.message || "Check console for details."));
            }
        });
    });

    $('#refreshTable').off('click').on('click', function (){
        loadMeetings();
    });
});
///////////////////////////////////////////////////////////////////////////////
/*Meeting Attendance*/
///////////////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function (e) {
    loadAttendance();
    loadMeetings();
    loadMembersToAttendance();
});
function loadAttendance() {
        const token = localStorage.getItem("authToken");
        if (!token) {
            console.error("No auth token found");
            return;
        }

        $.ajax({
            url: 'http://localhost:8080/api/v1/attendance/getAllAttendance',
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            success: function (response) {
                console.log("API Response:", response);
                if (!response || !response.data) {
                    console.error("Invalid response format");
                    return;
                }

                const tableBody = $("#meetingAttendTableBody");
                if (tableBody.length === 0) {
                    console.error("Table body not found - check your HTML ID");
                    return;
                }

                tableBody.empty();

                response.data.forEach(attendance => {
                    tableBody.append(`
                    <tr>
                        <td>${attendance.meetingAttendanceId}</td>
                        <td>${attendance.user.userId}</td>
                        <td>${attendance.dateTime}</td>
                    </tr>
                `);
                });
            }
        });
    }
$(document).on('click', '#saveAttendance', function() {
    // Get form values
    const meetingId = $('#meetingID').val().trim();
    const memberId = $('#memberID').val().trim();

    // Validate required fields
    if (!meetingId || !memberId) {
        alert('Please fill all required fields');
        return;
    }

    // Convert values to integers to ensure proper format
    const meetingIdInt = parseInt(meetingId, 10);
    const memberIdInt = parseInt(memberId, 10);

    // Check if conversion was successful
    if (isNaN(meetingIdInt) || isNaN(memberIdInt)) {
        alert('Invalid meeting or member ID format');
        return;
    }

    // Create DTO structure matching your backend expectations
    // Using the simpler structure from the error handling code I provided earlier
    const attendanceDTO = {
        meetingId: meetingIdInt,
        userId: memberIdInt
    };

    console.log('Sending data:', JSON.stringify(attendanceDTO));

    const token = localStorage.getItem('authToken');
    if (!token) {
        alert('Authentication token missing. Please login again.');
        return;
    }

    // Disable button to prevent multiple submissions
    $('#saveAttendance').prop('disabled', true).text('Saving...');

    $.ajax({
        url: 'http://localhost:8080/api/v1/attendance/mark', // Changed to match backend endpoint
        method: 'POST',
        contentType: 'application/json',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        data: JSON.stringify(attendanceDTO),
        success: function(response) {
            console.log('API Response:', response);
            alert('Attendance saved successfully!');

            // Reset form
            $('#meetingsTitle').val('').trigger('change');
            $('#memberSelect').val('').trigger('change');
            $('#meetingID').val('');
            $('#memberID').val('');

            // Reload data if you have a table
            if (typeof loadAttendance === 'function') {
                loadAttendance();
            }
        },
        error: function(xhr, status, error) {
            console.error('API Error:', xhr.responseText);

            let errorMessage = 'Failed to save attendance';
            try {
                const errorResponse = JSON.parse(xhr.responseText);
                errorMessage += ': ' + (errorResponse.message || error);
            } catch (e) {
                errorMessage += ': ' + error;
            }

            alert(errorMessage);
        },
        complete: function() {
            // Re-enable the button
            $('#saveAttendance').prop('disabled', false).text('Save Attendance');
        }
    });
});

function loadMeetings() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error('No auth token found');
        return;
    }

    $.ajax({
        url: 'http://localhost:8080/api/v1/attendance/loadAllMeetings',
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        success: function(response) {
            console.log('Full API Response:', response);

            // Check if response exists
            if (!response) {
                console.error('Empty response received');
                return;
            }

            // Log the structure to understand what you're getting
            console.log('Response code:', response.code);
            console.log('Response content:', response.content);
            console.log('Response message:', response.message);

            // More flexible response handling
            let meetings = [];

            // Check different possible response structures
            if (response.content) {
                meetings = response.content;
            } else if (Array.isArray(response)) {
                meetings = response; // in case the API returns the array directly
            } else if (response.data) {
                meetings = response.data; // alternative common response structure
            }

            if (!meetings || meetings.length === 0) {
                console.error('No meetings found in response');
                return;
            }

            const select = $('#meetingsTitle');
            select.empty();
            select.append('<option value="">Select Meetings Title</option>');

            meetings.forEach(meeting => {
                // More defensive property access
                const meetingId = meeting.meetingId || meeting.id || '';
                const title = meeting.title || meeting.meetingTitle || 'Untitled Meeting';

                if (meetingId) {
                    select.append(`<option value="${meetingId}">${title}</option>`);
                }
            });

            // Add change event handler
            select.on('change', function() {
                const selectedMeetingId = $(this).val();
                const selectedMeetingTitle = $(this).find('option:selected').text();
                $('#meetingID').val(selectedMeetingId);
                console.log(`Selected Meeting ID: ${selectedMeetingId}, Title: ${selectedMeetingTitle}`);
            });
        },
        error: function(xhr, status, error) {
            console.error('Error loading meetings:', error);
            console.log('XHR response:', xhr.responseText);
            alert('Failed to load meetings. Please check console for details.');
        }
    });
}
function loadMembersToAttendance() {
    const token = localStorage.getItem('authToken'); // Match the same token key as in loadMeetings
    if (!token) {
        console.error('No auth token found');
        return;
    }

    $.ajax({
        url: 'http://localhost:8080/api/v1/attendance/loadAllMembers',
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        success: function(response) {
            console.log('Full API Response:', response);

            // Check if response exists
            if (!response) {
                console.error('Empty response received');
                return;
            }

            // Log the structure to understand what you're getting
            console.log('Response code:', response.code);
            console.log('Response content:', response.content);
            console.log('Response message:', response.message);

            // More flexible response handling
            let members = [];

            // Check different possible response structures
            if (response.content) {
                members = response.content;
            } else if (Array.isArray(response)) {
                members = response; // in case the API returns the array directly
            } else if (response.data) {
                members = response.data; // alternative common response structure
            }

            if (!members || members.length === 0) {
                console.error('No members found in response');
                return;
            }

            const select = $('#memberSelect');
            select.empty();
            select.append('<option value="">Select Member</option>');

            members.forEach(member => {
                // More defensive property access
                const userId = member.userId || member.id || '';
                const email = member.email || 'No Email';
                const name = member.name || member.fullName || 'Unknown Member';

                // Display name and email if both available, otherwise just what's available
                const displayText = name !== 'Unknown Member' && email !== 'No Email'
                    ? `${name} (${email})`
                    : (name !== 'Unknown Member' ? name : email);

                if (userId) {
                    select.append(`<option value="${userId}" data-email="${email}">${displayText}</option>`);
                }
            });

            // Add change event handler
            select.on('change', function() {
                const selectedMemberId = $(this).val();
                $('#memberID').val(selectedMemberId);
                console.log(`Selected Member ID: ${selectedMemberId}`);
            });
        },
        error: function(xhr, status, error) {
            console.error('Error loading members:', error);
            console.log('XHR response:', xhr.responseText);
            alert('Failed to load members. Please check console for details.');

            // If unauthorized (401), redirect to login
            if (xhr.status === 401) {
                window.location.href = '/login.html';
            }
        }
    });
}

///////////////////////////////////////////////////////////////////////////////
/*Create Event*/
///////////////////////////////////////////////////////////////////////////////

