import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { CurrentUser } from '../decorators/current-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDocument } from './models/user.schema';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    console.log('UsersController ~ create ~ user:', user);

    return user;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getUser(@CurrentUser() user: UserDocument) {
    return user;
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
