import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  CanActivate,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    // Bypass auth for Swagger UI and JSON spec
    if (
      req.path.startsWith('/api/docs') ||
      req.path.startsWith('/api/docs-json')
    ) {
      return true;
    }

    // Otherwise enforce JWT auth
    return super.canActivate(context) as boolean;
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
