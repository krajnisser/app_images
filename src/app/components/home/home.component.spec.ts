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

    expect(component.randomPhotos.length).toBe(component.photoPerPage * 2); //Hay que contar con la carga inicial
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
    component.iterations = 5;
    component.randomPhotos = [{ id: 1, photo: 'photo1.jpg', text: 'Lorem ipsum' }];

    component.onScroll({ target: { complete: () => {} } });

    expect(component.randomPhotos.length).toBeGreaterThan(1);
  });
});
