import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, MatSelectModule, FormsModule, MatInputModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
  opcaoSelecionada: string = '';
  opcoes: any[] = [];

  produtoEditado: any = {
    nome: '',
    preco: 0
  };

  onSelecionarProduto(): void {
    const produto = this.opcoes.find(p => p.id === parseInt(this.opcaoSelecionada));
    if (produto) {
      this.produtoEditado = { ...produto };
    }
  }


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/produtos')
      .subscribe(res => {
        this.opcoes = res;
      });
  }
  excluirProduto(): void {
    if (this.opcaoSelecionada) {
      const confirmacao = window.confirm('Tem certeza de que deseja excluir este produto?');
      if (confirmacao) {
        this.http.delete(`http://localhost:3000/produtos/${this.opcaoSelecionada}`)
          .subscribe(() => {
            this.opcoes = this.opcoes.filter(produto => produto.id !== parseInt(this.opcaoSelecionada));
            this.opcaoSelecionada = '';
          });
      }
    } else {
      alert('Selecione um produto para excluir.');
    }
  }

  atualizarProduto(): void {
    if (this.opcaoSelecionada) {
      this.http.put(`http://localhost:3000/produtos/${this.opcaoSelecionada}`, this.produtoEditado)
        .subscribe(() => {
          alert('Produto atualizado com sucesso!');
          const index = this.opcoes.findIndex(p => p.id === parseInt(this.opcaoSelecionada));
          if (index !== -1) {
            this.opcoes[index] = { ...this.produtoEditado };
          }
        });
    }
  }

}

