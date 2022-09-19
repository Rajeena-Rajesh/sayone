
import './App.css';
import Homepage from './pages/Homepage';
import {Route, BrowserRouter,Routes,Navigate} from 'react-router-dom'
import CartPage from './pages/CartPage';
import ProductInfo from './pages/ProductInfo';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import './stylesheet/Layout.css'
import './stylesheet/products.css'
import './stylesheet/Authentication.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrdersPage from './pages/OrdersPage';
import AdminPage from './pages/AdminPage';
function App() {
  return (
    <div className="App">
         <ToastContainer/>
      <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<ProtectedRoutes><Homepage/></ProtectedRoutes>}/>
        <Route path="/CartPage" exact element={<ProtectedRoutes><CartPage/></ProtectedRoutes>}/>
        <Route path="/OrdersPage" exact element={<ProtectedRoutes><OrdersPage/></ProtectedRoutes>}/>
        <Route path="/Admin" exact element={<ProtectedRoutes><AdminPage/></ProtectedRoutes>}/>
        <Route path="/ProductInfo/:productid" exact element={<ProtectedRoutes><ProductInfo/></ProtectedRoutes>}/>
       
        <Route path="/LoginPage" exact element={<LoginPage/>}/>
        <Route path="/RegisterPage" exact element={<RegisterPage/>}/>
      
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export const ProtectedRoutes=({children})=>{
  if(localStorage.getItem('currentUser')){
    return children
  }else{
    return <Navigate to='/LoginPage'/>
  }
}
