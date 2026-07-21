import { DashboardService } from './dashboardService';
import { DashboardServiceAdapter } from './dashboardServiceAdapter';

export class DashboardServiceAdaptee implements DashboardServiceAdapter {
  #dashboardService: DashboardService;

  constructor(dashboardService: DashboardService) {
    this.#dashboardService = dashboardService;
  }

  show(data: string) {
    this.#dashboardService.show(this.str2json(data));
  }

  private str2json(data: string): JSON {
    return JSON.parse(JSON.stringify({ data }));
  }
}
