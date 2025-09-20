import { useEffect, useState, useRef } from 'react'
import './style.css'
import Lixeira from '../../assets/lixeira.png'
import Editar from '../../assets/editar.png'
import api from '../../services/api'

function Home() {
  const [usuarios, setUsuarios] = useState([])

  //o q for receber do input
  const inputNome = useRef()
  const inputIdade = useRef()
  const inputEmail = useRef()

  // vou avaliar se ta editando ou n
  const [editandoId, setEditandoId] = useState(null)

  async function getUsuarios() {
    const usuariosDaApi = await api.get('/cadastro')
    setUsuarios(usuariosDaApi.data)
    console.log(usuarios)
  }

  //cria usuario
  async function createUsuario() {
    await api.post('/cadastro', {
      nome: inputNome.current.value,
      idade: inputIdade.current.value,
      email: inputEmail.current.value
    })
    getUsuarios()
    limparInputs()
  }

  async function deleteUsuario(id) {
    await api.delete(`/cadastro/${id}`)
    getUsuarios()
  }

  async function atualizaUsuario(id) {
    await api.put(`/cadastro/${id}`, {
      nome: inputNome.current.value,
      idade: inputIdade.current.value,
      email: inputEmail.current.value
    })
    getUsuarios()
  }

  //vai colocar os dados no input para edicao
  function comecaEdicao(usuario) {
    setEditandoId(usuario.id)
    inputNome.current.value = usuario.nome
    inputIdade.current.value = usuario.idade
    inputEmail.current.value = usuario.email
  }

  function limparInputs() {
    inputNome.current.value = ''
    inputIdade.current.value = ''
    inputEmail.current.value = ''
  }

  async function atualizaUsuario() {
    if (!editandoId) return // só atualiza se tiver um usuário em edição

    //passa os novos dados que deseja salvar no usuário.
    await api.put(`/cadastro/${editandoId}`, {
      nome: inputNome.current.value,
      idade: inputIdade.current.value,
      email: inputEmail.current.value
    })
    getUsuarios()
    setEditandoId(null) // sai do modo edição
    limparInputs()
  }



  useEffect(() => {
    getUsuarios()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='container'>

      <form action="">
        <h1>Cadastro de Usuários</h1>
        <input placeholder='Digite seu nome:' name='nome' type='text' ref={inputNome} />
        <input placeholder='Digite sua idade:' name='idade' type='number' ref={inputIdade} />
        <input placeholder='Digite seu email:' name='email' type='email' ref={inputEmail} />
        
        //se tiver, faz primeira parte, senao, faz a segunda
        {editandoId ? (
          <button type='button' onClick={atualizaUsuario}>Atualizar</button>
        ) : (
          <button type='button' onClick={createUsuario}>Cadastrar</button>
        )}
      </form>

      {usuarios.map(usuario => (
        <div key={usuario.id} className='card'>
          <div>
            <p>Nome: {usuario.nome}</p>
            <p>Idade: {usuario.idade}</p>
            <p>Email: {usuario.email}</p>
          </div>

          <button onClick={() => deleteUsuario(usuario.id)}>
            <img src={Lixeira} />
          </button>

          <button onClick={() => comecaEdicao(usuario)}>
            <img src={Editar} />
          </button>

        </div>
      ))}

    </div>
  )
}

export default Home