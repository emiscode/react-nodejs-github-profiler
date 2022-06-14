import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { RepositoriesController } from './controllers/repositories.controller';
import { RepositoriesService } from './services/repositories.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController, RepositoriesController],
  providers: [AppService, RepositoriesService],
})
export class AppModule {}