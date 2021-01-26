const bcrypt = require('bcryptjs');	
const LocalStragegy = require('passport-local').Strategy;

function initialize(passport, getUserByEmail, getUserById) {
    
    const authenticateUser = async (email, password, done) => {
        const user = await getUserByEmail(email);
        console.log(user);
        console.log(password);
         if (user == null)
            return done(null, false);
        if (bcrypt.compareSync(password, user.password))
            return done(null, user);
        else 
            return done(null, false);
    };

    passport.use(new LocalStragegy({usernameField: 'email'}, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => done(null, getUserById(id)));

}

module.exports = initialize;
