import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { ApiKeyGuard } from './api-key.guard';

describe('ApiKeyGuard', () => {
  it('should be defined', () => {
    const config = {
      get: jest.fn(),
    } as unknown as ConfigService;

    const reflactor = {
      get: jest.fn(),
    } as unknown as Reflector;

    expect(new ApiKeyGuard(reflactor, config)).toBeDefined();
  });
});
