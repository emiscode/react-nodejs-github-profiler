import {Controller, Get, Param} from '@nestjs/common';
import { RepositoriesService } from 'src/services/repositories.service';
import {UserInfo} from "../types/UserInfo";

@Controller('repositories')
export class RepositoriesController {
  constructor(private readonly repositoryService: RepositoriesService) {}

  @Get(':username')
  async getAllRepositories(@Param() params): Promise<UserInfo> {
    return this.repositoryService.getAllRepositories(params.username);
  }
}
