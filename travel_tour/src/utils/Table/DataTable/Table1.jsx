import React, {useState, useEffect} from 'react';
import {  Button } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from 'axios';

function Table1(){
    const [technicians, setTechnician] = useState([]);

    useEffect(()=>{
        fetch("http://127.0.0.1:8000/user/technician")
        .then(res=>res.json())
        .then((result)=>{
            setTechnician(result);
        }
        )
      },[])

    //   const deleteDoctor = (idDoctor) =>{
    //     axios.delete("http://localhost:8080/doctor/delete/{idDoctor}")
    //    .then(() => {
    //     AllDoctor();
    //    })
    //   }

    //   const editDoctor = (idDoctor) =>{
    //     console.log(idDoctor);
    //     localStorage.setItem('idDoctor',idDoctor)
    //   }


      return(
         <div>
        
        <div class="datatable"> 
        <h3>Manege Doctor.</h3>
        <div className='row'>
          <div className='col-md-5'>
          <h4>Click here to add New Doctor:</h4>
          </div>
          <div className='col-md-2'>
          {/* <h4><AddDoctor/></h4> */}
          </div>
        </div>
        <hr/>
    <div className='flex shadow border-b'>
    <table  class="table table-hover">
      
    <thead className='flex shadow border-b bg-gay-50'>      
      <tr>      
          <th>ID</th>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>HOSPITAL_NAME</th>
          <th>LOCATION</th>
          <th>PROFESSIONALISM</th>
          <th>RE_DATE</th>
          <th>ACTION</th>
      </tr>
     
    </thead>
    <tbody>
     
      {technicians.map(technician =>(
        <tr key={technician.idDoctor}>
        <td>{technician.id}</td>
        <td>{technician.firstName}</td>
        <td>{technician.email}</td>
        <td>{technician.lastName}</td>
        <td>{technician.address}</td>
        <td>{technician.title}</td>
        <td>{technician.reg_at}</td>
        <td>  
                      
            <Button></Button>
            <Button ><DeleteForeverIcon/>
             </Button>
        </td>
        </tr>

        ))
         }
    </tbody>
  </table>
  </div>
</div>

        </div>
      )
      
}

export default Table1;