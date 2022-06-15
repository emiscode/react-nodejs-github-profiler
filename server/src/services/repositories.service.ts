import {CACHE_MANAGER, Inject, Injectable} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {map} from 'rxjs/operators';
import {Cache} from 'cache-manager';
import {firstValueFrom} from "rxjs";
import {UserInfo} from "../types/UserInfo";

@Injectable()
export class RepositoriesService {
    constructor(private http: HttpService, @Inject(CACHE_MANAGER) private cacheManager: Cache) {
    }

    async getAllRepositories(username: string): Promise<UserInfo> {
        try {
            const dataFromCache: UserInfo = await this.cacheManager.get(username);

            if (dataFromCache) {
                console.log('Data received from Cache');
                return dataFromCache;
            }

            const url = `https://api.github.com/users/${username}/repos`;
            const dataFromGitHub = await firstValueFrom(this.http.get(url).pipe(
                map((response) => response.data),
            ));

            if (dataFromGitHub && dataFromGitHub.length) {
                const userInfo = {
                    picture: dataFromGitHub[0].owner.avatar_url,
                    stars: dataFromGitHub
                        .map((repo: { stargazers_count: number; }) => repo.stargazers_count)
                        .reduce((previous: number, current: number) => previous + current, 0),
                }

                await this.cacheManager.set(username, userInfo, {ttl: 100});
                console.log('Data received from GitHub');
                return userInfo;
            }
        } catch (error) {
            console.error(`Error: `, error.code);
            return null;
        }

        return null;
    }
}
