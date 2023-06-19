import React, { useEffect, useState } from 'react'
import '../../style/editinstructor.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import instructorsApis from '../../api/modules/instructor';


const EditInstructor = ({ id, onClose }) => {

    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [dob, setDob] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [gender, setGender] = useState(false)
    const [role, setRole] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [academicRank, setAcademicRank] = useState("")
    const [degree, setDegree] = useState("")

    const saveInstructor = async (event) => {
        event.preventDefault(); // Ngăn chặn sự kiện mặc định của form
        if (!fname || !lname || !dob || !email || !address || !phone  || !role  || !academicRank || !degree ) {
            toast.error("Vui lòng điền đầy đủ thông tin")
        } else {
            const data = {
                    academicRank: academicRank,
                    accountNonExpired: true,
                    accountNonLocked: true,
                    address: address,
                    "credentialsNonExpired": true,
                    degree: degree,
                    dob: dob,
                    email: email,
                    enabled: true,
                    fname: fname,
                    gender: gender === "Nữ" ? true : false,
                    id: id,
                    isQuitJob: false,
                    lname: lname,
                    password: password,
                    phone: phone,
                    role: role,
                    username: username
                  }
         console.log(data)     
         const {response , err} = await instructorsApis.updateInstructor(data)   
         if(response) {
            console.log(response)
            toast.success("Cập nhật thông tin giảng viên thành công !")
            onClose()
         }
         if(err) {
            console.log(err)
            toast.error(err)
        }
        }   
    }

    useEffect(() => {
        const getInstructor = async () => {
            const {response , err} = await instructorsApis.getInstructorById(id)
            if(response){
                console.log(response)
                setFname(response.fname)
                setLname(response.lname)
                setDob(response.dob)
                setEmail(response.email)
                setAddress(response.address)
                setPhone(response.phone)
                setAcademicRank(response.academicRank)
                setDegree(response.degree)
                setGender(response.gender)
                setRole(response.role)
                setUsername(response.username)
                setPassword(response.password)
            }
            if(err){
                console.log(err)
            }
        }
        getInstructor()
    }, [])
    

    return (
        <div className="main-edit-instructor" onSubmit={saveInstructor}>
            <FontAwesomeIcon icon={faXmark} className="icon-addinstructor" onClick={onClose} />
            <form className="form-addinstructor">
                <div>
                    <input
                        className="fname"
                        placeholder="Họ"
                        type="text"
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                    />
                    <input
                        className="lname"
                        placeholder="Tên"
                        type="text"
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        className="dob"
                        placeholder="Ngày sinh"
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                    />
                    <input
                        className="email"
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        className="address"
                        placeholder="Địa chỉ"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <input
                        className="phone"
                        placeholder="Số điện thoại"
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        className="academicRank"
                        placeholder="Trình độ"
                        type="text"
                        value={academicRank}
                        onChange={(e) => setAcademicRank(e.target.value)}
                    />
                    <input
                        className="degree"
                        placeholder="Bằng cấp"
                        type="text"
                        value={degree}
                        onChange={(e) => setDegree(e.target.value)}
                    />
                </div>
                <div>
                    <select className="gender" value={gender ? "Nữ" : "Nam" }
                        onChange={(e) => setGender(e.target.value)}>
                        <option value="Nữ">Nữ</option>
                        <option value="Nam">Nam</option>
                    </select>
                    <select className="role" value={role}
                        onChange={(e) => setRole(e.target.value)}>
                        <option value="ROLE_ACCOUNTANT">ROLE_ACCOUNTANT</option>
                        <option value="ROLE_OFFICER">ROLE_OFFICER</option>
                        <option value="ROLE_LECTURER">ROLE_LECTURER</option>
                        <option value="ROLE_FACILITY">ROLE_FACILITY</option>
                    </select>
                </div>
                <button className="save-addinstructor" type="submit">
                    Save
                </button>
            </form>
        </div>
    )
}

export default EditInstructor