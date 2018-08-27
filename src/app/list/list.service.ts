import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Image } from "../interfaces/image.interface";
import { environment } from "~environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DomSanitizer } from "@angular/platform-browser";

@Injectable()
export class ListService {
    constructor(
        private httpClient: HttpClient,
        private sanitizer: DomSanitizer
    ) {}

    public fetchImages(): Observable<Image[]> {
        return this.httpClient
            .get<Image[]>(`${environment.apiUrl}/list.php`)
            .pipe(
                map(images => {
                    images.forEach(image => {
                        image.style = this.sanitizer.bypassSecurityTrustStyle(
                            `url(${image.url})`
                        );
                    });

                    return images;
                })
            );
    }
}
