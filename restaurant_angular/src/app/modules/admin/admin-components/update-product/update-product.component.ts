import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminService } from '../../admin-services/admin.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  productId: any;
  isSpinning = false;
  validateForm!: FormGroup;
  imgChanged = false;
  selectedFile: any;
  imagePreview: string | ArrayBuffer | null = null;
  existingImage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute
  ) {
    this.productId = this.activatedRoute.snapshot.params['productId'];
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
    });
    this.getProductById();
  }

  updateProduct(): void {
    this.isSpinning = true;
    const formData: FormData = new FormData();
    if (this.imgChanged && this.selectedFile) {
      formData.append('img', this.selectedFile);
    }
    formData.append('name', this.validateForm.get('name')!.value);
    formData.append('price', this.validateForm.get('price')!.value.toString());
    formData.append('description', this.validateForm.get('description')!.value);
    
    this.adminService.updateProduct(this.productId, formData).subscribe(
      (res) => {
        this.isSpinning = false;
        if (res.id != null) {
          this.message.success('Product updated Successfully.', { nzDuration: 5000 });
          this.router.navigateByUrl('/admin/dashboard');
          console.log('Product updated successfully:', res);
        } else {
          this.message.error('Something went wrong', { nzDuration: 5000 });
          console.log('Product update failed:', res); 
        }
      },
      (error) => {
        this.isSpinning = false;
        console.error('Error occurred while updating product:', error); 
        this.message.error('Failed to update product. Please try again later.', { nzDuration: 5000 });
      }
    );
  }
  

  getProductById(): void {
    this.adminService.getProductById(this.productId).subscribe(
      (res: any) => {
        const productDto = res;
        this.existingImage = 'data:image/jpeg;base64,' + res.returnedImg;
        this.validateForm.patchValue(productDto);
      },
      (error) => {
        console.error('Error occurred while fetching product:', error);
        this.message.error('Failed to fetch product details. Please try again later.', { nzDuration: 5000 });
      }
    );
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.previewImage();
    this.imgChanged = true;
    this.existingImage = null;
  }

  previewImage(): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(this.selectedFile);
  }
}
