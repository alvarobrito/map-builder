/**
 * Instaces provider
 */

const instances = {};

/**
 * get - Gets the instance from a name of it
 *
 * @param {string} key with name of instance
 *
 * @return {object} selected instance
 */
function get(key) {
  return instances[key];
}

/**
 * add - * get - Gets the instance from a name of it
 *
 * @param {string}  key      with name of instance
 * @param {type}    instance was be created
 *
 * @return {object} itself instance
 */
function add(key, instance) {
  if (!instances.hasOwnProperty(key)) {
    instances[key] = instance;
  }
  return instance;
}

export default { get, add };
