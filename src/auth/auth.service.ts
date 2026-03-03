import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ACCESS_SECRET, REFRESH_SECRET } from './secret-keys';
import type { Request } from 'express';

// https://www.freecodecamp.org/news/how-to-build-a-secure-authentication-system-with-jwt-and-refresh-tokens/

interface User {
    id: number,
    username: string,
    password: string
}

// cookies always passed in headers to domain that has set it for examples backend server of http:example.com
// storing access token in cookies is dangerous as it can be automatically sent to backend of that domain
// Senstitive Actions: acess token
// Secondary action to get new access token : refresh token
// Industry -> access token -> Bearer , refresh token -> cookie

interface RefreshToken {
    userId: string;
    tokenHash: string;
}

@Injectable()
export class AuthService {
    private readonly users: User[] = [
        {
            id: 1,
            username: 'bhavdeep',
            password: '123456'
        },
        {
            id: 2,
            username: 'mohdeep',
            password: '123456'
        }
    ]
    private readonly refreshTokens: RefreshToken[] = [];
    constructor(private jwtService: JwtService) { }

    async signIn(username: string, userPassword: string): Promise<{ access_token: string }> {
        const user = this.users.find(user => user.username === username);
        if (user?.password !== userPassword) {
            throw new UnauthorizedException();
        }
        const { password, ...result } = user;
        const access_token = await this.jwtService.signAsync(result, { secret: ACCESS_SECRET });
        const refresh_token = await this.jwtService.signAsync(result, { secret: REFRESH_SECRET, expiresIn: '7d' });

        this.refreshTokens.push({
            tokenHash: refresh_token, // usually hashed
            userId: user.id.toString()
        });

        return { access_token };
    }

    // private  rotateRefreshToken(oldToken: string, newToken: string, userId: string) {
    //     this.refreshTokens.filter(token => token.tokenHash !== oldToken); // delete old token

    //     const refresh_token = await this.jwtService.signAsync(result, { secret: REFRESH_SECRET, expiresIn: '7d' });

    //     this.refreshTokens.push({
    //         tokenHash: refresh_token, // usually hashed
    //         userId: user.id.toString()
    //     });
    // }

    // async refresh(req: Request) {
    //     const refreshTokenCookie = req.cookies?.refresh_token;
    //     if (!refreshTokenCookie) {
    //         throw new UnauthorizedException();
    //     }

    //     const storedToken = this.refreshTokens.find(token => token.tokenHash === refreshTokenCookie);
    //     if (!storedToken) { // logout, session rotated, session stolen
    //         throw new UnauthorizedException();
    //     }
    //     const { userId, tokenHash } = storedToken;
    //     try {
    //         await this.jwtService.verifyAsync(refreshTokenCookie, { secret: REFRESH_SECRET });
    //     } catch (error) {
    //         throw new UnauthorizedException();
    //     }

    //     return this.rotateRefreshToken(tokenHash, refreshTokenCookie, userId)
    // }
}
