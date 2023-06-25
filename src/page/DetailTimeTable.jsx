import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';
import '../style/detailTimeTable.css'
import scheduleApis from '../api/modules/schedule'
import { CircularProgress, Typography } from '@mui/material';
import '../style/table.css'
import studentApis from '../api/modules/student';
import instructorsApis from '../api/modules/instructor';





const DetailTimeTable = () => {


    const location = useLocation();
    const id = location.pathname.replace('/mainpage/timetable/detail/', '');
    const role = localStorage.getItem('role')
    const username = localStorage.getItem('username')

    const numRows = 8; // Số hàng
    const numCols = 8; // Số cột
    const daysOfWeek = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];
    const meetingTime = ["Kíp 1: 7h-8h", "Kíp 2: 8h-9h", "Kíp 3: 9h-10h", "Kíp 4: 10h-11h", "Kíp 5: 13h-14h", "Kíp 6: 14h-15h", "Kíp 7: 15h-16h", "Kíp 8: 16h-17h"];
    const [userInfo, setUserInfo] = useState(null)



    const [data, setData] = useState(null)
    var result = []

    var column = null
    var row = null

    useEffect(() => {
        const isChecked = async () => {
            if (role !== null && role === 'ROLE_STUDENT') {
                const { response, err } = await studentApis.getStudentById(username)
                if (response) {
                    console.log(response)
                    setUserInfo(response)
                }
                if (err) {
                    console.log(err)
                }
            }
            if (role !== null && role !== 'ROLE_STUDENT') {
                const { response, err } = await instructorsApis.getInstructorById(id)
                if (response) {
                    setUserInfo(response)
                    console.log(response)
                }
                if (err) {
                    console.log(err)
                }
            }
        }
        isChecked()
    }, [role, username])


    useEffect(() => {
        const checkInfo = async () => {
            if (role === 'ROLE_LECTURER' || role === 'ROLE_OFFICER') {
                const { response, err } = await scheduleApis.getSchedule()
                if (response) {
                    console.log(response)
                    const filteredData = response.filter((response) => response.instructor.id === parseInt(id))
                    console.log(filteredData)
                    filteredData.map((item) => {
                        const [day, time] = item.meetingTime.time.split(':')
                        if (day.trim() === 'MON') {
                            column = 0
                        }
                        if (day.trim() === 'TUE') {
                            column = 1
                        }
                        if (day.trim() === 'WED') {
                            column = 2
                        }
                        if (day.trim() === 'THU') {
                            column = 3
                        }
                        if (day.trim() === 'FRI') {
                            column = 4
                        }
                        if (day.trim() === 'SAT') {
                            column = 5
                        }
                        if (day.trim() === 'SUN') {
                            column = 6
                        }
                        if (time.trim() === '07 AM -- 08 AM') {
                            row = 0
                        }
                        if (time.trim() === '08 AM -- 09 AM') {
                            row = 1
                        }
                        if (time.trim() === '09 AM -- 10 AM') {
                            row = 2
                        }
                        if (time.trim() === '10 AM -- 11 PM') {
                            row = 3
                        }
                        if (time.trim() === '13 AM -- 14 PM') {
                            row = 4
                        }
                        if (time.trim() === '14 PM -- 15 PM') {
                            row = 5
                        }
                        if (time.trim() === '15 PM -- 16 PM') {
                            row = 6
                        }
                        if (time.trim() === '16 PM -- 17 PM') {
                            row = 7
                        }
                        result.push({
                            'title': item.course.name,
                            'code': item.course.number,
                            'room': item.room.name,
                            'instructor': `${item.instructor.fname} ${item.instructor.lname}`,
                            'column': column,
                            'row': row
                        });
                    })
                    console.log(result)
                }
                setData(result)
                if (err) {
                    console.log(err)
                }
            }
            if (role === 'ROLE_STUDENT' && userInfo !== null) {
                const { response, err } = await studentApis.getScheduleOfStudent(userInfo.id)
                if (response) {
                    console.log(response)
                    response.map((item) => {
                        const [day, time] = item.timeTable.meetingTime.time.split(':')
                        if (day.trim() === 'MON') {
                            column = 0
                        }
                        if (day.trim() === 'TUE') {
                            column = 1
                        }
                        if (day.trim() === 'WED') {
                            column = 2
                        }
                        if (day.trim() === 'THU') {
                            column = 3
                        }
                        if (day.trim() === 'FRI') {
                            column = 4
                        }
                        if (day.trim() === 'SAT') {
                            column = 5
                        }
                        if (day.trim() === 'SUN') {
                            column = 6
                        }
                        if (time.trim() === '07 AM -- 08 AM') {
                            row = 0
                        }
                        if (time.trim() === '08 AM -- 09 AM') {
                            row = 1
                        }
                        if (time.trim() === '09 AM -- 10 AM') {
                            row = 2
                        }
                        if (time.trim() === '10 AM -- 11 PM') {
                            row = 3
                        }
                        if (time.trim() === '13 AM -- 14 PM') {
                            row = 4
                        }
                        if (time.trim() === '14 PM -- 15 PM') {
                            row = 5
                        }
                        if (time.trim() === '15 PM -- 16 PM') {
                            row = 6
                        }
                        if (time.trim() === '16 PM -- 17 PM') {
                            row = 7
                        }
                        result.push({
                            'title': item.timeTable.course.name,
                            'code': item.timeTable.course.number,
                            'room': item.timeTable.room.name,
                            'instructor': `${item.timeTable.instructor.fname} ${item.timeTable.instructor.lname}`,
                            'column': column,
                            'row': row
                        });
                    })
                    console.log(result)
                }
                setData(result)
                if (err) {
                    console.log(err)
                }
            }
        }
        checkInfo()
    }, [userInfo])

    console.log(data)


    return (
        <div>
            <div className='main-detail-timetable'>
                <div className='header-detail-timetale'>
                    {userInfo && <div className='card-info'>
                        <Typography variant='h7' fontSize='18px' fontWeight='500' sx={{ marginLeft: '10px', marginTop: '5px' }}>Tên: {userInfo.fname + " " + userInfo.lname}</Typography>
                        <Typography variant='h7' fontSize='18px' fontWeight='500' sx={{ marginLeft: '10px' }} >Ngày sinh: {userInfo.dob}</Typography>
                        <Typography variant='h7' fontSize='18px' fontWeight='500' sx={{ marginLeft: '10px' }} >Email: {userInfo.email}</Typography>
                        <Typography variant='h7' fontSize='18px' fontWeight='500' sx={{ marginLeft: '10px' }} >Số điện thoại: {userInfo.phone}</Typography>
                        <Typography variant='h7' fontSize='18px' fontWeight='500' sx={{ marginLeft: '10px' }} >Role: {userInfo.role}</Typography>
                    </div>}
                    {role === 'ROLE_STUDENT' ? <Typography variant='h3' fontWeight='500' sx={{
                        top: '20px'
                    }}>Thời khoá biểu</Typography> : <Typography variant='h3' fontWeight='500' sx={{
                        top: '20px'
                    }}>Lịch dạy</Typography>}
                </div>
                <div className='schedule-week'>
                    {data ? <table className='detail-table'>
                        <thead>
                            <tr>
                                <th></th>
                                {daysOfWeek.map((day, index) => (
                                    <th key={index} className='day'>{day}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {/* Tạo các hàng */}
                            {meetingTime.map((time, rowIndex) => (
                                <tr key={rowIndex} className='season'>
                                    <td>{time}</td>
                                    {daysOfWeek.map((_, columnIndex) => {
                                        const matchingData = data.find(item => item.column === columnIndex && item.row === rowIndex)
                                        return (
                                            <td key={columnIndex}>
                                                {matchingData && <div className='event-table'>
                                                    <Typography fontWeight='550' fontSize='16px' marginLeft='5px'>{matchingData && `${matchingData.title} (${matchingData.code})`}</Typography>
                                                    <Typography fontWeight='500' fontSize='14px' marginLeft='5px'>{matchingData && `Phòng: ${matchingData.room}`}</Typography>
                                                    <Typography fontWeight='500' fontSize='14px' marginLeft='5px'>{matchingData && `GV: ${matchingData.instructor}`}</Typography>
                                                </div>}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table> : <CircularProgress sx={{
                        position: 'absolute',
                        top: 'calc(100 % / 2)',
                        right: 'calc(100% / 2)'
                    }} />}
                </div>
            </div>
        </div>
    )
}

export default DetailTimeTable