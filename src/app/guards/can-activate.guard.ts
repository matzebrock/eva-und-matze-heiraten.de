import { CanActivate } from "@angular/router";
import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";
import * as md5 from "md5";

const H = "73de9caca92236fac36b941116907214";

@Injectable()
export class CanActivateGuard implements CanActivate {
    public static isInStorage(): boolean {
        const h = localStorage.getItem("h");

        if (h && H === h) {
            return true;
        }

        return false;
    }

    public canActivate(): Observable<boolean> {
        if (CanActivateGuard.isInStorage()) {
            return of(true);
        }

        const p = md5(window.prompt("Bitte Passwort!"));

        if (p === H) {
            localStorage.setItem("h", p);
            return of(true);
        }

        localStorage.removeItem("h");
        return of(false);
    }
}
