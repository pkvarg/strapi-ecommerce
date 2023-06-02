import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from './scenes/home/Home'
import ItemDetails from './scenes/itemDetails/ItemDetails'
import Checkout from './scenes/checkout/Checkout'
import Confirmation from './scenes/checkout/Confirmation'
import Navbar from './scenes/global/Navbar'
import CartMenu from './scenes/global/CartMenu'
import Footer from './scenes/global/Footer'
import Login from './scenes/login/Login'
import SignUp from './scenes/login/SignUp'
import ForgotPassword from './scenes/login/ForgotPassword'
import ResetPassword from './scenes/login/ResetPassword'
import ChangePassword from './scenes/login/ChangePassword'
import { firebaseConfig } from './firebaseConfig'
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'
import { Toaster } from 'react-hot-toast'

export const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()

const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/item/:itemId' element={<ItemDetails />}></Route>
          <Route path='/checkout' element={<Checkout />}></Route>
          <Route path='/checkout/success' element={<Confirmation />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/sign-up' element={<SignUp />}></Route>
          <Route path='/forgot-password' element={<ForgotPassword />}></Route>
          <Route path='/reset-password' element={<ResetPassword />}></Route>
          <Route path='/change-password' element={<ChangePassword />}></Route>
        </Routes>
        <CartMenu />
        <Toaster />
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
