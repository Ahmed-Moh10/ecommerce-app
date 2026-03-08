import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { BrandsService } from './service/brands.service';
import { Brands } from './interfaces/brands.interface';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-brands',
  imports: [ FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
    private readonly brandsService = inject(BrandsService)

    

    brandsList = signal<Brands[]>([]) 


    ngOnInit(): void {
        this.brandsService.getBrandsData().subscribe({
          next:(res)=>{
            this.brandsList.set(res.data)
          },
          error:(err)=>{
            console.log(err)
          }
        })
    }
}
