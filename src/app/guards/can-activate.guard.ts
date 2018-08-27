import { CanActivate } from "@angular/router";
import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class CanActivateGuard implements CanActivate {
    public canActivate(): Observable<boolean> {
        return of("hochzeit" === window.prompt("Passwort!"));
    }
}
