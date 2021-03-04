import React, { useContext, useEffect, useReducer } from 'react'

const Tabela = props => {

    const { campos, data, eventName, loading } = props
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0)

    useEffect(() => {
        document.addEventListener('atualiza-tabela', () => {
            forceUpdate()
        })
    }, [])

    const geraCabecalho = () => {
        let lista = campos.map(campo => (<th>{campo.label}</th>))
        return (
            <thead>
                <tr>
                    {lista}
                </tr>
            </thead>
        )
    }

    const onClickEdit = linha => {
        const e = new CustomEvent('edita-' + eventName, {
            detail: {
                data: linha
            }

        })
        document.dispatchEvent(e)
    }

    const onClickDelete = linha => {
        const e = new CustomEvent('deleta-' + eventName, {
            detail: {
                data: linha
            }

        })
        document.dispatchEvent(e)
    }



    const geraItens = () => {
        let itens = data.map(linha => {
            let item = campos.map(campo => {
                if (campo.name == 'actions') {
                    return (<td>
                        <a onClick={() => onClickEdit(linha)} className="waves-effect waves-teal btn-flat"><i className="material-icons">edit</i></a>
                        <a onClick={() => onClickDelete(linha)} className="waves-effect waves-teal btn-flat"><i className="material-icons">delete</i></a>
                    </td>)
                }
                return (<td>{linha[campo.name]}</td>)

            })
            return (<tr>{item}</tr>)
        })

        return (<tbody>{itens}</tbody>)


    }

    const loader = () => {
        if (loading) {
            return (
                <div class="progress">
                    <div style={{
                        width: '100%'
                    }} class="indeterminate"></div>
                </div>)
        }

        return null
    }

    const geraTabela = () => (<div>
        <table className="highlight responsive-table">
            {geraCabecalho()}
            {geraItens()}
            
        </table>
        {loader()}
    </div>
    )

    return geraTabela()


}

export default Tabela