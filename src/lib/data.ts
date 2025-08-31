export interface Issue {
  id: string;
  category: 'Pothole' | 'Streetlight' | 'Garbage' | 'Water leakage' | 'Others';
  description: string;
  status: 'new' | 'progress' | 'resolved';
  reportedDate: string;
  lastUpdated: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  photo?: string;
  reportedBy: string;
}

export interface UserStats {
  issuesReported: number;
  issuesResolved: number;
  pendingIssues: number;
  citizenPoints: number;
}

// Dummy data for the prototype
export const userStats: UserStats = {
  issuesReported: 12,
  issuesResolved: 8,
  pendingIssues: 4,
  citizenPoints: 120
};

export const dummyIssues: Issue[] = [
  {
    id: 'ISS-1001',
    category: 'Pothole',
    description: 'Large pothole causing traffic issues on MG Road near City Mall',
    status: 'new',
    reportedDate: '2024-01-15T10:30:00Z',
    lastUpdated: '2024-01-15T10:30:00Z',
    location: {
      lat: 12.9716,
      lng: 77.5946,
      address: 'MG Road, Bangalore'
    },
    photo: '/api/placeholder/400/300',
    reportedBy: 'current_user'
  },
  {
    id: 'ISS-1002',
    category: 'Streetlight',
    description: 'Street light not working in residential area for past 3 days',
    status: 'progress',
    reportedDate: '2024-01-14T14:20:00Z',
    lastUpdated: '2024-01-16T09:15:00Z',
    location: {
      lat: 12.9753,
      lng: 77.6021,
      address: 'Koramangala 4th Block'
    },
    reportedBy: 'current_user'
  },
  {
    id: 'ISS-1003',
    category: 'Garbage',
    description: 'Garbage collection has been missed for 2 weeks in this area',
    status: 'resolved',
    reportedDate: '2024-01-10T08:45:00Z',
    lastUpdated: '2024-01-18T11:30:00Z',
    location: {
      lat: 12.9698,
      lng: 77.6012,
      address: 'HSR Layout Sector 2'
    },
    reportedBy: 'current_user'
  },
  {
    id: 'ISS-1004',
    category: 'Water leakage',
    description: 'Water pipe burst causing road flooding',
    status: 'new',
    reportedDate: '2024-01-18T16:20:00Z',
    lastUpdated: '2024-01-18T16:20:00Z',
    location: {
      lat: 12.9667,
      lng: 77.5667,
      address: 'Jayanagar 4th Block'
    },
    reportedBy: 'other_user'
  },
  {
    id: 'ISS-1005',
    category: 'Others',
    description: 'Broken footpath creating accessibility issues',
    status: 'progress',
    reportedDate: '2024-01-12T11:15:00Z',
    lastUpdated: '2024-01-17T14:45:00Z',
    location: {
      lat: 12.9611,
      lng: 77.6362,
      address: 'Whitefield Main Road'
    },
    reportedBy: 'other_user'
  }
];

export const leaderboard = [
  { name: 'Rajesh Kumar', points: 245, reports: 24 },
  { name: 'Priya Sharma', points: 189, reports: 18 },
  { name: 'You', points: 120, reports: 12 },
  { name: 'Amit Singh', points: 98, reports: 9 },
  { name: 'Sneha Patel', points: 76, reports: 7 }
];

// Notification system
export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  timestamp: string;
}

export const dummyNotifications: Notification[] = [
  {
    id: 'notif-1',
    message: 'Your issue #ISS-1002 is now In Progress',
    type: 'info',
    timestamp: '2024-01-16T09:15:00Z'
  },
  {
    id: 'notif-2', 
    message: 'Issue #ISS-1003 has been resolved! +10 points earned',
    type: 'success',
    timestamp: '2024-01-18T11:30:00Z'
  }
];