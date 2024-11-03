import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { END_POINT_SERVER } from '../../config/api'
import { Button, Modal } from 'react-bootstrap'
import AddProduct from './CreateUser'
import UserDataLists from './UserDataLists'
import Swal from "sweetalert2"
import { useNavigate } from 'react-router-dom'


export default function usersPage() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const Navigate = useNavigate()
  // useEffect
  useEffect(() => {
    fetchUserDatas()
  }, [])

  const fetchUserDatas = async () => {
    try {
      setIsLoading(true)
      await axios.get(END_POINT_SERVER + "users")
        .then(response => {
          setUsers(response?.data)
          setIsLoading(false)

        }).catch(error => {
          setIsLoading(false)
          console.log("users ontfound:", error)
        })
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }


  const handleUpdateUser = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deletedUser(item?.id)
      }
    });
  }

  const deletedUser = async (userId) => {
    try {
      const response = await axios.delete(END_POINT_SERVER + "users/delete", {
        data: { id: userId }
      });
      if (response?.status === 200) {
        fetchUserDatas();
      }
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };

  const refresh = () =>{
    fetchUserDatas();
  }

  const onOpendFormAdd = () => {
    setIsOpen(true)
  }
  const onCloseModal = () => {
    setIsOpen(false)
  }

  return (
    <div>
      <p>this is User Page..</p>

      <div className='d-flex justify-content-end '>
        <div className='me-2'>
          <Button onClick={refresh} variant='primary'>refresh</Button>
        </div>

        <div>
          <Button onClick={() => Navigate("/create_user")} variant='primary' >Create User</Button>
        </div>

      </div>

      <UserDataLists users={users} isLoading={isLoading} handleUpdateUser={handleUpdateUser} />


      <div>
        <Modal show={isOpen} onHide={onCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Modal New User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddProduct onCloseModal={onCloseModal} fetchUserDatas={fetchUserDatas} />
          </Modal.Body>

        </Modal>

      </div>

    </div>

  )
}
