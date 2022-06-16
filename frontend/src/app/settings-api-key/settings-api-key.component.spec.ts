import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsApiKeyComponent } from './settings-api-key.component';

describe('SettingsApiKeyComponent', () => {
  let component: SettingsApiKeyComponent;
  let fixture: ComponentFixture<SettingsApiKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsApiKeyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsApiKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
