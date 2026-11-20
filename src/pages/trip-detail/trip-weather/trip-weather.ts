import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { TripService } from '../../../services/trip-service';
import { GpsLocation, WeatherServiceTs } from '../../../services/weather-service.ts';

@Component({
  selector: 'app-trip-weather',
  imports: [],
  templateUrl: './trip-weather.html',
  styleUrl: './trip-weather.css',
})
export class TripWeather {
  private tripService = inject(TripService);
  private weatherService = inject(WeatherServiceTs);

  id = input.required<string>();

  gps = signal<GpsLocation | undefined>(undefined);

  trip = computed(() => this.tripService.getTrip(Number(this.id())));

  ngOnInit() {
    const trip = this.trip();
    if (!trip) return;

    this.weatherService.getGpsCoordinates(trip.name).subscribe((response) => {
      this.gps.set(response.results?.[0]);
    });
  }
}
