import { useState ,useEffect} from 'react';
import '../css/Register.css'
import {useNavigate} from 'react-router-dom';
// import {useHistory} from 'react-dom'
import axios from 'axios';
const Register=()=>{
    const history=useNavigate();
    useEffect(()=>{
        const Userinfo=JSON.parse(localStorage.getItem('data'))
        console.log(Userinfo);
        if(Userinfo){
            history('/');
        }
    },[history])
    let[loading,setloading]=useState(false);
    const [user,setuser]=useState({
        name:"",email:"",password:"",location:""
    })
    let name,value;
    const handeleinputs=(e)=>{
        name=e.target.name;
        value=e.target.value;
        setuser({...user, [name]:value})
    }
    
    const Postdata=async(e)=>{
        setloading(true);
        if(!user.email && !user.password && !user.location && !user.name){
            setloading(false);
            alert("filled all...");
            history('/login');
            return;
        }
        try {
            e.preventDefault();
            const {name,email,password,location}=user;
            const config={
                headers:{
                    "Content-type":"application/json",
                }
            }
            const {data}=await axios.post('/api/v1/user/register',user,config)
            localStorage.setItem('data',JSON.stringify(user))
            // JSON.stringify(user)
            setloading(false);
            history('/');
        } catch (error) {
            return alert(error);
        }
    }
    return(<>
    <div class="Register_form">
    <form method='post'>
        <div className="title_Register">
            <p id="text-title_Register">
                Register
            </p>
        </div>
        <div className="input_Register">
            <div className="Name-input_Register">
                <label  className="label_input_Register">Name:</label>
                <input type="text" name='name' placeholder="Enter Name" className="input_email_name_mobile_pass_Register" value={user.name} onChange={handeleinputs}></input>
            </div>
            <div className="Email-input_Register">
                    <label className="label_input_Register">Email:</label>
                <input type="email" placeholder="Enter Email" className="input_email_name_mobile_pass_Register" value={user.email} onChange={handeleinputs} name='email'></input>
            </div>
            <div className="Mobile-input_Register">
                    <label className="label_input_Register">location</label>
                <input type="text" placeholder="Enter location" className="input_email_name_mobile_pass_Register" name='location' value={user.location} onChange={handeleinputs}></input>
            </div>
            <div className="password-input_Register">
                <label  className="label_input_Register">Password:</label>
                <input type="password" name="password" placeholder="Enter Passwords" className="input_email_name_mobile_pass_Register"value={user.password} onChange={handeleinputs}></input>
            </div>
        </div>
        <div className="btn-input_Register">
            <input type="submit" id="input_btn_Register" onClick={Postdata}></input>
        </div>
    </form>
    </div>
    </>)
}

export default Register;