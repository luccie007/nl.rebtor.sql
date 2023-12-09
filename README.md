** MYSQL Sensor App for Athom homey

** CHANGELOG
* 3.1.1
    - Added automatic Device capability for updating without re-adding devices

* 3.1.0
    - Added Current and Voltages to Powermeter and Port for SQL when pairing

* 3.0.1
    - Updated MySQL libery
	
* 3.0.0
    - SDK update and support for version 5.0.0

* 2.0.3
	- added MySQL POWER DEVICE (cumulative)

* 2.0.2
	- fixed name for sensor device

* 2.0.1	
	- Added support for sensor device

* 2.0.0 
	- Update to SDK 2
	- Added support for gas and weather device

* 1.0.0 First release 
	- Icon changed

* 0.0.2
	- Small bugfixes. 
	- powermult set during pairing became corrupt.
	- Default powermult removed
	- Version number changed
	
* USAGE

With this app you can create virtual devices that gather data from a mysql database into homey. The database can be on a NAS or on a seperate server. 

* SETUP
- Install the app on your homey. 
- Add a MySQL device. 
- Fill the folowing fields
	- Name						: Name of device
	- Host						: Name/IP of MYSQL server
	- Port						: Port of MYSQL server	(default = 3306)
	- User						: User name used to contact MYSQL server
	- Password					: Password 
	- Query						: Query used to retrieve data. Use the following fieldnames: 
		Power device			: power (current usage in watt) and meter (total use in KwH), for volt and current l1 can be changed into (l1/l2/l3) measure_voltage.l1 (Voltage on phase 1), measure_current.l1 (current on phase 1)
		Power device(cumulative): power (current usage in watt), meter_power (total use in KwH), meter_in_max (total use in KwH), meter_out_max (total return in KwH), meter_in_today (total use in KwH in today), meter_out_today (total return in KwH out today), meter_total_today (total usage or return in KwH today), for volt and current l1 can be changed into (l1/l2/l3) measure_voltage.l1 (Voltage on phase 1), measure_current.l1 (current on phase 1)
		gas device				: meter (total use in m3)
		weather device			: temp (current temperature in C) and humidity (Current humidity in %)
		sensor device			: triggered (integer value greater then 0 is alarm triggered)
	- Energy Multiplier			: Correction factor for energy value. P1 (smartmeter) logs for example output 10 watt as 0.010 so the correction factor is 1000
	- Polling rate				:Number of seconds between MySQL server poll 10 - 10 seconds. 

*FEATURES

* DEVICES
- MySQL POWER DEVICE
- MySQL POWER DEVICE (cumulative)
- MYSQL GAS DEVICE
- MYSQL WEATHER DEVICE
- MYSQL SENSOR DEVICE

Cards and flows are athoms default by these types of devices. 
