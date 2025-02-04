export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-02-03'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const token = assertValue(
  "skeDQKNUVuGYoCnDTZJsHB91YSQ4lA61HbiWOESshyT3b7wi4coMZFI3s2CFEaSbRSASNuakfVHBpc60Bz0R29ifLao4MQwUgGnsW4ZJyxYs3J6Wst87t04ksROU9erRFZ96ugopqby1gK5KzPMGDeBlwDfSrrBS3phX3QYrFPQQglJG52nB",
  'Missing environment variable: NEXT_API_TOKEN'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
