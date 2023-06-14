import React from 'react'
import '../style/register.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faSignature, faLock, faMobileScreenButton, faUser, faU } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

const RegisterForm = () => {
    return (
        <div className='main'>
            <form className="form_main" action="">
                <p className="heading">Đăng ký</p>
                <div className="inputContainer">
                    <FontAwesomeIcon className="inputIcon" icon={faEnvelope} />
                    <input placeholder="Email" id="email" className="inputField" type="email" />
                </div>
                <div className="inputContainer">
                    <FontAwesomeIcon className="inputIcon" icon={faSignature} />
                    <input placeholder="Họ" id="fname" className="inputField" type="text" />
                </div>
                <div className="inputContainer">
                    <FontAwesomeIcon className="inputIcon" icon={faSignature} />
                    <input placeholder="Tên" id="lname" className="inputField" type="text" />
                </div>
                <div className="inputContainer">
                    <FontAwesomeIcon className="inputIcon" icon={faMobileScreenButton} />
                    <input placeholder="Số điện thoại" id="phone" className="inputField" type="text" />
                </div>
                <div className="inputContainer">
                    <FontAwesomeIcon className="inputIcon" icon={faUser} />
                    <input placeholder="Tên đăng nhập" id="username" className="inputField" type="text" />
                </div>
                <div className="inputContainer">
                    <FontAwesomeIcon className="inputIcon" icon={faLock} />
                    <input placeholder="Mật khẩu" id="password" className="inputField" type="password" />
                </div>
                <button id="button">Đăng ký</button>
                <div className="signupContainer">
                    <p>Bạn đã có có tài khoản?</p>
                    <Link to='/login'><span>Đăng nhập</span></Link>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm