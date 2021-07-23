import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Header from './components/Header.js';
import Arrive from './components/Arrive.js';
import Footer from './components/Footer.js';
import Offline from './components/Offline.js';

import Splash from './pages/Splash.js';
import Details from './pages/Details.js';
import Cart from './pages/Cart.js';
import MyPokemon from './pages/MyPokemon.js';

function App({ cart }) {

  const [items, setItems] = React.useState([]);

  const [offlineStatus, setOfflineStatus] = React.useState(!navigator.onLine);

  const [isLoading, setIsLoading] = React.useState(true);

  

  function handleOfflineStatus() {
    setOfflineStatus(!navigator.onLine);
  }

  React.useEffect(function() {
    (async function() {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
      const data = await response.json();
      //const { nodes } = await response.json();
      //console.log(data.results)
      //console.log(`items`, nodes);
      setItems(data.results);
      //setItems(nodes);

      const script = document.createElement("script");
      script.src = "/carousel.js";
      script.async = false;
      document.body.appendChild(script);
    })();

    handleOfflineStatus();
    window.addEventListener('online', handleOfflineStatus);
    window.addEventListener('offline', handleOfflineStatus);

    setTimeout(function(){
      setIsLoading(false);
    }, 1500);

    return function() {
      window.removeEventListener('online', handleOfflineStatus);
      window.removeEventListener('offline', handleOfflineStatus);
    }

  }, [offlineStatus]);


  return (
    <>
    {isLoading === true ? <Splash /> : 
    (
      <>
      {offlineStatus &&  <Offline/>}
      <Header mode="dark" cart={cart} />
      <Arrive items={items} />
      <Footer />
      </>
    )}
    </>
  );
}

export default function Routes() {
  const cachedCart = window.localStorage.getItem("cart");
  const [cart, setCart] = React.useState([]);
  const [pokemons, setPokemons] = React.useState([]);
  
  function handleAddToCart(item) {
    const currentIndex = cart.length;
    const newCart = [...cart, {id: currentIndex + 1, item}];
    setCart(newCart);
    window.localStorage.setItem("cart", JSON.stringify(newCart));
  }

  function handleRemoveCartItem(event, id) {
    const revisedCart = cart.filter(function(item) {
      return item.id !== id;
    });    
    setCart(revisedCart);
    window.localStorage.setItem("cart", JSON.stringify(revisedCart));
  }

  React.useEffect(function(){
    console.info("useEffect for localStorage");
    if(cachedCart !== null){
      setCart(JSON.parse(cachedCart));
    }
  }, [cachedCart])

  React.useEffect(function(){

    (async function() {
      const result = await fetch('http://localhost:8000/api/mypokemon/',{
        headers: { 
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*"
        }
      });
      const dataPokemon = await result.json();
      //const { nodes } = await response.json();
      console.log(dataPokemon)
      //console.log(`items`, nodes);
      setPokemons(dataPokemon);
      //setItems(nodes);
  
      const script = document.createElement("script");
      script.src = "/carousel.js";
      script.async = false;
      document.body.appendChild(script);
    })();

  }, [])

  

  return (
    <Router>
      <Route path="/" exact>
        <App cart={cart} />
      </Route>
      <Route path="/details/:id">
        <Details handleAddToCart={handleAddToCart} cart={cart} />
      </Route>
      <Route path="/cart">
        <Cart cart={cart} handleRemoveCartItem={handleRemoveCartItem}/>
      </Route>
      <Route path="/mypokemon">
        <MyPokemon cart={cart} items={pokemons}/>
      </Route>
    </Router>
  )
};
