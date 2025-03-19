import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../core/interfaces/categories/icategory';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit,OnDestroy{


categoriesData!: ICategory[]




categorySub!:Subscription

constructor( private _CategoriesService:CategoriesService){}
ngOnInit():void{

 
  
 
 this._CategoriesService.getAllCategories().subscribe({
   next:(res)=>{
     
     console.log(res.data);
     this.categoriesData= res.data
   }
 })
 
}
ngOnDestroy(): void {
  this.categorySub?.unsubscribe()
}
}