import {Platform} from 'react-native';

const loginCommunication = async (user, password) => {
  //   console.warn(user, password);
  let url = '';
  Platform.OS === 'ios' ? (url = 'localhost') : (url = '10.0.2.2');
  const headerHTTP = {
    method: 'POST',
    body: JSON.stringify({
      userName: user,
      password: password,
    }),
    headers: {
      "content-type": 'application/json',
    },
  };
  const resposta = await fetch(`http://${url}:3030/users/login`, headerHTTP);

  console.warn(resposta);
  if (resposta.ok) {
    console.warn('logando');
  } else {
    throw new Error('Erro ao tentar logar, usuário não encontrado');
  }
};

export default loginCommunication;
