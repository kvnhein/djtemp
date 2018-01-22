import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Event } from '../../models/Event';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  id:string;
  event: Event = {
    date:'',
    venueName:'',
    venueAddress:'',
    ticketsLink:'',
  }

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    
    //Get event
    this.eventService.getEvent(this.id).subscribe(event => {
      this.event = event;
    });
  }

  onSubmit({value, valid}: {value: Event, valid:boolean}) {
    if(!valid){
      this.flashMessagesService.show('Please fill in all fields', {
        cssClass:'alert-danger', timeout: 4000
      });
      this.router.navigate(['edit-event/'+this.id]);
    } else {
      // Update Event
      this.eventService.updateEvent(this.id, value);
      this.flashMessagesService.show('Event Updated', {
        cssClass:'alert-success', timeout: 4000
      });
      this.router.navigate(['/event/'+this.id]);
    }
  }

}
