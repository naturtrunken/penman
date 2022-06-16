import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetGeneralComponent } from './target-general.component';

describe('TargetGeneralComponent', () => {
  let component: TargetGeneralComponent;
  let fixture: ComponentFixture<TargetGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
