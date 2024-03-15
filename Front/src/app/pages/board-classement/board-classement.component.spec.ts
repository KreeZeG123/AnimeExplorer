import * as html2canvas from 'html2canvas';


import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardClassementComponent } from './board-classement.component';

describe('BoardClassementComponent', () => {
  let component: BoardClassementComponent;
  let fixture: ComponentFixture<BoardClassementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardClassementComponent] // Utilisez 'declarations' pour déclarer le composant
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoardClassementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});



