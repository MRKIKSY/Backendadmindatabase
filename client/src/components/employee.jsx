import axios from 'axios'
import  { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SiNamecheap } from "react-icons/si";
import { HiOutlineMail } from "react-icons/hi";
import { FaAddressBook } from "react-icons/fa";
import { RiMoneyPoundBoxLine } from "react-icons/ri";
import { VscGithubAction } from "react-icons/vsc";


function Employee() {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/getEmployee')
            .then(res => {
                if (res.data.Status === "Success") {
                    setData(res.data.Result);
                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err));
    }, [])

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/delete/' + id)
            .then(res => {
                if (res.data.Status === "Success") {
                    window.location.reload(true);
                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='px-5 py-3'>
            <div className='d-flex justify-content-center mt-2'>
                <h3>.</h3>
            </div>
            <Link to="/create" className='btn btn-success'>Add Employee</Link>
            <div className='mt-3'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name<br></br>(<SiNamecheap />)</th>
                            <th>Email<br></br>(<HiOutlineMail /> )</th>
                            <th>Address<br></br>(<FaAddressBook />)</th>
                            <th>Salary<br></br>(<RiMoneyPoundBoxLine />)</th>
                            <th>Action<br></br>(<VscGithubAction />)</th>

                        </tr>
                    </thead>
                    <tbody>
                        {data.map((employee, index) => {
                            return <tr key={index}>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.address}</td>
                                <td>{employee.salary}</td>
                                <td>
                                    <Link to={`/employeeedit/${employee.id}`} className='btn btn-primary btn-sm me-2' aria-label={`Edit ${employee.name}`}>edit</Link>
                                    <button onClick={() => handleDelete(employee.id)} className='btn btn-sm btn-danger' aria-label={`Delete ${employee.name}`}>delete</button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Employee