import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Contato } from 'src/app/models/contato';
import { ContatoService } from 'src/app/services/contato.service';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  contato: Contato;
  nome: string;
  telefone: number;
  genero: string;
  dataNascimento: string;
  data: string;
  edicao: boolean = true;

  constructor(private alertController: AlertController, 
    private router: Router, 
    private contatoService: ContatoService) { }

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    this.contato = nav.extras.state.objeto;
    this.data = new Date().toISOString();
    this.nome = this.contato.nome; // nome: [this.contato.nome, [Validators.required]],
    this.telefone = this.contato.telefone;
    this.genero = this.contato.genero;
    this.dataNascimento = this.contato.dataNascimento;
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

  async presentAlertConfirm(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
            this.excluirContato();
          },
        },
      ],
    });
    await alert.present();
  }

  alterarEdicao(){
    if(this.edicao == true){
      this.edicao = false;
    }else{
      this.edicao = true;
    }
  }

  private validar(campo: any): boolean{
    if(!campo){
      return false;
    }
    return true;
  }

  editar(){
    this.dataNascimento = this.dataNascimento.split('T')[0];
    if((this.validar(this.nome)) && this.validar(this.telefone) && 
    this.validar(this.genero) && this.validar(this.dataNascimento)){
      if(this.contatoService.editar(this.contato, 
        this.nome, this.telefone, this.genero, this.dataNascimento)){
          this.presentAlert("Agenda", "Sucesso", "Cadastro realizado com sucesso!");
          this.router.navigate(["/home"]);
      }else{
        this.presentAlert("Agenda", "Error", "Contato não encontrado!");
      }
    }
    else{
      this.presentAlert("Agenda", "Error", "Campos não preenchidos!");
      console.log("ERROR - Campos não preenchidos!");
    }
  }

  excluir(){
    this.presentAlertConfirm("Agenda","Excluir Contato",
    "Você realmente deseja excluir o contato?");
  }

  private excluirContato(){
    if(this.contatoService.excluir(this.contato)){
      this.presentAlert("Agenda","Excluir","Exclusão realizada!");
      this.router.navigate(["/home"]);
    }
    else{
      this.presentAlert("Agenda","Excluir","Contato não encontrado!");
    }
  }

  irParaHome(){
    this.router.navigate(["/home"]);
  }
}