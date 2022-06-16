import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConst} from "../app.const";
import {NetworksResponse} from "../models/network";
import {AppVarsService} from "../app-vars.service";
import {TranslateService} from "@ngx-translate/core";
import {AppService} from "../app.service";
import {TargetsResponse} from "../models/target";
import {TargetService} from "../services/target.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  networksResponse: NetworksResponse = {
    networks: []
  };

  constructor(
    private http: HttpClient,
    public appVarsService: AppVarsService,
    private translate: TranslateService,
    private appService: AppService,
    private router: Router,
    public targetService: TargetService
  ) {
    this.appService.setPageTitle('dashboard.title');
  }

  ngOnInit(): void {
    this.loadNetworks();
  }

  loadNetworks(): void {
    let userId = sessionStorage.getItem('uuid') || "";
    if (userId == "") {
      console.error("No user id available, please log in first.");
      this.router.navigateByUrl('/login');
      return
    }

    this.http.get<NetworksResponse>(
      AppConst.BACKEND_NETWORKS_INDEX_PATH.replace(":user_id", userId),
    ).subscribe((networkResp: NetworksResponse) => {
      this.networksResponse = networkResp;

      // Get the targets from all networks.
      this.networksResponse.networks.forEach( (network) => {

        this.http.get<TargetsResponse>(
          AppConst.BACKEND_TARGETS_INDEX_PATH
            .replace(":user_id", sessionStorage.getItem('uuid') || "")
            .replace(":network_id", network.id),
        ).subscribe((targetsResp: TargetsResponse) => {
          // Initialize the target list from this network.
          network.targets = [];

          // Push all targets from the latest response to the target list from the current network.
          targetsResp.targets.forEach( (target) => {
            network.targets.push(target);
          });

        });

      });
    });
  }

}
