import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of, throwError } from 'rxjs';

import { BlogPostComponent } from './blog-post.component';

describe('BlogPostComponent', () => {
  let component: BlogPostComponent;
  let fixture: ComponentFixture<BlogPostComponent>;

  const mockActivatedRoute = {
    paramMap : of(convertToParamMap({
      id: 2
    }))
  };

  const mockHttpClient = {
    get(url: string){return of(null)}
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogPostComponent ],
      providers: [
        {provide : ActivatedRoute, useValue: mockActivatedRoute},
        {provide : HttpClient, useValue : mockHttpClient}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display : title H2 / content / picture', () => {
    const DOM: HTMLElement = fixture.nativeElement;
    //Given we have a post and the post is in my component
    const post = {
      title : "Article de blog",
      content : "contenu article de blog",
      image : 'http://placehold.it/200x200'
    }

    //When my component has a post
    component.post = post;
    fixture.detectChanges();

    //Then
    expect(document.querySelector('h2').textContent).toBe(post.title);
    expect(document.querySelector('img').getAttribute('src')).toBe(post.image);
    expect(document.querySelector('p').textContent).toBe(post.content);
  })

  it('should display a loading screen if no post is given', ()=> {
    const document : HTMLElement = fixture.nativeElement;

    delete component.post;
    fixture.detectChanges();

    expect(document.querySelector('h2').textContent).toBe('Article en cours de chargement')
  })

  it('should find an id param in the route', () => {

    expect(component.id).toBe(2)
  })

  it('should render the adequate content for id param', () => {

    spyOn(mockHttpClient, 'get').and.returnValue(
      of({
        "id": 2,
        "title": "Mock titre",
        "content": "Mock content",
        "image": "htpp://placehold.it/200x200"
      })
    )

    component.ngOnInit();

    expect(component.post).toBeDefined();
    expect(component.post.id).toBe(2);
    expect(component.post.title).toBe("Mock titre");
    expect(component.post.content).toBe("Mock content");
    expect(component.post.image).toBe("htpp://placehold.it/200x200");
  })

  it ('should display an aerror message if post is not found in the API', () => {
    const document: HTMLElement = fixture.nativeElement;
    spyOn(mockHttpClient, 'get').and.returnValue(
      throwError({status: 404})
    )
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.error).toBeTruthy();
    expect(component.errorMessage).toBe("Nous n'avous pas trouvé cet article");
    expect(document.querySelector(".error")).toBeTruthy();
    expect(document.querySelector(".loading")).toBeNull();
  })

});
