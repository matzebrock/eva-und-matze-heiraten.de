import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Subscription, finalize } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentFile = 0;
  totalFiles = 0;
  uploadProgress = 0;
  done = false;
  private subscriptions$ = new Subscription();

  constructor(private http: HttpClient) {}

  @ViewChild('input') inputRef: ElementRef<HTMLInputElement> | undefined;

  async onFileSelected(event: any) {
    this.currentFile = 0;
    this.totalFiles = (event.target.files || []).length;

    for (const file of event.target.files || []) {
      await new Promise<void>((resolve) => {
        this.currentFile++;
        const formData = new FormData();
        formData.append('a_file', file);

        const upload$ = this.http.post(
          'http://heikoundsophie.de/upload.php?check=lotz',
          formData,
          {
            reportProgress: true,
            observe: 'events',
          }
        );

        this.subscriptions$.add(
          upload$.subscribe((event) => {
            if (event.type == HttpEventType.UploadProgress) {
              if (!event.total) this.uploadProgress = 0;
              else
                this.uploadProgress = Math.round(
                  100 * (event.loaded / event.total)
                );
            }

            if (this.uploadProgress >= 100) {
              this.uploadProgress = 0;
              resolve();
            }
          })
        );
      });
    }

    this.done = true;
    setTimeout(() => this.reset(), 2000);
  }

  reset() {
    this.currentFile = 0;
    this.totalFiles = 0;
    this.uploadProgress = 0;
    this.done = false;
    this.subscriptions$.unsubscribe();
    this.subscriptions$ = new Subscription();

    if (this.inputRef) this.inputRef.nativeElement.value = '';
  }
}
