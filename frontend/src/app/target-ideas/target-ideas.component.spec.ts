import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetIdeasComponent } from './target-ideas.component';

describe('TargetIdeasComponent', () => {
  let component: TargetIdeasComponent;
  let fixture: ComponentFixture<TargetIdeasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetIdeasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetIdeasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
