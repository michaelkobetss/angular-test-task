import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../../services/request.service'; 
import { ChartDataset } from 'chart.js';
import { API } from '../../constants/API';

/**
 * AssessmentGraphComponent is a component that displays a graph of user assessments.
 * It uses the Chart.js for interface
 * NG2-charts to display graphs
 */
@Component({
  selector: 'app-assessment-graph', // The name of the component as it will be used in templates
  templateUrl: './assessment-graph.component.html', // The location of the component's HTML template
  styleUrls: ['./assessment-graph.component.sass'], // The location of the component's private CSS styles
})
export class AssessmentGraphComponent implements OnInit {
  public chartOptions: object = {
    responsive: true, // This makes the chart responsive to window size changes
  };
  public chartLabels: string[] = []; // Labels for the chart's x-axis
  public chartType: string = 'bar'; // The type of chart to display
  public chartLegend = true; // Whether to display a legend on the chart
  public chartData: ChartDataset[] = []; // The data to display on the chart

  /**
   * The constructor initializes ActivatedRoute and RequestService.
   * ActivatedRoute is used to access the route parameters.
   * RequestService is used to make HTTP requests.
   */
  constructor(
    private route: ActivatedRoute,
    private requestService: RequestService
  ) {}

  /**
   * ngOnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   * Here, it is used to get the 'id' route parameter and make an HTTP request to get the data for the chart.
   */
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Get the 'id' route parameter
  
    // Make an HTTP GET request to the URL for user assessments graph data
    this.requestService.getRequest(API.URL_USER_ASSESSMENTS_GRAPH+id).subscribe(
      (data: any) => {
        // On success, initialize the chart labels and data
        this.chartLabels = Object.keys(data.data);
        this.chartData = [
          { data: Object.values(data.data), label: 'Assessment Data' },
        ];
        this.chartType = data.type; 
      },
      (error) => console.error(error) // On error, log the error to the console
    );
  }
}

