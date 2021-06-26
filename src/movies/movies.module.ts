import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpFetchService } from 'src/common/http-fetch/http-fetch.service';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { DataStoreService } from './services/data-store/data-store.service';
@Module({
  imports: [ConfigModule],
  controllers: [MoviesController],
  providers: [MoviesService, DataStoreService, HttpFetchService],
  // providers: [{ provide: APP_GUARD, useClass: ApiKeyGuard }],
})
export class MoviesModule {}
