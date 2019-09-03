import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeletarSubitemComponent } from './modal-deletar-subitem.component';

describe('ModalDeletarSubitemComponent', () => {
  let component: ModalDeletarSubitemComponent;
  let fixture: ComponentFixture<ModalDeletarSubitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDeletarSubitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeletarSubitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
