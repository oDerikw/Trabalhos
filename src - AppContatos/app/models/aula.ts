/* eslint-disable no-trailing-spaces */
/* eslint-disable new-parens */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable no-underscore-dangle */
export class Aula {
    private _id: any;
    private _materia: string;
    private _turma: string;
    private _sala: number;
    private _andar: number;
    private _predio: string;
    private _professor: string;


    private _nome: string;
    private _telefone: number;
    private _genero: string;
    private _dataNascimento: string;

    constructor(nome: string, telefone: number, genero: string, dataNascimento: string){
        let chave = new Date;
        this._id = chave.getTime();

        this._nome = nome;
        this._telefone = telefone;
        this._genero = genero;
        this._dataNascimento = dataNascimento;
    }

    // Get's //
    public get id(): any{
      return this._id;
    }
    public get nome(): string{
        return this._nome;
    }
    public get telefone(): number{
        return this._telefone;
    }
    public get genero(): string{
      return this._genero;
    }
    public get dataNascimento(): string{
      return this._dataNascimento;
    }

    // Set's //
    public set nome(nome: string){
        this._nome = nome;
    }
    public set telefone(telefone: number){
        this._telefone = telefone;
    }
    public set genero(genero: string){
      this._genero = genero;
    }
    public set dataNascimento(dataNascimento: string){
      this._dataNascimento = dataNascimento;
    }

}
