import { useLayoutEffect, useState} from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import Header from '../components/Header.js';
import Breadcrumb from '../components/Breadcrumb.js';
import Footer from '../components/Footer.js';

function Details({ cart, handleAddToCart }) {
    const location = useLocation();
    console.log(`object`, location.state)
    const { name, height, weight, abilities, sprites, moves, types} = location.state;

    const [currentImage, setCurrentImage] = useState(sprites.front_default);
    const history = useHistory;
    useLayoutEffect(function() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }, [history]);

    return (
        <>
        <Header mode="dark" cart={cart}/>
        <Breadcrumb />
        <section className="container mx-auto">
            <div className="flex flex-wrap my-4 md:my-12">
                <div className="w-full md:hidden px-4">
                    <h2 className="text-5xl font-semibold">{name}</h2>
                </div>
                <div className="flex-1">
                    <div className="slider">
                        <div className="thumbnail">
                            <div className="px-2">
                                <div
                                className={`item ${currentImage === sprites.front_default && 'selected'}`}
                                onClick={() => setCurrentImage(sprites.front_default)}
                                >
                                    <img
                                        src={sprites.front_default}
                                        alt="front"
                                        className="object-cover w-full h-full rounded-lg"
                                    />
                                </div>
                            </div>
                            <div className="px-2">
                                <div
                                className={`item ${currentImage === sprites.back_default && 'selected'}`}
                                onClick={() => setCurrentImage(sprites.back_default)}
                                >
                                    <img
                                        src={sprites.back_default}
                                        alt="back"
                                        className="object-cover w-full h-full rounded-lg"
                                    />
                                </div>
                            </div>
                            <div className="px-2">
                                <div
                                className={`item ${currentImage === sprites.back_shiny && 'selected'}`}
                                onClick={() => setCurrentImage(sprites.back_shiny)}
                                >
                                    <img
                                        src={sprites.back_shiny}
                                        alt="rear"
                                        className="object-cover w-full h-full rounded-lg"
                                    />
                                </div>
                            </div>
                            <div className="px-2">
                                <div
                                className={`item ${currentImage === sprites.front_shiny && 'selected'}`}
                                onClick={() => setCurrentImage(sprites.front_shiny)}
                                >
                                    <img
                                        src={sprites.front_shiny}
                                        alt="side"
                                        className="object-cover w-full h-full rounded-lg"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="preview">
                        <div className="item rounded-lg h-full overflow-hidden">
                            <img
                            src={currentImage}
                            alt="front"
                            className="object-cover w-full h-full rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 px-4 md:p-6">
                <h2 className="text-5xl font-semibold">{name}</h2>

                <button
                onClick={() => handleAddToCart(location.state)}
                className="transition-all duration-200 bg-pink-400 text-black focus:bg-black focus:text-pink-400 rounded-full px-8 py-3 mt-4 inline-flex"
                >
                    Catch
                </button>
                <hr className="my-8" />

                <h6 className="text-xl font-semibold mb-4">About the product</h6>
                <p className="text-xl leading-7 mb-6">
                {name} have some moves like : <ul>{moves.map(({move}) => (
                  <li>{move.name}</li>
                ))}
                </ul>
                <br/>
                The type of {name} are : <ul>{types.map(({type}) => (
                  <li>{type.name}</li>
                ))}
                </ul>
                <br/>
                have abilities : <ul>{abilities.map(({ability}) => (
                  <li>{ability.name}</li>
                ))}
                </ul>
                <br/>
                height : {height}<br/>
                weight : {weight}
                </p>
                
            </div>
        </div>
        </section>
      <Footer />
    </>
    )
}

export default Details;