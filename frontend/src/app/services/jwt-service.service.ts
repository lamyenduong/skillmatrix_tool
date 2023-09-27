// import { Injectable } from '@angular/core';
// import * as jwt from 'jsonwebtoken';


// @Injectable({
//     providedIn: 'root'
// })
// export class JWTService {

//     constructor() { }
//     public static readonly USERNAME: string = "username";
//     public static readonly SECRET_KEY: string = "SkillMatrixProject30012021@@Skill";
//     public static readonly EXPIRE_TIME: number = 180000;
//     public static readonly EXPIRE_TIME_REFRESH: number = 7 * 24 * 60 * 60 * 1000;

//     public generateTokenLogin(username: string): string | null {
//         try {
//             const token = jwt.sign(
//                 {
//                     [JWTService.USERNAME]: username,
//                     exp: this.generateExpirationDate(),
//                 },
//                 JWTService.SECRET_KEY,
//                 { algorithm: 'HS256' }
//             );
//             return token;
//         } catch (e) {
//             console.error(e);
//             return null;
//         }
//     }

//     public generateTokenRefresh(username: string): string | null {
//         try {
//             const token = jwt.sign(
//                 {
//                     [JWTService.USERNAME]: username,
//                     exp: this.generateRefreshExpirationDate(),
//                 },
//                 JWTService.SECRET_KEY,
//                 { algorithm: 'HS256' }
//             );
//             return token;
//         } catch (e) {
//             console.error(e);
//             return null;
//         }
//     }

//     private getClaimsFromToken(token: string): jwt.JwtPayload | null {
//         try {
//             const payload = jwt.verify(token, JWTService.SECRET_KEY) as jwt.JwtPayload;
//             return payload;
//         } catch (e) {
//             console.error(e);
//             return null;
//         }
//     }

//     private generateExpirationDate(): number {
//         return Math.floor(Date.now() / 1000) + JWTService.EXPIRE_TIME;
//     }

//     private generateRefreshExpirationDate(): number {
//         return Math.floor(Date.now() / 1000) + JWTService.EXPIRE_TIME_REFRESH;
//     }

//     private getExpirationDateFromToken(token: string): number | null {
//         const claims = this.getClaimsFromToken(token);
//         if (claims && typeof claims.exp === 'number') {
//             return claims.exp;
//         }
//         return null;
//     }

//     public getUsernameFromToken(token: string): string | null {
//         const claims = this.getClaimsFromToken(token);
//         if (claims && typeof claims[JWTService.USERNAME] === 'string') {
//             return claims[JWTService.USERNAME] as string;
//         }
//         return null;
//     }

//     private generateShareSecret(): Buffer {
//         return Buffer.from(JWTService.SECRET_KEY);
//     }

//     public isTokenExpired(token: string): boolean {
//         const expiration = this.getExpirationDateFromToken(token);
//         return expiration !== null && expiration < Math.floor(Date.now() / 1000);
//     }

//     public validateTokenLogin(token: string): boolean {
//         if (!token || token.trim().length === 0) {
//             return false;
//         }
//         const username = this.getUsernameFromToken(token);

//         if (!username || username.length === 0) {
//             return false;
//         }
//         if (this.isTokenExpired(token)) {
//             return false;
//         }
//         return true;
//     }

//     public refreshToken(expiredToken: string): string | null {
//         try {
//             const username = this.getUsernameFromToken(expiredToken);
//             if (!username) {
//                 return null;
//             }
//             return this.generateTokenLogin(username);
//         } catch (e) {
//             console.error(e);
//             return null;
//         }
//     }
// }