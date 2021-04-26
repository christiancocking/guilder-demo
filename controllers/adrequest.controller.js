'use strict'

const { axiosAdapter } = require("../lib/axiosAdapter");
const AD_UNIT = '/6062/guilder_test/native_test'
const SIZE = '300x250'
const SEARCH_QUERY = 'sneakers'
const NUMBER_ADS = 3
const URL = 'www.target.com'
const SOFTCODE = `https://pubads.g.doubleclick.net/gampad/adx?iu=${AD_UNIT}&sz=${SIZE}&native_version=3&native_templates=1&commerce_version=1&commerce_query=${SEARCH_QUERY}&num_ads=${NUMBER_ADS}&url=${URL}&ss_req=1&ip=${req.socket.remoteConnection}`

const HARDCODE = 'https://securepubads.g.doubleclick.net/gampad/adx?iu=6062/guilder_test/native_test&sz=1234x1234&native_version=3&native_templates=1&cmrv=1&cmrids=1234567!7887603&url=www.martvanburen.com&ss_req=1&ip=168.212.226.204&debug_experiment_id=44736864&adtest=on'

async function requestAd (req, res, next) {

    const axiosConfig = {
        method: "GET",
        url: `https://pubads.g.doubleclick.net/gampad/adx?iu=${AD_UNIT}&sz=${SIZE}&native_version=3&native_templates=1&commerce_version=1&commerce_query=${SEARCH_QUERY}&num_ads=${NUMBER_ADS}&url=${URL}&ss_req=1&ip=168.212.226.204`,
    };

    try {
        
        let result = await axiosAdapter(axiosConfig);

        console.log(axiosConfig);
        res.send(result);
    } catch (error) {
        
    }

}

module.exports={requestAd}