// pecas.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Peca {
  id: number;
  nome: string;
  quantidade: number;
}

@Injectable({
  providedIn: 'root'
})
export class PecasService {
  private apiUrl = 'http://localhost:3000/produtos';

  constructor(private http: HttpClient) {}

  atualizarPeca(peca: Peca): Observable<Peca> {
    return this.http.put<Peca>(`${this.apiUrl}/${peca.id}`, peca);
  }

  atualizarParcial(id: number, dadosParciais: Partial<Peca>): Observable<Peca> {
    return this.http.patch<Peca>(`${this.apiUrl}/${id}`, dadosParciais);
  }
}
