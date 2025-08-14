export interface DashboardEntry {
  rank?: number;
  name: string;
  deposits: string;
  depositsValue: number;
  logo?: string;
  change?: number;
  isAave: boolean;
}

export interface ApiResponse {
  success: boolean;
  data: DashboardEntry | DashboardEntry[];
  error?: string;
  metadata?: {
    totalEntries: number;
    aaveRank: number | null;
    aaveDeposits?: number;
    source: string;
    lastUpdated: string;
  };
}
