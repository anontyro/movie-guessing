import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MoviesController } from './movies.controller';
@Module({
  imports: [ConfigModule],
  controllers: [MoviesController],
  // providers: [{ provide: APP_GUARD, useClass: ApiKeyGuard }],
})
export class MoviesModule {}
