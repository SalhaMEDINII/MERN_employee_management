import React, { useState } from 'react';
import axios from 'axios';
import "./add_emp.css";

const EditEmp = ({ _id, id, nom, prenom, adresse, numcompte, grade, sup }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    _id: _id,
    id: id,
    nom: nom,
    prenom: prenom,
    adresse: adresse,
    numcompte: numcompte,
    grade: grade,
    sup: sup,
  });

  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.patch(`http://localhost:5000/api/updatee/${_id}`, formData);
    setShowForm(false);
  };

  return (
    <div>
      <div>
        <button
          className='edit-employee-button'
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Edit'}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit}>
            <input  className='inputs'
            type="number"
            name="id"
            placeholder="id"
            value={formData.id}
            onChange={handleFormChange}
            required
          />
          <input  className='inputs'
            type="text"
            name="nom"
            placeholder="nom"
            value={formData.nom}
            onChange={handleFormChange}
            required
          />
          
          <input  className='inputs'
            type="text"
            name="prenom"
            placeholder="prenom"
            value={formData.prenom}
            onChange={handleFormChange}
            required
          />
         
          <input  className='inputs'
            type="text"
            name="adresse"
            placeholder="Adressee"
            value={formData.adresse}
            onChange={handleFormChange}
            required
          />
           <input  className='inputs'
            type="number"
            name="numcompte"
            placeholder="numcompte"
            value={formData.numcompte}
            onChange={handleFormChange}
            required
          />
          <input  className='inputs'
            type="text"
            name="grade"
            placeholder="Grade"
            value={formData.grade}
            onChange={handleFormChange}
            required
          />
          <input className='inputs'
            type="text"
            name="sup"
            placeholder="Superieur"
            value={formData.sup}
            onChange={handleFormChange}
            required
          />
          <button type="submit">Edit</button>
        </form>
      )}
    </div>



    </div>
  )
}

export default EditEmp
