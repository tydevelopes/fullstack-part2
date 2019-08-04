import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import crud from './services/crud';
import Notification from './components/Notification';

const App = () => {
  // App states
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    crud.getAll().then(initialPersons => setPersons(initialPersons));
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
      alert('name and number fields cannot be empty');
      return;
    }
    const isDuplicateName = persons.some(
      person => person.name === newName.trim()
    );
    const isDuplicateNumber = persons.some(
      person => person.number === newNumber.trim()
    );
    if (isDuplicateName) {
      const userResponse = window.confirm(
        `${newName} is already added to phonebook, replace old number with new number?`
      );
      if (userResponse) {
        const newPerson = { name: newName, number: newNumber };
        const { id } = persons.find(person => person.name === newName);
        crud
          .update(id, newPerson)
          .then(returnedPerson => {
            setPersons(
              persons.map(person =>
                person.name !== newName ? person : returnedPerson
              )
            );
          })
          .catch(error => {
            console.log(error);

            setMessage({
              content: `Information of ${newName} has already been removed from the server`,
              type: 'failure'
            });
            setTimeout(() => {
              setMessage(null);
            }, 3000);
          });
      }
    } else if (isDuplicateNumber) {
      alert(`${newNumber} is already added to phonebook`);
    } else {
      const newPerson = { name: newName, number: newNumber };
      crud.create(newPerson).then(returnedPerson => {
        setMessage({
          content: `Added ${returnedPerson.name}`,
          type: 'success'
        });
        setPersons([...persons, returnedPerson]);
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }).catch(error => {
        setMessage({
          content: error.response.data,
          type: 'failure'
        });
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      })
    }
    setNewName('');
    setNewNumber('');
    setSearchTerm('');
  };

  const handleDelete = ({ id, name }) => {
    const userResponse = window.confirm(`Delete ${name}?`);
    if (userResponse) {
      crud.remove(id).then(status => {
        setPersons(persons.filter(person => person.id !== id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
