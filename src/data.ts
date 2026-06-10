import { Project, RegionLocation } from './types.ts';

// Regional centers and boundaries (approximated polygons for high-quality visual map overlays)
export const LOCATIONS: RegionLocation[] = [
  {
    id: 'guadalupe',
    name: 'Barangay Guadalupe',
    type: 'Barangay',
    parentName: 'Cebu City',
    latitude: 10.3236,
    longitude: 123.8814,
    zoomLevel: 15,
    boundaryCoordinates: [
      [10.3340, 123.8730],
      [10.3380, 123.8820],
      [10.3220, 123.8940],
      [10.3120, 123.8850],
      [10.3160, 123.8720],
      [10.3340, 123.8730] // Close polygon
    ]
  },
  {
    id: 'cebu-city',
    name: 'Cebu City',
    type: 'City',
    latitude: 10.3157,
    longitude: 123.8854,
    zoomLevel: 13,
    boundaryCoordinates: [
      [10.3700, 123.8600],
      [10.3800, 123.9100],
      [10.3300, 123.9500],
      [10.2800, 123.8900],
      [10.2900, 123.8300],
      [10.3400, 123.8400],
      [10.3700, 123.8600] // Close polygon
    ]
  },
  {
    id: 'talisay-city',
    name: 'Talisay City',
    type: 'City',
    latitude: 10.2520,
    longitude: 123.8393,
    zoomLevel: 13,
    boundaryCoordinates: [
      [10.2800, 123.8300],
      [10.2700, 123.8700],
      [10.2200, 123.8300],
      [10.2100, 123.7900],
      [10.2500, 123.7800],
      [10.2800, 123.8300] // Close polygon
    ]
  },
  {
    id: 'minglanilla',
    name: 'Minglanilla',
    type: 'Municipality',
    latitude: 10.2458,
    longitude: 123.7969,
    zoomLevel: 13,
    boundaryCoordinates: [
      [10.2500, 123.7800],
      [10.2600, 123.8000],
      [10.2100, 123.8100],
      [10.1800, 123.7600],
      [10.2100, 123.7300],
      [10.2500, 123.7800] // Close polygon
    ]
  },
  {
    id: 'metro-manila',
    name: 'City of Manila',
    type: 'City',
    latitude: 14.5995,
    longitude: 120.9842,
    zoomLevel: 13,
    boundaryCoordinates: [
      [14.6300, 120.9600],
      [14.6400, 121.0000],
      [14.6000, 121.0200],
      [14.5600, 121.0100],
      [14.5500, 120.9700],
      [14.5800, 120.9500],
      [14.6300, 120.9600] // Close polygon
    ]
  },
  {
    id: 'davao-city',
    name: 'Davao City',
    type: 'City',
    latitude: 7.0736,
    longitude: 125.6110,
    zoomLevel: 12,
    boundaryCoordinates: [
      [7.1500, 125.5500],
      [7.1600, 125.6500],
      [7.0600, 125.6800],
      [7.0100, 125.6200],
      [7.0200, 125.5300],
      [7.1500, 125.5500] // Close polygon
    ]
  },
  {
    id: 'iloilo-city',
    name: 'Iloilo City',
    type: 'City',
    latitude: 10.7202,
    longitude: 122.5621,
    zoomLevel: 13,
    boundaryCoordinates: [
      [10.7400, 122.5300],
      [10.7500, 122.5800],
      [10.7000, 122.6000],
      [10.6800, 122.5500],
      [10.7400, 122.5300] // Close polygon
    ]
  }
];

export const PROJECTS: Project[] = [
  // Guadalupe Projects
  {
    id: 'p-guad-1',
    project_name: 'Guadalupe-Lahug Bypass Road Construction',
    description: 'A major road construction project aimed at decongesting traffic between Barangay Guadalupe and Lahug. It involves constructing a 4-lane bypass road, complete with drainage, sidewalk railings, and standard street lights.',
    project_type: 'Infrastructure',
    status: 'Ongoing',
    budget: 245000000, // 245M PHP
    start_date: '2025-02-15',
    completion_date: '2026-12-20',
    barangay: 'Guadalupe',
    municipality: '',
    city: 'Cebu City',
    latitude: 10.3284,
    longitude: 123.8852,
    image_url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
    news_articles: [
      {
        id: 'news-guad-1-1',
        title: 'Guadalupe-Lahug Bypass Hits 45% Completion Milestone',
        source: 'SunStar Cebu',
        publish_date: '2026-01-10',
        sentiment: 'Positive',
        summary: 'The Department of Public Works and Highways reports that asphalt laying is set to begin next month as standard bridge supports and foundation walls are completed ahead of schedule.',
        url: '#'
      },
      {
        id: 'news-guad-1-2',
        title: 'Civic Audit Highlights Right-of-Way Delays in Lahug Bypass Bypass',
        source: 'Cebu Daily Bulletin',
        publish_date: '2025-08-12',
        sentiment: 'Critical',
        summary: 'A public interest monitoring report reveals that approximately 12% of the projected bypass pathway is facing land acquisition disputes with private subdivision owners, threatening the late-2026 deadline.',
        url: '#'
      }
    ]
  },
  {
    id: 'p-guad-2',
    project_name: 'Guadalupe River Clean-up & Flood Walls',
    description: 'An environmental initiative introducing concrete flood defense revetments, local dredging operations, and bio-fences to secure riverside families and restore water flow sanitation in the Guadalupe River basin.',
    project_type: 'Environment',
    status: 'New',
    budget: 87500000, // 87.5M PHP
    start_date: '2026-05-01',
    completion_date: '2027-04-15',
    barangay: 'Guadalupe',
    municipality: '',
    city: 'Cebu City',
    latitude: 10.3201,
    longitude: 123.8824,
    image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    news_articles: [
      {
        id: 'news-guad-2-1',
        title: 'Community Volunteers Assist in Deploying First Bio-Fences',
        source: 'Cebu Civic Monitor',
        publish_date: '2026-05-18',
        sentiment: 'Positive',
        summary: 'Youth groups and barangay volunteers helped secure non-toxic floating barriers across key narrow points of the Guadalupe River to block upstream trash from entering Cebu City coastal waters.',
        url: '#'
      },
      {
        id: 'news-guad-2-2',
        title: 'River Dredging Commences Amid Early Monsoon Alerts',
        source: 'Visayas Inquirer',
        publish_date: '2026-06-02',
        sentiment: 'Neutral',
        summary: 'Heavy equipment has been stationed near the Guadalupe bridge as DPWH begins dredging riverbed silt. Residents are cautioned that localized traffic shifts may persist during operations.',
        url: '#'
      }
    ]
  },
  {
    id: 'p-guad-3',
    project_name: 'Barangay Guadalupe Wellness and Outpatient expansion',
    description: 'Expansion of the local public health clinic into an integrated, modern outpatient facility. Features new diagnostic laboratories, a dedicated pediatric unit, and fully digitized patient database logging.',
    project_type: 'Health',
    status: 'Completed',
    budget: 18200000, // 18.2M PHP
    start_date: '2024-03-10',
    completion_date: '2025-08-11',
    barangay: 'Guadalupe',
    municipality: '',
    city: 'Cebu City',
    latitude: 10.3245,
    longitude: 123.8789,
    image_url: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80',
    news_articles: [
      {
        id: 'news-guad-3-1',
        title: 'Cebu City Inaugurates Expanded Guadalupe Outpatient Facility',
        source: 'SunStar Cebu',
        publish_date: '2025-09-01',
        sentiment: 'Positive',
        summary: 'Guadalupe citizens celebrate the official opening of the newly expanded digital wellness clinic, featuring complete diagnostic laboratories, advanced prenatal checkup rooms, and a dedicated laboratory kiosk.',
        url: '#'
      },
      {
        id: 'news-guad-3-2',
        title: 'Guadalupe Clinic Logs Successful Digital Reduction in Wait Times',
        source: 'Cebu Civic Monitor',
        publish_date: '2026-03-15',
        sentiment: 'Positive',
        summary: 'An internal efficiency report showcases a 40% drop in waiting queue times because of the newly installed digitized electronic health records standard, providing relief to daily pediatric patients.',
        url: '#'
      }
    ]
  },
  // Cebu City General Projects
  {
    id: 'p-cebu-1',
    project_name: 'Cebu Bus Rapid Transit (BRT) Package 2',
    description: 'Implementation of the high-capacity commuter transit lanes, urban bus stations, and signalized crossings stretching from South Road Properties to Capitol area. Includes tactile street lanes and eco-friendly hybrid terminals.',
    project_type: 'Infrastructure',
    status: 'Ongoing',
    budget: 1250000000, // 1.25B PHP
    start_date: '2023-11-01',
    completion_date: '2026-10-30',
    barangay: 'Kinasang-an',
    municipality: '',
    city: 'Cebu City',
    latitude: 10.2985,
    longitude: 123.8710,
    image_url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    news_articles: [
      {
        id: 'news-cebu-1-1',
        title: 'Cebu BRT Package 2 Construction Suspended Briefly Over Safety Audits',
        source: 'The Freeman Cebu',
        publish_date: '2025-04-14',
        sentiment: 'Critical',
        summary: 'Work at a key downtown node was temporarily suspended after civic inspectors detected insufficient site barriers and lack of clear night-use reflectorized signages for motorists.',
        url: '#'
      },
      {
        id: 'news-cebu-1-2',
        title: 'Solar-Powered Canopy Structures Erected on BRT Stations',
        source: 'Metro Cebu News',
        publish_date: '2026-02-19',
        sentiment: 'Positive',
        summary: 'Phase 2 contractors commenced building steel and photovoltaic roofing panels on newly constructed platforms near South Road Properties, prioritizing green infrastructure integration.',
        url: '#'
      }
    ]
  },
  {
    id: 'p-cebu-2',
    project_name: 'Carbon District Modernization and Public Plaza',
    description: 'Comprehensive redevelopment of the historic Carbon Market area. Features the build of a new multi-level, safe, climate-insulated marketplace, scenic ocean-side pedestrian walkways, and a heritage public park.',
    project_type: 'Infrastructure',
    status: 'Ongoing',
    budget: 980000000, // 980M PHP
    start_date: '2024-01-20',
    completion_date: '2026-08-30',
    barangay: 'Ermita',
    municipality: '',
    city: 'Cebu City',
    latitude: 10.2908,
    longitude: 123.9015,
    image_url: 'https://images.unsplash.com/photo-1627581533513-34e8ea3c4800?auto=format&fit=crop&w=800&q=80',
    news_articles: [
      {
        id: 'news-cebu-2-1',
        title: 'Carbon District Pedestrian Plaza Reaches 80% Completion',
        source: 'SunStar Cebu',
        publish_date: '2026-05-25',
        sentiment: 'Positive',
        summary: 'Developers confirmed the seaside walking esplanade is on pace for an August public ribbon-cutting, boasting landscaped garden pockets, a public historical obelisk, and native brick pavers.',
        url: '#'
      },
      {
        id: 'news-cebu-2-2',
        title: 'Stall Relocation Prompts Mixed Feedback from Heritage Market Vendors',
        source: 'The Freeman Cebu',
        publish_date: '2025-11-20',
        sentiment: 'Neutral',
        summary: 'While vendors express satisfaction with the concrete floor and sanitation systems of the new district halls, many highlight early confusion in walk-in customer foot traffic routes.',
        url: '#'
      }
    ]
  },
  {
    id: 'p-cebu-3',
    project_name: 'Cebu City Public Library Digitization & Tech Upgrade',
    description: 'Upgrade of the famous public library. Deployed 60 state-of-the-art computers, fiber internet connectivity, subscription terminals to elite digital research catalogs, and a self-service braille scanner station.',
    project_type: 'Technology',
    status: 'Completed',
    budget: 15400000, // 15.4M PHP
    start_date: '2024-06-01',
    completion_date: '2024-11-15',
    barangay: 'Capitol Site',
    municipality: '',
    city: 'Cebu City',
    latitude: 10.3182,
    longitude: 123.8920,
    image_url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
    news_articles: [
      {
        id: 'news-cebu-3-1',
        title: 'Adaptive Braille Hardware Makes Cebu Public Library National Model',
        source: 'Visayas Inquirer',
        publish_date: '2024-12-05',
        sentiment: 'Positive',
        summary: 'Advocacy groups highlight the newly integrated tactile reader displays and speech synthesizer scanners that enable blind and visually impaired students to review digital books.',
        url: '#'
      },
      {
        id: 'news-cebu-3-2',
        title: 'Cebu Public Library Visitors Double After Modernization Upgrade',
        source: 'Cebu Civic Monitor',
        publish_date: '2025-06-12',
        sentiment: 'Positive',
        summary: 'A public attendance study confirms high utilization of the new 60 high-speed internet terminals. Free research database subscriptions are credited with aiding thousands of local students weekly.',
        url: '#'
      }
    ]
  },
  {
    id: 'p-cebu-4',
    project_name: 'Urban Livelihood Incubation Hub',
    description: 'Creating vocational classrooms, custom sewing hubs, commercial test-kitchens, and financial training resources to support low-income families and startup micro-confectioneries in downtown Cebu.',
    project_type: 'Livelihood',
    status: 'New',
    budget: 35000000,
    start_date: '2026-07-10',
    completion_date: '2027-03-30',
    barangay: 'San Roque',
    municipality: '',
    city: 'Cebu City',
    latitude: 10.2942,
    longitude: 123.9048,
    image_url: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80',
    news_articles: [
      {
        id: 'news-cebu-4-1',
        title: 'San Roque Prepares to Host New Livelihood Incubation Hub',
        source: 'Metro Cebu News',
        publish_date: '2026-06-01',
        sentiment: 'Positive',
        summary: 'The Cebu City administration announced that procurement of kitchen machinery, sewing equipment, and vocational tables has successfully concluded, paving the way for construction next month.',
        url: '#'
      }
    ]
  },
  // Talisay City Projects
  {
    id: 'p-tali-1',
    project_name: 'Talisay Coastal Road Wave Protection Seawall',
    description: 'Constructing a rugged 2.5-kilometer coastal concrete revetment wall paired with decorative pathways, solar safety lights, and localized rock armoring to safeguard residents from tropical storm surges.',
    project_type: 'Infrastructure',
    status: 'Ongoing',
    budget: 189000000, // 189M PHP
    start_date: '2024-09-01',
    completion_date: '2026-04-10',
    barangay: 'Poblacion',
    municipality: '',
    city: 'Talisay City',
    latitude: 10.2442,
    longitude: 123.8448,
    image_url: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=800&q=80',
    news_articles: [
      {
        id: 'news-tali-1-1',
        title: 'Unfinished Seawall Saves Coastal Neighborhood Houses From Surge',
        source: 'SunStar Cebu',
        publish_date: '2025-10-18',
        sentiment: 'Positive',
        summary: 'Despite being incomplete, the newly placed heavy rock armor and concrete revetment blocks deflected major waves from a Category 1 storm, shielding over 200 beachfront families from severe flooding.',
        url: '#'
      },
      {
        id: 'news-tali-1-2',
        title: 'Talisay LGU Demands Accelerated Installation of Coastal Night Lighting',
        source: 'The Freeman Cebu',
        publish_date: '2026-03-30',
        sentiment: 'Neutral',
        summary: 'Local officials request that the coastal solar lamp posts be installed and activated quickly to secure the popular scenic walkway as thousands of residents utilize it for jogging.',
        url: '#'
      }
    ]
  },
  {
    id: 'p-tali-2',
    project_name: 'Lawaan III Multipurpose Disaster Preparedness Center',
    description: 'A storm-insulated 3-story concrete community shelter designed to host up to 1,200 evacuees. Equipped with high-capacity backup generators, water desalination filters, and critical medical triage centers.',
    project_type: 'Infrastructure',
    status: 'Completed',
    budget: 47000000, // 47M PHP
    start_date: '2024-01-10',
    completion_date: '2024-12-20',
    barangay: 'Lawaan III',
    municipality: '',
    city: 'Talisay City',
    latitude: 10.2585,
    longitude: 123.8340,
    image_url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
    news_articles: [
      {
        id: 'news-tali-2-1',
        title: 'Lawaan III Storm-Proof Shelter Completed and Handed Over',
        source: 'Visayas Inquirer',
        publish_date: '2024-12-28',
        sentiment: 'Positive',
        summary: 'DPWH engineers turned over the facility keys to the Talisay city disaster risk response office, confirming all backup generators, solar systems, and water filtration networks are operational.',
        url: '#'
      },
      {
        id: 'news-tali-2-2',
        title: 'Talisay Citizens Conduct Comprehensive Evacuation Drill in Facility',
        source: 'Cebu Civic Monitor',
        publish_date: '2025-05-20',
        sentiment: 'Positive',
        summary: 'Over 500 family headers participated in a storm response tabletop and physical drill, exploring the building triage layouts and testing the self-sustaining potable water generation station.',
        url: '#'
      }
    ]
  },
  {
    id: 'p-tali-3',
    project_name: 'Talisay Mangrove Forest & Wetlands Eco-Park',
    description: 'Environmental reclamation of the local coastal wetland. Establishes suspended bamboo pedestrian skywalks, local nurseries containing 25,000 native saplings, and scientific bird-watching towers to foster local ecotourism.',
    project_type: 'Environment',
    status: 'New',
    budget: 28000000, // 28M PHP
    start_date: '2026-08-01',
    completion_date: '2027-06-30',
    barangay: 'Dumlog',
    municipality: '',
    city: 'Talisay City',
    latitude: 10.2390,
    longitude: 123.8320,
    image_url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80',
    news_articles: [
      {
        id: 'news-tali-3-1',
        title: 'Regional Alliance Funds 25,000 Mangrove Sapling Nursery in Dumlog',
        source: 'Cebu Daily Bulletin',
        publish_date: '2026-08-15',
        sentiment: 'Positive',
        summary: 'A combined corporate-civic sponsorship has kickstarted the mangrove nursery project, generating local micro-jobs for coastal residents who will sustain the growth of the saplings.',
        url: '#'
      }
    ]
  },
  // Minglanilla Projects
  {
    id: 'p-ming-1',
    project_name: 'Ming-Mori Reclamation and Industrial Park',
    description: 'A world-class industrial hub spanning 100 hectares, designed to host light fabrication businesses, research parks, and tech hubs. Includes state-of-the-art solid waste structures, water loops, and major roads.',
    project_type: 'Infrastructure',
    status: 'Ongoing',
    budget: 3200000000, // 3.2B PHP
    start_date: '2024-05-10',
    completion_date: '2028-12-31',
    barangay: 'Tulay',
    municipality: 'Minglanilla',
    city: 'Minglanilla',
    latitude: 10.2330,
    longitude: 123.7850,
    image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    news_articles: [
      {
        id: 'news-ming-1-1',
        title: 'Environmental Groups File Request to Review Ming-Mori Reclamation',
        source: 'The Freeman Cebu',
        publish_date: '2024-09-12',
        sentiment: 'Critical',
        summary: 'Local associations have formally petitioned government agencies to conduct a second round of marine habitat audits, citing protection needs for local fisheries near Tulay coastlines.',
        url: '#'
      },
      {
        id: 'news-ming-1-2',
        title: 'Ming-Mori reclamation secures 3 Multinational light-fabrication firms',
        source: 'Metro Cebu News',
        publish_date: '2026-05-02',
        sentiment: 'Positive',
        summary: 'The project developer secured lease commitments that promise to generate over 4,000 technical labor jobs for Southern Cebu residents when the first industrial grid activates next year.',
        url: '#'
      }
    ]
  },
  {
    id: 'p-ming-2',
    project_name: 'Minglanilla Central Elementary Library and Science Lab',
    description: 'Renovation and building of a new 3-story school academic facility. Adds 12 digitized standard classrooms, fully loaded physics/chemistry laboratory equipment, and a 10,000-book reading catalog.',
    project_type: 'Education',
    status: 'Completed',
    budget: 52000000, // 52M PHP
    start_date: '2023-08-11',
    completion_date: '2024-09-30',
    barangay: 'Poblacion Ward I',
    municipality: 'Minglanilla',
    city: 'Minglanilla',
    latitude: 10.2460,
    longitude: 123.7972,
    image_url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    news_articles: [
      {
        id: 'news-ming-2-1',
        title: 'Central Science Lab Elevates District Public Elementary Education',
        source: 'SunStar Cebu',
        publish_date: '2024-10-15',
        sentiment: 'Positive',
        summary: 'Students express immense excitement as they begin using top-tier microscopes, model chemistry setups, and solar kits that align perfectly with their updated science curricula.',
        url: '#'
      },
      {
        id: 'news-ming-2-2',
        title: 'Central Library Logs High Book Circulation via New Catalog System',
        source: 'Cebu Civic Monitor',
        publish_date: '2025-02-18',
        sentiment: 'Neutral',
        summary: 'Active library memberships rose by 65%. Teachers credit the computerized kiosk system with simplifying homework research, though some call for expanding the Tagalog collection.',
        url: '#'
      }
    ]
  },
  {
    id: 'p-ming-3',
    project_name: 'Minglanilla Municipal Hospital Modernization',
    description: 'Adding high-efficiency emergency wings, dialysis stations, modern pediatric wards, and intensive care beds to the municipal general hospital. This aims to ensure nearby citizens avoid traveling to Cebu City is congested rooms.',
    project_type: 'Health',
    status: 'New',
    budget: 120000000, // 120M PHP
    start_date: '2026-09-01',
    completion_date: '2028-02-15',
    barangay: 'Lipata',
    municipality: 'Minglanilla',
    city: 'Minglanilla',
    latitude: 10.2525,
    longitude: 123.8055,
    image_url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    news_articles: [
      {
        id: 'news-ming-3-1',
        title: 'Auxiliary Funding Secured ahead of Hospital Modernization Start',
        source: 'Visayas Inquirer',
        publish_date: '2026-09-10',
        sentiment: 'Positive',
        summary: 'Under the health initiative, supplemental funding has been approved specifically to purchase 15 additional dialysis stations, ensuring the center launches fully loaded in Lipata.',
        url: '#'
      }
    ]
  },
  // City of Manila Projects
  {
    id: 'p-manila-1',
    project_name: 'Metro Manila Subway Phase 1 - Manila Section',
    description: 'Construction of underground stations, ventilation shafts, and precision twin-tunnel boring operations crossing the heart of Manila. Includes seismic-isolated foundations and flood-safe subterranean access points.',
    project_type: 'Infrastructure',
    status: 'Ongoing',
    budget: 125000000000, // 125B PHP
    start_date: '2023-01-15',
    completion_date: '2028-12-31',
    barangay: 'Sampaloc',
    municipality: '',
    city: 'City of Manila',
    latitude: 14.6150,
    longitude: 120.9950,
    image_url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
    news_articles: [
      {
        id: 'news-manila-1-1',
        title: 'Manila Subway Boring Machines Clear Subterranean Milestones',
        source: 'Philippine News Inquiry',
        publish_date: '2026-03-22',
        sentiment: 'Positive',
        summary: 'The Department of Transportation reports that giant Japanese tunnel boring machines have successfully navigated underground utilities in Sampaloc, maintaining structural safety parameters.',
        url: '#'
      },
      {
        id: 'news-manila-1-2',
        title: 'Commuter Groups Petition to Preserve Heritage Sites Along Subway Route',
        source: 'Luzon Civic Sentinel',
        publish_date: '2025-10-05',
        sentiment: 'Neutral',
        summary: 'Public consultations were held to address structural vibration limits near iconic plazas and historic buildings in Manila. DOTr promises constant monitoring.',
        url: '#'
      }
    ]
  },
  {
    id: 'p-manila-2',
    project_name: 'Pasig River Rehabilitation & Sustainable Esplanade',
    description: 'Deploying high-efficiency river filtration networks, floating solar aeration bio-pockets, and building a 3-kilometer continuous public linear park to revitalize Manila is iconic Pasig River waterfront.',
    project_type: 'Environment',
    status: 'Completed',
    budget: 210000000, // 210M PHP
    start_date: '2024-05-10',
    completion_date: '2025-11-20',
    barangay: 'Binondo',
    municipality: '',
    city: 'City of Manila',
    latitude: 14.5950,
    longitude: 120.9880,
    image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    news_articles: [
      {
        id: 'news-manila-2-1',
        title: 'Pasig River Esplanade Inaugurated as New Green Oasis',
        source: 'Manila Bulletin',
        publish_date: '2025-12-01',
        sentiment: 'Positive',
        summary: 'The newly opened esplanade in Binondo has become a vibrant public space. Families enjoy the pedestrian lanes, native trees, and clean aesthetic lighting after sunset.',
        url: '#'
      }
    ]
  },
  // Davao City Projects
  {
    id: 'p-davao-1',
    project_name: 'Davao City Bypass Road and Mountain Tunnel construction',
    description: 'A massive highway bypassing congested downtown centers, highlighted by the construct of the first long-distance dual-lane mountain road tunnel in the country featuring top-grade jet-fan ventilation systems.',
    project_type: 'Infrastructure',
    status: 'Ongoing',
    budget: 36000000000, // 36B PHP
    start_date: '2022-11-01',
    completion_date: '2027-06-30',
    barangay: 'Buhangin',
    municipality: '',
    city: 'Davao City',
    latitude: 7.0850,
    longitude: 125.6020,
    image_url: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80',
    news_articles: [
      {
        id: 'news-davao-1-1',
        title: 'Excavation of Country First Twin Mountain Tunnel Reaches 70%',
        source: 'Mindanao Daily News',
        publish_date: '2026-05-12',
        sentiment: 'Positive',
        summary: 'DPWH engineers confirmed both south and north portals of the bypass mountain tunnel are nearing breakthrough, citing excellent structural integrity in geological samples.',
        url: '#'
      }
    ]
  },
  {
    id: 'p-davao-2',
    project_name: 'Davao Coastal Wetland Reforestation and Eco-Park',
    description: 'Establishing over 40 hectares of premium mangrove nurseries, protective seaside boardwalks, and a marine life observation clinic to preserve davao is diverse coastal biosystem while creating green tourism hubs.',
    project_type: 'Environment',
    status: 'Completed',
    budget: 65000000, // 65M PHP
    start_date: '2024-02-15',
    completion_date: '2025-09-30',
    barangay: 'Matina Aplaya',
    municipality: '',
    city: 'Davao City',
    latitude: 7.0510,
    longitude: 125.6210,
    image_url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80',
    news_articles: [
      {
        id: 'news-davao-2-1',
        title: 'Matina Mangrove Sanctuary Wins National Marine Conservation Award',
        source: 'Inquirer Mindanao',
        publish_date: '2025-11-22',
        sentiment: 'Positive',
        summary: 'Davao City is new eco-park is celebrated for its community-first rehabilitation models, allowing local fishermen to manage visitor tours and sustain mangrove health.',
        url: '#'
      }
    ]
  },
  // Iloilo City Projects
  {
    id: 'p-iloilo-1',
    project_name: 'Iloilo River Esplanade Extension Phase 9',
    description: 'Extending the award-winning Iloilo River walkable linear esplanade. Introducing beautiful public brick paths, sustainable local landscaping, water recovery systems, and child-safe playground zones.',
    project_type: 'Environment',
    status: 'Completed',
    budget: 115000000, // 115M PHP
    start_date: '2024-03-01',
    completion_date: '2025-05-15',
    barangay: 'Mandurriao',
    municipality: '',
    city: 'Iloilo City',
    latitude: 10.7120,
    longitude: 122.5590,
    image_url: 'https://images.unsplash.com/photo-1627581533513-34e8ea3c4800?auto=format&fit=crop&w=800&q=80',
    news_articles: [
      {
        id: 'news-iloilo-1-1',
        title: 'Iloilo City Celebrates the Grand Opening of Esplanade Extension',
        source: 'Daily Guardian Visayas',
        publish_date: '2025-06-01',
        sentiment: 'Positive',
        summary: 'Civic leaders and citizens walk the newly minted Phase 9 block, highlighting its role is a model of urban micro-climate cooling and pedestrian-friendly development.',
        url: '#'
      }
    ]
  },
  {
    id: 'p-iloilo-2',
    project_name: 'Iloilo Smart Grid Solar Street Lighting',
    description: 'Transforming major arterial streets, public intersections, and historic avenues in Iloilo using high-efficiency solar lamp posts integrated with smart central sensors to reduce carbon footprints.',
    project_type: 'Infrastructure',
    status: 'Ongoing',
    budget: 42000000, // 42M PHP
    start_date: '2025-07-01',
    completion_date: '2026-11-30',
    barangay: 'Molo',
    municipality: '',
    city: 'Iloilo City',
    latitude: 10.7220,
    longitude: 122.5650,
    image_url: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=800&q=80',
    news_articles: [
      {
        id: 'news-iloilo-2-1',
        title: 'Molo Avenues Shine Bright with Modernized Solar Lamp Posts',
        source: 'Panay News',
        publish_date: '2026-02-10',
        sentiment: 'Positive',
        summary: 'Over 300 smart solar lighting fixtures have been successfully deployed, providing safe pathways and cutting energy expenditures for the local government.',
        url: '#'
      }
    ]
  }
];
