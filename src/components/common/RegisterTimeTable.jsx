import React, { useEffect, useState } from 'react'
import '../../style/registertimetable.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import courseApis from '../../api/modules/course';
import scheduleApis from '../../api/modules/schedule';
import instructorsApis from '../../api/modules/instructor';
import { toast } from 'react-toastify';

const RegisterTimeTable = ({ onClose, isSaved }) => {

    const [course, setCourse] = useState([])
    const [courseNumber, setCourseNumber] = useState('')
    const [userInfo, setUserInfo] = useState('')
    const username = localStorage.getItem('username')
    const [scheduleInfo, setScheduleInfo] = useState('')

    useEffect(() => {
        const getIntructorInfo = async () => {
            const { response, err } = await instructorsApis.getInstructorById(username)
            if (response) {
                setUserInfo(response)
                console.log(response)
            }
            if (err) {
                console.log(err)
            }
        }
        getIntructorInfo()
    }, [])


    useEffect(() => {
        const getCourse = async () => {
            const { response, err } = await courseApis.getAllCourses()
            if (response) {
                console.log(response)
                setCourse(response)
            }
            if (err) {
                console.log(err)
            }
        }
        getCourse()
    }, [])


    const RegisterClicked = async () => {
        const { response, err } = await scheduleApis.generateExtraTimeTableForNewCourse(userInfo.id, courseNumber)
        if (response) {
            console.log(response)
            toast.success("Đăng ký thành công, Vui lòng lưu lại nếu bạn cảm thấy hài lòng !")
            setScheduleInfo(response)
        }
        if (err) {
            console.log(err)
            toast.error(err)
        }
    }

    const SaveClicked = async () => {
        const { response, err } = await scheduleApis.saveExtraTimeTable()
        if (response) {
            console.log(response)
            isSaved()
            onClose()
            toast.success("Lưu thời khoá biểu thành công !")
            onClose()
        }
        if (err) {
            console.log(err)
            toast.error(err)
        }
    }

    return (
        <div className='main-register-timetable'>
            <FontAwesomeIcon icon={faXmark} className="icon-register-timetable" onClick={onClose} />
            <Typography variant='h5' fontWeight='600' sx={{
                position: 'absolute',
                top: '50px'
            }}>Đăng ký lịch dạy bù, thực hành</Typography>
            <div>
                <button className='btn-register-timetable' onClick={() => RegisterClicked()}>Đăng ký</button>
                <button className='btn-save-timetable' onClick={() => SaveClicked()}>Lưu</button>
            </div>
            <select className="cbx-course" value={courseNumber} onChange={(e) => setCourseNumber(e.target.value)} >
                <option>-- Chọn --</option>
                {course.map((item) => (
                    <option key={item.number} value={item.number} >{item.name}</option>
                ))}
            </select>
            <div className='table-register-timetable'>
                <TableContainer component={Paper} className='table-register-timetable-container'>
                    <Table aria-label="customized table">
                        <TableHead sx={{ backgroundColor: '#2f7adc', position: 'sticky', top: 0 }}>
                            <TableRow>
                                <TableCell><Typography color='white'>Mã lớp</Typography></TableCell>
                                <TableCell><Typography color='white'>Khoa</Typography></TableCell>
                                <TableCell><Typography color='white'>Môn học</Typography></TableCell>
                                <TableCell><Typography color='white'>Phòng học</Typography></TableCell>
                                <TableCell><Typography color='white'>Giảng viên</Typography></TableCell>
                                <TableCell><Typography color='white'>Giờ học</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* {!userInfo || !scheduleInfo && <CircularProgress sx={{
                                position: 'absolute',
                                top: '200px',
                                right: 'calc(100% / 2)'
                            }} />} */}
                            {userInfo && scheduleInfo === '' && <TableRow>Chưa có dữ liệu</TableRow>}
                            {userInfo && scheduleInfo && (
                                <TableRow>
                                    <TableCell>{scheduleInfo.course.number}</TableCell>
                                    <TableCell>{scheduleInfo.department.name}</TableCell>
                                    <TableCell>{scheduleInfo.course.name}</TableCell>
                                    <TableCell>{scheduleInfo.room.name}</TableCell>
                                    <TableCell>{scheduleInfo.instructor.fname + ' ' + scheduleInfo.instructor.lname}</TableCell>
                                    <TableCell>{scheduleInfo.meetingTime.time}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default RegisterTimeTable