import React, { useState } from 'react'
import {Table, Spinner } from "react-bootstrap"
import LoadingPage from '../../components/LoadingPage';
import { Modal,Button } from 'react-bootstrap';
import UpdateUser from './UpdateUser';
// import './App.css'


export default function UserDataLists(props) {
  const {users, isLoading, handleUpdateUser } = props;
  const [openEdit, setDpenEdit] = useState (false)
  const [prepareDataEdit, setPrepareDataEdit] = useState({})

  const onCloseModal = () => {
    setDpenEdit(false)
  }

  const handleCreateProduct = (item) => {
    setPrepareDataEdit(item)
    setDpenEdit(true)
  }
  
  if (isLoading) return<LoadingPage/>

  return (
   <React.Fragment>
     <Table hover>
        <thead>
            <tr>
                <th>#</th>
                <th>image</th>
                <th>First Name</th>
                <th>Last Nane</th>
                <th>Username</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
        {users.map((item, index) => (
          <tr key={index}>
            <td>{index}</td>
            <td>
              <img style={{maxWidth: 50}} alt={item?.fname} src={item?.avatar}/>
            </td>
            <td>{item?.fname}</td>
            <td>{item?.lname?? 0}</td>
            <td>{item?.username}</td>
            <td>
                <div  className='d-flex btn-hide gap-2'>
                  <Button onClick={() => handleCreateProduct(item)} variant='outline-info'>Edit</Button>
                  <Button onClick={() => handleUpdateUser(item) } variant='outline-danger'>Del</Button>
                </div>

            </td>

          </tr>
        ))}
       

        </tbody>
    </Table>
    <Modal show={openEdit} onHide={onCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Update User</Modal.Title>
          </Modal.Header>
          <Modal.Body >

          <UpdateUser prepareDataEdit={prepareDataEdit} onCloseModal={onCloseModal}/>
          </Modal.Body>

        </Modal>

   </React.Fragment>
  )
}
