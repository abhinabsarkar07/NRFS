const bcrypt = require("bscryptjs");

class User{
    constructor({id, name, email, password, role = "user"}){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }


    // hashing the user password before storing

    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 12);
    }

    async compressPassword(enteredPassword){
        return bcrypt.compare(enteredPassword, this.password);
    }
}

module.exports = User;