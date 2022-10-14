const { model, Schema } = require("mongoose");

const UsuarioSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        type: String,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UsuarioSchema.methods.toJSON = function () {
  const { password, _id, ...usuario } = this.toObject();
  usuario.uid = _id;

  return usuario;
};

module.exports = model("User", UsuarioSchema);
