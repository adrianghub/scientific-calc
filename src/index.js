import './style.css';

const ADDITION_ID = 'js-addition';
const BACK_ID = 'js-back';
const CLEAR_ID = 'js-clear';
const COMMA_ID = 'js-comma';
const DISPLAY_ID = 'js-display';
const DIVIDE_ID = 'js-divide';
const EQUAL_ID = 'js-equal';
const FRACTION_ID = 'js-fraction';
const INVERT_ID = 'js-invertion';
const MEMORY_ADD_ID = 'js=M+';
const MEMORY_CLEAR_ID = 'js-MC';
const MEMEORY_MINUS_ID = 'js-M-';
const MEMEORY_READ_ID = 'js-MR';
const MEMEORY_SET_ID = 'js-MS';
const MULTIPLY_ID = 'js-multiply';
const NUMBER_CLASS_SELECTOR = '.calculator__button--is-number';
const PERCENT_ID = 'js-percent';
const POWER_ID = 'js-power';
const SUBTRACTION_ID = 'js-subtraction';
const SQUARE_ID = 'js-square';

class Calculator {
    constructor() {
        this.memoryValue = 0;
        this.displayValue= '0';
        this.selectedFunction = null;
        this.isFunctionDome = false;
        this.repeatedValue = 0;
        this.wasEqualClicked = false;
        this.wasSpecialFunctionClicked = false;
    }
}

new Calculator();