// This program plots your route across the Melbourne train net work from origin station
// to destination station highlighting at what station you need to change

const INVALID_STATION = -1
const MAIN_HUB = 'Flinders Street'
const NO_LINE = -1

//========================================================================================

// Data for all train lines on the net work

var frankston = ['Frankston', 'Kananook','Seaford','Carrum','Bonbeach','Chelsea','Edithvale', 'Aspendale', 'Mordialloc', 'Parkdale', 'Mentone', 'Cheltenham','Highett','Moorabbin','Patterson','Bentleigh',  'McKinnon','Ormond', 'Glenhuntly','Caulfield','Malvern','Armadale','Toorak','Hawksburn','South Yarra','Richmond','Parliament','Melbourne Central','Flagstaff','Southern Cross','Flinders Street']

var pakenham =
['Pakenham','Cardinia Road','Officer','Beaconsfield','Berwick','Narre Warren','Hallam','Dandenong','Yarraman','Noble Park','Sandown Park','Springvale','Westall','Clayton','Huntingdale','Oakleigh','Hughesdale','Murrumbeena','Carnegie','Caulfield','Malvern','Armadale','Toorak','Hawksburn','South Yarra','Richmond','Parliament']

var craigieburn =
['Craigieburn','Roxburgh Park','Coolaroo','Broadmeadows','Jacana','Glenroy','Oak Park','Pascoe Vale','Strathmore','Glenbervie','Essendon','Moonee Ponds','Ascot Vale','Newmarket','Kensington','North Melbourne','Flagstaff','Melbourne Central','Parliament','Southern Cross','Flinders Street']

var alamein = ['Alamein','Ashburton','Burwood','Hartwell','Willison','Riversdale','Camberwell','Auburn','Glenferrie','Hawthorn','Burnley','East Richmond','Richmond','Parliament']

var belgrave = ['Belgrave','Tecoma','Upwey','Upper Ferntree Gully','Ferntree Gully','Boronia','Bayswater','Heathmont','Ringwood','Heatherdale','Mitcham','Nunawading','Blackburn','Laburnum','Box Hill','Mont Albert','Surrey Hills','Chatham','Canterbury','East Camberwell','Camberwell','Auburn','Glenferrie','Hawthorn','Burnley','East Richmond','Richmond','Parliament','Melbourne Central','Flagstaff','Southern Cross','Flinders Street']

var glenwaverly = ['Glen Waverley','Syndal','Mount Waverley','Jordanville','Holmesglen','East Malvern','Darling','Caulfield','Glen Iris','Gardiner','Tooronga','Kooyong','Heyington','Burnley','East Richmond','Richmond', 'Melbourne Central','Flagstaff','Southern Cross','Flinders Street']

var hurstbridge = ['Hurstbridge','Wattle Glen','Diamond Creek','Eltham','Montmorency','Greensborough','Watsonia','Macleod','Rosanna','Heidelberg','Eaglemont','Ivanhoe','Darebin','Alphington','Fairfield','Dennis','Westgarth','Clifton Hill','Victoria Park','Collingwood','North Richmond','West Richmond','Jolimont-MCG','Flinders Street']

var lilydale = ['Lilydale','Mooroolbark','Croydon','Ringwood East','Ringwood','Heatherdale','Mitcham','Nunawading','Blackburn','Laburnum','Box Hill','Mont Albert','Surrey Hills','Chatham','Canterbury','East Camberwell','Camberwell','Auburn','Glenferrie','Hawthorn','Burnley','East Richmond','Richmond','Parliament','Melbourne Central','Flagstaff','Southern Cross','Flinders Street']

var sandringham = ['Sandringham','Hampton','Brighton Beach','Middle Brighton','North Brighton','Gardenvale','Elsternwick','Ripponlea','Balaclava','Windsor','Prahran','South Yarra','Richmond','Flinders Street']

var southMorang = ['South Morang','Epping','Lalor','Thomastown','Keon Park','Ruthven','Reservoir','Regent','Preston','Bell','Thornbury','Croxton','Northcote','Merri','Rushall','Clifton Hill','Victoria Park','Collingwood','North Richmond','West Richmond','Jolimont-MCG','Flinders Street']

var sunbury = ['Sunbury','Diggers Rest','Watergardens','Keilor Plains','St Albans','Ginifer','Albion','Sunshine','Tottenham','West Footscray','Middle Footscray','Footscray','North Melbourne','Flagstaff','Melbourne Central','Parliament','Southern Cross','Flinders Street']

var upfield = ['Upfield','Gowrie','Fawkner','Merlynston','Batman','Coburg','Moreland','Anstey','Brunswick','Jewell','Royal Park','Flemington Bridge','Macaulay','North Melbourne','Flagstaff','Melbourne Central','Parliament','Flinders Street']

var werribe = ['Werribee','Hoppers Crossing','Williams Landing','Aircraft','Laverton','Westona','Westona','Altona','Seaholme','Newport','Spotswood','Yarraville','Seddon','Footscray','South Kensington','North Melbourne','Flagstaff','Melbourne Central','Parliament','Southern Cross','Flinders Street']

var williamstown = ['Williamstown','Williamstown Beach','North Williamstown','Newport','Spotswood','Yarraville','Seddon','Footscray','South Kensington','North Melbourne','Flagstaff','Melbourne Central','Parliament','Southern Cross','Flinders Street']

var loopLine = ['Parliament','Melbourne Central','Flagstaff','Southern Cross','Flinders Street']

var trainNetWork = [frankston, pakenham, craigieburn, alamein, belgrave, glenwaverly, hurstbridge, lilydale, sandringham, southMorang, sunbury, upfield, werribe, williamstown, loopLine];
//var changeOvers = ['South Yarra Station ', 'Caulfield Station  ', 'Richmond Station ']

var changeOvers = ['Caulfield', 'South Yarra', 'Richmond', 'Parliament', 'Southern Cross', MAIN_HUB, 'North Melbourne', 'Footscray', 'Newport', 'Clifton Hill', 'Burnley', 'Camberwell', 'Ringwood', 'Dandenong', 'Frankston','Parliment','Southern Cross']

//========================================================================================

var jumpStations = []

// Return the line number if origin and destination on the sme line or NO_LINE if not
var getLineNumber = function (origin, destination) {
  var result = NO_LINE
  for (var line = 0 ; line < trainNetWork.length; line ++ ){
    if (trainNetWork[line].indexOf(origin) > -1 && trainNetWork[line].indexOf(destination) > -1) {
      result = line;
      break;
    }
  }
  return result;
}

//========================================================================================

// Return the line if origin and destination on the sme line or NO_LINE if not
var getLine = function (origin, destination) {
  var lineNumber = getLineNumber(origin, destination)
  if (lineNumber === NO_LINE) {
    return NO_LINE
  } else {
    return trainNetWork[lineNumber]
  }
}

//========================================================================================

// Check if station is a change over station
var isChangeOver = function (station) {
  var result = false;
  if(changeOvers.indexOf(station) !== -1 ) {
    result = true;
  }
  return result;
}

//========================================================================================

var origin = ''
var destination = ''

// Logic for transversing the train lines to get from Origin to destination
// If the current station is a change over then find the line that will get to the destination
// If there is no line then carry on on the current line
// If you're at the end of the current line and there is no other line to get to the
// main hub then there is a problem

var start = function () {
  var currentStation = origin
  var currentLine = trainNetWork[getLineNumber(origin, origin)]
  var stationNumber = currentLine.indexOf(currentStation)
  var route = []
  route.push(currentStation)
  var direction = 1

  while (currentStation != destination ) {

    if (isChangeOver(currentStation) || currentStation === origin) {
      var lineToDestination = getLineNumber(currentStation, destination)

      if ( lineToDestination === NO_LINE) {
        if (currentLine.indexOf(currentStation) === currentLine.length -1 ) {
          var lineToHub = getLineumber(currentStation, MAIN_HUB)
          if ( lineToHub === NO_LINE) {
            alert('ERROR ERROR ERROR')
          } else {
            currentLine = trainNetWork[lineToHub]
            direction = 1;
            }
        }
      } else {
        if (direction !== -1) {
          jumpStations.push(currentStation)
        }
        if (currentLine.indexOf(destination) > currentLine.indexOf(currentStation)) {
          direction = 1
          stationNumber = currentLine.indexOf(currentStation)
        } else {
          currentLine = trainNetWork[lineToDestination]
          direction = -1
          stationNumber = currentLine.indexOf(currentStation)
        }

      }
    }
    stationNumber = stationNumber + (1 * direction)
    currentStation = currentLine[stationNumber]
    route.push(currentStation)
  }


  return route
}

//========================================================================================

// Return all the stations on the line
var getStationsOnLine = function(trainLine) {
  var stations = []
  for(var i = 0; i < trainLine.length; i++) {
    stations.push(trainLine[i])
  }
  return stations
}

//========================================================================================

//
var getAllStations = function () {
  var allstations = []
  for(var i = 0; i < trainNetWork.length; i++) {
    allstations = allstations.concat(getStationsOnLine(trainNetWork[i]))
  }
  return allstations
}

//========================================================================================

// Remove duplicate stations on the line
var removeDupStations = function (allStations) {
  var stations = []
  for(var i = 0; i < allStations.length; i++ ) {
    if (stations.indexOf(allStations[i]) === -1) {
      stations.push(allStations[i])
    }
  }
  return stations
}

//========================================================================================

//Get all the stations on the network
var buildFromStations = function () {
  var allStations = removeDupStations(getAllStations()).sort()
  var stations = document.createElement("select")

  for (var i = 0; i < allStations.length; i++) {
    var station = document.createElement('option')
    station.value = allStations[i]
    station.text = allStations[i]

    stations.appendChild(station)
  }

  stations.className = 'stations'
  stations.value = ' '
  stations.addEventListener( "change", function() {
    origin = this.value
  })
  return stations


}

//========================================================================================

// Get all Stations on line
var buildToStations = function () {
  var allStations = removeDupStations(getAllStations()).sort()
  var stations = document.createElement("select")

  for (var i = 0; i < allStations.length; i++) {
    var station = document.createElement('option')
    station.value = allStations[i]
    station.text = allStations[i]

    stations.appendChild(station)
  }

  stations.className = 'stations'
  stations.value = ' '
  stations.addEventListener( "change", function() {
    destination = this.value
  })

  return stations
}

//========================================================================================

// Build the html page
$(document).ready(function() {
// No idea how to get these 2 lines into 1 function. The only thing changing is the event listener
  document.getElementById("FromTrainContainer").appendChild(buildFromStations())
  document.getElementById("ToTrainContainer").appendChild(buildToStations())

  var stations = document.getElementsByClassName('stations')
  for (i = 0; i < stations.length; i++) {
    stations[i].value = ' '
  }

  document.getElementById('clear').addEventListener("click", function () {
    var stations = document.getElementsByClassName('stations')
    for (i = 0; i < stations.length; i++) {
      stations[i].value = ' '
      document.getElementById('route').innerHTML = ' '
      origin = ''
    }
  })

  document.getElementById('plotRoute').addEventListener("click", function() {
    jumpStations=[]
    document.getElementById('route').innerHTML = ' '
    if (origin === '' || destination === '') {
      alert('You need to pick a FROM and TO station')
    } else {
       var stops = start()
       var output = stops[0]
       var para = document.createElement("p");

       for (var i = 1; i < stops.length; i++) {
         if (jumpStations.indexOf(stops[i]) > -1) {
           output += ' - ' + '<spam class="jumpStation">' + stops[i] + '</spam>'
         } else {
           output += ' - ' + stops[i]
         }
       }
       output += '<p> Total Stops = ' + stops.length + '</p>'
      // document.getElementById('route').innerHTML = stops.join( ' - ') + '<br><br>' + 'Total Stops: ' + stops.length
      para.innerHTML = output
      document.getElementById('route').appendChild(para)

    }
  })

})
