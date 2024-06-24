import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { NzButtonSize } from 'ng-zorro-antd/button'; 
import { AdminService } from '../../../admin-services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  categories: any[] = [];
  validateForm!: FormGroup;
  size: NzButtonSize = 'large';
  isSpinning: boolean = false; // Initialize isSpinning as false

  constructor(private adminService: AdminService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
    });
    this.getAllCategories();
  }

  submitForm(): void {
    this.isSpinning = true;
    this.categories = [];
    this.adminService.getAllCategoriesByTitle(this.validateForm.get('title')!.value).subscribe((res) => {
      res.forEach((element: any) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.categories.push(element);
      });
      this.isSpinning = false;
    });
  }
  

  getAllCategories(): void {
    this.categories = []; 
    this.adminService.getAllCategories().subscribe((res) => {
      this.categories = res.map((element: any) => ({
        ...element,
        processedImg: 'data:image/jpeg;base64,' + element.returnedImg
      }));
    });
  }
}
