import { Injectable, signal } from '@angular/core';

export interface Trip {
  id: number;
  name: string;
  description: string;
  date: string;
}

const STORAGE_KEY = 'trips';

@Injectable({
  providedIn: 'root',
})

export class TripService {
  private _trips = signal<Trip[]>(this.loadTrips());

  trips = this._trips.asReadonly();

  getTrips(): Trip[] {
    return this._trips();
  }

  getTrip(id: Trip['id']): Trip | undefined {
    return this._trips().find((trip)=> trip.id === id);
  }

  addTrip(trip: Omit<Trip, 'id'>): Trip {
    const newTrip: Trip = { ...trip, id: Date.now() };
    this.setTrips([...this._trips(), newTrip]);
    return newTrip;
  }
  removeTrip(id: Trip['id']): void {
    this.setTrips(this._trips().filter((trip) => trip.id !== id));
  }

  private loadTrips(): Trip[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === null) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      return [];
    }
    try {
      return JSON.parse(stored) as Trip[];
    } catch {
      return [];
    }
  }

  private setTrips(trips: Trip[]): void {
    this._trips.set(trips);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
  }
  
}
