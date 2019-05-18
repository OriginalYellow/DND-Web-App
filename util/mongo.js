/* eslint-disable implicit-arrow-linebreak */

// eslint-disable-next-line import/no-unresolved
const { mongooseLoader } = require('@entria/graphql-mongoose-loader');
const R = require('ramda');

// has side effects:
const promiseAll = Promise.all.bind(Promise);

// has side effects:
const prime = R.curry(
  (findByIdLoader, childDocument) => findByIdLoader.prime(childDocument.id, childDocument),
);

const findById = dataLoader => id => dataLoader.load(id);

const findByIds = model => ids => model.find({
  _id: { $in: ids },
});

// MIKE: maybe rename to "findManyToManyChildren" and rename others similarly
const findManyToMany = (childModel, parentField, parentIdLoader) => R.pipeP(
  findById(parentIdLoader),
  R.prop(parentField),
  findByIds(childModel),
);

const findOneToMany = R.curry(
  (childModel, childField, parentId) => childModel.find({ [childField]: parentId }),
);

const batchRelationship = R.curry(
  (findChildren, childIdLoader) => R.pipe(
    R.map(
      R.pipeP(
        findChildren,
        R.tap(
          R.forEach(prime(childIdLoader)),
        ),
      ),
    ),
    promiseAll,
  ),
);

// Exports:

// NOTE: i thought the name "mongooseLoader" wasn't appropriate so i renamed it:
const batchFindById = R.curry(mongooseLoader);

// MIKE: possibly use assertions to specify which options are optional like
// this:
// assert(todosRepository, 'opts.todosRepository is required.')
// assert(currentUser, 'opts.currentUser is required.')

// NOTE: i can use options objects here for more readable code when i call these
// later, but only because they aren't meant to be piped (they make up the edge
// of the current abstraction) so they don't have to be curried:
const batchOneToMany = ({ childModel, childField, childIdLoader }) =>
  batchRelationship(
    findOneToMany(childModel, childField),
    childIdLoader,
  );

const batchManyToMany = ({
  childModel, parentField, parentIdLoader, childIdLoader,
}) =>
  batchRelationship(
    findManyToMany(childModel, parentField, parentIdLoader),
    childIdLoader,
  );

module.exports = {
  batchFindById,
  batchOneToMany,
  batchManyToMany,
};
