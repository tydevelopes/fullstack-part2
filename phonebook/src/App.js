import React, { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  // App states
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPersons, setShowPersons] = useState(persons);

  // onChange event handlers
  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleSearchTermChange = event => {
    setSearchTerm(event.target.value);
    setPersonsToRender(event.target.value);
  };

  // Helper function
  const setPersonsToRender = searchTerm => {
    let showFilteredersons = null;
    if (searchTerm.trim()) {
      showFilteredersons = persons.filter(person =>
        person.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
    } else {
      showFilteredersons = persons;
    }
    setShowPersons(showFilteredersons);
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
      setShowPersons([...persons, newPerson]);
    }
    setNewName('');
    setNewNumber('');
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
      <Persons showPersons={showPersons} />
    </div>
  );
};

export default App;
