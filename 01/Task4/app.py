from flask import Flask, render_template, request, redirect, url_for
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)

# Database configuration
DB_CONFIG = {
    'host': 'localhost',
    'database': 'emp',
    'user': 'root',
    'password': 'admin'
}

def get_db_connection():
    """Create and return a database connection"""
    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        return connection
    except Error as e:
        print(f"Error connecting to MySQL Platform: {e}")
        return None

def create_users_table():
    """Create users table if it doesn't exist"""
    try:
        connection = get_db_connection()
        if connection:
            cursor = connection.cursor()
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100) NOT NULL
                )
            """)
            connection.commit()
            cursor.close()
            connection.close()
    except Error as e:
        print(f"Error creating users table: {e}")

# Call create_users_table() when the module is imported
create_users_table()

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        name = request.form['name']
        
        try:
            # Establish database connection
            connection = get_db_connection()
            
            if connection:
                # Create a cursor
                cursor = connection.cursor()
                
                # Insert new user
                insert_query = "INSERT INTO users (name) VALUES (%s)"
                cursor.execute(insert_query, (name,))
                
                # Commit the transaction
                connection.commit()
                
                # Get the last inserted ID
                user_id = cursor.lastrowid
                
                # Close cursor and connection
                cursor.close()
                connection.close()
                
                # Redirect to greeting page with user ID
                return redirect(url_for('greeting', user_id=user_id))
        
        except Error as e:
            print(f"Error inserting user: {e}")
    
    return render_template('index.html')

@app.route('/greeting/<int:user_id>')
def greeting(user_id):
    try:
        # Establish database connection
        connection = get_db_connection()
        
        if connection:
            # Create a cursor
            cursor = connection.cursor(dictionary=True)
            
            # Fetch user by ID
            select_query = "SELECT * FROM users WHERE id = %s"
            cursor.execute(select_query, (user_id,))
            
            # Fetch the user
            user = cursor.fetchone()
            
            # Close cursor and connection
            cursor.close()
            connection.close()
            
            # Render greeting template
            if user:
                return render_template('greeting.html', user=user)
            else:
                return "User not found", 404
    
    except Error as e:
        print(f"Error fetching user: {e}")
        return "An error occurred", 500



@app.route('/all_users')
def all_users():
    try:
        # Establish database connection
        connection = get_db_connection()
        
        if connection:
            # Create a cursor
            cursor = connection.cursor(dictionary=True)
            
            # Fetch all users
            select_query = "SELECT * FROM users"
            cursor.execute(select_query)
            
            # Fetch all users
            users = cursor.fetchall()
            
            # Close cursor and connection
            cursor.close()
            connection.close()
            
            # Render users template
            return render_template('all_users.html', users=users)
    
    except Error as e:
        print(f"Error fetching users: {e}")
        return "An error occurred", 500

if __name__ == '__main__':
    app.run(debug=True)