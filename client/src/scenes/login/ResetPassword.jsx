import React from 'react'
import { useFormik } from 'formik'
import { Typography, TextField, Button, Container, Box } from '@mui/material'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const ResetPassword = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: (values) => {
      console.log(values.email)
      // Request API.
      axios
        .post('https://pic-api.click/api/auth/forgot-password', {
          email: values.email, // user's email
        })
        .then((response) => {
          console.log(response)
          console.log('Your user received an email')
          toast.success('An email has been sent to you')
        })
        .catch((error) => {
          console.log('An error occurred:', error)
          toast.error(error.response)
        })
      // Handle form submission (e.g., send reset password email)
      //console.log(values.email)
    },
  })

  return (
    <>
      <Typography textAlign='center' marginTop='95px' fontSize='35px'>
        Reset Your Password
      </Typography>
      <Container maxWidth='sm'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '5vh',
          }}
        >
          <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
            <TextField
              id='email'
              name='email'
              label='Your Email'
              type='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              fullWidth
            />

            <Box sx={{ marginTop: '1rem' }}>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                fullWidth
                sx={{ fontSize: '20px' }}
              >
                Reset Password
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  )
}

export default ResetPassword
