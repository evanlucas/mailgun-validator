/**
 * Module dependencies
 */
var request = require('request')
  , http = require('http')
  , querystring = require('querystring')

/*!
 * Internal constructor
 *
 * @param {String} apiKey The **PUBLIC** API Key
 * @api private
 */
function Validator(apiKey) {
  this.apiKey = apiKey
  this.baseURL = 'https://api.mailgun.net/v2'
}

/**
 * Constructor
 *
 * Example:
 *
 *     var mgval = require('mailgun-validator')('<APIKEY>')
 *
 * @param {String} apiKey
 * @api public
 */
exports = module.exports = function(apiKey) {
  return new Validator(apiKey)
}

/**
 * Performs a get request
 *
 * @param {String} uri The request path
 * @param {Object} params The parameters
 * @param {Function} cb function(err, res)
 * @api private
 */
Validator.prototype.get = function(uri, params, cb) {
  var self = this
  var auth = {
      user: 'API'
    , pass: self.apiKey
  };
  
  request.get({uri: uri, qs: params, auth: auth, json: true}, function(err, resp, body) {
    if (err) return cb(err)
    return cb(null, body)
  })
}

/**
 * Validates the given `address 
 *
 * Examples:
 *
 *     mgval.validate('john.smith@gmail.com', function(err, res) {
 *       if (err) {
 *         throw err
 *       } else {
 *         console.log(res)
 *       }
 *     })
 *
 * Returns:
 *
 *     // => { 
 *     // =>   is_valid: true, 
 *     // =>   parts: { 
 *     // =>     local_part: 'john.smith', 
 *     // =>     domain: 'gmail.com',
 *     // =>     display_name: ''
 *     // =>   },
 *     // =>   address: 'john.smith@gmail.com',
 *     // =>   did_you_mean: null
 *     // => }
 *
 * @param {String} address The email address to validate
 * @param {Function} cb function(err, res)
 * @api public
 */
Validator.prototype.validate = function(address, cb) {
  var self = this
  self.get(self.baseURL+'/address/validate', {address: address}, cb)
}

/**
 * Parses the given `addresses`
 * 
 * Example:
 *
 *     mgval.parse(['john@gmail.com', 'hello@world.com'], function(err, res) {
 *       if (err) {
 *         throw err
 *       } else {
 *         console.log(res)
 *       }
 *     })
 *
 * Returns:
 *
 *     // => {
 *     // =>   parsed: [
 *     // =>     'john@gmail.com',
 *     // =>     'hello@world.com'
 *     // =>   ],
 *     // =>   unparseable: []
 *     // => }
 *
 * Example:
 *
 *     mgval.parse(['john@gmail.com', 'hello@world.com'], false, function(err, res) {
 *       if (err) {
 *         throw err
 *       } else {
 *         console.log(res)
 *       }
 *     })
 *
 * Returns:
 *
 *     // => {
 *     // =>   parsed: [
 *     // =>     'hello@world.com'
 *     // =>   ],
 *     // =>   unparseable: [
 *     // =>     'john@gmail.com'
 *     // =>   ]
 *     // => }
 *
 * @param {String|Array} addresses The email addresses to parse
 * @param {Boolean} syntaxOnly Only parse via syntax?
 * @param {Function} cb function(err, res)
 * @api public
 */
Validator.prototype.parse = function(addresses, syntaxOnly, cb) {
  var self = this
  if ('function' === typeof syntaxOnly) {
    cb = syntaxOnly
    syntaxOnly = true
  }
  if (Array.isArray(addresses)) {
    addresses = addresses.join(",")
  }
  
  self.get(self.baseURL+'/address/parse', {addresses: addresses, syntaxOnly: syntaxOnly}, cb)
}

