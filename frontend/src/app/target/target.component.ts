import {Component, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {AppService} from "../app.service";
import {HttpResponseType} from "../interfaces/http-response";
import {TargetResponse} from "../models/target";
import {AppConst} from "../app.const";
import {ActivatedRoute, Router} from "@angular/router";
import {NetworkResponse} from "../models/network";
import {NotifyService} from "../notify.service";
import {TargetService} from "../services/target.service";
import {TimeEntryIndexResponse, TimeEntryResponse, TimeEntryState} from "../models/time_entry";

@Component({
  selector: 'app-target',
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.css']
})
export class TargetComponent implements OnInit {

  // The current target
  currentNetwork: NetworkResponse = {
    id: '',
    user_id: '',
    name: '',
    created_at: '',
    updated_at: '',
    targets: []
  }
  currentTarget: TargetResponse = {
    id: '',
    user_network_id: '',
    name: '',
    ip: '',
    state: 's_new',
    created_at: '',
    updated_at: ''
  }

  // The target's state: If its currently worked on.
  timerState: number = TimeEntryState.stop;
  timeEntryState = TimeEntryState;

  // The active phase.
  currentPhase = 0;

  // The total time the user worked on this target.
  totalTargetTime = "0001-01-01 00:00:00";

  // The phases
  /** TODO Get the names from the I18n file. **/
  phases = [
    {
      "id": "general",
      "name": "General"
    },
    {
      "id": "osint",
      "name": "OSInt"
    },
    {
      "id": "enumeration",
      "name": "Enumeration"
    },
    {
      "id": "privilege_escalation",
      "name": "Privilege escalation"
    },
    {
      "id": "post_exploitation",
      "name": "Post exploitation"
    }
  ]

  // Stores the parameters from the URL.
  urlUserId = '';
  urlNetworkId = '';
  urlTargetId = '';

  // Stores the current page state.
  httpResponseType = HttpResponseType;
  pageStatus = HttpResponseType.Open;

  constructor(
    private http: HttpClient,
    private translate: TranslateService,
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute,
    private notifyService: NotifyService,
    public targetService: TargetService
  ) {
    this.translate.get("models.target.one").subscribe((val: string) => {
      this.appService.setPageTitle(val);
    });

    // Get the ids from the url parameter.
    this.route.params.subscribe( params => {
      this.urlUserId = params["user_id"];
      this.urlNetworkId = params["network_id"];
      this.urlTargetId = params["id"];

      this.loadNetwork();
      this.loadTarget();
    });

    this.loadTargetTime();
  }

  ngOnInit(): void {
  }

  // Loads the target from the url, if available.
  loadNetwork(): void {
    this.http.get<NetworkResponse>(
      AppConst.BACKEND_NETWORKS_SHOW_PATH
        .replace(":user_id", sessionStorage.getItem('uuid') || "")
        .replace(":id", this.urlNetworkId || ""),
    ).subscribe((resp: NetworkResponse) => {
      this.pageStatus = HttpResponseType.Ok;
      this.currentNetwork = resp;
    },(error) => {
      if (error.status == 404) {
        this.pageStatus = HttpResponseType.NotFound;
      } else {
        this.pageStatus = HttpResponseType.ServerError;
      }
    });
  }

  // Loads the target from the url, if available.
  loadTarget(): void {
    this.http.get<TargetResponse>(
      AppConst.BACKEND_TARGETS_SHOW_PATH
        .replace(":user_id", sessionStorage.getItem('uuid') || "")
        .replace(":network_id", this.urlNetworkId || "")
        .replace(":id", this.urlTargetId || ""),
    ).subscribe((resp: TargetResponse) => {
      this.pageStatus = HttpResponseType.Ok;
      this.currentTarget = resp;

      this.translate.get("models.target.one").subscribe((val: string) => {
        this.appService.setPageTitle(val + ' ' + this.currentTarget.name);
      });
    },(error) => {
      if (error.status == 404) {
        this.pageStatus = HttpResponseType.NotFound;
      } else {
        this.pageStatus = HttpResponseType.ServerError;
      }
    });
  }

  increaseState() : void {
    this.http.put<TargetResponse>(
      AppConst.BACKEND_TARGETS_UPDATE_PATH
        .replace(":user_id", sessionStorage.getItem('uuid') || "")
        .replace(":network_id", this.urlNetworkId || "")
        .replace(":id", this.urlTargetId || ""),
      {
        "target": {
          "state": this.targetService.nextState(this.currentTarget.state)
        }
      }
    ).subscribe(() => {
      this.loadTarget();
    }, error => {
      this.translate.get("general.general_error").subscribe((val: string) => {
        this.notifyService.showError(val);
        console.error(error);
      });
    });

  }

  toggleTargetTimer(newState: string) : void {
    this.http.post<TimeEntryResponse>(
      AppConst.BACKEND_TIME_ENTRIES_CREATE_PATH
        .replace(":user_id", sessionStorage.getItem('uuid') || "")
        .replace(":network_id", this.urlNetworkId || "")
        .replace(":target_id", this.urlTargetId || ""),
      {
        "time_entry": {
          "state": newState
        }
      }
    ).subscribe(() => {
      this.timerState = (newState == this.timeEntryState[this.timeEntryState.stop]) ? this.timeEntryState.stop : this.timeEntryState.start;
    }, error => {
      this.translate.get("general.general_error").subscribe((val: string) => {
        this.notifyService.showError(val);
        console.error(error);
      });
    });

  }


  loadTargetTime(): void {
    this.http.get<TimeEntryIndexResponse>(
      AppConst.BACKEND_TIME_ENTRIES_INDEX_PATH
        .replace(":user_id", sessionStorage.getItem('uuid') || "")
        .replace(":network_id", this.urlNetworkId || "")
        .replace(":target_id", this.urlTargetId || ""),
    ).subscribe((resp: TimeEntryIndexResponse) => {
      // Rails returns the date string as "0000-01-01 00:00:28 +0100".
      // But we need it in the format "0000-01-01T00:00:28".
      // Therefore we convert the date string here before parsing.
      this.totalTargetTime = resp.total_time
        .replace(" ", "T")
        .split(" ")[0];
    },(error) => {
      this.translate.get("general.general_error").subscribe((val: string) => {
        this.notifyService.showError(val);
        console.error(error);
      });
    });
  }

}
