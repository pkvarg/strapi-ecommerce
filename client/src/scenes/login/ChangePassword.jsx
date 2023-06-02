import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { Button, TextField, Typography, Container } from '@mui/material'
import * as Yup from 'yup'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Required'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Required'),
})

const initialValues = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
}

const ChangePassword = () => {
  const navigate = useNavigate()
  const authToken = JSON.parse(localStorage.getItem('userInfo')).token

  const handleSubmit = (values, { resetForm }) => {
    // Handle form submission logic here
    console.log(values)
    axios
      .post(
        'https://pic-api.click/api/auth/change-password',
        {
          currentPassword: values.currentPassword,
          password: values.newPassword,
          passwordConfirmation: values.confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response)
        toast.success('Your password has been changed.')
        //localStorage.removeItem('userInfo')
        window.location.reload(false)
        navigate('/login')
      })
      .catch((error) => {
        console.log('An error occurred:', error.response.data.error.message)
        toast.error(error.response.data.error.message)
        //toast.error(error.response)
      })
    console.log(values)
    resetForm()
  }

  return (
    <>
      <Typography textAlign='center' marginTop='95px' fontSize='35px'>
        Change Your Password
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
                  name='currentPassword'
                  label='Current Password'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  helperText={
                    <ErrorMessage name='currentPassword' component='div' />
                  }
                />
              </div>
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
                  Change Password
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  )
}

export default ChangePassword
