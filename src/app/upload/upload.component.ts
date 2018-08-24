import { Component, OnInit } from '@angular/core';
import { environment } from '~environments/environment';
import { UploadMetadata } from 'angular2-image-upload';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
    public uploadUrl: string;

    constructor() {
        this.uploadUrl = `${environment.apiUrl}/upload.php`;
    }

    public ngOnInit(): void {

    }

    public onBeforeUpload(metadata: UploadMetadata) {
        const mtime = Math.round(metadata.file.lastModified / 1000);
        metadata.url = `${metadata.url}?c=${mtime}`;

        return metadata;
    };
}
