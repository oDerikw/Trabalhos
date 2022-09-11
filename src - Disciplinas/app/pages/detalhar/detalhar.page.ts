import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Disciplina } from 'src/app/models/disciplina';
import { Alertas } from 'src/app/utils/Alerts';
import { DisciplinaService } from 'src/app/services/disciplina.service';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  disciplina : Disciplina;
  data: string;
  edicao: boolean = true;
  form_detalhar : FormGroup;
  isSubmitted: boolean = false;

  constructor(private alertController: AlertController,
    private router: Router,
    private disciplinaService: DisciplinaService,
    private formBuilder:FormBuilder) { }

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    this.disciplina = nav.extras.state.objeto;
    this.data = new Date().toISOString();
    this.form_detalhar = this.formBuilder.group({
      nome: [this.disciplina.nome, [Validators.required]],
      cargaHoraria: [this.disciplina.cargaHoraria, [Validators.required]],
      natureza: [this.disciplina.natureza, [Validators.required]],
      dataInicio: [this.disciplina.dataInicio, [Validators.required]],
      dataFim: [this.disciplina.dataFim, [Validators.required]],
      vagas: [this.disciplina.vagas, [Validators.required]],
      modalidade: [this.disciplina.modalidade, [Validators.required]],
      professor: [this.disciplina.professor, [Validators.required]]
    });
  }

  get errorControl() {
    return this.form_detalhar.controls;
  }

  submitForm(): boolean {
    this.isSubmitted = true;
    if (!this.form_detalhar.valid) {
      this.presentAlert('Disciplina','Error','Todos os campos são Obrigatórios!');
      return false;
    } else {
      this.editar();
    }
  }

  alterarEdicao(){
    if(this.edicao == true){
      this.edicao = false;
    }else{
      this.edicao = true;
    }
  }

  editar() {
    if (!this.form_detalhar.valid) {
      this.presentAlert('Disciplina','Error','Todos os campos são Obrigatórios!');
    } else {
      if (
        this.disciplinaService.editar(
          this.disciplina,
          this.form_detalhar.value.nome,
          this.form_detalhar.value.professor,
          this.form_detalhar.value.cargaHoraria,
          this.form_detalhar.value.natureza,
          this.form_detalhar.value.dataInicio,
          this.form_detalhar.value.dataFim,
          this.form_detalhar.value.vagas,
          this.form_detalhar.value.modalidade
        )
      ) {
        this.router.navigate(['/home']);
        console.log("Date I: " + this.disciplina.dataInicio)
        console.log("Date F: " + this.disciplina.dataFim)
        this.presentAlert('Disciplina', 'Sucesso', 'A disciplina foi editada!');
      } else {
        this.presentAlert('Disciplina', 'Error', 'Disciplina não encontrado!');
      }
    }
  }

  excluir(){
    this.presentAlertConfirm("Disciplina","Excluir Disciplina",
    "Você realmente deseja excluir a disciplina?");
  }

  private excluirContato(){
    if(this.disciplinaService.excluir(this.disciplina)){
      this.presentAlert("Disciplina","Excluir","Exclusão realizada!");
      this.router.navigate(["/home"]);
    }
    else{
      this.presentAlert("Disciplina","Excluir","Contato não encontrado!");
    }
  }

  irParaHome(){
    this.router.navigate(["/home"]);
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
}
