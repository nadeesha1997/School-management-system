import jwt from 'jwt-decode'


const getUserData=()=>{
    try{
        let token=localStorage.getItem("token");
        let userd=jwt(token)
        return userd;
    }catch{
        return null;
    }
}
export default getUserData;