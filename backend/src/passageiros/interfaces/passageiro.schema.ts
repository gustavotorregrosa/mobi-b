import * as mongoose from "mongoose";

export const PassageiroSchema = new mongoose.Schema({
    nome: {type: String},
    email: {type: String, unique: true},
    endereco: {type: String}
}, {timestamps: true, collection: 'passageiros'});