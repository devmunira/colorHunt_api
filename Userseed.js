import { faker } from '@faker-js/faker';
import User from './src/models/User.js';


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

export default userSeeder;