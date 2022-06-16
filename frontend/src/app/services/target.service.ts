import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TargetService {

  constructor() {
  }

  nextState(state: String) : string {
    switch (state) {
      case "s_new":
        return "s_open"
      case "s_open":
        return "s_user"
      case "s_user":
        return "s_root"
      case "s_root":
        return "s_new"
      default:
        return "s_new"
    }
  }

  classForState(state: String) : string {
    switch (state) {
      case "s_new":
        return "bg-secondary"
      case "s_open":
        return "bg-primary"
      case "s_user":
        return "bg-warning"
      case "s_root":
        return "bg-success"
      default:
        return "bg-secondary"
    }
  }

}

