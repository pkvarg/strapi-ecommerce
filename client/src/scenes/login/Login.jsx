import React from 'react'
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
            />
            <FieldContainer
              as={TextField}
              name='password'
              type='password'
              label='Password'
              variant='outlined'
              fullWidth
            />
            <SubmitButton
              variant='contained'
              color='primary'
              disabled={isSubmitting}
              onClick={submitForm}
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
