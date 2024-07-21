import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import { firebaseConfig } from './firebaseConfig';
import { notifyError } from '../toastifyServer';
import { clearCookies, deleteCookie, getCookie, setCookie } from './cookies';
import Bilhetes from '../pages/Bilhetes';


const nomeLocal = getCookie('nome') || null;
const uidLocal = getCookie('uid') || null;
const emailLocal = getCookie('email') || null;

// Inicializando o Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();
const auth = firebase.auth();

const formatarNomeDeUsuario = (valor) => {
    valor = valor.replace(/\s+/g, '');
    valor = valor.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    valor = valor.replace(/[^a-zA-Z0-9]/g, '');
    return valor;
};

const coletarTurmas =  async (uid) => {
    if (!uid) {
        notifyError('Não conseguimos identificar você');
        return false;
    }
    var turmas = [];
    try {
        const turmasRef = await firestore.collection('privado')
            .doc(uid).collection('turmas').get();
        if (!turmasRef.empty) {
            const coletado = await Promise.all(turmasRef.docs.map((turma) => {
                const nomeTurma = turma.data().turma;
                const ensino = turma.data().ensino;
                const atualizada = turma.data().atualizada;
                turmas.push({
                    turma: nomeTurma,
                    ensino: ensino,
                    atualizada: atualizada,
                });
            }));
            if (coletado) {
                return turmas;
            }
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return 'erro';
    }
}

const criarPagamento = async (dados) => {
    const { nome, email, telefone, cep, metodo, bilhete } = dados;
    try {
        const pagamentoRef = await firestore.collection('pagamentos');
        const docRef = await pagamentoRef.add({
            nome,
            email,
            cep,
            telefone,
            metodo,
            data: firebase.firestore.FieldValue.serverTimestamp(),
            bilhete: bilhete,
        });
        const uid = docRef.id;
        return {
            status: 200,
            uid,
        };
    } catch (error) {
        console.log(error);
        return 'erro';
    }
}

const excluirPagamento =  async (uid, turma) => {
    if (!uid) {
        notifyError('Não conseguimos identificar você');
        return false;
    }
    try {
        const turmaRef = await firestore.collection('privado')
            .doc(uid).collection('turmas').doc(turma);
        if ((await turmaRef.get()).exists) {
            const excluindo = await turmaRef.delete();
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return 'erro';
    }
}

export { criarPagamento };