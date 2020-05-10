import "./style.css";

const ADDITION_ID = "js-addition";
const BACK_ID = "js-back";
const CLEAR_ID = "js-clear";
const COMMA_ID = "js-comma";
const DISPLAY_ID = "js-display";
const DIVIDE_ID = "js-divide";
const EQUAL_ID = "js-equal";
const FRACTION_ID = "js-fraction";
const INVERT_ID = "js-invertion";
const MEMORY_ADD_ID = "js=M+";
const MEMORY_CLEAR_ID = "js-MC";
const MEMEORY_MINUS_ID = "js-M-";
const MEMEORY_READ_ID = "js-MR";
const MEMEORY_SET_ID = "js-MS";
const MULTIPLY_ID = "js-multiply";
const NUMBER_CLASS_SELECTOR = ".calculator__button--is-number";
const NUMBER_OF_NUMBERS_IN_KEYBOARD = 10;
const PERCENT_ID = "js-percent";
const POWER_ID = "js-power";
const SUBTRACTION_ID = "js-subtraction";
const SQUARE_ID = "js-square";

class Calculator {
	constructor() {
		this.memoryValue = 0;
		this.displayValue = "0";
		this.selectedFunction = null;
        this.isFunctionDone = false;
        this.previosValue = 0;
		this.repeatedValue = 0;
		this.wasEqualClicked = false;
		this.wasSpecialFunctionClicked = false;

		this.bindToDisplay();
		this.bindToNumbers();
		this.bindToButtons();
	}

	bindToDisplay() {
		const display = document.getElementById(DISPLAY_ID);

		if (!display) {
			throw "Nie znaleziono elementu dla modułu wyświetlacza";
		}

		display.textContent = this.displayValue;
		this.display = display;
	}

	bindToNumbers() {
		const numbers = document.querySelectorAll(NUMBER_CLASS_SELECTOR);

		if (numbers.length !== NUMBER_OF_NUMBERS_IN_KEYBOARD) {
			console.warn("W klawiaturze brakuje cyfr");
		}

		numbers.forEach((number) =>
			number.addEventListener("click", (event) =>
				this.concatenateNumber(event)
			)
		);
	}

	bindToButtons() {
        const memoryClearElement = document.getElementById(MEMORY_CLEAR_ID);
        
        if(!memoryClearElement) {
            console.warn(`Nie znaleziono elementu o id ${MEMORY_CLEAR_ID}`);
        } else {
            memoryClearElement.addEventListener('click', () => this.memoryClear());
        }
        return;
	}

	concatenateNumber(event) {
		this.displayValue =
			this.displayValue === null ||
			this.displayValue === "0" ||
			this.wasSpecialFunctionClicked
				? event.target.textContent
                : this.displayValue + event.target.textContent;

        if (this.wasEqualClicked) {
            this.previosValue = 0;
            this.repeatedValue = 0;
            this.wasEqualClicked = false;
        }

        this.wasSpecialFunctionClicked = false;
        this.isFunctionDone = false;
        this.display.textContent = this.displayValue;
    }
    
    memoryClear() {
        this.wasSpecialFunctionClicked = true;
        this.memoryValue = 0;
    }
}

new Calculator();
