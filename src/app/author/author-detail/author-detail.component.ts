import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorService } from '../author.service';
import { AuthorDetail } from '../author-detail';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.css']
})
export class AuthorDetailComponent implements OnInit {

  @Input() authorDetail: AuthorDetail;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authorService: AuthorService
  ) {
  }

    authorId: number;
    getAuthorDetail(): void {
      this.authorService.getAuthorDetail(this.authorId)
        .subscribe(authorDetail => {
          this.authorDetail = authorDetail;
        });
    }
  ngOnInit() {
    if (this.authorDetail === undefined) {
      console.log('routerLink');
      this.authorId = +this.route.snapshot.paramMap.get('id');
      this.getAuthorDetail();

    } else { console.log(this.authorDetail.id); }
  }

  dateFixed(birthDate: Date): Date {
    console.log(birthDate);
    const dateNoTime: string[] = (birthDate + '').split('T');
    return new Date(dateNoTime[0]);
  }
}
