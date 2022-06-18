import React,{useEffect, useState} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import axios from 'axios';
import ListItemButton from '@mui/material/ListItemButton';
import { Link } from 'react-router-dom';
import getUserData from '../services/userdata';

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

    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
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

    </List>
    </>
  );
}

