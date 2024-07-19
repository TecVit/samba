import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import Confetti from 'react-confetti';
import './css/Blog.css';

// Logo
import Logo from '../img/logo_pocket_samba.png';
import NaoEncontrado from '../img/nao-encontrado.png';

const Blog = () => {

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

    // Dados e Inputs
    const [post, setPost] = useState({});
    const [posts, setPosts] = useState([
        {
            data: '08/03/2023',
            titulo: 'Uma Noite Inesquecível: O Encanto do Samba',
            previa: 'Evento de samba foi espetacular, com apresentações cheias de energia e alegria. As pessoas dançaram e se divertiram ao som de músicas de samba, embaladas por instrumentos como pandeiro, cavaquinho e surdo.',
            mensagem: `O samba é um dos ritmos mais emblemáticos e representativos da cultura brasileira, conhecido mundialmente por sua energia contagiante e sua capacidade de unir pessoas de diferentes origens e idades. Originado nas rodas de capoeira e nas festas de escravos africanos no Brasil colonial, o samba se desenvolveu e se diversificou ao longo dos anos, incorporando elementos de várias tradições musicais e culturais. Este ritmo alegre e pulsante tornou-se um símbolo da identidade brasileira, especialmente durante o Carnaval, onde milhares de pessoas se reúnem para celebrar com desfiles, danças e festas nas ruas.
    
Os instrumentos utilizados no samba são fundamentais para criar seu ritmo característico. O pandeiro, com seu som metálico e versátil, é um dos mais icônicos. O cavaquinho, um pequeno violão de quatro cordas, adiciona melodias ágeis e vibrantes. Outros instrumentos essenciais incluem o tamborim, o surdo, o reco-reco e a cuíca, cada um contribuindo de forma única para a textura rítmica do samba. Juntos, esses instrumentos criam uma base rítmica complexa e hipnotizante que convida todos a dançar.
    
Além de seu valor musical, o samba também desempenha um papel importante na vida social e cultural do Brasil. As rodas de samba, que acontecem em bares, praças e casas de amigos, são ocasiões para encontros, conversas e celebrações comunitárias. O samba é uma forma de expressão cultural e resistência, especialmente para as comunidades negras, que encontram nele uma maneira de preservar suas tradições e histórias. Em bairros do Rio de Janeiro como a Lapa e a Pedra do Sal, o samba é vivido e respirado todos os dias, perpetuando suas raízes e renovando seu espírito a cada geração.
    
O samba também conquistou o mundo, sendo apreciado e adotado por artistas internacionais e presente em diversos festivais de música ao redor do globo. A riqueza de suas melodias e ritmos cativa pessoas de todas as nacionalidades, e sua influência pode ser vista em vários gêneros musicais. Assim, o samba continua a ser um poderoso embaixador da cultura brasileira, levando alegria, paixão e uma mensagem de união e celebração para todos os cantos do planeta.`,
        },
        {
            data: '08/03/2023',
            titulo: 'Uma Noite Inesquecível: O Encanto do Samba',
            previa: 'Evento de samba foi espetacular, com apresentações cheias de energia e alegria. As pessoas dançaram e se divertiram ao som de músicas de samba, embaladas por instrumentos como pandeiro, cavaquinho e surdo.',
            mensagem: `O samba é um dos ritmos mais emblemáticos e representativos da cultura brasileira, conhecido mundialmente por sua energia contagiante e sua capacidade de unir pessoas de diferentes origens e idades. Originado nas rodas de capoeira e nas festas de escravos africanos no Brasil colonial, o samba se desenvolveu e se diversificou ao longo dos anos, incorporando elementos de várias tradições musicais e culturais. Este ritmo alegre e pulsante tornou-se um símbolo da identidade brasileira, especialmente durante o Carnaval, onde milhares de pessoas se reúnem para celebrar com desfiles, danças e festas nas ruas.
    
Os instrumentos utilizados no samba são fundamentais para criar seu ritmo característico. O pandeiro, com seu som metálico e versátil, é um dos mais icônicos. O cavaquinho, um pequeno violão de quatro cordas, adiciona melodias ágeis e vibrantes. Outros instrumentos essenciais incluem o tamborim, o surdo, o reco-reco e a cuíca, cada um contribuindo de forma única para a textura rítmica do samba. Juntos, esses instrumentos criam uma base rítmica complexa e hipnotizante que convida todos a dançar.
    
Além de seu valor musical, o samba também desempenha um papel importante na vida social e cultural do Brasil. As rodas de samba, que acontecem em bares, praças e casas de amigos, são ocasiões para encontros, conversas e celebrações comunitárias. O samba é uma forma de expressão cultural e resistência, especialmente para as comunidades negras, que encontram nele uma maneira de preservar suas tradições e histórias. Em bairros do Rio de Janeiro como a Lapa e a Pedra do Sal, o samba é vivido e respirado todos os dias, perpetuando suas raízes e renovando seu espírito a cada geração.
    
O samba também conquistou o mundo, sendo apreciado e adotado por artistas internacionais e presente em diversos festivais de música ao redor do globo. A riqueza de suas melodias e ritmos cativa pessoas de todas as nacionalidades, e sua influência pode ser vista em vários gêneros musicais. Assim, o samba continua a ser um poderoso embaixador da cultura brasileira, levando alegria, paixão e uma mensagem de união e celebração para todos os cantos do planeta.`,
        }
    ]);
  
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
            <main id='inicio' className='container-blog'>

                {/* Informações principais */}
                <section className='container-info'>
                    <div className='content-info'>
                        <div className='info'>
                            <div className='texto'>
                                <h2>Blog</h2>
                                <div className='rotas'>
                                    <p onClick={() => window.location.href = "/"}>{'Home >'}</p>
                                    {post.titulo ? (
                                        <>
                                            <p onClick={() => window.location.href = "/blog"}>{`Blog >`}</p>
                                            <p>{post.titulo}</p>
                                        </>
                                    ) : (
                                        <p>Blog</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Posts Gerais */}
                {!post.existe && (
                    <section className='container-posts'>
                        <div className='posts'>
                            {posts.length > 0 ? (
                                posts.map((val, index) => (
                                    <div key={index} className='post'>
                                        <img src={require('../img/image.png')} alt='Imagem' />
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
                                        <a onClick={() => {
                                            setPost({
                                                existe: true,
                                                titulo: val.titulo,
                                                previa: val.previa,
                                                mensagem: val.mensagem,
                                                imagem: val.imagem,
                                            });
                                            setTimeout(() => {
                                                window.location.href = "#inicio";
                                            }, 50);
                                        }}>Ver mais..</a>
                                    </div>
                                ))
                            ) : (
                                <div className='nao-encontrado'>
                                    <img src={NaoEncontrado} />
                                    <h1>Nenhum post encontrado</h1>
                                </div>
                            )}
                        </div>
                    </section>
                )}
                
                {/* Post individual */}
                {post.existe && (
                    <section className='container-post-selecionado'>
                        <h1>{post.titulo}</h1>
                        <p>{post.mensagem}</p>
                        <div className='comentarios'>
                            <div className='form-comentario'>
                                <h1>Envie seu comentário</h1>
                                <div className='input'>
                                    <label>Nome</label>
                                    <input type='text' placeholder='Digite seu nome' />
                                </div>
                                <div className='input'>
                                    <label>E-mail</label>
                                    <input type='text' placeholder='Digite seu e-mail' />
                                </div>
                                <div className='input'>
                                    <label>Comentário</label>
                                    <textarea placeholder='Digite seu comentário'></textarea>
                                </div>
                                <button>Enviar</button>
                            </div>
                            <div className='lista-comentarios'>

                            </div>
                        </div>
                    </section>
                )}
                

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