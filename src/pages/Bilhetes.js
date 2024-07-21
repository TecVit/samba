import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleUser, faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import Confetti from 'react-confetti';
import './css/Bilhetes.css';

// Logo
import Logo from '../img/logo_pocket_samba.png';
import NaoEncontrado from '../img/nao-encontrado.png';
import Creditos from './components/Creditos';
import Navbar from './components/Navbar';

const Bilhetes = () => {

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
        document.title = 'Comprar Bilhetes';
        animacoes();
        window.addEventListener('scroll', animacoes);
        return () => {
          window.removeEventListener('scroll', animacoes);
        };
    }, []);

    // Dados e Inputs

    const bilhetes = [
        {
            tipo: 'Básico',
            mensagem: 'For personal use and exploration of AI technology',
            preco: '19,99',
            beneficios: [
                '100 requests per day',
                'Free trial features access',
                'Limited API access'
            ],
            recomendado: false,
        },
        {
            tipo: 'Premium',
            mensagem: 'Perfect for professionals and small businesses in need of significant Al integration',
            preco: '29,99',
            beneficios: [
                'Unlimited AI generation',
                'Full new features access',
                'Priority support'
            ],
            recomendado: true,
        }
    ];

    return (
        <>
            {/* Navbar */}
            <Navbar />

            <main id='inicio' className='container-bilhetes'>

                {/* Informações principais */}
                <section className='container-info'>
                    <div className='content-info'>
                        <div className='info'>
                            <div className='texto'>
                                <h2>Comprar Bilhetes</h2>
                                <div className='rotas'>
                                    <p onClick={() => window.location.href = "/"}>{'Início >'}</p>
                                    <p>Comprar bilhetes</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Comprar bilhetes */}
                <section className='content-pricing'>
                    <div id='bilhetes' className='pricing-tables'>
                        <h1>Selecione seu bilhete</h1>
                        <h2>Desbloqueie infinitas vantagens</h2>
                        <div className='pricings'>
                            {bilhetes.length > 0 ? (
                                bilhetes.map((val, index) => (
                                    <div key={index} className={`pricing ${val.recomendado ? 'recomendado' : ''}`}>
                                        {val.recomendado && (
                                            <div className='recomendado'>
                                                <p>Recomendado</p>
                                            </div>
                                        )}
                                        <h1 className='verde'>{val.tipo}</h1>
                                        <p>{val.mensagem}</p>
                                        <h2><strong>R$</strong>{val.preco}</h2>
                                        <button onClick={() => window.location.href = "/pagamento"}>Comprar bilhete</button>
                                        <div className='list'>
                                            {val.beneficios.map((beneficio, index) => (
                                                <li>
                                                    <FontAwesomeIcon icon={faCircleCheck} className='icon' />
                                                    <p>{beneficio}</p>
                                                </li>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </section>

                {/* Créditos */}
                <Creditos />
            </main>
        </>
    );
}

export default Bilhetes;