import { Aluno } from "./aluno";

export interface Presenca {
    nomeAluno?: string;
    emailAluno: string;
    empresa?: string;
    confirmadoEm: string;
    aluno?: Aluno;
}