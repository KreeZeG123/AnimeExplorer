import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneVignetteComponent } from './zone-vignette.component';

describe('ZoneVignetteComponent', () => {
  let component: ZoneVignetteComponent;
  let fixture: ComponentFixture<ZoneVignetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZoneVignetteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ZoneVignetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
