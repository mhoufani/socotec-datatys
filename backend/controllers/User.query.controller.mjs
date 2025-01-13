import db from '../sql/db.cjs';

/**
 * Check if user exist on database from email
 * @param user
 * @returns {Promise<*|null|Error>}
 */
const findUserIdByEmail = async (user) => {
  const queryText = {
    text: 'SELECT id FROM users WHERE email = $1',
    values: [user.email],
  };

  try {
    const result = await db.query(queryText);
    return result?.rows[0]?.id || null;
  } catch (e) {
    return new Error(JSON.stringify({
      service: 'UserController.findByEmail',
      error: e.message,
    }));
  }
};

/**
 *
 * @param user
 * @returns {Promise<*|null|Error>}
 */
const getUserById = async (user) => {
  const queryText = {
    text: `SELECT id,
                  first_name,
                  last_name,
                  email,
                  city,
                  country,
                  phone_number,
                  avatar
           FROM users
           WHERE id = $1;
    `,
    values: [user.id],
  };

  try {
    const result = await db.query(queryText);
    return result?.rows[0] || null;
  } catch (e) {
    return new Error(JSON.stringify({
      service: 'UserController.findById',
      error: e.message,
    }));
  }
}

/**
 * Get all users on database with limit 100
 * @returns {Promise<*|null|Error>}
 */
const getUsers = async () => {
  const queryText = {
    text: `SELECT id,
                  email,
                  first_name,
                  last_name,
                  city,
                  country,
                  phone_number,
                  encode(avatar, \'base64\') as avatar
           FROM users ORDER BY id DESC LIMIT 100;
    `,
  }
  try {
    const result = await db.query(queryText);
    return result.rows;
  } catch (e) {
    return new Error(JSON.stringify({
      service: 'UserController.getUsers',
      error: e.message,
    }));
  }
}

export default {
  getUsers,
  findUserIdByEmail,
  getUserById
};
