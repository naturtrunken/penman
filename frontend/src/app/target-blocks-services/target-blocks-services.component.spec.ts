import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetBlocksServicesComponent } from './target-blocks-services.component';

describe('TargetBlocksServicesComponent', () => {
  let component: TargetBlocksServicesComponent;
  let fixture: ComponentFixture<TargetBlocksServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetBlocksServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetBlocksServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
