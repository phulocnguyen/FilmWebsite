process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');

const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../index');

const Account = require('../src/models/user.model');
const Review = require('../src/models/review.model');

chai.use(chaiHttp);



after(async () => {
    const reviewAccount = await Account.findOne({ email: "testReview@gmail.com" });
    if (reviewAccount) {
        await Account.deleteOne({ email: "testReview@gmail.com" });
    }
});

describe('Review', () => {
    let token;
    before(async () => {
        // sign up for new test review account
        let credentials = {
            email: "testReview@gmail.com",
            password: "test123",
            username: "testReview"
        };
         chai.request(server)
            .post('/account/signup')
            .send(credentials)
            .end((err, res) => {
                console.log("Signup response:", res.body);
            });
        
            try {
                const loginResponse = await chai.request(server)
                    .post('/account/login')
                    .send(credentials);
                token = loginResponse.body.token; // Lưu trữ token nhận được
            } catch (error) {
                console.error("Error occurred while logging in:", error);
            }
    });

    describe('POST add review', () => {
        it('it should add a review', (done) => {
            chai.request(server)
                .post('/reviews/create')
                .set('token', 'Bearer ' + token)
                .send({
                    username: 'testReview',
                    movieId: '123456',
                    text: 'This is a test review'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.success.should.equal('true');
                    res.body.message.should.equal('create successfully');
                    done();
                });
        });

        it('it should not add a review without token', (done) => {
            chai.request(server)
                .post('/reviews/create')
                .send({
                    username: 'testReview',
                    movieId: '123456',
                    text: 'This is a test review'
                })
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });

        it('it should not add a review without movieId', (done) => {
            chai.request(server)
                .post('/reviews/create')
                .set('token', 'Bearer ' + token)
                .send({
                    username: 'testReview',
                    text: 'This is a test review'
                })
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });

        it('it should not add a review without text', (done) => {
            chai.request(server)
                .post('/reviews/create')
                .set('token', 'Bearer ' + token)
                .send({
                    username: 'testReview',
                    movieId: '123456'
                })
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });

        it('it should not add a review without username', (done) => {
            chai.request(server)
                .post('/reviews/create')
                .set('token', 'Bearer ' + token)
                .send({
                    movieId: '123456',
                    text: 'This is a test review'
                })
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });

        // it('it should not add a review with invalid movieId', (done) => {
        //     chai.request(server)
        //         .post('/reviews/create')
        //         .set('token', 'Bearer ' + token)
        //         .send({
        //             username: 'testReview',
        //             movieId: 'invalid',
        //             text: 'This is a test review'
        //         })
        //         .end((err, res) => {
        //             res.should.have.status(500);
        //             done();
        //         });
        // });
    });

    describe('DELETE review', () => {
        it('it should delete a review', (done) => {
            Review.findOne({ text: 'This is a test review' })
                .then((review) => {
                    chai.request(server)
                        .delete('/reviews/delete/' + review._id)
                        .set('token', 'Bearer ' + token)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.success.should.equal('true');
                            res.body.message.should.equal('Review removed');
                            done();
                        });
                });
        });

        it('it should not delete a review without token', (done) => {
            Review.findOne({ text: 'This is a test review' })
                .then((review) => {
                    chai.request(server)
                        .delete('/reviews/delete/' + review._id)
                        .end((err, res) => {
                            res.should.have.status(401);
                            done();
                        });
                });
        });

        it('it should not delete a review with invalid id', (done) => {
            chai.request(server)
                .delete('/reviews/delete/invalid')
                .set('token', 'Bearer ' + token)
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });

        it('it should not delete a review with invalid token', (done) => {
            Review.findOne({ text: 'This is a test review' })
                .then((review) => {
                    chai.request(server)
                        .delete('/reviews/delete/' + review._id)
                        .set('token', 'Bearer invalid')
                        .end((err, res) => {
                            res.should.have.status(401);
                            done();
                        });
                });
        });


    });

});