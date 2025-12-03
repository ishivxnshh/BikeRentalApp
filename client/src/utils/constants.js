export const API_BASE_URL = 'http://192.168.0.164:5000/api';
// For emulator use: 'http://localhost:5000/api' or 'http://10.0.2.2:5000/api' (Android)
// For physical device use: 'http://YOUR_LOCAL_IP:5000/api' (check with ipconfig)

export const VEHICLE_TYPES = {
  '2W': '2 Wheeler',
  'L3': 'L3 Category',
  'L5': 'L5 Category',
};

export const VEHICLE_STATUS = {
  ON: 'On',
  OFF: 'Off',
  MOVING: 'Moving',
};

export const ONBOARDING_STATUS = {
  pending: 'Pending',
  in_progress: 'In Progress',
  verified: 'Verified',
};
