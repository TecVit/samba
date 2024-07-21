import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleUser, faCreditCard, faEnvelope, faLocationDot, faMinus, faPhone, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faInstagram, faFacebook, faPix } from '@fortawesome/free-brands-svg-icons';
import Confetti from 'react-confetti';
import axios from 'axios';
import './css/Pagamento.css';

// Toastify
import { notifySuccess, notifyError, NotificationContainer } from '../toastifyServer';
import 'react-toastify/dist/ReactToastify.css';
import './css/CustomToastify.css';

// Validar telefone com o goole
import libphonenumber from 'google-libphonenumber';

// Logo
import Logo from '../img/logo_pocket_samba.png';
import NaoEncontrado from '../img/nao-encontrado.png';
import Creditos from './components/Creditos';
import Navbar from './components/Navbar';
import { getCookie, setCookie } from '../firebase/cookies';
import { criarPagamento } from '../firebase/pagamento';


// Pages Docs
// Page (1) => Bilhetes
// Page (2) => Formulário dos Dados
// Page (3) => Pagamentos

const Pagamento = () => {

    // Lib do google para validar telefones
    const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
    const PNF = libphonenumber.PhoneNumberFormat;
    const PNT = libphonenumber.PhoneNumberType;
    const validatePhoneNumber = (phoneNumber, regionCode) => {
      try {
        const number = phoneUtil.parseAndKeepRawInput(phoneNumber, regionCode);
        const isValid = phoneUtil.isValidNumber(number);

        if (isValid) {
          const formattedNumber = phoneUtil.format(number, PNF.INTERNATIONAL);
          const numberType = phoneUtil.getNumberType(number);

          return {
            isValid,
            formattedNumber,
            numberType: PNT[numberType],
          };
        } else {
          return { isValid };
        }
      } catch (e) {
        return { isValid: false, error: e.message };
      }
    };


    // Dados
    const [perguntas, setPerguntas] = useState([
      {
        status: false,
        pergunta: 'Quanto tempo demora o pagamento?',
        resposta: ' O pagamento é processado imediatamente após a confirmação da compra. Em alguns casos, pode levar até 24 horas no máximo.',
      },
      {
        status: false,
        pergunta: 'O que fazer se meu pagamento for recusado?',
        resposta: 'Verifique os detalhes do seu cartão ou método de pagamento e tente novamente. Se o problema persistir, entre em contato com o suporte.',
      },
      {
        status: false,
        pergunta: 'Há taxas adicionais na compra?',
        resposta: 'Não cobramos taxas adicionais na sua compra, mas sua instituição financeira pode cobrar tarifas.',
      },
      {
        status: true,
        pergunta: 'Há descontos para pagamentos antecipados?',
        resposta: ' Sim, até duas semanas antes do evento, disponibilizamos o "Bilhete Antecipado" com desconto. Após esse período, não são concedidos descontos.',
      },
    ]);

    const handleSelecionarPergunta = (index) => {
      const updatedPerguntas = perguntas.map((pergunta, i) => ({
        ...pergunta,
        status: i === index && perguntas[index].status ? false : i === index && !perguntas[index].status ? true : null
      }));
      setPerguntas(updatedPerguntas);
    };

    const [bilhetes, setBilhetes] = useState([
      {
        selecionado: false,
        antecipado: true,
        tipo: 'Bilhete antecipado',
        desconto: '9,99',
        preco: '19,99',
        descricao: 'For the new marketer on a budget who just wants basci tracking..',
      },
      {
        selecionado: true,
        antecipado: false,
        tipo: 'Básico',
        preco: '19,99',
        descricao: 'For the new marketer on a budget who just wants basci tracking..',
      },
      {
        selecionado: false,
        antecipado: false,
        tipo: 'Premium',
        preco: '29,99',
        descricao: 'Perfect for professionals and small businesses in need of significant Al integration..',
      }
    ]);

    const handleSelecionarBilhete = (index) => {
      const updatedBilhetes = bilhetes.map((bilhete, i) => ({
        ...bilhete,
        selecionado: i === index
      }));
      setBilhetes(updatedBilhetes);
      setBilhete({
        preco: bilhetes[index].preco,
        tipo: bilhetes[index].tipo,
        descricao: bilhetes[index].descricao,
      });
    };

    const [metodos, setMetodos] = useState([true, false]);

    const handleSelecionarMetodo = (index) => {
      const updatedMetodos = metodos.map((metodo, i) => (
        i === index
      ));
      setMetodos(updatedMetodos);
    };


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
        document.title = 'Pagamento';
        animacoes();
        window.addEventListener('scroll', animacoes);
        return () => {
          window.removeEventListener('scroll', animacoes);
        };
    }, []);

    // Inputs e Variaveis
    const [page, setPage] = useState(1);
    const proximaPagina = () => {
      setPage(page+1);
    }
    const voltarPagina = () => {
      setPage(page-1);
    }

    // Informações do cliente
    const nomeCookie = getCookie('nome') || '';
    const emailCookie = getCookie('email') || '';
    const telefoneCookie = getCookie('telefone') || '';
    const cepCookie = getCookie('cep') || '';

    const [inputNome, setInputNome] = useState(nomeCookie);
    const [inputEmail, setInputEmail] = useState(emailCookie);
    const [inputTelefone, setInputTelefone] = useState(telefoneCookie);
    const [inputCEP, setInputCEP] = useState(cepCookie);
    const [consultaCEP, setConsultaCEP] = useState(false);
    const [consultaEMAIL, setConsultaEMAIL] = useState(false);
    const [consultaTELEFONE, setConsultaTELEFONE] = useState(false);

    // Método de pagamento do cliente
    const [metodoPagamento, setMetodoPagamento] = useState('pix');
    const [bilhete, setBilhete] = useState({});

    // Formatar CEP
    const handleInputCEP = async (cep) => {
      const cepLimpo = cep.replace(/\D/g, '');
      if (cepLimpo.length > 8) {
        return;
      }
      if (cepLimpo.length === 8) {
        const cepFormatado = cepLimpo.replace(/^(\d{5})(\d{3})/, '$1-$2');
        setInputCEP(cepFormatado);
        const requisicaoCEP = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const respostaCEP = requisicaoCEP.data;
        if (respostaCEP.cep) {
          setConsultaCEP(true);
        } else if (respostaCEP.erro === "true") {
          setConsultaCEP(false);
        } else {
          setConsultaCEP(false);
        }
      } else {
        setInputCEP(cepLimpo);
        setConsultaCEP(false);
      }
    }

    // Formatar Telefone
    const handleInputTelefone = async (telefone) => {
      const formattedTelefone = telefone.replace(/\D/g, '');
      let formattedString = '';
    
      if (formattedTelefone.length > 0 && formattedTelefone.length <= 2) {
        formattedString = `(${formattedTelefone}`;
      } else if (formattedTelefone.length > 2 && formattedTelefone.length <= 7) {
        formattedString = `(${formattedTelefone.substring(0, 2)}) ${formattedTelefone.substring(2)}`;
      } else if (formattedTelefone.length > 7 && formattedTelefone.length <= 11) {
        formattedString = `(${formattedTelefone.substring(0, 2)}) ${formattedTelefone.substring(2, 7)}-${formattedTelefone.substring(7)}`;
      } else if (formattedTelefone.length > 11) {
        formattedString = `(${formattedTelefone.substring(0, 2)}) ${formattedTelefone.substring(2, 7)}-${formattedTelefone.substring(7, 11)}`;
      }
      
      if (formattedTelefone.length === 11) {
        const validando = await validatePhoneNumber(formattedString, 'BR');
        setConsultaTELEFONE(validando.isValid);
      }

      setInputTelefone(formattedString);
    };

    // Formatar E-mail
    const validateEmailRegex = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };
    
    const handleInputEmail = async (email) => {
      setInputEmail(email);
  
      // Validação básica usando regex
      const validandoEmail = validateEmailRegex(email);
      setConsultaEMAIL(validandoEmail);
    };

    // Validando dados armazenados nos cookies
    useEffect(() => {
      if (page === 2) {
        if (emailCookie) {
          handleInputEmail(emailCookie);
        }
        if (telefoneCookie) {
          handleInputTelefone(telefoneCookie);
        }
        if (cepCookie) {
          handleInputCEP(cepCookie);
        }
      }
    }, [page]);


    // Salvar dados e ir para pagamento
    const finalizarPagamento = async () => {
      try {
        // Tratando Erros
        if (!inputNome || !inputEmail || !inputTelefone || !inputCEP) {
          notifyError('Insira suas informações corretamente');
          return false;
        }
        if (!metodoPagamento) {
          notifyError('Selecione um método de pagamento');
          return false;
        }
        if (Object.keys(bilhete).length === 0) {
          notifyError('Selecione um bilhete do evento');
          return false;
        }

        // (1) Salvar dados para futuras compras e possiveis atualizações da página
        setCookie('nome', inputNome);
        setCookie('email', inputEmail);
        setCookie('telefone', inputTelefone);
        setCookie('cep', inputCEP);
        setCookie('metodoPagamento', metodoPagamento);
        setCookie('statusPagamento', 'pendente');

        // (2) Salvar compra no banco de dados como pendente
        const criandoPagamento = await criarPagamento({
          nome: inputNome,
          email: inputEmail,
          telefone: inputTelefone,
          cep: inputCEP,
          metodo: metodoPagamento,
          bilhete,
        });

        // (3) Redirecionar para o método de pagamento
        if (criandoPagamento.status === 200) {
          const uid = criandoPagamento.uid;
          console.log(uid);
        } else {
          notifyError('Houve algum erro em nosso servidor ao finalizar pagamento');
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    }
    

    return (
      <>
        <NotificationContainer />
        <main id='inicio' className='container-pagamento'>
          {/* Logo */}
          <h1 onClick={() => window.location.href = "/"} className='logo'>Logo</h1>
          
          <section className='content-pagamento'>

            <div className='info'>
              {/* Informações */}
              <h2>Bem-Vindo ao Samba Pagamentos</h2>
              
              {page === 1 ? (
                <h1>Selecione seu bilhete</h1>
              ) : page === 2 ? (
                <h1>Insira suas Informações</h1>
              ) : page === 3 ? (
                <h1>Selecione o método de pagamento</h1>
              ) : (
                <></>
              )}
              
              {/* Perguntas */}
              <div className='perguntas'>
                {perguntas.map((val, index) => (
                  <div data-animation="left" data-duration-animation={`1.${index+2}s`} className='pergunta'>
                    <div className='top' onClick={() => handleSelecionarPergunta(index)}>
                      <h2>{perguntas[index].pergunta}</h2>
                      {perguntas[index].status ? (
                        <FontAwesomeIcon icon={faMinus} className="icon" />
                      ) : (
                        <FontAwesomeIcon icon={faPlus} className="icon" />
                      )}
                    </div>
                    {perguntas[index].status && (
                      <div className='bottom'>
                        <p>{perguntas[index].resposta}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Bilhetes */}
            {page === 1 && (
              <div className='metodos'>
                {bilhetes.length > 0 ? (
                  bilhetes.map((val, index) => (
                    <div onClick={() => handleSelecionarBilhete(index)} key={index} className={`metodo ${val.selecionado && 'selecionado'} ${val.antecipado && 'bilhete-antecipado'}`}>
                      <div className='flex'>
                        <h1>{val.tipo}</h1>
                        <h2>
                          {val.desconto ? (
                            <><strong>R${val.preco}</strong> R${val.desconto} / Evento</>
                          ) : (
                            <>R${val.preco} / Evento</>
                          )}
                        </h2>
                      </div>
                      <p>{val.descricao}</p>
                    </div>
                  ))
                ) : (
                  <h1>Nenhum metodo encontrado</h1>
                )}
                <button onClick={proximaPagina}>Continuar</button>
              </div>
            )}

            {/* Metodos de pagamento */}
            {page === 2 && (
              <div className='metodos'>
                <div className='form'>
                  <div className='input'>
                    <label>
                      Nome Completo 
                      {inputNome.length === 0 ? (
                        <strong>*</strong>
                      ) : (
                        <></>
                      )}
                    </label>
                    <input onChange={(e) => setInputNome(e.target.value)} value={inputNome} type='text' placeholder='Digite seu nome completo' />
                  </div>
                  <div className='input'>
                    <label>
                      E-mail 
                      {inputEmail.length === 0 ? (
                        <strong>*</strong>
                      ) : !consultaEMAIL ? (
                        <strong>Inválido</strong>
                      ) : (
                        <></>
                      )}
                    </label>
                    <input onChange={(e) => handleInputEmail(e.target.value)} value={inputEmail} type='text' placeholder='Digite seu melhor e-mail' />
                  </div>
                  <div className='input'>
                    <label>
                      Telefone 
                      {inputTelefone.length === 0 ? (
                        <strong>*</strong>
                      ) : !consultaTELEFONE ? (
                        <strong>Inválido</strong>
                      ) : (
                        <></>
                      )}
                    </label>
                    <input onChange={(e) => handleInputTelefone(e.target.value)} value={inputTelefone} type='text' placeholder='Digite seu telefone' />
                  </div>
                  <div className='input'>
                    <label>
                      CEP 
                      {inputCEP.length === 0 ? (
                        <strong>*</strong>
                      ) : !consultaCEP ? (
                        <strong>Inválido</strong>
                      ) : (
                        <></>
                      )}
                    </label>
                    <input onChange={(e) => handleInputCEP(e.target.value)} value={inputCEP} type='text' placeholder='Digite seu cep' />
                  </div>
                </div>
                <button className={inputNome.length <= 2 || !consultaCEP || !consultaEMAIL || !consultaTELEFONE ? 'bloqueado' : ''} onClick={inputNome.length >= 3 && consultaCEP && consultaEMAIL && consultaTELEFONE ? proximaPagina : null}>Continuar</button>
                <button className='voltar' onClick={voltarPagina}>Voltar</button>
              </div>
            )}

            {/* Metodos de pagamento */}
            {page === 3 && (
              <div className='metodos'>
                <div onClick={() => {
                  handleSelecionarMetodo(0);
                  setMetodoPagamento('pix');
                }} className={`metodo ${metodos[0] && 'selecionado'}`}>
                  <div className='flex'>
                    <h1>
                      <FontAwesomeIcon icon={faPix} className='icon' />
                      Pix
                    </h1>
                  </div>
                  <p>Método de pagamento instantâneo, 24/7, via chave Pix no aplicativo do banco.</p>
                </div>
                <div onClick={() => {
                  handleSelecionarMetodo(1);
                  setMetodoPagamento('card');
                }} className={`metodo ${metodos[1] && 'selecionado'}`}>
                  <div className='flex'>
                    <h1>
                      <FontAwesomeIcon icon={faCreditCard} className='icon' />
                      Cartão de Débito / Crédito
                    </h1>
                  </div>
                  <p>Método de pagamento rápido com dados do cartão, com possibilidade de parcelamento.</p>
                </div>
                <button onClick={finalizarPagamento}>Confirmar</button>
                <button className='voltar' onClick={voltarPagina}>Voltar</button>
              </div>
            )}
          </section>

          {/* Creditos */}
          <p className='desenvolvido'>
            Copyright ©2024 | Desenvolvido por 
            <strong onClick={() => window.location.href = "https://www.instagram.com/tecvit_"}>TecVit, Inc.</strong>
          </p>
        </main>
      </>
    );
}

export default Pagamento;