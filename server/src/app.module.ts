import * as redisStore from 'cache-manager-redis-store';
import { CacheModule, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { RepositoriesController } from './controllers/repositories.controller';
import { RepositoriesService } from './services/repositories.service';

@Module({
  imports: [HttpModule, CacheModule.register({
    store: redisStore,
    host: 'localhost',
    port: 6379,
  })],
  controllers: [AppController, RepositoriesController],
  providers: [AppService, RepositoriesService],
})
export class AppModule {}
