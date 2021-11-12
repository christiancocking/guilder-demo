const AD_URL = 'https://securepubads.g.doubleclick.net/gampad/adx?native_version=3&native_templates=1&commerce_version=1&ss_req=1&jrv=1&cmrv=1&ptt=19&adtest=on&deb=c2'

class Request {  
  constructor(request, queryParams) {
    this.url = new URL(AD_URL)

    for (const [key, value] of Object.entries(queryParams)) {
      console.log(key, value);
      this.url.searchParams.append(key, value)
    }

    var ip = request.header('x-forwarded-for') || request.connection.remoteAddress;

    this.url.searchParams.append('ip', ip.split(',').shift())
    this.url.searchParams.append('url', request.get('host') + request.originalUrl)
    this.url.searchParams.append('c', Math.floor(Math.random() * Math.floor(99999999999)))
  }

  get_url() {
    return this.url.href
  }
}

class Response {
  /*
    Ad response will be in the below format:
      {
        "ads": [
          {
            "product_id": "1234567"
            "tracking_urls": {
              "click_url": "https://www.google.com/click"
            }
            "rendering_data": "WzAsMTIsYWJjXQ"
          },
          {
            // possibly additional products
          }
        ]
      }
  */
  constructor(response) {
    this.response = response;
    this.ads = [];
  }

  parse() {
    var that = this;
    this.response.ads.forEach(function(response, index){
      var ad = new Ad(response.product_id, response.tracking_urls, response.rendering_data)
      that.ads.push(ad)
    });
  }
}

class Ad {
  constructor(product_id, tracking_urls, rendering_data) {
    this.tracking_urls = tracking_urls || {click_url:['']}
    this.product_id = product_id
    this.click_url = this.tracking_urls.click_url[0]
    this.impression_url = this.tracking_urls.impression_url
    this.rendering_data = rendering_data
  }
}

class Renderer {
  constructor(res) {
    this.res = res
  }

  set_response_values(ad) {
    this.res.locals.rendering_data_id = ad.rendering_data;
    this.res.locals.product_id = ad.product_id
    this.res.locals.click_url = ad.click_url
  }
}

module.exports = {Request, Response, Renderer}