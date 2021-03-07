import { Document } from 'mongoose';

export interface Usuario extends Document {
    
    readonly id: string;
    nome: string;
    email: string;
    endereco: string;
    
}