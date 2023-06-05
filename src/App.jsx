import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/shared/Layout'
import AdminAuthContext from './components/store/Admin-authContext'
import Dashboard from './pages/Dashboard'
import Sales from "./pages/Sales"
import LoginAdmin from './components/Auth/LoginAdmin'
import ForgetPassword from './components/Auth/ForgetPassword'
import ChangePassword from './components/Auth/ChangePassword'
import Profile from './pages/Profile'
import UpdatePassword from './pages/UpdatePassword'
import NotFound404 from './components/NotFound404'
import AddUsers from "./pages/AddUsers"
import Users from './pages/Users'
import Analytics from './pages/Analytics'
import UserDetails from './pages/UsersDetails'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Settings from './pages/Settings'
import AddProducts from './pages/AddProducts'
import InvProducts from './pages/InvProducts'

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
          <Route path='sales' element={<Sales />} />
          <Route path='profile' element={<Profile />} />
          <Route path="updatepassword" element={<UpdatePassword />} />
          <Route path='adduser' element={<AddUsers />} />
          <Route path="users" element={<Users />} />
          <Route path='analytics' element={<Analytics />} />
          <Route path='user/:userId' element={<UserDetails />} />
          <Route path='invproducts' element={<InvProducts />} />
          <Route path='product/:proId' element={<ProductDetails />} />
          <Route path='settings' element={<Settings />} />
          <Route path='addproducts' element={<AddProducts />} />
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