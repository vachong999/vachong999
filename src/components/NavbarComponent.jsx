import React, {  useState } from 'react';
import { Button, Container,Nav,Navbar, ButtonGroup, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next'; 




export default function NavbarComponent() {
  const navigate = useNavigate()
  const { t, i18n }= useTranslation()
  const [languageName, setLanguageName] = useState('English')

  const handleLogout = () =>
    
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
      
        localStorage.clear()
        navigate('/')
      
    }
  });

const changeLanguage =(lng) =>{
  i18n.changeLanguage(lng)
  if(lng === "en") {
    setLanguageName("English")
  }else{
    setLanguageName("ພາສາລາວ")
  }
}



  return (
    <Navbar bg="dark" data-bs-theme="dark">
    <Container>
      <Navbar.Brand href="#home">Navbar</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link>
          <Link to="/home">{t("home_menu")}</Link>
        </Nav.Link>
        <Nav.Link>
          <Link to="/user">{t("user_menu")}</Link>
        </Nav.Link>
        <Nav.Link>
          <Link to="/create_user">{t("add_user_menu")}</Link>
        </Nav.Link>
       

      </Nav>

      <Navbar.Brand>
          <Button size='sm' variant='light' onClick={handleLogout}>Logout</Button>
        </Navbar.Brand>

      <Dropdown size='sm'  as={ButtonGroup}>
      <Button  variant="success">{languageName}</Button>
     

      <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

      <Dropdown.Menu>
      
       <Dropdown.Item style={{background: "none"}}>
       <Button onClick={() => changeLanguage("en")} className='w-100' variant='light'>English</Button>
       </Dropdown.Item>
       <Dropdown.Item style={{background: "none"}}>
       <Button onClick={() => changeLanguage("lao")} className='w-100' variant='light'>Lao</Button>
       </Dropdown.Item>
      
     
       
      </Dropdown.Menu>
    </Dropdown>

    </Container>
    </Navbar>
  )
}
