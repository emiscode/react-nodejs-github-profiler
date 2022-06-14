import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs/internal/Observable';
import { RepositoriesService } from 'src/services/repositories.service';

@Controller('repositories')
export class RepositoriesController {
  constructor(private readonly repositoryService: RepositoriesService) {}

  @Get()
  getAllRepositories(): Observable<any[]> {
    return this.repositoryService.getAllRepositories();
  }
}
