import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryFrameComponent } from './memory-frame.component';

describe('MemoryFrameComponent', () => {
  let component: MemoryFrameComponent;
  let fixture: ComponentFixture<MemoryFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemoryFrameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemoryFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
