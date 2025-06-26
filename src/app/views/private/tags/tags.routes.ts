import { Routes } from '@angular/router'
import { CreateTag } from './overlays/create-tag/create-tag';

export const routes: Routes = [
    {
        path: 'create',
        component: CreateTag,
    },
];