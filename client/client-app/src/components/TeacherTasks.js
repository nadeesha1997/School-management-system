import React,{useState,useEffect} from 'react';
import ListItemText from '@mui/material/ListItemText';
import { Button, Link } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import getUserData from '../services/userdata';

export default function TeacherTasks() {

  const user=getUserData();

  const [tasks, settasks] = useState([])

  useEffect(()=>{
    getTasks();
  },[])

  const getTasks=()=>{
      axios.get('http://localhost:8003/api/tasks')
      .then(res=>settasks(res.data))
      .catch(e=>console.log(e))
  }
  const deleteTask=(id)=>{
      axios.delete('http://localhost:8003/api/tasks/'+id)
      .then(res=>{
          settasks(res.data);
          getTasks();
      })
      .catch(e=>console.log(e))
  }
  const setLink=(link)=>{
    return "/task/edit/"+link
  }

  return (
    <>
    <Box
  display="flex"
  justifyContent="center"
  alignItems="center"
>
<h2>Tasks</h2>
</Box>
        <Box
  m={1}
  display="flex"
  justifyContent="flex-right"
  alignItems="flex-right"
>
<Link href="/task/add"><Button variant="contained" color="success" startIcon={<AddIcon/>}>Add</Button></Link>
</Box>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell width="fit-content"></TableCell>
            <TableCell align="right" width="fit-content"></TableCell>
            <TableCell align="right" width="fit-content"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.length>0&&tasks.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <ListItemText primary={row.topic} secondary={row.description}/>
              </TableCell>
              {user.role==="principal"&&
              <>
              <TableCell align="right">
              <Link href={setLink(row._id)}><Button color='primary' variant="contained" startIcon={<ModeEditIcon/>}>Edit</Button></Link>
              </TableCell>
            <TableCell align="right">
              <Link><Button color='error' variant='contained' onClick={()=>deleteTask(row._id)} startIcon={<DeleteIcon/>}>Delete</Button></Link>
              </TableCell>
              </>}
              {user.role==="teacher"&&
              <>
              <TableCell align="right">
              {row.from_person===user.userId&&<Link href={setLink(row._id)}><Button color='primary' variant="contained" startIcon={<ModeEditIcon/>}>Edit</Button></Link>}
              </TableCell>
            <TableCell align="right">
              {row.from_person===user.userId&&<Link><Button color='error' variant='contained' onClick={()=>deleteTask(row._id)} startIcon={<DeleteIcon/>}>Delete</Button></Link>}
              </TableCell>
              </>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
