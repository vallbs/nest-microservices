import { Body, Controller, Delete, Get, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log(
      'SOA> 🚀 ~ UsersController ~ create ~ createUserDto:',
      createUserDto,
    );
    return this.usersService.create(createUserDto);
  }

  @Get()
  getAll() {
    return this.usersService.findAll();
  }
  @Delete(':id')
  delete(@Req() req: Request) {
    const userId = req.params.id;
    console.log('🚀 ~ UsersController ~ delete ~ id:', userId);
    return this.usersService.delete(userId);
  }
}
