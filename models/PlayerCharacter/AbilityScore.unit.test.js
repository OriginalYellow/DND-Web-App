// MIKE: remove some tests that are covered implicitly by other tests

/* eslint-disable no-undef */
const { tests } = require('./AbilityScore');

describe('defaultIfUndefined', () => {
  it(
    'should return the default value if second value is undefined',
    () => {
      expect(tests.defaultIfUndefined('the default value')(undefined))
        .toBe('the default value');
    },
  );

  it(
    'should return the second value if the second value is not undefined',
    () => {
      expect(tests.defaultIfUndefined('the default value')('the second value'))
        .toBe('the second value');
    },
  );
});

test(
  'findTargetNames should return the passed in ability score\'s "bonus recepients\'" names',
  () => {
    expect(tests.findTargetNames({ name: 'INT' })(tests.sourceTargetsMap))
      .toMatchSnapshot();
  },
);

describe('createBonusTarget', () => {
  it(
    'should create a bonus target with all of the passed in info',
    () => {
      expect(tests.createBonusTarget({
        sourceName: 'the source name',
        sourceType: 'the source type',
        targetName: 'the target name',
        targetType: 'the target type',
        explanation: 'the explanation',
        value: 5,
      }))
        .toMatchSnapshot();
    },
  );

  it('should create a bonus target with a default explanation', () => {
    expect(tests.createBonusTarget({
      sourceName: 'the source name',
      sourceType: 'the source type',
      targetName: 'the target name',
      targetType: 'the target type',
      value: 5,
    }))
      .toMatchSnapshot();
  });
});

describe('calcModifier', () => {
  it('should calculate the correct modifier', () => {
    expect(tests.calcModifier(12)).toBe(1);
  });

  it('should calculate the correct modifier', () => {
    expect(tests.calcModifier(0)).toBe(-5);
  });
});

describe('getOutgoingBonuses', () => {
  it('should compute the effects of a given ability score on skills and return as "bonuses"', () => {
    expect(tests.getOutgoingBonuses(
      { name: 'INT', value: 12 },
      tests.sourceTargetsMap,
      tests.sourceTargetsMapCommon,
    ))
      .toMatchSnapshot();
  });

  test('should return an empty array', () => {
    expect(tests.getOutgoingBonuses(
      { name: 'UNSET', value: 12 },
      tests.sourceTargetsMap,
      tests.sourceTargetsMapCommon,
    ))
      .toEqual([]);
  });
});
