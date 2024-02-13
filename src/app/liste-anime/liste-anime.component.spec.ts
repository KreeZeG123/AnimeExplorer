import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAnimeComponent } from './liste-anime.component';

describe('ListeAnimeComponent', () => {
  let component: ListeAnimeComponent;
  let fixture: ComponentFixture<ListeAnimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeAnimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeAnimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
