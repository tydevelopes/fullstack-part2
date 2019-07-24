import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';

const App = () => {
  // App states
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data);
    });
  }, []);

  // onChange event handlers
  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleSearchTermChange = event => {
    setSearchTerm(event.target.value);
  };

  // Helper function
  const setPersonsToRender = searchTerm => {
    let showFilteredPersons = null;
    if (searchTerm.trim()) {
      showFilteredPersons = persons.filter(person =>
        person.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
    } else {
      showFilteredPersons = persons;
    }
    return showFilteredPersons;
  };

  // onSubmit event handler
  const addPerson = event => {
    event.preventDefault();
    //validation
    if (!newName.trim() || !newNumber.trim()) {
      alert('name and number fiels cannot be empty');
      return;
    }
    const isDuplicateName = persons.some(
      person => person.name === newName.trim()
    );
    const isDuplicateNumber = persons.some(
      person => person.number === newNumber.trim()
    );
    if (isDuplicateName) {
      alert(`${newName} is already added to phonebook`);
    } else if (isDuplicateNumber) {
      alert(`${newNumber} is already added to phonebook`);
    } else {
      const newPerson = { name: newName, number: newNumber };
      setPersons([...persons, newPerson]);
    }
    setNewName('');
    setNewNumber('');
    setSearchTerm('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        handleSearchTermChange={handleSearchTermChange}
        searchTerm={searchTerm}
      />
      <h2>add a new contact</h2>
      <PersonForm
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        newName={newName}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons
        persons={searchTerm ? setPersonsToRender(searchTerm) : persons}
      />
    </div>
  );
};

export default App;
