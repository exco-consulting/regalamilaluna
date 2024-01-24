import { createAstroRoute } from '@trigger.dev/astro';
import { TriggerClient, eventTrigger } from '@trigger.dev/sdk';

const client = new TriggerClient({
  id: "myproject-lYyM",
  apiKey: {"BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}.TRIGGER_API_KEY,
  apiUrl: {"BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}.TRIGGER_API_URL
});

client.defineJob({
  // This is the unique identifier for your Job, it must be unique across all Jobs in your project
  id: "example-job",
  name: "Example Job: a joke with a delay",
  version: "0.0.1",
  // This is triggered by an event using eventTrigger. You can also trigger Jobs with webhooks, on schedules, and more: https://trigger.dev/docs/documentation/concepts/triggers/introduction
  trigger: eventTrigger({
    name: "example.event"
  }),
  run: async (payload, io, ctx) => {
    await io.logger.info("🧪 Example Job: a joke with a delay");
    await io.logger.info("How do you comfort a JavaScript bug?");
    await io.wait("Wait 5 seconds for the punchline...", 5);
    await io.logger.info("You console it! 🤦");
    await io.logger.info(
      "✨ Congratulations, You just ran your first successful Trigger.dev Job! ✨"
    );
  }
});

const prerender = false;
const { POST } = createAstroRoute(client);

export { POST, prerender };
