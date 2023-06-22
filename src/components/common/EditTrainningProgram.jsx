import React, { useEffect, useState } from 'react'
import '../../style/edittrainningprogram.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import tranningProgramApis from '../../api/modules/tranningProgram';
import courseApis from '../../api/modules/course'
import { toast } from 'react-toastify';

const EditTrainningProgram = ({ onClose, oldMajor, oldCourseNumber }) => {
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
            const { response, err } = await tranningProgramApis.getAllCourseByMajor(oldMajor)
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
    }, [oldMajor])

    const saveClicked = async () => {
        const { response, err } = await tranningProgramApis.updateCourseOfTrainingProgram(oldMajor, oldCourseNumber, courseNumber)
        if (response) {
            console.log(response)
            toast.success("Cập nhật chương trình đào tạo mới thành công")
            onClose()
        }
        if (err) {
            console.log(err)
            toast.error(err)
        }
    }

    return (
        <div className='main-edit-trainning-program'>
            <FontAwesomeIcon icon={faXmark} className="icon-edit-trainning-program" onClick={onClose} />
            <select className='cbx-course-edit-trainning-program' value={courseNumber} onChange={(e) => setCourseNumber(e.target.value)}>
                <option >--Chọn--</option>
                {courseInfo && courseInfo.map((item) => (
                    <option key={item.number} value={item.number}>{item.name}</option>
                ))}
            </select>
            <button className='btn-save-trainning-program' onClick={() => saveClicked()}>Lưu</button>
        </div>
    )
}


export default EditTrainningProgram