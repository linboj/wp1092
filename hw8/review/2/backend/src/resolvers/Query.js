const Query = {
	async users(parent, args, { db }, info) {
		const data = await db.UserModel.find()
		if (!args.query) {
			return data;
		}
		return data.filter((user) => {
			return user.name.toLowerCase().includes(args.query.toLowerCase());
		});
	},
	async chatboxes(parent, args, { db }, info) {
		const data = await db.ChatBoxModel.find()
		if (!args.query) {
			return data;
		}
		return data.filter((chatbox) => {
			return chatbox.name.toLowerCase().includes(args.query.toLowerCase());
		})
	},

	async messages(parent, args, { db }, info) {
		return await db.MessageModel.find();
	},

};

export { Query as default };
