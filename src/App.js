import './App.css';
import Loader from './components/common/Loader';
import { Route, Routes } from "react-router-dom";
import Navbar from './components/common/Navbar';
import { Suspense } from 'react';

import Error from './pages/Error';

// Pages
import Home from './pages/Home'
import Signup from './pages/Signup';
import Login from './pages/Login';
import Contact from './pages/Contact';
import About from './pages/About';
import Catalog from './pages/Catalog';
import CourseDetails from './pages/CourseDetails';

// Auth routes
import OpenRoute from './components/core/Auth/OpenRoute';
import PrivateRoute from './components/core/Auth/PrivateRoute';


// profile or profile sidebar
import Cart from './components/core/Dashboard/Cart/index'

import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import VerifyEmail from './pages/VerifyEmail';
import MyProfile from './components/core/Dashboard/MyProfile';
import Dashboard from './pages/Dashboard';
import Settings from './components/core/Dashboard/Settings';
import EnrolledCourses from './components/core/Dashboard/Student/EnrolledCourses';
import MyCourses from './components/core/Dashboard/Instructor/MyCourse/MyCourses';

import { ACCOUNT_TYPE } from './utils/constants';
import { useSelector } from 'react-redux';

import AddCourse from './components/core/Dashboard/Instructor/AddCourse';
import EditCourse from './components/core/Dashboard/Instructor/Index';
import ViewCourse from './pages/ViewCourse';
import VideoDetails from './components/core/ViewCourse/VideoDetails'
import NavbarAll from './components/common/NavbarAll';
import Nav from './components/common/Navbar';
import Instructor from './components/core/Dashboard/Instructor/InstructorDashboard/Instructor';


function App() {

  const { user } = useSelector((state) => state.profile)

  return (
    <div className='w-screen min-h-screen max-w-[100vw] bg-richblack-900 flex flex-col font-inter'>

      {/* Loding bar */}


      {/* Navbar    */}
      <Nav />
      {/* <NavbarAll/> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="*" element={<Error />} />
        <Route path='about' element={<About />} />
        <Route path='contact' element={<Contact />} />
        <Route path='/catalog/:catalogName' element={<Catalog />} />
        <Route path='courses/:courseId' element={<CourseDetails />} />


        <Route path='signup'
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route path='login'
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route path='forgot-password'
          element={
            <OpenRoute>
              <Suspense fallback={<Loader />}>
                <ForgotPassword />
              </Suspense>
            </OpenRoute>
          }
        />

        <Route path='update-password/:id'
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />

        <Route path='verify-email'
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          {/* Nested Routing */}
          <Route path='dashboard/my-profile' element={<MyProfile />} />
          <Route path='dashboard/settings' element={<Settings />} />

          {(user?.account_Type === ACCOUNT_TYPE.STUDENT ||
            ACCOUNT_TYPE.ADMIN) &&
            (
              <>
                <Route path='dashboard/cart' element={<Cart />} />
                <Route path='dashboard/enrolled-courses' element={<EnrolledCourses />} />
              </>
            )}
          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
            <Route path='dashboard/instructor' element={<Instructor />} />
              <Route path="dashboard/my-courses" element={<MyCourses />} />
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route
                path="dashboard/edit-course/:courseId"
                element={<EditCourse />}
              />
            </>
          )}

        </Route>

        <Route element={
          <PrivateRoute>
            <ViewCourse />
          </PrivateRoute>
        }>
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
            </>
          )}
        </Route>


      </Routes>
    </div>
  );
}

export default App;
