import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Event } from '../models/Event';

@Injectable()
export class EventService {
  eventsRef: AngularFireList<any>;
  events: Observable<any[]>;
  event: Observable<any>;

  constructor(private db: AngularFireDatabase) { 
    this.eventsRef = this.db.list('events');
    this.events = this.eventsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val()
      }));
    });
  }

  getEvents() {
    return this.events;
  }

  newEvent(event: Event){
    this.eventsRef.push(event);
  }

  getEvent(id: string){
    this.event = this.db.object('/events/'+id).valueChanges();
    return this.event;
  }

  updateEvent(id: string, event:Event){
    return this.eventsRef.update(id, event);
  }

  deleteEvent(id: string){
    return this.eventsRef.remove(id);
  }
}
