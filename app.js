'use strict';

const Homey = require('homey');

class SQL_Device extends Homey.App {
	
	onInit() {
		this.log('MyApp is running...');
	}
}
	
module.exports = SQL_Device;