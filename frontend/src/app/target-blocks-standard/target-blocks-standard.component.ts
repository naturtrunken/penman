import {Component, Input, OnInit} from '@angular/core';
import {AppConst} from "../app.const";
import {HttpResponseType} from "../interfaces/http-response";
import {BlocksResponse} from "../models/block";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-target-blocks-standard',
  templateUrl: './target-blocks-standard.component.html',
  styleUrls: ['./target-blocks-standard.component.css']
})
export class TargetBlocksStandardComponent implements OnInit {

  // The current block.
  blocks: BlocksResponse = {
    blocks: []
  };

  // Input phase
  @Input() phase: string = '';

  // Input service
  @Input() serviceId: string = '';

  // Stores the parameters from the URL.
  @Input() userId = '';
  @Input() networkId = '';
  @Input() targetId = '';

  // Stores the current page state.
  httpResponseType = HttpResponseType;
  pageStatus = HttpResponseType.Open;

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadBlocks();
  }

  loadBlocks(): void {
    this.http.get<BlocksResponse>(
      AppConst.BACKEND_BLOCKS_INDEX_PATH
        .replace(":user_id", this.userId || "")
        .replace(":network_id", this.networkId || "")
        .replace(":target_id", this.targetId || "") +
      '?phase=' + this.phase + (this.serviceId != "" ? '&service_id=' + this.serviceId : ''),
    ).subscribe((resp: BlocksResponse) => {
      this.pageStatus = HttpResponseType.Ok;
      this.blocks = resp;
    },(error) => {
      if (error.status == 404) {
        this.pageStatus = HttpResponseType.NotFound;
      } else {
        this.pageStatus = HttpResponseType.ServerError;
      }
    });
  }

}
