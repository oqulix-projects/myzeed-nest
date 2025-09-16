import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import './EmployeeManagement.css'
import { addNewEmployee } from '../services/AddEmployee'
import { auth } from '../../firebaseConfig'
import { fetchEmployees, fetchUserDetails } from '../services/fetchUserData'
import { Link } from 'react-router-dom'


const EmployeeManagement = () => {

    const [empData, setEmpData] = useState({ empName: '', empDepartment: '', empPosition: '', empSuperVisor: '', empEmail: '', empPassword: '' })
    const [employees, setEmployees] = useState([])
    console.log(employees);
    
    const [triggerRefresh,setTriggerRefresh]=useState(false)
    const handleAddEmployee = async () => {
        const currentUserId = auth.currentUser.uid;
        const data = await fetchUserDetails();
        const companyName = data.companyName;
        await addNewEmployee(empData, currentUserId, companyName)
        setTriggerRefresh(!triggerRefresh)
    }


    useEffect(() => {
        const getEmployees = async() => {
            const dataRef = await fetchEmployees()
            setEmployees(dataRef)
        };getEmployees()
    }, [triggerRefresh])

    return (
        <>
            <Navbar />
<Link to={'/'}>
                <button style={{backgroundColor:'var(--logo-two)',padding:'5px',borderRadius:'30px',border:'none',fontSize:'15px',margin:'30px',cursor:'pointer'}}><i className='fa-solid fa-arrow-left'></i>Back to home</button>
    
</Link>            <div className='emp-manage-container'>
                <div className='emp-table'>
                    <h2>Employee List</h2>
                    <div className='table-container'>
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Department</th>
                                    <th>Position</th>
                                    <th>Email</th>
                                    <th>Supervisor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.length>0?
                                employees.map((emp,index)=>(
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{emp.empName}</td>
                                    <td>{emp.empDepartment}</td>
                                    <td>{emp.empPosition}</td>
                                    <td>{emp.empEmail}</td>
                                    <td>{emp.empSuperVisor}</td>
                                </tr>)):
                                <tr><td colSpan={'6'}>No Employees Exist....</td></tr>
                                }
                                
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='emp-add'>
                    <h2>Add a new employee</h2>

                    <div className='form'>
                        <label htmlFor="emp-name">Employee Name</label>
                        <input id='emp-name' type="text" onChange={(e) => setEmpData({ ...empData, empName: e.target.value })} />
                        <label htmlFor="emp-dep">Department</label>
                        <input id='emp-dep' type="text" onChange={(e) => setEmpData({ ...empData, empDepartment: e.target.value })} />
                        <label htmlFor="emp-des">Position</label>
                        <input id='emp-des' type="text" onChange={(e) => setEmpData({ ...empData, empPosition: e.target.value })} />
                        <label htmlFor="emp-sup">Supervisor</label>
                        <select name="" id="emp-sup" onChange={(e) => setEmpData({ ...empData, empSuperVisor: e.target.value })}>
                            <option value="test">test</option>
                            <option value="test2">test2</option>
                        </select>
                        <label htmlFor="emp-email">Employee Email</label>
                        <input id='emp-email' type="email" onChange={(e) => setEmpData({ ...empData, empEmail: e.target.value })} />
                        <label htmlFor="emp-password">Employee Password</label>
                        <input id='emp-password' type="password" onChange={(e) => setEmpData({ ...empData, empPassword: e.target.value })} />
                        <button onClick={handleAddEmployee}>Add Employee</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmployeeManagement