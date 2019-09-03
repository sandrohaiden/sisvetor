import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarSubitemComponent } from './modal-editar-subitem.component';

describe('ModalEditarSubitemComponent', () => {
  let component: ModalEditarSubitemComponent;
  let fixture: ComponentFixture<ModalEditarSubitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditarSubitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarSubitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
