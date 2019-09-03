import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarItemComponent } from './modal-editar-item.component';

describe('ModalEditarItemComponent', () => {
  let component: ModalEditarItemComponent;
  let fixture: ComponentFixture<ModalEditarItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditarItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
