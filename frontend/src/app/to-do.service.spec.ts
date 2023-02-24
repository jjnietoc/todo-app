import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ToDoService } from './to-do.service';

describe('ToDoService', () => {
  let service: ToDoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(ToDoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should get all to-dos', () => {
    expect(service.getToDos()).toBeTruthy();
    })
});
