// Funtion to force classes implement their parents class interface


function getClassMethods(cls) {
  return Object.getOwnPropertyNames(cls.prototype)
      .filter(prop => typeof cls.prototype[prop] === 'function' && prop !== 'constructor');
}

const enforceContract = (obj, classAsInterface) => {
    // the arg obj is the class that extends the classAsInterface
    const classMethods = getClassMethods(classAsInterface);
    console.log(classMethods[0], "here")
    const prototypeMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(obj)).filter(
      (method) => method !== 'constructor'
    );
  
    // Check that all methods in domainInterface are implemented in the prototype chain
    for (let i = 0; i < classMethods.length; i++) {
      if (!prototypeMethods.includes(classMethods[i])) {
        console.log(classMethods[i], "here")
        throw new Error(`Method '${classMethods[i]}' is missing in the class implementation.`);
      }
      if (typeof obj[classMethods[i]] !== 'function') {
        throw new Error(`'${classMethods[i]}' should be a function.`);
      }
    }

    // Check if there are any extra methods in the prototype that are not in domainInterface
    for (let method of prototypeMethods) {
      if (!classMethods.includes(method)) {
        throw new Error(`'${method}' is not part of the expected interface.`);
      }
    }
  };
  module.exports = enforceContract