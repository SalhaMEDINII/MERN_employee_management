import React , {useState, useEffect}from 'react'
import axios from 'axios';
import "./fetch.css";
import AddTask from './AddTask';
import EditEmp from './EditEmp';
import EditTask from './EditTask';








function Fetch() {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredEmployees, setFilteredEmployees] = useState([]);

    useEffect(() => {

      
      const fetchData = async () => {
        const employeesResult = await axios.get('http://localhost:5000/api/employees');
        const employees = employeesResult.data;
  
        const tasks = await Promise.all(
          employees.map(async (employee) => {
            const tasksResult = await axios.get(
              `http://localhost:5000/api/task/${employee._id}`
            );
            return tasksResult.data;
          })
        );
  
        setEmployees(
          employees.map((employee, index) => ({
            ...employee,
            tasks: tasks[index],
          }))
        );
      };
  
      fetchData();
    },  []);


    useEffect(() => {
      setFilteredEmployees(
        employees.filter(
          (employee) =>
            employee.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.prenom.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }, [employees, searchTerm]);





const handleDeleteE = async (_id) => {
    await axios.delete(`http://localhost:5000/api/deletee/${_id}`);

    setEmployees(employees.filter((employee) => employee._id !== _id));
  };
      
const handleDeleteT = async (_id) => {
    await axios.delete(`http://localhost:5000/api/deletet/${_id}`);

   
  };

  return (
    <div className=''>
       
      
        <h1>Employees Management </h1>
<input className='name-filter'
        type="text"
        placeholder="Search employees"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />


<table className="container">
	<thead>
		<tr>
			<th className='midd-col'><h1>Employee</h1></th>
			<th className='midd-col'><h1>Adress</h1></th>
			
			<th className='midd-col' ><h1>Rank</h1></th>
      <th className='big-col' ><h1>Tasks</h1></th> <th className='small-col'><h1>Tasks</h1></th>
            
            

            <th  className='midd-col' ><h1>Employee management</h1></th>
		</tr>
	</thead>



	<tbody>
            {
                filteredEmployees.map(employee => <tr> <td> {employee.nom} {employee.prenom}</td>
                <td> {employee.adresse}</td>
              
                <td> {employee.grade}</td>
                <td>
             
                {employee.tasks.map((task) => (
              <div   className='row'> <div className='col'
              key={task.ide}> {task.desc} </div>
             
          
             <div  className='col' >
             <EditTask _id={task._id} id={task.id}  desc={task.desc} employeeId={task.ide} />
              <button onClick={() => handleDeleteT(task._id)}> Delete </button>
             </div>
             
              </div>
            ))}
                  
              </td>


            <td>
            <AddTask employeeId={employee._id} />
        
            </td>
          
          <td>
            
       <div className='row midd-col'>
       <EditEmp _id={employee._id} id={employee.id} nom={employee.nom} prenom={employee.prenom} 
       adresse={employee.adresse} numcompte={employee.numcompte}
                grade={employee.grade} sup={employee.sup} />

                 <button className='delete-b' onClick={() => handleDeleteE(employee._id)}> Delete </button>
       </div>
                 </td>
                </tr>)
            }


	
		
	</tbody>

</table>
</div>



  
  );
}

export default Fetch
