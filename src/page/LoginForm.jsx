import React, { useState } from 'react'
import '../style/login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';
import authApis from '../api/modules/auth'
import { toast } from 'react-toastify';

const LoginForm = () => {

  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)

  const navigate = useNavigate();

  const handleLoginClick = async (event) => {
    event.preventDefault(); // Ngăn chặn sự kiện mặc định của form
    if (username === null && password !== null ) {
      toast.error('Vui lòng nhập tên đăng nhập!')
    }
    if (password === null && username !== null) {
      toast.error('Vui lòng nhập mật khẩu !')
    }
    if(username === null && password === null) {
      toast.error('Vui lòng nhập tên đăng nhập và mật khẩu !')
    }
    const data = {
      username: username,
      password: password
    };
    const { response, err } = await authApis.login(data);
    if (response) {
      console.log(response);
      toast.success("Đăng nhập thành công !")
      localStorage.setItem('role', response.message)
      localStorage.setItem('username', data.username)
      navigate('/mainpage/homepage')
    }
    if (err) {
      console.log(err);
      toast.error(err)
    }
  };




  return (
    <div className='main'>
      <form className="form_main" onSubmit={handleLoginClick}>
        <p className="heading">Đăng nhập</p>
        <div className="inputContainer">
          <FontAwesomeIcon className="inputIcon" icon={faUser} />
          <input placeholder="Tên đăng nhập" id="username" className="inputField" type="text" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="inputContainer">
          <FontAwesomeIcon className="inputIcon" icon={faLock} />
          <input placeholder="Mật khẩu" id="password" className="inputField" type="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button id="button" type='submit'>Đăng nhập</button>
      </form>
    </div>
  )
}

export default LoginForm