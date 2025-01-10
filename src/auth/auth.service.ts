import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
) {}

  async signIn(username: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findByUsername(username);
    console.log(pass, user.password)
    const isMatch = await bcryptjs.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { 
        role: user.role, 
        username: user.username, 
        first_name: user.first_name,
        last_name: user.last_name,
        avatar: user.avatar
    };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
