import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Badge, Box, IconButton } from '@mui/material'
import {
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined,
  Logout,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { shades } from '../../theme'
import { setIsCartOpen } from '../../state'
import { toast } from 'react-hot-toast'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart.cart)
  const [isLogged, setIsLogged] = useState(false)
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  useEffect(() => {
    if (userInfo) {
      setIsLogged(true)
    }
  }, [userInfo])

  const logout = () => {
    setIsLogged(false)
    localStorage.removeItem('userInfo')
    toast.success('Logged out.')
    navigate('/')
  }

  return (
    <Box
      display='flex'
      alignItems='center'
      width='100%'
      height='60px'
      backgroundColor='rgba(255,255,255,0.95)'
      color='black'
      position='fixed'
      top='0'
      zIndex='1'
    >
      <Box
        width='80%'
        margin='auto'
        display='flex'
        justifyContent='space-between'
        alignItems='center'
      >
        <Box
          onClick={() => navigate('/')}
          sx={{ '&:hover': { cursor: 'pointer' } }}
          color={shades.secondary[500]}
        >
          ECOMMERCE
        </Box>
        <Box
          display='flex'
          justifyContent='space-between'
          columnGap='20px'
          zIndex='2'
        >
          <IconButton sx={{ color: 'black' }}>
            <SearchOutlined />
          </IconButton>
          {isLogged ? (
            <>
              <p>{userInfo.email}</p>
              <IconButton onClick={logout} sx={{ color: 'black' }}>
                <Logout />
              </IconButton>
            </>
          ) : (
            <IconButton
              onClick={() => navigate('/login')}
              sx={{ color: 'black' }}
            >
              <PersonOutline />
            </IconButton>
          )}

          <Badge
            badgeContent={cart.length}
            color='secondary'
            invisible={cart.length === 0}
            sx={{
              '& .MuiBadge-badge': {
                right: 5,
                top: 5,
                padding: '0 4px',
                height: '14px',
                minWidth: '13px',
              },
            }}
          >
            <IconButton
              onClick={() => dispatch(setIsCartOpen({}))}
              sx={{ color: 'black' }}
            >
              <ShoppingBagOutlined />
            </IconButton>
          </Badge>
          <IconButton sx={{ color: 'black' }}>
            <MenuOutlined />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

export default Navbar
