import * as ProjectBoard from 'models/beta/projectBoard';
import { operands } from 'libs/beta/constants';

describe('ProjectBoard model', () => {
  describe('hasSearch', () => {
    const validKeyWords = ['foo','bar','lorem ipsum'];
    const invalidKeyWords = ['', null, undefined, false];

    validKeyWords.forEach(keyWord => {
      describe(`when keyword is ${keyWord}`, () => {
        const projectBoard = {
          search: { keyWord }
        };

        it('returns truthy', () => {
          expect(ProjectBoard.hasSearch(projectBoard)).toBeTruthy();
        });
      });
    });

    invalidKeyWords.forEach(keyWord => {
      describe(`when keyword is ${keyWord}`, () => {
        const projectBoard = {
          search: { keyWord }
        };

        it('returns falsy', () => {
          expect(ProjectBoard.hasSearch(projectBoard)).toBeFalsy();
        });
      });
    });
  });

  describe('validSearch', () => {
    const validKeyWords = ['foo','bar','lorem ipsum'];
    const invalidKeyWords = ['', '   ', '']

    validKeyWords.forEach(keyWord => {
      describe(`when keyword is ${keyWord}`, () => {
        it('returns truthy', () => {
          expect(ProjectBoard.validSearch(keyWord)).toBeTruthy();
        });
      });
    });

    invalidKeyWords.forEach(keyWord => {
      describe(`when keyword is ${keyWord}`, () => {
        it('returns falsy', () => {
          expect(ProjectBoard.validSearch(keyWord)).toBeFalsy();
        });
      });
    });
  });

  describe('isOperandSearch', () => {
    const words = ['foo','bar','lorem'];

    Object.keys(operands).forEach(operandKey => {
      words.forEach(word => {
        describe("when search keyword has ':'", () => {
          describe(`and includes '${operandKey}'`, () => {
            it('returns truphy', () => {
              const keyWord = `${operandKey}:${word}`;

              expect(ProjectBoard.isOperandSearch(keyWord)).toBeTruthy();
            });
          });
        });

        describe("when search keyword has not ':'", () => {
          describe(`and includes '${operandKey}'`, () => {
            it('returns falsy', () => {
              const keyWord = `${operandKey}${word}`;

              expect(ProjectBoard.isOperandSearch(operandKey)).toBeFalsy();
            });
          });
        });
      });
    });
  });

  describe('serializeKeyWordSearch', () => {
    const words = ['foo','bar','lorem'];

    Object.keys(operands).forEach(operandKey => {
      words.forEach(word => {
        describe(`when keyword is ${operandKey}:${word}`, () => {
          it(`returns '${operands[operandKey]}:${word}'`, () => {
            const keyWord = `${operandKey}:${word}`;

            expect(ProjectBoard.serializeKeyWordSearch(keyWord)).toEqual(`${operands[operandKey]}:${word}`);
          });
        });

        describe(`when keyword is ${operandKey}${word}`, () => {
          it(`returns ${operandKey}${word}`, () => {
            const keyWord = `${operandKey}${word}`;

            expect(ProjectBoard.serializeKeyWordSearch(keyWord)).toEqual(keyWord);
          });
        });
      });
    });
  });
});
