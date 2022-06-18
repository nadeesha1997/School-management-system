import React, { useState } from "react";
import Grid from "@mui/material/Grid/Grid";
import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button/Button";
import axios from "axios";
import { Box, FormControl, FormControlLabel, MenuItem, Select } from "@mui/material";
import getUserData from "../services/userdata";

const user=getUserData()

const defaultValues = {
  topic: "",
  description: "",
  to_person:"student",
  from_person:user.userId
};
const AddTask = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:8003/api/tasks",formValues)
    .then(res=>console.log(formValues))
    .catch(e=>console.log(e))
  };
  return (
    <>
    
    <Box
  display="flex"
  justifyContent="center"
  alignItems="center"
>
<div>
        <h3>Add new Task</h3>
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
            type="description"
            value={formValues.description}
            onChange={handleInputChange}
          />
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
export default AddTask;