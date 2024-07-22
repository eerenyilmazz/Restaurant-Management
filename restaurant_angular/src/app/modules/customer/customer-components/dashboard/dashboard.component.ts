import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../customer-service/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  categories: any[] = [];
  isSpinning: boolean = false;
  validateForm: FormGroup;
  size: NzButtonSize = 'large';

  constructor(private customerService: CustomerService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null, Validators.required]
    });
    this.getAllCategories();
  }

  searchCategory(): void {
    if (this.validateForm.valid) {
      this.categories = [];
      this.customerService.getCategoriesByName(this.validateForm.get('title')!.value).subscribe((res) => {
        console.log(res);
        this.categories = res.map((element: any) => ({
          ...element,
          processedImg: 'data:image/jpeg;base64,' + element.returnedImg
        }));
      });
    }
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
