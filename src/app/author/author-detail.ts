import { Book } from '../book/book';

import { Author } from './author';

export class AuthorDetail extends Author {

  /**
   * The author's books
   */
  private booksA: Book[];

  constructor( books?: Book[]) {
    super();
    this.booksA = books;
  }

  get books(): Book[] {return this.booksA; }
}
