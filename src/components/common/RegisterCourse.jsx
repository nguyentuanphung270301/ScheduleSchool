import React, { useEffect, useState } from 'react'
import '../../style/registercourse.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import studentApis from '../../api/modules/student';
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import scheduleApis from '../../api/modules/schedule';
import { toast } from 'react-toastify';



const RegisterCourse = ({ onClose }) => {

    const [userInfo, setUserInfo] = useState(null)
    const [scheduleInfo, setScheduleInfo] = useState(null)
    const username = localStorage.getItem('username')
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null)
    const [timeTable, setTimeTable] = useState([])


    const handleClickOpen = (id) => {
        setSelectedId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setSelectedId(null);
        setOpen(false);
    };

    useEffect(() => {
        const getStudentInfo = async () => {
            const { response, err } = await studentApis.getStudentById(username)
            if (response) {
                console.log(response)
                setUserInfo(response)
            }
            if (err) {
                console.log(err)
            }
        }
        getStudentInfo()
    }, [])

    useEffect(() => {
        const getTimeTable = async () => {
            if (userInfo !== null) {
                const { response, err } = await studentApis.getScheduleOfStudent(userInfo.id)
                if (response) {
                    console.log(response)
                    setTimeTable(response)
                }
                if (err) {
                    console.log(err)
                }
            }
        }
        getTimeTable()
    }, [userInfo])

    useEffect(() => {
        const getSchedule = async () => {
            const { response, err } = await scheduleApis.getSchedule()
            if (response && timeTable) {
                console.log(response)
                const filteredData = response.filter(item => {
                    // Kiểm tra nếu item.id không tồn tại trong data2
                    const isIdUnique = !timeTable.some(data => data.timeTable && data.timeTable.id === item.id);
                    return isIdUnique;
                });
                setScheduleInfo(filteredData)
            }
            if (err) {
                console.log(err)
            }
        }
        getSchedule()
    }, [timeTable])



    const registerCourse = async (timeTableId) => {
        const { response, err } = await studentApis.addTimeTableForStudent(userInfo.id, timeTableId)
        if (response) {
            console.log(response)
            setOpen(false)
            toast.success("Đăng ký môn học thành công !")
        }
        if (err) {
            console.log(err)
            toast.error(err)
        }
    }




    return (
        <div className='main-register-course'>
            <FontAwesomeIcon icon={faXmark} className="icon-register-course" onClick={onClose} />
            <Typography variant='h4' fontWeight='600'>Danh sách môn mở đăng ký</Typography>
            <div className='table-register-course'>
                <TableContainer component={Paper} className='table-register-course-container'>
                    <Table aria-label="customized table">
                        <TableHead sx={{ backgroundColor: '#2f7adc', position: 'sticky', top: 0 }}>
                            <TableRow>
                                <TableCell><Typography color='white'>Mã lớp</Typography></TableCell>
                                <TableCell><Typography color='white'>Khoa</Typography></TableCell>
                                <TableCell><Typography color='white'>Môn học</Typography></TableCell>
                                <TableCell><Typography color='white'>Phòng học</Typography></TableCell>
                                <TableCell><Typography color='white'>Giảng viên</Typography></TableCell>
                                <TableCell><Typography color='white'>Giờ học</Typography></TableCell>
                                <TableCell align='center'><Typography color='white'>Đăng ký</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!userInfo || !scheduleInfo && <CircularProgress sx={{
                                position: 'absolute',
                                top: '200px',
                                right: 'calc(100% / 2)'
                            }} />}
                            {userInfo && scheduleInfo && (scheduleInfo.map((row) => (
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
                                        <Box>
                                            <button className='register-btn' onClick={() => handleClickOpen(row.id)}>
                                                <FontAwesomeIcon icon={faPlus} />
                                            </button>
                                            <Dialog
                                                open={open}
                                                onClose={handleClose}
                                            >
                                                <DialogTitle>Xác nhận đăng ký môn</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText>
                                                        Bạn có muốn đăng ký môn này không
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleClose}><Typography textTransform='uppercase' color='black'>Huỷ</Typography></Button>
                                                    <Button
                                                        onClick={() => registerCourse(selectedId)}
                                                        sx={{
                                                            backgroundColor: 'white',
                                                            ":hover": {
                                                                backgroundColor: 'green',
                                                                opacity: 0.8
                                                            }
                                                        }}
                                                    >
                                                        <Typography textTransform='uppercase' color='black'>Xác nhận</Typography>
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            )))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default RegisterCourse