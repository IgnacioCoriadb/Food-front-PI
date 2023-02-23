import React from 'react';
import style from "./NavBar.module.css";
import logo from "../../img/logo.png";
import {Link} from "react-router-dom";
import { useDispatch } from "react-redux";
import { cleanState} from "../../Redux/actions/actions";

function NavBar(){

const dispatch = useDispatch();

const redirectPage = ()=>{
    window.location.replace('/home');
    dispatch(cleanState())
}

    return (
        <div className={style.backgroundColor}>
            <div className={style.container}>
                <div className={style.logo}>
                    <Link to="/home"><img src={logo} alt="logo" onClick={() => redirectPage()} /></Link>
                </div>
                <div>
                    <ul className={style.links}>
                        <Link to="/home" className={style.link} onClick={() => redirectPage()}><li>Home</li></Link>
                        <Link to="/newRecipe" className={style.link}><li>Nueva Receta</li></Link>
                        <Link to="/project" className={style.link}><li>Proyecto</li></Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}


export default NavBar;

