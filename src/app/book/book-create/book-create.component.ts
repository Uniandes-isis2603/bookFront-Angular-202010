import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { BookService } from '../book.service';
import { Author } from 'src/app/author/author';
import { AuthorService } from 'src/app/author/author.service';
import { Editorial } from 'src/app/editorial/editorial';
import { EditorialService } from 'src/app/editorial/editorial.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BookDetail } from '../bookDetail';


@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {

  /**
   * Book form
   */
  bookForm: FormGroup;

  /**
   * The list of authors to be added to the book
   */
  authors: Author[];

  /**
   * The list of every author in the BookStore
   */
  allAuthors: Author[];

  /**
   * The list of every editorial in the BookStore
   */
  editorials: Editorial[];

  /**
   * Constructor for the component
   * @param bookService The book's services provider
   * @param formBuilder Builder for the form
   * @param authorService The author's services provider
   * @param editorialService The editorial's services provider
   * @param toastrService Toastr to show messages to the user
   * @param router The router
   */
  constructor(
    private bookService: BookService,
    private formBuilder: FormBuilder,
    private authorService: AuthorService,
    private editorialService: EditorialService,
    private toastrService: ToastrService,
    private router: Router,
  ) {
    this.bookForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(9)]],
      authors: ['', [Validators.required]],
      publishingdate: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(9)]],
      isbn: ['', [Validators.required]],
      image: ['', [Validators.required]],
      editorial: ['', [Validators.required]],
    });
  }

  /**
   * Creates a new book
   */
  createBook(bookC: BookDetail) {
    const toDate = this.bookForm.controls.publishingdate.value;
    const dateB: Date = new Date(toDate);

    bookC.publishingdate = dateB;
    bookC.authors = this.authors;
    bookC.editorial = this.buscarId(bookC.editorial, this.editorials);

    bookC.reviews = [];
    this.bookService.createBookD(bookC)
      .subscribe(book => {
        this.toastrService.success('The book was created successfully');
        this.router.navigate(['/books/list']);

        this.bookForm.reset();
      }, err => {
        this.toastrService.error(err, 'Error');
      });
  }

  /**
   * Recover the id of an element
   */
  buscarId(pal, list) {
    for (const i of list) {
      if (i.name === pal) {
        return i;
      }
    }
  }

  /**
   * Cancels the creation of the new book
   * Redirects to the book's list page
   */
  cancelCreation(): void {
    this.toastrService.warning('The book wasn\'t created', 'Book creation');
    this.router.navigate(['/book/list']);
    this.bookForm.reset();
  }

  /**
   * Retrieves the list of editorials in the BookStore
   */
  getEditorials(): void {
    this.editorialService.getEditorials()
      .subscribe(editorials => {
        this.editorials = editorials;
      }, err => {
        this.toastrService.error(err, 'Error');
      });
  }

  /**
   * Retrieves the information of all the authors in the application.
   */
  getAuthors(): void {
    this.authorService.getAuthors().subscribe(authors => {
      this.allAuthors = authors;
    });
  }

  /**
   * Add an author to the book
   */
  addAuthor(): void {
    const aut = this.bookForm.get('authors').value;
    for (const auth of this.allAuthors) {
      if (aut === auth.name && !this.authors.includes(auth)) {
        this.authors.push(auth);
      }
    }
  }

  /**
   * Remove an author from the book
   * @param author Author to delete
   */
  removeAuthor(author): void {
    const index = this.authors.indexOf(author);
    this.authors.splice(index, 1);
  }

  /**
   * This function will initialize the component
   */
  ngOnInit(): void {
    this.getAuthors();
    this.getEditorials();
    this.authors = [];
  }

}
