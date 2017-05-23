** MYSQL Sensor App for Athom homey


** CHANGELOG

*1.0.0 First release 
	- Icon changed

* 0.02
	- Small bugfixes. 
	- powermult set during pairing became corrupt.
	- Default powermult removed
	- Version number changed
	

** USAGE
With this app you can load energy and power meter data from a mysql database into homey. The database can be on a NAS or on a seperate server. 
There are verious applications that can fill a MySQL database with Solar logs or P1 (smartmeter) data.

* SETUP
- Install the app on your homey. 
- Add a MySQL power device. 
- Fill the folowing fields
	- Name 				- Name of the device
	- Hostname			- IP adress of the MySQL server
	- User				- MySQL username
	- Password			- MySQL password
	- MySQL query		- Query to get the energy and meter data. (Example: Select energy, meter from P1_Log order by meettijd desc limit 1)
	- Energy Multiplier - Correction factor for energy value. P1 (smartmeter) logs for example output 10 watt as 0.010 so the correction factor is 1000
	- Polling rate		- Number of seconds between MySQL server poll 10 - 10 seconds. 

*FEATURES

*Device
- MySQL DEVICE

*Insights (per device)
- Energy
- Meter value

* Flows 
- (IF) Energy is changed
- (IF) Energy meter is changed
- (variable) Energy
- (variable) Wh
	
