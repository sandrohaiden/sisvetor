import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCadastrarItemComponent } from './modal-cadastrar-item.component';

describe('ModalCadastrarItemComponent', () => {
  let component: ModalCadastrarItemComponent;
  let fixture: ComponentFixture<ModalCadastrarItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCadastrarItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCadastrarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
