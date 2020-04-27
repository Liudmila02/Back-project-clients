import bcrypt from 'bcryptjs';
const model = require('../models/index');

const { User } = model;

export async function login({ email, password }) {
  const user = await User.findOne({
    where: { email: email }
  });

  if (!user || !await bcrypt.compare(password, user.password)) {
    throw new Error("Incorrect email or password");
  }
  return {
    id: user.id,
    email: user.email,
    name: user.name
  };
}


class Users {
  static async signUp(req) {
    const { name, email, password } = req.body
    let user = await User.findOne({
      where: { email: email }
    });
    if (user) {
      throw new Error("Email already exist");
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      user = await User.create({
        email: email,
        password: hashedPassword,
        name: name
      })
    } catch (err) {
      throw new Error("An error occured, try again later");
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password
    };
  }
}

export default Users;

export function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}