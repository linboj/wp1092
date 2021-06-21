//https://www.apollographql.com/docs/apollo-server/data/subscriptions/
const Subscription = {
    chatbox: {
        subscribe(parent, args, { db, pubsub }, info) {
            return pubsub.asyncIterator(`chatbox`);
        },
    },
    message: {
        subscribe(parent, args, { pubsub }, info) {
            return pubsub.asyncIterator('message');
        },
    },
};

export { Subscription as default };
