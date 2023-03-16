import React, { useState } from 'react';
import axios from 'axios';
import './add_emp.css';

const EditTask = ({ _id, id, desc, employeeId }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    _id: _id,
    id: id,
    desc: desc,
    employeeId: employeeId,
  });

  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.patch(`http://localhost:5000/api/updatet/${_id}`, formData);
    setShowForm(false);
  };

  return (
    <div className="Mybutton">
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Edit'}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="id"
            placeholder="id"
            value={formData.id}
            onChange={handleFormChange}
            required
          />
          <input
            type="textarea"
            name="desc"
            placeholder="desc"
            value={formData.desc}
            onChange={handleFormChange}
            required
          />
          <button type="submit">Edit</button>
        </form>
      )}
    </div>
  );
};

export default EditTask;
