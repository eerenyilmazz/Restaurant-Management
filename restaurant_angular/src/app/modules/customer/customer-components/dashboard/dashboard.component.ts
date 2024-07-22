import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/modules/admin/admin-services/admin.service';
import { CustomerService } from '../../customer-service/customer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  categories: any[] = [];
  isSpinning: boolean = false;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.categories = []; 
    this.customerService.getAllCategories().subscribe((res) => {
      this.categories = res.map((element: any) => ({
        ...element,
        processedImg: 'data:image/jpeg;base64,' + element.returnedImg
      }));
    });
  }
}
