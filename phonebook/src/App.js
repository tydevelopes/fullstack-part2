import React, { useState } from 'react';

const App = () => {
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

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleSearchTermChange = event => {
    //console.log(event.target.value);
    setSearchTerm(event.target.value);
    setPersonsToRender(event.target.value);
  };

  const setPersonsToRender = searchTerm => {
    //console.log(searchTerm);
    let showFilteredersons = null;
    if (searchTerm.trim()) {
      showFilteredersons = persons.filter(person =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      showFilteredersons = persons;
    }
    setShowPersons(showFilteredersons);
  };

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
      <div>
        filter shown with{' '}
        <input onChange={handleSearchTermChange} value={searchTerm} />
      </div>
      <h2>add a new contact</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          number: <input onChange={handleNumberChange} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {showPersons.map(person => (
          <div key={person.name}>
            {person.name} {person.number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

/*
  add submit event to form
  add onchange event to input
  add new name to persons array when a name is submitted
*/
