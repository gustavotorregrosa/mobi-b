import React, {useRef, useEffect, useState, useContext} from 'react'
import UserContext from '../../contexts/UserContext'
import HttpContext from '../../contexts/HttpContext'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'

const RegisterModal = props => {
    
    const user = useContext(UserContext)
    const http = useContext(HttpContext)

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmacao, setConfirmacao] = useState('')

    const modal = useRef(null)
    let instance 

    useEffect(() => {
        instance = M.Modal.init(modal.current, {})
        props.setOpenModal(openModal)
       
    }, [])

    const openModal = () => {
        instance.open()
        M.updateTextFields()
    }

    const doRegister = e => {
        e.preventDefault()
        http.registerUser({name: 'gustavo torregrosa', email: 'gustavo.torregrosa@gmail.com', password: 'gustavo01'})
    }

    const changeEmail = e => {
        setEmail(e.target.value)
    }

    const changeNome = e => {
        setNome(e.target.value)
    }

    const changeSenha = e => {
        setSenha(e.target.value)
    }

    const changeConfirmacao = e => {
        setConfirmacao(e.target.value)
    }

    return (<div>
        <div ref={modal} className="modal">
            <div className="modal-content">
                <div className="row">
                    <div className="input-field col s12">
                        <input id="name" type="text" className="validate" value={nome} onChange={e => changeNome(e)}/>
                        <label htmlFor="name">Name</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input value={email} onChange={e => changeEmail(e)} id="email" type="email" className="validate" />
                        <label htmlFor="email">E-mail</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <input id="senha" type="password" className="validate" value={senha} onChange={e => changeSenha(e)} />
                        <label htmlFor="senha">Senha</label>
                    </div>
                    <div className="input-field col s6">
                        <input id="confirmacao" type="password" className="validate" value={confirmacao} onChange={e => changeConfirmacao(e)} />
                        <label htmlFor="confirmacao">Confirmação de senha</label>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <a href="#" onClick={e => doRegister(e)} className="modal-close waves-effect waves-green btn-flat">Login</a>
            </div>
        </div>
    </div>)

}

export default RegisterModal
