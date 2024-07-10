import { faAdd, faEdit, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import user from '../assets/images/IMG_0049.jpg'
import React, { useState } from 'react'

const ContactList = ({contacts, onDelete, term, searchHandler}) => {


  const ContactElements = contacts.map((contact) => {
    return (
        <div className="contact-card" key={contact.id}>
        <Link to={`/contact/details/${contact.id}`}>
            <div className='user-img'>
              <img src={user} alt="user" width={'45px'} />
            </div>
          </Link>

          <Link to={`/contact/details/${contact.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
            <div className="contacts" style={{width: '210px'}}>
              <h3>{contact.name}</h3>
              <h3>{contact.email}</h3>
            </div>
          </Link>

          <div className="actions">
            <Link to={`/contact/update/${contact.id}`}>
              <button className='action-btn' ><FontAwesomeIcon icon={faEdit}/></button>
            </Link>

            <button className='action-btn' onClick={() => onDelete(contact.id)}><FontAwesomeIcon icon={faTrash}/></button>
          </div>
        </div>
    )
   
  })

  return (
    <div className='content-list'>
      <div className='content-list-header'>
        <h5>Contact List</h5>
        
        {/*Why using Link -> for seamless, client-side-navigation instead of anchor tags which reloads whole page*/}
        <Link to={'/contact/add'}>
          <button className='add-btn'>
            <FontAwesomeIcon icon={faAdd}/> 
            <span>Add Contact</span>
          </button>
        </Link>
      </div>

      {/* Searching  */}
      <div className="search-row">
        <input type="text" placeholder='search contact...' value={term} className='search-input' onChange={searchHandler}/>

        <button className='search-btn'><FontAwesomeIcon icon={faSearch}/></button>
      </div> 
      
      {ContactElements}
    </div>
  )
}

export default ContactList