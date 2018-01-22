import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/Event';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';

import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  host: {
    '(window:scroll)': 'updateHeader($event)'
}
})
export class EventsComponent implements OnInit {
  events: any[];
  isLoggedIn: boolean;
  sources: Array<Object>;

  isScrolled = false;
  currPos: Number = 0;
  startPos: Number = 0;
  changePos: Number = 100;

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService,
    private _scrollToService: ScrollToService
  ) {
    this.sources = [
      {
          src: "assets/music/music.mp3",
          type: "audio/mp3"
      }
    ];
   }

   public triggerScrollTo() {
    
    const config: ScrollToConfigOptions = {
      target: 'destination'
    };
 
    this._scrollToService.scrollTo(config);
  }

   updateHeader(evt) {
    this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
    if(this.currPos >= this.changePos ) {
        this.isScrolled = true;
    } else {
        this.isScrolled = false;
    }
}

  

  ngOnInit() {
    this.eventService.getEvents().subscribe(events => {
      console.log(events);
      this.events = events;
    });

    this.authService.getAuth().subscribe(auth => {
      if(auth){
        this.isLoggedIn = true;
      }
    });

    
  }
}
