import { Component, computed, inject, input, OnInit, Signal, signal, WritableSignal } from '@angular/core';
//import { ActivatedRoute } from '@angular/router';
import { Trip, TripService } from '../../services/trip-service';
//import { GpsLocation, WeatherServiceTs } from '../../services/weather-service.ts';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'page-trip-detail',
    templateUrl: './trip-detail.html',
    styleUrl: './trip-detail.css',
    imports: [DatePipe, RouterLink, RouterLinkActive, RouterOutlet],
})
export class TripDetailPage {
    private tripService = inject(TripService);
    id = input.required<string>();
    trip = computed(() => this.tripService.getTrip(Number(this.id())));
    }
