import React, {Component} from 'react';
import * as actions from '../redux/actions/index'
import { connect } from 'react-redux'
import store from '../redux/store'


class HttpService extends Component {

    user = null

    setUser = user => this.user = user
    apiUrl = 'http://localhost:4200'

    doFetch = async ({url, method, data}) => {
        let request = this.generateRequestObject(url, method, data)

        let response = await fetch(request)
        let status = response.status

        if(status == 401){
            this.user.logout()
            return
        }

        if(status == 403){
            let user = await this._renewUser()
            await this.user.login(user)
            return await this.doFetch({url, method, data})

        }

        response = await response.json()
        return response

    }


    _renewUser = () => {
        return new Promise(async (success, reject) => {
            const params = {
                url: '/usuarios/refresh',
                method: 'post',
                data: {
                  email: this.user.getEmail(),
                  refreshToken: this.user.getRefreshToken()
                }
            }

            const {url, method, data} = params
            let request = this.generateRequestObject(url, method, data)
            let response = await fetch(request)
            response = await response.json()

            success(response)
        })
    }

    generateRequestObject = (url, method = 'get', data = {}) => {
        
        let reqJsonObj = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'jwt': this.user.getJwt()
            }
        }

        if(method == 'post' || method == 'put'){
            reqJsonObj = {
                ...reqJsonObj,
                body: JSON.stringify({
                    ...data
                }),
            }
        }

        const request = new Request(this.apiUrl + url, reqJsonObj)
        return request
    }

    loginUser = async ({email, password}) => {
        const params = {
            url: '/usuarios',
            method: 'post',
            data: {
                email,
                senha: password
            }
        }
        
        let newUser = await this.doFetch(params)
        this.user.login(newUser)
    }

    registerUser = async ({name, email, password}) => {
        const params = {
            url: '/usuarios/salvar',
            method: 'post',
            data: {
                nome:name,
                email,
                senha: password
            }

        }
        
        let newUser = await this.doFetch(params)
        this.user.login(newUser)
    }

    getJwt = () => this.user.getJwt()

    setJwt = jwt => this.user.setJwt(jwt)


}

export default HttpService

