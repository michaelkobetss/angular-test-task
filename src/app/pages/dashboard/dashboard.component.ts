import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Assessment } from '../../interfaces/assessments';
import { RequestService } from '../../services/request.service'; 
import { API } from '../../constants/API';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  assessments: any = [];

  constructor(private requestService: RequestService, private router: Router) {}

  ngOnInit(): void {
    this.requestService.getRequest(API.URL_USER_ASSESSMENTS).subscribe(
      data => {
        this.assessments = data;
      },
      error => console.error(error)
    );
  }

  onAssessmentClick(id: number): void {
    this.router.navigate([API.URL_USER_ASSESSMENTS_GRAPH], { queryParams: { id } });
  }
}
