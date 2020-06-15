let UserCart = require('../app/modules/cart-module');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app/server');
chai.use(require('chai-things'));
let should = chai.should();

chai.use(chaiHttp);


describe('User Cart', () => {
  describe('/GET products in cart', () => {
    it('it should GET an empty array if there are no products in the user\'s cart', done => {
      let user = {
        username: "lazywolf342",
        password: "tucker"
      }
      chai
        .request(server)
        .post('/api/login')
        .set('x-authentication', '88312679-04c9-4351-85ce-3ed75293b449')
        .send(user)
        .end((err, res) => {
          let token = res.body;
          chai
            .request(server)
            .get('/api/me/cart')
            .set('x-authentication', '88312679-04c9-4351-85ce-3ed75293b449')
            .query({ accessToken: token })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.an('array');
              res.body.length.should.be.eql(0);
              done();
            });
        });
    });

    it('it should GET an an array of products in the users cart, with the correct number and type of products', done => {
      let user = {
        username: "yellowleopard753",
        password: "jonjon"
      }
      chai
        .request(server)
        .post('/api/login')
        .set('x-authentication', '88312679-04c9-4351-85ce-3ed75293b449')
        .send(user)
        .end((err, res) => {
          let token = res.body;
          chai
            .request(server)
            .get('/api/me/cart')
            .set('x-authentication', '88312679-04c9-4351-85ce-3ed75293b449')
            .query({ accessToken: token })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.an('array');
              res.body.should.all.have.property('id');
              res.body.should.all.have.property('categoryId');
              res.body.should.all.have.property('name');
              res.body.should.all.have.property('name');
              res.body.should.all.have.property('price');
              res.body.should.all.have.property('imageUrls');
              res.body.length.should.be.eql(1);
              done();
            });
        });
    });


    describe('/POST products in cart', () => {
      it('it should POST (add a product) to the users cart', done => {
        //arrange a scenario
        let user = {
          username: "greenlion235",
          password: "waters"
        }

        let testProduct = {
          "id": "1",
          "categoryId": "1",
          "name": "Superglasses",
          "description": "The best glasses in the world",
          "price": 150,
          "imageUrls": ["https://image.shutterstock.com/z/stock-photo-yellow-sunglasses-white-backgound-600820286.jpg", "https://image.shutterstock.com/z/stock-photo-yellow-sunglasses-white-backgound-600820286.jpg", "https://image.shutterstock.com/z/stock-photo-yellow-sunglasses-white-backgound-600820286.jpg"]
        }
        //act
        chai
          .request(server)
          .post('/api/login')
          .set('x-authentication', '88312679-04c9-4351-85ce-3ed75293b449')
          .send(user)
          .end((err, res) => {
            let token = res.body;
            chai
              .request(server)
              .post('/api/me/cart')
              .set('x-authentication', '88312679-04c9-4351-85ce-3ed75293b449')
              .query({ accessToken: token })
              .send(testProduct)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('array');
                res.body.should.all.have.property('id');
                res.body.should.all.have.property('categoryId');
                res.body.should.all.have.property('name');
                res.body.should.all.have.property('name');
                res.body.should.all.have.property('price');
                res.body.should.all.have.property('imageUrls');
                done();
              })
          });

        it('it should fail if a product is sent without an id ', done => {
          // arrange
          let user = {
            username: "greenlion235",
            password: "waters"
          }

          let testProduct = {
            "categoryId": "1",
            "name": "Superglasses",
            "description": "The best glasses in the world",
            "price": 150,
            "imageUrls": ["https://image.shutterstock.com/z/stock-photo-yellow-sunglasses-white-backgound-600820286.jpg", "https://image.shutterstock.com/z/stock-photo-yellow-sunglasses-white-backgound-600820286.jpg", "https://image.shutterstock.com/z/stock-photo-yellow-sunglasses-white-backgound-600820286.jpg"]
          }
          //act
          chai
            .request(server)
            .post('/api/login')
            .set('x-authentication', '88312679-04c9-4351-85ce-3ed75293b449')
            .send(user)
            .end((err, res) => {
              let token = res.body;
              chai
                .request(server)
                .post('/api/me/cart')
                .set('x-authentication', '88312679-04c9-4351-85ce-3ed75293b449')
                .query({ accessToken: token })
                .send(testProduct)
                .end((err, res) => {
                      res.should.have.status(400);
                      done();
                    });
                });
            });

            // describe('/DELETE product from cart', () => {
            //   it('it should DELETE a product in the cart (using its product id)', done => {
                    //   let user = {
    //     username: "yellowleopard753",
    //     password: "jonjon"
    //   }
    //   chai
    //     .request(server)
    //     .post('/api/login')
    //     .set('x-authentication', '88312679-04c9-4351-85ce-3ed75293b449')
    //     .send(user)
    //     .end((err, res) => {
    //       let token = res.body;
    //       chai
    //         .request(server)
    //         .get('/api/me/cart')
    //         .set('x-authentication', '88312679-04c9-4351-85ce-3ed75293b449')
    //         .query({ accessToken: token })
    //         .end((err, res) => {
    //           res.should.have.status(200);
    //           res.body.should.be.an('array');
    //           res.body.should.all.have.property('id');
    //           res.body.should.all.have.property('categoryId');
    //           res.body.should.all.have.property('name');
    //           res.body.should.all.have.property('name');
    //           res.body.should.all.have.property('price');
    //           res.body.should.all.have.property('imageUrls');
    //           res.body.length.should.be.eql(1);
    //           done();
    //         });
    //     });
    // });
                // arrange: create a test product to add to the cart, so that we can then test deleting it
                // let testProduct2 = {
                //   "id": "1",
                //   "categoryId": "1",
                //   "name": "Superglasses",
                //   "description": "The best glasses in the world",
                //   "price": 150,
                //   "imageUrls": ["https://image.shutterstock.com/z/stock-photo-yellow-sunglasses-white-backgound-600820286.jpg", "https://image.shutterstock.com/z/stock-photo-yellow-sunglasses-white-backgound-600820286.jpg", "https://image.shutterstock.com/z/stock-photo-yellow-sunglasses-white-backgound-600820286.jpg"]
                // };
                // let user = {
                //       username: "yellowleopard753",
                //       password: "jonjon"
                //     }
                //     chai
                //       .request(server)
                //       .post('/api/login')
                //       .set('x-authentication', '88312679-04c9-4351-85ce-3ed75293b449')
                //       .send(user)
                //       .end((err, res) => {
                //         let token = res.body;
                //         chai
                //           .request(server)
                //           .get('/api/me/cart')
                //           .set('x-authentication', '88312679-04c9-4351-85ce-3ed75293b449')
                //           .query({ accessToken: token })
                //           .end((err, res) => {
                // chai
                //   .request(server)
                //   .post('/api/me/cart')
                //   .send(testProduct2)
                //   .end((err, res) => {
                //     //the post request to add a product to the cart returns the product added in the response, so we can assign a variable to the product after it is added to check if its been deleted
                //     const addedProduct = res.body
                //     // act
                //     chai
                //       .request(server)
                //       .delete('/api/me/cart/' + addedProduct.id)
                //       .end((err, res) => {
                //         // assert
                //         res.should.have.status(200);

                //         // check if product has been removed from the cart
                //         chai
                //           .request(server)
                //           .get('/api/me/cart/' + addedProduct.id)
                //           .end((err, res) => {
                //             res.should.have.status(404);
                //             done();
                //           });
            //           });
            //       });
            //   });
            // });

          //   describe('/POST product from cart', () => {
          //     it('it should UPDATE the quantity product in the cart (using its product id)', done => {
          //       // arrange: create a test product to add to the cart, so that we can then modifying its quantity
          //       let testProduct3 = {
          //         "id": "1",
          //         "categoryId": "1",
          //         "name": "Superglasses",
          //         "description": "The best glasses in the world",
          //         "price": 150,
          //         "imageUrls": ["https://image.shutterstock.com/z/stock-photo-yellow-sunglasses-white-backgound-600820286.jpg", "https://image.shutterstock.com/z/stock-photo-yellow-sunglasses-white-backgound-600820286.jpg", "https://image.shutterstock.com/z/stock-photo-yellow-sunglasses-white-backgound-600820286.jpg"]
          //       };
          //       chai
          //         .request(server)
          //         .post('/api/me/cart')
          //         .send(testProduct3)
          //         .end((err, res) => {
          //           //the post request to add a product to the cart returns the product added in the response, so we can assign a variable to the response product to then check if its been updated
          //           const addedProduct = res.body
          //           addedProduct.quantity = 5;
          //           // act
          //           chai
          //             .request(server)
          //             .post('/api/me/cart/' + addedProduct.id)
          //             .send(addedProduct)
          //             .end((err, res) => {
          //               // assert
          //               res.should.have.status(200);
          //               const updatedProduct = res.body
          //               // check if quantity of product has been updated correctly
          //               chai
          //                 .request(server)
          //                 .get('/api/me/cart/' + updatedProduct.id)
          //                 .end((err, res) => {
          //                   res.should.have.status(200);
          //                   res.body.should.have.property('quantity', 5);
          //                   done();
          //                 });
          //             });
       });
     });
    });
  });

