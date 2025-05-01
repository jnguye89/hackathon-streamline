import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-stream',
  standalone: true,
  imports: [],
  templateUrl: './stream.component.html',
  styleUrl: './stream.component.scss',
})
export class StreamComponent {
  @ViewChild('video') videoElement!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
    this.startWebcam();
  }

  startWebcam() {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        this.videoElement.nativeElement.srcObject = stream;
      })
      .catch((err) => {
        console.error('Error accessing webcam:', err);
      });
  }
}
