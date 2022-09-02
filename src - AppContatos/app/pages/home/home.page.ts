import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Contato } from '../../models/contato';
import { ContatoService } from '../../services/contato.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  contatos: Contato[];

  constructor(private router: Router, private contatoService: ContatoService, private alertController: AlertController) {
      this.contatos = this.contatoService.contatos;
  }
  
  irParaCadastrar(){
    this.router.navigate(["/cadastrar"]);
  }

  irParaDetalhar(contato: Contato){
    this.router.navigateByUrl("/detalhar",
    {state: {objeto:contato}});
  }

  async presentAlert(contato: Contato) {
    const alert = await this.alertController.create({
      header: 'Informações',
      message: "Nome: " + contato.nome + "<br/>"
      + "Telefone: " + contato.telefone + "<br/>"
      + "Gênero: " + contato.genero + "<br/>"
      + "Data de nascimento: " + contato.dataNascimento,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
