import './style.css'
import Lixeira from '../../assets/lixeira.png'

function Home() {
  const usuarios = [{
    id: '1id',
    nome: 'Rapha',
    idade: 17,
    email: 'rapha@gmail.com'
  }, {
    id: '2id',
    nome: 'Jack',
    idade: 3,
    email: 'jack@gmail.com'
  }]
  return (
    <div className='container'>

      <form action="">
        <h1>Cadastro de Usuários</h1>
        <input name='nome' type='text' />
        <input name='idade' type='number' />
        <input name='email' type='email' />
        <button type='button'>Cadastrar</button>
      </form>

      {usuarios.map(usuario => (
        <div key={usuario.id} className='card'>
          <div>
            <p>Nome: {usuario.nome}</p>
            <p>Idade: {usuario.idade}</p>
            <p>Email: {usuario.email}</p>
          </div>

          <button>
            <img src={Lixeira} />
          </button>
        </div>
      ))}

    </div>
  )
}

export default Home