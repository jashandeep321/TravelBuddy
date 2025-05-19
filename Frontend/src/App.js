import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Signup from './Components/users/Signup';
import Navigation from "./Components/Navigation";
import ContactUs from './Components/ContactUs';
import About from './Components/About';
import Deals from './Components/Deals';
import AllDestinations from './Components/Destination_pages/AllDestinations';
import BeachDestinations from './Components/Destination_pages/BeachDes';
import CityDestinations from './Components/Destination_pages/CityDes' ;
import MountainDestinations from './Components/Destination_pages/MountainDes' ;
import NatureDestinations from './Components/Destination_pages/NatureDes' ;
import Destination from './Components/Destination_pages/Destination'; 
import { CartProvider } from './Context/CartContext';
import CartPage from './pages/CartPage';
import OrderHistory from './pages/OrderHistory'
import "bootstrap/dist/css/bootstrap.min.css"
import Packages from './Components/Destination_pages/Packages' ;
import PackageDetails from './Components/Destination_pages/PackageDetails';
import SearchResults from './Components/SearchResults';

function App() {
 

  return (
     <CartProvider>
    <Router>
      <div className="App">
      <Navigation/>
      <Routes>

<Route path="/Signup" element={<Signup />} />
<Route path='/' element={<Home/>}/>
<Route path="/contact" element={<ContactUs />} />
<Route path="/deals" element={<Deals />} />
  <Route path="/about" element={<About />} />

  <Route path='/AllDestinations' element={<AllDestinations/>}/>
  <Route path='/Packages' element={<Packages/>}/>
<Route path='/Beach_Destinations' element={<BeachDestinations/>}/>
<Route path='/Mountain_Destinations' element={<MountainDestinations/>}/>
<Route path='/Nature_Destinations' element={<NatureDestinations/>}/>
<Route path='/City_Destinations' element={<CityDestinations/>}/>

<Route path='/destination/:slug' element={<Destination />}/>
<Route path='/packages/:slug' element={<PackageDetails />}/>
<Route path="/cart" element={<CartPage />} />
<Route path="/orders" element={<OrderHistory />} />
<Route path="/search" element={<SearchResults />} />

</Routes>
        
        
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;
