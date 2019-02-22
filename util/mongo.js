/* eslint-disable implicit-arrow-linebreak */

// eslint-disable-next-line import/no-unresolved
const { mongooseLoader } = require('@entria/graphql-mongoose-loader');
const R = require('ramda');

// i thought the name "mongooseLoader" wasn't appropriate so i renamed it:
const batchFindById = R.curry(mongooseLoader);

const promiseAll = Promise.all.bind(Promise);

const prime = R.curry(
  (findByIdLoader, childDocument) => findByIdLoader.prime(childDocument.id, childDocument),
);

const findById = dataLoader => id => dataLoader.load(id);

const findByIds = model => ids => model.find({
  _id: { $in: ids },
});

const findManyToMany = R.curry(
  (childModel, parentField, parentIdLoader) => R.pipeP(
    findById(parentIdLoader),
    R.prop(parentField),
    findByIds(childModel),
  ),
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

const batchOneToMany = (childModel, childField, childIdLoader) =>
  batchRelationship(
    findOneToMany(childModel, childField),
    childIdLoader,
  );

const batchManyToMany = (childModel, parentField, parentIdLoader, childIdLoader) =>
  batchRelationship(
    findManyToMany(childModel, parentField, parentIdLoader),
    childIdLoader,
  );

module.exports = {
  batchFindById,
  batchOneToMany,
  batchManyToMany,
};
