import * as mongoose from "mongoose";

export const MotoristaSchema = new mongoose.Schema({
    nome: {type: String},
    email: {type: String, unique: true},
    endereco: {type: String}
}, {timestamps: true, collection: 'motoristas'});