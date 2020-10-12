
export class Http {
    static HEADERS = { 'Content-Type': 'application/json' }
  
    static async get(url) {
      try {
        return await request(url, 'GET')
      } catch (e) {
        console.log(e)
        throw e
      }
    }
}