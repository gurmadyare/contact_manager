import React from 'react'
import { useParams } from 'react-router-dom';
import profileImg from '../assets/images/IMG_0051.jpg'
import { Link } from 'react-router-dom';

const ContactDetails = ({contacts}) => {
  const { id } = useParams();
  const contact = contacts.find(contact => contact.id === id);

  if (!contact) {
    return <div>Contact not found</div>;
  }

  return (
    <div className='contact-details-card'>
      <div>
        <img src={profileImg} alt="user" width={'100%'} />
      </div>

      <div>
        <h3>{contact.name}</h3>
        <p><span>✉️</span> {contact.email}</p>
      </div> <br />

      <Link to={'/'} >
       <button className='btn'>Back to Contact List</button>
      </Link>
    </div>
  )
}

export default ContactDetails