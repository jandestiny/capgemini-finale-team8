import time
import board
import adafruit_ccs811
import sqlite3
from sqlite3 import Error

i2c = board.I2C()  # uses board.SCL and board.SDA
ccs811 = adafruit_ccs811.CCS811(i2c)

# Wait for the sensor to be ready
while not ccs811.data_ready:
    pass

while True:
    print("CO2: {} PPM, TVOC: {} PPB".format(ccs811.eco2, ccs811.tvoc))
    time.sleep(0.5)


try:
    # Making a connection between sqlite3 database and Python Program
    sqliteConnection = sqlite3.connect('user data.db')
    print("Connected to SQLite")
except sqlite3.Error as error:
    print("Failed to connect with sqlite3 database", error)
finally:

    if sqliteConnection:
        # using close() method, we will close the connection
        sqliteConnection.close()
        print("the sqlite connection is closed")


def create_users(conn, users):

    sql = '''INSERT INTO users(UserID, name)
    VALUES(?, ?)'''
    cur = conn.cursor()
    cur.execute(sql, users)
    conn.commit()
    return cur.lastrowid


def create_rawd(conn, rawd):
    sql = '''INSERT INTO Rawd(timest, hashtag, CO2, TVOC)
    VALUES(?, ?, ?, ?)'''
    cur = conn.cursor()
    cur.execute(sql, rawd)
    conn.commit()
    return cur.lastrowid


def create_posts(conn, posts):
    sql = '''INSERT INTO Posts(displaytext, hashtag, UserID)
    VALUES(?, ?, ?)'''
    cur = conn.cursor()
    cur.execute(sql, posts)
    conn.commit()
    return cur.lastrowid


def main():
    database = r"C:\Users\hamdy\Documents\projects.py\Cap2021Finale\dist\user data.db"

    # create a database connection
    conn = create_connection(database)
    with conn:
        # create a new dataset
        rawd =
        rawd_id = create_rawd(conn, rawd)

        users = ('')

        # posts
        POSTS = ('')


if __name__ == '__main__':
    main()
