
import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Loading from './components/Loading'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import CreateBlog from './components/CreateBlog'
import UpdateBlog from './components/UpdateBlog'
import NotFound from './components/NotFound'

const App = () => {
  return (
    <React.Fragment>
        <BrowserRouter>
            <Routes>
                <Route path='/' Component={Loading} />
                <Route path='/register' Component={Register} />
                <Route path='/login' Component={Login} />
                <Route path='/home' Component={Home} />
                <Route path='/createblog' Component={CreateBlog} />
                <Route path='/updateblog/:id' Component={UpdateBlog} />
                <Route path='*' Component={NotFound} />
            </Routes>
        </BrowserRouter>
    </React.Fragment>
  )
}

export default App