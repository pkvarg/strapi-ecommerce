import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { Button, TextField, Typography, Container } from '@mui/material'
import * as Yup from 'yup'

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

const PasswordUpdate = () => {
  const url = window.location.search.slice(6)
  console.log(url)

  const handleSubmit = (values, { resetForm }) => {
    // Handle form submission logic here
    console.log(values)
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

export default PasswordUpdate
