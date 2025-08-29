import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/login';
import Home from './components/home';
import Register from './components/register';
import Test from './components/textPage';
import Subject from './components/subject';
import About from './components/about';
import Course from './components/course';
import Video from './courseComponent/CourseVideo';
import BackendCourseComponent from './courseComponent/CourseListComponet';
import AdminLoginPage from './AdminComponents/AdminLoginPage';
import AdminHomePage from './AdminComponents/AdminHomePage';
import SubjectData from './subjectComponent/subjectData';
import Subjectlist from './subjectComponent/subjectlist';
import UsersAdmin from './AdminComponents/AdminUsers';
import SubjectAdmin from './AdminComponents/SubjectAdmin';
import CourseAdmin from './AdminComponents/CourseAdmin';
import Maintance from './components/maintance';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/signUp" element={<Register />} />


        <Route path="/home/*" element={<Home />}>
        <Route index element={<Test />}/>



        <Route path="subject/*" element={<Subject />} >
        <Route path='subjectlist/' element={<Subjectlist/>}/>
         <Route index element={<Subjectlist/>}/>
        <Route path='Subjectdata/:id' element={<SubjectData/>}/>
        </Route>



      
        <Route path="course/*" element={<Course/>}>
        <Route path='courselist/' element={<BackendCourseComponent/>}/>
        <Route index element={<BackendCourseComponent/>}/>
        <Route path='video/:id' element={<Video/>}/>
        </Route>



       
        <Route path="about" element={<About/>} />
        </Route>


      
        <Route path='adminlogin' element={<AdminLoginPage/>} />
      <Route path='adminhome/*' element={<AdminHomePage/>}>
        <Route index element={<UsersAdmin/>}/>
        <Route path='adminsub' element={<SubjectAdmin/>} />
        <Route path='admincourse' element={<CourseAdmin/>} /> 
        </Route>
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
