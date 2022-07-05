require('dotenv').config();
const Stripe = require('stripe');
const cliProgress = require('cli-progress');

const { subscriptionList } = require('./subscription_list');

const cancelSubscriptions = async () => {
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.rect);

  progressBar.start(subscriptionList.length, 0);

  for (const subscription of subscriptionList) {
    await stripe.subscriptions.del(subscription);

    progressBar.increment(1);
  }

  progressBar.stop();

  return;
};

cancelSubscriptions()
  .then(() => process.exit(0))
  .catch(error => {
    console.log(error);
    process.exit(1);
  });
