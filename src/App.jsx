import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/shared/Layout'
import AdminAuthContext from './components/store/Admin-authContext'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import LoginAdmin from './components/Auth/LoginAdmin'
import ForgetPassword from './components/Auth/ForgetPassword'
import ChangePassword from './components/Auth/ChangePassword'
import NotFound404 from './components/NotFound404'

function App() {
  const adminAuthCtx = useContext(AdminAuthContext)
  return (
    <Router>
      <Routes>
        <Route path='/' element={
          <>
            {adminAuthCtx.isAdminLoggedIn && <Layout />}
            {!adminAuthCtx.isAdminLoggedIn && <LoginAdmin />}
          </>
        }
        >
          <Route index element={<Dashboard />} />
          <Route path='products' element={<Products />} />
        </Route>
        <Route path='/login' element={<LoginAdmin />} />
        <Route path='/forgetpassword' element={<ForgetPassword />} />
        <Route path="/auth/passwordreset/:userId/:token" element={<ChangePassword />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </Router>
  )
}

export default App