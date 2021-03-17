import React, { Component, useState } from 'react';

class MotoristaService extends Component {

    http = null

    setHttp = http => this.http = http

    // constructor(props) {
    //     super(props)
    // }

    getMotoristas = async () => {
        const params = {
            url: '/motoristas',
            method: 'get'
        }

        let motoristas = await this.http.doFetch(params)
        await this.espera(1000)
        return motoristas
    }

    espera = async t => new Promise((success, reject) => {
        setTimeout(() => {
            success()
        }, t)
    }) 


    deleteMotorista = async (motorista) => {
        let params = {
            url: '/motoristas/' + motorista.id,
            method: 'delete'
        }
        await this.espera(1000)
        let dataMotorista = await this.http.doFetch(params)
        return dataMotorista
    }

    salvaMotorista = async (motorista) => {
        let params = {
            url: '/motoristas',
            method: 'post',
            data: { ...motorista }
        }
        if(motorista.id){
            params = {
                ...params,
                method: 'put',
                url: '/motoristas/' + motorista.id
            }
        }
        
        let dataMotorista = await this.http.doFetch(params)
        await this.espera(1000)

        return dataMotorista
    }
}

export default MotoristaService