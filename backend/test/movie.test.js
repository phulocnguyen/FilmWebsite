process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');

const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../index');

chai.use(chaiHttp);

describe('Movie', () => {

describe('GET movie discover', (done) => {
    it('it should GET movie discover', function(done) {
        chai.request(server)
            .get('/movie')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
        });
    });

    describe('GET movie detail', (done) => {
        it('it should GET movie info', function(done) {
            chai.request(server)
                .get('/movie/135')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
            });
        });

    describe('GET movie search', (done) => {
        it('It should GET movie search', function(done) {
            chai.request(server)
                .get('/movie/search?query=avengers')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('GET movie popular', (done) => {
        it('It should GET movie popular', function(done) {
            chai.request(server)
                .get('/movie/popular')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('GET movie videos', (done) => {
        it('It should GET movie videos', function(done) {
            chai.request(server)
                .get('/movie/videos/135')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    res.body.data.should.be.a('object');
                    done();
                });
        });
    });

    describe('GET movie images', (done) => {
        it('It should GET movie images', function(done) {
            chai.request(server)
                .get('/movie/images/135')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('backdrops');
                    res.body.should.have.property('posters');
                    res.body.backdrops.should.be.a('array');
                    res.body.posters.should.be.a('array');

                    done();
                });
        });
    });

    describe('GET movie credits', (done) => {
        it('It should GET movie credits', function(done) {
            chai.request(server)
                .get('/movie/credits/135')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    res.body.data.should.be.a('object');
                    res.body.data.should.have.property('cast');
                    res.body.data.should.have.property('crew');
                    res.body.data.cast.should.be.a('array');
                    res.body.data.crew.should.be.a('array');
                    res.body.data.cast[0].should.have.property('name').eql('Bob Dylan');
                    done();
                });
        });
    });

    describe('GET movie similar', (done) => {
        it('It should GET movie similar', function(done) {
            chai.request(server)
                .get('/movie/similar/135')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    res.body.data.should.be.a('object');
                    res.body.data.should.have.property('results');
                    res.body.data.results.should.be.a('array');
                    done();
                });
        });
    });

    });
