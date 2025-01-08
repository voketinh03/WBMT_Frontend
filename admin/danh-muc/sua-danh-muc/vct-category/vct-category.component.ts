import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../../shared.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vct-category',
  templateUrl: './vct-category.component.html',
  styleUrls: ['./vct-category.component.css']
})
export class VctCategoryComponent implements OnInit {
  categoryData: any = {}; // This will hold the data for the category

  constructor(
    private service: SharedService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const categoryId = this.route.snapshot.paramMap.get('category_id'); // Get the category ID from the route
    if (categoryId && !isNaN(+categoryId)) { // Check if the ID is a valid number
      this.GetCategoryDetails(+categoryId);
    } else {
      console.error('ID không hợp lệ hoặc bị thiếu');
      alert('ID không hợp lệ. Vui lòng kiểm tra URL.');
    }
  }

  // Method to fetch category details based on the provided ID
  GetCategoryDetails(category_id: number): void {
    this.service.getDanhMucById(category_id).subscribe(
      (data: any) => {
        if (data.status === 'success' && Array.isArray(data.data) && data.data.length > 0) {
          this.categoryData = data.data[0]; // Access the first item in the array
        } else {
          console.error('Category data not found');
          alert('Unable to retrieve category details');
        }
      },
      (error: any) => {
        console.error('Error fetching category details', error);
      }
    );
  }
  
}
