** MYSQL Sensor App for Athom homey

With this app you can create virtual devices that gather data from a mysql database into homey. The database can be on a NAS or on a seperate server.

-   SETUP
-   Install the app on your homey.
-   Add a MySQL device.
-   Fill the folowing fields
    -   Name : Name of device
    -   Host : Name of MYSQL server
    -   Port : Port of MYSQL server (deafult 3306)
    -   User : User name used to contact MYSQL server
    -   Password : Password
    -   Query : Query used to retrieve data. Use the following fieldnames: Power device : power (current usage in watt) and meter (total use in KwH) Power device(cumulative): power (current usage in watt), meterpower (total use in KwH), meterinmax (total use in KwH), meteroutmax (total return in KwH), meterintoday (total use in KwH in today), meterouttoday (total return in KwH out today), metertotal_today (total usage or return in KwH today), for volt and current l1 can be changed into (l1/l2/l3) measure_voltage.l1 (Voltage on phase 1), measure_current.l1 (current on phase 1) gas device : meter (total use in m3) weather device : temp (current temperature in C) and humidity (Current humidity in %) sensor device : triggered (integer value greater then 0 is alarm triggered)
    -   Energy Multiplier : Correction factor for energy value. P1 (smartmeter) logs for example output 10 watt as 0.010 so the correction factor is 1000
    -   Polling rate :Number of seconds between MySQL server poll 10 - 10 seconds.

*FEATURES

-   DEVICES
-   MySQL POWER DEVICE
-   MySQL POWER DEVICE (cumulative)
-   MYSQL GAS DEVICE
-   MYSQL WEATHER DEVICE
-   MYSQL SENSOR DEVICE

Cards and flows are athoms default by these types of devices.