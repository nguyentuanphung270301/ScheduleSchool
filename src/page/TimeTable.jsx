import React, { useEffect } from 'react'
import '../style/timetable.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from "@fortawesome/free-solid-svg-icons";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import { CircularProgress, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import studentApis from '../api/modules/student';
import scheduleApis from '../api/modules/schedule'
import instructorsApis from '../api/modules/instructor';
import { useState } from 'react';

const TimeTable = () => {

    const username = localStorage.getItem('username')
    const role = localStorage.getItem('role')
    const [userInfo, setUserInfo] = useState(null)
    const [timeTable, setTimeTable] = useState(null)

    const handleItemClick = (id) => {
        console.log(`Clicked item with id: ${id}`);
    };

    useEffect(() => {
        const isChecked = async () => {
            if (role !== null && role === 'ROLE_STUDENT') {
                const { response, err } = await studentApis.getStudentById(username)
                if (response) {
                    console.log(response)
                }
                if (err) {
                    console.log(err)
                }
            }
            if (role !== null && role !== 'ROLE_STUDENT') {
                const { response, err } = await instructorsApis.getInstructorById(username)
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
            if (role === 'ROLE_LECTURER') {
                const { response, err } = await scheduleApis.getSchedule()
                if (response && userInfo !== null) {
                    console.log(response)
                    const filteredData = response.filter((response) => response.instructor.id === userInfo.id)
                    setTimeTable(filteredData)
                }
                if (err) {
                    console.log(err)
                }
            }
            if (role === 'ROLE_OFFICER') {
                const { response, err } = await scheduleApis.getSchedule()
                if (response && userInfo !== null) {
                    console.log(response)
                    setTimeTable(response)
                }
                if (err) {
                    console.log(err)
                }
            }
        }
        checkInfo()
    }, [userInfo])


    return (
        <div>
            <div className='main-timetable'>
                <div className='table'>
                    <TableContainer component={Paper} className='table-container'>
                        <Table aria-label="customized table">
                            <TableHead sx={{ backgroundColor: 'black' }}>
                                <TableRow>
                                    <TableCell><Typography color='white'>Mã lớp</Typography></TableCell>
                                    <TableCell><Typography color='white'>Khoa</Typography></TableCell>
                                    <TableCell><Typography color='white'>Môn học</Typography></TableCell>
                                    <TableCell><Typography color='white'>Phòng học</Typography></TableCell>
                                    <TableCell><Typography color='white'>Giảng viên</Typography></TableCell>
                                    <TableCell><Typography color='white'>Giờ học</Typography></TableCell>
                                    <TableCell align='center'><Typography color='white'>Hành động</Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {!userInfo || !timeTable && <CircularProgress sx={{
                                    position: 'absolute',
                                    top: '200px',
                                    right: 'calc(100% / 2)'
                                }} />}
                                {userInfo && timeTable && (timeTable.map((row) => (
                                    <TableRow
                                        key={row.id}
                                    >
                                        <TableCell>{row.course.number}</TableCell>
                                        <TableCell>{row.department.name}</TableCell>
                                        <TableCell>{row.course.name}</TableCell>
                                        <TableCell>{row.room.name}</TableCell>
                                        <TableCell>{row.instructor.fname + ' ' + row.instructor.lname}</TableCell>
                                        <TableCell>{row.meetingTime.time}</TableCell>
                                        <TableCell align='center'>
                                            <Link to={`/mainpage/timetable/detail/${row.instructor.id}`} onClick={() => handleItemClick(row.instructor.id)} style={{
                                                color: 'inherit',
                                                width: '100%',
                                                textDecoration: 'none',
                                            }}><FontAwesomeIcon className='table-icon' icon={faEye} /></Link></TableCell>
                                    </TableRow>
                                )))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    )
}

export default TimeTable