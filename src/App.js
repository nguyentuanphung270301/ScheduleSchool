import { BrowserRouter as Router, Route, Redirect, Routes } from 'react-router-dom';
import StartPage from './page/StartPage'
import LoginForm from './page/LoginForm'
import RouteLayout from './components/layout/RouteLayout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<StartPage />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/mainpage/*' element={<RouteLayout/>}/>
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;

//ROLE_LECTURER : cothao/12345
//ROLE_OFFICER : brucelee/12345
//ROLE_STUDENT: tuanphung/12345
//ROLE_FACILITY: jackiechan/12345