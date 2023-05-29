const URL_REG = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
const EMAIL_REG = /^([a-z0-9_.-]+)@([a-z0-9_.-]+)\.([a-z.]{2,6})$/;

module.exports = {
  URL_REG,
  EMAIL_REG,
};
