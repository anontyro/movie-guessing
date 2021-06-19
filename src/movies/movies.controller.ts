import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('movies')
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
