const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../Assignment 2/src/app');
const mongoose = require('mongoose');
const User = require('../src/models/userModel');
const Astrologer = require('../src/models/astrologerModel');

// Configure Chai
chai.use(chaiHttp);
const expect = chai.expect;

// Describe block for User API endpoints
describe('User API Endpoints', () => {
    // Hook to run before tests
    before((done) => {
        // Connect to a test database
        mongoose.connect('mongodb://localhost:27017/testDB', { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                console.log('Connected to test database');
                done();
            })
            .catch((error) => {
                console.error('Error connecting to test database:', error);
                done(error);
            });
    });

    // Hook to run after tests
    after((done) => {
        // Disconnect from the test database
        mongoose.disconnect()
            .then(() => {
                console.log('Disconnected from test database');
                done();
            })
            .catch((error) => {
                console.error('Error disconnecting from test database:', error);
                done(error);
            });
    });

    // Test case for creating a new user
    describe('POST /user', () => {
        it('should create a new user', (done) => {
            chai.request(app)
                .post('/user')
                .send({ name: 'Test User', preferences: { zodiacSign: 'Leo', language: 'English' } })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('message').equal('User created successfully');
                    expect(res.body.user).to.have.property('_id');
                    expect(res.body.user).to.have.property('name').equal('Test User');
                    done();
                });
        });
    });

    // Test case for getting user by ID
    describe('GET /user/:userId', () => {
        it('should get user by ID', (done) => {
            const newUser = new User({ name: 'Test User', preferences: { zodiacSign: 'Leo', language: 'English' } });
            newUser.save()
                .then((user) => {
                    chai.request(app)
                        .get(`/user/${user._id}`)
                        .end((err, res) => {
                            expect(res).to.have.status(200);
                            expect(res.body).to.have.property('user');
                            expect(res.body.user).to.have.property('_id').equal(user._id.toString());
                            expect(res.body.user).to.have.property('name').equal('Test User');
                            done();
                        });
                })
                .catch((error) => {
                    done(error);
                });
        });
    });
});

// Describe block for Astrologer API endpoints
describe('Astrologer API Endpoints', () => {
    // Test case for creating a new astrologer
    describe('POST /astrologer', () => {
        it('should create a new astrologer', (done) => {
            chai.request(app)
                .post('/astrologer')
                .send({ name: 'Test Astrologer' })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('message').equal('Astrologer created successfully');
                    expect(res.body.astrologer).to.have.property('_id');
                    expect(res.body.astrologer).to.have.property('name').equal('Test Astrologer');
                    done();
                });
        });
    });

    // Test case for getting astrologer by ID
    describe('GET /astrologer/:astrologerId', () => {
        it('should get astrologer by ID', (done) => {
            const newAstrologer = new Astrologer({ name: 'Test Astrologer' });
            newAstrologer.save()
                .then((astrologer) => {
                    chai.request(app)
                        .get(`/astrologer/${astrologer._id}`)
                        .end((err, res) => {
                            expect(res).to.have.status(200);
                            expect(res.body).to.have.property('astrologer');
                            expect(res.body.astrologer).to.have.property('_id').equal(astrologer._id.toString());
                            expect(res.body.astrologer).to.have.property('name').equal('Test Astrologer');
                            done();
                        });
                })
                .catch((error) => {
                    done(error);
                });
        });
    });
});