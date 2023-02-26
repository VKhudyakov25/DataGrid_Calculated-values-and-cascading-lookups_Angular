import { Component } from '@angular/core';
import ArrayStore from 'devextreme/data/array_store';

import { Employee, AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService],
})
export class AppComponent {
  store: ArrayStore;
  employees: Employee[];
  constructor(service: AppService) {
    this.employees = service.getEmployees();
    this.customCallback = this.customCallback.bind(this);
    this.store = new ArrayStore({
      key: 'id',
      data: this.employees,
    });
  }
  customCallback(params: any) {
    if (!params.data.firstName) {
      return !!params.data.lastName ? false : true;
    }
    return true;
  }

  insertRow(e: any) {
    if (!e.data.firstName && !e.data.lastName) {
      e.data.firstName = 'John';
      e.data.lastName = 'Doe';
    }
  }

  updateRow(e: any) {
    if (
      (e.newData.firstName === '' || e.oldData.firstName === '') &&
      (e.newData.lastName === '' || e.oldData.lastName === '')
    ) {
      e.newData.firstName = 'John';
      e.newData.lastName = 'Doe';
    }
  }
}
