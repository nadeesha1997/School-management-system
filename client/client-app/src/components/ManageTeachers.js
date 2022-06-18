import React,{useEffect, useState} from 'react';
import ListItemText from '@mui/material/ListItemText';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import axios from 'axios';
import { Link } from 'react-router-dom';
import getUserData from '../services/userdata';
import DeleteIcon from '@mui/icons-material/Delete';


export default function ManageTeachers() {
    const [teachers, setteachers] = useState([])

    useEffect(()=>{
      getTeachers();
      console.log(getUserData())
    },[])

    const getTeachers=()=>{
        axios.get('http://localhost:8003/users/teacher')
        .then(res=>setteachers(res.data))
        .catch(e=>console.log(e))
    }
    const deleteTeacher=(id)=>{
        axios.delete('http://localhost:8003/users/delete/'+id)
        .then(res=>{
            setteachers(res.data);
            getTeachers();
        })
        .catch(e=>console.log(e))
    }
  return (
    <>
    <Box
    m={1} //margin
    display="flex"
    justifyContent="flex-start"
    alignItems="flex-start"
  >
  <Link to="/signup"><Button variant="contained" color="success" startIcon={<AddIcon/>}>Add</Button></Link>
</Box>

    {/* <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {teachers.length>0&&teachers.map(el=>{
    return(<>
    <ListItem alignItems="flex-start" key={el._id}>
        <ListItemText
          primary={el.name}
        />
        <ListItemButton
        color='danger'
          // selected={selectedIndex === 2}
          onClick={() => deleteTeacher(el._id)}
        >
          <ListItemText primary="delete" />
        </ListItemButton>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>)
  })}

    </List> */}
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teachers.length>0&&teachers.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <ListItemText primary={row.name}/>
              </TableCell>
              <TableCell align="right"><Link to="#"><Button color='error' variant='contained' onClick={()=>deleteTeacher(row._id)} startIcon={<DeleteIcon/>}>Delete</Button></Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}

