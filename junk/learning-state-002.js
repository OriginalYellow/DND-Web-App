// EXAMPLE IMPLIMENTATION OF STATE MONAD

// example copied from https://stackoverflow.com/a/33828590

function chain(mv, mf) {
  return function (state) {
    var r = mv(state);
    return mf(r.value)(r.state);
  };
}

function of(x) {
  return function (state) {
    return {value: x, state: state};
  };
}

function push(element) {
  return function (stack) {
    return of(null)(stack.concat([element]));
  };
}

function pop() {
  return function (stack) {
    return of(stack[stack.length - 1])(stack.slice(0, -1));
  };
}

function runStack(seq, stack) { return seq(stack); }
function evalStack(seq, stack) { return seq(stack).value; }
function execStack(seq, stack) { return seq(stack).state; }
function add(x, y) { return x + y; }

// stateful computation is not completely evaluated (lazy evaluation)
// no state variables are passed around
var computation = chain(pop(), function (x) {
  if (x < 4) {
    return chain(push(4), function () {
      return chain(push(5), function () {
        return chain(pop(), function (y) {
          return of(add(x, y));
        });
      });
    });
  } else {
    return chain(pop(), function (y) {
      return of(add(x, y));
    });
  }
});

var stack1 = [1, 2, 3],
  stack2 = [1, 4, 5];

console.log(runStack(computation, stack1)); // Object {value: 8, state: Array[3]}
console.log(runStack(computation, stack2)); // Object {value: 9, state: Array[1]}

// the return values of the stateful computations
console.log(evalStack(computation, stack1)); // 8
console.log(evalStack(computation, stack2)); // 9

// the shared state within the computation has changed
console.log(execStack(computation, stack1)); // [1, 2, 4]
console.log(execStack(computation, stack2)); // [1]

// no globale state has changed
cosole.log(stack1); // [1, 2, 3]
cosole.log(stack2); // [1, 4, 5]