import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('ngOnInit', () => {
    spyOn(component, 'loadImages');

    component.ngOnInit();

    expect(component.loadImages).toHaveBeenCalled();
  });

  it('loadImages', () => {
    component.loadImages();

    expect(component.randomPhotos.length).toBe(component.iterations * 2); //Hay que contar con la carga inicial
  });

  it('filterImages', () => {
    const ev = 'Lorem';

    component.randomPhotos = [
      { id: 1, photo: 'photo1.jpg', text: 'Lorem ipsum' },
      { id: 2, photo: 'photo2.jpg', text: 'Dolor sit amet' },
    ];

    component.filterImages(ev);

    expect(component.filteredPhotos.length).toBe(1);
    expect(component.filteredPhotos[0].text).toContain(ev);
  });

  it('should load more images on scroll', () => {
    component.filteredPhotos = [
      { id: 1, photo: 'photo1.jpg', text: 'Lorem ipsum dolor sit amet' },
      { id: 2, photo: 'photo2.jpg', text: 'Consectetur adipiscing elit' }
    ];
    component.page = 1;
    component.photoPerPage = 2;
    component.iterations = 4;
    component.randomPhotos = [
      { id: 3, photo: 'photo3.jpg', text: 'Sed do eiusmod tempor incididunt' },
      { id: 4, photo: 'photo4.jpg', text: 'Ut labore et dolore magna aliqua' }
    ];

    component.onScroll({} as any);

    expect(component.page).toEqual(2);
    expect(component.filteredPhotos.length).toEqual(2);
  });
});
