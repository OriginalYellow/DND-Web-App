// GENERAL PROGRAMMING CONCEPTS + SOME JAVASCRIPT:

// (def) Language: a langauge is anything with a "vocabulary" (a set of specific
// symbols that can have meaning on their own and/or when used in combination
// with other symbols) and a "grammar" (a set of rules for how to combine
// vocabulary to imply different meanings). Linguistically, programming
// langauges (like C++ or Javascript) are more similar to spoken languages (like
// English or Chinese), than they are to the language of mathematics.

// (def) Abstraction: All langauges are systems of abstraction. Abstractions are
// simpler or macro-level representations of more complex or micro-level
// concepts. If i were to tell you that it is "cold outside", you would need to
// know what "cold" and "outside" meant to be able to use that information for
// anything (you might interpret it as a warning and decide to wear a jacket
// before going outside). But abstractions can be interpreted differently based
// on who is doing the interpreting. Maybe you are used to a cold climate, so
// your definition of "cold" is different than mine.

// More on abstraction: abstractions help save us time when speaking english
// because they let us use shortcuts like the word "cold" - we don't need to
// explain the concept of cold if we can trust that the interpreter has assigned
// the same concept to the same label. They also allow shortcuts in that we
// don't have to actually know what "cold" is ourselves in order to send the
// "it's cold outside" message to someone else who does know what it means. The
// messager doesn't need to understand the message. The raw information of "it's
// cold outside" can be stored on a piece of paper with the same text on it, and
// you wouldn't say that the piece of paper knows what "cold" means - it's just
// a dumb piece of paper :(

// Key difference between a programming language and a spoken language: Spoken
// languages are fuzzy and leave room for artistic or subjective interpretation.
// Talking to a computer with a programming langauge is like talking to someone
// in english where if they aren't 100 percent sure of what you mean, they will
// immediately tell you and refuse to process what you just said until you
// clarify it. While they wait for the clarification they will usually plug
// their ears and shout "lalala!", refusing to hear anything else you have to
// say. Now you know why autists love programmming.

// (def) Programming Language: a language for writing instructions for a machine
// to follow. It follows that a program written in a particular programming
// language is an abstraction for the actual physical instructions that the
// programmer wants the machine to carry out. 

// More on programming languages: Note that machines don't always need to
// recieve data and give back some data (like a calulator) - they can have more
// physical outputs (like a robotic arm that you can program to move blocks
// around a room). But almost all machines must be able to understand the
// instructions of the typical user whether they be a human being or another
// machine. Even an off-on switch for something like a rice cooker is a form of
// abstraction that both the human and the machine can uderstand. And even if
// your rice cooker turns on automatically when you plug it in and turns off
// automatically when the rice is done, there is still a level of abstraction
// there because you don't need to know how the rice cooker works, just that
// when you plug it in it knows you want some cooked rice, and you both have the
// same concept for what "cooked rice" means. If your rice cooker thinks that
// "cooked rice" means "burnt rice" though, you've got a problem.

// (def) Low-level Programming Langauges/Machine Code: Unlike high-level
// programming langauges, machine code has a vocabulary and grammar that can
// describe machine instructions in the highest detail possible. Any detail that
// it may fail to explain can be represented by an abstract concept in the
// language and then expanded into its lower-level details as necessary by the
// hardware itself. This is why you would say that machine code "runs directly"
// on hardware.

// More on low-level programming languages and machine code: machine code is
// called a "low-level" language because it has a low level of abstraction -
// meaning not much abstraction. If you were to write some machine code that
// found the square root of a number minus 5, for example, one line of that code
// might read something like "change the second bit from 1 to 0 in memory
// address #3234321 on processor #4's L2 Cache". Note that "changing a bit"
// could mean to physically send a certain amount of current to a certain wire
// that will change the charge of the fucking molecular compounds in a
// transistor somewhere. So it follows that machine code is a way of
// communicating in very hardware-specific terms and is technically all you
// need to write a computer program. But you would probably prefer to type
// something that is more similar to english, like "what is the the square root
// of a number minus 5?" - thats where high-level programming languages come in.

// (def) High-level Programming Languages: a more human-readable language than
// machine code which cannot run "natively" on hardware (see "Native") but is
// typically translated into machine code by a program called a "compiler" (see
// "Compiler").

// (def) Native: the code written in a certain programming langauge is "native"
// if the environment (see "Environment") it is running in doesn't need anything
// or much more than anything extra in order to run it.

// (def) Javascript: often is abbreviated to just "JS". A high-level programming
// language that was literally made by one guy in a week. It is the only
// programming language that can run natively in a web browser, but JS is also
// commonly run natively without a web browser using a very popular server (see
// "Server") called "Node" (we will be running our javascript in the browser for
// now). Most people have a very love-hate relationship with JS, but you will
// learn to love it!

// (def) Compiler: the program that turns your code into something that can be
// run natively in a given environment (see "Environment").

// examples of different JS compilers and the environments they compile to:
// - V8: the V8 engine is the javascript engine that Chrome and Node uses to
//   compile javascript code into machine code. It is called an "engine" because
//   it does more than just compile - it also optimizes your code so that it
//   will run faster than it normally would. This compiler runs when we load our
//   javascript into a browser and run it.
// - Babel: babel is a compiler that you feed javascript and then spits out
//   modified javascript. It lets you use newer javascript features in browser
//   environments that may not have them already. Some would call Babel
//   "precompiler" and not a compiler because its not quite the same as your
//   regular everyday type of compiler (like the V8 engine compiler)

// a simplified pipeline that explains what happens to our project's JS code
// (how it is compiled) before the instructions we described in our code are are
// actually run:

// 1. we type some JS code into a text editor and save it as a file with the
//    extension ".js"
// 2. we start Babel and give it the file we made, and it won't get mad because
//    we gave it a ".js" file like it expected
// 3. Babel changes the JS code so that it is safe to run in older browsers, but
//    note that the code will still be JS after this step so we can't actually
//    run it yet
// 4. we load the code into a browser like Chrome, where it will be compiled by
//    the V8 engine into machine code and finally run

// (def) Environment: the program that your code essentially "plugs into" to
// make a complete program. The actual process of plugging in is different for
// each environment and compiler.

// examples of different environments:
// - a web browser: JS code running in a web browser will have special variables
//   available to it for manipulating HTML, making requests over a network, etc.
// - node: JS code running on a node server doesn't have access to any web
//   browser stuff, but, unlike in the browser environment, it does have access
//   to the local file system so it can read and write data from the computers
//   hard drive
// - the C++ runtime for your OS of choice: if you want to run C++ on a computer
//   you need to install the correct "runtime" program for that computer's OS.
//   Yes, even the coolest and most hardcore langauge known to man needs a bit
//   of code to "plug into" before it can do anything. C++ code running on
//   windows will have access to the same exact stuff as JS code running on a
//   windows version of node (because node is actually written in C++, and if
//   that confuses you just forget that you ever read it and move on).
// - the embedded system on some calculator from the 80s: this nameless model of
//   calculator from the 80s that I've just made up runs machine code just like
//   every other computer ever made. It probably runs that machine code within
//   an "embedded system" - the basic codebase of machine code that all
//   programmable hardware needs to be programmable - similar to a C++ runtime
//   (mentioned above) but with less C++ and more machine code

// (def) Server: any program that runs on a computer with the expectation by
// "clients" (see "Client") that it will always be available to use. Note that
// when a URL doesn't "work" people would commonly say that the website is
// "broken" - specifically, the agreement/contract that the server will always
// be able to receive URLs and send back a webpage has been broken. Someone may
// have just bumped into the server and hit the power button by accident, but
// from the user's perfective, an "off" server is the same as a "broken" server.

// (def) Client: any program that can send inputs and recieve outputs from a
// server - a web browser is the most common example of a client



// PRIMITIVE VALUES:

// (def) Value: a unit of data - can be textual (a "string"), numeric (a "number"), or
// more complex like a list (an "array")

// (def) Primitive value: the types of values that are considered simple. Includes
// strings, booleans, and numbers

// (def) Number: a type of primitive value that represents a number

// examples of numbers:

// a whole number:
5
// a number with a decimal point (also called a "floating point" number):
45.3
// an arbitraily large floating point number with a large amount of decimal places:
939090.3929394848
// a negative number:
-3

// (def) Boolean: a type of primitive value that represents two states - true and
// false

// examples of primitive boolean values:
true
false

// (def) String: a type of primitive value that represents some text
// conceptually, a string is an "ordered set" of characters (like "a",
// "x", "3", "*", "ü", "仮", etc.)

// (def) Set: a term in number theory that basically means any group of
// "countable" stuff

// (def) Countable: a term in number theory that basically means "anything that
// can be counted". For example, if you looked at a pile of 5 apples you could
// go "1 apple, 2 apples...5 apples" and have counted up the total number of
// apples. But if you looked at a big bag that said "apples" on it, you wouldn't
// know for sure how many apples are in that bag and so could not count them. So
// the apples in the first example are "countable" and the apples in the second
// are not "countable".

// (def) Ordered Set: a type of set where each thing in the set can be sorted
// into an arbitrary but specific order. For example, you may want to sort your
// apples by size and you do so, but then one apple is exactly the same size as
// another and so you flip a coin to decide which should go before the other.
// But then (oh no!) you put the apples back in the bag and forget what order
// you put them in, and because you have OCD and don't want such a tragedy to
// ever befall you again, you decide to order them again but write "1", "2", "3"
// on the apples so you'll can't mix them up later. Your final solution to the
// problem ended up being to create an ordered set!

// examples of strings:

// you can use double quotes to tell the compiler that the text 'michael' should
// be interpreted as a string

"michael"

// you can also use single quotes, but you should choose either double quotes or
// single and stick with it for consistency (your code will be easier for you to
// read)
'michael'

// notes on primitive values:
// - primitive values don't really do anything on their own, much like how many
//   of the words in the english language don't mean much divorced from context.
//   But when you put them together while following a certain grammar, the
//   possible meanings are expanded. In english we commonly used the grammatical
//   concept of "sentences" and "punctuation" to combine words in this way. In
//   programming, the analogous grammatical concepts are "statements" and
//   "operators";



// STATEMENTS:

// (def) Statement: any segment of code that can be interpreted as a complete
// instruction by the compiler. The majority of the code in a real project will
// be comprised of statements. If you type a single primitive value on a line
// and nothing else on that same line, that line will be interpreted as a
// statement - an instruction to "return" that value.

// examples of statements:
"michael" // immediately returns the string value <"michael">
5 // immediately returns the number value <5>
true // immediately returns the boolean value <true>
5 + 3 // immediately returns the number value <8>

// examples of things that aren't statements: 

// the compiler will see what looks like a single primitive value alone on a
// line and attempt to turn the line into a statement, but it's too stupid to
// guess that you meant to type a string. It won't be able figure out what you
// really meant because you broke its very specific grammar rules - you can't
// type a <"> without typing another <"> afterwards. But at least it will inform
// you by printing out an error message that tells you what you may have done
// wrong:

// the compiler will print an error like <SyntaxError: Unterminated string
// constant>:

// "michael 

// The compiler will print another error because you broke another grammar rule
// - you can't put two primitive values right next to each other on the same
// line (fun fact - I initially thought this would work and not throw an error,
// but then I tested it!):

// the compiler will print an error like <SyntaxError: Unexpected token>:

// "michael" "joseph"

// because the above grammar rule is true for all primitive values and not just
// strings, this also throws the same error:

// 5 8

// semicolons and statements:

// you can give the compiler (and yourself - this will make code easier for you
// to read) a hint that it should try to form a statement by terminating your
// satements with a semicolon. The compiler is extremely anal and particular
// about what you give it so consistenly using semicolons lets you avoid common
// errors. FROM THIS POINT ON, THE EXAMPLES WILL USE SEMICOLINS TO TERMINATE
// STATEMENTS:

// immediately returns the boolean value <true>:
true; 



// OPERATORS:

// (def) Operator: a special symbol, used much like how punctuation or verbs are in a
// spoken language, that must be combined with a value according to the grammar
// rules to form a statement

// examples of operators:

// Mathematic Operators (can be combined with number values to make up a
// statement that returns a number value):

// add:
// + 
// subtract:
// - 
// divide - will shave off the remainder from the result:
// / 
// multiply:
// *
// modulo - same as divide but instead of shaving off the remainder, the whole
// number part of the value is shaved off which leaves just the remainder:
// % 

// String Operators (can be combined with string values to make up a statement
// that evaluates to a string value)

// concatinate (glues two strings together to make a new "concatinated" string):
// +

// Relational/Conditional operators (can be combined with either boolean values
// or number values to make up a statement that evaluates to a boolean value)

// equal:
// ===
// not equal:
// !==



// COMBINING OPERATORS AND PRIMITIVE VALUES:

// the compiler is smart enough to take context into account, just like an
// english speaker can understand how the order of words in a sentence modifies
// the meaning of the sentence. An english speaker can look ahead once it reads
// one complete "word" to see that there is punctuation after it and the word
// should be interpreted differently - if you were reading the text "hello!" you
// would shout the word "hello" because you looked ahead to see that the
// exclamation point changes its meaning. 

// examples of combining mathematical operators and primitive number values: 

// Note: most mathematical operators follow a grammar rule (also called a
// "notation") where they must have a value or a statement that returns a value
// on either side of the operator in order to form a full satement themselves.
// The flanking values and/or statements are then called "operands" because they
// work together with the operator to form a statement

// forms a statement that returns the number value <-1>
4 - 5;
// forms a statement that returns the number value <9>
4 + 5;
// forms a statement that returns the number value <0> (see division operator
// details above if you are confused)
4 / 5;
// forms a statement that returns the number value <1> (see division operator
// details above if you are confused)
5 / 4; 
// forms a statement that returns the number value <9> (the compiler usually
// doesn't care whether or not you put a space between the operator and
// operands, but including the space will make your code easier to read)
4+5;

// examples of other combinations of primitive values and operators:

// Note: most other operators follow the that same notation for mathematical
// operators mentioned above:

// forms a statement that returns the boolean value <false>
4 === 5; 
// forms a statement that returns the boolean value <true>
4 !== 5;
// forms a statement that returns the boolean value <true>
"michael" === "michael";
// forms a statement that returns the string value <"michaeljoseph">
"michael" + "joseph";



// INTRODUCTION TO COMPLEX STATEMENTS:

// You can also put multiple statements on the same line and combine multiple
// statements to make a single statement. in the following example, the compiler
// will do what it normally does when it sees something like <4 + 3> and turn it
// into a statement that returns the number value <7>. It will then see the next
// <+> operator and, because it previously identified a value-returning statement,
// it will interpret that statement as the first operand, and the <5> as the
// second operand. It can then interpret the entire line as a statement which
// returns 12:
4 + 3 + 5; 

// with mathematic operators, normal mathematic order of operations is followed
// and the compiler will decide which statement should evaluated first based on
// that:

// <3 * 5> is evaluated first, so the entire line will return <19>
4 + 3 * 5; 

// so you don't have to worry about order of operations, I like to use
// parentheses:

// Note: parentheses are not really operators because they don't do much alone
// and are mainly used to modify how other operators are interpreted - that
// being said, they still have their own grammatical rules/notation.

// <4 + 3> is evaulated first, so the entire line will return <35>
(4 + 3) * 5; 

// conditional/relational operators behave in the same way as mathematical
// operators and have their own order of operations. I (and 99 percent of other
// javascript programmers) don't even know what the order of operations is so I
// always just use paretheses.

// <4 === 4> evaluates to true, so the entire line will evaluate to true:
(4 === 4) !== false;

// you can use multiple string operators in the same way as the others:

// the entire line will evaluate to <"michael robert joseph">
"michael" + " " + "robert" + " " + "joseph";



// VARIABLES AND STATE:

// (def) Variable: the complex value type in programming languages that
// represents a labeled value. A variable consists of two parts: a "name" (its
// label) and a "value". Because programming languages represent the concept of
// "a labeled value" as a "variable", that enables the derived, higher-order
// concept of "state" to be represented in your program as well.

// (def) State: the part of a program that is expected to change over the entire
// lifecycle of the application (from when you start it to when it stops
// running). The state of a program is often tied to user input, environment, or
// timers, because state often models those concepts in such a way that the
// program can reckon with them, and the values of your variables which
// represent these concepts can change depending on forces outside of the
// programs control - "user input" depends on whatever the user decides to
// input; "environment" depends on where the code is running; "timers" depend on
// the current time.

// Advanced notes on variables: 
// - Just like with a spoken language, words can change meaning over time just
//   as variables can change meaning over time. But it's easier to change the
//   meaning of a "word" in programming and harder to do so in english - you
//   can't change the meaning of an existing word without letting every other
//   english speaker know, which takes a long time as the new definition spreads
//   and people get used to it. The same issue is actually still present in
//   programming langauges but it's easier to manage (see
//   https://stackoverflow.com/questions/9208091/the-difference-between-deprecated-depreciated-and-obsolete).



// VARIABLE NOTATION:

// (def) Keyword: a "keyword" is essentially an operator but it is denoted by an
// entire literal word (like "var", "if", "else", etc.). During your own
// research, you'll never see keywords grouped under the same category as
// operators, but they serve the same general purpose: they must be combined
// with values in order to create a complete statement that the compiler can
// understand. 

// The notation for "declaring" (see below) a variable requires that you use the
// special keyword <var>. Unlike the operators that we have seen previously, the
// "var" keyword only requires a single operand - the label or name that you
// want to give that variable.

// (def) Declaration: Remember that the definition of "statement" is something
// that the compiler can turn into a full instruction or set of instructions for
// the machine to follow. You can instruct the computer to do a lot of different
// things with varaibles, but at first we will be looking at a "declaration
// statement", which is made up of the <var> keyword followed by the name that
// you want to give your variable:

// forms a statement that makes a variable with the name "coolVariable" available to
// any code that executes afterwards:
var coolVariable; 

// (def) Assignment: once you have declared a variable, that variable won't have a
// value until you combine it with an "assigment operator" (<=>) and a value to
// assign:
coolVariable = 4;
// now the variable has both a name (<coolVariable>) and a value (the number
// value <4>)

// evaluates to the number value <4>
coolVariable;

// you can now use "coolVariable" as you would any other number value:

// evaluates to <9>
coolVariable + 5;

// and you can reassign it later with another assigment statement:
coolVariable = 20;
// evaluates to the value <20>
coolVariable;

// you can also combine the assignment statements with other statments to form
// more complex assignment statements:
coolVariable = 20 + 8;
// evaluates to the value <28>
coolVariable



// INTRODUCTION TO FUNCTIONS:

// Anatomy of a function:

// - <function> is the keyword that tells the compiler that whatever comes next
//   should follow the function notation or else it won't be interpreted
//   correctly.
// - <coolFunction> is the label or name that we want to give the function
// - <(a, b)> is the list of variables or "arguments" (see
//   "Arguments/Parameters") that this function declares (so this is the
//   equivalent of a declaration statement) and will only be available to the
//   statements in the "function body" (see "Function Body")
// - the statements in the curly braces (<{}>) will be evaluated whenever the
//   function is "called" (see "Calling")
// - the <return> in the last body statement is a keyword that is part of the
//   function notation. It can only be used in a function body and tells the
//   compiler that whatever comes next is the functions "output". So in this
//   case, the output is whatever is stored in the variable <c>
function coolFunction(a, b) {
  var c = a + b;
  return c;
}

// inputs (arguments/parameters) are optional:
function coolFunctionWithoutInputs() {
  var c = 1 + 2;
  return c;
}

// the output is also optional:
function coolFunctionWithoutInputsOrOutputs() {
  var c = 1 + 2;
}
// note: coolFunctionWithoutInputsOrOutputs basically does nothing

// (def) Function: a function consists of three key parts, not including
// notational elements: a set of one or more statements which make up the
// "function body" (see "Function body"); a label/name for the function (works
// just like a variable name); and an optional set of inputs and/or outputs (see
// "Arguments/Parameters").

// Note: you may have realized by now that the concept of "labels" is very
// powerful in programming because it enables whatever the labeled entity is to
// referred back to by only its label. Functional notation allows you to assign
// a label to one or more statements and then, for example, if you needed to
// evaluate those statements twice, you could just type the label twice. And if
// you needed to evaluate them 1000 times well...you'd still need to type out
// the label a thousand times and that would be annoying but we'll get to that
// later.

// (def) Function Body: the part of the function's notation that denotes what
// statements are evaluated when the function is "called" (see "Anatomy of a
// function" above for notation details)

// (def) Calling: you can use the notational element of parethesis in
// combination with a function to "call" that function. The "call" is an
// instruction to the machine to evaluate whatever statements are inside of the
// function's body and return whatever value follows after the "return" keyword:

// evaluates to the number value <3> because of the statment "<return c>" inside
// of <coolFunctionWithoutInputs>'s body
coolFunctionWithoutInputs()

// (def) Parameters/Arguments: There is a difference between "parameter" and
// "argument" but they both basically mean the same thing. The parameter list of
// a function is a list of one or more variable names that represent the inputs
// to that function. To understand how they work, look at the following examples:

function coolFunctionWithoutParameters() {
  var a;
  var b;
  var a = 1;
  var b = 2;
  return a + b;
}

// this:
coolFunctionWithoutParameters();

function coolFunctionWithParameters(a, b) {
  return a + b;
}

// will return the same value as this (<3>):
coolFunctionWithParameters(1, 2);

// (def) Passing: if you include a value or set of values in the notation for
// calling a function (as in the second of the above two examples), they will be
// assigned to the variables declared in the parameter list of the function.
// This type of value-to-variable assignment is called "passing" - the values of
// <1> and <2> are "passed into" the function as the parameters <a> and <b>.
// This is the primary way that functions are able to recieve input from the
// world outside of their function bodies.
