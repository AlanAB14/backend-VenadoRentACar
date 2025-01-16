import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private jwtService: JwtService,
    private reflector: Reflector
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const roleHierarchy = {
      super_admin: ['super_admin', 'admin', 'guest'],
      admin: ['admin', 'guest'],
      guest: ['guest'],
    };
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      );

      request['user'] = payload;
      
      const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
      if ( requiredRoles ) {
        const userRole = payload.role?.type;
        if (!userRole || !roleHierarchy[userRole]) {
          throw new ForbiddenException('Rol de usuario no válido o no autorizado.');
        }
        const allowedRoles = roleHierarchy[userRole] || [];
        const hasPermission = requiredRoles.some((role) => allowedRoles.includes(role));
        if (!hasPermission) {
          throw new ForbiddenException('No tienes permisos para acceder a este recurso');
        }
      }

    } catch(error) {
      console.error('Error en AuthGuard:', error);
      throw new UnauthorizedException(error.message);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authorizationHeader = request.headers?.authorization;
    if (!authorizationHeader) return undefined;
    const [type, token] = request.headers?.authorization.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
