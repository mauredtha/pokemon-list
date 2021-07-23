import {Link} from 'react-router-dom';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb.js';
import Arrive from '../components/Arrive';
import ArrivedItem from '../components/ArrivedItem';
import Footer from '../components/Footer.js';

function MyPokemon({cart, items}) {
    return (
    <>
    <Header mode="dark"/>
    <Breadcrumb />
    <Arrive items={items} />
    <Footer />
    
    </>
    )
}

export default MyPokemon;