process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');

const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../index');

const Account = require('../src/models/user.model');    

chai.use(chaiHttp);

before(async () => {
    const existingAccount = await Account.findOne({ email: "test@gmail.com" });
    if (existingAccount) {
        await Account.deleteOne({ email: "test@gmail.com" });
    }
    const existingAccount2 = await Account.findOne({ email: "testExistingEmail@gmail.com" });
    if (!existingAccount2) {
        await Account.create({ email: "testExistingEmail@gmail.com", password: "test123" });
    }

});

after(async () => {
    const existingAccount = await Account.findOne({ email: "test@gmail.com" });
    if (existingAccount) {
        await Account.deleteOne({ email: "test@gmail.com" });
    }
    const existingAccount2 = await Account.findOne({ email: "testExistingEmail@gmail.com" });
    if (existingAccount2) {
        await Account.deleteOne({ email: "testExistingEmail@gmail.com", "password": "test123" });
    }
});


describe('Account', () => {

    describe('POST signup', () => {
        it('it should not POST a user without email field', function(done) {
            let user = {
                password: "test",
                username: "test"
            }
            chai.request(server)
                .post('/account/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
            });
        it('it should not POST a user without password field', function(done) {
            let user = {
                email: "test@gmail.com"
            }
            chai.request(server)
                .post('/account/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
            });

        it('it should POST a user ', function(done) {
            let user = {
                email: "test@gmail.com",
                password: "test123",
                username: "test"
            }
            chai.request(server)
                .post('/account/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('email').eql('test@gmail.com');   
                    done();
                });
            });
            

        it('it should not POST a user with existing email', function(done) {
      
            let user = {
                email: "testExistingEmail@gmail.com",
                password: "test123",
            }
            chai.request(server)
                .post('/account/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message').eql('Email already exists');
                    console.log(res.body);
                    done();
                });
            });
       
    });

    describe('POST login', () => {
        it('it should not POST login a user without email field', function(done) {
            let user = {
                password: "test",
            }
            chai.request(server)
                .post('/account/login')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message').eql('Email not found');
                    res.body.should.have.property('success').eql(false);
                    done();
                });
            });
        it('it should not POST login a user without password field', function(done) {
            let user = {
                email: "test@gmail.com"
            }
            chai.request(server)
                .post('/account/login')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
            });
        it('it should not POST login a user with wrong email', function(done) {
            let user = {
                email: "testwrong@gmail.com",
                password: "test123",
            }
            chai.request(server)
                .post('/account/login')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message').eql('Email not found');
                    done();
                });
            });
        it('it should not POST login a user with wrong password', function(done) {
            let user = {
                email: "test@gmail.com",
                password: "testwrong",
            }
            chai.request(server)
                .post('/account/login')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message').eql('Invalid credentials');
                    done();
                });
            });
        it('it should POST login a user ', function(done) {
            let user = {
                email: "test@gmail.com",
                password: "test123",
                username: "test"
            }
            chai.request(server)
                .post('/account/login')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('token');
                    res.body.should.have.property('user');
                    done();
                });
            });
    }); 
    
   
    describe('Cart', () => {
        let token;
        before(async () => {
            let credentials = {
                email: "test@gmail.com",
                password: "test123",
                username: "test"
            };
        
            try {
                const loginResponse = await chai.request(server)
                    .post('/account/login')
                    .send(credentials);
                console.log("Login response:", loginResponse.body);
                token = loginResponse.body.token; // Lưu trữ token nhận được
            } catch (error) {
                console.error("Error occurred while logging in:", error);
            }
        });
        before(async () => {
            try {
                const username = "test";
                const user = await Account.findOne({ username: username });
                
                if (user) {
                    user.CartFilm.push("1357");
                    user.save();
                } else {
                    console.log("User not found: " + username);
                }
            } catch (error) {
                console.error("Error occurred while adding Cart film:", error);
            }
        });
        
        describe('POST add Cart', () => {
            it('it should not POST add Cart without token', function(done) {
                chai.request(server)
                    .post('/account/test/addCart/135')
                    .end((err, res) => {
                        res.should.have.status(401);
                        done();
                    });
                });
                it('it should POST add Cart', (done) => {
                    chai.request(server)
                        .post('/account/test/addCart/135')
                        .set('token', 'Bearer ' + token)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.have.property('message').eql('Add Cart film success');
                            res.body.should.have.property('Cart').length(2);
                            res.body.Cart[1].should.eql('135');
                            done();
                        });
                });

                it('it should not POST add Cart one movie twice', function(done) {
                    
                    chai.request(server)
                        .post('/account/test/addCart/1357')
                        .set('token', 'Bearer ' + token)
                        .end((err, res) => {
                            res.should.have.status(409);
                            if (res.status !== 500) {
                                res.body.should.have.property('message').eql('Movie already in Carts');
                            }
                            done();
                        });
                });
            
            it('it should not POST add Cart with invalid movieId', function(done) {
                chai.request(server)
                    .post('/account/test/addCart/invalid')
                    .set('token', 'Bearer ' + token)
                    .end((err, res) => {
                        res.should.have.status(400);
                        console.log(res.body);
                        done();
                    });
                });
            it('it should not POST add Cart with invalid username', function(done) {
                chai.request(server)
                    .post('/account/invalid/addCart/135')
                    .set('token', 'Bearer ' + token)
                    .end((err, res) => {
                        res.should.have.status(404);
                        res.body.should.have.property('message').eql('User not found');
                        done();
                    });
                });
        });
        describe('POST remove Cart', () => {
            it('it should not POST remove Cart without token', function(done) {
                chai.request(server)
                    .post('/account/test/removeCart/135')
                    .end((err, res) => {
                        res.should.have.status(401);
                        done();
                    });
                });
            it('it should POST remove Cart', (done) => {
                chai.request(server)
                    .post('/account/test/removeCart/135')
                    .set('token', 'Bearer ' + token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property('message').eql('remove Cart film success');
                        res.body.should.have.property('Cart').length(1);
                        res.body.Cart[0].should.eql('1357');
                        done();
                    });
                });
            it('it should not POST remove of a movie that is not in the Cart list', function(done) {
                chai.request(server)
                    .post('/account/test/removeCart/13568')
                    .set('token', 'Bearer ' + token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property('message').eql('Movie not found in Cart list');
                        done();
                    });
                });
            it('it should not POST remove Cart with invalid user', function(done) {
                chai.request(server)
                    .post('/account/invalid/removeCart/135')
                    .set('token', 'Bearer ' + token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        done();
                    });
                });
            
        });
    });
    
});

