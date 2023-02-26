import { Component } from '@angular/core';

import { Employee, AppService, Country, Order, Product } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService],
})
export class AppComponent {
  employees: Employee[];
  countries: Country[];
  orders: Order[];
  products: Product[];

  constructor(service: AppService) {
    this.getFilteredCountries = this.getFilteredCountries.bind(this);
    this.getFilteredOrders = this.getFilteredOrders.bind(this);
    this.employees = service.getEmployees();
    this.countries = service.getCoutries();
    this.orders = service.getOrders();
    this.products = service.getProducts();
    console.log(this.orders);
  }
  setEmployeeValue(rowData: any, value: any) {
    rowData.employeeId = value;
    rowData.countryId = null;
    rowData.orderId = null;
  }
  setCountryValue(rowData: any, value: any) {
    rowData.countryId = value;
    rowData.orderId = null;
  }

  getFilteredCountries(options: any) {
    return {
      store: this.countries,
      filter: options.data
        ? ['employeeId', '=', options.data.employeeId]
        : null,
    };
  }
  getFilteredOrders(options: any) {
    console.log('here', options);
    let filterArray;
    if (options.data) {
      filterArray = options.data.countryId
        ? [
            ['employeeId', '=', options.data.employeeId],
            ['countryId', '=', options.data.countryId],
          ]
        : ['employeeId', '=', options.data.employeeId];
    } else filterArray = null;

    return {
      store: this.orders,
      filter: filterArray,
    };
  }

  totalPriceValue(rowData: any) {
    return rowData.Price * rowData.Count;
  }
}
