// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { Request } from 'express';
// import { Observable } from 'rxjs';

// @Injectable()
// export class RolesGuard implements CanActivate {

//   constructor(private reflector: Reflector) {}

//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
//     if (!requiredRoles) {
//       return true;
//     }

//     // Obtiene al usuario desde la solicitud
//     const request = context.switchToHttp().getRequest();
//     const user = request.user;

//     if (!user) {
//       throw new ForbiddenException('Usuario no autenticado');
//     }

//     // Verifica si el rol del usuario está dentro de los roles permitidos
//     const hasRole = requiredRoles.includes(user.role);
//     if (!hasRole) {
//       throw new ForbiddenException('No tienes permisos para acceder a este recurso');
//     }

//     return true;
//   }

//     private extractTokenFromHeader(request: Request): string | undefined {
//       const authorizationHeader = request.headers?.authorization;
//       if (!authorizationHeader) return undefined;
//       const [type, token] = request.headers?.authorization.split(' ') ?? [];
//       return type === 'Bearer' ? token : undefined;
//     }
// }
