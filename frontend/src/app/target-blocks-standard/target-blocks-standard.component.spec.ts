import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetBlocksStandardComponent } from './target-blocks-standard.component';

describe('TargetBlocksStandardComponent', () => {
  let component: TargetBlocksStandardComponent;
  let fixture: ComponentFixture<TargetBlocksStandardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetBlocksStandardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetBlocksStandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
