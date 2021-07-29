import time
import board
import adafruit_ccs811
import sq3lite

i2c = board.I2C()  # uses board.SCL and board.SDA
ccs811 = adafruit_ccs811.CCS811(i2c)

while not ccs811.data_ready:
    pass

while True:
    print("CO2: {} PPM, TVOC: {} PPB".format(ccs811.eco2, ccs811.tvoc))
    time.sleep(0.5)


try:
    # Making a connection between sqlite3 database and Python Program
    sqliteConnection = sqlite3.connect('raw_data.db')
    print("Connected to SQLite")
except sqlite3.Error as error:
    print("Failed to connect with sqlite3 database", error)
finally:
  
    if sqliteConnection:
        sqliteConnection.close()
        print("the sqlite connection is closed")
