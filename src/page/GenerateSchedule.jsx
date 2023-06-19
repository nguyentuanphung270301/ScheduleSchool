import React, { useEffect, useState } from 'react'
import '../style/generateschedule.css'
import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import scheduleApis from '../api/modules/schedule'
import { toast } from 'react-toastify'
import emailjs from '@emailjs/browser';

const GenerateSchedule = () => {
    const [schedule, setSchedule] = useState(null)



    useEffect(() => {
        const generateSchedule = async () => {
            const { response, err } = await scheduleApis.generateSchedule()
            if (response) {
                console.log(response)
                setSchedule(response)
                toast.success("Tạo thời khoá biểu mới thành công !")
            }
            if (err) {
                console.log(err)
                toast.error(err)

            }
        }
        generateSchedule()
    }, [])

    const generateClicked = async () => {
        const { response, err } = await scheduleApis.generateSchedule()
        if (response) {
            console.log(response)
            setSchedule(response)
            toast.success("Lưu thời khoá biểu mới thành công !")
        }
        if (err) {
            console.log(err)
            toast.error(err)
        }
    }

    const saveClicked = async () => {
        const { response, err } = await scheduleApis.saveSchedule()
        if (response) {
            console.log(response)
            // Gửi email cho tất cả giảng viên
            toast.success("Lưu thời khoá biểu mới thành công !")
        }
        if (err) {
            console.log(err)
            toast.error(err)
        }
    }

    return (
        <div className='main-generate-schedule'>
            <div className='btn-generate'>
                <button className='btn-create-schedule' onClick={() => generateClicked()}>Tạo mới</button>
                <button className='btn-save-schedule' onClick={() => saveClicked()}>Lưu</button>
            </div>
            <div className='table-schedule'>
                <TableContainer component={Paper} className='container-schedule'>
                    <Table aria-label="customized table">
                        <TableHead sx={{ backgroundColor: 'black', position: 'sticky', top: 0 }}>
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
                            {!schedule && <CircularProgress sx={{
                                position: 'absolute',
                                top: '200px',
                                right: 'calc(100% / 2)'
                            }} />}
                            {schedule && (schedule.map((row) => (
                                <TableRow
                                    key={row.id}
                                >
                                    <TableCell>{row.course.number}</TableCell>
                                    <TableCell>{row.department.name}</TableCell>
                                    <TableCell>{row.course.name}</TableCell>
                                    <TableCell>{row.room.name}</TableCell>
                                    <TableCell>{row.instructor.fname + ' ' + row.instructor.lname}</TableCell>
                                    <TableCell>{row.meetingTime.time}</TableCell>
                                </TableRow>
                            )))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default GenerateSchedule