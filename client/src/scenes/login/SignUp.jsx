import React, { useState } from 'react'
import axios from 'axios'
import { Formik, Form, Field } from 'formik'
import { TextField, Button } from '@mui/material'
import { styled } from '@mui/material/styles'

const FormContainer = styled(Form)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  mx: '10%',
})

const FieldContainer = styled(Field)({
  marginBottom: '20px',
})

const SubmitButton = styled(Button)({
  marginTop: '20px',
})

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const submitFormular = async () => {
    //event.preventDefault();
    try {
      const response = await axios.post(
        'https://pic-api.click/api/auth/local/register',
        {
          username: formData.name,
          email: formData.email,
          password: formData.password,
        }
      )
      console.log(response.data)
      // redirect user to success page or login page
    } catch (error) {
      console.log(error)
      // display error message to user
    }
  }

  const handleInputChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  }

  console.log(formData)

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validate={(values) => {
        const errors = {}
        if (!values.name) {
          errors.name = 'Required'
        }
        if (!values.email) {
          errors.email = 'Required'
        }
        if (!values.password) {
          errors.password = 'Required'
        }
        if (!values.confirmPassword) {
          errors.confirmPassword = 'Required'
        } else if (values.password !== values.confirmPassword) {
          errors.confirmPassword = 'Passwords do not match'
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
          <FieldContainer
            as={TextField}
            name='name'
            type='text'
            label='Name'
            variant='outlined'
            fullWidth
            onChange={handleInputChange}
          />
          <FieldContainer
            as={TextField}
            name='email'
            type='email'
            label='Email'
            variant='outlined'
            fullWidth
            onChange={handleInputChange}
          />
          <FieldContainer
            as={TextField}
            name='password'
            type='password'
            label='Password'
            variant='outlined'
            fullWidth
            onChange={handleInputChange}
          />
          <FieldContainer
            as={TextField}
            name='confirmPassword'
            type='password'
            label='Confirm Password'
            variant='outlined'
            fullWidth
          />
          <SubmitButton
            variant='contained'
            color='primary'
            disabled={isSubmitting}
            onClick={() => submitFormular()}
            sx={{ mt: 3 }}
          >
            {isSubmitting ? 'Signing up...' : 'Sign up'}
          </SubmitButton>
        </FormContainer>
      )}
    </Formik>
  )
}

export default SignUp
