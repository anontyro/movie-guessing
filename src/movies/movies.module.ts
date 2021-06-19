import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { DataStoreService } from './services/data-store/data-store.service';
@Module({
  imports: [ConfigModule],
  controllers: [MoviesController],
  providers: [MoviesService, DataStoreService],
  // providers: [{ provide: APP_GUARD, useClass: ApiKeyGuard }],
})
export class MoviesModule {}
