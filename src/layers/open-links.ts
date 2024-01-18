import { ToEvent } from 'karabiner.ts'
import { env } from 'node:process'
import { toChrome } from '../utils/to-chrome'
import { toSafari } from '../utils/to-safari'

const workGitHubOrg = env.WORK_GH_ORG!
const workJiraOrg = env.WORK_JIRA_ORG!
const workJiraProj = env.WORK_JIRA_PROJ!

const workJira = `https://${workJiraOrg}.atlassian.net/`
export const openLinks = {
  c: toLink('https://chat.openai.com/'),
  g: toLink('https://github.com'),
  j: toWorkLink(`${workJira}/browse/${workJiraProj}`, workJira),
  m: toLink('https://mail.google.com'),
  w: toLink('https://www.metservice.com/towns-cities/locations/auckland'), // Weather
  y: toLink('https://music.youtube.com'),
  ...workRepos(),
}

function toLink(link: string, check?: string) {
  return toSafari(link, check)
}

function toWorkLink(link: string, check?: string) {
  return toChrome(link, check)
}

function workRepos(i = 1, result: Record<string, ToEvent> = {}) {
  const repo = env[`WORK_GH_REPO_${i}`]
  if (!repo) return result

  const link = `https://github.com/${workGitHubOrg}/${repo}`
  result[i] = toWorkLink(link)
  result[i + 5] = toLink(link)
  return workRepos(i + 1, result)
}
