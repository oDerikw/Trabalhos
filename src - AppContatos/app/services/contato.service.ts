import { Injectable } from '@angular/core';
import { Contato } from '../models/contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  private _contatos : Contato[] = []
  constructor() {
    let contato = new Contato("Teste", 998785415, "Masculino", "1986-12-08");
    this.inserir(contato);
   }

  public get contatos(): Contato[]{
    return this._contatos;
  }

  public inserir(contato: Contato){
    this._contatos.push(contato);
  }

  public editar(contato: Contato, nome:string, telefone: number, genero: string, data_nascimento:string): boolean{
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

  public excluir(contato: Contato): boolean{
    for(let i=0; i<this._contatos.length; i++){
      if(this._contatos[i].id == contato.id){
        this._contatos.splice(i, 1);
        return true;
      }
    }
    return false;
  }

}
