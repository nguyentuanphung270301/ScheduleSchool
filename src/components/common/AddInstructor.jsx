import React, { useState } from 'react'
import '../../style/addinstructor.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import authApis from '../../api/modules/auth';


const AddInstructor = ({ onClose }) => {

    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [role, setRole] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const saveInstructor = async (event) => {
        event.preventDefault(); // Ngăn chặn sự kiện mặc định của form
        if(!fname || !lname || !email || !phone || !role || !username || !password) {
            toast.error("Vui lòng điền đầy đủ thông tin !")
        }
        else {
            const data = {
                fname : fname ,
                lname : lname,
                email : email,
                phone: phone,
                role: role,
                username: username,
                password: password
            }
            const {response, err} = await authApis.register(data)
            if(response){
                console.log(response)
                toast.success("Thêm giảng viên mới thành công !")
                onClose()
            }
            if(err){
                console.log(err)
            }
        }
    }


    return (
        <div className='main-add-instructor'>
            <FontAwesomeIcon icon={faXmark} className="icon-addinstructor" onClick={onClose} />
            <form className='form-add-instructor' onSubmit={saveInstructor}>
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
                <select className="role-instructor"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="ROLE_ACCOUNTANT">ROLE_ACCOUNTANT</option>
                    <option value="ROLE_OFFICER">ROLE_OFFICER</option>
                    <option value="ROLE_LECTURER">ROLE_LECTURER</option>
                    <option value="ROLE_FACILITY">ROLE_FACILITY</option>
                </select>
                <button className="save-add-instructor" type="submit">
                    Save
                </button>
            </form>
        </div>
    )
}

export default AddInstructor