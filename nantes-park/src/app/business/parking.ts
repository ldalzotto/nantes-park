export class ParkingsData {
    parkDataList: Array<ParkingData>;
}

export class ParkingData {
  name: string;
  location: Array<number>;
  id: number;
  parkSpaceData: ParkSpaceData;
}

export class ParkSpaceData{
  id: number;
  totalSpace: number;
  leftSpace: number;
  status: SpaceStatus;
}

export enum SpaceStatus {
  GOOD, AVERAGE, BAD
}

