import React, {useRef, useEffect, useState, useContext} from 'react'
import MotoristaContext from '../../../contexts/MotoristaContext'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'

const ModalDelete = props => {

    const motoristaService = useContext(MotoristaContext)
    
    const [id, setId] = useState('')
    const [nome, setNome] = useState('')
    const [loading, setLoading] = useState(false)

    const modal = useRef(null)
    let instance 

    useEffect(() => {
        instance = M.Modal.init(modal.current, {})
        document.addEventListener('deleta-motoristas', e => {
            setId(e.detail.data._id)
            setNome(e.detail.data.nome)
            openModal()
        })
       
    }, [])

    const renderLoading = () => {
        if(!loading){
            return null
        }

        return (<div class="progress">
            <div class="indeterminate"></div>
        </div>)
    }

    const openModal = () => {
        instance.open()
        M.updateTextFields()
    }

    const doDelete = async e => {
        e.preventDefault()
        setLoading(true)
        await motoristaService.deleteMotorista({ id })
        closeModal()
        setLoading(false)
        await props.listaMotoristas()  
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

    return (<div>
        <div ref={modal} className="modal">
            <div className="modal-content">
                <p>Deseja realmente apagar os dados do motorista {nome} ?</p>
            </div>
            <div className="modal-footer">
                <a onClick={e => doDelete(e)} href="#" className="waves-effect waves-green btn-flat">Deletar</a>
            </div>
            {renderLoading()}
        </div>
    </div>)

}

export default ModalDelete
