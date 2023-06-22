import React, { useEffect, useState } from 'react'
import '../../style/addtrainningprogram.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import tranningProgramApis from '../../api/modules/tranningProgram';
import courseApis from '../../api/modules/course'
import { toast } from 'react-toastify';

const AddTrainningProgram = ({ onClose }) => {
    const [major, setMajor] = useState('CNTT')
    const [courseInfo, setCourseInfo] = useState([])
    const [courseNumber, setCourseNumber] = useState([])

    const [courseByMajor, setCourseByMajor] = useState([])


    useEffect(() => {
        const getCourse = async () => {
            const { response, err } = await courseApis.getAllCourses()
            if (response && courseByMajor) {
                console.log(response)
                console.log(courseByMajor)

                var filteredResponse = [];

                // Sử dụng phương pháp filter để lọc các đối tượng từ response
                response.filter(function (item) {
                    // Sử dụng phương pháp forEach để kiểm tra số trong courseByMajor
                    var isNumberInCourseByMajor = false;
                    courseByMajor.forEach(function (course) {
                        if (course.number === item.number) {
                            isNumberInCourseByMajor = true;
                            return;
                        }
                    });

                    // Nếu số không trùng khớp với courseByMajor, thêm vào mảng filteredResponse
                    if (!isNumberInCourseByMajor) {
                        filteredResponse.push(item);
                    }
                });

                console.log(filteredResponse)
                setCourseInfo(filteredResponse)
            }
            if (err) {
                console.log(err)
            }
        }
        getCourse()
    }, [courseByMajor])


    useEffect(() => {
        const getTranningByMajor = async () => {
            const { response, err } = await tranningProgramApis.getAllCourseByMajor(major)
            if (response) {
                console.log(response)

                var courses = [];

                // Lặp qua mỗi đối tượng trong mảng response
                response.forEach(function (item) {
                    // Kiểm tra nếu đối tượng có trường "course"
                    if (item.course) {
                        // Thêm đối tượng khóa học vào mảng courses
                        courses.push(item.course);
                    }
                });
                setCourseByMajor(courses)
            }
            if (err) {
                console.log(err)
            }
        }
        getTranningByMajor()
    }, [major])

    const saveClicked = async () => {
        const { response, err } = await tranningProgramApis.addCourseToTrainingProgram(major, courseNumber)
        if (response) {
            console.log(response)
            toast.success("Thêm chương trình đào tạo mới thành công")
            onClose()
        }
        if (err) {
            console.log(err)
            toast.error(err)
        }
    }

    return (
        <div className='main-add-trainning-program'>
            <FontAwesomeIcon icon={faXmark} className="icon-add-trainning-program" onClick={onClose} />
            <select className='cbx-major-add-trainning-program' value={major} onChange={(e) => setMajor(e.target.value)} >
                <option value='CNTT' >CNTT</option>
                <option value='ATTT'>ATTT</option>
                <option value='DT'>DT</option>
                <option value='QKTD'>QKTD</option>
                <option value='KT'>KT</option>
            </select>
            <select className='cbx-course-add-trainning-program' value={courseNumber} onChange={(e) => setCourseNumber(e.target.value)}>
                <option >--Chọn--</option>
                {courseInfo && courseInfo.map((item) => (
                    <option key={item.number} value={item.number}>{item.name}</option>
                ))}
            </select>
            <button className='btn-save-trainning-program' onClick={() => saveClicked()}>Lưu</button>
        </div>
    )
}

export default AddTrainningProgram