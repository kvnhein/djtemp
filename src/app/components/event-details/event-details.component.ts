import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Event } from '../../models/Event';

import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  id: string;
  event: Event;
  isLoggedIn: boolean;

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    //Get id from url
    this.id = this.route.snapshot.params['id'];

    // Get event
    this.eventService.getEvent(this.id).subscribe(event => {
      this.event = event;
      console.log(this.event);
    });

    this.authService.getAuth().subscribe(auth => {
      if(auth){
        this.isLoggedIn = true;
      }
    });


  }

  onDeleteClick(){
    if(confirm("Are you sure to delete?")){
      this.eventService.deleteEvent(this.id);
      this.flashMessagesService.show('Event removed', {
        cssClass:'alert-success', timeout: 4000
      });
      this.router.navigate(['/']);
    }
  }

}
