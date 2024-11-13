import mysql.connector


mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="admin",
  database="Emp"
)

cursor = mydb.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS people (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
)
""")


name = input("Enter a person's name: ")

sql = "INSERT INTO people (name) VALUES (%s)"
val = (name,)
cursor.execute(sql, val)

mydb.commit()

print(f'Hello, {name}')

cursor.close()
mydb.close()