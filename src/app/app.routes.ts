import { Routes } from '@angular/router';
import { TripOverviewPage } from '../pages/trip-overview/trip-overview';
import { TripDetailPage } from '../pages/trip-detail/trip-detail';
import { TripFormPage } from '../pages/trip-form/trip-form';
import { TripInfo } from '../pages/trip-detail/trip-info/trip-info';
import { TripWeather } from '../pages/trip-detail/trip-weather/trip-weather';

export const routes: Routes = [
    {
        path: '',
        component: TripOverviewPage
    },
    {
        path: 'trip-detail/:id',
        component: TripDetailPage,
        children: [
            {path: '', redirectTo: 'info', pathMatch: 'full'},
            {path: 'info', component: TripInfo},
            {path: 'weather', component: TripWeather}
        ],
    },
    {
        path: 'trip-form',
        component: TripFormPage,
    },
    {
        path: 'trip-form/:id',
        component: TripFormPage,
    }
];
