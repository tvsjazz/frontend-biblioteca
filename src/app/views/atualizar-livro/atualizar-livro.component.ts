import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LivroService } from 'src/app/services/livro.service';
import { Livro } from 'src/app/models/livro.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-atualizar-livro',
  templateUrl: './atualizar-livro.component.html',
  styleUrls: ['./atualizar-livro.component.css']
})
export class AtualizarLivroComponent implements OnInit {

  atualizarForm: FormGroup;

  livro: Livro;

  constructor(
    private livroService: LivroService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.livroService.readById(id).subscribe(data => {
      this.livro = data;
    });
    this.buildForm();
  }

  private buildForm() {
    this.atualizarForm = this.formBuilder.group({
      titulo: [null, [Validators.required]],
      autor: [null, Validators.required],
      paginas: [null, Validators.required],
      descricao: [null, Validators.required]
    });
  }

  atualizarLivro() {
    this.livroService.update(this.livro._id, this.atualizarForm.value).subscribe(dado => {
      console.log(dado);
      this.router.navigate(['/adm']);
    });
  }

  cancel(): void {
    this.router.navigate(['/adm']);
  }


}
