import {CACHE_MANAGER, Inject, Injectable} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Cache } from 'cache-manager';
import {firstValueFrom} from "rxjs";

@Injectable()
export class RepositoriesService {
  constructor(private http: HttpService, @Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getAllRepositories(username: string): Promise<Observable<any[]>> {
    const url = `https://api.github.com/users/${username}/repos`;
    const dataFromCache: Observable<any[]> = await this.cacheManager.get(username);

    if (dataFromCache) {
      console.log('Data received from Cache');
      return dataFromCache;
    }

    const dataFromGitHub = await firstValueFrom(this.http.get(url).pipe(
        map((response) => response.data),
    ));

    await this.cacheManager.set(username, dataFromGitHub, { ttl: 100 });

    console.log('Data received from GitHub');

    return dataFromGitHub;
  }
}
