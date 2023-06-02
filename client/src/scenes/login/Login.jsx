import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Typography } from '@mui/material'
import { Formik, Form, Field } from 'formik'
import { Link, Box, TextField } from '@mui/material'
import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { auth, provider } from './../../App'
import { signInWithPopup } from 'firebase/auth'
import { GoogleButton } from 'react-google-button'
import { toast } from 'react-hot-toast'

const FormContainer = styled(Form)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
})

const FieldContainer = styled(Field)({
  marginBottom: '20px',
  mx: '10%',
})

const SubmitButton = styled(Button)({
  marginTop: '20px',
})

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [googleUser, setGoogleUser] = useState({})

  const handleLogin = async () => {
    //e.preventDefault()
    try {
      const response = await axios.post(
        'https://pic-api.click/api/auth/local',
        {
          identifier: email,
          password: password,
        }
      )

      // Do something with the response data, like store a JWT token
      const token = response.data.jwt
      const userInfo = {
        name: response.data.user.username,
        email: response.data.user.email,
        createdAt: response.data.user.createdAt,
        isAdmin: false,
        token,
      }
      if (token) {
        toast.success('Logged in')
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        navigate('/')
      }
    } catch (error) {
      toast.error(error.response.data.error.message)
    }
  }

  // Google Firebase
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      let userObject = result.user
      const token = userObject.accessToken
      setGoogleUser(userObject)
      const data = {
        name: userObject.displayName,
        email: userObject.email,
        createdAt: userObject.metadata.creationTime,
        isAdmin: false,
        token,
      }
      if (token) {
        localStorage.setItem('userInfo', JSON.stringify(data))
        navigate('/')
        toast.success('Logged in')
      }
      //dispatch(getGoogleUserInfo(data))
    })
  }

  const handleGoogleSignIn = () => {
    try {
      signInWithGoogle()
    } catch (error) {
      console.log(error)
      toast.error(error.message, 'Login Error')
    }
  }

  return (
    <>
      <div style={{ marginTop: '-125px' }}>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={(values) => {
            const errors = {}
            if (!values.email) {
              errors.email = 'Required'
            }
            if (!values.password) {
              errors.password = 'Required'
            }
            return errors
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2))
              setSubmitting(false)
            }, 400)
          }}
        >
          {({ submitForm, isSubmitting }) => (
            <FormContainer sx={{ mx: '10%' }}>
              <Box marginBottom='50px' fontSize='30px'>
                Login
              </Box>
              <FieldContainer
                as={TextField}
                name='email'
                type='email'
                label='Email'
                variant='outlined'
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
              />
              <FieldContainer
                as={TextField}
                name='password'
                type='password'
                label='Password'
                variant='outlined'
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
              />
              <SubmitButton
                variant='contained'
                color='primary'
                disabled={isSubmitting}
                onClick={() => handleLogin()}
                sx={{ mt: 3, fontSize: '20px' }}
              >
                {isSubmitting ? 'Logging in...' : 'Log in'}
              </SubmitButton>
            </FormContainer>
          )}
        </Formik>
      </div>
      <div style={{ marginTop: '-125px' }}>
        <Box display='flex' flexDirection='column' align='center' gap='15px'>
          <Link
            href='/reset-password'
            sx={{ align: 'center', cursor: 'pointer' }}
          >
            Forgot password?
          </Link>
          <Typography fontSize='20px'>Sign in with Google</Typography>
          <div>
            <GoogleButton onClick={() => handleGoogleSignIn()} />
          </div>
          <Link href='/sign-up' sx={{ align: 'center', cursor: 'pointer' }}>
            New customer? Register.
          </Link>
        </Box>
      </div>
    </>
  )
}

export default Login
