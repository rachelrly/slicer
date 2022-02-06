import type { Config } from '@jest/types'
// Sync object
const config: Config.InitialOptions = {
  verbose: false,
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  }
}
export default config
