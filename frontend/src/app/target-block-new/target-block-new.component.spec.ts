import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetBlockNewComponent } from './target-block-new.component';

describe('TargetBlockNewComponent', () => {
  let component: TargetBlockNewComponent;
  let fixture: ComponentFixture<TargetBlockNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetBlockNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetBlockNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
