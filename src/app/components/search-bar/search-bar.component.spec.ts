import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBarComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter after the delay', (done) => {
    const filterValue = 'example';
    const emitSpy = spyOn(component.filterOutput, 'emit');

    component.filterImages({ detail: { value: filterValue } });

    setTimeout(() => {
      expect(emitSpy).toHaveBeenCalledWith(filterValue);
      done();
    }, 300);
  });

  it('should clear delay', (done) => {
    const filterValue = 'example';
    const emitSpy = spyOn(component.filterOutput, 'emit');

    component.filterImages({ detail: { value: filterValue } });
    component.filterImages({ detail: { value: 'new value' } });

    setTimeout(() => {
      expect(emitSpy).not.toHaveBeenCalledWith(filterValue);
      done();
    }, 300);
  });
});
