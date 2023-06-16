import React from 'react'
import './App.css'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Content from './pages/Content'
import Layout from './component/Layout'
import Create from './pages/Create'
import Edit from './pages/Edit'
import Register from './pages/Register'

function App() {
  return (
    <div className="App">
      {/* <Toaster position="top-center" /> */}
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/new" element={<Create />} />
          <Route path="/content/:id" element={<Content />} />
          <Route path="/content/:id/edit" element={<Edit />} />
          {/* <Route path="*" element={<Error message="Page Not Found" />} /> */}
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </div>
  )
}

export default App
