import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from "@angular/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  youtubeUrl = "https://www.googleapis.com/youtube/v3";
  apiKey = "AIzaSyCHEIURWOlEOyw6SDZH_6zhF8BM-EZr3cE";
  playlist = "UUov884hISC3JeKPAX5zEsbg";
  channelId = "UCov884hISC3JeKPAX5zEsbg";
  nextPageToken = "";

  constructor(public http: Http) { }

  getVideos() {
    let url = `${ this.youtubeUrl }/playlistItems`;
    let params = new URLSearchParams();
    params.set('part', 'snippet');
    params.set('maxResults', '10');
    params.set('playlistId', this.playlist);
    //params.set('channelId',this.channelId);
    params.set('key', this.apiKey);

    if (this.nextPageToken) {
      params.set('pageToken', this.nextPageToken)
    }

    return this.http.get(url, { search: params })
        .pipe (
          map ( res => {
            this.nextPageToken = res.json().nextPageToken;

            let videos: any[] = [];
            for (let video of res.json().items)
            {
              videos.push( video.snippet );
            }

            return videos;
          } )
        );
  }
}
