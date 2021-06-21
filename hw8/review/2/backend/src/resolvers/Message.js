
const Message = {
    async sender(parent, args, { db }, info) {
        console.log(parent)
        return await db.UserModel.findById(parent.sender)
        /*
        const data = await db.UserModel.find()
        return data.filter((user) => {
            return user.id === parent.sender
        })
        */
    }
}

export default Message