import { BrowserRouter as Router, Route, Redirect, Routes } from 'react-router-dom';
import HomePage from '../../page/HomePage';
import Navbar from '../common/Navbar'
import TimeTable from '../../page/TimeTable';
import DetailTimeTable from '../../page/DetailTimeTable';
import Room from '../../page/Room';

const RouteLayout = () => {
    return (
        <div>
        <Navbar/>
            <Routes>
                <Route path='/homepage' element={<HomePage/>} />
                <Route path='/timetable' element={<TimeTable/>}/>
                <Route path='/timetable/detail/:id'  element={<DetailTimeTable/>}/>
                <Route path='/room' element={<Room/>}/>
            </Routes>
        </div>
    )
}

export default RouteLayout