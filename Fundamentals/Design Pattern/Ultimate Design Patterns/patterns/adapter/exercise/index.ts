import { DashboardService } from './dashboardService';
import { DashboardServiceAdaptee } from './dashboardServiceAdaptee';
import { ReportService } from './reportService';

const reportService = new ReportService();

const report = reportService.report();

// const dashboardService = new DashboardService();

// dashboardService.show(report)

const dashboardServiceAdaptee = new DashboardServiceAdaptee(
  new DashboardService()
);

dashboardServiceAdaptee.show(report);
