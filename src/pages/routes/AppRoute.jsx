import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import LoginPage from '../login/LoginPage'
import UserPage from '../User/UserPage'
import PublicRoute from './PublicRoute'
import NotFound404 from '../NotFound404'
import PolicyPage from '../PolicyPage'
import TemplateLayout from '../../layout/TemplateLayout'
import CreateUser from '../User/CreateUser'


export default function AppRoute() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />}/>

                <Route
                    path="/user"
                    element={
                        <PrivateRoute>
                           <TemplateLayout>
                           <UserPage />
                           </TemplateLayout>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/create_user"
                    element={
                        <PrivateRoute>
                           <TemplateLayout>
                           <CreateUser />
                           </TemplateLayout>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/policy"
                    element={
                        <PublicRoute>
                            <PolicyPage/>
                        </PublicRoute>
                    }
                />

                <Route path='*' element={<NotFound404/>}/>
            </Routes>
        </BrowserRouter>
    )
}
