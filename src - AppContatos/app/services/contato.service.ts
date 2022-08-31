/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable prefer-const */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Aula } from '../models/aula';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  private _contatos : Aula[] = []
  constructor() {
    let contato = new Aula("Teste", 998785415, "Masculino", "1986-12-08");
    this.inserir(contato);
   }

  public get contatos(): Aula[]{
    return this._contatos;
  }

  public inserir(contato: Aula){
    this._contatos.push(contato);
  }

  public editar(contato: Aula, nome:string, telefone: number, genero: string, data_nascimento:string): boolean{
    for(let i=0; i<this._contatos.length; i++){
      if(this._contatos[i].id == contato.id){
        this._contatos[i].nome = nome;
        this._contatos[i].telefone = telefone;
        this._contatos[i].genero = genero;
        this._contatos[i].dataNascimento = data_nascimento;
        return true;
      }
    }
    return false;
  }

  public excluir(contato: Aula): boolean{
    for(let i=0; i<this._contatos.length; i++){
      if(this._contatos[i].id == contato.id){
        this._contatos.splice(i, 1);
        return true;
      }
    }
    return false;
  }

}
