/**
 * This function is used to generate a random number
 * using 'size' parameter
 * 
 * @param {number} size 
 */
function random(size) {
  let final = []
  for (let i = 0; i < size; i++) {
    final.push(Math.floor(Math.random() * 10))
  }
  return final.join('')
}

module.exports = random