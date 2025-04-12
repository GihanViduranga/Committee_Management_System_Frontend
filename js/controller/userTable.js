document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const API_BASE_URL = 'http://localhost:8080/api/v1/User';
    const ITEMS_PER_PAGE = 10;

    // State management
    let currentUsers = [];
    let filteredUsers = [];
    let currentPage = 1;
    let isEditMode = false;

    // DOM Elements
    const usersTableBody = document.getElementById('usersTableBody');
    const userSearchInput = document.getElementById('userSearchInput');
    const userModal = document.getElementById('userModal');
    const userForm = document.getElementById('userForm');
    const modalTitle = document.getElementById('modalTitle');
    const modalClose = document.querySelector('.modal-close');
    const addUserBtn = document.getElementById('addUserBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const refreshUsersBtn = document.getElementById('refreshUsersBtn');
    const prevPageBtn = document.getElementById('prevPageBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');
    const paginationNumbers = document.getElementById('paginationNumbers');
    const startRecord = document.getElementById('startRecord');
    const endRecord = document.getElementById('endRecord');
    const totalRecords = document.getElementById('totalRecords');
    const toast = document.getElementById('toast');
    const imagePreview = document.getElementById('imagePreview');
    const previewImage = document.getElementById('previewImage');
    const imageInput = document.getElementById('image');

    // Get auth token from localStorage
    const getAuthToken = () => {
        return localStorage.getItem('authToken');
    };

    // Check if user is authenticated
    const isAuthenticated = () => {
        return !!getAuthToken();
    };

    // API calls with authentication headers
    const api = {
        getAllUsers: async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/getAll`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${getAuthToken()}`
                    }
                });
                if (!response.ok) throw new Error('Failed to fetch users');
                const data = await response.json();
                return data.data || [];
            } catch (error) {
                showToast('Error', error.message, 'error');
                return [];
            }
        },

        registerUser: async (formData) => {
            try {
                const response = await fetch(`${API_BASE_URL}/registerUser`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${getAuthToken()}`
                    },
                    body: formData
                });
                return await response.json();
            } catch (error) {
                throw new Error(error.message);
            }
        },

        updateUser: async (userData) => {
            try {
                const response = await fetch(`${API_BASE_URL}/update`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${getAuthToken()}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                });
                return await response.json();
            } catch (error) {
                throw new Error(error.message);
            }
        },

        activateUser: async (userId) => {
            try {
                const response = await fetch(`${API_BASE_URL}/activate/${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${getAuthToken()}`
                    }
                });
                return await response.json();
            } catch (error) {
                throw new Error(error.message);
            }
        },

        deactivateUser: async (userId) => {
            try {
                const response = await fetch(`${API_BASE_URL}/deactivate/${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${getAuthToken()}`
                    }
                });
                return await response.json();
            } catch (error) {
                throw new Error(error.message);
            }
        }
    };

    // Load users and render table
    const loadUsers = async () => {
        if (!isAuthenticated()) {
            showToast('Authentication Error', 'Please log in to continue', 'error');
            return;
        }

        usersTableBody.innerHTML = `
            <tr class="loading-row">
                <td colspan="8">
                    <div class="loading-spinner"></div>
                    <p>Loading users...</p>
                </td>
            </tr>
        `;

        try {
            const data = await api.getAllUsers();
            currentUsers = data;
            filteredUsers = [...currentUsers];
            renderUsers();
            updatePagination();
        } catch (error) {
            usersTableBody.innerHTML = `
                <tr class="error-row">
                    <td colspan="8">
                        <i class="bx bx-error-circle"></i>
                        <p>Error loading users. ${error.message}</p>
                    </td>
                </tr>
            `;
        }
    };

    // Render users table with pagination
    const renderUsers = () => {
        const searchTerm = userSearchInput.value.toLowerCase();
        filteredUsers = currentUsers.filter(user => {
            return (
                user.fullName?.toLowerCase().includes(searchTerm) ||
                user.email?.toLowerCase().includes(searchTerm) ||
                user.role?.toLowerCase().includes(searchTerm) ||
                user.phoneNumber?.toLowerCase().includes(searchTerm)
            );
        });

        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const usersToDisplay = filteredUsers.slice(startIndex, endIndex);

        if (usersToDisplay.length === 0) {
            usersTableBody.innerHTML = `
                <tr class="empty-row">
                    <td colspan="8">
                        <i class="bx bx-search-alt"></i>
                        <p>No users found${searchTerm ? ' matching: ' + searchTerm : ''}.</p>
                    </td>
                </tr>
            `;
        } else {
            usersTableBody.innerHTML = usersToDisplay.map(user => `
                <tr>
                    <td>${user.userId}</td>
                    <td>
                    ${user.image
                ? `<img src="http://localhost:8080/${user.image.replace(/\\/g, "/")}" alt="User Image" style="width: 50px; height: 50px; object-fit: cover; border-radius: 50%;" />`
                : 'No image'}
                    </td>
                    <td>${user.fullName}</td>
                    <td>${user.email}</td>
                    <td>${user.phoneNumber}</td>
                    <td>
                        <span class="badge badge-${getRoleBadgeClass(user.role)}">${user.role}</span>
                    </td>
                    <td>
                        <span class="status ${user.active ? 'active' : 'inactive'}">
                            ${user.active ? 'Active' : 'Inactive'}
                        </span>
                    </td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-icon edit" data-id="${user.userId}">
                                <i class="bx bx-edit"></i>
                            </button>
                            ${user.active ?
                `<button class="btn-icon deactivate" data-id="${user.userId}">
                                    <i class="bx bx-user-x"></i>
                                </button>` :
                `<button class="btn-icon activate" data-id="${user.userId}">
                                    <i class="bx bx-user-check"></i>
                                </button>`
            }
                        </div>
                    </td>
                </tr>
            `).join('');

            // Update pagination info
            startRecord.textContent = startIndex + 1;
            endRecord.textContent = Math.min(endIndex, filteredUsers.length);
            totalRecords.textContent = filteredUsers.length;

            // Add event listeners to action buttons
            document.querySelectorAll('.btn-icon.edit').forEach(btn => {
                btn.addEventListener('click', handleEditUser);
            });

            document.querySelectorAll('.btn-icon.activate').forEach(btn => {
                btn.addEventListener('click', handleActivateUser);
            });

            document.querySelectorAll('.btn-icon.deactivate').forEach(btn => {
                btn.addEventListener('click', handleDeactivateUser);
            });
        }
    };

    // Update pagination controls
    const updatePagination = () => {
        const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

        // Update disabled state for prev/next buttons
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;

        // Generate page numbers
        let paginationHTML = '';
        const maxPageButtons = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
        let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

        if (endPage - startPage + 1 < maxPageButtons) {
            startPage = Math.max(1, endPage - maxPageButtons + 1);
        }

        if (startPage > 1) {
            paginationHTML += `<button class="page-number" data-page="1">1</button>`;
            if (startPage > 2) {
                paginationHTML += `<span class="page-ellipsis">...</span>`;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            paginationHTML += `
                <button class="page-number ${i === currentPage ? 'active' : ''}" 
                        data-page="${i}">${i}</button>
            `;
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                paginationHTML += `<span class="page-ellipsis">...</span>`;
            }
            paginationHTML += `<button class="page-number" data-page="${totalPages}">${totalPages}</button>`;
        }

        paginationNumbers.innerHTML = paginationHTML;

        // Add event listeners to pagination buttons
        document.querySelectorAll('.page-number').forEach(btn => {
            btn.addEventListener('click', (e) => {
                currentPage = parseInt(e.target.dataset.page);
                renderUsers();
                updatePagination();
            });
        });
    };

    // Utility function to get role badge class
    const getRoleBadgeClass = (role) => {
        switch (role?.toUpperCase()) {
            case 'ADMIN': return 'primary';
            case 'MANAGER': return 'success';
            case 'USER': return 'info';
            default: return 'secondary';
        }
    };

    // Handle user activation
    const handleActivateUser = async (e) => {
        const userId = e.currentTarget.dataset.id;
        if (confirm('Are you sure you want to activate this user?')) {
            try {
                const response = await api.activateUser(userId);
                if (response.code === 201) {
                    showToast('Success', 'User activated successfully', 'success');
                    loadUsers();
                } else {
                    showToast('Error', response.message, 'error');
                }
            } catch (error) {
                showToast('Error', error.message, 'error');
            }
        }
    };

    // Handle user deactivation
    const handleDeactivateUser = async (e) => {
        const userId = e.currentTarget.dataset.id;
        if (confirm('Are you sure you want to deactivate this user?')) {
            try {
                const response = await api.deactivateUser(userId);
                if (response.code === 201) {
                    showToast('Success', 'User deactivated successfully', 'success');
                    loadUsers();
                } else {
                    showToast('Error', response.message, 'error');
                }
            } catch (error) {
                showToast('Error', error.message, 'error');
            }
        }
    };

    // Show Add User Form
    const showAddUserForm = () => {
        isEditMode = false;
        modalTitle.textContent = 'Add New User';
        userForm.reset();
        previewImage.src = '/api/placeholder/150/150';
        document.getElementById('passwordGroup').style.display = 'block';
        document.getElementById('password').required = true;
        userModal.style.display = 'block';
    };

    // Handle Edit User
    const handleEditUser = (e) => {
        const userId = e.currentTarget.dataset.id;
        const user = currentUsers.find(u => u.userId == userId);

        if (user) {
            isEditMode = true;
            modalTitle.textContent = 'Edit User';

            // Fill form with user data
            document.getElementById('userId').value = user.userId;
            document.getElementById('fullName').value = user.fullName || '';
            document.getElementById('email').value = user.email || '';
            document.getElementById('phoneNumber').value = user.phoneNumber || '';
            document.getElementById('address').value = user.address || '';
            document.getElementById('role').value = user.role || '';

            // Format birthday if available
            if (user.birthday) {
                const birthdayDate = new Date(user.birthday);
                const formattedDate = birthdayDate.toISOString().split('T')[0];
                document.getElementById('birthday').value = formattedDate;
            }

            // Display user image if available
            if (user.image) {
                previewImage.src = user.image;
            } else {
                previewImage.src = '/api/placeholder/150/150';
            }

            // Hide password field for updates (optional)
            document.getElementById('passwordGroup').style.display = 'block';
            document.getElementById('password').required = false;

            userModal.style.display = 'block';
        }
    };

    // Handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isEditMode) {
                // Handle update user
                const userId = document.getElementById('userId').value;
                const userData = {
                    userId: userId,
                    fullName: document.getElementById('fullName').value,
                    email: document.getElementById('email').value,
                    birthday: document.getElementById('birthday').value,
                    phoneNumber: document.getElementById('phoneNumber').value,
                    address: document.getElementById('address').value,
                    role: document.getElementById('role').value,
                    password: document.getElementById('password').value
                };

                const response = await api.updateUser(userData);
                if (response.code === 201) {
                    showToast('Success', 'User updated successfully', 'success');
                    userModal.style.display = 'none';
                    loadUsers();
                } else {
                    showToast('Error', response.message, 'error');
                }
            } else {
                // Handle add new user
                const formData = new FormData(userForm);
                const response = await api.registerUser(formData);

                if (response.code === 201) {
                    showToast('Success', 'User added successfully', 'success');
                    userModal.style.display = 'none';
                    loadUsers();
                } else {
                    showToast('Error', response.message, 'error');
                }
            }
        } catch (error) {
            showToast('Error', error.message, 'error');
        }
    };

    // Show toast notification
    const showToast = (title, message, type = 'success') => {
        document.getElementById('toastTitle').textContent = title;
        document.getElementById('toastDescription').textContent = message;

        const toastIcon = document.getElementById('toastIcon');
        toastIcon.className = type === 'success'
            ? 'bx bx-check-circle'
            : 'bx bx-error-circle';

        toast.className = `toast toast-${type} show`;

        // Auto hide after 5 seconds
        setTimeout(() => {
            toast.className = toast.className.replace('show', '');
        }, 5000);
    };

    // Handle image preview
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Event listeners
    userSearchInput.addEventListener('input', () => {
        currentPage = 1;
        renderUsers();
        updatePagination();
    });

    addUserBtn.addEventListener('click', showAddUserForm);

    refreshUsersBtn.addEventListener('click', loadUsers);

    userForm.addEventListener('submit', handleFormSubmit);

    modalClose.addEventListener('click', () => {
        userModal.style.display = 'none';
    });

    cancelBtn.addEventListener('click', () => {
        userModal.style.display = 'none';
    });

    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderUsers();
            updatePagination();
        }
    });

    nextPageBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
        if (currentPage < totalPages) {
            currentPage++;
            renderUsers();
            updatePagination();
        }
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === userModal) {
            userModal.style.display = 'none';
        }
    });

    // Initialize the component
    if (isAuthenticated()) {
        loadUsers();
    } else {
        usersTableBody.innerHTML = `
            <tr class="error-row">
                <td colspan="8">
                    <i class="bx bx-lock-alt"></i>
                    <p>Please log in to view user data</p>
                </td>
            </tr>
        `;
    }
});


