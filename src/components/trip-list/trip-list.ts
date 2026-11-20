import { Component, inject } from '@angular/core';
import { TripListItem } from '../trip-list-item/trip-list-item';
import { TripService } from '../../services/trip-service';

@Component({
    selector: 'app-trip-list',
    templateUrl: './trip-list.html',
    styleUrl: './trip-list.css',
    imports: [TripListItem],
})
export class TripList {
    tripService = inject(TripService);

    trips = this.tripService.trips;


    onShowDate() {
        console.log('event was fired from child');
    }
}
