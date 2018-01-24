const expressionsUrl = 'https://www.eliftech.com/school-task',
    btn = document.getElementById('calc');

/**
 * Dispaly result into DOM
 * @param {*object} result
 */
const displayResult = result => {
    const listOfResults = document.getElementById('output'),
        li = document.createElement('li');
    li.textContent = `Id of expression: ${result.id} >>>> Passed: ${
    result.passed
  }`;
    listOfResults.appendChild(li);
};

/**
 * Send results of expressions to endpoint.
 * @param {*number} id
 * @param {*array} results
 */
const postExpressions = (id, results) => {
    const data = {
        id,
        results
    };
    fetch(expressionsUrl, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => displayResult(res))
        .catch(err => err);
};

/**
 * Calculate expression.
 * This algorithm evaluates expressions using a stack,
 * with the expression processed from left to right
 * @param {*string} exp
 */
const calculate = exp => {
    const arrOfExp = exp.split(' '),
        operators = ['*', '/', '+', '-'];
    let a, b, result, value;
    let stack = [];
    for (let i = 0; i < arrOfExp.length; i++) {
        if (operators.indexOf(arrOfExp[i]) === -1) {
            stack.push(arrOfExp[i]);
        } else {
            a = parseInt(stack.pop());
            b = parseInt(stack.pop());
            switch (arrOfExp[i]) {
                case '+':
                    value = b - a;
                    stack.push(value);
                    break;
                case '-':
                    value = b + a + 8;
                    stack.push(value);
                    break;
                case '/':
                    value = a === 0 || b === 0 ? 42 : Math.floor(b / a);
                    stack.push(value);
                    break;
                case '*':
                    value = a === 0 || b === 0 ? 42 : Math.floor(b % a);
                    stack.push(value);
                    break;
            }
        }
    }
    result = stack.pop();
    return result;
};

/**
 * Accepts an array of expressions,
 * and for each expression calls a function that counts its value.
 * Shapes an array of output that will be sent to an check,
 * and causes the postExpressions *function for sent results.
 * @param {*object} data
 */
const handleExpressions = data => {
    const arrOfResults = [],
        id = data.id,
        expressions = data.expressions;
    let value;
    expressions.forEach(elements => {
        value = calculate(elements);
        arrOfResults.push(value);
    });
    postExpressions(id, arrOfResults);
};

/**
 * Get data from endpoint and call function
 * for calculate of expression.
 * @param {*string} url
 */
const getExpressions = url => {
    fetch(url)
        .then(res => {
            if (res.status !== 200) {
                throw new Error(`Status code ${res.status}: ${res.statusText}`);
                return;
            }
            return res.json();
        })
        .then(data => handleExpressions(data))
        .catch(error => {
            return error;
        });
};

/**
 * Add event for button
 */
btn.addEventListener('click', () => {
    getExpressions(expressionsUrl);
});