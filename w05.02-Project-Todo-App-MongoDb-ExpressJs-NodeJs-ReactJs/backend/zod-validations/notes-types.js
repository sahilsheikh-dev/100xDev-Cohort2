const zod = require("zod");

const createToDoSchema = zod.object({
  title: zod.string(),
  description: zod.string(),
});

const getToDoByIdSchema = zod.object({
  id: zod.string(),
});

const updateToDoSchema = zod.object({
  id: zod.string(),
  title: zod.string(),
  description: zod.string(),
  completed: zod.boolean(),
});

const changeStatusSchema = zod.object({
  id: zod.string(),
});

const deleteToDoSchema = zod.object({
  id: zod.string(),
});

module.exports = {
  createToDoSchema: createToDoSchema,
  getToDoByIdSchema: getToDoByIdSchema,
  updateToDoSchema: updateToDoSchema,
  changeStatusSchema: changeStatusSchema,
  deleteToDoSchema: deleteToDoSchema,
};
