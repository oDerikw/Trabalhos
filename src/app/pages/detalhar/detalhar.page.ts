/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/quotes */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Disciplina } from 'src/app/models/disciplina';
import { DisciplinaService } from 'src/app/services/disciplina.service';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  disciplina : Disciplina;
  form_cadastrar : FormGroup;
  isSubmitted: boolean = false;
  data: string;
  edicao: boolean = true;

  constructor(private alertController: AlertController,
    private router: Router,
    private disciplinaService: DisciplinaService,
    private formBuilder:FormBuilder) { }

    // nome: [this.contato.nome, [Validators.required]],

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    this.disciplina = nav.extras.state.objeto;
    this.data= new Date().toISOString();
    this.form_cadastrar = this.formBuilder.group({
      nome: ["", [Validators.required]],
      cargaHoraria: ["", [Validators.required]],
      natureza: ["", [Validators.required]],
      dataInicio: ["", [Validators.required]],
      dataFim: ["", [Validators.required]],
      vagas: ["", [Validators.required]],
      modalidade: ["", [Validators.required]],
      professor: ["", [Validators.required]]
    });
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
    if((this.validar(this.disciplina.nome)) && this.validar(this.disciplina.cargaHoraria) &&
    this.validar(this.disciplina.natureza) && this.validar(this.disciplina.dataInicio)
    && this.validar(this.disciplina.dataFim) && this.validar(this.disciplina.vagas)
    && this.validar(this.disciplina.modalidade) && this.validar(this.disciplina.professor)){
      if(this.disciplinaService.editar(this.disciplina,
        this.disciplina.nome, this.disciplina.cargaHoraria, this.disciplina.natureza,
        this.disciplina.dataInicio, this.disciplina.dataFim, this.disciplina.vagas,
        this.disciplina.modalidade, this.disciplina.professor)){
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
    if(this.disciplinaService.excluir(this.disciplina)){
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
