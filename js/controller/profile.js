const API_BASE_URL = "http://localhost:8080/api/v1/User";

const getAuthToken = () => localStorage.getItem('authToken');

let userProfile = null;

// Fetch logged-in user profile
const fetchUserProfile = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });

        if (!response.ok) throw new Error('Failed to fetch profile');
        userProfile = await response.json();

        // Set image and name on nav bar
        document.getElementById("profilePic").outerHTML =
            `<img src="http://localhost:8080/${userProfile.image.replace(/\\/g, "/")}" 
            alt="User Image" 
            style="width: 50px; height: 50px; object-fit: cover; border-radius: 50%;" />`;
        document.getElementById("admin1Name").textContent = userProfile.fullName;

    } catch (error) {
        console.error("Error fetching profile:", error);
    }
}

// Show/hide profile card with details
const toggleProfileCard = () => {
    const card = document.getElementById("profileCard");

    if (card.style.display === "none") {
        if (userProfile) {
            const imageUrl = `http://localhost:8080/${userProfile.image.replace(/\\/g, "/")}`;
            document.getElementById("cardProfilePic").src = imageUrl;


            document.getElementById("cardName").textContent = userProfile.fullName;
            document.getElementById("cardEmail").textContent = userProfile.email;
            document.getElementById("cardPhone").textContent = userProfile.phoneNumber;
            document.getElementById("cardAddress").textContent = userProfile.address;
            document.getElementById("cardBirthday").textContent = userProfile.birthday;
            document.getElementById("cardRole").textContent = userProfile.role;
        }
        card.style.display = "block";
    } else {
        card.style.display = "none";
    }
}

// Load profile on page load
window.onload = () => {
    if (getAuthToken()) {
        fetchUserProfile();
    }
}