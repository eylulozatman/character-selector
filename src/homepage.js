// homepage.js
import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';
import './homePage.css';
import Combat from './combat';

const PlayerSelection = ({ playerName, setPlayerData }) => {
  const [races, setRaces] = useState([]);
  const [types, setTypes] = useState([]);
  const [weapons, setWeapons] = useState([]);
  const [selectedRaceIndex, setSelectedRaceIndex] = useState(0);
  const [selectedTypeIndex, setSelectedTypeIndex] = useState(0);
  const [selectedWeapon, setSelectedWeapon] = useState(null);

  // Fetch races and weapons
  useEffect(() => {
    const fetchData = async () => {
      try {
        const raceSnapshot = await getDocs(collection(db, 'races'));
        const racesData = raceSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRaces(racesData);

        const weaponSnapshot = await getDocs(collection(db, 'weapons'));
        const weaponsData = weaponSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setWeapons(weaponsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Fetch types when race changes
  useEffect(() => {
    const fetchTypes = async () => {
      if (races.length > 0) {
        const selectedRace = races[selectedRaceIndex];
        try {
          const typeSnapshot = await getDocs(
            query(collection(db, 'types'), where('race_id', '==', selectedRace.id))
          );
          const typesData = typeSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTypes(typesData);
          setSelectedTypeIndex(0); // Reset selected type when race changes
        } catch (error) {
          console.error('Error fetching types:', error);
        }
      }
    };
    fetchTypes();
  }, [selectedRaceIndex, races]);

  // Race navigation
  const handlePrevRace = () => {
    setSelectedRaceIndex((prevIndex) => (prevIndex - 1 + races.length) % races.length);
  };

  const handleNextRace = () => {
    setSelectedRaceIndex((prevIndex) => (prevIndex + 1) % races.length);
  };

  // Type navigation
  const handlePrevType = () => {
    setSelectedTypeIndex((prevIndex) => (prevIndex - 1 + types.length) % types.length);
  };

  const handleNextType = () => {
    setSelectedTypeIndex((prevIndex) => (prevIndex + 1) % types.length);
  };

  // Handle submit
  const handleSubmit = () => {
    if (types.length > 0 && selectedWeapon) {
      setPlayerData({
        race: races[selectedRaceIndex],
        type: types[selectedTypeIndex],
        weapon: selectedWeapon,
      });
      alert(`${playerName} is ready for combat!`);
    }
  };

  return (
    <div className="player-container">
      <h2>{playerName}</h2>
      
      {/* Race Selection */}
      <div>
        <h3>Select Race</h3>
        {races.length > 0 ? (
          <div>
            <button onClick={handlePrevRace}>Prev</button>
            <span>{races[selectedRaceIndex]?.name || 'Loading...'}</span>
            <button onClick={handleNextRace}>Next</button>
          </div>
        ) : (
          <p>Loading races...</p>
        )}
      </div>

      {/* Type Selection */}
      <div>
        <h3>Select Type</h3>
        {types.length > 0 ? (
          <div className="type-container">
            <button onClick={handlePrevType}>&larr;</button>
            <div className="type-card">
              <h4>{types[selectedTypeIndex]?.name || 'Loading...'}</h4>
              {types[selectedTypeIndex]?.photo_url && (
                <img
                  src={types[selectedTypeIndex].photo_url}
                  alt={types[selectedTypeIndex]?.name}
                  className="type-photo"
                />
              )}
            </div>
            <button onClick={handleNextType}>&rarr;</button>
          </div>
        ) : (
          <p>No types available for this race</p>
        )}
      </div>

      {/* Weapon Selection */}
      <div>
        <h3>Select Weapon</h3>
        {weapons.length > 0 ? (
          weapons.map((weapon) => (
            <button
              key={weapon.id}
              onClick={() => setSelectedWeapon(weapon)}
              className={`weapon-button ${selectedWeapon?.id === weapon.id ? 'selected' : ''}`}
            >
              {weapon.name}
            </button>
          ))
        ) : (
          <p>No weapons available</p>
        )}
      </div>

      {/* Submit Button */}
      <button onClick={handleSubmit} className="submit-button">
        Submit
      </button>
    </div>
  );
};

const HomePage = () => {
  const [player1Data, setPlayer1Data] = useState(null);
  const [player2Data, setPlayer2Data] = useState(null);
  const [showCombat, setShowCombat] = useState(false);

  const startCombat = () => {
    if (player1Data && player2Data) {
      setShowCombat(true);
    }
  };

  if (showCombat) {
    return <Combat player1={player1Data} player2={player2Data} />;
  }

  return (
    <div className="home-page-container">
      <PlayerSelection playerName="Player 1" setPlayerData={setPlayer1Data} />
      <PlayerSelection playerName="Player 2" setPlayerData={setPlayer2Data} />
      <button onClick={startCombat} className="fight-button">
        Fight!
      </button>
    </div>
  );
};

export default HomePage;
