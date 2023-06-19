import React, { useEffect, useState } from 'react'
import '../style/student.css'
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import studentApis from '../api/modules/student'
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import AddStudent from '../components/common/AddStudent';
import EditStudent from '../components/common/EditStudent';

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
    label: 'Mã SV'
  },
  {
    id: 'name',
    numberic: false,
    disablePadding: true,
    label: 'Tên SV'
  },
  {
    id: 'dob',
    numberic: false,
    disablePadding: true,
    label: 'Ngày sinh'
  },
  {
    id: 'address',
    numberic: false,
    disablePadding: true,
    label: 'Địa chỉ'
  },
  {
    id: 'phone',
    numberic: false,
    disablePadding: true,
    label: 'Số điện thoại'
  },
  {
    id: 'email',
    numberic: false,
    disablePadding: true,
    label: 'Email'
  },
  {
    id: 'gender',
    numberic: false,
    disablePadding: true,
    label: 'Giới tính'
  },
  {
    id: 'isDrop',
    numberic: false,
    disablePadding: true,
    label: 'Trạng thái'
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
                <Box component="span">
                  {order === 'desc' ? '' : ''}
                </Box>
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


const Student = () => {

  const [studentInfo, setStudentInfo] = useState([])
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - studentInfo.length) : 0;
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

  useEffect(() => {
    const getStudentInfo = async () => {
      const { response, err } = await studentApis.getAllStudents()
      if (response) {
        console.log(response)
        //const filteredData = response.filter(item => item.isDrop === false)
        setStudentInfo(response)
        setIsLoading(false)
      }
      if (err) {
        console.log(err)
      }
    }
    getStudentInfo()
  }, [showAddNew, isRequest, showEdit])

  const deleteStudent = async (id) => {
    console.log(id)
    const { response, err } = await studentApis.deleteStudentById(id)
    if (response) {
      toast.success("Xoá sinh viên thành công !")
      setIsRequest(!isRequest)
      setOpen(false)
    }
    if (err) {
      console.log(err)
      toast.success(err)
    }
  }


  return (
    <div className='main-student'>
      <button className="btn-add-student" onClick={() => handleAddNew()}>Thêm mới</button>
      <div className='student-table'>
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
                  rowCount={studentInfo.length}
                />
                <TableBody>
                  {stableSort(studentInfo, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.id)}
                          tabIndex={-1}
                          key={row.id}
                        >
                          <TableCell
                          >
                            {row.id}
                          </TableCell>
                          <TableCell >{`${row.fname} ${row.lname}`}</TableCell>
                          <TableCell >{row.dob}</TableCell>
                          <TableCell >{row.address}</TableCell>
                          <TableCell>{row.phone}</TableCell>
                          <TableCell>{row.email}</TableCell>
                          <TableCell>{row.gender ? 'Nữ' : 'Nam'}</TableCell>
                          <TableCell>{row.isDrop ? 'true' : 'false'}</TableCell>
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
                              onClick={() => handleEidt(row.id)}
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
                                onClick={() => handleClickOpen(row.id)}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </Button>
                              <Dialog
                                open={open}
                                onClose={handleClose}
                              >
                                <DialogTitle>Xoá Sinh Viên</DialogTitle>
                                <DialogContent>
                                  <DialogContentText>
                                    Bạn có muốn xoá SV này không
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={handleClose}>Cancel</Button>
                                  <Button
                                    onClick={() => deleteStudent(selectedId)}
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
          count={studentInfo.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
      {showAddNew && <AddStudent onClose={() => setShowAddNew(false)} />}
      {showEdit && <EditStudent id={selectedId} onClose={() => setShowEdit(false)} />}
    </div>
  )
}

export default Student