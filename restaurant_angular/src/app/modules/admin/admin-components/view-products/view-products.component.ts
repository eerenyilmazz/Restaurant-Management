import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../admin-services/admin.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss']
})
export class ViewProductsComponent implements OnInit {
  categoryId: any;
  Products: any[] = [];
  isSpinning: boolean = false;

  constructor(
    private adminService: AdminService,
    private activatedroute: ActivatedRoute
  ) { 
    this.categoryId = this.activatedroute.snapshot.params['categoryId'];
  }

  ngOnInit(): void {
    this.getProductsByCategory();
  }

  getProductsByCategory() {
    this.isSpinning = true;
    this.Products = [];
    this.adminService.getProductsByCategory(this.categoryId).subscribe((res) => {
      res.forEach((element: any) => {
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
