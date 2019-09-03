import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCadastrarSubitemComponent } from './modal-cadastrar-subitem.component';

describe('ModalCadastrarSubitemComponent', () => {
  let component: ModalCadastrarSubitemComponent;
  let fixture: ComponentFixture<ModalCadastrarSubitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCadastrarSubitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCadastrarSubitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
