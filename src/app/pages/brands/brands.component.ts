import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BrandsService } from '../../core/services/brands/brands.service';
import { IBrands } from '../../core/interfaces/brands/ibrands';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit,OnDestroy {

  brandsData!:IBrands []
  
  
  
  
  categorySub!:Subscription
  
  constructor( private _BrandsService:BrandsService){}
  ngOnInit():void{
  
   
    
   
   this._BrandsService.getAllBrands().subscribe({
     next:(res)=>{
       
       console.log(res.data);
       this.brandsData= res.data
     }
   })
   
  }
  ngOnDestroy(): void {
    this.categorySub?.unsubscribe()
  }
  }


