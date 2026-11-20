import { Component,  computed, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TripService } from '../../../services/trip-service';


@Component({
  selector: 'app-trip-info',
  templateUrl: './trip-info.html',
  styleUrl: './trip-info.css',
  imports: [DatePipe],
})
export class TripInfo {
  private tripService = inject(TripService);

  id = input.required<string>();

  trip = computed(() => this.tripService.getTrip(Number(this.id())));

}
