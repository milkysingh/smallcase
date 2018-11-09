/**
 * @function <b>createNew</b><br>
 * @param {Object} data  data
 * @param {Object} Model Mongoose model
 * @return {Object} Mongo Document
 */
const createNew = (data, Model) => {
  const user = new Model(data);
  return user.save();
};
/**
 * @function <b>updateData</b><br>
 * @param {Object} condition 'Condition for Update'
 * @param {Object} update 'data to update
 * @param {Object} Model Mongoose model
 */
const updateData = (_id, update, Model) => Model.findByIdAndUpdate({ _id }, update, {
  upsert: true,
  new: true,
  runValidators: true,
});

/**
 * @function <b>findRecordById</b><br>
 * @param {ObjectId} _id '_id of the user to check if it exist'
 * @param {Object} Model Mongoose model
 * @return {Object} return record if matched
 */
const findRecordById = (_id, Model) => Model.findById(_id);

/**
 * @function <b>removeById</b><br>
 * @param {ObjectId} _id '_id of the user to check if it exist'
 * @param {Object} Model Mongoose model
 * @return {Object} Delete and return Record if matched
 */
const removeById = (_id, Model) => Model.findByIdAndRemove({ _id });

/**
 * @function <b>findRecord</b><br>
 * @param {Object} query 'query object to search'
 * @param {Object} Model Mongoose model
 * @return {Object} return record/s if found.
 */
const findRecord = (query, Model) => Model.find(query);

module.exports = {
  createNew,
  updateData,
  findRecordById,
  removeById,
  findRecord,
};
