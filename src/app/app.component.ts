import { Component } from "@angular/core";
import { CanActivateGuard } from "./guards/can-activate.guard";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent {
    public get isAuthInStorage(): boolean {
        return CanActivateGuard.isInStorage();
    }
}
