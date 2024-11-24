import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Orders from './pages/Orders';
import Placeorder from './pages/Placeorder';
import Product from './pages/Product';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivayPolicy from './pages/PrivayPolicy';
import SearchBar from './components/SearchBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyProfile from './pages/MyProfile';
import Verify from './pages/Verify';

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:[7vw] lg:px[9vw]'>
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/place-order' element={<Placeorder />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/privacy-policy' element={<PrivayPolicy />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/verify' element={<Verify />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App