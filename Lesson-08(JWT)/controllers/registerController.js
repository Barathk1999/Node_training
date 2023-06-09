const userDB = {
    users: require('../model/users.json'),
    setUsers: function (data) {this.users = data}
}

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt =require('bcrypt');

const handleNewUser = async (req,res) => {
    const {user, pwd} = req.body;
    if(!user || !pwd) return res.status(400).json({'message': 'username and password are required.'});
    //check duplicates
    const duplicate = userDB.users.find(person => person.username == user);
    if(duplicate) return res.sendStatus(409).json({'message': 'username or password already available please use different.'});;
    try {
        const hashPwd = await bcrypt.hash(pwd, 10);
        
        const newUser = {"username": user, "password": hashPwd};
        userDB.setUsers([...userDB.users, newUser]);
        await fsPromises.writeFile(
            path.join(__dirname,'..','model','users.json'),
            JSON.stringify(userDB.users)
        );
        console.log(userDB.users);
        res.status(201).json({'success': `New user ${user} created!`});
    } catch (err) {
        res.status(500).json({'message': err.message});
    }
}

module.exports = { handleNewUser };