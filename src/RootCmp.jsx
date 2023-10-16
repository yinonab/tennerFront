import React from 'react'
import { Routes, Route } from 'react-router'

import routes from './routes'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserDetails } from './pages/UserDetails'
import { LoginSignup } from './cmps/LoginSignup'
import { GigIndex } from './pages/GigIndex'
import { GigEdit } from './cmps/GigEdit'
import { GigDetails } from './pages/GigDetails'
import { HomePage } from './pages/HomePage'
import { UserMsg } from './cmps/UserMsg'
import { GigOrder } from './pages/GigOrder'
import { GigPayment } from './pages/GigPayment'
import { Provider } from 'react-redux'
import { store } from './store/store'

export function RootCmp() {

    return (
        <Provider store={store}>
        <div className='main-container full '>
            <AppHeader />
            {/* <main className='full'> */}
                <Routes>
                    {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                    <Route path='/' element={<HomePage />} />
                    <Route path='user/:id' element={<UserDetails />} />
                    <Route element={<LoginSignup />} path='/login' />
                    <Route element={<GigEdit />} path='/edit' />
                    <Route element={<GigEdit />} path='/edit/:gigId' />
                    <Route element={<GigIndex />} path='/gigs/:tag' />
                    <Route element={<GigIndex />} path='/gigs' />
                    <Route element={<GigPayment />} path='/gig/:gigId/payment' />
                    <Route element={<GigOrder />} path='/gig/:gigId/order' />
                    <Route element={<GigDetails />} path='/gig/:gigId' />
                </Routes>
            {/* </main> */}
            <AppFooter />
            <UserMsg/>
        </div>
        </Provider>
    )
}


