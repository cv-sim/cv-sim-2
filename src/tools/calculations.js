/**
 * @typedef InputParameters
 * @param {Number} scanRate
 * @param {Number} vStd
 */

const GAS_CONSTANT = 8.314
const FARADAY_CONSTANT = 96485

const DEFAULT_DISTANCE_INCREMENTS = 50
const DEFAULT_TIME_INCREMENTS = 200

export function calculateCyclicVoltammogram(parameters, options = {}) {
  const { elCount, diffCoef, kStd, kFirstOrder, kSecondOrder, transCoef, area, temp } = parameters

  const scanRate = parameters.scanRate / 1000
  const vStd = parameters.vStd / 1000
  const vStart = parameters.vStart / 1000
  const vSwitch = parameters.vSwitch / 1000
  const cStart = parameters.cStart / 1000

  const {
    xCount = DEFAULT_DISTANCE_INCREMENTS,
    tCount = DEFAULT_TIME_INCREMENTS,
    order = null
  } = options

  const vRange = vSwitch - vStart
  const vInc = vRange / (tCount / 2)

  const tTotal = Math.abs((2 * vRange) / scanRate)
  const tInc = tTotal / tCount

  const xTotal = 6 * Math.sqrt(diffCoef * tTotal)
  const xInc = xTotal / xCount

  const lambda = (diffCoef * tInc) / xInc ** 2

  const dataset = Array(tCount + 1)
    .fill(0)
    .map(() => ({ x: 0, y: 0 }))
  const coxArray = Array(tCount + 1).fill(Array(xCount).fill(0))
  const credArray = Array(tCount + 1).fill(Array(xCount).fill(0))
  const crednrArray = Array(tCount + 1).fill(Array(xCount).fill(0))
  const cprodArray = Array(tCount + 1).fill(Array(xCount).fill(0))

  for (let i = 0; i <= tCount; i++) {
    const tHalf = tCount / 2
    const v = i <= tHalf ? vStart + i * vInc : vSwitch - (i - tHalf) * vInc
    dataset[i].x = v

    const kDenom = GAS_CONSTANT * temp
    const kf = kStd * Math.exp((-1 * transCoef * elCount * FARADAY_CONSTANT * (v - vStd)) / kDenom)
    const kb = kStd * Math.exp(((1 - transCoef) * elCount * FARADAY_CONSTANT * (v - vStd)) / kDenom)

    for (let j = xCount - 1; j >= 0; j--) {
      if (i === 0 || j === xCount - 1) {
        coxArray[i][j] = cStart
        credArray[i][j] = crednrArray[i][j] = 0
      } else if (j === 0) {
        const joxNum = kb * credArray[i][1] - kf * coxArray[i][1]
        const joxDenom = 1 + ((kf + kb) * xInc) / diffCoef
        const jox = joxNum / joxDenom
        const jred = -jox

        dataset[i].y = -jox * elCount * FARADAY_CONSTANT * area

        coxArray[i][j] = coxArray[i][1] + (jox * xInc) / diffCoef
        credArray[i][j] = credArray[i][1] + (jred * xInc) / diffCoef
        crednrArray[i][j] = credArray[i][j]
      } else {
        const calcC = (array, order = null) => {
          const c = array[i - 1][j]
          const cl = array[i - 1][j - 1]
          const cr = array[i - 1][j + 1]

          let cNew = c + lambda * (cl - 2 * c + cr)
          if (Number(order) === 1) {
            cNew -= kFirstOrder * tInc * c
          } else if (Number(order) === 2) {
            cNew -= 2 * kSecondOrder * tInc * c ** 2
          }

          return cNew
        }

        const cred = calcC(credArray, order)
        const crednr = calcC(crednrArray)

        coxArray[i][j] = calcC(coxArray)
        credArray[i][j] = cred
        crednrArray[i][j] = crednr
        cprodArray[i][j] = crednr - cred
      }
    }
  }

  return dataset
}
