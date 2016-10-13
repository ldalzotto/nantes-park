
export class GenericOpenData {
    opendata : OpenData;
}

class OpenData {
    answer: Anwser;
}

class Anwser {
    data: Data;
}

class Data {
    Groupes_Parking: ParkingGroups;
}

class ParkingGroups {
    Groupe_Parking: ParkingGroup[];
}

class ParkingGroup {
    Grp_complet: number;
    Grp_disponible: number;
}
