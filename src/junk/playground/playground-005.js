/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-properties */
/* eslint-disable no-unused-vars */

import lensMap from 'ramda-lens-map';
import * as R from 'ramda';
import * as L from 'partial.lenses';
import {
  Observable, interval, timer, Subject, generate,
} from 'rxjs';
import { take } from 'rxjs/operators';
import { sep } from 'path';
import * as U from '../util';

/**   .-.     .-.     .-.     .-.     .-.     .-.     .-.
 `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.' */

// figuring out rxjs observables

// NOTE: obervables are "push" systems because the observable function (some
// "initial" function, wrapped by an observable) calls .next on the observer
// .subscribe) - in a "pull" system, the final function would call the initial
// function like with a generator or normal function call. if the
// observable-wrapped function doesn't have any async stuff in it, each .next
// call that you put in there will be called syncronously...just like you'd
// expect; any subscriber-wrapped functions will be called after each .next
// call.

// NOTE: the above demonstrates that observerables are not promises or
// event-emitters, they are just a simple pattern for designing a function.

const observable = Observable.create((observer) => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  setTimeout(() => {
    observer.next(4);
    observer.complete();
  }, 1000);
});

// console.log('just before subscribe');
observable.subscribe({
  next: (x) => { /* console.log(`got value ${x}`); */ },
  error: (err) => { /* console.error(`something wrong occurred: ${err}`); */ },
  complete: () => { /* console.log('done'); */ },
});
// console.log('just after subscribe');

const foo = Observable.create((observer) => {
  // console.log('Hello');
  observer.next(42);
  observer.next(84);
});

foo.subscribe((x) => {
  // console.log(x);
});
foo.subscribe((y) => {
  // console.log(y);
});

const numbers = interval(1000);

const takeFourNumbers = numbers.pipe(take(4));

// takeFourNumbers.subscribe(U.log('next:'));

const numbers2 = timer(0, 1000);
// const subscription = numbers.subscribe(U.log('timer test:'));

// setTimeout(_ => subscription.unsubscribe(), 6500);

// const observable1 = interval(400);
// const observable2 = interval(300);

// const subscription = observable1.subscribe(U.log('first:'));
// const childSubscription = observable2.subscribe(U.log('second'));

// // you can "combine" subscriptions together for convenience with .add (there is
// // also .remove)

// subscription.add(childSubscription);

// setTimeout(() => {
//   // Unsubscribes BOTH subscription and childSubscription
//   subscription.unsubscribe();
// }, 1000);

/**   .-.     .-.     .-.     .-.     .-.     .-.     .-.
 `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.' */

// figuring out rxjs "subjects" - the equivalent of event emitters

const subject = new Subject();

subject.subscribe({
  next: U.log('observerA:'),
});
subject.subscribe({
  next: U.log('observerB:'),
});

subject.next(1);
subject.next(2);

/**   .-.     .-.     .-.     .-.     .-.     .-.     .-.
 `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.' */

// figuring out rxjs schedulers

const obs = generate(
  0,
  () => true,
  x => x + 1,
  x => x,
);

obs; // ?
