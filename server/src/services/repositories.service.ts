import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class RepositoriesService {
  constructor(private http: HttpService) {}

  getAllRepositories(username: string): Observable<any[]> {
    const url = `https://api.github.com/users/${username}/repos`;

    return this.http.get(url).pipe(
      map((response) => response.data),
    );
  }
}
