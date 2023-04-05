
const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
// jwt has advantage over session cookie as it need not be stored any where
// it has both auth and authorization info, unlike session cookie which authorixation req db access
// jwt= header.payload.signature . Payload contains user info and even exipration info
// the frontend stores this token in localstorage to maintin state
// npm install passport-jwt-> create stratergy in config folder->metion stratergy in in index.js-> create middleware for extraction
// npm install jsonwebtoken(passort will decrypt this) ->
module.exports.createSession = async function(req, res){// for signing-in the user
    try{
        let user = await User.findOne({email: req.body.email});

        if (!user || user.password != req.body.password){
            return res.json(422, {
                message: "Invalid username or password"
            });
        }

        return res.json(200, {
            message: 'Sign in successful, here is your token, please keep it safe!',
            user: user.toJSON(),
            data:  {
                token: jwt.sign(user.toJSON(), 'codeial', {expiresIn:  '1h'})
            }
        })

    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}

module.exports.signup = async (req, res) => {
    try {
      const { name, password, email } = req.body;

      // check if user with email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: 'Email already exists' });
      }

      // create new user
      const newUser = new User({ name, email, password });
      await newUser.save();

      // generate jwt token
    //   const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
    const token = jwt.sign({ userId: newUser._id }, 'codial');

      // return response with token and user info
      return res.status(201).json({ token, user: newUser.toJSON() });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
