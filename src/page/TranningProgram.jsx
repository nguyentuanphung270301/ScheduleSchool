import React, { useEffect, useState } from 'react'
import '../style/tranningprogram.css'
import PropTypes from 'prop-types';
import tranningProgramApis from '../api/modules/tranningProgram'
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel } from '@mui/material';
import { AddBox } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddTrainningProgram from '../components/common/AddTrainningProgram';
import EditTrainningProgram from '../components/common/EditTrainningProgram';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'id',
        numberic: true,
        disablePadding: true,
        label: 'Mã'
    },
    {
        id: 'department',
        numberic: false,
        disablePadding: true,
        label: 'Khoa'
    },
    {
        id: 'number',
        numberic: false,
        disablePadding: true,
        label: 'Mã môn'
    },
    {
        id: 'name',
        numberic: false,
        disablePadding: true,
        label: 'Tên môn'
    },
    {
        id: 'instructor',
        numberic: false,
        disablePadding: true,
        label: 'Giảng viên'
    },
    {
        id: 'action',
        numberic: false,
        disablePadding: true,
        label: 'Hành động'
    },
]


function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow sx={{ backgroundColor: '#54afff' }}>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        sortDirection={orderBy === headCell.id ? order : false}
                        sx={{
                            fontSize: '16px',
                            fontweight: '600'
                        }}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <AddBox component="span">
                                    {order === 'desc' ? '' : ''}
                                </AddBox>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};


const TranningProgram = () => {

    const [major, setMajor] = useState('CNTT')
    const [courseInfo, setCourseInfo] = useState([])
    const [open, setOpen] = useState(false);
    const [isRequest, setIsRequest] = useState(false)
    const [showAddNew, setShowAddNew] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [showEdit, setShowEdit] = useState(false)
    const [selectedId, setSelectedId] = useState(null);


    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - courseInfo.length) : 0;
    const handleClickOpen = (id) => {
        setSelectedId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setSelectedId(null);
        setOpen(false);
    };

    const handleAddNew = () => {
        setShowAddNew(true)
    }

    const handleEidt = (id) => {
        setSelectedId(id)
        setShowEdit(true)
    }

    const deleteTrainningProgram = async (id) => {
        console.log(id)
        const { response, err } = await tranningProgramApis.deleteCourseFromTrainingProgram(major,id)
        if (response) {
            toast.success("Xoá CTDT thành công !")
            setIsRequest(!isRequest)
            setOpen(false)
        }
        if (err) {
            console.log(err)
            toast.success(err)
        }
    }

    useEffect(() => {
        const getTranningByMajor = async () => {
            const { response, err } = await tranningProgramApis.getAllCourseByMajor(major)
            if (response) {
                console.log(response)
                setCourseInfo(response)
                setIsLoading(false)
            }
            if (err) {
                console.log(err)
            }
        }
        getTranningByMajor()
    }, [major, showAddNew, isRequest, showEdit])


    return (
        <div className='main-tranning-program'>
            <button className='btn-add-tranning-program' onClick={() => handleAddNew()}>Thêm mới</button>
            <select className='cbx-major' value={major} onChange={(e) => setMajor(e.target.value)} >
                <option value='CNTT' >CNTT</option>
                <option value='ATTT'>ATTT</option>
                <option value='DT'>DT</option>
                <option value='QKTD'>QKTD</option>
                <option value='KT'>KT</option>
            </select>
            <div className='tranning-table'>
                {isLoading && <CircularProgress sx={{
                    position: 'absolute',
                    top: '200px',
                    right: 'calc(100% / 2)'
                }} />}
                {!isLoading && (
                    <>
                        <TableContainer component={Paper} sx={{ height: '550px', }}>
                            <Table sx={{ minWidth: 650 }} aria-labelledby="tableTitle"
                            >
                                <EnhancedTableHead
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={handleRequestSort}
                                    rowCount={courseInfo.length}
                                />
                                <TableBody>
                                    {stableSort(courseInfo, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            return (
                                                <TableRow
                                                    hover
                                                    onClick={(event) => handleClick(event, row.id)}
                                                    tabIndex={-1}
                                                    key={row.id}
                                                >
                                                    <TableCell>{row.id}</TableCell>
                                                    <TableCell>{row.course.department.name}</TableCell>
                                                    <TableCell>{row.course.number}</TableCell>
                                                    <TableCell>{row.course.name}</TableCell>
                                                    <TableCell sx={{
                                                    }}>
                                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                            {row.course.instructorCourses.map((row) => (
                                                                <span>{row.instructor.fname + " " + row.instructor.lname}</span>
                                                            ))}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell sx={{
                                                        display: 'flex',
                                                        justifyItems: 'center',
                                                    }}>
                                                        <Button
                                                            variant='contained'
                                                            sx={{
                                                                marginRight: '10px',
                                                                height: '40px'
                                                            }}
                                                            onClick={() => handleEidt(row.course.number)}
                                                        ><FontAwesomeIcon icon={faPenToSquare} /></Button>
                                                        <Box>
                                                            <Button
                                                                variant='contained'
                                                                sx={{
                                                                    backgroundColor: 'red',
                                                                    height: '40px',
                                                                    ":hover": {
                                                                        backgroundColor: 'red',
                                                                        opacity: 0.8
                                                                    }
                                                                }}
                                                                onClick={() => handleClickOpen(row.course.number)}
                                                            >
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </Button>
                                                            <Dialog
                                                                open={open}
                                                                onClose={handleClose}
                                                            >
                                                                <DialogTitle>Xoá Chương Trình Đào Tạo</DialogTitle>
                                                                <DialogContent>
                                                                    <DialogContentText>
                                                                        Bạn có muốn xoá CTDT này không
                                                                    </DialogContentText>
                                                                </DialogContent>
                                                                <DialogActions>
                                                                    <Button onClick={handleClose}>Cancel</Button>
                                                                    <Button
                                                                        onClick={() => deleteTrainningProgram(selectedId)}
                                                                        sx={{
                                                                            backgroundColor: 'white',
                                                                            ":hover": {
                                                                                backgroundColor: 'red',
                                                                                opacity: 0.8
                                                                            }
                                                                        }}
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                                </DialogActions>
                                                            </Dialog>
                                                        </Box>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    {emptyRows > 0 && (
                                        <TableRow
                                        >
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                )}
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={courseInfo.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
            {showAddNew && <AddTrainningProgram onClose={() => setShowAddNew(false)} />}
            {showEdit && <EditTrainningProgram onClose={() =>  setShowEdit(false)} oldCourseNumber={selectedId} oldMajor={major}/>}
        </div>
    )
}

export default TranningProgram