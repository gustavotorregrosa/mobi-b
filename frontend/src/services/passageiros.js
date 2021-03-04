import React, { Component, useState } from 'react';
import * as actions from '../redux/actions/index'
import { connect } from 'react-redux'
import store from '../redux/store'

class PassageiroService extends Component {

    http = null

    setHttp = http => this.http = http

    // constructor(props) {
    //     super(props)
    // }

    getPassageiros = async () => {
        const params = {
            url: '/passageiros',
            method: 'get'
        }

        let passageiros = await this.http.doFetch(params)
        await this.espera(5000)
        return passageiros
    }

    espera = async t => new Promise((success, reject) => {
        setTimeout(() => {
            success()
        }, t)
    }) 

    deletePassageiros = async ({ id, nome }) => new Promise((success, reject) => {
        setTimeout(() => {
            let passageiros = this.state.passageiros.filter(el => el.id != id)
            this.setState({ passageiros })
            success({ id, nome })
        }, 3000)
    })


    deletePassageiro = async (passageiro) => {
        let params = {
            url: '/passageiros/' + passageiro.id,
            method: 'delete'
        }
        await this.espera(3000)
        let dataPassageiro = await this.http.doFetch(params)
        return dataPassageiro
    }

    salvarPassageiro = async (passageiro) => {
        console.log(passageiro)
        let params = {
            url: '/passageiros',
            method: 'post',
            data: { ...passageiro }
        }
        if(passageiro.id){
            params = {
                ...params,
                method: 'put',
                url: '/passageiros/' + passageiro.id
            }
        }
        
        let dataPassageiro = await this.http.doFetch(params)
        await this.espera(3000)

        return dataPassageiro
    }
}

export default PassageiroService