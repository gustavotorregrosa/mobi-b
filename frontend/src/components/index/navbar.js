import React, { useRef, useEffect } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'

const IndexNavbar = props => {

    let navBarMobile = useRef(null)
    let instance
    let openLoginModal = () => {}

    useEffect(() => {
        instance = M.Sidenav.init(navBarMobile.current, {})
    }, [])

    const redirect = (e, pagina) => {
        e.preventDefault()
        props?.history?.push('/admin/' + pagina)
    }

    return (<div>
        <nav className="black">
            <div className="nav-wrapper container">
                <a href="#" className="brand-logo">Mobi-b</a>
                <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a href="#" onClick={e => redirect(e, 'passageiros')}>Passageiros</a></li>
                    <li><a href="#" onClick={e => redirect(e, 'motoristas')}>Motoristas</a></li>
                    <li><a href="#">Agendamentos</a></li>
                </ul>
            </div>
        </nav>

        <ul ref={navBarMobile} className="sidenav" id="mobile-demo">
            <li><a href="#" onClick={e => redirect(e, 'passageiros')}>Passageiros</a></li>
            <li><a href="#" onClick={e => redirect(e, 'motoristas')}>Motoristas</a></li>
            <li><a href="#">Agendamentos</a></li>
        </ul>

    </div>)
}

export default IndexNavbar