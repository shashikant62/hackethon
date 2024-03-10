import React, { useState ,useEffect} from "react";
import { Link ,Navigate, useNavigate} from "react-router-dom";
import axios from "axios";
import '../css/Header_componets.css';
const Header_Componets=()=>{
    const history=useNavigate();
    useEffect(()=>{
        const Userinfo=JSON.parse(localStorage.getItem('data'))
        if(!Userinfo){
            history('/register');
        }
    },[history])
    const Logoutinfo=async(e)=>{
            e.preventDefault();
            try {
                const config={
                    headers:{
                        "Content-type":"application/json",
                    }
                }
                const data=await axios.get('/api/v1//user/logout');
                // localStorage.setItem('data',JSON.stringify({email,password}))
                localStorage.removeItem("data");
                history('/login');
            } catch (error) {
                return alert(error);
        }
    }
    return(<>
    <div className="Header_Componets">
    <Link to={'/'} className="Link_header">
    <h1 className="logo">Portfolio</h1>
    </Link>
            <ul className="navbar_list">
            <Link to={'/'} className="Link_header" >
                <li className="list"><p className="list_item">Home</p></li></Link>
                <Link to={'/serach'} className="Link_header" >
                <li className="list"><p className="list_item">Serachs</p></li></Link>
                <Link to={'/community'} className="Link_header" >
                <li className="list"><p className="list_item">Community</p></li></Link>
                <Link to={'/Talktofriend'} className="Link_header">
                <li className="list"><p className="list_item">TalktoFriends</p></li></Link>
                <Link to={'/login'} className="Link_header" >
                <li className="list"><p className="list_item" onClick={Logoutinfo}>Logout</p></li></Link>
            </ul>
    </div>
    </>)
}

export default Header_Componets;