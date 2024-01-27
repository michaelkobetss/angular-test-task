import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PAGES } from '../../constants/pages';

@Component({
  selector: 'app-assessment-card',
  templateUrl: './assessment-card.component.html',
  styleUrls: ['./assessment-card.component.sass']
})
export class AssessmentCardComponent {
  @Input() assessment: any;

  constructor(private router: Router) { }

  onAssessmentClick(id:number){
    console.log(id)
  }

  openGraph(id: number): void {
    this.router.navigate([PAGES.ASSESSMENT_GRAPH+`/${id}`]);
  }

  
}
