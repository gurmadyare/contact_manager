import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import './App.css';
import Header from './components/Header';
import NewContactForm from './components/NewContactForm';
import ContactList from './components/ContactList';
import NotFoundPage from './components/NotFoundPage';
import UpdateContactForm from './components/UpdateContactForm';
import ContactDetails from './components/ContactDetails';

function App() {
  //Lets save state to a local storage, so that we don't lose it
  const LOCAL_STORAGE_KEY = 'contacts';

  //Make initial contacts variable and set it to the state,
  //so that we don't lose our previos data when we refresh the page

  const initialContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  const [contacts, setContacts] = useState(initialContacts);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResuslts, setSearchResults] = useState([]);

  //Whenever the contact state is changed, set the new contact state to the local storage.
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts])


  
  //Handle searching
  const handleSearching = (event) => {
    setSearchTerm(event.target.value);

    //Let's filter out the results
    if(searchTerm !== ""){
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())       
      });

      //Then, lets update the searchResults 
      setSearchResults(newContactList)
    }else{
      //If searchTerm is empty scenario
      setSearchResults(contacts);
    }   
  }
  
  // Function to handle adding a new contact
  function handleAddNewContact(contact) {
    //With unique ID in each contact
    const newContact = {...contact, id: uuidv4()}

    setContacts((prevContacts) => {
      return [...prevContacts, newContact];
    });
  }

  //Funtion to handle onDelete
  function handleDelete(id){
    //Make sure before deleting 
    if(confirm("Are you sure to delete? ")){
      const filteredContacts = contacts.filter((contact) => contact.id !== id);
      setContacts(filteredContacts);
    }
  }

  function handleUpdate(updatedContact){
    setContacts((prevContacts) => {
      return prevContacts.map((contact) => contact.id === updatedContact.id ? updatedContact : contact);
    })

  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: 
      <ContactList contacts={searchTerm.length < 1 ? contacts : searchResuslts} 
          onDelete={handleDelete} 
          term={searchTerm} 
          searchHandler={handleSearching}
        />, 
      errorElement: <NotFoundPage />
    },

    {
      path: 'contact/add',
      element: <NewContactForm onAddContact={handleAddNewContact} />,
      errorElement: <NotFoundPage />
    },

    {
      path: 'contact/update/:id',
      element: <UpdateContactForm contacts={contacts} onUpdateContact={handleUpdate}/>
    },

    {
      path: '/contact/details/:id',
      element: <ContactDetails contacts={contacts}/>
    }

  ]);


  return (
    <>
      <Header />
      <RouterProvider router={router}/>
    </>
  );
}

export default App;