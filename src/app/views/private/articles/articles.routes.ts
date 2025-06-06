import { Routes } from '@angular/router'
import { ArticlePages } from '../articles/article-pages/article-pages'


export const routes: Routes = [
    {
        path: ':title/:page',
        component: ArticlePages
    }
];