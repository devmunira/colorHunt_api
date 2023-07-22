import { faker } from '@faker-js/faker';
import User from './src/models/User.js';

// Seed numOfUser User Data to User Documents
const userSeeder = async (numOfUser) => {
    console.log('User Creating........')
    for(let i = 0 ; i <= numOfUser ; i++){
        const user  = new User({
            username : faker.person.middleName(),
            email : faker.internet.email(),
            password: faker.internet.password()
        })

       await user.save()
    }

    // await User.deleteMany()
    console.log('User Created Successfully!')
}


// export user seeder for using it as necessary
export default userSeeder;