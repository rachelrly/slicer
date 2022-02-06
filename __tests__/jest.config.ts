import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  verbose: false,
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  }
}
export default config
