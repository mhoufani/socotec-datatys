import db from '../sql/db.cjs';

/**
 *  Save User on database
 * @param user
 * @returns {Promise<*|null|Error>}
 */
const save = async (user) => {
  const queryText = {
    text: `INSERT INTO users (first_name, last_name, email, city, country, phone_number, avatar)
           VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
    values: [
      user.firstName,
      user.lastName,
      user.email,
      user.city,
      user.country,
      user.phoneNumber,
      user.avatar,
    ],
  };

  try {
    const result = await db.query(queryText);
    return result.rows?.[0]?.id || null;
  } catch (e) {
    return new Error(JSON.stringify({
      service: 'UserController.save',
      error: e,
    }));
  }
};

/**
 * Check if user exist on database from email
 * @param email
 * @returns {Promise<*|null|Error>}
 */
const findUserIdByEmail = async (email) => {
  const queryText = {
    text: 'SELECT id FROM users WHERE email = $1',
    values: [email],
  };

  try {
    const result = await db.query(queryText);
    return result?.rows[0]?.id || null;
  } catch (e) {
    return new Error(JSON.stringify({
      service: 'UserController.findByEmail',
      error: e,
    }));
  }
};

export default {
  save,
  findUserIdByEmail,
};
