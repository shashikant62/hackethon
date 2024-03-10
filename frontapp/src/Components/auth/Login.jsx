import { useState ,useEffect } from 'react';
import '../css/Login.css'
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';
const Login=()=>{
    const history=useNavigate();
    let [email,setemail]=useState('');
    let [password,setpassword]=useState('');
    useEffect(()=>{
        const Userinfo=JSON.parse(localStorage.getItem('data'))
        console.log(Userinfo);
        if(Userinfo){
            history('/')
            alert('alreldy logined')
        }
    },[history])
    const loginhandeler=async(e)=>{
        e.preventDefault();
        if(!email && !password){
            alert("filled all...");
            history('/register');
            return;
        }
        try {
            const config={
                headers:{
                    "Content-type":"application/json",
                }
            }
            const data=await axios.post('/api/v1/user/login',{email:email,password:password})
            localStorage.setItem('data',JSON.stringify({email,password}))
            history('/main');
        } catch (error) {
            return alert(error);
        }
    }
    return(<>
    <div className="login_form">
        <form method='get'>
            <div className="title_login">
                <p id="text-title_login">
                    LOGIN
                </p>
            </div>
            <div className="input_login">
                <div class="Email-input_login">
                        <label for="" className="label_input_login">Email:</label>
                    <input type="email" name="email" placeholder="Enter Email" className="input_email_pass_login" value={email} onChange={(e)=>setemail(e.target.value)}></input>
                </div>
                <div className="password-input_login">
                    <label for="" className="label_input_login">Password:</label>
                    <input type="password" placeholder="Enter Passwords" className="input_email_pass_login" name='password' value={password} onChange={(e)=>setpassword(e.target.value)}></input>
                </div>
            </div>
            <div className="forgot_login">
                <div className="password-forgot_login">
                    <Link to={'/forgot/password'} className="Link_header">
                    <p className="password-forgot_login" >Forgot Password</p></Link>
                </div>
            </div>
            <div className="btn-input_login">
                <input type="submit"  id="input_btn_login" onClick={loginhandeler}></input>
            </div>
        </form>
    </div>
    </>)
}
export default Login;