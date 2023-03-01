from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://doadmin:AVNS_8jlXLzIcnV636IAs9-r@wineworld-db-mysql-do-user-13620893-0.b.db.ondigitalocean.com:25060/defaultdb?ssl-mode=REQUIRED'


@app.route("/")
def hello_world():
    return """
    <h1> Welcome to the WineWorld API </h1> <br>
    Check out the <a href="https://documenter.getpostman.com/view/21507814/2s93CEvGRv">documentation</a>
    """


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=4000, debug=True)
