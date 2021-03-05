import React, { useRef, useEffect, useState, useContext } from 'react'
import PassageiroContext from '../../../contexts/PassageiroContext'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'

const ModalCriaEdita = props => {

    const passageiroService = useContext(PassageiroContext)

    const [id, setId] = useState(null)
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [endereco, setEndereco] = useState('')
    const [loading, setLoading] = useState(false)

    const modal = useRef(null)

    const renderLoading = () => {
        if(!loading){
            return null
        }

        return (<div class="progress">
            <div class="indeterminate"></div>
        </div>)
    }

    useEffect(() => {
        
        document.addEventListener('edita-motoristas', e => {
            let { _id, nome, email, endereco } = e.detail.data
            setId(_id)
            setNome(nome)
            setEmail(email)
            setEndereco(endereco)
            openModal()
        })

        document.addEventListener('cria-motoristas', e => {
            setId(null)
            setNome('')
            setEmail('')
            setEndereco('')
            openModal()
        })

    }, [])

    const openModal = () => {
        const instance = M.Modal.init(modal.current, {})
        if(instance){
            instance.open()
        }
        setTimeout(() => {
            M.updateTextFields()
        }, 100)

    }

    const closeModal = () => {
        const instance = M.Modal.init(modal.current, {})
        if(instance){
            instance.close()
        }
        
        setTimeout(() => {
            M.updateTextFields()
        }, 100)
    }

    const doSave = async e => {
        e.preventDefault()
        setLoading(true)
        await passageiroService.salvarPassageiro({ id, nome, email, endereco })
        closeModal()
        setLoading(false)
        await props.listaPassageiros()
    }


    return (<div>
        <div ref={modal} className="modal">
            <div className="modal-content">
                <div className="row">
                    <div className="input-field col s6">
                        <input value={nome} onChange={e => setNome(e.target.value)} id="name" type="text" className="validate" />
                        <label htmlFor="name">Nome</label>
                    </div>
                    <div className="input-field col s6">
                        <input id="email" value={email} onChange={e => setEmail(e.target.value)} type="email" className="validate" />
                        <label htmlFor="email">Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <input value={endereco} id="endereco" onChange={e => setEndereco(e.target.value)} type="text" className="validate" />
                        <label htmlFor="endereco">Endereço</label>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <a href="#" onClick={e => doSave(e)} className="waves-effect waves-green btn-flat">Salvar</a>
            </div>
            {renderLoading()}
        </div>
    </div>)

}

export default ModalCriaEdita
