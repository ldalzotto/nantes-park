export class ParkingsData {
    parkDataList: Array<ParkingData>;
}

export class ParkingData {
  name: string;
  location: Array<number>;
  addresse: string;
}

export class ParkSpaceData{
  id: number;
  totalSpace: number;
  leftSpace: number;
}

