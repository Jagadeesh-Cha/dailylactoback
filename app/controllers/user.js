const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

var {
  User
} = require('../models/user');

router.get('/', (req, res) => {
  User.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.error('Error in Retriving Persons :' + JSON.stringify(err, undefined, 2));
      res.send(err)
    }
  });
});

router.get('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  User.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.error('Error in Retriving Person :' + JSON.stringify(err, undefined, 2));
      res.send(err)
    }
  });
});

router.post('/signup', (req, res) => {
  var user = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    mobile: req.body.mobile,
    password: req.body.password,
    avatar: req.body.avatar,
    confirmed: false,
    otp: ""
  });
  const emailToken = jwt.sign({
      email: req.body.email
    },
    process.env.JWT_KEY, {
      expiresIn: "2h"
    });
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    post: 25,
    auth: {
      user: process.env.main_email,
      pass: process.env.main_password
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  const url = `${process.env.BASE_URL}/users/confirmation/${emailToken}`;
  let HelperOptions = {
    from: '"DAILYLACTO"',
    to: req.body.email,
    subject: 'Email Verification',
    html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`
  };
  transporter.sendMail(HelperOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  user.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.error('Error in User Save :' + JSON.stringify(err, undefined, 2));
      res.send(err)
    }
  });
});

router.post("/login", (req, res) => {
  User.find({
      email: req.body.email
    })
    .exec()
    .then(user => {
      if (user[0].confirmed == true) {
        if (user.length < 1) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (req.body.password === user[0].password) {
          const token = jwt.sign({
              email: user[0].email,
              userId: user[0]._id
            },
            process.env.JWT_KEY, {
              expiresIn: "1h"
            });
          return res.status(200).json({
            message: "Auth successful",
            token: token
          });
        } else {
          return res.status(404).json({
            message: "Auth failed"
          });
        }
      } else {
        res.send('please verify your account first')
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.get('/confirmation/:token', async (req, res) => { // not working as desired- need to change 
  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_KEY)
    const userEmail = decoded.email;
    await User.find({
        email: userEmail
      })
      .exec()
      .then(user => {
        console.log(user[0].confirmed)
        user[0].confirmed = true;
        user[0].save((err, doc) => {
          if (!err) {
            res.send('your account is verified. Thank you');
          } else {
            console.error('Error in User Save :' + JSON.stringify(err, undefined, 2));
            res.send(err)
          }
        });
      })
  } catch (e) {
    res.send(e);
  }
})


router.delete('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  User.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.error('Error in User Delete :' + JSON.stringify(err, undefined, 2));
      res.send(err)
    }
  });
});

router.post('/forgot-password', (req, res) => {
  User.find({
      email: req.body.email
    }).exec()
    .then(users => {
      if (users.length < 1) {
        res.send('you are not registered')
      } else {
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          secure: false,
          post: 25,
          auth: {
            user: process.env.main_email,
            pass: process.env.main_password
          },
          tls: {
            rejectUnauthorized: false
          }
        });
        const otp = Math.floor(1000 + Math.random() * 9000);
        let HelperOptions = {
          from: '"DAILYLACTO"',
          to: req.body.email,
          subject: 'Email Verification',
          html: `please use this otp to create new password:${JSON.stringify(otp)}`
        };
        transporter.sendMail(HelperOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        users[0].otp = otp
        users[0].save((err, doc) => {
          if (!err) {
            res.send(doc);
          } else {
            console.error('Error in User Save :' + JSON.stringify(err, undefined, 2));
            res.send(err)
          }
        });

      }
    })
})

router.post('/reset-password', (req, res) => {
  User.find({
      email: req.body.email
    }).exec()
    .then(users => {
      if (users[0].otp == req.body.otp) {
        users[0].password = req.body.password
        users[0].save((err, doc) => {
          if (!err) {
            res.send(doc);
          } else {
            console.error('Error in saving password :' + JSON.stringify(err, undefined, 2));
            res.send(err)
          }
        });
      }
    })
})
module.exports = router;