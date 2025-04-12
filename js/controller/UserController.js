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

function showEditForm(userId, fullName, birthday, address, phoneNumber, email, role) {
    document.getElementById('userId').value = userId;
    document.getElementById('fullName').value = fullName;
    document.getElementById('birthday').value = formatDateForInput(birthday);
    document.getElementById('address').value = address;
    document.getElementById('phoneNumber').value = phoneNumber;
    document.getElementById('email').value = email;

    const roleSelect = document.getElementById('role');
    for (let i = 0; i < roleSelect.options.length; i++) {
        if (roleSelect.options[i].value === role) {
            roleSelect.selectedIndex = i;
            break;
        }
    }

    document.getElementById('updateUserFormContainer').style.display = 'block';
    document.getElementById('updateUserFormContainer').scrollIntoView({ behavior: 'smooth' });
}

function hideForm() {
    document.getElementById('updateUserFormContainer').style.display = 'none';
}

function formatDateForInput(dateString) {
    if (!dateString) return '';
    try {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    } catch (e) {
        console.error("Error formatting date:", e);
        return dateString;
    }
}

// Global variables for pagination
let allUsers = [];
let currentPage = 1;
let pageSize = 10;
let totalPages = 1;

function initializeUserManagement() {
    document.getElementById('pageSize').addEventListener('change', function() {
        pageSize = parseInt(this.value);
        currentPage = 1;
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

    document.getElementById('userTableBody').addEventListener('click', function(event) {
        const target = event.target;
        const btn = target.closest('.activate-btn, .deactivate-btn');

        if (btn) {
            const userId = btn.getAttribute('data-id');
            if (btn.classList.contains('activate-btn')) {
                activateUser(userId);
            } else {
                deactivateUser(userId);
            }
        }
    });
}

function loadUsers() {
    const token = localStorage.getItem("authToken");
    if (!token) {
        alert("You are not authenticated. Please log in.");
        return;
    }

    toggleLoading(true);

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
                localStorage.removeItem("authToken");
                window.location.href = "/login";
            } else {
                alert("Failed to load users. Please try again later.");
            }
        })
        .finally(() => {
            toggleLoading(false);
        });
}

function displayUsers() {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, allUsers.length);
    const paginatedUsers = allUsers.slice(startIndex, endIndex);

    const userTableBody = document.getElementById('userTableBody');
    userTableBody.innerHTML = '';

    paginatedUsers.forEach(user => {
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
                <span class="badge ${user.active ? 'bg-success' : 'bg-danger'}">
                    ${user.active ? 'Active' : 'Inactive'}
                </span>
            </td>
            <td>
                <div class="btn-group">
                    <button class="btn btn-warning btn-sm" onclick="showEditForm('${user.userId}', '${escapeHtml(user.fullName)}', '${user.birthday}', '${escapeHtml(user.address)}', '${user.phoneNumber}', '${user.email}', '${user.role}')">
                        <i class="fas fa-edit"></i> Edit
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

    // Update pagination info
    document.getElementById('currentEntries').textContent = allUsers.length > 0 ?
        `${startIndex + 1}-${endIndex}` : '0';
    document.getElementById('totalEntries').textContent = allUsers.length;

    totalPages = Math.ceil(allUsers.length / pageSize);
    updatePageNumbers();

    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage === totalPages;
}

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

function updatePageNumbers() {
    const pageNumbersContainer = document.getElementById('pageNumbers');
    pageNumbersContainer.innerHTML = '';

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4);
    }

    if (startPage > 1) {
        addPageButton(1, pageNumbersContainer);
        if (startPage > 2) {
            addEllipsis(pageNumbersContainer);
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        addPageButton(i, pageNumbersContainer, i === currentPage);
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            addEllipsis(pageNumbersContainer);
        }
        addPageButton(totalPages, pageNumbersContainer);
    }
}

function addPageButton(pageNumber, container, isActive = false) {
    const pageBtn = document.createElement('button');
    pageBtn.className = isActive ? 'btn btn-primary' : 'btn btn-outline-secondary';
    pageBtn.textContent = pageNumber;

    if (!isActive) {
        pageBtn.addEventListener('click', () => {
            currentPage = pageNumber;
            displayUsers();
        });
    }

    container.appendChild(pageBtn);
}

function addEllipsis(container) {
    const ellipsis = document.createElement('button');
    ellipsis.className = 'btn btn-outline-secondary disabled';
    ellipsis.textContent = '...';
    ellipsis.disabled = true;
    container.appendChild(ellipsis);
}

function updateUser() {
    const userId = document.getElementById('userId').value;
    const fullName = document.getElementById('fullName').value;
    const birthday = document.getElementById('birthday').value;
    const address = document.getElementById('address').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;

    const payload = {
        userId,
        fullName,
        birthday,
        address,
        phoneNumber,
        email,
        role
    };

    const token = localStorage.getItem("authToken");
    if (!token) {
        alert("You are not authenticated. Please log in.");
        return;
    }

    toggleLoading(true);

    fetch('http://localhost:8080/api/v1/User/update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
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
            showToast('success', 'User updated successfully!');
            hideForm();
            loadUsers();
        })
        .catch(error => {
            console.error('Error updating user:', error);
            showToast('error', 'Error updating user. Please try again.');
        })
        .finally(() => {
            toggleLoading(false);
        });
}

function activateUser(userId) {
    const token = localStorage.getItem("authToken");
    if (!token) {
        alert("You are not authenticated. Please log in.");
        return;
    }

    toggleLoading(true);

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
            showToast('success', 'User activated successfully!');
            updateUserStatus(userId, true);
            if (!data.data) {
                loadUsers();
            }
        })
        .catch(error => {
            console.error('Error activating user:', error);
            if (error.message === "Unauthorized") {
                handleUnauthorized();
            } else {
                showToast('error', 'Error activating user. Please try again.');
            }
        })
        .finally(() => {
            toggleLoading(false);
        });
}

function deactivateUser(userId) {
    const token = localStorage.getItem("authToken");
    if (!token) {
        alert("You are not authenticated. Please log in.");
        return;
    }

    toggleLoading(true);

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
            showToast('success', 'User deactivated successfully!');
            updateUserStatus(userId, false);
            if (!data.data) {
                loadUsers();
            }
        })
        .catch(error => {
            console.error('Error deactivating user:', error);
            if (error.message === "Unauthorized") {
                handleUnauthorized();
            } else {
                showToast('error', 'Error deactivating user. Please try again.');
            }
        })
        .finally(() => {
            toggleLoading(false);
        });
}

function updateUserStatus(userId, isActive) {
    const userIndex = allUsers.findIndex(user => user.userId === userId);
    if (userIndex !== -1) {
        allUsers[userIndex].active = isActive;
        displayUsers();
    }
}

function handleUnauthorized() {
    alert("Your session has expired. Please log in again.");
    localStorage.removeItem("authToken");
    window.location.href = "/login";
}

function showToast(type, message) {
    if (typeof showSuccess === 'function' && typeof showError === 'function') {
        type === 'success' ? showSuccess(message) : showError(message);
        return;
    }
    alert(message);
}

function toggleLoading(show) {
    // Implement your loading indicator logic here
    console.log(show ? "Loading..." : "Done loading");
}

function escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe.toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
