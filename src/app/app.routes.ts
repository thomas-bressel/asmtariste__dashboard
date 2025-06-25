import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth-guard';



export const routes: Routes = [
    {
        path: '',
        loadComponent: async () =>
            (await import('./views/public/login/login')).Login
    },
    {
        path: 'login',
        loadComponent: async () =>
            (await import('./views/public/login/login')).Login
    },
  
    {
        path: 'dashboard',
        canActivate: [authGuard],
        loadComponent: async () =>
            (await import('./views/private/dashboard/dashboard')).Dashboard,
        children: [
            {
                path: 'folders',
                loadComponent: async () =>
                    (await import('./views/private/folders/folders')).Folders
            },
            {
                path: 'files',
                loadComponent: async () =>
                    (await import('./views/private/files/files')).Files
            },
            {
                path: 'menus',
                loadComponent: async () =>
                    (await import('./views/private/menus/menus')).Menus
            },
            {
                path: 'permissions',
                loadComponent: async () =>
                    (await import('./views/private/permissions/permissions')).Permissions
            },
            {
                path: 'surveys',
                loadComponent: async () =>
                    (await import('./views/private/surveys/surveys')).Surveys
            },
            {
                path: 'tags',
                loadComponent: async () =>
                    (await import('./views/private/tags/tags')).Tags
            },
            {
                path: 'stats',
                loadComponent: async () =>
                    (await import('./views/private/stats/stats')).Stats
            },
            {
                path: 'users',
                loadComponent: async () =>
                    (await import('./views/private/users/users')).Users,
                loadChildren: async () =>
                    (await import('./views/private/users/users.routes')).routes,
            },
            {
                path: 'articles',
                loadComponent: async () =>
                    (await import('./views/private/articles/articles')).Articles,
                loadChildren: async () =>
                    (await import('./views/private/articles/articles.routes')).routes,
            }
        ]
    },

    // Route 404
    {
        path: '**',
        loadComponent: async () =>
            (await import('./views/shared/not-found/not-found')).NotFound
    }
];
