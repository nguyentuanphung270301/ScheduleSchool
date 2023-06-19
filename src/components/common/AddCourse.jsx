import React, { useEffect, useState } from 'react'
import '../../style/addcourse.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import authApis from '../../api/modules/auth';
import departmentApis from '../../api/modules/department'
import instructorApis from '../../api/modules/instructor'
import courseApis from '../../api/modules/course';
import Select from 'react-select';


const AddCourse = ({ onClose }) => {
    const [departmentList, setDepartmentList] = useState([])
    const [instructorList, setInstructorList] = useState([])
    const [code, setCode] = useState("")
    const [name, setName] = useState("")
    const [quanlity, setQuanlity] = useState(0)
    const [department, setDepartment] = useState("")
    const [instructor, setInstructor] = useState("")
    const [instructorId, setInstructorId] = useState([])


    const saveClicked = async (event) => {
        event.preventDefault(); // Ngăn chặn sự kiện mặc định của form
        if (!code || !name || quanlity === 0 || !department || !instructor) {
            toast.error("Vui lòng điền đầy đủ thông tin !")
        }
        else {
            const data = {
                number: code,
                name: name,
                maxNumberOfStudents: parseInt(quanlity),
                isDeleted: false,
                instructorsId: instructorId,
                department: {
                    id: parseInt(department)
                }

            }
            console.log(data)
            const { response, err } = await courseApis.createCourse(data)
            if (response) {
                console.log(response)
                toast.success("Thêm khoá học mới thành công !")
                onClose()
            }
            if (err) {
                console.log(err)
                toast.error(err)
            }
        }
    }
    useEffect(() => {
        const getDepartment = async () => {
            const { response, err } = await departmentApis.getAll()
            if (response) {
                console.log(response)
                setDepartmentList(response)
            }
            if (err) {
                console.log(err)
            }
        }
        getDepartment()
    }, [])


    useEffect(() => {
        const getInstructor = async () => {
            const { response, err } = await instructorApis.getAllInstructors()
            if (response) {
                console.log(response)
                const filterData = response.filter((item) => item.isQuitJob === false && item.role === "ROLE_LECTURER")
                setInstructorList(filterData.map((item) => ({
                    value: item.id,
                    label: `${item.fname} ${item.lname}`
                })))
            }
            if (err) {
                console.log(err)
            }
        }
        getInstructor()
    }, [])

    const handleChange = (selected) => {
        setInstructor(selected);
        const filter = selected.map((item) => item.value)
        setInstructorId(filter)

    };


    return (
        <div className='main-add-course'>
            <FontAwesomeIcon icon={faXmark} className="icon-addcourse" onClick={onClose} />
            <form className='form-add-course' onSubmit={saveClicked}>

                <input type='text' placeholder='Mã môn' value={code} onChange={(e) => setCode(e.target.value)} />
                <input type='text' placeholder='Tên môn' value={name} onChange={(e) => setName(e.target.value)} />
                <input type='number' placeholder='Số lượng sinh viên' value={quanlity} onChange={(e) => setQuanlity(e.target.value)} />

                <select className="cbx-department" value={department} onChange={(e) => setDepartment(e.target.value)} >
                    <option>-- Chọn --</option>
                    {departmentList.map((item) => (
                        <option key={item.id} value={item.id} >{item.name}</option>
                    ))}
                </select>

                <Select
                    options={instructorList}
                    placeholder="-- Chọn --"
                    isMulti
                    value={instructor}
                    onChange={handleChange}
                    className='dropdown-instructor'
                />

                <button className="save-add-course" type="submit">
                    Save
                </button>
            </form>
        </div>
    )
}

export default AddCourse