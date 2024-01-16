import { Component } from '@angular/core';
import { JoinsService } from './joins.service';

@Component({
  selector: 'app-joins',
  templateUrl: './joins.component.html',
  styleUrls: ['./joins.component.css']
})
export class JoinsComponent {
  joinedData: any = [];
  isLoading = false;

  constructor(private joinsService: JoinsService) { }

  onJoinClick() {
    this.isLoading = true;
    this.joinsService.getJoinedData().subscribe(data => {
      this.joinedData =
        data;
      this.isLoading = false;
    }, err => {
      console.error('Error fetching joined data:', err);
      this.isLoading = false;
    });
  }
}