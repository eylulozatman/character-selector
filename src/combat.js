import React, { useState, useEffect } from 'react';
import './combat.css';

const Combat = ({ player1, player2 }) => {
  const [gameStatus, setGameStatus] = useState("");
  const [player1Health, setPlayer1Health] = useState(player1?.type?.hp);
  const [player2Health, setPlayer2Health] = useState(player2?.type?.hp);
  const [isGameOver, setIsGameOver] = useState(false);

  // Determine who starts the combat
  const [currentAttacker, setCurrentAttacker] = useState(Math.random() < 0.5 ? 1 : 2); // Randomly decide first attacker

  // Start combat automatically after the page loads
  useEffect(() => {
    const startFight = () => {
      setGameStatus(`Player ${currentAttacker} starts the fight!`);
      attack(currentAttacker);
    };

    startFight(); // Automatically start the fight
  }, [currentAttacker]); // Start fight whenever currentAttacker changes

  const attack = (attacker) => {
    let defender;
    let attackerWeapon;
    let defenderWeapon;
    let defenderHealth;

    if (attacker === 1) {
      defender = "Player 2";
      attackerWeapon = player1.weapon;
      defenderWeapon = player2.weapon;
      defenderHealth = player2Health;
    } else {
      defender = "Player 1";
      attackerWeapon = player2.weapon;
      defenderWeapon = player1.weapon;
      defenderHealth = player1Health;
    }

    // Attacker's attack damage
    let damage = attackerWeapon.attack;

    // Apply damage
    defenderHealth -= damage;
    setGameStatus(`${defender} takes ${damage} damage.`);

    // 25% chance for defense (Defender can heal using their defense stat)
    const defChance = Math.floor(Math.random() * 4) + 1;
    if (defChance === 2) {
      // Defense case: defender heals using defense stat
      defenderHealth += defenderWeapon.def;
      setGameStatus(`${defender} defends and heals ${defenderWeapon.def} HP!`);
    }

    // Update the health of the players
    if (attacker === 1) {
      setPlayer2Health(defenderHealth);
    } else {
      setPlayer1Health(defenderHealth);
    }

    // Check if the game is over (health reaches 0 or below)
    if (defenderHealth <= 0) {
      setIsGameOver(true);
      setGameStatus(`${defender} is defeated!`);
    } else {
      // Switch turns between players
      const nextAttacker = attacker === 1 ? 2 : 1;
      setTimeout(() => {
        setCurrentAttacker(nextAttacker);
      }, 1000); // Delay before the next attack
    }
  };

  if (!player1 || !player2) {
    return <p>Loading...</p>;
  }

  return (
    <div className="combat-container">
      <h1>Combat</h1>

      <div className="combat-players">
        {/* Player 1 */}
        <div className={`player-combat ${player1Health <= 0 ? 'inactive' : 'active'}`}>
          <img src={player1?.type?.photo_url} alt="Player 1" className="player-image" />
          <div className="hp-bar">
            <div className="hp-fill" style={{ width: `${(player1Health / player1.type.hp) * 100}%` }} />
          </div>
          <p>{player1.name}</p>
          <p>HP: {player1Health}</p>
        </div>

        {/* Player 2 */}
        <div className={`player-combat ${player2Health <= 0 ? 'inactive' : 'active'}`}>
          <img src={player2?.type?.photo_url} alt="Player 2" className="player-image" />
          <div className="hp-bar">
            <div className="hp-fill" style={{ width: `${(player2Health / player2.type.hp) * 100}%` }} />
          </div>
          <p>{player2.name}</p>
          <p>HP: {player2Health}</p>
        </div>
      </div>

      <div className="vs">
        <h2>VS</h2>
      </div>

      <div className="combat-log">
        <p>{gameStatus}</p>
      </div>

      {isGameOver && (
        <div className="combat-winner">
          {player1Health <= 0 ? `${player2.type.name} wins!` : `${player1.type.name} wins!`}
        </div>
      )}
    </div>
  );
};

export default Combat;
