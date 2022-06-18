import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid/Grid";
import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button/Button";
import axios from "axios";
import { Box, Checkbox, FormControl, FormControlLabel, MenuItem, Select } from "@mui/material";
const defaultValues = {
  topic: "",
  description: "",
  done:false
};

const EditTask = (props) => {
  const navigate=useNavigate();

  const id=useParams('id');
  const [formValues, setFormValues] = useState(defaultValues);

  const getTask=(id)=>{
    console.log(id);
    axios.get("http://localhost:8003/api/tasks/"+id.id)
    .then(res=>setFormValues({
      topic:res.data.topic,
      description:res.data.description,
      done:res.data.done,
      _id:res.data._id,
      to_person:res.data.to_person
    }))
  }

  useEffect(()=>{
    getTask(id);
  },[])
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.patch("http://localhost:8003/api/tasks/"+id.id,formValues)
    .then(res=>{
      console.log(res);
      navigate('/');
      window.location.reload();
    })
  };
  return (
    <>
    
    <Box
  display="flex"
  justifyContent="center"
  alignItems="center"
>
<div>
        <h3>Edit Task</h3>
    </div>
</Box>
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" justify="center" direction="column">
        <Grid item>
          <TextField
            id="topic"
            name="topic"
            label="topic"
            type="text"
            value={formValues.topic}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="description"
            name="description"
            label="description"
            type="text"
            value={formValues.description}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
        <FormControlLabel control={<Checkbox
        id="done"
        name="done"
        label="cone"
        type="checkbox"
        value={formValues.done}
        onChange={handleInputChange}
         />} label="Completed" />
        </Grid>
        <Grid item>
          <FormControl>
            <FormControlLabel control={
                <Select
                name="to_person"
                value={formValues.os}
                onChange={handleInputChange}
              >
                <MenuItem key="student" value="student">
                  Student
                </MenuItem>
                <MenuItem key="teacher" value="teacher">
                  Teacher
                </MenuItem>
              </Select>
            } label="Assign to"/>
            
          </FormControl>
        </Grid>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Grid>
    </form>
    </>
  );
};
export default EditTask;