import React from "react";
import '../css/Subcommunity.css';
import img from '../css/img/1.jpg'
const Subcommunity=()=>{
    return(<>
    <div className="Subcommunity_main">
        <div className="logo_img_avtar">
            <img src={img} alt="img" className="img_logo_subcommunuty"></img>
        </div>
        <div className="Info_sub">
            <h3 className="name_Info_sub">Heee</h3>
            <p className="sport_info_sub">"Cricket"</p>
        </div>
        <button className="btn_subcommunity">JOIN</button>
    </div>
    </>)
}
export default Subcommunity;