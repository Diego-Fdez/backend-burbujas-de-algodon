import dotenv from 'dotenv';
import client from '@mailchimp/mailchimp_marketing';
import { validateFields } from '../helpers/validateFields.js';

dotenv.config();

/* Setting the API key and server prefix for the Mailchimp API. */
client.setConfig({
  accessToken: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

//It takes an email address from the request body, and adds it to the Mailchimp list
export async function subscribe(req, res) {
  const { email } = req.body;

  /* Validate the fields */
  validateFields(req, res);

  try {
    await client.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
      email_address: email,
      status: 'pending',
    });

    res.send({
      status: 'OK',
      data: 'Email subscribed successfully, please check your email to confirm subscription',
    });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: 'FAILED',
      data: {
        error: `Member already exists, ${error?.response?.text}` || error,
      },
    });
  }
}
