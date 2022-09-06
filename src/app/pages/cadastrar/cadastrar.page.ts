import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DisciplinaService } from 'src/app/services/disciplina.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  form_cadastrar : FormGroup;
  isSubmitted: boolean = false;
  data: string;
  constructor(private alertController: AlertController, private router: Router,
     private disciplinaService: DisciplinaService, private formBuilder:FormBuilder) {}

  ngOnInit() {
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

  get errorControl(){
    return this.form_cadastrar.controls;
  }

  submitForm() : boolean{
    this.isSubmitted = true;
    if(!this.form_cadastrar.valid){
      this.presentAlert("Disciplinas", "Erro", "Todos os campos devem ser preenchidos.");
      return false;
    }else{
      this.cadastrar();
    }
  }

  private cadastrar(){
    
    this.disciplinaService.inserir(this.form_cadastrar.value);
    this.presentAlert("Disciplinas", "Sucesso", "Disciplina cadastrado!");
    this.router.navigate(["/home"]);
    
  }
  
  async presentAlert(header: string, subHeader: string, message:string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
  irParaHome(){
    this.router.navigate(["/home"]);
  }
}

