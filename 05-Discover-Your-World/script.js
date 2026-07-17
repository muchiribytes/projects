// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Geolocation Setup ---
    const locationBtn = document.getElementById('getLocation');

    locationBtn.addEventListener('click', () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser.');
            return;
        }

        // Inform the user we are searching
        locationBtn.textContent = "Locating...";

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                
                // Determine approximate continent based on coordinates
                const continent = estimateContinent(lat, lon);
                
                locationBtn.textContent = "Discover Location";
                alert(`📍 Found You!\n\nYour Coordinates: ${lat.toFixed(2)}°, ${lon.toFixed(2)}°\nEstimated Continent: ${continent}`);
            },
            (error) => {
                locationBtn.textContent = "Discover Location";
                alert(`Unable to retrieve your location. Error: ${error.message}`);
            }
        );
    });

    // --- 2. Interactive Image Map Setup ---
    const mapAreas = document.querySelectorAll('map area');

    mapAreas.forEach(area => {
        area.addEventListener('click', (event) => {
            event.preventDefault(); // Prevents the href="#" from jumping the page
            
            const continentName = area.getAttribute('title');
            const facts = getContinentFacts(continentName);
            
            alert(`🌍 Destination: ${continentName}\n\n${facts}`);
        });
    });
});

// Helper: Quick coordinates estimation for continents
function estimateContinent(lat, lon) {
    if (lat > 10 && lon > -170 && lon < -50) return "North America";
    if (lat <= 12 && lat > -56 && lon > -90 && lon < -34) return "South America";
    if (lat > 35 && lat < 72 && lon > -25 && lon < 40) return "Europe";
    if (lat > -35 && lat < 37 && lon > -17 && lon < 51) return "Africa";
    if (lat > 10 && lat < 75 && lon > 25 && lon < 180) return "Asia";
    if (lat > -47 && lat < -10 && lon > 110 && lon < 180) return "Australia and Oceania";
    return "the Ocean (or close to a border)!";
}

// Helper: Fun facts for each map click
function getContinentFacts(continent) {
    const data = {
        "North America": "Home to the Grand Canyon and the world's largest freshwater lake (Lake Superior)!",
        "South America": "Houses the massive Amazon Rainforest and the world's highest uninterrupted waterfall, Angel Falls.",
        "Europe": "The second-smallest continent, but holds the world's most-visited museum, the Louvre in Paris.",
        "Africa": "The cradle of humanity, home to the longest river on Earth (The Nile) and the Sahara Desert.",
        "Asia": "The largest and most populous continent, holding the highest peak in the world, Mount Everest.",
        "Australia and Oceania": "Known for the Great Barrier Reef, distinct marsupials like kangaroos, and thousands of tropical islands."
    };
    return data[continent] || "A mysterious place with many geographical marvels!";
}