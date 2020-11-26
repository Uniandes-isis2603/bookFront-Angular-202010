import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Author } from './author';
import { AuthorDetail } from './author-detail';


@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private apiUrl = environment.baseUrl + 'authors';
  /**
   * Constructor of the service
   * @param http The HttpClient - This is necessary in order to perform requests
   */
  constructor(private http: HttpClient) { }

  /**
   * Returns the Observable object containing the list of authors retrieved from the API
   * @returns The list of authors in real time
   */
  getAuthors(): Observable<AuthorDetail[]> {
    return this.http.get<AuthorDetail[]>(this.apiUrl);
  }

  /**
   * Returns the Observable object with the details of an author retrieved from the API
   * @returns The author details
   */
  getAuthorDetail(authorId): Observable<AuthorDetail> {
    return this.http.get<AuthorDetail>(`${this.apiUrl}/${authorId}`);
  }

  /**
   * Creates an author
   * @param author The new author
   * @returns The confirmation that the author was created
   */
  createAuthor(author): Observable<Author> {
    return this.http.post<Author>(this.apiUrl, author);
  }
}
