import { validationResult } from 'express-validator';

/** It checks if there are any errors in the request body and if there are, it returns a response with
 * the errors.*/
export const validateFields = (req, res) => {
  //show messages from express validator
  const mistakes = validationResult(req);
  if (!mistakes.isEmpty()) {
    return res.status(400).send({
      status: 'FAILED',
      data: { error: mistakes.array() },
    });
  }
};
