/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Level2Component } from './level2.component';

describe('Level2Component', () => {
  let component: Level2Component;
  let fixture: ComponentFixture<Level2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Level2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Level2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
