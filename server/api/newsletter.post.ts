export default defineEventHandler(async (event) => {
  return proxyRequest(event, 'https://newsletter.infomaniak.com/v3/api/1/newsletters/webforms/23661/submit')
})
