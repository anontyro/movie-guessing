import { Controller, Get, UseGuards } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiKeyGuard } from './guards/api-key.guard';

@Controller('movies')
@UseGuards(ApiKeyGuard)
export class MoviesController {
  @Public()
  @Get()
  testGet() {
    return 'test';
  }

  @Get('auth')
  authRoute() {
    return 'authorized';
  }
}
