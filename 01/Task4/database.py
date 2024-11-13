import mysql.connector



try:

    cnx = mysql.connector.connect(**config)
    print("Connected to MySQL Server version ", cnx.get_server_info())
 
    cursor = cnx.cursor()

    cursor.execute("SELECT DATABASE()")
    record = cursor.fetchone()
    print("You're connected to database: ", record)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL
        )
    """)

    query = "INSERT INTO users (name) VALUES (%s)"
    data = ("John Doe",)
    cursor.execute(query, data)
    cnx.commit()
    print("Record inserted successfully")
    
except mysql.connector.Error as err:
    print("Error while connecting to MySQL", err)
finally:
    if cnx.is_connected():
        cursor.close()
        cnx.close()
        print("MySQL connection is closed")