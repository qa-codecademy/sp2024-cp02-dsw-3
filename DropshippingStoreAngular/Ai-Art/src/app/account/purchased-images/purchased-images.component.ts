import { Component, signal } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-purchased-images',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './purchased-images.component.html',
  styleUrl: './purchased-images.component.css'
})
export class PurchasedImagesComponent {
boughtImages = signal<any>([]);
isLoading = signal<boolean>(true);

constructor(private readonly accountService: AccountService){}


fetchUserInfo(){
  this.accountService.getUserInfo().subscribe({
    next: (data) => {
      console.log('User info response:', data);
      this.boughtImages.set(data.userInfo.boughtImages);
      this.isLoading.set(false);
    },
    error: (error) => {
      console.error('Error fetching user info', error);
      this.isLoading.set(false)
    },
    complete: () => {
      console.log('User info fetch complete');
      this.isLoading.set(false)
    }
  });
}

}
