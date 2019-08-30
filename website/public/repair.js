/**
 * These properties are subject to the override mistake
 * and must be converted before freezing.
 */

const REPAIR_ONE = true;
const REPAIR_ALL = '*';

const dataPropertiesToRepair = {
  anonIntrinsics: {

  },
  namedIntrinsics: {
    // 19 Fundamental Objects

    Object: {
      prototype: REPAIR_ALL,
    },

    Function: {
      prototype: REPAIR_ALL
    },
    // Function: {
    //   prototype: {
    //     name: REPAIR_ONE,
    //     toString: REPAIR_ONE,
    //   }
    // },

    Error: {
      prototype: {
        name: REPAIR_ONE,
        message: REPAIR_ONE,
      },
    },

    // 22 Indexed Collections

    Array: {
      prototype: REPAIR_ALL,
    },
  },
};

// *****

function makeRepairDataProperties() {

  // Object.defineProperty is allowed to fail silently,
  // use Object.defineProperties instead.

  const {
    defineProperties,
    getOwnPropertyDescriptor,
    getOwnPropertyDescriptors,
    hasOwnProperty,
  } = Object;
  const { ownKeys } = Reflect;

  /**
   * For a special set of properties (defined below), it ensures that the
   * effect of freezing does not suppress the ability to override these
   * properties on derived objects by simple assignment.
   *
   * Because of lack of sufficient foresight at the time, ES5 unfortunately
   * specified that a simple assignment to a non-existent property must fail if
   * it would override a non-writable data property of the same name. (In
   * retrospect, this was a mistake, but it is now too late and we must live
   * with the consequences.) As a result, simply freezing an object to make it
   * tamper proof has the unfortunate side effect of breaking previously correct
   * code that is considered to have followed JS best practices, if this
   * previous code used assignment to override.
   *
   * To work around this mistake, deepFreeze(), prior to freezing, replaces
   * selected configurable own data properties with accessor properties which
   * simulate what we should have specified -- that assignments to derived
   * objects succeed if otherwise possible.
   */
  function enableDerivedOverride(obj, prop, desc) {
    if ('value' in desc && desc.configurable) {
      const { value } = desc;

      // eslint-disable-next-line no-inner-declarations
      function getter() {
        return value;
      }

      // Re-attach the data property on the object so
      // it can be found by the deep-freeze traversal process.
      getter.value = value;

      // eslint-disable-next-line no-inner-declarations
      function setter(newValue) {
        if (obj === this) {
          throw new TypeError(
            `Cannot assign to read only property '${prop}' of object '${obj}'`,
          );
        }
        if (hasOwnProperty.call(this, prop)) {
          this[prop] = newValue;
        } else {
          defineProperties(this, {[prop]: {
            value: newValue,
            writable: true,
            enumerable: desc.enumerable,
            configurable: desc.configurable,
          }});
        }
      }

      defineProperties(obj, {[prop]: {
        get: getter,
        set: setter,
        enumerable: desc.enumerable,
        configurable: desc.configurable,
      }});
    }
  }

  function repairOne(obj, prop) {
    const desc = getOwnPropertyDescriptor(obj, prop);
    if (!desc) {
      return;
    }
    enableDerivedOverride(obj, prop, desc);
  }

  function repairAll(obj) {
    const descs = getOwnPropertyDescriptors(obj);
    if (!descs) {
      return;
    }
    ownKeys(descs).forEach(prop =>
      enableDerivedOverride(obj, prop, descs[prop]),
    );
  }

  function walkRepairPlan(obj, plan) {
    ownKeys(plan).forEach(prop => {
      const subPlan = plan[prop];
      const subObj = obj[prop];
      switch(subPlan) {

        case REPAIR_ONE: 
        repairOne(obj, prop);
        break;

        case REPAIR_ALL: 
        repairAll(subObj);
        break;

        default:
        walkRepairPlan(subObj, subPlan);
      }
    });
  }

  function repairDataProperties(intrinsics, repairPlan) {
    if (!repairPlan) {
      return;
    }
    walkRepairPlan(intrinsics, repairPlan);
  }

  return repairDataProperties;
}

console.profile();
makeRepairDataProperties()({namedIntrinsics: window}, dataPropertiesToRepair);
console.profileEnd();
