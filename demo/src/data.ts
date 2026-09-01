export type Friend = {
  slug: string
  name: string
  role: string
  note: string
}

export type EventItem = {
  slug: string
  name: string
  when: string
  note: string
}

export type Place = {
  slug: string
  name: string
  region: string
  note: string
  hiddenByDefault?: boolean
}

export const friends: Friend[] = [
  { slug: 'alice', name: 'Alice', role: 'Scout', note: 'Walks the ridge before anyone else is awake.' },
  { slug: 'frank', name: 'Frank', role: 'Cartographer', note: 'Keeps a pencil behind his ear and a spare in his sock.' },
  { slug: 'jane', name: 'Jane', role: 'Namesmith', note: 'Gives every switchback a title it can live up to.' },
  { slug: 'matt', name: 'Matt', role: 'Counter', note: 'Counts crumbs so the rest of us do not have to.' },
]

export const events: EventItem[] = [
  { slug: 'dance', name: 'Dance', when: 'Friday dusk', note: 'Boots off at the door. Lanterns on the barn beam.' },
  { slug: 'cookout', name: 'Cookout', when: 'Sunday noon', note: 'Bring a pan and a story. Leave with both smoked.' },
]

export const places: Place[] = [
  { slug: 'mexico', name: 'Mexico', region: 'South', note: 'A long descent and a market that opens at first light.' },
  { slug: 'china', name: 'China', region: 'East', note: 'Stone steps, tea houses, and a trail that keeps climbing.' },
  {
    slug: 'overlook',
    name: 'Overlook',
    region: 'Draft',
    note: 'Not on the public map yet. Toggle it into the trail below.',
    hiddenByDefault: true,
  },
]

export function findFriend(slug: string | undefined) {
  return friends.find((item) => item.slug === slug)
}

export function findEvent(slug: string | undefined) {
  return events.find((item) => item.slug === slug)
}

export function findPlace(slug: string | undefined) {
  return places.find((item) => item.slug === slug)
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
