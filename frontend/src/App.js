import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Signup from './components/Signup';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import Update from './components/Update';
import Profile from './components/Profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav/> 
        <Routes>
          {/* All routes under PrivateComponent are protected routes */}
         <Route element={<PrivateComponent/>}>
         <Route path="/" element={<ProductList />}></Route>
         <Route path="/add" element= {<AddProduct/>}></Route>
         <Route path="/update/:id" element={<Update />}></Route>
         <Route path="/logout" element={<h1>Logout Component</h1>}></Route>
         <Route path="/profile" element={<Profile />}></Route>
         </Route>

         <Route path="/signup" element={<Signup/>}></Route>
         <Route path="/login" element={<Login/>}></Route>
        </Routes>
      </BrowserRouter>
        <Footer />
    </div>
  );
}

export default App;
