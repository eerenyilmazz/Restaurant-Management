import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../admin-services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss']
})
export class ViewProductsComponent implements OnInit {
  categoryId: any;
  Products: any[] = [];
  isSpinning: boolean = false;
  validateForm!: FormGroup;
  size: NzButtonSize = 'large';

  constructor(
    private adminService: AdminService,
    private activatedroute: ActivatedRoute,
    private fb: FormBuilder
  ) { 
    this.categoryId = this.activatedroute.snapshot.params['categoryId'];
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({ 
      title: [null, [Validators.required]],
    });
    this.getProductsByCategory();
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.isSpinning = true;
      this.Products = [];
      this.adminService.getProductsByCategoryAndTitle(this.categoryId, this.validateForm.get('title')!.value)
        .subscribe((res: any[]) => {
          console.log(res);
          res.forEach(element => {
            element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
            this.Products.push(element);
          });
          this.isSpinning = false;
        }, error => {
          this.isSpinning = false;
          console.error(error);
        });
    }
  }

  getProductsByCategory(): void {
    this.isSpinning = true;
    this.Products = [];
    this.adminService.getProductsByCategory(this.categoryId).subscribe((res: any[]) => {
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.Products.push(element);
      });
      this.isSpinning = false;
    }, error => {
      this.isSpinning = false;
      console.error(error); 
    });
  }
}
