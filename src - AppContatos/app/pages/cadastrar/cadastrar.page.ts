/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable eqeqeq */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable new-parens */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Aula } from '../../models/aula';
import { ContatoService } from '../../services/contato.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  nome: string;
  telefone: number;
  genero: string;
  dataNascimento: string;
  data: String;

  constructor(private alertController: AlertController, private router: Router, private contatoService: ContatoService) { }

  ngOnInit() {
    this.data = new Date().toISOString();
  }

  cadastrar(){
    this.dataNascimento = this.dataNascimento.split('T')[0];
    if((this.validar(this.nome)) && this.validar(this.telefone)&& this.validar(this.genero)&& this.validar(this.dataNascimento)){
      let contato: Aula = new Aula(this.nome, this.telefone, this.genero, this.dataNascimento);
      this.contatoService.inserir(contato);
      this.presentAlert("Agenda", "Sucesso", "Cadastro realizado com sucesso!");
      console.log("Campos preenchidos corretamente!");
      this.router.navigate(["/home"]);
    }
    else{
      this.presentAlert("Agenda", "Error", "Campos não preenchidos!");
      console.log("ERROR - Campos não preenchidos!");
    }
  }

  async presentAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  private validar(campo: any): boolean{
    if(!campo){
      return false;
    }
    return true;
  }

  irParaHome(){
    this.router.navigate(["/home"]);
  }
}
