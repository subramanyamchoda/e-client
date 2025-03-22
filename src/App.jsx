import React from 'react'
import Navbar from './components/Navbar';
import { BrowserRouter as Router , Routes ,Route } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/cart';
import Details from './components/Details';
import OrderConfirmation from './components/OrderConfirmation';
const App = () => {
  return (
      <Router>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/address' element={<Details/>}/>
            <Route path='/order' element={<OrderConfirmation/>}/>
            
          </Routes>
      
      </Router>
  )
}

export default App