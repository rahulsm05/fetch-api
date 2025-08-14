const userContainer = document.getElementById("userContainer");
const reloadBtn = document.getElementById("reloadBtn");
const simulateErrorBtn = document.getElementById("simulateErrorBtn");

async function fetchUsers(apiUrl = "https://jsonplaceholder.typicode.com/users") {
    userContainer.innerHTML = "Loading...";
    try {
        let response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let users = await response.json();
        displayUsers(users);

    } catch (error) {
        userContainer.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
    }
}

function displayUsers(users) {
    userContainer.innerHTML = "";
    users.forEach(user => {
        let card = document.createElement("div");
        card.className = "userCard";
        card.innerHTML = `
            <h3>${user.name}</h3>
            <p>Email: ${user.email}</p>
            <p>Address: ${user.address.street}, ${user.address.city}</p>
        `;
        userContainer.appendChild(card);
    });
}

reloadBtn.addEventListener("click", () => fetchUsers());
simulateErrorBtn.addEventListener("click", () => fetchUsers("https://invalid-api-url.com"));

// Load data on page load
fetchUsers();
