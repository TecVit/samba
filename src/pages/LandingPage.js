import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import Confetti from 'react-confetti';
import './css/LandingPage.css';

// Logo
import Logo from '../img/logo_pocket_samba.png';

const LandingPage = () => {

    const meses = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
    ];

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
        document.title = 'Site de Samba';
        animacoes();
        window.addEventListener('scroll', animacoes);
        return () => {
          window.removeEventListener('scroll', animacoes);
        };
    }, []);

    // Verificando se chegou o dia do evento
    const dataAlvo = '19/07/2024';
    const horarioAlvo = '11:20:00';
    const [dias, setDias] = useState(0);
    const [horas, setHoras] = useState(0);
    const [minutos, setMinutos] = useState(0);
    const [segundos, setSegundos] = useState(0);
    const [statusEvento, setStatusEvento] = useState(false);

    useEffect(() => {
        const alvo = new Date(`${dataAlvo.split('/').reverse().join('-')}T${horarioAlvo}`);
    
        const atualizarContagem = () => {
            const agora = new Date();
            const diferencaTempo = alvo - agora;

            if (diferencaTempo > 1) {
                const dias = Math.floor(diferencaTempo / (1000 * 60 * 60 * 24));
                const horas = Math.floor((diferencaTempo % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutos = Math.floor((diferencaTempo % (1000 * 60 * 60)) / (1000 * 60));
                const segundos = Math.floor((diferencaTempo % (1000 * 60)) / 1000);
                setDias(dias);
                setHoras(horas);
                setMinutos(minutos);
                setSegundos(segundos);
                setStatusEvento(false);
            } else {
                setDias(0);
                setHoras(0);
                setMinutos(0);
                setSegundos(0);
                setStatusEvento(true);
            }
        };

        atualizarContagem();
        const intervaloId = setInterval(atualizarContagem, 1000);

        return () => clearInterval(intervaloId);
    }, [dataAlvo, horarioAlvo]);

    
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
            <header ref={navbarRef} className={`container-navbar ${isActive ? 'active' : ''}`}>
                <div className='navbar'>
                    {/*<img onClick={() => window.location.href = "/"} src={Logo} className='logo' alt='Logo' />*/}
                    <h1 onClick={() => window.location.href = "/"} className='logo'>Logo</h1>
                    <nav className='links'>
                        <a href='#inicio'>Início</a>
                        <a href='#sobre'>Sobre nós</a>
                        <a href='#integrantes'>Integrantes</a>
                        <a href='#bilhetes'>Bilhetes</a>
                        <a href='#contato'>Contato</a>
                        <a href='/blog'>Blog</a>
                        <button>Comprar bilhete</button>
                    </nav>
                </div>
            </header>
            <main className='container-landing'>

                {/* Informações principais */}
                <section className='container-info'>
                    {statusEvento && <Confetti className='confetes' />}
                    <div id='inicio' className='content-info'>
                        <div className='info'>
                            <div className='texto'>
                                <h2>Eventos de</h2>
                                <h1>Samba 2024</h1>
                                <p>{dataAlvo.slice(0, 2)} de {meses[parseInt(dataAlvo.slice(3, 5)) - 1]} de {dataAlvo.slice(6)}, Araraquara.</p>
                                <div className='datas'>
                                    <div className='data'>
                                        <h1>{dias}</h1>
                                        <p>Dias</p>
                                    </div>
                                    <div className='data'>
                                        <h1>{horas}</h1>
                                        <p>Horas</p>
                                    </div>
                                    <div className='data'>
                                        <h1>{minutos}</h1>
                                        <p>Minutos</p>
                                    </div>
                                    <div className='data'>
                                        <h1>{segundos}</h1>
                                        <p>Segundos</p>
                                    </div>
                                </div>
                            </div>
                            <div className='imagens'>

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
                                        <button>Comprar bilhete</button>
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
                <footer className='container-creditos'>
                    <div className='creditos'>
                        <div className='info'>

                            {/* INFORMAÇÕES */}
                            <div className='column'>
                                <h1>Eventalk</h1>
                                <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
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
                                        <p>203 Fake St. Mountain View, San Francisco, California, USA</p>
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
                                    <a href='#sobre'>
                                        Sobre nós
                                    </a>
                                    <a href='#blog'>
                                        Blog
                                    </a>
                                </div>
                                <div></div>
                            </div>

                            
                        </div>
                        
                        <p className='desenvolvido'>Copyright ©2024 Todos direitos reservados | Website desenvolvido por <strong>TecVit</strong></p>
                    </div>
                </footer>
            </main>
        </>
    );
}

export default LandingPage;