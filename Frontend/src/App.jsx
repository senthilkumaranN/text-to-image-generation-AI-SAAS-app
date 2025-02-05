import  { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Credit from './Pages/Credit'
import Result from './Pages/Result'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Login from './Components/Login'
import { AppContext } from './Context/AppContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { showLogin } = useContext(AppContext)
  return (
    <div className='min-h-screen px-4 sm:px-10 md:px-14 lg:px-28 bg-gradient-to-b from-teal-50 to-orange-50'>
      <ToastContainer position='bottom-right'/>
      <Navbar />
      {showLogin && <Login />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/credit' element={<Credit />} />
        <Route path='/result' element={<Result />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App