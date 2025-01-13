import db from '../sql/db.cjs';

/**
 *  Save User on database
 * @param user
 * @returns {Promise<*|null|Error>}
 */
const createUser = async (user)=> {
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
      error: e.message,
    }));
  }
};

/**
 *
 * @param user
 * @returns {Promise<number|null|*|Error>}
 */
const deleteUser = async (user) => {
  const queryText = {
    text: 'DELETE FROM users WHERE id = $1',
    values: [user.id],
  }
  try {
    const result = await db.query(queryText);
    return result.rowCount;
  } catch (e) {
    return new Error(JSON.stringify({
      service: 'UserController.deleteUser',
      error: e.message,
    }));
  }
}

/**
 *
 * @param user
 * @returns {Promise<number|null|*|Error>}
 */
const updateUser = async (user) => {
  const queryText = {
    text: `UPDATE users
            SET first_name   = $2,
                last_name    = $3,
                email        = $4,
                city         = $5,
                country      = $6,
                phone_number = $7,
                avatar       = $8
            WHERE id = $1`,
    values: [
      user.id,
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
    return result.rowCount;
  } catch (e) {
    return new Error(JSON.stringify({
      service: 'UserController.updateUser',
      error: e.message,
    }));
  }
}

export default {
  createUser,
  updateUser,
  deleteUser,
};
