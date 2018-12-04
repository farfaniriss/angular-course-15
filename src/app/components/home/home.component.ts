import { Component, OnInit } from '@angular/core';
import { YoutubeService } from "../../services/youtube.service";

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  videos: any[] = [];
  selectedVideo: any;

  constructor(public ytService: YoutubeService) { }

  ngOnInit() {
    this.ytService.getVideos().subscribe(res => {
      console.log(res);
      this.videos = res;
    });
  }

  seeVideo(video: any) {
    this.selectedVideo = video;
    $('#myModal').modal();
  }

  closeModal() {
    this.selectedVideo = null;
    $('#myModal').modal('hide');
  }

  loadMore() {
    this.ytService.getVideos().subscribe(res => this.videos.push.apply( this.videos, res ));
  }

}
