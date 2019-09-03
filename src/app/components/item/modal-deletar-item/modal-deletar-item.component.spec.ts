import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeletarItemComponent } from './modal-deletar-item.component';

describe('ModalDeletarItemComponent', () => {
  let component: ModalDeletarItemComponent;
  let fixture: ComponentFixture<ModalDeletarItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDeletarItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeletarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
