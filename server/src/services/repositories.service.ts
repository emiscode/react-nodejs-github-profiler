import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class RepositoriesService {
  constructor(private http: HttpService) {}

  getAllRepositories(): Observable<any[]> {
    return this.http.get('https://pokeapi.co/api/v2/pokemon').pipe(
      tap((response) => console.log(response.data.results)),
      map((response) => response.data.results),
    );
  }
}
