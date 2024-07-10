import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

const UpdateContactForm = ({contacts, onUpdateContact}) => {
  //Find contactToUpdate by ID -> from route
  const { id } = useParams();

  const contactToUpdate = contacts.find((contact) => contact.id === id);

  // State for form inputs
  const [contact, setContact] = useState(contactToUpdate);
  
  // Handling input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  // Validating name and email
  const validate = () => {
    let nameError = '';
    let emailError = '';

    const nameRegex = /^[a-zA-Z\s]*$/;
    if (!contact.name.match(nameRegex)) {
      nameError = 'Name must contain only letters and spaces.';
      alert(nameError)
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!contact.email.match(emailRegex)) {
      emailError = 'Invalid email format.';
      alert(emailError)
    }

    if (nameError || emailError) {
      return false;
    }

    return true;
  };

  // Handling form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onUpdateContact(contact);

      // Resetting form 
      setContact({ name: '', email: '' }); 

      //Display message
      alert("Contact updated successfully!")
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label>Name: </label>
        <input
          type="text"
          placeholder="contact name ..."
          name="name"
          value={contact.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="field">
        <label>Email: </label>
        <input
          type="email"
          placeholder="contact email ..."
          name="email"
          value={contact.email}
          onChange={handleChange}
          required
        />
      </div>

      <button className="btn">Update Contact</button>
    </form>
  );
}

export default UpdateContactForm