import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetBlockStandardComponent } from './target-block-standard.component';

describe('TargetBlockStandardComponent', () => {
  let component: TargetBlockStandardComponent;
  let fixture: ComponentFixture<TargetBlockStandardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetBlockStandardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetBlockStandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
