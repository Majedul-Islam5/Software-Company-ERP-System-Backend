export class projectDto {
  project_id: string;
  name: string;
  client: string;
  category: string;
  cost_usd: number;
  start_date: string;
  end_date: string;
  status: string;
  team_size: number;
  developerIDs: number[];
  project_manager_id: number;
  tech_stack: string[];
  rating: number;
}
