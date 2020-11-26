import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { AuthorRoutingModule } from './author-routing.module';
import { AuthorDetailComponent } from './author-detail/author-detail.component';
import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorService } from './author.service';
import { AuthorCreateComponent } from './author-create/author-create.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AuthorListComponent, AuthorDetailComponent, AuthorCreateComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    AuthorRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [AuthorService]
})
export class AuthorModule { }
