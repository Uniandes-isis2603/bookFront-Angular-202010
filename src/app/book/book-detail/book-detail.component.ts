import { Component, OnInit,  Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookDetail } from '../bookDetail';
import { BookService } from '../book.service';


@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  @Input() bookDetail: BookDetail;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {
  }

  isCollapsed = true;
  bookId: number;

  getBookDetail(): void {
    this.bookService.getBookDetail(this.bookId)
      .subscribe(bookDetail => {
        this.bookDetail = bookDetail;
      });
  }

  ngOnInit() {
    if (this.bookDetail === undefined) {
      console.log('routerLink');
      this.bookId = +this.route.snapshot.paramMap.get('id');
      this.getBookDetail();

    } else {
      console.log('Input');
      console.log(this.bookDetail.id);
      console.log(`reviews: ${this.bookDetail.reviews.length} `);
    }
  }


  dateFixed(publishingDate: Date): Date {
    console.log(publishingDate);
    const dateNoTime: string[] = (publishingDate + '').split('T');
    return new Date(dateNoTime[0]);
  }

}
