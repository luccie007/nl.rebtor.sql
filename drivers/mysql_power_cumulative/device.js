'use strict';

var settings = {};
var intervalId = {};
var device = {};

const Homey = require('homey');

class mysql_power extends Homey.Device {

    // this method is called when the Device is inited
    onInit() {
        this.log('device init');
        this.log('name:', this.getName());
        this.log('class:', this.getClass());
		this.log('Settings:', this.getSettings());
		
		initDeviceInterval(this, this.getSetting('pollingrate'))	
		
        // register a capability listener
    }

    // this method is called when the Device is added
    onAdded() {
        this.log('device added');
		initDeviceInterval(this, this.getSetting('pollingrate'))	
    }

    // this method is called when the Device is deleted
    onDeleted() {
        this.log('device deleted');
		clearInterval(intervalId[this.id]);
		delete intervalId[this.id];
    }
};


function initDeviceInterval(device_data,pollingrate){
  intervalId[device_data.id] = setInterval(function () {
    GetNewData(device_data, function(response){
        //reserved for callback
      })
    }, pollingrate * 1000);
}

function GetNewData(device_data, callback) {
	
    var device = device_data;

    device_data.log("Polling MYSQL " + device.getName() + " Polling rate is: " + device.getSetting('pollingrate'));


	var mysql      = require('mysql');
	var query	   = device.getSetting('query');	
	var connection = mysql.createConnection({
	  host     : device.getSetting('host'),
	  user     : device.getSetting('user'),
	  password : device.getSetting('pass'),
	  database : device.getSetting('database')
	});

	connection.connect();

	connection.query(device.getSetting('query'), function(err, rows) {
	  
	if (err) { device_data.log('Error: ',err);}
	else
    {

	   var currentUsage = 0 + (rows[0].power * device.getSetting('powermult'));
	   var Meter_power = 0 + rows[0].meter_power ;	   
	   var Meter_in = 0 + rows[0].meter_in_max ;
	   var Meter_out = 0 + rows[0].meter_out_max ;
	   var Meter_in_today = 0 + rows[0].meter_in_today ;	   
	   var Meter_out_today = 0 + rows[0].meter_out_today ;	
	   var Meter_total_today = 0 + rows[0].meter_total_today ;	
	   
	   device.setCapabilityValue('measure_power', currentUsage);
	   device.setCapabilityValue('meter_power', Meter_power);
	   device.setCapabilityValue('meter_power.in', Meter_in);
	   device.setCapabilityValue('meter_power.out', Meter_out);
	   device.setCapabilityValue('meter_power.in_today', Meter_in_today);
	   device.setCapabilityValue('meter_power.out_today', Meter_out_today);		   
	   device.setCapabilityValue('meter_power.today', Meter_total_today);	

	   
       device_data.log('Current usage: ' + device.getCapabilityValue('measure_power') + ' W');
       device_data.log('Meter total: ' + device.getCapabilityValue('meter_power') + ' KW/H');		
    }
	  
	})
	connection.end();

    
}
module.exports = mysql_power;