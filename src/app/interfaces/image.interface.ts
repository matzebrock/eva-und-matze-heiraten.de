import { SafeStyle } from "@angular/platform-browser";

export interface Image {
    id: string;
    name: string;
    size: number;
    mime: string;
    created: number;
    width: number;
    height: number;
    url: string;
    style: SafeStyle;
}
