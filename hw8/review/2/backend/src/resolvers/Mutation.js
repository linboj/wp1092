
//---utilities---//
const makeName = (name, to) => {
	return [name, to].sort().join('_');
};
const checkUser = async (db, input, request) => {
	if (request === "createChatBox") {
		const data = await db.UserModel.find({ name: input })
		if (!data.length) {
			return false
		}
		return true
	}
	if (request === "createMessage") {
		const data = await db.UserModel.find({ name: input })
		if (!data.length) {
			return false
		}
		return true
	}
}

const newUser = (db, name) => {
	const user = new db.UserModel({ name: name });
	user.save((err) => { if (err) throw (err) })
	return user;
}

//---mutation---//
// https://graphql.org/graphql-js/mutations-and-input-types/
// https://www.compose.com/articles/using-graphql-with-mongodb/
// https://codingstatus.com/how-to-insert-data-into-mongodb-using-mongoose-and-node-js/

const Mutation = {

	async createUser(parent, args, { db }, info) {
		//await db.UserModel.deleteMany({})
		if (await checkUser(db, args.name, "createChatBox")) {
			console.log("User already exist!")
			throw new Error("User already exist!")
		}
		const newuser = await newUser(db, args.name)
		return newuser
	},

	async createChatBox(parent, { name1, name2 },{ db, pubsub }, info) {
		//await db.ChatBoxModel.deleteMany({})
		if (!(await checkUser(db, name1, "createChatBox"))) {
			console.log("User does not exist for CreateChatBox: " + name1);
			await newUser(db, name1);
		}
		const ChatName = makeName(name1, name2)
		const data = await db.ChatBoxModel.find()
		const existing = data.filter((chatbox) => { return chatbox.name === ChatName });
		console.log(existing)
		const chatbox = await new db.ChatBoxModel({
			name: makeName(name1, name2),
		})
		if (!existing.length) {
			await chatbox.save((err) => { if (err) throw (err) })
		}
		else {
			throw new Error(`ChatBox ${ChatName} existing`);
		}


		pubsub.publish('chatbox', {
			chatbox: {
				mutation: 'CREATED',
				data: chatbox,
			},
		});

		return chatbox
	},
	async updateChatBox(parent, { chatbox_id, msg_id }, { db, pubsub }, info) {
		const chatbox = await db.ChatBoxModel.findById(chatbox_id)
		if (!chatbox) {
			throw new Error('Comment not found');
		}
		chatbox.messages.push(msg_id)
		await chatbox.save((err) => { if (err) throw (err) })

		pubsub.publish('chatbox', {
			chatbox: {
				mutation: 'UPDATED',
				data: chatbox,
			},
		});

		return chatbox
	},
	async createMessage(parent, args, { db, pubsub }, info) {
		//await db.MessageModel.deleteMany({})
		if (!checkUser(db, args.sender, "createMessage")) {
			console.log("Sender does not exist for creatMessage: " + args.data.sender);
			throw new Error("Sender does not exist")
		}
		const msgsender = await db.UserModel.findOne({ _id: args.data.sender })
		const message = await new db.MessageModel({
			sender: msgsender,
			body: args.data.body
		})
		await message.save((err) => { if (err) throw (err) })


		pubsub.publish('message', {
			message: {
				mutation: 'CREATED',
				data: message,
			},
		});


		return message;
	}
}

export { Mutation as default };