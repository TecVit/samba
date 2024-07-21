import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import Confetti from 'react-confetti';
import '../css/Navbar.css';

// Logo
import Logo from '../../img/logo_pocket_samba.png';

const Navbar = () => {

    // Animações
    function getTopPositionRelativeToPage(element) {
        var rect = element.getBoundingClientRect();
        var scrollTop = window.scrollY || window.pageYOffset;
        return rect.top + scrollTop;
    }
    
    const animacoes = () => {
        const elements = document.querySelectorAll('[data-animation]');
        const classAnimation = "animationClass";
        const windowTop = window.scrollY + ((window.innerHeight * 4.5) / 4);
        
        elements.forEach( async (element) => {
          const positionElemento = await getTopPositionRelativeToPage(element);
          if (Number(windowTop) >= positionElemento - 100) {
            element.classList.add(classAnimation);
          }
        });
    }

    useEffect(() => {
        animacoes();
        window.addEventListener('scroll', animacoes);
        return () => {
          window.removeEventListener('scroll', animacoes);
        };
    }, []);

    // Navbar
    const navbarRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const handleScrollNavbar = () => {
        if (navbarRef.current) {
            const scrollPosition = window.scrollY;
            if (scrollPosition <= 65) {
                setIsActive(false);
            } else {
                setIsActive(true);
            }
        }
    };
    useEffect(() => {
        handleScrollNavbar();
        window.addEventListener('scroll', handleScrollNavbar);
        return () => {
            window.removeEventListener('scroll', handleScrollNavbar);
        };
    }, []);
  
    return (
        <header ref={navbarRef} className={`container-navbar ${isActive ? 'active' : ''}`}>
            <div className='navbar'>
                {/*<img onClick={() => window.location.href = "/"} src={Logo} className='logo' alt='Logo' />*/}
                <h1 onClick={() => window.location.href = "/"} className='logo'>Logo</h1>
                <nav className='links'>
                    <a href='/'>Início</a>
                    <a href='/#sobre'>Sobre nós</a>
                    <a href='/#integrantes'>Integrantes</a>
                    <a href='/#bilhetes'>Bilhetes</a>
                    <a href='/#contato'>Contato</a>
                    <a href='/blog'>Blog</a>
                    <button onClick={() => window.location.href = "/comprar-bilhetes"}>Comprar bilhete</button>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;