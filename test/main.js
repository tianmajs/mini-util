var assert = require('assert'),
	should = require('should'),
	util = require('../index');

var VARIOUS = [
	undefined,  null,        false,        0,
	'',         {},          [],           function () {},
	/^/,        new Date(),  new Error(),  new Buffer('')
];

describe('util.format', function () {
	it('should work', function () {
		util.format
			.should.equal(require('util').format,
				'alias to native util.format');
	});
});

describe('util.isArray', function () {
	it('should work', function () {
		util.isArray
			.should.equal(require('util').isArray,
				'alias to native util.isArray');
	});
});

describe('util.isBoolean', function () {
	it('should work', function () {
		VARIOUS.map(util.isBoolean)
			.should.eql([
				false,  false,  true,   false,
				false,  false,  false,  false,
				false,  false,  false,  false
			]);
			
		util.isBoolean(new Boolean(false))
			.should.equal(false, 'Boolean is not boolean');
	});
});

describe('util.isBuffer', function () {
	it('should work', function () {
		VARIOUS.map(util.isBuffer)
			.should.eql([
				false,  false,  false,  false,
				false,  false,  false,  false,
				false,  false,  false,  true
			]);
	});
});

describe('util.isDate', function () {
	it('should work', function () {
		util.isDate
			.should.equal(require('util').isDate,
				'alias to native util.isDate')
	});
});

describe('util.isError', function () {
	it('should work', function () {
		util.isError
			.should.equal(require('util').isError,
				'alias to native util.isError');
	});
});

describe('util.isFunction', function () {
	it('should work', function () {
		VARIOUS.map(util.isFunction)
			.should.eql([
				false,  false,  false,  false,
				false,  false,  false,  true,
				false,  false,  false,  false
			]);
	});
});

describe('util.isNull', function () {
	it('should work', function () {
		VARIOUS.map(util.isNull)
			.should.eql([
				false,  true,   false,  false,
				false,  false,  false,  false,
				false,  false,  false,  false
			]);
	});
});

describe('util.isNumber', function () {
	it('should work', function () {
		VARIOUS.map(util.isNumber)
			.should.eql([
				false,  false,  false,  true,
				false,  false,  false,  false,
				false,  false,  false,  false
			]);
			
		util.isNumber(new Number(0))
			.should.equal(false, 'Number is not number');
	});
});

describe('util.isObject', function () {
	it('should work', function () {
		VARIOUS.map(util.isObject)
			.should.eql([
				false,  false,  false,  false,
				false,  true,   false,  false,
				false,  false,  false,  true
			]);
	});
});

describe('util.isRegExp', function () {
	it('should work', function () {
		util.isRegExp
			.should.equal(require('util').isRegExp,
				'alias to native util.isRegExp');
	});
});

describe('util.isString', function () {
	it('should work', function () {
		VARIOUS.map(util.isString)
			.should.eql([
				false,  false,  false,  false,
				true,   false,  false,  false,
				false,  false,  false,  false
			]);
			
		util.isString(new String(''))
			.should.equal(false, 'String is not string');
	});
});

describe('util.isUndefined', function () {
	it('should work', function () {
		VARIOUS.map(util.isUndefined)
			.should.eql([
				true,   false,  false,  false,
				false,  false,  false,  false,
				false,  false,  false,  false
			]);
	});
});

describe('util.toArray', function () {
	it('should work', function () {
		var arr = (function () {
			return util.toArray(arguments);
		}(1, 2, 3));
		
		util.isArray(arr).should.equal(true);
		arr.should.eql([ 1, 2, 3 ]);
	});
});

describe('util.inherit', function () {
	it('should create a child constructor', function () {
		var Parent = function () {},
			Child = util.inherit(Parent, {});

		assert.equal(new Child() instanceof Parent, true);
	});

	it('should use the initializer', function () {
		var Child = util.inherit(Object, {
				_initialize: function (config) {
					this.config = config;
				}
			}),
			config = {};

		assert.equal(new Child(config).config, config);
	});

	it('should provide a superclass property', function () {
		var Child = util.inherit(Object, {});

		assert.equal(Child.superclass, Object.prototype);
	});

	it('should provide a extend method', function () {
		var Child = util.inherit(Object, {}),
			Grandson = Child.extend({});

		assert.equal(new Grandson() instanceof Child, true);
	});
});

describe('util.mix', function () {
	it('should mix two objects', function () {
		var foo = {
				x: 1
			},
			bar = {
				x: 2,
				y: 2
			};

		assert.equal(util.mix(foo, null, bar), foo,
			'skip null and returns the target');
		assert.equal(foo.x, 2, 'overrided');
		assert.equal(foo.y, 2, 'mixed');
	});

	it('should disable overriding', function () {
		var foo = {
				x: 1
			},
			bar = {
				x: 2,
				y: 2
			};

		assert.equal(util.mix(foo, bar, false), foo);
		assert.equal(foo.x, 1, 'not overrided');
		assert.equal(foo.y, 2);
	});
});

describe('util.merge', function () {
	it('should merge all objects into a new object', function () {
		var foo = {
				x: 1
			},
			bar = {
				x: 2,
				y: 2
			},
			obj = util.mix(foo, bar);

		assert.equal(obj.x, 2, 'overrided');
		assert.equal(obj.y, 2, 'merged');
	});

	it('should disable overriding', function () {
		var foo = {
				x: 1
			},
			bar = {
				x: 2,
				y: 2
			},
			obj = util.mix(foo, bar, false);

		assert.equal(obj.x, 1, 'not overrided');
		assert.equal(obj.y, 2);
	});
});

describe('util.each', function () {
	it('should work', function () {
		var obj = {
				x: 'x',
				y: 'y'
			};

		util.each(obj, function (value, key, o) {
			assert.equal(value, key);
			assert.equal(o, this);
		}, obj);
	});
});

describe('util.keys', function () {
	it('should work', function () {
		var obj = {
				x: 1,
				y: 2
			},
			keys = util.keys(obj);

		assert.equal(keys[0], 'x');
		assert.equal(keys[1], 'y');
	});
});

describe('util.value', function () {
	it('should work', function () {
		var obj = {
				x: 1,
				y: 2
			},
			values = util.values(obj);

		assert.equal(values[0], 1);
		assert.equal(values[1], 2);
	});
});
