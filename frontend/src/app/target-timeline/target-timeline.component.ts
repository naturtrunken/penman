import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {NotifyService} from "../notify.service";
import {AppConst} from "../app.const";
import {TargetTimelineResponse} from "../models/target";

@Component({
  selector: 'app-target-timeline',
  templateUrl: './target-timeline.component.html',
  styleUrls: ['./target-timeline.component.css']
})
export class TargetTimelineComponent implements OnInit {

  // Stores the parameters from the URL.
  @Input() userId = '';
  @Input() networkId = '';
  @Input() targetId = '';

  timeline: TargetTimelineResponse = {
    timeline: []
  };

  constructor(
    private http: HttpClient,
    private translate: TranslateService,
    private notifyService: NotifyService
  ) { }

  ngOnInit(): void {
    this.loadTimeline();
  }

  loadTimeline(): void {
    this.http.get<TargetTimelineResponse>(
      AppConst.BACKEND_TARGETS_TIMELINE_PATH
        .replace(":user_id", this.userId || "")
        .replace(":network_id", this.networkId || "")
        .replace(":target_id", this.targetId || ""),
    ).subscribe((resp: TargetTimelineResponse) => {
      this.timeline = resp;
    },(error) => {
      this.translate.get("general.general_error").subscribe((val: string) => {
        this.notifyService.showError(val);
        console.error(error);
      });
    });
  }
}
