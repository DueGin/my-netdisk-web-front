import User from './user.ts'

export function getUserList(): Array<User> {
return [
    {
        id: 1,
        username: 'John Brown',
        type: 1,
        status: 1,
    },
    {
        id: 2,
        username: 'Jim Green',
        type: 1,
        status: 1,
    },
    {
        id: 3,
        username: 'Joe Black',
        type: 2,
        status: 0,
    },
    {
        id: 4,
        username: 'Ben Kang',
        type:2,
        status: 1,
    },
]
}

export function addUser(){

}
