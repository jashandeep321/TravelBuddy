import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Signup from './Components/users/Signup';
import Navigation from "./Components/Navigation";
import ContactUs from './Components/ContactUs';
import About from './Components/About';
import Deals from './Components/Deals';
import AllDestinations from './Components/Destination_pages/AllDestinations';
import Beach_Destinations from './Components/Destination_pages/BeachDes';
import City_Destinations from './Components/Destination_pages/CityDes' ;
import Mountain_Destinations from './Components/Destination_pages/MountainDes' ;
import Nature_Destinations from './Components/Destination_pages/NatureDes' ;
import Destination from './Components/Destination_pages/Destination'; 
import { CartProvider } from './Context/CartContext';
import CartPage from './pages/CartPage';
// import Navbar from './Components/Header';
import "bootstrap/dist/css/bootstrap.min.css"
import Packages from './Components/Destination_pages/Packages' ;
import PackageDetails from './Components/Destination_pages/PackageDetails';

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
<Route path='/Beach_Destinations' element={<Beach_Destinations/>}/>
<Route path='/Mountain_Destinations' element={<Mountain_Destinations/>}/>
<Route path='/Nature_Destinations' element={<Nature_Destinations/>}/>
<Route path='/City_Destinations' element={<City_Destinations/>}/>

<Route path='/destination/:slug' element={<Destination />}/>
<Route path='/packages/:slug' element={<PackageDetails />}/>
<Route path="/cart" element={<CartPage />} />

</Routes>
        
        
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;

// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import logo from './logo.svg';
// import './App.css';
// import Home from './Components/Home';
// import Signup from './Components/users/Signup';
// import Navigation from "./Components/Navigation";
// // import Navbar from './Components/Header';
// import "bootstrap/dist/css/bootstrap.min.css"
// function App() {
//   return (
//     <Router>
//       <div className="App">
//         {/* <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header> */}
//       {/* <Home /> */}
//       <Navigation/>
//       <Routes>

// <Route path="/Signup" element={<Signup />} />
// <Route path='/' element={<Home/>}/>
// </Routes>
        
        
//       </div>
//     </Router>
//   );
// }

// export default App;
