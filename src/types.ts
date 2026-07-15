export interface ServiceStop {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  angle: number; // angle in degrees around the circle, e.g. 60, 120, 180, 240, 300, 360
  category: string;
  stats: string;
  deliverables: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  image: string;
  description: string;
  metrics: string;
  tags: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
}
