from flask import Flask, render_template
import requests

app = Flask(__name__)

@app.route("/")
def index():
    # Make API request to GitHub API
    url = "https://api.github.com/users/hemanth-bavirisetty"
    response = requests.get(url)

    # Check if the request was successful
    if response.status_code == 200:
        # Parse the JSON response
        data = response.json()

        # Extract relevant information
        name = data["name"]
        avatar_url = data["avatar_url"]
        bio = data["bio"]
        followers = data["followers"]
        following = data["following"]
        public_repos = data["public_repos"]

        # Get list of repositories
        repos_url = "https://api.github.com/users/hemanth-bavirisetty/repos"
        repos_response = requests.get(repos_url)
        repos = repos_response.json()

        # Pass the data to the HTML template
        return render_template("index.html", 
                              name=name, 
                              avatar_url=avatar_url, 
                              bio=bio, 
                              followers=followers, 
                              following=following, 
                              public_repos=public_repos,
                              repos=repos)
    else:
        # Handle errors
        return "Error fetching data from GitHub API."

if __name__ == "__main__":
    app.run(debug=True)