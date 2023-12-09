'use strict';

var settings = {};
var intervalId = {};
var device = {};

const Homey = require('homey');

class mysql_power extends Homey.Device {

	// this method is called when the Device is inited
    async onInit() {
		if (this.hasCapability('measure_voltage.l1') === false) {
		  // You need to check if migration is needed
		  // do not call addCapability on every init!
		  await this.addCapability('measure_voltage.l1');
		  await this.addCapability('measure_voltage.l2');
		  await this.addCapability('measure_voltage.l3');
		  await this.addCapability('measure_current.l1');
		  await this.addCapability('measure_current.l2');
		  await this.addCapability('measure_current.l3');
		  }
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
	  port     : device.getSetting('port'),
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
	   var VoltageL1 = 0 + rows[0].meter_voltage_l1 ;
	   var VoltageL2 = 0 + rows[0].meter_voltage_l2 ;
       var VoltageL3 = 0 + rows[0].meter_voltage_l3 ;
       var CurrentL1 = 0 + rows[0].meter_current_l1 ;
	   var CurrentL2 = 0 + rows[0].meter_current_l2 ;
       var CurrentL3 = 0 + rows[0].meter_current_l3 ;
	   
	   device.setCapabilityValue('measure_power', currentUsage);
	   device.setCapabilityValue('meter_power', Meter_power);
	   device.setCapabilityValue('meter_power.in', Meter_in);
	   device.setCapabilityValue('meter_power.out', Meter_out);
	   device.setCapabilityValue('meter_power.in_today', Meter_in_today);
	   device.setCapabilityValue('meter_power.out_today', Meter_out_today);		   
	   device.setCapabilityValue('meter_power.today', Meter_total_today);	
	   device.setCapabilityValue('measure_voltage.l1', VoltageL1);
	   device.setCapabilityValue('measure_voltage.l2', VoltageL2);
	   device.setCapabilityValue('measure_voltage.l3', VoltageL3);
	   device.setCapabilityValue('measure_current.l1', CurrentL1);
	   device.setCapabilityValue('measure_current.l2', CurrentL2);
	   device.setCapabilityValue('measure_current.l3', CurrentL3);
	   
       device_data.log('Current usage: ' + device.getCapabilityValue('measure_power') + ' W');
       device_data.log('Meter total: ' + device.getCapabilityValue('meter_power') + ' KW/H');	
	   device_data.log('Voltage L1: ' + device.getCapabilityValue('measure_voltage.l1') + ' V');		
       device_data.log('Voltage L2: ' + device.getCapabilityValue('measure_voltage.l2') + ' V');		
       device_data.log('Voltage L3: ' + device.getCapabilityValue('measure_voltage.l3') + ' V');		
       device_data.log('Current L1: ' + device.getCapabilityValue('measure_current.l1') + ' A');		
       device_data.log('Current L2: ' + device.getCapabilityValue('measure_current.l2') + ' A');		
       device_data.log('Current L3: ' + device.getCapabilityValue('measure_current.l3') + ' A');		
    }
	  
	})
	connection.end();

    
}
module.exports = mysql_power;