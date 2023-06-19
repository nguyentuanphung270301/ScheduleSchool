import React, { useState } from 'react'
import '../../style/addstudent.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import authApis from '../../api/modules/auth';


const AddStudent = ({ onClose }) => {

    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const saveStudent = async (event) => {
        event.preventDefault(); // Ngăn chặn sự kiện mặc định của form
        if(!fname || !lname || !email || !phone  || !username || !password) {
            toast.error("Vui lòng điền đầy đủ thông tin !")
        }
        else {
            const data = {
                fname : fname,
                lname : lname,
                email : email,
                phone: phone,
                role: "ROLE_STUDENT",
                username: username,
                password: password
            }
            const {response, err} = await authApis.register(data)
            if(response){
                console.log(response)
                toast.success("Thêm sinh viên mới thành công !")
                onClose()
            }
            if(err){
                console.log(err)
            }
        }
    }


    return (
        <div className='main-add-student'>
            <FontAwesomeIcon icon={faXmark} className="icon-addstudent" onClick={onClose} />
            <form className='form-add-student' onSubmit={saveStudent}>
                <div>
                    <input
                        type='text'
                        placeholder='Họ'
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                    />
                    <input
                        type='text'
                        placeholder='Tên'
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type='text'
                        placeholder='Số điện thoại'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type='text'
                        placeholder='Tên đăng nhập'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type='password'
                        placeholder='Mật khẩu'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="save-add-student" type="submit">
                    Save
                </button>
            </form>
        </div>
    )
}

export default AddStudent