import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardDecouverteComponent } from './board-decouverte.component';

describe('BoardDecouverteComponent', () => {
  let component: BoardDecouverteComponent;
  let fixture: ComponentFixture<BoardDecouverteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardDecouverteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoardDecouverteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
