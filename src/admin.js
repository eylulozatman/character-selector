import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { uploadToCloudinary } from './uploadImage';

const AdminPage = () => {
  const [raceName, setRaceName] = useState('');
  const [weaponName, setWeaponName] = useState('');
  const [attack, setAttack] = useState('');
  const [def, setDef] = useState('');
  const [typeName, setTypeName] = useState('');
  const [hp, setHp] = useState('');
  const [races, setRaces] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedRace, setSelectedRace] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  // Firestore'dan race'leri ve type'ları çek
  useEffect(() => {
    const fetchRacesAndTypes = async () => {
      try {
        const raceSnapshot = await getDocs(collection(db, 'races'));
        const raceList = raceSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRaces(raceList);

        const typeSnapshot = await getDocs(collection(db, 'types'));
        const typeList = typeSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTypes(typeList);
      } catch (error) {
        console.error('Error fetching races and types: ', error);
      }
    };
    fetchRacesAndTypes();
  }, []);

  // Race ekleme fonksiyonu
  const addRace = async () => {
    if (!raceName) {
      alert('Please enter a race name.');
      return;
    }
    try {
      const docRef = await addDoc(collection(db, 'races'), { name: raceName });
      alert(`Race added with ID: ${docRef.id}`);
      setRaceName('');
    } catch (error) {
      console.error('Error adding race: ', error);
    }
  };

  // Weapon ekleme fonksiyonu
  const addWeapon = async () => {
    if (!weaponName || !attack || !def) {
      alert('Please enter all weapon details.');
      return;
    }
    try {
      const docRef = await addDoc(collection(db, 'weapons'), {
        name: weaponName,
        attack: parseInt(attack),
        def: parseInt(def),
      });
      alert(`Weapon added with ID: ${docRef.id}`);
      setWeaponName('');
      setAttack('');
      setDef('');
    } catch (error) {
      console.error('Error adding weapon: ', error);
    }
  };

  // Type ekleme fonksiyonu
  const addType = async () => {
    if (!selectedRace) {
      alert('Please select a race.');
      return;
    }
    if (!selectedFile) {
      alert('Please upload a photo.');
      return;
    }
    if (!typeName || !hp) {
      alert('Please enter type name and health points.');
      return;
    }
    try {
      const photoUrl = await uploadToCloudinary(selectedFile); // Cloudinary'e yükleme
      const docRef = await addDoc(collection(db, 'types'), {
        race_id: selectedRace,
        name: typeName,
        hp: parseInt(hp), // Health points added here
        photo_url: photoUrl,
      });
      alert(`Type added with ID: ${docRef.id}`);
      setTypeName('');
      setHp('');
      setSelectedFile(null);
      setSelectedRace('');
    } catch (error) {
      console.error('Error adding type: ', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Page</h1>

      {/* Race Ekleme Bölümü */}
      <section style={{ marginBottom: '20px' }}>
        <h2>Add Race</h2>
        <input
          type="text"
          value={raceName}
          onChange={(e) => setRaceName(e.target.value)}
          placeholder="Enter race name"
          style={{ marginRight: '10px' }}
        />
        <button onClick={addRace}>Add Race</button>
      </section>

      {/* Weapon Ekleme Bölümü */}
      <section style={{ marginBottom: '20px' }}>
        <h2>Add Weapon</h2>
        <input
          type="text"
          value={weaponName}
          onChange={(e) => setWeaponName(e.target.value)}
          placeholder="Enter weapon name"
          style={{ marginRight: '10px' }}
        />
        <input
          type="number"
          value={attack}
          onChange={(e) => setAttack(e.target.value)}
          placeholder="Enter attack value"
          style={{ marginRight: '10px' }}
        />
        <input
          type="number"
          value={def}
          onChange={(e) => setDef(e.target.value)}
          placeholder="Enter defense value"
          style={{ marginRight: '10px' }}
        />
        <button onClick={addWeapon}>Add Weapon</button>
      </section>

      {/* Type Ekleme Bölümü */}
      <section style={{ marginBottom: '20px' }}>
        <h2>Add Type</h2>
        <select
          value={selectedRace}
          onChange={(e) => setSelectedRace(e.target.value)}
          style={{ marginRight: '10px' }}
        >
          <option value="" disabled>
            Select a race
          </option>
          {races.map((race) => (
            <option key={race.id} value={race.id}>
              {race.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={typeName}
          onChange={(e) => setTypeName(e.target.value)}
          placeholder="Enter type name"
          style={{ marginRight: '10px' }}
        />
        <input
          type="number"
          value={hp}
          onChange={(e) => setHp(e.target.value)}
          placeholder="Enter health points"
          style={{ marginRight: '10px' }}
        />
        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          style={{ marginRight: '10px' }}
        />
        <button onClick={addType}>Add Type</button>
      </section>
    </div>
  );
};

export default AdminPage;
