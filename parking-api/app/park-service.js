

var dataLocation = new Map();

var csvParkingDatas = new Map();

//TODO Utilser des maps pour les objets de parkings

module.exports = {
    getDataFromRawParking: function(generalParkData) {

        return new Promise((resolve, error) => {
            getParkingListFromRawOpenDataApi(generalParkData).then((result) => {
                resolve(result);
            })
        })

    },

    getParkingDataInfo: function(id) {
        return getIHMParkingsDataInfoFromId(id);
    }

};

function getIHMParkingsDataInfoFromId(id){
    return new Promise((resolve) => {
        getDataFromCacheOrCsv().then((result) => {
            currentPark = result.get(id);
            if(currentPark){
                returnIHMData = new IHMParkingData(currentPark.id, currentPark.name);
            }
            resolve(returnIHMData);
        })
    });
}

function getParkingListFromRawOpenDataApi(generalParkData){
    return new Promise((resolve, reject) => {
            getDataFromCacheOrCsv().then((result) =>{
                parkingsFromApi = new RawParkings(generalParkData.body);
                var parkingsData = new ParkingsDataOutput();
                parkingsFromApi.parkList.forEach((element) => {
                    currentPark = result.get(element.IdObj);
                    if(currentPark && element.Grp_nom){
                        parkingsData.parkDataList.push(currentPark);
                    }
                });
                resolve(parkingsData);
            });
    })
}

function getDataFromCacheOrCsv() {
    return new Promise((resolve, reject) => {
        var fastCsv    = require('fast-csv');
        if (csvParkingDatas.size !== 0){
            resolve(csvParkingDatas);
        } else {
            var isFisrtLine = true;
            fastCsv.fromPath('./parking-api/app/documents/24440040400129_NM_NM_00022_LOC_EQUIPUB_MOBILITE_NM_STBL.csv')
                .on("data", function(data){
                    if(!isFisrtLine){
                        csvParkingDatas.set(data[0], new CsvParkingData(data[0],data[1],data[2],data[3],data[4],data[5],data[6],
                            data[7],data[8],data[9],data[10],data[11],data[12],data[13],JSON.parse(data[14])));
                    } else {
                        isFisrtLine = false;
                    }
                }).on("end", function(){
                    resolve(csvParkingDatas);
            })
        }
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

function CsvParkingData(id, name, theme, libTheme, categorie, libCategorie, type, libType,
            statut, commune, adresse, telephone, web, codePostal, location) {
    this.id = id;
    this.name = name;
    this.theme = theme;
    this.libTheme = libTheme;
    this.categorie = categorie;
    this.libCategorie = libCategorie;
    this.type = type;
    this.libType = libType;
    this.statut = statut;
    this.commune = commune;
    this.addresse = adresse;
    this.telephone = telephone;
    this.web = web;
    this.codePostal = codePostal;
    this.location = location;
}

function IHMParkingData(id, name) {
    this.id = id;
    this.name = name;
}