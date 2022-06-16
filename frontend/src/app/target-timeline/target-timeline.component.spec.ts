import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetTimelineComponent } from './target-timeline.component';

describe('TargetTimelineComponent', () => {
  let component: TargetTimelineComponent;
  let fixture: ComponentFixture<TargetTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetTimelineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
