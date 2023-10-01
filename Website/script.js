async function fetchPlayer(userId) {
    try {
        const response = await fetch(`http://localhost:3000/get-player?userId=${userId}`);
        if (response.ok) {
            const data = await response.json();
            updatePlayerDevice(data);
        } else {
            console.error("Failed to fetch player data");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

function updatePlayerDevice(playerData) {
    let deviceDiv = document.getElementById(`device-${playerData.userId}`);

    if (!deviceDiv) {
        deviceDiv = document.createElement('div');
        deviceDiv.className = "device";
        deviceDiv.id = `device-${playerData.userId}`;
        document.querySelector('.container').appendChild(deviceDiv);
    }

    deviceDiv.innerHTML = `
        <img src="${playerData.avatarUrl}" alt="Avatar">
        <h3>${playerData.playerName}</h3>
        <p>Status: ${playerData.status}</p>
        <p>${playerData.valueName}: ${playerData.value}</p>
    `;
}

window.addEventListener('load', () => {
    fetchPlayer('3270375147');
});


