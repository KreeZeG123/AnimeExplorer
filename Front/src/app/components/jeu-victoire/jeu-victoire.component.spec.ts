import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JeuVictoireComponent } from './jeu-victoire.component';

describe('JeuVictoireComponent', () => {
  let component: JeuVictoireComponent;
  let fixture: ComponentFixture<JeuVictoireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JeuVictoireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JeuVictoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
