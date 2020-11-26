import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorCreateComponent } from './author-create/author-create.component';
import { AuthorDetailComponent } from './author-detail/author-detail.component';


const routes: Routes = [{
  path: 'authors',
  children: [
    {
      path: 'list',
      component: AuthorListComponent,
    },
    {
      path: 'new',
      component: AuthorCreateComponent,
    },
    {
      path: ':id',
      component: AuthorDetailComponent,
      runGuardsAndResolvers: 'always'
    },
  ]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorRoutingModule { }
