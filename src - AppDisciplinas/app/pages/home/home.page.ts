import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Disciplina } from 'src/app/models/disciplina';
import { DisciplinaService } from 'src/app/services/disciplina.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  disciplinas: Disciplina[];
  
  constructor(private router: Router, private disciplinaService :DisciplinaService) {
    
    this.disciplinas = this.disciplinaService.disciplinas;
  }
  irParaCadastrar(){
    this.router.navigate(["/cadastrar"]);
  }
  irParaDetalhar(disciplina:Disciplina){
    
    this.router.navigateByUrl("/detalhar", {state: {objeto:disciplina}});
  }

}
