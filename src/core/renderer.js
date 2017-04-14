/**
 * DOM renderer
 */

/**
 * render - Renders element inside of a target
 *
 * @param {HTMLElement}         elem   DOM element to be added
 * @param {string|HTMLElement}  target where DOM element weill be included
 *
 * @return {type} Description
 */
function render(elem, target) {
  const $target = typeof target === 'string' ? document.querySelector(target) : target;
  $target.appendChild(elem);

  return $target;
}

export default { render };
