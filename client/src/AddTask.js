import React, { useState } from 'react';
import axios from 'axios';
import "./add_emp.css";


const AddTask = ({ employeeId }) => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        id:'',
        desc: '',
        ide:employeeId ,
       
    });
    const handleFormChange = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
      };
      const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post('http://localhost:5000/api/add_task', formData);
        setShowForm(false);
        setFormData({
            id:'',
            desc: '',
            ide:employeeId ,
        
        });
      };
      return (
        <div>
        <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add task'}
      </button>
      {showForm && 


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
          <button type="submit">Add</button>
        </form>
}

      </div>
      )


}
export default AddTask