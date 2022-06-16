import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-target-general',
  templateUrl: './target-general.component.html',
  styleUrls: ['./target-general.component.css']
})
export class TargetGeneralComponent implements OnInit {

  // Stores the parameters from the URL.
  @Input() userId = '';
  @Input() networkId = '';
  @Input() targetId = '';

  constructor() { }

  ngOnInit(): void {
  }

}
