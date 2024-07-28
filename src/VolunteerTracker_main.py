import os
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/volunteer_tracker'
db = SQLAlchemy(app)

class VolunteerLog(db.Model):
    __tablename__ = 'volunteer_logs'
    log_id = db.Column(db.Integer, primary_key=True)
    volunteer_id = db.Column(db.Integer, db.ForeignKey('volunteer.volunteer_id'), nullable=False)
    hours_volunteered = db.Column(db.Integer, nullable=False)
    volunteered_at = db.Column(db.DateTime, nullable=False)

@app.route('/Hours/volunteerlogs/<int:volunteer_id>', methods=['GET'])
def get_volunteer_logs(volunteer_id):
    try:
        logs = VolunteerLog.query.filter_by(volunteer_id=volunteer_id).all()
        return jsonify([{
            'hours_volunteered': log.hours_volunteered,
            'volunteered_at': log.volunteered_at.strftime('%Y-%m-%d %H:%M:%S')
        } for log in logs])
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    finally:
        # Perform any cleanup if necessary
        pass

@app.route('/mobilelogin/volunteerlogs', methods=['POST'])
def add_volunteer_logs():
    try:
        data = request.json
        volunteer_id = data.get('volunteer_id')
        hours_volunteered = data.get('hours_volunteered')
        volunteered_time = data.get('volunteered_time')  # Should be in a format like 'YYYY-MM-DD HH:MM:SS'

        if not volunteer_id or not hours_volunteered or not volunteered_time:
            return jsonify({'message': 'Missing required fields'}), 400

        # Convert volunteered_time to datetime object
        volunteered_time = datetime.strptime(volunteered_time, '%m/%d/%Y %H:%M:%S')

        # Create a new log entry
        new_log = VolunteerLog(
            volunteer_id=volunteer_id,
            hours_volunteered=hours_volunteered,
            volunteered_at=volunteered_time
        )
        db.session.add(new_log)
        db.session.commit()

        return jsonify({'message': 'Log entry added successfully.'}), 201
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    finally:
        # Perform any cleanup if necessary
        pass

if __name__ == '__main__':
    app.run(debug=True)
