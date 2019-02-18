/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
const { AuthenticationError, ForbiddenError } = require('apollo-server');
const { SchemaDirectiveVisitor } = require('graphql-tools');
const { defaultFieldResolver } = require('graphql');

class AuthenticationDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    // eslint-disable-next-line func-names
    field.resolve = async function (...args) {
      console.log('fug1');
      const context = args[2];

      if (!context.currentUserInfo) {
        throw new AuthenticationError(
          'User\'s session has ended. Please sign in again',
        );
      }

      return resolve.apply(this, args);
    };
  }
}

class AuthorizationDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    // eslint-disable-next-line func-names
    field.resolve = async function (...args) {
      console.log('fug2');
      const { userAPI } = args[2].dataSources;
      const user = await userAPI.getCurrentUser();
      const playerCharacter = await userAPI.getPlayerCharacterById(
        args[1].playerCharacter.id,
      );

      if (playerCharacter.createdBy.toString() !== user.id) {
        throw new ForbiddenError(
          'User lacks permission to edit this player character',
        );
      }

      return resolve.apply(this, args);
    };
  }
}

module.exports = {
  AuthenticationDirective,
  AuthorizationDirective,
};
