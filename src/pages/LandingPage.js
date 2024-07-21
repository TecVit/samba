import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import Confetti from 'react-confetti';
import './css/LandingPage.css';

// Logo
import Logo from '../img/logo_pocket_samba.png';
import Creditos from './components/Creditos';
import Navbar from './components/Navbar';

const LandingPage = () => {

    // Dados
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
    
  
    return (
        <>
            {/* Navbar */}
            <Navbar />

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

export default LandingPage;