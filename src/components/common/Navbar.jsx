import { Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import '../../style/navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faRightFromBracket, faHouse, faCaretDown, faCaretUp, faCalendarDay, faFilePen } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';
import authApis from '../../api/modules/auth'
import studentApis from '../../api/modules/student';
import instructorsApis from '../../api/modules/instructor';
import HomePage from '../../page/HomePage';
import { toast } from 'react-toastify';



const Navbar = () => {
    const [isOpenNav, setIsOpenNav] = useState(true)
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null)

    const username = localStorage.getItem('username')
    const role = localStorage.getItem('role')

    const [headerText, setHeaderText] = useState('Trang chủ')

    const [menuOne, setMenuOne] = useState(false)
    const [menuTwo, setMenuTwo] = useState(false)

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

    const OpenMenuOne = () => {
        setMenuOne(!menuOne)
    }

    const OpenMenuTwo = () => {
        setMenuTwo(!menuTwo)
    }

    const handleToggleLogout = () => {
        setVisible(!visible);
    };


    const openNav = () => {
        setIsOpenNav(!isOpenNav);
        if (isOpenNav) {
            document.documentElement.style.setProperty('--width-nav', '300px');
        }
        else {
            document.documentElement.style.setProperty('--width-nav', '60px');
        }
    };

    const handleMenuClick = (text) => {
        setHeaderText(text);
    };

    const logoutClick = async () => {
        const { response, err } = await authApis.logout()
        if (response) {
            toast.success('Đăng xuất thành công !')
            localStorage.removeItem('username')
            localStorage.removeItem('role')
            navigate('/')
        }
        if (err) {
            toast.error(err)
        }
    }

    return (
        <div className='parent'>
            <header className='header-mainpage'>
                <div className='header-text'>
                    <FontAwesomeIcon icon={faList} className='icon' onClick={openNav} />
                    <Typography variant='h4' fontSize='20px' fontWeight='500' marginLeft='20px'>{headerText}</Typography>
                </div>
                <Button className='header-btn' variant='text' fontSize='17px' onClick={handleToggleLogout}
                    sx={{
                        marginRight: '10px',
                        ":after": {
                            backgroundColor: 'inherit',
                            color: 'inherit',
                        },
                        ":hover": {
                            backgroundColor: 'inherit',
                            color: 'inherit',
                        }
                    }}
                >{userInfo && (`Xin chào, ${userInfo.fname} ${userInfo.lname}`)}</Button>
            </header>
            <nav className='nav-mainpage'>
                <img className='logo' src={require('../../images/Logo_PTIT_University.png')} alt='logo' />
                <ul className='nav-menu'>
                    <Link to='/mainpage/homepage' style={{
                        color: 'inherit',
                        width: '100%',
                        textDecoration: 'none',
                    }}>
                        <li className={`nav-home ${headerText === 'Trang chủ' ? 'active' : ''}`} onClick={() => handleMenuClick('Trang chủ')}>
                            <FontAwesomeIcon className='icon-home' icon={faHouse} style={{ marginLeft: !isOpenNav ? '50px' : '20px' }} />
                            {!isOpenNav && <Typography className='home-text' variant='h6' fontSize='17px'
                                sx={{
                                    marginLeft: '10px'
                                }}
                            >Trang chủ</Typography>}</li>
                    </Link>
                    <li>
                        {(role === 'ROLE_LECTURER') &&
                            (<>
                                <div className='menu-tit' onClick={OpenMenuOne}>
                                    <FontAwesomeIcon icon={faCalendarDay} style={{ marginLeft: !isOpenNav ? '50px' : '20px' }} />
                                    {!isOpenNav && <Typography variant='h6' fontSize='17px' sx={{
                                        marginLeft: '10px',
                                        marginRight: '10px'
                                    }}>Xem thời khoá biểu</Typography>}
                                    {!isOpenNav && (menuOne ? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} />)}
                                </div><ul className={`nav-list ${(menuOne && !isOpenNav) ? 'show' : ''}`}>
                                    <li className={`${headerText === 'Xem lịch dạy' ? 'active' : ''}`} onClick={() => handleMenuClick('Xem lịch dạy')}>
                                        <Link to='/mainpage/timetable' style={{
                                            color: 'inherit',
                                            width: '100%',
                                            textDecoration: 'none',
                                        }}>
                                            <Typography className='text-li' sx={{
                                                marginLeft: '60px'
                                            }}>Xem lịch dạy</Typography>
                                        </Link>
                                    </li>
                                </ul>
                            </>)
                        }
                        {(role === 'ROLE_STUDENT') &&
                            (<>
                                <div className='menu-tit' onClick={OpenMenuOne}>
                                    <FontAwesomeIcon icon={faCalendarDay} style={{ marginLeft: !isOpenNav ? '50px' : '20px' }} />
                                    {!isOpenNav && <Typography variant='h6' fontSize='17px' sx={{
                                        marginLeft: '10px',
                                        marginRight: '10px'
                                    }}>Xem thời khoá biểu</Typography>}
                                    {!isOpenNav && (menuOne ? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} />)}
                                </div><ul className={`nav-list ${(menuOne && !isOpenNav) ? 'show' : ''}`}>
                                    <li className={`${headerText === 'Xem lịch học' ? 'active' : ''}`} onClick={() => handleMenuClick('Xem lịch học')}>
                                        <Link to='/mainpage/timetable' style={{
                                            color: 'inherit',
                                            width: '100%',
                                            textDecoration: 'none',
                                        }}>
                                            <Typography className='text-li' sx={{
                                                marginLeft: '60px'
                                            }}>Xem lịch học</Typography>
                                        </Link>
                                    </li>
                                </ul>
                            </>)
                        }
                        {(role === 'ROLE_OFFICER') &&
                            (<><div className='menu-tit' onClick={OpenMenuOne}>
                                <FontAwesomeIcon icon={faCalendarDay} style={{ marginLeft: !isOpenNav ? '50px' : '20px' }} />
                                {!isOpenNav && <Typography variant='h6' fontSize='17px' sx={{
                                    marginLeft: '10px',
                                    marginRight: '10px'
                                }}>Quản lý thời khoá biểu</Typography>}
                                {!isOpenNav && (menuOne ? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} />)}
                            </div><ul className={`nav-list ${(menuOne && !isOpenNav) ? 'show' : ''}`}>
                                    <li className={`${headerText === 'Quản lý khoá học' ? 'active' : ''}`} onClick={() => handleMenuClick('Quản lý khoá học')}>
                                        <Link to='/mainpage/course' style={{
                                            color: 'inherit',
                                            width: '100%',
                                            textDecoration: 'none',
                                        }}>
                                            <Typography className='text-li' sx={{
                                                marginLeft: '60px'
                                            }}>Quản lý khoá học</Typography>
                                        </Link>
                                    </li>
                                    <li className={`${headerText === 'Tạo thời khoá biểu' ? 'active' : ''}`} onClick={() => handleMenuClick('Tạo thời khoá biểu')}>
                                        <Link to='/mainpage/generate-schedule' style={{
                                            color: 'inherit',
                                            width: '100%',
                                            textDecoration: 'none',
                                        }}>
                                            <Typography className='text-li' sx={{
                                                marginLeft: '60px'
                                            }}>Tạo thời khoá biểu</Typography>
                                        </Link>
                                    </li>
                                    <li className={`${headerText === 'Xem thời khoá biểu' ? 'active' : ''}`} onClick={() => handleMenuClick('Xem thời khoá biểu')}>
                                        <Link to='/mainpage/timetable' style={{
                                            color: 'inherit',
                                            width: '100%',
                                            textDecoration: 'none',
                                        }}>
                                            <Typography className='text-li' sx={{
                                                marginLeft: '60px'
                                            }}>Xem thời khoá biểu</Typography>
                                        </Link>
                                    </li>
                                </ul></>)
                        }
                    </li>
                    <li>
                        {(role === 'ROLE_FACILITY') && (<><div className='menu-tit' onClick={OpenMenuTwo}>
                            <FontAwesomeIcon icon={faFilePen} style={{ marginLeft: !isOpenNav ? '50px' : '20px' }} />
                            {!isOpenNav && <Typography variant='h6' fontSize='17px' sx={{
                                marginLeft: '10px',
                                marginRight: '10px'
                            }}>Quản lý PH, GV, SV</Typography>}
                            {!isOpenNav && (menuTwo ? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} />)}
                        </div><ul className={`nav-list ${(menuTwo && !isOpenNav) ? 'show' : ''}`}>
                                <li className={`${headerText === 'Quản lý phòng học' ? 'active' : ''}`} onClick={() => handleMenuClick('Quản lý phòng học')}>
                                    <Link to='/mainpage/room' style={{
                                        color: 'inherit',
                                        width: '100%',
                                        textDecoration: 'none',
                                    }}>
                                        <Typography className='text-li' sx={{
                                            marginLeft: '60px'
                                        }}>Quản lý phòng học</Typography>
                                    </Link>
                                </li>
                            </ul></>)}
                        {(role === 'ROLE_OFFICER') && (<><div className='menu-tit' onClick={OpenMenuTwo}>
                            <FontAwesomeIcon icon={faFilePen} style={{ marginLeft: !isOpenNav ? '50px' : '20px' }} />
                            {!isOpenNav && <Typography variant='h6' fontSize='17px' sx={{
                                marginLeft: '10px',
                                marginRight: '10px'
                            }}>Quản lý PH, GV, SV</Typography>}
                            {!isOpenNav && (menuTwo ? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} />)}
                        </div><ul className={`nav-list ${(menuTwo && !isOpenNav) ? 'show' : ''}`}>
                                <li className={`${headerText === 'Quản lý giảng viên' ? 'active' : ''}`} onClick={() => handleMenuClick('Quản lý giảng viên')}>
                                    <Link to='/mainpage/instructor' style={{
                                        color: 'inherit',
                                        width: '100%',
                                        textDecoration: 'none',
                                    }}>
                                        <Typography className='text-li' sx={{
                                            marginLeft: '60px'
                                        }}>Quản lý giảng viên</Typography>
                                    </Link>
                                </li>
                                <li className={`${headerText === 'Quản lý sinh viên' ? 'active' : ''}`} onClick={() => handleMenuClick('Quản lý sinh viên')}>
                                    <Link to='/mainpage/student' style={{
                                        color: 'inherit',
                                        width: '100%',
                                        textDecoration: 'none',
                                    }}>
                                        <Typography className='text-li' sx={{
                                            marginLeft: '60px'
                                        }}>Quản lý sinh viên</Typography>
                                    </Link>
                                </li>
                                <li className={`${headerText === 'Chương trình đào tạo' ? 'active' : ''}`} onClick={() => handleMenuClick('Chương trình đào tạo')}>
                                    <Link to='/mainpage/tranning-program' style={{
                                        color: 'inherit',
                                        width: '100%',
                                        textDecoration: 'none',
                                    }}>
                                        <Typography className='text-li' sx={{
                                            marginLeft: '60px'
                                        }}>Chương trình đào tạo</Typography>
                                    </Link>
                                </li>
                            </ul></>)}
                    </li>
                </ul>
            </nav>
            <div className={`logout ${visible ? 'show' : ''}`}>
                <div className='logout-head'>
                    <img className='logout-img' src={require('../../images/phung.png')} alt='img' />
                    <Typography variant='h6' fontSize='20px' color='white' textTransform='uppercase'>{userInfo && (`${userInfo.fname} ${userInfo.lname}`)}</Typography>
                </div>
                <div className='logout-foot'>
                    <button className="Btn">
                        <div className="sign"><FontAwesomeIcon icon={faRightFromBracket} /></div>
                        <div className="text" onClick={logoutClick}>Đăng xuất</div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar