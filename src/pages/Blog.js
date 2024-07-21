import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleUser, faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import Confetti from 'react-confetti';
import './css/Blog.css';

// Logo
import Logo from '../img/logo_pocket_samba.png';
import NaoEncontrado from '../img/nao-encontrado.png';
import Creditos from './components/Creditos';
import Navbar from './components/Navbar';
import { clearCookies, deleteCookie, getCookie, setCookie } from '../firebase/cookies';

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
    const [comentarios, setComentarios] = useState([
        {
            nome: 'John Doe',
            data: 'October 03, 2018 at 2:21pm',
            comentario: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum impedit necessitatibus, nihil?',
        },
        {
            nome: 'John Doe',
            data: 'October 03, 2018 at 2:21pm',
            comentario: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum impedit necessitatibus, nihil?',
        },
        {
            nome: 'John Doe',
            data: 'October 03, 2018 at 2:21pm',
            comentario: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum impedit necessitatibus, nihil?',
        }
    ]);

    // Modais
    const [mostrarTodosComentarios, setMostrarTodosComentarios] = useState(false);
    const comentariosParaMostrar = mostrarTodosComentarios ? comentarios : comentarios.slice(0, 2);

    // Informações do cliente
    const nomeCookie = getCookie('nome') || '';
    const emailCookie = getCookie('email') || '';
    const telefoneCookie = getCookie('telefone') || '';
    const cepCookie = getCookie('cep') || '';

    return (
        <>
            {/* Navbar */}
            <Navbar />

            <main id='inicio' className='container-blog'>

                {/* Informações principais */}
                <section className='container-info'>
                    <div className='content-info'>
                        <div className='info'>
                            <div className='texto'>
                                <h2>Blog</h2>
                                <div className='rotas'>
                                    <p onClick={() => window.location.href = "/"}>{'Início >'}</p>
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
                                <h1>{comentarios.length} {comentarios.length > 1 ? 'Comentários' : 'Comentário'}</h1>
                                {comentarios.length > 0 ? (
                                    comentariosParaMostrar.map((val, index) => (
                                        <div key={index} className='comentario'>
                                            <FontAwesomeIcon icon={faCircleUser} className='icon' />
                                            <div className='column'>
                                                <h1>{val.nome}</h1>
                                                <h2>{val.data}</h2>
                                                <p>{val.comentario}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <h2>Nenhum comentário encontrado</h2>
                                )}
                                {comentarios.length > 2 && (
                                  mostrarTodosComentarios ? (
                                        <button onClick={() => setMostrarTodosComentarios(false)}>Esconder comentários</button>
                                    ) : (
                                        <button onClick={() => setMostrarTodosComentarios(true)}>Mostrar todos comentários</button>
                                    )
                                )}
                            </div>
                        </div>
                    </section>
                )}
                

                {/* Créditos */}
                <Creditos />
            </main>
        </>
    );
}

export default Blog;