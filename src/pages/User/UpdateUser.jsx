import React, {useEffect, useState} from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { END_POINT_SERVER } from '../../config/api';
import axios from 'axios';
import Swal from "sweetalert2"



export default function UpdateUser({prepareDataEdit, onCloseModal}) {
  const [isLoadingCreate, setIsLoadingCreate] = useState(false)
  const [ userId, setUserId] = useState()

  useEffect(()=>{
    if(prepareDataEdit){
        setUserId(prepareDataEdit?.id)
    }
  },[prepareDataEdit])


  const handleUpdateUser = async (values) => {
    try{

      setIsLoadingCreate(true)

     const response = await axios.put(END_POINT_SERVER + "users/update",{
        id: userId,
        fname: values?.fname,
        lname: values?.lname
      });
        if (response?.status === 200){
          // Swal.fire({
          //   title: "SuccessFully",
          //   text: "Create New Products Success",
          //   icon: "success",
          //   showCancelButton: false,
          //   timer: 5000
          // });
          setIsLoadingCreate(false)
          onCloseModal()
        }
      

    }catch (error){
      console.log(error)
    }
  }


  return (
    <Formik
      initialValues={{
        fname:prepareDataEdit?.fname,
        lname: prepareDataEdit?.lname,
        avatar: prepareDataEdit?.avatar,
        username: prepareDataEdit?.username,
        email: prepareDataEdit?.email,
        password: prepareDataEdit?.password,
      }}
      onSubmit={(values) => {
        handleUpdateUser(values);
      }}
    >
      {({ handleSubmit, handleChange, values, errors, touched }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="fname">
            <Form.Label>fname</Form.Label>
            <Form.Control
              type="text"
              name="fname"
              value={values.fname}
              onChange={handleChange}
              isInvalid={touched.fname && !!errors.fname}
              placeholder="Enter fname"
            />
            <Form.Control.Feedback type="invalid">
              {errors.fname}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="lname">
            <Form.Label>lname</Form.Label>
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
            <Form.Label>avatar</Form.Label>
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
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={values.username}
              onChange={handleChange}
              isInvalid={touched.username && !!errors.username}
              placeholder="Enter username"
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>password</Form.Label>
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
            <Button variant='outline-secondary' type="button">
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