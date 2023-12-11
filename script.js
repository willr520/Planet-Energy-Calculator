
async function fetchData(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function calculateEnergy() {
    const planetIds = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];

    for (const planetId of planetIds) {
        const energySpan = document.getElementById(`${planetId}Energy`);

        const mass = getMassForPlanet(planetId);

        if (mass) {
            const data = { mass: mass };
            const result = await fetchData('https://cosmiccalculusfinalastarten.onrender.com/calculate-energy', data);
            const energyValue = result.energy;
            energySpan.innerText = `Energy: ${energyValue} J`;
        } else {
            alert(`Mass not available for ${planetId}.`);
        }
    }
}

function getMassForPlanet(planetId) {
    switch (planetId) {
        case 'mercury':
            return 3.285e23;  
        case 'venus':
            return 4.867e24;  
        case 'earth':
            return 5.972e24;
        case 'mars':
            return 6.39e23;
        case 'jupiter':
            return 1.89813e27;
        case 'saturn':
            return 5.683e26;
        case 'uranus':
            return 8.681e25;
        case 'neptune':
            return 1.024e26;
        default:
            return null;
    }
}
