import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth-dto';
import { Protected } from './protected-decorator';
import { User } from 'src/custom-decorators/user-decorator';
import { UserDto } from './user-dto';
import type { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { };

    @Post('signin')
    signIn(@Body() signInDto: AuthDto) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @Get('protected')
    @Protected()
    findAll(@User() user: UserDto) {
        console.log(user)
        return `this is protected route!`;
    }

    // @Post('refresh')
    // refresh(@Req() req: Request) {
    //     return this.authService.refresh(req);
    // }
}
