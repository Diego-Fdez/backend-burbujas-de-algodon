import { Op } from 'sequelize';
import { Formularies } from '../models/formModels.js';
import { badWords } from '../db/badWordsDictionary.js';
import { validateFields } from '../helpers/validateFields.js';
import { sendEmail } from '../helpers/sendEmail.js';

/** It creates a regular expression that matches any of the words in the array badWords, and then tests
 * the word passed to the function against that regular expression */
const checkBadWords = (word) => {
  const rgx = new RegExp(badWords.join('|') + '|' + '/gi');
  return rgx.test(word);
};

//It creates a new formulary.
export async function createFormulary(req, res) {
  const { fullName, title, email, description } = req.body;

  validateFields(req, res);

  /* Checking if the description or title contains any of the words in the badWords array. */
  if (
    checkBadWords(description.toLowerCase()) === true ||
    checkBadWords(title.toLowerCase()) === true
  ) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: 'It is not allowed to include offensive language!' },
    });
    return;
  }

  try {
    await sendEmail(req, res);

    /* Creating a new formulary. */
    await Formularies.create({
      fullName: fullName,
      title: title,
      email: email,
      description: description,
      status: 'P',
    });

    res.send({
      status: 'OK',
      data: 'Email sent',
    });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: 'FAILED',
      data: { error: error },
    });
  }
}

/**It gets a formulary by ID from the database and returns it to the user.*/
export async function getFormularyByID(req, res) {
  const { id } = req.params;

  if (!id) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: 'Parameter :Id is required' },
    });
    return;
  }

  try {
    const result = await Formularies.findByPk(id);

    if (result === null) {
      res.status(404).send({
        status: 'FAILED',
        data: 'Formulary not found',
      });
      return;
    }
    res.send({
      status: 'OK',
      data: result,
    });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: 'FAILED',
      data: { error: error?.errors[0]?.message || error?.message || error },
    });
  }
}

//It gets a formulary by email and date
export async function getFormularyByEmailAndDate(req, res) {
  const { email, date } = req.body;

  validateFields(req, res);

  try {
    const result = await Formularies.findAll({
      where: {
        [Op.and]: [{ email: email }, { createdAt: date }],
      },
    });

    if (result.length === 0) {
      res.status(404).send({
        status: 'FAILED',
        data: 'Formulary not found',
      });
      return;
    }

    res.send({
      status: 'OK',
      data: result,
    });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: 'FAILED',
      data: { error: error?.errors[0]?.message || error?.message || error },
    });
  }
}

//It gets all the formularies from the database and sends them to the client.
export async function getAllFormularies(req, res) {
  try {
    const result = await Formularies.findAll();

    if (result.length === 0) {
      res.status(404).send({
        status: 'FAILED',
        data: 'No formularies to display',
      });
      return;
    }

    res.send({
      status: 'OK',
      data: result,
    });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: 'FAILED',
      data: { error: error?.errors[0]?.message || error?.message || error },
    });
  }
}

//It updates the status of a formulary to "C" (Completed)
export async function updateStateFormulary(req, res) {
  const { id } = req.params;

  try {
    // Change status to "C"
    const formulary = await Formularies.findByPk(id);
    formulary.status = 'C';
    formulary.save();

    res.send({
      status: 'OK',
      data: formulary,
    });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: 'FAILED',
      data: { error: error?.message || error },
    });
  }
}
