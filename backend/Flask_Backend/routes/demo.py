from flask import Flask, request, jsonify
from datetime import datetime
from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for , jsonify
)
from werkzeug.security import check_password_hash, generate_password_hash
dm = Blueprint('demo', __name__, url_prefix='/demo')
@dm.route('/done', methods=['GET'])
def say_hello():
    return 'Hello, from demo side!'

