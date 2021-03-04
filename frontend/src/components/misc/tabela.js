import React, { useContext, useEffect, useReducer, useState } from 'react'

const Tabela = props => {

    const { campos, data, eventName, loading } = props
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0)

    const [mPaginacao, setmPaginacao] = useState({})
    const numItensPorPag = 5

    useEffect(() => {
        document.addEventListener('atualiza-tabela', () => {
            forceUpdate()
        })


        let mPaginacao = {
            min: 1,
            max: Math.ceil(data.length / numItensPorPag),
            current: 1
        }

        setmPaginacao(mPaginacao)

    }, [data])

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

    const geraPaginacao = () => {

        let leftChev = (<li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>)
        if(mPaginacao.current > 1){
            leftChev = (<li className="waves-effect"><a href="#!"><i className="material-icons">chevron_left</i></a></li>)
        }

        let rightChev = (<li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>)
        if(mPaginacao.current == mPaginacao.max){
            rightChev = (<li className="disabled"><a href="#!"><i className="material-icons">chevron_right</i></a></li>)
        }

        let itensPaginacao = []
        for (let index = 1; index <= mPaginacao.max; ++index) {
            let item = (<li className="waves-effect"><a href="#!">{index}</a></li>)
            if(index == mPaginacao.current){
                item = (<li className="active black"><a href="#!">{index}</a></li>)
            }
            itensPaginacao.push(item)
        }

        return (<ul className="pagination">
            {leftChev}
            {itensPaginacao}
            {rightChev}    
        </ul>
                      
        )
    }

    const geraTabela = () => (<div>
        <table className="highlight responsive-table">
            {geraCabecalho()}
            {geraItens()}
               
        </table>
        {loader()}
        {geraPaginacao()}
    </div>
    )

    return geraTabela()


}

export default Tabela