import { async, TestBed } from '@angular/core/testing';
import { LayoutFeatureModule } from './feature-layout.module';

describe('LayoutFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LayoutFeatureModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LayoutFeatureModule).toBeDefined();
  });
});
