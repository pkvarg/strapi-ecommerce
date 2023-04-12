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
        </Routes>
        <CartMenu />
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
