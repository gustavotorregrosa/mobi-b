import { Test, TestingModule } from '@nestjs/testing';
import { MotoristasController } from './motoristas.controller';

describe('MotoristasController', () => {
  let controller: MotoristasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MotoristasController],
    }).compile();

    controller = module.get<MotoristasController>(MotoristasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
