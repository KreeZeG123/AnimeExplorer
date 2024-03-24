import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardJeuComponent } from './board-jeu.component';

describe('BoardJeuComponent', () => {
  let component: BoardJeuComponent;
  let fixture: ComponentFixture<BoardJeuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardJeuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoardJeuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
