import validator from 'validator';
import Enums from './Enums';

const isString = function (stringValue) {
    return typeof stringValue === 'string';
}
const validateEnum = function (obj) {
    let isValid = false;
    Object.keys(Enums).forEach(function (key) {
        if((Enums[key])[obj]){
            isValid = true;
            return;
        }
        
    });

    return isValid;
}

module.exports = function (args, parameters) {

    let errorMessage = '';
    let isValid = true;
    if (typeof args === 'undefined') {
        args = {};
    }
    Object.keys(args).forEach(function (key) {
        const val = args[key];
        const parameterOptions = parameters[key];
        

        if (parameterOptions) {
            if (parameterOptions.isMandatory && !val) {
                isValid = false;
                errorMessage = 'Mandatory argument is missing:' + key;
                return;

            }

            if (parameterOptions.type && parameterOptions.type === 'ENUM') {

                if (!validateEnum(val)) {
                    isValid = false;
                    errorMessage = 'Enum doesnt exist:' + key + '/' + val;
                    return;
                }

            }

            if (parameterOptions.type && parameterOptions.type === 'STRING') {

                if (!isString(val)) {
                    isValid = false;
                    errorMessage = 'Value is not string:' + key + '/' + val;
                    return;
                }

            }

            if (parameterOptions.type && parameterOptions.type === 'DECIMAL') {

                if (!validator.isDecimal(val)) {
                    isValid = false;
                    errorMessage = 'Value is not decimal:' + key + '/' + val;
                    return;
                }

            }

            if (parameterOptions.type && parameterOptions.type === 'INT' || parameterOptions.type === 'LONG') {

                if (!validator.isInt(val+'')) {
                    isValid = false;
                    errorMessage = 'Value is not int:' + key + '/' + val;
                    return;
                }

            }
        }

    });

    if(!isValid) {
        console.error(errorMessage);
    }
    return isValid;
};