import { Component, OnInit } from "@angular/core";
import { environment } from "~environments/environment";
import { UploadMetadata } from "angular2-image-upload";

@Component({
    selector: "app-upload",
    templateUrl: "./upload.component.html",
    styleUrls: ["./upload.component.scss"]
})
export class UploadComponent implements OnInit {
    public get uploadUrl(): string {
        if (this.form.uploaderName) {
            return `${environment.apiUrl}/upload.php?u=${
                this.form.uploaderName
            }`;
        }

        return `${environment.apiUrl}/upload.php?u=`;
    }
    public form = {
        uploaderName: "embrock"
    };
    public uploaders: { value: string; label: string; sort: string }[] = [
        { value: "", label: "Bitte auswählen", sort: "_" },
        { value: "embrock", label: "Eva &amp; Matthias Brock", sort: "brock" },
        {
            value: "kkbrock",
            label: "Kerstin &amp; Klaus-Dieter Brock",
            sort: "brock"
        },
        { value: "mrbrock", label: "Rebekka &amp; Marko Brock", sort: "brock" },
        {
            value: "knmatthaey",
            label: "Karin &amp; Norbert Matthäy",
            sort: "matthäy"
        },
        { value: "hmatthaey", label: "Heiko Matthäy", sort: "matthäy" },
        { value: "kluevers", label: "Jan &amp; Daria Klüver", sort: "klüver" },
        {
            value: "nielsons",
            label: "Tatjana &amp; Tom Nielson",
            sort: "nielson"
        },
        {
            value: "steinlandt",
            label: "Wiebke &amp; Daniel Steinlandt",
            sort: "steinlandt"
        },
        { value: "sklauer", label: "Sabine Klauer", sort: "klauer" },
        { value: "cklauer", label: "Caroline Klauer", sort: "klauer" },
        { value: "fklauer", label: "Florian Klauer", sort: "klauer" },
        { value: "bklauer", label: "Bernd Klauer", sort: "klauer" },
        { value: "klein", label: "Ulrike &amp; Wolfgang Klein", sort: "klein" },
        {
            value: "awklauer",
            label: "Annette &amp; Wolfang Klauer",
            sort: "klauer"
        },
        { value: "schell", label: "Doris &amp; Thomas Schell", sort: "schell" },
        {
            value: "chanel",
            label: "Chanel Wohl &amp; Fabian Ellersiek",
            sort: "wohl"
        },
        { value: "carla", label: "Carla Irion", sort: "irion" },
        { value: "lisa", label: "Lisa Steiner", sort: "steiner" },
        { value: "nina", label: "Nina Wagner", sort: "wagner" },
        {
            value: "gloria",
            label: "Gloria Grigorow &amp; David Kurek",
            sort: "grigorow"
        },
        { value: "otters", label: "Ennio amp; Stefanie Otter", sort: "otter" },
        { value: "tina", label: "Tina Gailus", sort: "gailus" },
        {
            value: "mischa",
            label: "Mischa &amp; Lena Brammer",
            sort: "brammer"
        },
        { value: "sven", label: "Sven Ambros &amp; Jana", sort: "ambros" }
    ];

    constructor() {
        this.uploaders = this.uploaders.sort((a, b) => {
            return a.sort > b.sort ? 1 : -1;
        });
    }

    public ngOnInit(): void {}

    public onBeforeUpload(metadata: UploadMetadata) {
        const mtime = Math.round(metadata.file.lastModified / 1000);
        metadata.url = `${metadata.url}&c=${mtime}`;

        return metadata;
    }
}
