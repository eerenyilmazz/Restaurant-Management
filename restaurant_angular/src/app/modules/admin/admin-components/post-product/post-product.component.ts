import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminService } from '../../admin-services/admin.service';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.scss']
})
export class PostProductComponent {

  constructor(
    private service: AdminService,
    private fb: FormBuilder,
    private message: NzMessageService
  )
  {}

  ngOnInit(){
    this.getAllCategories();
    
    }

  
    getAllCategories(){
      this.service.getAllCategory().subscribe((res)=>{
        console.log(res);
      })

    }
}
