

var dataLocation = new Map();

module.exports = {
    getDataFromRawParking: function(generalParkData) {

        return new Promise((resolve) => {
            extractDataFromCsv(generalParkData).then((result) => {
                resolve(result);
            })
        })


    }
}

function extractDataFromCsv(generalParkData){
    return new Promise((resolve, reject) => {
                var fastCsv    = require('fast-csv');
                var test = fastCsv.fromPath('./app/documents/24440040400129_NM_NM_00022_LOC_EQUIPUB_MOBILITE_NM_STBL.csv')
                .on("data", function(data){
                    dataLocation.set(data[0], data[14]);
                }).on("end", function(){
                     var parkings = [];
                     var filteredLocationData = [];
                     
                     parkings = generalParkData.body;
                     parkings.forEach((element) => {
                         if(dataLocation.get(element.IdObj) && element.Grp_nom){
                            var parkingObject = JSON.parse('{"location": '+ dataLocation.get(element.IdObj) + ', "name": "'+ element.Grp_nom +'"}');
                            filteredLocationData.push(parkingObject);
                         }
                         //TODO utiliser des maps
                         //filteredLocationData.set(element.IdObj, parkingObject); 
                     });
                     resolve(filteredLocationData);
                })
    })
}
