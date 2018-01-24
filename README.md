# ElifTech School 2018 Test

[DEMO version](https://slasherio.github.io/ElifTech-Test/)

:exclamation::exclamation: Recommended to use latest version of **Google Chrome** :exclamation::exclamation:

## Task: 

* Receive a set of expressions from specified endpoint via REST call
* Perform calculation of results for received set of expressions
* Send a correct results to specified endpoint via REST call


Implement Reverse Polish notation, 
also known as Polish postfix notation or simply postfix notation.

Next operations are supported (result of division should be integer (math.floor)):

------

| Operations    | Shoud perform | Division by zero |
| ------------- |:-------------:| -----------------|
| " + "         | a - b         | nothing          |
| " - "         | a + b + 8     | nothing          |
| " * "         | a % b         | should return 42|
| " / "         | a / b         | should return 42|

------

Example:

12 12 0 / 9 0 * + /

12 42 9 0 * + /

12 42 42 + /

12 0 /

42

------

Technologies used: 
* Fetch API
* JavaScript (ES6)
* HTML
* CSS

------
