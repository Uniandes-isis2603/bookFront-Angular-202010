import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorService } from '../author.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthorDetail } from '../author-detail';

@Component({
  selector: 'app-author-create',
  templateUrl: './author-create.component.html',
  styleUrls: ['./author-create.component.css']
})
export class AuthorCreateComponent implements OnInit {

  /*
   * Form for author
   */
  authorForm: FormGroup;

  constructor(
    private authorService: AuthorService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.authorForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      birthDate: ['', Validators.required],
      description: ['', Validators.required, Validators.minLength(3)],
      image: ['', Validators.required]
    });
  }

  /**
   * Cancels the creation of the new author
   * Redirects to the author list page
   */
  cancelCreation(): void {
    this.toastrService.warning('The author wasn\'t created', 'Author creation');
    this.router.navigate(['/authors/list']);
    this.authorForm.reset();
  }

  /**
   * Creates a new author
   */
  createAuthor(authorC: AuthorDetail) {
    const a = this.authorForm.controls.birthDate.value;
    const dateB: Date = new Date(a);
    authorC.birthDate = dateB;
    this.authorService.createAuthor(authorC)
      .subscribe(author => {
        this.toastrService.success('The author was created successfully');
        this.router.navigate(['/authors/list']);
        this.authorForm.reset();
      }, err => {
        this.toastrService.error(err, 'Error');
      });
  }

  ngOnInit(): void {
  }

}
