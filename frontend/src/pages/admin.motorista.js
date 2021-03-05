import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../components/index/navbar'
import { connect } from 'react-redux'
import Tabela from '../components/misc/tabela'
import ModalCriaEdita from '../components/admin/passageiros/modalCriaEdita'
import ModalDeleta from '../components/admin/passageiros/modalDelete'
import PassageiroContext from '../contexts/PassageiroContext'

const MotoristaPage = props => {

    const passageiroService = useContext(PassageiroContext)
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

    const listaPassageiros = async () => {
        setLoading(true)
        const data = await passageiroService.getPassageiros()
        setData(data)
        setLoading(false)
    }

    useEffect(async () => {
        await listaPassageiros()
    }, [])

    // const ativaLoading = l => setLoading(l)

    const openModalNew = ev => {
        ev.preventDefault()
        const e = new CustomEvent('cria-passageiros')
        document.dispatchEvent(e)
    }

    return (<div>
        <NavBar />
        <div className="container">
            <h4>Passageiros</h4>
            <a className="waves-effect right" onClick={e => openModalNew(e)}><i className="medium material-icons">add_box</i></a>
            <Tabela campos={campos} data={data} loading={loading} eventName="passageiros" />
            <ModalCriaEdita listaPassageiros={() => listaPassageiros()} />
            <ModalDeleta listaPassageiros={() => listaPassageiros()} />
        </div>
    </div>)
}

const mapStateToProps = state => {
    return {
        usuario: state.autenticacao.usuario
    }
}

export default connect(mapStateToProps)(MotoristaPage)