import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetBlocksServicesFormComponent } from './target-blocks-services-form.component';

describe('TargetBlocksServicesFormComponent', () => {
  let component: TargetBlocksServicesFormComponent;
  let fixture: ComponentFixture<TargetBlocksServicesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetBlocksServicesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetBlocksServicesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
