import "./style.css";

const ADDITION_ID = "js-addition";
const BACK_ID = "js-back";
const CLEAR_ID = "js-clear";
const CANCEL_ID = "js-cancel";
const COMMA_ID = "js-comma";
const DISPLAY_ID = "js-display";
const DIVIDE_ID = "js-divide";
const EQUAL_ID = "js-equal";
const FRACTION_ID = "js-fraction";
const INVERT_ID = "js-invertion";
const MEMORY_ADD_ID = "js-M+";
const MEMORY_CLEAR_ID = "js-MC";
const MEMORY_MINUS_ID = "js-M-";
const MEMORY_READ_ID = "js-MR";
const MEMORY_SET_ID = "js-MS";
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
		this.previousValue = 0;
		this.repeatedValue = 0;
		this.wasEqualClicked = false;
		this.wasSpecialFunctionClicked = false;

		this.attachToDisplay();
		this.attachToNumbers();
		this.attachToButtons();
	}

	attachToDisplay() {
		const display = document.getElementById(DISPLAY_ID);

		if (!display) {
			throw "Nie znaleziono elementu dla modułu wyświetlacza";
		}

		display.textContent = this.displayValue;
		this.display = display;
	}

	attachToNumbers() {
		const numbers = document.querySelectorAll(NUMBER_CLASS_SELECTOR);

		if (numbers.length !== NUMBER_OF_NUMBERS_IN_KEYBOARD) {
			console.warn("W klawiaturze brakuje cyfr. Może pojawic się problem z poprawnym działaniem kalkulatora.");
		}

		numbers.forEach((number) =>
			number.addEventListener("click", (event) =>
				this.concatenateNumber(event)
			)
		);
	}

	attachToButtons() {
		this.attachFunctionToButton(MEMORY_CLEAR_ID, () => this.memoryClear());
		this.attachFunctionToButton(MEMORY_READ_ID, () => this.memoryRead());
		this.attachFunctionToButton(MEMORY_ADD_ID, () => this.memoryAdd());
		this.attachFunctionToButton(MEMORY_MINUS_ID, () => this.memoryMinus());
		this.attachFunctionToButton(MEMORY_SET_ID, () => this.memorySet());
		this.attachFunctionToButton(CLEAR_ID, () => this.clear());
		this.attachFunctionToButton(CANCEL_ID, () => this.cancel());
		this.attachFunctionToButton(ADDITION_ID, () => this.addition());
		this.attachFunctionToButton(SUBTRACTION_ID, () => this.subtraction());
		this.attachFunctionToButton(MULTIPLY_ID, () => this.multiplication());
		this.attachFunctionToButton(DIVIDE_ID, () => this.division());
		this.attachFunctionToButton(EQUAL_ID, () => this.equal());
		this.attachFunctionToButton(BACK_ID, () => this.back());
        this.attachFunctionToButton(INVERT_ID, () => this.invertNumber());
        this.attachFunctionToButton(COMMA_ID, () => this.addComma());
        this.attachFunctionToButton(PERCENT_ID, () => this.percent());
	}

	attachFunctionToButton(elementId, callback) {
		const element = document.getElementById(elementId);

		if (!elementId) {
			console.warn(`Nie znaleziono elementu o id ${elementId}`);
			return;
		}
		element.addEventListener("click", () => callback());
	}

	concatenateNumber(event) {
		this.displayValue =
			this.displayValue === null ||
			this.displayValue === "0" ||
			this.wasSpecialFunctionClicked
				? event.target.textContent
				: this.displayValue + event.target.textContent;

		if (this.wasEqualClicked) {
			this.previousValue = 0;
			this.repeatedValue = 0;
			this.wasEqualClicked = false;
		}

        this.isFunctionDone = false;
		this.wasSpecialFunctionClicked = false;
		this.display.textContent = this.displayValue;
	}

	memoryClear() {
		this.wasSpecialFunctionClicked = true;
		this.memoryValue = 0;
	}

	memoryRead() {
		this.wasSpecialFunctionClicked = true;
		this.changeDisplayValue(this.memoryValue);
	}

	memoryAdd() {
		this.wasSpecialFunctionClicked = true;
		this.memoryValue = this.memoryValue + Number(this.displayValue);
	}

	memoryMinus() {
		this.wasSpecialFunctionClicked = true;
		this.memoryValue = this.memoryValue - Number(this.displayValue);
	}

	memorySet() {
		this.wasSpecialFunctionClicked = true;
		this.memoryValue = Number(this.displayValue);
	}

	clear() {
		this.previousValue = null;
		this.selectedFunction = null;
		this.changeDisplayValue(null);
	}

	cancel() {
		this.changeDisplayValue(null);
	}

	addition(hasRepeatedValue) {
		this.callPreviousFunctionAndChangeIt(this.addition, hasRepeatedValue);

		if (this.isFunctionDone) {
			this.handleSecondClickOnFunction();
			return;
		}

		const [displayValue, previousValue] = this.getValuesToCalculations(
			hasRepeatedValue
		);
		const newValue = displayValue + previousValue;

		this.getRepeatedValue(hasRepeatedValue, newValue);

		this.afterNewValueCalculation(newValue);
	}

	subtraction(hasRepeatedValue) {
		this.callPreviousFunctionAndChangeIt(
			this.subtraction,
			hasRepeatedValue
		);

		if (this.isFunctionDone) {
            this.handleSecondClickOnFunction();
            
			return;
		}

		const [displayValue, previousValue] = this.getValuesToCalculations(
			hasRepeatedValue
		);
		let newValue;

		if (this.previousValue !== null) {
			newValue = hasRepeatedValue
				? displayValue - this.repeatedValue
				: previousValue - displayValue;

			this.repeatedValue = this.getRepeatedValue(hasRepeatedValue, newValue);
		}

		this.afterNewValueCalculation(newValue);
	}

	multiplication(hasRepeatedValue) {
		this.callPreviousFunctionAndChangeIt(
			this.multiplication,
			hasRepeatedValue
		);

		if (this.isFunctionDone) {
			this.handleSecondClickOnFunction();
			return;
		}

		const [displayValue, previousValue] = this.getValuesToCalculations(
			hasRepeatedValue
		);
		const newValue = displayValue * previousValue;

		this.repeatedValue = this.getRepeatedValue(hasRepeatedValue, newValue);
		this.afterNewValueCalculation(newValue);
	}

	division(hasRepeatedValue) {
		this.callPreviousFunctionAndChangeIt(this.division, hasRepeatedValue);

		if (this.isFunctionDone) {
			this.handleSecondClickOnFunction();
			return;
		}

		const [displayValue, previousValue] = this.getValuesToCalculations(
			hasRepeatedValue
		);
		const newValue = hasRepeatedValue
			? displayValue / this.repeatedValue
			: previousValue === 0
                ? displayValue

                    : previousValue / displayValue;
        this.repeatedValue = this.getRepeatedValue(hasRepeatedValue, newValue);
		this.afterNewValueCalculation(newValue);
	}

	equal() {
		this.isFunctionDone = false;
		if (!this.wasEqualClicked) {
			this.selectedFunction(false);
		} else {
			this.selectedFunction(true);
		}

		this.wasEqualClicked = true;
    }
    

	back() {
		this.changeDisplayValue(
			this.displayValue ? this.displayValue.slice(0, -1) : null
		);
	}

	invertNumber() {
		this.changeDisplayValue(
			this.displayValue >= 0
				? -Math.abs(this.displayValue)
				: Math.abs(this.displayValue)
		);
	}

	addComma() {
		if (!this.display.textContent.includes(".")) {
			this.changeDisplayValue(
				`${this.displayValue ? this.displayValue : "0"}.`
			);
		}
    }
    
    percent() {
        this.callSpecialFunction(this.previousValue * this.displayValue / 100);
    }

    callSpecialFunction(value) {
        this.wasSpecialFunctionClicked = false;
        this.wasSpecialFunctionClicked = true;
        this.changeDisplayValue(value);
    }

	callPreviousFunctionAndChangeIt(previousFunction, hasRepeatedValue) {
		if (
			this.selectedFunction !== previousFunction &&
			this.selectedFunction
		) {
			this.selectedFunction(hasRepeatedValue);
		}
		this.selectedFunction = previousFunction;
	}

	handleSecondClickOnFunction() {
		this.repeatedValue = this.getRepeatedValue(null, this.previousValue);
		this.displayValue = "0";
		this.wasEqualClicked = false;
	}
    
    afterNewValueCalculation(newValue) {
		this.isFunctionDone = true;
		this.wasEqualClicked = false;
		this.displayValue = null;
		this.display.textContent =
			this.previousValue !== null ? newValue : this.display.textContent;
		this.previousValue =
			this.previousValue !== null ? newValue : this.display.textContent;
    }

	getRepeatedValue(hasRepeatedValue, newValue) {
        if (hasRepeatedValue === null ) {
            return Number(newValue);
        }

        return hasRepeatedValue ? this.repeatedValue : this.wasEqualClicked ? newValue : Number(this.display.textContent);
	}

    getValuesToCalculations(hasRepetedValue) {
        const displayValue = Number(this.display.textContent);
        const previousValue = hasRepetedValue ? this.repeatedValue : Number(this.previousValue);

        return [displayValue, previousValue];
    }

	changeDisplayValue(value) {
		const isNoValue = value === null || value === "";

		this.displayValue = isNoValue ? null : value.toString();
		this.display.textContent = isNoValue ? "0" : value.toString();
	}
}

new Calculator();
