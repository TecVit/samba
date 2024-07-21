import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import Confetti from 'react-confetti';
import '../css/Creditos.css';

// Logo
import Logo from '../../img/logo_pocket_samba.png';

const Creditos = () => {

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

  
    return (
        <>
            <footer className='container-creditos'>
                <div className='creditos'>
                    <div className='info'>

                        {/* INFORMAÇÕES */}
                        <div className='column'>
                            <h1>Samba</h1>
                            <p>Aqui no Samba, promovemos os melhores eventos de samba com os músicos e artistas mais talentosos.</p>
                            <div className='redes-sociais'>
                                <a href='#' className='icon'>
                                    <FontAwesomeIcon icon={faWhatsapp} className='ico' />
                                </a>
                                <a href='#' className='icon'>
                                    <FontAwesomeIcon icon={faInstagram} className='ico' />
                                </a>
                                <a href='#' className='icon'>
                                    <FontAwesomeIcon icon={faFacebook} className='ico' />
                                </a>
                            </div>
                        </div>

                        {/* DÚVIDAS */}
                        <div className='column'>
                            <h1>Tem alguma dúvida?</h1>
                            <div className='locais'>
                                <li>
                                    <FontAwesomeIcon icon={faLocationDot} className="icon" />
                                    <p>Avenida São Geraldo, 980, Vila Ferroviária, Araraquara, São Paulo, Brasil</p>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faPhone} className="icon" />
                                    <p>+55 (16) 99988-8777</p>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faEnvelope} className="icon" />
                                    <p>email@example.com.br</p>
                                </li>
                            </div>
                            <div></div>
                        </div>

                        {/* LINKS */}
                        <div className='column'>
                            <h1>Outros Links</h1>
                            <div className='links'>
                                <a href='/#sobre'>
                                    Sobre nós
                                </a>
                                <a href='/blog#inicio'>
                                    Blog
                                </a>
                            </div>
                            <div></div>
                        </div>
                    </div>
                    
                    <p className='desenvolvido'>
                        Copyright ©2024 Todos direitos reservados | Website desenvolvido por 
                        <strong onClick={() => window.location.href = "https://www.instagram.com/tecvit_"}>TecVit, Inc.</strong>
                    </p>
                </div>
            </footer>
        </>
    );
}

export default Creditos;