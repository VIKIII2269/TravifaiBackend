import { ExecutionContext, CanActivate } from '@nestjs/common';
declare const JwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGuard extends JwtAuthGuard_base implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
    handleRequest(err: any, user: any, info: any): any;
}
export {};
