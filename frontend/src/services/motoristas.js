import React, { Component, useState } from 'react';

class MotoristaService extends Component {

    http = null

    setHttp = http => this.http = http

    // constructor(props) {
    //     super(props)
    // }

    getPassageiros = async () => {
        const params = {
            url: '/motorista',
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
        await this.espera(3000)
        let dataMotorista = await this.http.doFetch(params)
        return dataMotorista
    }

    salvarMotorista = async (motorista) => {
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