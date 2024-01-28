import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../../services/request.service'; 
import { ChartDataset } from 'chart.js';
import { API } from '../../constants/API';

@Component({
  selector: 'app-assessment-graph',
  templateUrl: './assessment-graph.component.html',
  styleUrls: ['./assessment-graph.component.sass'],
})
export class AssessmentGraphComponent implements OnInit {
  public chartOptions: object = {
    responsive: true,
  };
  public chartLabels: string[] = [];
  public chartType: string = 'bar';
  public chartLegend = true;
  public chartData: ChartDataset[] = [];

  constructor(
    private route: ActivatedRoute,
    private requestService: RequestService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
  
    this.requestService.getRequest(API.URL_USER_ASSESSMENTS_GRAPH+id).subscribe(
      (data: any) => {
        console.log(data);
        this.chartLabels = Object.keys(data.data);
        this.chartData = [
          { data: Object.values(data.data), label: 'Assessment Data' },
        ];
        this.chartType = data.type; 
      },
      (error) => console.error(error)
    );
  }
}
