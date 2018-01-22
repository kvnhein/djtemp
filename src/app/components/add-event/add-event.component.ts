import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/Event';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  event: Event = {
    date:'',
    venueName:'',
    venueAddress:'',
    ticketsLink:'',
  }


  constructor(
    private flashMessagesService: FlashMessagesService,
    private router: Router,
    private eventService: EventService
  ) { }

  ngOnInit() {
  }

  onSubmit({value, valid}: {value: Event, valid:boolean}) {
    if(!valid){
      this.flashMessagesService.show('Please fill in all fields', {
        cssClass:'alert-danger', timeout: 4000
      });
      this.router.navigate(['add-event']);
    } else {
      // Add new Event
      this.eventService.newEvent(value);
      this.flashMessagesService.show('New Event Added', {
        cssClass:'alert-success', timeout: 4000
      });
      this.router.navigate(['/']);
    }
  }

}
