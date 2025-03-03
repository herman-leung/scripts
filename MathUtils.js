//js 乘法函数
//调用：accMul(arg1,arg2)
//返回值：arg1乘以arg2的精确结果
function accMul(arg1, arg2) {
  let m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try {
    m += s1.split('.')[1].length;
  } catch (e) { }
  try {
    m += s2.split('.')[1].length;
  } catch (e) { }
  return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m);
}


//js 除法函数
//调用：accDiv(arg1,arg2)
//返回值：arg1除以arg2的精确结果
function accDiv(arg1, arg2) {
  let t1 = 0,
    t2 = 0,
    r1,
    r2;
  try {
    t1 = arg1.toString().split('.')[1].length;
  } catch (e) { }
  try {
    t2 = arg2.toString().split('.')[1].length;
  } catch (e) { }
  r1 = Number(arg1.toString().replace('.', ''));
  r2 = Number(arg2.toString().replace('.', ''));
  return (r1 / r2) * Math.pow(10, t2 - t1);
}

//js 加法计算
//调用：accAdd(arg1,arg2)
//返回值：arg1加arg2的精确结果
function accAdd(arg1, arg2) {
  let r1, r2, m;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return ((arg1 * m + arg2 * m) / m).toFixed(2);
}

const result = accMul(3.9, 100)

const items = [
  {
    number: 1,
    price: 120,
  },
  {
    number: 1,
    price: 150
  },
  {
    number: 1,
    price: 120
  }
]

// let total = 0;
// items.map((item) => {
//   // total += item.price / 100 * item.number;
//   let itemRefundFee =  accMul(
//     accDiv(item.price, 100)
//     , item.number);

//   total = accAdd(total, itemRefundFee )
// })
// console.log(result, total)

let result2 = accMul(19.92, 100)
console.log('19.92 * 100 =', result2)


function deepCopy0(obj) {
  let copy;
  // Handle the 3 simple types, and null or undefined
  if (null === obj || "object" != typeof obj) return obj;
  // Handle Date
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }
  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = deepCopy(obj[i]);
    }
    return copy;
  }
  // Handle Object
  if (obj instanceof Object) {
    copy = {};
    for (let attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = deepCopy(obj[attr]);
    }
    return copy;
  }
  throw new Error("Unable to copy obj! Its type isn't supported.");
}
function deepCopy(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== "object") return obj;

  // 检查循环引用
  if (hash.has(obj)) return hash.get(obj);

  // 处理 Date
  if (obj instanceof Date) {
    return new Date(obj);
  }

  // 处理 RegExp
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }

  // 处理 Array
  if (Array.isArray(obj)) {
    const arrCopy = [];
    hash.set(obj, arrCopy);
    obj.forEach((item, index) => {
      arrCopy[index] = deepCopy(item, hash);
    });
    return arrCopy;
  }

  // 处理 Map
  if (obj instanceof Map) {
    const mapCopy = new Map();
    hash.set(obj, mapCopy);
    obj.forEach((value, key) => {
      mapCopy.set(key, deepCopy(value, hash));
    });
    return mapCopy;
  }

  // 处理 Set
  if (obj instanceof Set) {
    const setCopy = new Set();
    hash.set(obj, setCopy);
    obj.forEach(value => {
      setCopy.add(deepCopy(value, hash));
    });
    return setCopy;
  }

  // 处理普通对象并保持原型链
  const objCopy = Object.create(Object.getPrototypeOf(obj));
  hash.set(obj, objCopy);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      objCopy[key] = deepCopy(obj[key], hash);
    }
  }

  return objCopy;
}


let a = {
  a: 1,
  b:2,
  c: {
    d: 3,
    e: 4
  },
  d: new Date(),
  f: [1, 2, 3],
  c: Symbol('test')
}

// b = deepCopy(a)
// a.a = 2;
// a.c.d = 4;
// a.d.setFullYear(2021)
// a.f.push(4)
// console.log('a', a)
// console.log('b', b)


function runTests() {
  // 普通对象测试
  const obj = { a: 1, b: { c: 2 } };
  const objCopy = deepCopy(obj);
  console.assert(obj !== objCopy, "浅拷贝错误：普通对象");
  console.assert(obj.b !== objCopy.b && obj.b.c === objCopy.b.c, "深拷贝错误：嵌套对象");

  // 数组测试
  const arr = [1, [2, 3], { a: 4 }];
  const arrCopy = deepCopy(arr);
  console.assert(arr !== arrCopy, "浅拷贝错误：数组");
  console.assert(arr[1] !== arrCopy[1] && arr[1][0] === arrCopy[1][0], "深拷贝错误：嵌套数组");
  console.assert(arr[2] !== arrCopy[2] && arr[2].a === arrCopy[2].a, "深拷贝错误：数组中的对象");

  // 日期测试
  const date = new Date();
  const dateCopy = deepCopy(date);
  console.assert(date !== dateCopy && date.getTime() === dateCopy.getTime(), "深拷贝错误：日期对象");

  // 正则表达式测试
  const regExp = /abc/i;
  const regExpCopy = deepCopy(regExp);
  console.assert(regExp !== regExpCopy && regExp.source === regExpCopy.source && regExp.flags === regExpCopy.flags, "深拷贝错误：正则表达式");

  // Map 测试
  const map = new Map();
  map.set("a", 1);
  const mapCopy = deepCopy(map);
  console.assert(map !== mapCopy && map.get("a") === mapCopy.get("a"), "深拷贝错误：Map 对象");

  // Set 测试
  const set = new Set();
  set.add(1);
  const setCopy = deepCopy(set);
  console.assert(set !== setCopy && set.has(1) === setCopy.has(1), "深拷贝错误：Set 对象");

  // 循环引用测试
  const circularObj = { a: 1 };
  circularObj.self = circularObj;
  const circularCopy = deepCopy(circularObj);
  console.assert(circularCopy !== circularObj && circularCopy.self === circularCopy, "深拷贝错误：循环引用");

  console.log("所有测试通过！");
}

// 运行测试
runTests();
