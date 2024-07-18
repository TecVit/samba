import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import Confetti from 'react-confetti';
import './css/Blog.css';

// Logo
import Logo from '../img/logo_pocket_samba.png';

const Blog = () => {

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
        document.title = 'Blog';
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

    const posts = [
        {
            data: '10/03/2009',
            titulo: 'Why Lead Generation is Key for Business Growth',
            previa: 'A small river named Duden flows by their place and supplies it with the necessary regelialia.',
            mensagem: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, eius mollitia suscipit, quisquam doloremque distinctio perferendis et doloribus unde architecto optio laboriosam porro adipisci sapiente officiis nemo accusamus ad praesentium? Esse minima nisi et. Dolore perferendis, enim praesentium omnis, iste doloremque quia officia optio deserunt molestiae voluptates soluta architecto tempora. Molestiae cupiditate inventore animi, maxime sapiente optio, illo est nemo veritatis repellat sunt doloribus nesciunt! Minima laborum magni reiciendis qui voluptate quisquam voluptatem soluta illo eum ullam incidunt rem assumenda eveniet eaque sequi deleniti tenetur dolore amet fugit perspiciatis ipsa, odit. Nesciunt dolor minima esse vero ut ea, repudiandae suscipit!',
        },
        {
            data: '17/07/2024',
            titulo: 'Why Lead Generation is Key for Business Growth 2',
            previa: 'A small river named Duden flows by their place and supplies it with the necessary regelialia.',
            mensagem: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, eius mollitia suscipit, quisquam doloremque distinctio perferendis et doloribus unde architecto optio laboriosam porro adipisci sapiente officiis nemo accusamus ad praesentium? Esse minima nisi et. Dolore perferendis, enim praesentium omnis, iste doloremque quia officia optio deserunt molestiae voluptates soluta architecto tempora. Molestiae cupiditate inventore animi, maxime sapiente optio, illo est nemo veritatis repellat sunt doloribus nesciunt! Minima laborum magni reiciendis qui voluptate quisquam voluptatem soluta illo eum ullam incidunt rem assumenda eveniet eaque sequi deleniti tenetur dolore amet fugit perspiciatis ipsa, odit. Nesciunt dolor minima esse vero ut ea, repudiandae suscipit!',
        },
    ]
  
    return (
        <>
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
                        <button>Comprar bilhete</button>
                    </nav>
                </div>
            </header>
            <main className='container-blog'>

                {/* Informações principais */}
                <section className='container-info'>
                    <div id='inicio' className='content-info'>
                        <div className='info'>
                            <div className='texto'>
                                <h2>Blog</h2>
                                <div className='rotas'>
                                    <p onClick={() => window.location.href = "/"}>{'Home >'}</p>
                                    <p>{'Blog'}</p>
                                </div>
                            </div>
                            <div className='imagens'>

                            </div>
                        </div>
                    </div>
                </section>

                <section className='container-posts'>
                    <div className='posts'>
                        {posts.length > 0 ? (
                            posts.map((val, index) => (
                                <div key={index} className='post'>
                                    <img src={require('../img/exemplo.png')} alt='Imagem' />
                                    <div className='data'>
                                        <h1>{val.data.slice(0,2)}</h1>
                                        <p>
                                            {val.data.slice(6)}
                                            <br/>
                                            {meses[parseInt(val.data.slice(3,5)) - 1]}
                                        </p>
                                    </div>
                                    <h1>{val.titulo}</h1>
                                    <p>{val.previa}</p>
                                </div>
                            ))
                        ) : (
                            <h1>Nenhum post encontrado</h1>
                        )}
                    </div>
                </section>

                <section className='container-post-selecionado'>

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
                                    <a href='/#sobre'>
                                        Sobre nós
                                    </a>
                                    <a href='#inicio'>
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

export default Blog;