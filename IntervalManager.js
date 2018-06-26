import {refreshTime} from "../base/BaseStyle";

let mAutoRefresh = null
let mAutoMap = new Map()

export const initInterval = () => {
    if (mAutoRefresh) {
        clearInterval(mAutoRefresh)
    }
    mAutoRefresh = setInterval(()=>{
        try {
            if (mAutoMap.has('QCurrencyView') && mAutoMap.get('QCurrencyView').judge()) {
                mAutoMap.get('QCurrencyView').callback()
            }  else if (mAutoMap.has('QExchangeView') && mAutoMap.get('QExchangeView').judge()) {
                mAutoMap.get('QExchangeView').callback()
            } else if (mAutoMap.has('OptionalSingleView') && mAutoMap.get('OptionalSingleView').judge()) {
                mAutoMap.get('OptionalSingleView').callback()
            } else if (mAutoMap.has('QGlobalView') && mAutoMap.get('QGlobalView').judge()) {
                mAutoMap.get('QGlobalView').callback()
            }
        } catch (e) {
            console.warn('IntervalManager initInterval error')
        }
    },refreshTime)
}

export const clearAutoRefresh = () => {
    if (mAutoRefresh) {
        clearInterval(mAutoRefresh)
    }
}

export const setAutoRefreshCallBack = (key,judgeFC,callback) => {
    if (judgeFC != null && callback != null) {
        mAutoMap.set(key,{
            judge: judgeFC,
            callback: callback,
        })
    }
}