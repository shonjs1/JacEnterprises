import React, { useState, useEffect } from 'react';

const SolarSystemData: React.FC = () => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        fetch('https://api.le-systeme-solaire.net/rest/')
            .then((response) => response.json())
            .then((data) => {
            console.log('API Data:', data); // Log the data
            setData(data);
            })
            .catch((error) => {
            console.error('Error fetching data:', error);
            });
    }, []);

return (
    <div>
        <h1>Solar System Data</h1>
        <ul>
        {data.map((planet: any) => (
            <li key={planet.id}>
            <h2>{planet.englishName}</h2>
            <img src={planet.image} alt={planet.englishName} />
            </li>
        ))}
        </ul>
    </div>
    );
};

export default SolarSystemData;