
document.addEventListener('DOMContentLoaded', async function () {
    const API_BASE_URL = 'http://localhost:8080/api/v1/member';
    const memberTableBody = document.getElementById('memberTableBody');
    const countElement = document.getElementById('memberCount');
    let currentMembers = [];

    // Get auth token from localStorage
    const getAuthToken = () => {
        return localStorage.getItem('authToken');
    };

    // Check if user is authenticated
    const isAuthenticated = () => {
        return !!getAuthToken();
    };

    const api = {
        getAllMembers: async () => {
            try {
                // Check authentication before making request
                if (!isAuthenticated()) {
                    throw new Error('Authentication token missing');
                }

                const token = getAuthToken();
                console.log('Using auth token:', token); // Debug logging

                const response = await fetch(`${API_BASE_URL}/getAllMembers`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    credentials: 'include'
                });

                console.log('API Response status:', response.status); // Debug response

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('API error response:', errorText);
                    throw new Error(`Failed to fetch members: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                console.log('API data received:', data); // Debug data

                // Updated to match actual API response structure
                if (data.code === 200 || data.code === '200') {
                    // Check both data and content fields for the array
                    return data.data || data.content || [];
                } else {
                    showToast('Error', data.message || 'Unexpected error', 'error');
                    return [];
                }

            } catch (error) {
                console.error('API Error details:', error);
                showToast('Error', error.message, 'error');
                return [];
            }
        }
    };

// And updated Toast function to prevent undefined errors
    const showToast = (title, message, type) => {
        // Default values to prevent undefined errors
        const safeTitle = title || 'Notification';
        const safeMessage = message || '';
        const safeType = type || 'info';

        console.log(`[${safeType}] ${safeTitle}: ${safeMessage}`);
        // Replace with actual toast notification if available
    };

    // Populate member table
    const loadMembers = async () => {
        try {
            // Verify HTML elements exist
            if (!memberTableBody) {
                console.error("Element 'memberTableBody' not found in the document");
                return;
            }

            if (!countElement) {
                console.error("Element 'memberCount' not found in the document");
                // Continue anyway as it's not critical
            }

            if (!isAuthenticated()) {
                showToast('Authentication Error', 'You are not authenticated. Please log in again.', 'error');
                // Redirect to login page if needed
                // window.location.href = 'login.html';
                return;
            }

            showToast('Loading', 'Fetching member data...', 'info');
            const members = await api.getAllMembers();
            currentMembers = members;

            // Clear previous data
            memberTableBody.innerHTML = '';

            // Update member count if the element exists
            if (countElement) {
                countElement.textContent = members.length;
            }

            if (members.length === 0) {
                // Show a message in the table for empty results
                const emptyRow = document.createElement('tr');
                emptyRow.innerHTML = '<td colspan="5" class="text-center">No members found</td>';
                memberTableBody.appendChild(emptyRow);
                return;
            }

            // Populate table rows
            members.forEach(member => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${member.memberId || 'N/A'}</td>
                    <td>${member.fullName || 'N/A'}</td>
                    <td>${member.joinDate ? new Date(member.joinDate).toLocaleDateString() : 'N/A'}</td>
                    <td>${member.nic || 'N/A'}</td>
                    <td>${member.positionsHeld || 'N/A'}</td>
                `;
                memberTableBody.appendChild(row);
            });

            showToast('Success', `Loaded ${members.length} members`, 'success');
        } catch (err) {
            console.error('Error in loadMembers:', err);
            showToast('Error', 'Failed to load members: ' + err.message, 'error');
        }
    };

    // Load members on page load
    try {
        await loadMembers();
    } catch (err) {
        console.error('Initial load error:', err);
    }
});