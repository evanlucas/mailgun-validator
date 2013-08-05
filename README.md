# mailgun-validator

## Install

```js
  npm install mailgun-validator
```

# API

  - [Validator.validate()](#toc_1)
  - [Validator.parse()](#toc_2)

## Validator.validate(address:String, cb:Function)

  Validates the given `address 
  
  Examples:
  
```js
  mgval.validate('john.smith@gmail.com', function(err, res) {
    if (err) {
      throw err
    } else {
      console.log(res)
    }
  })
```

  
  Returns:
  
```js
  // => { 
  // =>   is_valid: true, 
  // =>   parts: { 
  // =>     local_part: 'john.smith', 
  // =>     domain: 'gmail.com',
  // =>     display_name: ''
  // =>   },
  // =>   address: 'john.smith@gmail.com',
  // =>   did_you_mean: null
  // => }
```

## Validator.parse(addresses:String|Array, syntaxOnly:Boolean, cb:Function)

  Parses the given `addresses`
  
  Example:
  
```js
  mgval.parse(['john@gmail.com', 'hello@world.com'], function(err, res) {
    if (err) {
      throw err
    } else {
      console.log(res)
    }
  })
```

  
  Returns:
  
```js
  // => {
  // =>   parsed: [
  // =>     'john@gmail.com',
  // =>     'hello@world.com'
  // =>   ],
  // =>   unparseable: []
  // => }
```

  
  Example:
  
```js
  mgval.parse(['john@gmail.com', 'hello@world.com'], false, function(err, res) {
    if (err) {
      throw err
    } else {
      console.log(res)
    }
  })
```

  
  Returns:
  
```js
  // => {
  // =>   parsed: [
  // =>     'hello@world.com'
  // =>   ],
  // =>   unparseable: [
  // =>     'john@gmail.com'
  // =>   ]
  // => }
```

