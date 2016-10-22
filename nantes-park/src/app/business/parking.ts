export class ParkingsData {
    parkDataList: Array<ParkingData>;
}

export class ParkingData {
  name: string;
  location: Array<number>;
  id: number;
  addresse: string;
  nbPlaceTotal: number;
  nbPlaceActuel: number;
  nbPlaceForComplet: number;
}

export class ParkSpaceData{
  id: number;
  totalSpace: number;
  leftSpace: number;
}

