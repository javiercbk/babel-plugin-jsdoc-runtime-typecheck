# Changelog

## 1.2.0
### Features
* Changed behavior of record validation. Now it doesn't throw error in this case:
    ```javascript
    /**
     * @param {{a: Number, b: Number}} record
     * @returns {Number}
     */
    function test(record) {
        return record.a + record.b;
    }
      
    test({ a: 1, b: 2, c: 3 });
    ```

### Other
* Refactored comment finder;
* Refactored function validator;
* Minor performance increase.

## 1.1.5
### Bugfix
* Fixed parsing and validation error for nested parameters

## 1.1.4
### Features
* New error message
```
Uncaught TypeError:
    Parameter "data" in function "myFunction" has wrong type.
    Expected: {Object}
    Current:  "[1, 2, 3]"
```

### Bugfix
* Fixed constructor validation.
* Fixed performance of comment searching.
* Fixed performance of comment parsing.


## 1.1.2
### Bugfix
* Fixed adding double check to class method in some cases
* Fixed exception on return with type "any" in strict mode

## 1.1.1
### Features
* Added parsing for multiline Object definition:
```javascript
/**
 * @param {Object} data
 * @param {Number} data.id
 * @param {String} data.name
 * @param {Number} data.status
 */

//equals to 

/**
 * @param {{id: Number, name: String, status: Number}} data
 */
```
    
### Bugfix
* Fixed integration problem with class method parsing after es2015 transformation.
* Added polyfill for es2015 features, now it's fully compatible with Node < `6.0.0`.

### Other
* Added integration tests with es2015 preset.
* Added a lot of smoke tests.
* Increased performance.
* Added Travis CI build on commit.


## 1.1.0

### Features
* Added strict mode - now plugin throw compilation exception when it can find error by static analyze.
    * Flag - `useStrict: true` (default - false), add it to config.
    * Throw exception, when arguments/returns aren't equal to jsDoc.
    
### Bugfix
* Fixed a lot of cases of wrong parsing of arguments and return.
* Fixed bug, when assertion doesn't adds to empty return.
* Fixed crashes on empty files with directive.

### Other
* Global refactoring - better code style, easy to read.
* Added a lot of tests, increased stability of library.
