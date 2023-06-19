import { BrowserRouter as Router, Route, Redirect, Routes } from 'react-router-dom';
import HomePage from '../../page/HomePage';
import Navbar from '../common/Navbar'
import TimeTable from '../../page/TimeTable';
import DetailTimeTable from '../../page/DetailTimeTable';
import Room from '../../page/Room';
import Instructors from '../../page/Instructors';
import Student from '../../page/Student';
import Course from '../../page/Course';
import GenerateSchedule from '../../page/GenerateSchedule';

const RouteLayout = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path='/homepage' element={<HomePage />} />
                <Route path='/timetable' element={<TimeTable />} />
                <Route path='/timetable/detail/:id' element={<DetailTimeTable />} />
                <Route path='/room' element={<Room />} />
                <Route path='/instructor' element={<Instructors />} />
                <Route path='/student' element={<Student />} />
                <Route path='/course' element={<Course />} />
                <Route path='/generate-schedule' element={<GenerateSchedule/>}/>
            </Routes>
        </div>
    )
}

export default RouteLayout