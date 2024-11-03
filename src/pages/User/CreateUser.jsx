import React, {useState} from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { END_POINT_SERVER } from '../../config/api';
import axios from 'axios';
import Swal from "sweetalert2"
import { useNavigate } from 'react-router-dom';

// Define validation schema using Yup
const validationSchema = Yup.object({
  fname: Yup.string().required('fName is required'),
  lname: Yup.string().required('lname is required'),
  avatar: Yup.string().required('avatar is required'),
  password: Yup.string().required('Category is required'),
  username: Yup.string().required('username is required'),
  email: Yup.string().required('username is required')
});

export default function CreateUser({onCloseModal, fetchUserDatas}) {
  const [isLoadingCreate, setIsLoadingCreate] = useState(false)

  const Navigate = useNavigate()


  const handleCreateUser = async (values) => {
    try{

      setIsLoadingCreate(true)

      await axios.post(END_POINT_SERVER + "users/create", values)
        // fname: values?.fname,
        // lname: values?.lname,
        // username: values?.username,
        // avatar: values?.avatar,
        // email: values?.email,
        // password: values?.password,
      // })
      .then(response => {
        if (response?.status === 200){
         
          setIsLoadingCreate(false)
          onCloseModal()
          fetchUserDatas()
        }
      })

    }catch (error){
      console.log(error)
    }
  }
  return (
    <Formik
      initialValues={{
        fname: '',
        lname: '',
        avatar: '',
        password: '',
        email: '',
        username: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleCreateUser(values);
      }}
    >
      {({ handleSubmit, handleChange, values, errors, touched }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="fname">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="fname"
              value={values.fname}
              onChange={handleChange}
              isInvalid={touched.fname && !!errors.fname}
              placeholder="Enter product name"
            />
            <Form.Control.Feedback type="invalid">
              {errors.fname}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="lname">
            <Form.Label>Last lname</Form.Label>
            <Form.Control
              type="text"
              name="lname"
              value={values.lname}
              onChange={handleChange}
              isInvalid={touched.lname && !!errors.lname}
              placeholder="Enter lname"
            />
            <Form.Control.Feedback type="invalid">
              {errors.lname}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="avatar">
            <Form.Label>Avatar</Form.Label>
            <Form.Control
              type="text"
              name="avatar"
              value={values.avatar}
              onChange={handleChange}
              isInvalid={touched.avatar && !!errors.avatar}
              placeholder="Enter avatar URL"
            />
            <Form.Control.Feedback type="invalid">
              {errors.avatar}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={values.email}
              onChange={handleChange}
              isInvalid={touched.email && !!errors.email}
              placeholder="Enter email"
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="username">
            <Form.Label>username</Form.Label>
            <Form.Control
              
              name="username"
              value={values.username}
              onChange={handleChange}
              isInvalid={touched.username && !!errors.username}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              name="password"
              value={values.password}
              onChange={handleChange}
              isInvalid={touched.password && !!errors.password}
              placeholder="Enter password"
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <br />
          <div className='d-flex w-100 gap-2'>
            <Button variant='outline-secondary' type="button" onClick={() => Navigate("/user")}>
              Close
            </Button>
            <Button disabled={isLoadingCreate ? true : false } variant='primary' type="submit">
             {isLoadingCreate ? <><Spinner size='sm' />creating...</>:"create"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}