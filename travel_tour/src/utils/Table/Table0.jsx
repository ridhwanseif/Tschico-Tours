import React from 'react'
import './table.scss'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import img1 from './tech3.jpg'

export const Table0 = ({ id, col1, col2, col3, col4, rows }) => {

  return (
    <TableContainer component={Paper} className='table' >
      <Table sx={{ minWidth: 250 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className='tableCell'>{id}</TableCell>
            <TableCell className='tableCell'>{col1}</TableCell>
            <TableCell className='tableCell'>{col2}</TableCell>
            <TableCell className='tableCell'>{col3}</TableCell>
            <TableCell className='tableCell'>{col4}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell >{row.id}</TableCell>
              <TableCell className='tableCell'>
                <div className='cellWrapper'>
                  <img src={row.photo} alt='wrong-image' className='image' />
                  {row.first_name + " " + row.mid_name + " " + row.last_name}

                </div>
              </TableCell>
              <TableCell className='tableCell'>{row.email}</TableCell>
              <TableCell className='tableCell'>{row.phone_number}</TableCell>
              <TableCell className='tableCell'>
                <span className={`status ${row.status}`}>
                  {row.status ? (
                    <span style={{
                      color: 'green',
                      padding: '5px',
                      borderRadius: '5px',
                      backgroundColor: 'rgba(5, 88, 5, 0.067)'
                    }}>Verified</span>
                  ) : (
                    <span style={{
                      color: 'goldenrod',
                      padding: '5px',
                      borderRadius: '5px',
                      backgroundColor: 'rgba(5, 88, 5, 0.067)'
                    }}>Not Verified</span>

                  )}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

