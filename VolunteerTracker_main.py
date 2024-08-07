import os
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

load_dotenv()

SUPABASE_PASSWORD: str = os.environ.get("SUPABASE_PASSWORD")

'''
Application
'''
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://postgres.jpxteplnvmmkxnyhuusx:{SUPABASE_PASSWORD}@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
db = SQLAlchemy(app)

'''
SQLAlchemy Models
'''
class Organizer(db.Model):
    organizer_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    phone_number = db.Column(db.String(15))

class Volunteer(db.Model):
    volunteer_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    phone_number = db.Column(db.String(15))
    hours_volunteered = db.Column(db.Float(2))
    wallet_address = db.Column(db.String(255))

class Organization(db.Model):
    organization_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    contact_email = db.Column(db.String(100), nullable=False)
    contact_phone = db.Column(db.String(15))

class Event(db.Model):
    event_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    hour_type = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text)
    organizer_id = db.Column(db.Integer, db.ForeignKey('organizer.organizer_id'))
    organization_id = db.Column(db.Integer, db.ForeignKey('organization.organization_id'))
    organizer = db.relationship('Organizer', backref='events')
    organization = db.relationship('Organization', backref='events')

class VolunteerFeedback(db.Model):
    feedback_id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('event.event_id'))
    volunteer_id = db.Column(db.Integer, db.ForeignKey('volunteer.volunteer_id'))
    rating = db.Column(db.Integer, nullable=False)
    comments = db.Column(db.Text)
    event = db.relationship('Event', backref='feedback')
    volunteer = db.relationship('Volunteer', backref='feedback')

'''
Endpoints
'''
@app.route('/organizers', methods=['POST'])
def create_organizer():
    data = request.json
    new_organizer = Organizer(first_name=data['first_name'],
                              last_name=data['last_name'],
                              email=data['email'],
                              phone_number=data.get('phone_number'))
    db.session.add(new_organizer)
    db.session.commit()
    return jsonify({'message': 'New organizer created!'}), 201

@app.route('/organizers', methods=['GET'])
def get_organizers():
    organizers = Organizer.query.all()
    result = []
    for organizer in organizers:
        result.append({
            'organizer_id': organizer.organizer_id,
            'first_name': organizer.first_name,
            'last_name': organizer.last_name,
            'email': organizer.email,
            'phone_number': organizer.phone_number
        })
    return jsonify({'organizers': result})


@app.route('/volunteers', methods=['POST'])
def create_volunteer():
    data = request.json
    new_volunteer = Volunteer(first_name=data['first_name'],
                              last_name=data['last_name'],
                              email=data['email'],
                              phone_number=data.get('phone_number'),
                              hours_volunteered=data.get('hours_volunteered'),
                              wallet_address=data.get('wallet_address'))
    db.session.add(new_volunteer)
    db.session.commit()
    return jsonify({'message': 'New volunteer created!'}), 201


@app.route('/volunteers', methods=['GET'])
def get_volunteers():
    volunteers = Volunteer.query.all()
    result = []
    for volunteer in volunteers:
        result.append({
            'volunteer_id': volunteer.volunteer_id,
            'first_name': volunteer.first_name,
            'last_name': volunteer.last_name,
            'email': volunteer.email,
            'phone_number': volunteer.phone_number,
            'hourse_volunteered': volunteer.hours_volunteered,
            'wallet_address': volunteer.wallet_address
        })
    return jsonify({'volunteers': result})


@app.route('/organizations', methods=['POST'])
def create_organization():
    data = request.json
    new_organization = Organization(name=data['name'],
                                    description=data.get('description'),
                                    contact_email=data['contact_email'],
                                    contact_phone=data.get('contact_phone'))
    db.session.add(new_organization)
    db.session.commit()
    return jsonify({'message': 'New organization created!'}), 201


@app.route('/organizations', methods=['GET'])
def get_organizations():
    organizations = Organization.query.all()
    result = []
    for organization in organizations:
        result.append({
            'organization_id': organization.organization_id,
            'name': organization.name,
            'description': organization.description,
            'contact_email': organization.contact_email,
            'contact_phone': organization.contact_phone
        })
    return jsonify({'organizations': result})


@app.route('/events', methods=['POST'])
def create_event():
    data = request.json
    new_event = Event(name=data['name'],
                      hour_type=data['hour_type'],
                      description=data.get('description'),
                      organizer_id=data['organizer_id'],
                      organization_id=data['organization_id'])
    db.session.add(new_event)
    db.session.commit()
    return jsonify({'message': 'New event created!'}), 201


@app.route('/events', methods=['GET'])
def get_events():
    events = Event.query.all()
    result = []
    for event in events:
        result.append({
            'event_id': event.event_id,
            'name': event.name,
            'hour_type': event.hour_type,
            'description': event.description,
            'organizer_id': event.organizer_id,
            'organization_id': event.organization_id
        })
    return jsonify({'events': result})


@app.route('/volunteer_feedback', methods=['POST'])
def create_volunteer_feedback():
    data = request.json
    new_feedback = VolunteerFeedback(event_id=data['event_id'],
                                     volunteer_id=data['volunteer_id'],
                                     rating=data['rating'],
                                     comments=data.get('comments'))
    db.session.add(new_feedback)
    db.session.commit()
    return jsonify({'message': 'New volunteer feedback created!'}), 201


@app.route('/volunteer_feedback', methods=['GET'])
def get_volunteer_feedback():
    feedbacks = VolunteerFeedback.query.all()
    result = []
    for feedback in feedbacks:
        result.append({
            'feedback_id': feedback.feedback_id,
            'event_id': feedback.event_id,
            'volunteer_id': feedback.volunteer_id,
            'rating': feedback.rating,
            'comments': feedback.comments
        })
    return jsonify({'volunteer_feedbacks': result})


with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)