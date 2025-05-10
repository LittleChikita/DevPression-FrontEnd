import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import {HttpClient,HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-table',
  imports: [MatTableModule, HttpClientModule, CommonModule,FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  dados: any[] = [];
  colunas: string[] = ['id', 'nome','descricao', 'imagem'];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/produtos')
      .subscribe(res => {
        this.dados = res;
      });
  }

  novoProduto = {
    id : '',
    nome: '',
    descricao: '',
    imagem: ''
  };

  addProduto() {
    this.http.post<any>('http://localhost:3000/produtos', this.novoProduto)
      .subscribe(response => {
        console.log('Produto adicionado:', response);
        this.dados.push(response);
        this.novoProduto = { id: '',nome: '', descricao: '', imagem: '' };
      });
  }

  produtoSelecionado: any = null;

  selecionarProduto(produto: any) {
    this.produtoSelecionado = produto;
  }

  excluirProduto(produto: any) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.http.delete<any>(`http://localhost:3000/produtos/${produto.id}`)
        .subscribe(response => {
          console.log('Produto excluído:', response);
          this.dados = this.dados.filter(p => p.id !== produto.id);
          this.produtoSelecionado = null;
        });
    }
  }


}
