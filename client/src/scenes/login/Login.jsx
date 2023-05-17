import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'
import { Typography } from '@mui/material'
import { Formik, Form, Field } from 'formik'
import { Link, Box, TextField } from '@mui/material'
import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'

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
  const handleLogin = async (e) => {
    //e.preventDefault()

    try {
      const response = await axios.post(
        'https://pic-api.click/api/auth/local',
        {
          identifier: email,
          password: password,
        }
      )

      console.log(response.data) // Do something with the response data, like store a JWT token
      const token = response.data.jwt
      const userInfo = {
        name: response.data.user.username,
        email: response.data.user.email,
        createdAt: response.data.user.createdAt,
        token,
      }
      if (token) {
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        navigate('/')
      }
    } catch (error) {
      console.log(error.response.data) // Handle the error response
    }
  }

  return (
    <>
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
            <Box marginBottom='50px'>Login</Box>
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
              sx={{ mt: 3 }}
            >
              {isSubmitting ? 'Logging in...' : 'Log in'}
            </SubmitButton>
          </FormContainer>
        )}
      </Formik>
      <Box display='flex' flexDirection='column' align='center' gap='15px'>
        <Link href='/' sx={{ align: 'center', cursor: 'pointer' }}>
          Forgot password?
        </Link>
        <Typography fontSize='20px'>Sign in with Google</Typography>
        <Link href='/sign-up' sx={{ align: 'center', cursor: 'pointer' }}>
          New customer? Register.
        </Link>
      </Box>
    </>
  )
}

export default Login
