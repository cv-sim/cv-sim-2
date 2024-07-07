import mechanisms from '@/constants/mechanisms'
import conventions from '@/constants/conventions'
import species from '@/constants/species'

const GAS_CONSTANT = 8.314
const FARADAY_CONSTANT = 96485

const DEFAULT_DISTANCE_INCREMENTS = 50
const DEFAULT_TIME_INCREMENTS = 200

function clamp(value, min, max) {
  if (value > max) return max
  if (value < min) return min

  return value
}

export function calculateCyclicVoltammogram(parameters, options = {}) {
  const { elCount, diffCoef, kStd, kFirstOrder, kSecondOrder, transCoef, area, temp, viscosity } =
    parameters

  const scanRate = parameters.scanRate / 1000
  const vStd = parameters.vStd / 1000
  const vUpper = parameters.vUpper / 1000
  const vLower = parameters.vLower / 1000
  const cStart = parameters.cStart / 1000
  const rotation = parameters.rotation * (Math.PI / 30)

  const {
    xCount = DEFAULT_DISTANCE_INCREMENTS,
    tCount = DEFAULT_TIME_INCREMENTS,
    order = mechanisms.E,
    convention = conventions.US,
    species: selectedSpecies = species.OXIDIZED
  } = options

  const isOxidized = selectedSpecies === species.OXIDIZED
  const vStart = isOxidized ? vUpper : vLower
  const vSwitch = isOxidized ? vLower : vUpper

  let vRange = vSwitch - vStart
  const vInc = vRange / (tCount / 2)

  const tTotal = Math.abs((2 * vRange) / scanRate)
  const tInc = tTotal / tCount

  const xTotal = 6 * Math.sqrt(diffCoef * tTotal)
  const xInc = xTotal / xCount

  const lambda = (diffCoef * tInc) / xInc ** 2

  const dataset = Array(tCount + 1)
    .fill(0)
    .map(() => ({ x: 0, y: 0 }))
  const times = []
  const coxArray = Array(tCount + 1).fill(Array(xCount).fill(0))
  const credArray = Array(tCount + 1).fill(Array(xCount).fill(0))
  const crednrArray = Array(tCount + 1).fill(Array(xCount).fill(0))
  const cprodArray = Array(tCount + 1).fill(Array(xCount).fill(0))

  for (let i = 0; i <= tCount; i++) {
    times.push(i * tInc)
    const tHalf = tCount / 2
    const v = i <= tHalf ? vStart + i * vInc : vSwitch - (i - tHalf) * vInc
    dataset[i].x = v

    const kDenom = GAS_CONSTANT * temp
    const kf = kStd * Math.exp((-1 * transCoef * elCount * FARADAY_CONSTANT * (v - vStd)) / kDenom)
    const kb = kStd * Math.exp(((1 - transCoef) * elCount * FARADAY_CONSTANT * (v - vStd)) / kDenom)

    for (let j = xCount - 1; j >= 0; j--) {
      if (i === 0 || j === xCount - 1) {
        const startOxidized = selectedSpecies === species.OXIDIZED
        coxArray[i][j] = startOxidized ? cStart : 0
        credArray[i][j] = startOxidized ? 0 : cStart
        crednrArray[i][j] = 0
      } else if (j === 0) {
        const joxNum = kb * credArray[i][1] - kf * coxArray[i][1]
        const joxDenom = 1 + ((kf + kb) * xInc) / diffCoef
        const jox = joxNum / joxDenom
        const jred = -jox

        dataset[i].y =
          -jox * elCount * FARADAY_CONSTANT * area * (convention === conventions.US ? 1 : -1)

        coxArray[i][j] = coxArray[i][1] + (jox * xInc) / diffCoef
        credArray[i][j] = credArray[i][1] + (jred * xInc) / diffCoef
        crednrArray[i][j] = credArray[i][j]
      } else {
        const calcC = (array, order = null) => {
          const denom =
            1 -
            0.51 *
              Math.sqrt((rotation ** 3 * diffCoef * tTotal) / viscosity) *
              (j / Math.sqrt(diffCoef * lambda))

          const jAdjRaw = j / denom
          const rightMul = jAdjRaw - Math.floor(jAdjRaw)
          const leftMul = 1 - rightMul
          const jAdj = clamp(Math.floor(jAdjRaw), 1, xCount - 3)

          const c = leftMul * array[i - 1][jAdj] + rightMul * array[i - 1][jAdj + 1]
          const cl = leftMul * array[i - 1][jAdj - 1] + rightMul * array[i - 1][jAdj]
          const cr = leftMul * array[i - 1][jAdj + 1] + rightMul * array[i - 1][jAdj + 2]

          let cNew = c + lambda * (cl - 2 * c + cr)
          if (order === mechanisms.EC) {
            cNew -= kFirstOrder * tInc * c
          } else if (order === mechanisms.EC2) {
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

  return { dataset, times }
}
