import React from "react";
import getUserData from "../services/userdata";
import StudentTasks from "./StudentTasks";
import TeacherTasks from "./TeacherTasks";


export default function Tasks() {

  const user=getUserData();

  return (
    <>
    {user&&(user.role==="principal"||user.role==="teacher")?<TeacherTasks/>:<StudentTasks/>}
    </>
  );
}
