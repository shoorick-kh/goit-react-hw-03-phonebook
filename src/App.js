import React from 'react';
import s from './App.module.css';
import ContactForm from './components/ContactForm/ContactForm';
import shortid from 'shortid';
import ContactList from './components/ContactList/ContactList';
import FilterName from './components/FilterName/FilterName';

class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handlerSubmitForm = data => {
    const newContact = {
      id: shortid.generate(),
      name: data.name,
      number: data.number,
    };

    if (
      this.state.contacts.some(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase(),
      )
    ) {
      return alert(`${newContact.name} is already in contacts.`);
    }
    this.setState(prevState => {
      return { contacts: [...prevState.contacts, newContact] };
    });
  };

  onChangeFilter = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter } = this.state;
    const normalizedFilter = this.state.filter.toLowerCase();
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
    return (
      <div className={s.App}>
        <h1>Phonebook</h1>
        <ContactForm onSubmitForm={this.handlerSubmitForm} />
        <FilterName value={filter} onChange={this.onChangeFilter} />
        <h2>Contacts</h2>
        <ContactList
          contacts={filteredContacts}
          onDelete={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
