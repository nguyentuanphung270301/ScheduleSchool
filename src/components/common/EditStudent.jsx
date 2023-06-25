import React, { useEffect, useState } from 'react'
import '../../style/editstudent.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import studentApis from '../../api/modules/student';


const EditStudent = ({ id, onClose }) => {

    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [dob, setDob] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [gender, setGender] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    const saveStudent = async (event) => {
        event.preventDefault(); // Ngăn chặn sự kiện mặc định của form
        if (!fname || !lname || !dob || !email || !address || !phone) {
            toast.error("Vui lòng điền đầy đủ thông tin")
        } else {
            const data = {
                id: id,
                fname: fname,
                lname: lname,
                dob: dob,
                gender: gender === "Nữ" ? true : false,
                address: address,
                email: email,
                phone: phone,
                role: "ROLE_STUDENT",
                username: username,
                password: password,
                isDrop: false,
                studentClass: null,
                enabled: true,
                accountNonExpired: true,
                accountNonLocked: true,
                credentialsNonExpired: true
            }
            console.log(data)
            const { response, err } = await studentApis.updateStudent(data)
            if (response) {
                console.log(response)
                toast.success("Cập nhật thông tin sinh viên thành công !")
                onClose()
            }
            if (err) {
                console.log(err)
                toast.error(err.message)
            }
        }
    }

    useEffect(() => {
        const getStudent = async () => {
            const { response, err } = await studentApis.getStudentById(id)
            if (response) {
                console.log(response)
                setFname(response.fname)
                setLname(response.lname)
                setDob(response.dob)
                setEmail(response.email)
                setAddress(response.address)
                setPhone(response.phone)
                setGender(response.gender)
                setUsername(response.username)
                setPassword(response.password)
            }
            if (err) {
                console.log(err)
            }
        }
        getStudent()
    }, [])


    return (
        <div className="main-edit-student" onSubmit={saveStudent}>
            <FontAwesomeIcon icon={faXmark} className="icon-addstudent" onClick={onClose} />
            <form className="form-addstudent">
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
                    <select className="gender" value={gender ? "Nữ" : "Nam" }
                        onChange={(e) => setGender(e.target.value)}>
                        <option value='Nữ'>Nữ</option>
                        <option value='Nam'>Nam</option>
                    </select>
                </div>
                <button className="save-addstudent" type="submit">
                    Save
                </button>
            </form>
        </div>
    )
}

export default EditStudent