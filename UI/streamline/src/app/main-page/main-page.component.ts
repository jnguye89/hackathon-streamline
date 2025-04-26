import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatChipsModule } from '@angular/material/chips';
import { VideoService } from '../services/video-service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    FlexLayoutModule,
    MatChipsModule,
    HttpClientModule
  ],
  providers: [VideoService],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  constructor(private videoService: VideoService) {}

  ngOnInit() {
    this.videoService.getVideos().subscribe((videos) => {
      console.log(videos);
    });
  }
}
