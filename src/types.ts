export type ProjectStatus = 'New' | 'Ongoing' | 'Completed';

export interface NewsArticle {
  id: string;
  title: string;
  source: string;
  publish_date: string;
  summary: string;
  sentiment: 'Positive' | 'Neutral' | 'Critical';
  url: string;
}

export interface Project {
  id: string;
  project_name: string;
  description: string;
  project_type: 'Infrastructure' | 'Health' | 'Education' | 'Environment' | 'Technology' | 'Livelihood';
  status: ProjectStatus;
  budget: number; // in PHP (Philippine Peso)
  start_date: string; // YYYY-MM-DD
  completion_date: string; // YYYY-MM-DD
  barangay: string;
  municipality: string; // Can be empty or representing town
  city: string; // E.g., Cebu City, Talisay City, Minglanilla
  latitude: number;
  longitude: number;
  image_url: string;
  news_articles?: NewsArticle[];
}

export interface RegionLocation {
  id: string; // E.g., "cebu-city", "guadalupe", "talisay-city", "minglanilla"
  name: string;
  type: 'Barangay' | 'City' | 'Municipality';
  parentName?: string; // E.g., "Cebu City" for Guadalupe
  latitude: number;
  longitude: number;
  zoomLevel: number;
  boundaryCoordinates: [number, number][]; // Polygon coordinates for highlighting
}
