import { Component, OnInit } from "@angular/core";
import { environment } from "~environments/environment";
import { UploadMetadata, FileHolder } from "angular2-image-upload";
import { uploaders } from "../app.constants";

@Component({
    selector: "app-upload",
    templateUrl: "./upload.component.html",
    styleUrls: ["./upload.component.scss"]
})
export class UploadComponent implements OnInit {
    public loading = false;

    public get uploadUrl(): string {
        if (this.form.uploaderName) {
            return `${environment.apiUrl}/upload.php?u=${
                this.form.uploaderName
            }`;
        }

        return `${environment.apiUrl}/upload.php?u=unknown`;
    }
    public form = {
        uploaderName: ""
    };
    public uploaders: { value: string; label: string; sort: string }[];

    constructor() {
        this.uploaders = uploaders.sort((a, b) => {
            return a.sort > b.sort ? 1 : -1;
        });
    }

    public ngOnInit(): void {
        const u = localStorage.getItem("uploader");

        if (u && this.uploaders.some(x => x.value === u)) {
            this.form.uploaderName = u;
        }
    }

    public updateUploader($event: Event): void {
        const t = <HTMLSelectElement>$event.target;

        if (t && this.uploaders.some(x => x.value === t.value)) {
            localStorage.setItem("uploader", t.value);
        }
    }

    public onBeforeUpload(metadata: UploadMetadata) {
        const mtime = Math.round(metadata.file.lastModified / 1000);
        metadata.url = `${metadata.url}&c=${mtime}`;

        return metadata;
    }

    public onUploadStateChanged(uploading: boolean): void {
        this.loading = true === uploading;
    }
}
