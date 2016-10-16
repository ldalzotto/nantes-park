

var dataLocation = new Map();

//TODO système de cache pour la récupération du csv
//TODO Utilser des maps pour les objets de parkings

module.exports = {
    getDataFromRawParking: function(generalParkData) {

        return new Promise((resolve) => {
            extractDataFromCsv(generalParkData).then((result) => {
                resolve(result);
            })
        })

    },

    getParkingDataInfo: function(id) {
        return getParkingsDataInfoFromId(id);
    }

};

function getParkingsDataInfoFromId(id){
    var parkInfo = new Map();
    var fastCsv = require('fast-csv');

    return new Promise((resolve, reject) => {
        fastCsv.fromPath('./parking-api/app/documents/24440040400129_NM_NM_00022_LOC_EQUIPUB_MOBILITE_NM_STBL.csv')
            .on("data", function (data) {
                if(data[0] === id) {
                    parkInfo.set(data[0], data[1]);
                }
            }).on("end", function () {
            resolve(parkInfo);
        });
    });

}

function extractDataFromCsv(generalParkData){
    return new Promise((resolve, reject) => {
                var fastCsv    = require('fast-csv');
                var test = fastCsv.fromPath('./parking-api/app/documents/24440040400129_NM_NM_00022_LOC_EQUIPUB_MOBILITE_NM_STBL.csv')
                .on("data", function(data){
                    dataLocation.set(data[0], data[14]);
                }).on("end", function(){

                        parkingsFromApi = new RawParkings(generalParkData.body);
                        var parkingsData = new ParkingsDataOutput();

                        parkingsFromApi.parkList.forEach((element) => {
                            if(dataLocation.get(element.IdObj) && element.Grp_nom){
                                parkingData = new ParkingData(element.Grp_nom, JSON.parse(dataLocation.get(element.IdObj)));
                                parkingsData.parkDataList.push(parkingData);
                            }
                        });

                     resolve(parkingsData);
                })
    })
}


function RawParkings(body) {
    this.parkList = [];
    body.forEach((element) => {
        this.parkList.push(new RawParking(element.Grp_identifiant, element.Grp_nom, element.Grp_statut, element.Grp_pri_aut,
            element.Grp_disponible, element.Grp_complet, element.Grp_exploitation, element.Grp_horodatage,
            element.IdObj));
    })
}

function RawParking(Grp_identifiant, Grp_nom, Grp_statut, Grp_pri_aut, Grp_disponible, Grp_complet, Grp_exploitation,
                    Grp_horodatage, IdObj) {
    this.Grp_identifiant = Grp_identifiant;
    this.Grp_nom = Grp_nom;
    this.Grp_statut = Grp_statut;
    this.Grp_pri_aut = Grp_pri_aut;
    this.Grp_disponible = Grp_disponible;
    this.Grp_complet = Grp_complet;
    this.Grp_exploitation = Grp_exploitation;
    this.Grp_horodatage = Grp_horodatage;
    this.IdObj = IdObj;
}

function ParkingsDataOutput() {
    this.parkDataList = [];
}

function ParkingData(name, location) {
    this.name = name;
    this.location = location;
}