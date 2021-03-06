import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../components/index/navbar'
import { connect } from 'react-redux'
import Tabela from '../components/misc/tabela'
import ModalCriaEdita from '../components/admin/motoristas/modalCriaEdita'
import ModalDeleta from '../components/admin/motoristas/modalDelete'
import MotoristaContext from '../contexts/MotoristaContext'

const MotoristaPage = props => {

    const motoristaService = useContext(MotoristaContext)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const campos = [
        {
            name: 'nome',
            label: 'Nome'
        },
        {
            name: 'email',
            label: 'E-mail'
        },
        {
            name: 'endereco',
            label: 'Endereco'
        },
        {
            name: 'actions',
            label: 'Ações'
        },
    ]

    const listaMotoristas = async () => {
        setLoading(true)
        const data = await motoristaService.getMotoristas()
        setData(data)
        setLoading(false)
    }

    useEffect(async () => {
        await listaMotoristas()
    }, [])

    // const ativaLoading = l => setLoading(l)

    const openModalNew = ev => {
        ev.preventDefault()
        const e = new CustomEvent('cria-motoristas')
        document.dispatchEvent(e)
    }

    return (<div>
        <NavBar {...props}/>
        <div className="container">
            <h4>Motoristas</h4>
            <a className="waves-effect right" onClick={e => openModalNew(e)}><i className="medium material-icons">add_box</i></a>
            <Tabela campos={campos} data={data} loading={loading} eventName="motoristas" />
            <ModalCriaEdita listaMotoristas={() => listaMotoristas()} />
            <ModalDeleta listaMotoristas={() => listaMotoristas()} />
        </div>
    </div>)
}

const mapStateToProps = state => {
    return {
        usuario: state.autenticacao.usuario
    }
}

export default connect(mapStateToProps)(MotoristaPage)