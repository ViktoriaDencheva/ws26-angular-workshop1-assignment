import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { form, FormField, required, minLength, maxLength, validate } from '@angular/forms/signals';
import { Trip, TripService } from '../../services/trip-service';

@Component({
    selector: 'app-trip-form',
    templateUrl: './trip-form.html',
    styleUrl: './trip-form.css',
    imports: [FormField],
})
export class TripForm {
    private router = inject(Router);
    private tripService = inject(TripService);

    tripModel = signal<Omit<Trip, 'id'>>({
        name: '',
        description: '',
        date: '',
    });

    tripForm = form(this.tripModel, (schemaPath) => {
        required(schemaPath.name, { message: 'Name is required' });
        minLength(schemaPath.name, 2, { message: 'Name must be at least 2 characters long' });
        maxLength(schemaPath.name, 200, { message: 'Name must be at most 200 characters long' });
        required(schemaPath.date, { message: 'Date is required' });

        validate(schemaPath.date, ({ value }) => {
            const today = new Date().toISOString().slice(0, 10);
            if (value() && value() > today) {
                return { kind: 'futureDate', message: 'Date cannot be later than today' };
            }
            return null;
        });
    });

    onSubmit($event: Event) {
        $event.preventDefault();
        if (this.tripForm().invalid()) {
            console.log('invalid form', this.tripForm().errors())
            return;
        }
        this.tripService.addTrip(this.tripModel());
        this.router.navigate(['/']);
    }

    tripStart() {
        return this.tripForm.date().value();
    }
}
