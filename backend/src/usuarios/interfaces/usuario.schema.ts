import * as mongoose from "mongoose";

export const UsuarioSchema = new mongoose.Schema({
    nome: {type: String},
    email: {type: String, unique: true, required: true},
    senha: {type: String, required: true, select: false},
    refreshToken: {type: String, required: true, select: false},
    refreshTokenValidity: {type: Date},
    endereco: {type: String}
}, {timestamps: true, collection: 'usuarios'});