import { Component, OnInit, OnDestroy } from '@angular/core';
import { Image } from '../interfaces/image.interface';
import { ListService } from './list.service';
import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    animations: [
        trigger('visibilityChanged', [
            state('1', style({ opacity: 1 })),
            state('0', style({ opacity: 0 })),
            transition('1 => 0', animate('500ms')),
            transition('0 => 1', animate('500ms'))
        ])
    ]
})
export class ListComponent implements OnInit, OnDestroy {
    public images: Image[] = [];
    public image1Index: number;
    public image2Index: number;
    public toggler: boolean;
    private imageInterval: number;

    constructor(private listService: ListService) {
    }

    public ngOnInit(): void {
        this.listService.fetchImages().subscribe(images => {
            this.images = images;

            this.image1Index = 0;
            this.image2Index = 1;
            this.toggler = true;

            this.imageInterval = window.setInterval(() => {
                this.toggler = !this.toggler;

                setTimeout(() => {
                    this.setNextImage();
                }, 2500);
            }, 5000);
        });
    }

    public ngOnDestroy(): void {
        if (this.imageInterval) {
            window.clearInterval(this.imageInterval);
        }
    }

    public get image1(): Image {
        return this.images[this.image1Index];
    }

    public get image2(): Image {
        return this.images[this.image2Index];
    }

    private setNextImage(): void {
        if (this.toggler) {
            this.image2Index = this.image1Index + 1;

            if (!this.image2) {
                this.image2Index = 0;
            }
        } else {
            this.image1Index = this.image2Index + 1;

            if (!this.image1) {
                this.image1Index = 0;
            }
        }
    }
}
