const bcrypt = require('bcrypt');

const User = require('../models/user');
const jwt = require('../helpers/jwt');

class UserController {
  static google({body}, res) {
    const client = new (require('google-auth-library')).OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    var id_token = body.id_token;
    try {
      var decode = jwt.verify(id_token);
      if (decode.id_token) {
        id_token = decode.id_token
      }
    } catch (e) {
    }

    client
      .verifyIdToken({
        idToken: id_token,
        audience: process.env.CLIENT_ID,
      })
      .then(async function (prop) {
        try {
          const profileData = Object.assign({}, prop.getPayload(), {token: id_token});
          const {email, name, picture} = profileData;
          let first_name = name.split(' ')[0];
          let last_name = name.split(' ')[1];
          let username = name.replace(/[^\w]/gi, '').toLowerCase();
          Object.assign(profileData, {
            username: username,
            first_name: first_name,
            last_name: last_name || first_name
          });

          var profile = await User.findOneAndUpdate({
            $or: [
              {email: profileData.email},
              {username: profileData.username},
              {googleToken: id_token}
            ]
          }, {$set: profileData})
            .exec();

          if (!profile) {
            await (new User(Object.assign(profileData, {
              password: bcrypt.hashSync(bcrypt.genSaltSync(8), bcrypt.genSaltSync(8))
            }))).save()
          }

          res
            .json({
              id: profile._id,
              fullname: name,
              username: username,
              picture: picture,
              email: email,
              token: jwt.sign({id: profile._id}, {id_token})
            })
        } catch (e) {
          console.log(e);
          res
            .status(401)
            .json({
              message: `Unauthorized`
            })
        }
      })
      .catch((err) => {
        console.log(err);
        res
          .status(401)
          .json({
            message: `Unauthorized`
          })
      })
  }

  static create({body}, res) {
    delete body['_id'];
    (new User(body))
      .save((err, data) => {
        if (err) {
          res
            .status(500)
            .json({
              message: err
            })
        } else {
          res
            .json({
              first_name: data.first_name,
              last_name: data.last_name,
              username: data.username,
              email: data.email,
            })
        }
      })
  }

  static list(req, res) {
    User
      .find()
      .then((props) => {
        res
          .json(props)
      })
      .catch((err) => {
        res
          .status(500)
          .json({
            message: err.message
          })
      })
  }

  static login({body}, res) {
    const message = `username/email, password invalid`;
    User
      .findOne({
        $or: [
          {email: body.user},
          {username: body.user}
        ]
      })
      .then((user) => {
        if (!user) {
          throw new User().invalidate('user', message)
        }
        if (bcrypt.compareSync(body.password, user.password)) {
          res
            .json({
              id: user._id,
              username: user.username,
              fullname: user.first_name + ' ' + user.last_name,
              token: jwt.sign({id: user._id})
            })
        } else {
          res
            .status(401)
            .json({
              message
            })
        }
      })
      .catch((err) => {
        res
          .status(401)
          .json({
            message
          })
      })
  }
}

module.exports = UserController;