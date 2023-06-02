import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { Button, TextField, Typography, Container } from '@mui/material'
import * as Yup from 'yup'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Required'),
})

const initialValues = {
  newPassword: '',
  confirmPassword: '',
}

const ResetPassword = () => {
  const navigate = useNavigate()
  const code = window.location.search.slice(6)

  const handleSubmit = (values, { resetForm }) => {
    // Handle form submission logic here
    axios
      .post('https://pic-api.click/api/auth/reset-password', {
        code,
        password: values.newPassword,
        passwordConfirmation: values.confirmPassword,
      })
      .then((response) => {
        console.log(response)
        toast.success('Your password has been reset.')
        navigate('/login')
      })
      .catch((error) => {
        console.log('An error occurred:', error)
        toast.error(error.response)
      })
    //console.log(values)
    resetForm()
  }

  return (
    <>
      <Typography textAlign='center' marginTop='95px' fontSize='35px'>
        Your New Password
      </Typography>
      <Container maxWidth='sm'>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div>
                <Field
                  as={TextField}
                  type='password'
                  name='newPassword'
                  label='New Password'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  helperText={
                    <ErrorMessage name='newPassword' component='div' />
                  }
                />
              </div>
              <div>
                <Field
                  as={TextField}
                  type='password'
                  name='confirmPassword'
                  label='Confirm Password'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  helperText={
                    <ErrorMessage name='confirmPassword' component='div' />
                  }
                />
              </div>
              <div>
                <Button type='submit' variant='contained' color='primary'>
                  Update Password
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  )
}

export default ResetPassword
