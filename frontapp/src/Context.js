import { createContext, useContext, useEffect,useState} from "react";
import {useNavigate} from 'react-router-dom';
const Appcontext=createContext();
const Approvider=({children})=>{
    const [user,setuser]=useState();
    const history=useNavigate();
    useEffect(()=>{
        const Userinfo=JSON.parse(localStorage.getItem('data'));
        setuser(Userinfo);
        if(!Userinfo){
            history('/login')
            console.log("not logend in")
        }
    },[])
    return <Appcontext.Provider value={{user,setuser}}>{children}</Appcontext.Provider>
}
export const Chatstate=()=>{
    return useContext(Appcontext);
}
export default Approvider;