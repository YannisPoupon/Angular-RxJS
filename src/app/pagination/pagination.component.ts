import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {

  @Input()
  currentPage: number = 1;

  @Input()
  pagesCount: number = 1;

  @Output()
  onPageChange = new EventEmitter<number>()

  constructor() {}

  ngOnInit(): void {

  }

  changePage(page : number) {
    this.currentPage = page;
    this.onPageChange.next(page);
  }

  nextPage() {
    if (this.currentPage === this.pagesCount) {
      return;
    }
    // this.currentPage++;
    this.changePage(this.currentPage + 1)
  }

  previousPage() {
    if (this.currentPage === 1) {
      return;
    }
    // this.currentPage--;

    this.changePage(this.currentPage - 1)
  }

  getPages() {
    return Array(this.pagesCount).fill(0).map((value,index)=>index +1)
  }


}
