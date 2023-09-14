import React, { useState, useEffect } from "react";

const SolarSystemOpenData: React.FC = () => {
    const [solarData, setSolarData] = useState<any | null>(null);

    useEffect(() => {
    fetch("https://api.le-systeme-solaire.net/rest/bodies/")
        .then((response) => response.json())
        .then((data) => {
        const celestialBodies = data.bodies.filter(
            (body: any) => body.isPlanet && !body.isDwarfPlanet
        );

        // Generate a random index to select a celestial body
        const randomIndex = Math.floor(Math.random() * celestialBodies.length);

        // Set the selected celestial body
        setSolarData(celestialBodies[randomIndex]);
        })
        .catch((error) => {
        console.error("Error fetching data:", error);
        });
}, []);

    return (
    <div>
        <h1>Random Celestial Body</h1>
        {solarData && (
        <div>
            <h2>{solarData.englishName}</h2>
            <img src={solarData.image} alt={solarData.englishName} />
            <p>{solarData.description}</p>
        </div>
        )}
    </div>
    );
};

export default SolarSystemOpenData;
