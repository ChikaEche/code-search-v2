import { Component } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { BreakPointService } from '../core/services/break-point.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(
    public readonly breakPointService: BreakPointService,
    private sidebarService: NbSidebarService
  ) { }

  toogle() {
    this.sidebarService.toggle();
  }

}
