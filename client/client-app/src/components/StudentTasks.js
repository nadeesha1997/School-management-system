import React,{useState,useEffect} from 'react';
import ListItemText from '@mui/material/ListItemText';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { Box } from '@mui/material';

export default function StudentTasks() {

  const [tasks, settasks] = useState([])

  useEffect(()=>{
    getTasks();
  })

  const getTasks=()=>{
      axios.get('http://localhost:8003/api/tasks')
      .then(res=>settasks(res.data))
      .catch(e=>console.log(e))
  }

  return (
    <>
    <Box
  display="flex"
  justifyContent="center"
  alignItems="center"
>
<h2>Your Tasks</h2>
</Box>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell width="50px"></TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
