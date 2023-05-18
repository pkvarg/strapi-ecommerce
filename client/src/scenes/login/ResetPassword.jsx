import React from 'react'
import { useFormik } from 'formik'
import { Typography, TextField, Button, Container, Box } from '@mui/material'

const ResetPassword = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: (values) => {
      // Handle form submission (e.g., send reset password email)
      console.log(values.email)
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
