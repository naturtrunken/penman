import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetAttackVectorsComponent } from './target-attack-vectors.component';

describe('TargetAttackVectorsComponent', () => {
  let component: TargetAttackVectorsComponent;
  let fixture: ComponentFixture<TargetAttackVectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetAttackVectorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetAttackVectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
