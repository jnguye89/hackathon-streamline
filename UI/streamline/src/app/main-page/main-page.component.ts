import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatChipsModule } from '@angular/material/chips';
import { VideoService } from '../services/video-service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    FlexLayoutModule,
    MatChipsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [VideoService],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  videos: any[] = [];
  asset: string = "";
  constructor(private videoService: VideoService) {}

  ngOnInit() {
    this.videoService.getVideos().subscribe((videos) => {
      this.videos = videos;
      this.asset = `video-assets/${this.pickRandom(videos).filename}`;
    });
  }

  private pickRandom(array: any[]) {
    if (!array.length) return null; // Safety check for empty arrays
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  changeVideo(isNext: Boolean) {
    var currentIndex = this.videos.findIndex(video => this.asset.includes(video.filename));
    if (isNext) {
      if (currentIndex === this.videos.length - 1) {
        this.asset = `video-assets/${this.videos[0].filename}`;
      } else {
        this.asset = `video-assets/${this.videos[(currentIndex + 1)].filename}`;
      }
    }
    else {
      if (currentIndex === 0) {
        this.asset = `video-assets/${this.videos[this.videos.length - 1].filename}`;
      }
      else {
        this.asset = `video-assets/${this.videos[(currentIndex - 1)].filename}`;
      }
    }
  }
}
