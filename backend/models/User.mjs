class User {
  constructor({
    firstName,
    lastName,
    email,
    password,
    city,
    country,
    phoneNumber,
    avatar,
  }) {
    this._firstName = firstName || null;
    this._lastName = lastName || null;
    this._email = email || null;
    this._password = password || null;
    this._city = city || null;
    this._country = country || null;
    this._phoneNumber = phoneNumber || null;
    this._avatar = avatar || null;
  }

  get firstName() {
    return this._firstName;
  }

  set firstName(value) {
    this._firstName = value;
    return this;
  }

  get lastName() {
    return this._lastName;
  }

  set lastName(value) {
    this._lastName = value;
    return this;
  }

  get email() {
    return this._email;
  }

  set email(value) {
    this._email = value;
    return this;
  }

  get password() {
    return this._password;
  }

  set password(value) {
    this._password = value;
    return this;
  }

  get city() {
    return this._city;
  }

  set city(value) {
    this._city = value;
    return this;
  }

  get country() {
    return this._country;
  }

  set country(value) {
    this._country = value;
    return this;
  }

  get phoneNumber() {
    return this._phoneNumber;
  }

  set phoneNumber(value) {
    this._phoneNumber = value;
    return this;
  }

  get avatar() {
    return this._avatar;
  }

  set avatar(value) {
    this._avatar = value;
    return this;
  }
}

export default User;
