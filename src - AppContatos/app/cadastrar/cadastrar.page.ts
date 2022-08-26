import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Contato } from '../class/contato';
import { ContatoService } from '../services/contato.service';

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

  constructor(private alertController: AlertController, private router: Router, private contatoService: ContatoService) { }

  ngOnInit() {
  }

  cadastrar(){
    this.dataNascimento = this.dataNascimento.split('T')[0];
    console.log(this.nome + " - " + this.telefone + " - " + this.genero + " - " + this.dataNascimento);
    if((this.validar(this.nome)) && this.validar(this.telefone)&& this.validar(this.genero)&& this.validar(this.dataNascimento)){
      let contato: Contato = new Contato(this.nome, this.telefone, this.genero, this.dataNascimento);
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
