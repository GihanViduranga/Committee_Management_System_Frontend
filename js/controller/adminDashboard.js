document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    const navLinks = document.querySelectorAll('.nav-link');

    // Handle click events
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active class from all links
            navLinks.forEach(item => item.classList.remove('active'));

            // Add active class to clicked link
            this.classList.add('active');

            // Hide all content sections
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.add('d-none');
            });

            // Show the target section
            /*const targetId = this.getAttribute('data-target');
            document.getElementById(targetId).classList.remove('d-none');*/
        });
    });

    // Initialize first link as active (optional)
    document.querySelector('.nav-link').click();

    // Initialize content sections
    const Dashboard = document.getElementById("dashboard");
    const UpdateUser = document.getElementById("updateUser");
    const Event = document.getElementById("Event");
    const Member = document.getElementById("members");
    const Meetings = document.getElementById("meetings");
    const EventFacility = document.getElementById("eventFacility");
    const EventType = document.getElementById("event_types");

    const MainContent = document.getElementById("MainContent");
    const MemberUpdate = document.getElementById("UserList");
    const EventCreation = document.getElementById("eventCreation");
    const MemberList = document.getElementById("memberList");
    const MeetingCreate = document.getElementById("meetingsCreate");
    const Event_Facility = document.getElementById("eventFac");
    const EventTypeCreate = document.getElementById("Event_type");

    // Set initial display
    MainContent.style.display = "block";
    MemberUpdate.style.display = "none";
    EventCreation.style.display = "none";
    MemberList.style.display = "none";
    MeetingCreate.style.display = "none";
    Event_Facility.style.display = "none";
    EventTypeCreate.style.display = "none";

    // Set up event listeners for navigation
    Dashboard.addEventListener("click", (e) => {
        MainContent.style.display = "block";
        MemberUpdate.style.display = "none";
        EventCreation.style.display = "none";
        MemberList.style.display = "none";
        MeetingCreate.style.display = "none";
        Event_Facility.style.display = "none";
        EventTypeCreate.style.display = "none";
    });

    UpdateUser.addEventListener("click", (e) => {
        MainContent.style.display = "none";
        MemberUpdate.style.display = "block";
        EventCreation.style.display = "none";
        MemberList.style.display = "none";
        MeetingCreate.style.display = "none";
        Event_Facility.style.display = "none";
        EventTypeCreate.style.display = "none";

        loadUsers(); // Load users when the Update User section is shown
    });

    Event.addEventListener("click",(e)=>{
        MainContent.style.display = "none";
        MemberUpdate.style.display = "none";
        EventCreation.style.display = "block";
        MemberList.style.display = "none";
        MeetingCreate.style.display = "none";
        Event_Facility.style.display = "none";
        EventTypeCreate.style.display = "none";
    });

    Member.addEventListener("click", (e) => {
        MainContent.style.display = "none";
        MemberUpdate.style.display = "none";
        EventCreation.style.display = "none";
        MemberList.style.display = "block";
        MeetingCreate.style.display = "none";
        Event_Facility.style.display = "none";
        EventTypeCreate.style.display = "none";
    });

    Meetings.addEventListener("click", (e) => {
        MainContent.style.display = "none";
        MemberUpdate.style.display = "none";
        EventCreation.style.display = "none";
        MemberList.style.display = "none";
        MeetingCreate.style.display = "block";
        Event_Facility.style.display = "none";
        EventTypeCreate.style.display = "none";
    })

    EventFacility.addEventListener("click", (e) => {
        MainContent.style.display = "none";
        MemberUpdate.style.display = "none";
        EventCreation.style.display = "none";
        MemberList.style.display = "none";
        MeetingCreate.style.display = "none";
        Event_Facility.style.display = "block";
        EventTypeCreate.style.display = "none";
    })

    EventType.addEventListener("click", (e) => {
        MainContent.style.display = "none";
        MemberUpdate.style.display = "none";
        EventCreation.style.display = "none";
        MemberList.style.display = "none";
        MeetingCreate.style.display = "none";
        Event_Facility.style.display = "none";
        EventTypeCreate.style.display = "block";
    })
    // Initialize user management functionality
    setupUserFormListeners();
    initializeUserManagement();
});

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

// Function to load all event facilities
// Function to load all event facilities
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

