import { toArc } from '../utils/to-arc'

const workGitHubOrg = process.env['WORK_GH_ORG']
const workJiraOrg = process.env['WORK_JIRA_ORG']
const workJiraProj = process.env['WORK_JIRA_PROJ']

export const openLinks = {
  w: toArc('https://www.metservice.com/towns-cities/locations/auckland'), // Weather
  g: toArc('https://github.com/evan-liu/karabiner.ts'),
  j: toArc(`https://${workJiraOrg}.atlassian.net/browse/${workJiraProj}`),
  c: toArc('https://chat.openai.com/'),
  m: toArc('https://mail.google.com'),
}

let i = 1
while (process.env[`WORK_GH_REPO_${i}`]) {
  const repo = process.env[`WORK_GH_REPO_${i}`]
  Object.assign(openLinks, {
    [i]: toArc(`https://github.com/${workGitHubOrg}/${repo}`),
  })
  i++
}
