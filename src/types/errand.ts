export interface Volunteer {
  id: string;
  helperId: string;
  distance: number;
  helperScore: number;
  helperCompletedCnt: number;
  transportation: Transportation;
  estimateTime: number;
  helperProfileImage: string;
  helperName: string;
  price: number;
  memo: string;
}

export type Transportation = 'car' | 'bike' | 'walk';
