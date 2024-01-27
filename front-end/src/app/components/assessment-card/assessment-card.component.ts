import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-assessment-card',
  templateUrl: './assessment-card.component.html',
  styleUrls: ['./assessment-card.component.sass']
})
export class AssessmentCardComponent {
  @Input() assessment: any;
  onAssessmentClick(id:number){
    console.log(id)
  }
}
