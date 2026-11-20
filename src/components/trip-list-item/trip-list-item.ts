import { Component, computed, inject, input, output, signal, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Trip, TripService } from '../../services/trip-service';

@Component({
    selector: 'app-trip-list-item',
    templateUrl: './trip-list-item.html',
    styleUrl: './trip-list-item.css',
    imports: [RouterLink, DatePipe],
})
export class TripListItem {
    private tripService = inject(TripService);
    trip = input.required<Trip>();
    onShowDate = output();
    isTripInPast: Signal<boolean> = computed(() => this.trip().date < new Date().toISOString())

    getTripLink(): string {
        return `/trip-detail/${this.trip().id}`;
    }

    showDate(trip: Trip): void {
        alert(trip.date);
        this.onShowDate.emit();
    }

    deleteTrip(): void {
        this.tripService.removeTrip(this.trip().id);
    }
}
