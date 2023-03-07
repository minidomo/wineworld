from models import app


@app.route("/")
def hello_world():
    return """
    <h1> Welcome to the WineWorld API </h1> <br>
    Check out the <a href="https://documenter.getpostman.com/view/21507814/2s93CEvGRv">documentation</a>
    """


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=4000, debug=True)
