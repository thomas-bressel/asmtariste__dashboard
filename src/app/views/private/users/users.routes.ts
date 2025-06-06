import { Routes } from '@angular/router'
import { UserDetails } from '../users/user-details/user-details'


export const routes: Routes = [
    {
        path: ':uuid',
        component: UserDetails,
    },
];