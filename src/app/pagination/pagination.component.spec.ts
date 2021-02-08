import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PaginationComponent } from './pagination.component';

@Component({
  template: `
    <h1>TestComponent</h1>
    <app-pagination
      [pagesCount]="testPagesCount"
      [currentPage]="testCurrentPage"
      (onPageChange)="refreshCustomers($event)"
    ></app-pagination>
  `,
})
class TestComponent {
  testPagesCount = 5;
  testCurrentPage = 1;
  refreshCustomers(page: number) {
    this.testCurrentPage = page;
  }
}

describe('PaginationComponent with host', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent, TestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display as many links as pagesCount', () => {
    component.testPagesCount = 3;
    fixture.detectChanges();

    const document = fixture.nativeElement as HTMLElement;

    expect(document.querySelectorAll('.page-item').length).toBe(5);
  });

  it('should highlight currentpage', () => {
    component.testPagesCount = 3;
    component.testCurrentPage = 2;
    fixture.detectChanges();

    const document = fixture.nativeElement as HTMLElement;

    expect(document.querySelector('.active').textContent).toBe('2');
  });

  it('should detect the OnpageChange event', () => {
    // Given

    component.testCurrentPage = 3;
    component.testPagesCount = 5;

    const linkDebug = fixture.debugElement.query(
      By.css('.page-item:nth-of-type(3) .page-link')
    );
    linkDebug.triggerEventHandler('click', null);

    expect(component.testCurrentPage).toBe(2);
  });
});

describe('PaginationComponent standalone', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increment / decrement currentpage when nextPage / previousPage is called', () => {
    component.currentPage = 4;

    component.nextPage();
    expect(component.currentPage).toBe(5);

    component.previousPage();
    expect(component.currentPage).toBe(4);
  });

  it('should not decrement currentPage when at page one', () => {
    component.currentPage = 1;
    component.previousPage();
    expect(component.currentPage).toBe(1);
  });

  it('should not increment currentPage when we reached the pagesCount', () => {
    component.pagesCount = 4;
    component.currentPage = 4;

    component.nextPage();
    expect(component.currentPage).toBe(4);
  });

  // it('should as many links as the pagesCount', () => {

  //   component.pagesCount = 4;
  //   fixture.detectChanges();

  //   const document : HTMLElement = fixture.nativeElement;
  //   expect(document.querySelectorAll('.page-item').length).toBe(6);
  // })

  it('should create an array with as many items as pageCount', () => {
    //given
    component.pagesCount = 4;

    const arr = component.getPages();

    expect(arr.length).toBe(4);

    console.log(arr);
    arr.forEach((value) => expect(Number.isInteger(value)).toBeTruthy());
  });

  it('should go to next page', () => {
    component.pagesCount = 5;
    component.currentPage = 3;

    const linkDebug = fixture.debugElement.query(By.css('.next a'));
    linkDebug.triggerEventHandler('click', null);

    expect(component.currentPage).toBe(4);
  });

  it('should not modify currentpage if already on the last page', () => {
    component.pagesCount = 5;
    component.currentPage = 5;

    fixture.detectChanges();

    const linkDebug = fixture.debugElement.query(By.css('.next a'));
    linkDebug.triggerEventHandler('click', null);

    expect(component.currentPage).toBe(5);
    const liElement = fixture.nativeElement.querySelector(
      '.next'
    ) as HTMLElement;
    expect(liElement.classList.contains('disabled')).toBeTruthy();
  });

  it('should go to previous page when previousbutton is clicked', () => {
    component.pagesCount = 5;
    component.currentPage = 3;

    const linkDebug = fixture.debugElement.query(By.css('.previous a'));
    linkDebug.triggerEventHandler('click', null);

    expect(component.currentPage).toBe(2);
  });

  it('should not modify currentpage when click previous if already on the first page', () => {
    component.pagesCount = 5;
    component.currentPage = 1;

    fixture.detectChanges();

    const linkDebug = fixture.debugElement.query(By.css('.previous a'));
    linkDebug.triggerEventHandler('click', null);

    expect(component.currentPage).toBe(1);
    const liElement = fixture.nativeElement.querySelector(
      '.previous'
    ) as HTMLElement;
    expect(liElement.classList.contains('disabled')).toBeTruthy();
  });

  it('should change currentpage hen we click on page link', () => {
    //given we have 5 pages ang the currentPage is 2
    component.currentPage = 2;
    component.pagesCount = 5;
    fixture.detectChanges();

    const linkDebug = fixture.debugElement.query(
      By.css('.page-item:nth-of-type(4) .page-link')
    );
    linkDebug.triggerEventHandler('click', null);

    expect(component.currentPage).toBe(3);
  });

  it('should apply . active class on the currentPage element', () => {
    component.pagesCount = 5;
    component.currentPage = 3;

    fixture.detectChanges();

    const activeElement = document.querySelector('.active');
    expect(activeElement.textContent).toBe('3');

    expect(document.querySelectorAll('.active').length).toBe(1);
  });

  it('should emit the page when the page change', (done) => {
    // given we have 5 pages and currentpage is 3
    component.currentPage = 3;
    component.pagesCount = 5;

    component.onPageChange.subscribe((p) => {
      expect(p).toBe(2);
      done();
    });

    //When we call changePage with 2
    component.changePage(2);

    //then the event value should be 2
  });

  it('should emit the page when we click on a button', (done) => {
    component.currentPage = 3;
    component.pagesCount = 5;
    fixture.detectChanges();

    component.onPageChange.subscribe((p) => {
      expect(p).toBe(2);
      done();
    });

    //When we call changePage with 2
    const linkDebug = fixture.debugElement.query(
      By.css('.page-item:nth-of-type(3) .page-link')
    );
    linkDebug.triggerEventHandler('click', null);
  });
});
