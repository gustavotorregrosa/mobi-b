import { Document } from 'mongoose';

export interface Passageiro extends Document {
    
    readonly id: string;
    nome: string;
    email: string;
    endereco: string;
    
}