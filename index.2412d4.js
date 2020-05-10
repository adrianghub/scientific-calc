/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_0__);


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
        this.attachFunctionToButton(SQUARE_ID, () => this.square());
        this.attachFunctionToButton(POWER_ID, () => this.power());
        this.attachFunctionToButton(FRACTION_ID, () => this.oneXth());
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

    square() {
        this.callSpecialFunction(Math.sqrt(this.displayValue))
    }

    power() {
        this.callSpecialFunction(this.displayValue ** 2)
    }

    oneXth() {
        this.callSpecialFunction(1 / this.displayValue)
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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"calculator":"calculator","calculator__main-part-container":"calculator__main-part-container","calculator__history-container":"calculator__history-container","calculator__display":"calculator__display","calculator__memory-container":"calculator__memory-container","calculator__memory-button":"calculator__memory-button","calculator__buttons-container":"calculator__buttons-container","calculator__button":"calculator__button","calculator__button--is-lighter":"calculator__button--is-lighter"};

/***/ })
/******/ ]);