from flask import Flask

app = Flask(__name__)

@app.route('/api')
def hello_world() :
    return "snoopin' around are we?"

if __name__ == '__main__':
    app.run(host = "0.0.0.0", port = 4000, debug = True)
