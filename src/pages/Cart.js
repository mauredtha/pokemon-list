import React from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

import Header from '../components/Header.js';
import Breadcrumb from '../components/Breadcrumb.js';
import Footer from '../components/Footer.js';

function Cart({ cart, handleRemoveCartItem }) {
  
  const [formData, setFormData] = React.useState({})

  const savePokemon = (name, image, pokemon_id) => {
    console.log(name)

    axios('http://localhost:8000/api/mypokemon', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        "Access-Control-Allow-Origin": "*"
      },
      data: JSON.stringify({
        name: name,
        nickname: formData,
        image: image,
        pokemon_id: pokemon_id // Use your own property name / key
      }),
      
    }).then(() => console.log('Pokemon Catched'))
      .catch(err => {
        console.error(err);
    });

   
    // axios.post('http://localhost:8000/api/mypokemon', {
    //   name: name,
    //   nickname: formData,
    //   image: image,
    //   pokemon_id: pokemon_id
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });


    // axios
    //   .post('http://localhost:8000/api/mypokemon', {name, formData, image, pokemon_id}, {
    //     headers: {"Access-Control-Allow-Origin": "*"}
    //   })
    //   .then(() => console.log('Book Created'))
    //   .catch(err => {
    //     console.error(err);
    //   });
    // fetch('http://localhost:8000/api/mypokemon', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     name: name,
    //     nickname: formData,
    //     image: image,
    //     pokemon_id: pokemon_id // Use your own property name / key
    //   }),
    // })
    //   .then((res) => res.json())
    //   .catch((err) => console.log('error'))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    cart.map(function({id, item}, index){
      const name = item.name;
      const image = item.sprites.front_default;
      const pokemon_id = item.id;
      savePokemon(name, image, pokemon_id)
    })
     
  }

  const handleChange = (event) => {
    setFormData(event.target.value)
  }

    return (
        <>
        <Header mode="dark" cart={cart}/>
        <Breadcrumb />
        <section className="md:py-16">
        <div className="container mx-auto px-4">
        <div className="flex -mx-4 flex-wrap">
          <div className="w-full px-4 mb-4 md:w-8/12 md:mb-0" id="shopping-cart">
            <div
              className="flex flex-start mb-4 mt-8 pb-3 border-b border-gray-200 md:border-b-0"
            >
              <h3 className="text-2xl">Pokemon Cart</h3>
            </div>

            <div className="border-b border-gray-200 mb-4 hidden md:block">
              <div className="flex flex-start items-center pb-2 -mx-4">
                <div className="px-4 flex-none">
                  <div className="" style={{width: "90px"}}>
                    <h6>Photo</h6>
                  </div>
                </div>
                <div className="px-4 w-5/12">
                  <div className="">
                    <h6>Name</h6>
                  </div>
                </div>
                <div className="px-4 w-5/12">
                  <div className="">
                    <h6>Nickname</h6>
                  </div>
                </div>
                <div className="px-4 w-2/12">
                  <div className="text-center">
                    <h6>Action</h6>
                  </div>
                </div>
              </div>
            </div>

            {cart && cart.length === 0  && (
                <p id="cart-empty" className="text-center py-8">
                    Ooops... Cart is empty.{' '}
                    <Link to="/" className="underline">Catch Pokemon Now</Link>
                </p>
            )}
            

            {cart.length > 0 && cart.map(function({id, item}, index){

                return (
                    <div key={index}
                    className="flex flex-start flex-wrap items-center mb-4 -mx-4"
                    data-row="1"
                    >
                    <div className="px-4 flex-none">
                        <div className="" style={{width: '90px', height: '90px'}}>
                        <img
                            src={item.sprites.front_default}
                            alt="chair-1"
                            className="object-cover rounded-xl w-full h-full"
                        />
                        </div>
                    </div>
                    <div className="px-4 w-auto flex-1 md:w-5/12">
                        <div className="">
                        <h6 className="font-semibold text-lg md:text-xl leading-8">
                            {item.name}
                        </h6>
                        </div>
                    </div>
                    <div
                        className="px-4 w-auto flex-none md:flex-1 md:w-5/12 hidden md:block"
                    >
                        <div className="">
                        <form>
                          <input type="text" name="nickname" value={formData.nickname} className="border-2 border-black" onChange={handleChange} />
                          <button
                            onClick={handleSubmit}
                            className="text-red-600 border-none focus:outline-none px-3 py-1"
                        >
                            ADD
                        </button>
                          </form>
                        </div>
                    </div>
                    <div className="px-4 w-2/12">
                        <div className="text-center">
                        <button
                            onClick={(event) => handleRemoveCartItem(event, id)}
                            className="text-red-600 border-none focus:outline-none px-3 py-1"
                        >
                            X
                        </button>
                        </div>
                    </div>
                    </div>
                )
            })}
            
          </div>
          
        </div>
      </div>
    </section>
    <Footer />
    </>
    )
}

export default Cart;