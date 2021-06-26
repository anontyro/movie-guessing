import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpFetchService } from 'src/common/http-fetch/http-fetch.service';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { DataStoreService } from './services/data-store/data-store.service';
import { DataService } from './services/data-service/data-service.service';
@Module({
  imports: [ConfigModule],
  controllers: [MoviesController],
  providers: [MoviesService, DataStoreService, HttpFetchService, DataService],
  // providers: [{ provide: APP_GUARD, useClass: ApiKeyGuard }],
})
export class MoviesModule {}
