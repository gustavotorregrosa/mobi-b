import React, {useRef, useEffect, useState, useContext} from 'react'
import UserContext from '../../contexts/UserContext'
import HttpContext from '../../contexts/HttpContext'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'

const LoginModal = props => {
    
    const user = useContext(UserContext)
    const http = useContext(HttpContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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

    const doLogin = async e => {
        e.preventDefault()

        await http.loginUser({email, password})
        
    }

    const changeEmail = e => {
        setEmail(e.target.value)
    }

    const changePassword = e => {
        setPassword(e.target.value)
    }

    return (<div>
        <div ref={modal} className="modal">
            <div className="modal-content">
                <div className="row">
                    <div className="input-field col s6">
                        <input value={email} onChange={e => changeEmail(e)} id="name" type="email" className="validate" />
                        <label htmlFor="name">Username</label>
                    </div>
                    <div className="input-field col s6">
                        <input id="password" value={password} onChange={e => changePassword(e)} type="password" className="validate" />
                        <label htmlFor="password">Password</label>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <a href="#" onClick={e => doLogin(e)} className="modal-close waves-effect waves-green btn-flat">Login</a>
            </div>
        </div>
    </div>)

}

export default LoginModal
