import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MoviesModule } from './movies/movies.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { HttpFetchService } from './common/http-fetch/http-fetch.service';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    ServeStaticModule.forRoot({
      rootPath:
        process.env.NODE_ENV === 'production'
          ? join(__dirname, 'dist')
          : join(__dirname, 'public'),
      exclude: ['/api*'],
    }),
    MoviesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, HttpFetchService],
})
export class AppModule {}
