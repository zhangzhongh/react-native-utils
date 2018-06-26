import Toast from 'react-native-root-toast'
import {Dimensions, Platform} from "react-native";
import {getString} from "../base/constants/I18n";
import {errDataMask} from "../base/BaseStyle";

export const isPoneAvailable = (phone) => {
    const verify = /^1\d{10}$/;
    if (phone == null || !verify.test(phone)) {
        return false;
    } else {
        return true;
    }
}

export const is6_24 = (data) => {
    const verify = new RegExp("^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_]){4,24}$");
    if (data == null || !verify.test(data)) {
        return false
    } else {
        return true
    }
}

export const isPasswordAvailable = (password) => {
    const verify = /^[A-Za-z0-9]{6,20}$/;
    if (password == null || !verify.test(password)) {
        return false;
    } else {
        return true;
    }
}

export const isAvailable = (password) => {
    const verify = /^[A-Za-z0-9]+$/;
    if (password == null || !verify.test(password)) {
        return false;
    } else {
        return true;
    }
}

//判断输入的涨跌幅
export const isInputAvailable = (text) => {
    var verify = /^\d+\.?\d*$/;
    text = text + "";
    if (text == null || text.endsWith('.') || !verify.test(text) || text == 0) {
        return false;
    } else {
        return true;
    }
}
//判断输入的时间
export const isTimeAvailable = (time) => {
    var verify = /^\d{1,}$/;
    if (!verify.test(time)) {
        return false;
    } else {
        return true;
    }
}

export const currencyExchange = (s) => {
    if(/[^0-9\.]/.test(s)) return "-.-";
    s=s.replace(/^(\d*)$/,"$1.");
    s=(s+"00").replace(/(\d*\.\d\d)\d*/,"$1");
    s=s.replace(".",",");
    const re=/(\d)(\d{3},)/;
    while(re.test(s)) {
        s=s.replace(re,"$1,$2");
    }
    s=s.replace(/,(\d\d)$/,".$1");
    return "￥" + s.replace(/^\./,"0.")
}

export const unitExchange = (data,curLanguageIndex) => {
    try {
        if (data == null) return errDataMask

        data = parseFloat(data)
        if (data <= 0) return errDataMask

        if(/[^0-9\.]/.test(data)) return errDataMask;
        if (data>100000000) {
            return (parseInt(data)/100000000).toFixed(2) + getString('B',curLanguageIndex)
        } else if (data>10000) {
            return (parseInt(data)/10000).toFixed(2) + getString('W',curLanguageIndex)
        }
        return parseInt(data).toFixed(2)
    }catch (error) {
        console.warn('unitExchange error')
    }
    return errDataMask
}

export const poNeChange = (data) => {
    if (parseFloat(data)>=0) {
        return "+"+parseFloat(data).toFixed(2)+"%"
    } else {
        return parseFloat(data).toFixed(2)+"%"
    }
}

export const show = (data)=>{
    if(data != null) {
        Toast.show(data,{
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
            shadow: false,
            hideOnPress: true,
            delay: 0,
            visible: true,
            backgroundColor: '#000',
            textColor: '#fff'
        })
    }
}

export const getExchangeId = (exchangeName,items) => {
    if (exchangeName == "cmc") {
        return "1303"
    } else {
        for (let i = 0;i<items.length;i++) {
            if (items[i].enName == exchangeName) {
                return items[i].id
            }
        }
    }
    return ""
}

export const timestampToTime = (timestamp) => {
    const date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    const Y = date.getFullYear() + '-';
    const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    const D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + ' ';
    return M+D;
}

export const timestamp1ToTime = (timestamp) => {
    const date = new Date(parseInt(timestamp)); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    const Y = date.getFullYear() + '-';
    const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    const D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + ' ';
    return Y+M+D;
}

export const getTimeDistance = (timestamp,curLanguageIndex) => {

    const curTimeStamp = new Date().getTime()
    let timeDiff = (curTimeStamp - timestamp)/1000

    if (timeDiff < 0) {
        return '- -'
    } else if (timeDiff < 86400) {
        if (timeDiff< 60) {
            return Math.floor(timeDiff)+getString('s',curLanguageIndex) + getString('before',curLanguageIndex)
        } else if (timeDiff < 3600) {
            return Math.floor(timeDiff/60)+ getString('m',curLanguageIndex) +getString('before',curLanguageIndex)
        } else if (timeDiff < 86400) {
            return Math.floor(timeDiff/3600)+ getString('h',curLanguageIndex) +getString('before',curLanguageIndex)
        }
    } else  if (timeDiff < 2*86400) {
        const timeStampDate = new Date(timestamp - 86400000);

        let chour = timeStampDate.getHours();
        chour = chour < 10 ? ('0' + chour) : chour;
        let cminute = timeStampDate.getMinutes();
        cminute = cminute < 10 ? ('0' + cminute) : cminute;

        return getString('yesterday',curLanguageIndex)+" "+chour+":"+cminute
    } else {
        const timeStampDate = new Date(timestamp);
        let cmonth = timeStampDate.getMonth() + 1;
        cmonth = cmonth < 10 ? ('0' + cmonth) : cmonth;
        let cday = timeStampDate.getDate();
        cday = cday < 10 ? ('0' + cday) : cday;
        let chour = timeStampDate.getHours();
        chour = chour < 10 ? ('0' + chour) : chour;
        let cminute = timeStampDate.getMinutes();
        cminute = cminute < 10 ? ('0' + cminute) : cminute;

        return cmonth+"-"+cday+" "+chour+":"+cminute
    }
}

export const timeChange = (timestamp) => {
    let date = new Date(timestamp);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    return m + '/' + d + ' ' + h + ':' + minute;
}

export const timeAllChange = (timestamp) => {
    let date = new Date(timestamp);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    return y+"."+m+'.'+d+' '+h+':'+minute;
}

export const msChange = (timestamp) => {
    let date = new Date(timestamp);
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    return h + ':' + minute;
}

export const getHeaderTime = (timestamp,curLanguageIndex) => {
    const curDate = new Date(timestamp);
    const weekToday = getString('weekday',curLanguageIndex)[curDate.getDay()]
    const month = curDate.getMonth() + 1
    const day = curDate.getDate()
    const showToday = (curDate.toDateString() === new Date().toDateString()) ? (getString('today',curLanguageIndex)+"   ") : ""
    return `${showToday}${month+getString('monthsOther',curLanguageIndex)+day+getString('riOther',curLanguageIndex)}   ${weekToday}`
}

const X_WIDTH = 375;
const X_HEIGHT = 812;
const screenW = Dimensions.get('window').width;
const screenH = Dimensions.get('window').height;

//判断是否iPhone x
export const isIphoneX = () => {
    return (
        Platform.OS === 'ios' &&
        ((screenH === X_HEIGHT && screenW === X_WIDTH) ||
            (screenH === X_WIDTH && screenW === X_HEIGHT))
    )
}

//集成超过四个的跳转，防止参数不断被改变
export const jumpQuoteDetailPage = (isCmcPage,navigate,params) => {
    navigate(isCmcPage ? 'GlobalDetailPage' : 'GlobalDetailPage',params)
}

//集成超过四个的跳转，防止参数不断被改变
export const jumpOZAddRemindPage = (navigate,params) => {
    navigate('OZSetAlertPage',params)
}

//集成超过四个的跳转，防止参数不断被改变
export const jumpLoginSelectPage = (navigate) => {
    navigate('LoginSelectPage')
}

export const percentageDealt = (data) => {
    try {
        if (data != null) {
            if (data > 1000000) {
                return data.toFixed(0)
            } else if (data> 100) {
                return data.toFixed(2)
            } else if (data > 1) {
                return data.toFixed(4)
            } else {
                return data.toFixed(8)
            }
        }
    } catch (e) {}

    return errDataMask
}

export const percentageSmallDealt = (data) => {
    try {
        if (data != null) {
            if (data > 100000) {
                return data.toFixed(0)
            } else if (data> 10) {
                return data.toFixed(2)
            } else if (data > 1) {
                return data.toFixed(3)
            } else {
                return data.toFixed(6)
            }
        }
    } catch (e) {}

    return errDataMask
}

export const dealtQuoteItems = (originData,usdRatePrice) => {
    const newItems = originData
        .map((item,index)=>{
            const newItem = item
            newItem.usdCnyRate = usdRatePrice.usdCnyRate

            let rmbPrice = null;
            let dollarPrice = null;
            if (item.exchangeName == 'cmc') {
                rmbPrice = parseFloat(item.price)/parseFloat(usdRatePrice.usdCnyRate)
                dollarPrice = parseFloat(item.price)
            } else {
                let curPriceUsd ;
                let curPriceUsds = usdRatePrice.data
                for (let i = 0 ; i < curPriceUsds.length ; i++) {
                    if (curPriceUsds[i].anchor == item.anchor) {
                        curPriceUsd = curPriceUsds[i].rate
                        break;
                    }
                }

                if (curPriceUsd != null) {
                    rmbPrice = parseFloat(item.price)*parseFloat(curPriceUsd)/parseFloat(usdRatePrice.usdCnyRate)
                    dollarPrice = parseFloat(item.price)*parseFloat(curPriceUsd)
                    newItem.curPriceUsd = curPriceUsd
                }
            }

            if (item.market_cap_usd != null) {
                item.market_cap_usd = item.market_cap_usd+""
            }

            newItem.rmbPrice = percentageSmallDealt(rmbPrice)
            newItem.dollarPrice = percentageSmallDealt(dollarPrice)

            return newItem
        })

    return newItems
}

//替换字符串空格
export const replacekongge = (str) => {
    let result = str.replace(/(^\s+)|(\s+$)/g,"");
    return result;
}