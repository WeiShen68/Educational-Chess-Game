import moment from 'moment';
import { login } from '@/store/login.js';

export function isUndefinedNullOrEmpty(value) {
  if (null === value || undefined === value) return true;
  if ('string' === typeof value) {
    if ('' == value) return true;
    return false;
  }
  
  if ('number' === typeof value) return false;
  
  if ('object' === typeof value) {
    if (Array.isArray(value)) {
      if (0 >= value.length) return true;
      return false;
    }
  
    if (0 >= Object.keys(value).length) return true;
    return false;
  }
  
  return true;
}

export function roundToDecimal(num, decimal = 2) {
  if (isUndefinedNullOrEmpty(num)) return;
  return parseFloat((Math.round((num + Number.EPSILON) * 100) / 100).toFixed(decimal));
}

export function priceFormat(num) {
  return num.toFixed(2);
}

export function priceWithCommas(value) {
  if (!value) {
    return value;
  }
  let val = (value / 1).toFixed(2);
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

//whole number with comma
export function numberWithCommas(value) {
  if (!value) {
    return value;
  }
  let val = (value / 1);
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// keys: Array of wanted keys in json, data: full json data
export function extractJsonKey(keys, data) {
  if (isUndefinedNullOrEmpty(keys)) return data;
  let final = {};
  for (let key of keys) {
    if (data[key] !== undefined) {
      final[key] = data[key];
    }
  }
  return final;
}

export function setUTCDate(params) {
  return moment(params)
    .utc()
    .format('YYYY-MM-DD');
}

export function setUTCTimeWithTimeZone(params) {
  const timezoneOffset = login().getTimezone;
  return moment(params) // Create a moment object from the provided timestamp
    .add(timezoneOffset, 'm') // Adjust the moment object by adding the time zone offset in minutes
    .utc() // Convert the moment object to UTC
    .format('YYYY-MM-DD HH:mm:ss') // Format the moment object as a string in the specified format
}

export function setUTCTime(params) {
  const timezoneOffset = login().getTimezone;
  return moment(params)
    .add(timezoneOffset, 'm')
    .utc()
    .format('YYYY-MM-DD HH:mm:ss')
}

export function padZero(val) {
  return String(val).padStart(6, '0');
}

export function dateOnly(dateTime) {
  if (isUndefinedNullOrEmpty(dateTime)) return '-';
  let date = null;
  try {
    date = moment(dateTime).format('YYYY-MM-DD');
  } catch (error) {
    return '-';
  }
  if (date == 'Invalid date') return '-';
  return date;
}

export function setTimeZone(dateTime, format = null) {
  // If date format is incomplete, like missing second, use New Date(dateTime)
  if (dateTime !== undefined && dateTime !== null && dateTime !== '' && dateTime !== '0000-00-00 00:00:00') {
    if (!format) format = 'YYYY-MM-DD HH:mm:ss';
    // if (!currentFormat) currentFormat = 'YYYY-MM-DD HH:mm:ss';
    return moment
      .parseZone(dateTime)
      .local()
      .format(format);
  } else {
    return '-';
  }
}

//date only
export function getCurrentDate() {
  return moment().format('YYYY-MM-DD');
}

//Full length date
export function getFullDate() {
  return moment().format('MMMM Do YYYY, h:mm:ss a');
}

// month - date , hour - min
export function getHalfDate() {
  return moment().format('MMMM Do , h:mm a');
}

//date - day
export function getShortDate() {
  return moment().format('Do dddd');
}

export function getTimeRemaining(endtime) {
  const total = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  var returnObj = {
    label: '',

  }

  if (days >= 1) {
    returnObj.label = days + ' days ' + hours + ' hours ' + minutes + ' minutes ' + seconds + ' seconds remaining';
    return returnObj;
  }
  else if (days == 0) {
    if (hours == 0) {
      if (minutes == 0) {
        returnObj.label = seconds + ' seconds remaining';
        return returnObj;
      }
      else {
        returnObj.label = minutes + ' minutes ' + seconds + ' seconds remaining';
        return returnObj;
      }
    }
    else {
      returnObj.label = hours + ' hours ' + minutes + ' minutes ' + seconds + ' seconds remaining';
      return returnObj;
    }
  }
  else {
    return false;
  }

  // return {
  //   total,
  //   days,
  //   hours,
  //   minutes,
  //   seconds,
  // };
}

//change number format from 1,000,000 to 1M
export function getNumberFormat(num) {

  if (num >= 1000000000000) {
    return (num / 1000000000000).toFixed(1).replace(/\.0$/, '') + 'T';
  }
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }

  return num;
}

export function getLongNumberFormat(num) {

  if (num >= 1000000000000) {
    return (num / 1000000000000).toFixed(1).replace(/\.0$/, '') + 'Trillion';
  }
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'Billion';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'Million';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'Thousand';
  }

  return num;
}


export function processTimeRemaining(expireTime) {
  const calculatedTime = getTimeRemaining(expireTime);
  if (calculatedTime.days == 1) return calculatedTime.days + ' ' + this.$t('labels.timeLeft', { label: this.$t('labels.day') });
  else if (calculatedTime.days > 0)
    return calculatedTime.days + ' ' + this.$t('labels.timeLeft', { label: this.$t('labels.days') });
  else return 0 + ' ' + this.$t('labels.timeLeft', { label: this.$t('labels.day') });
}

export function capitalize(value) {
  return value.toUpperCase()
}

export function sanitizeParams(params, initialData) {
  let finalParams = {};
  if (initialData) {
    finalParams = JSON.parse(JSON.stringify(initialData));
  }
  for (let item in params) {
    if (params[item] != null && typeof params[item] !== 'undefined' && params[item].toString().trim() !== '') {
      finalParams[item] = params[item];
    }
  }
  return finalParams;
}

export function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);
  var interval = seconds / 31536000;
  var returnObj = {
    label: '',
    isToday: false,
  };
  let roundedInterval,
    periodLabel = '';

  if (interval > 1) {
    // returnObj.label = Math.floor(interval) + ' years';
    roundedInterval = Math.floor(interval);
    periodLabel = roundedInterval == 1 ? this.$t('time.lbl.year') : this.$t('time.lbl.years');
    returnObj.label = roundedInterval + ' ' + periodLabel + ' ' + this.$t('time.lbl.ago');
    returnObj.isToday = false;
    return returnObj;
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    roundedInterval = Math.floor(interval);
    periodLabel = roundedInterval == 1 ? this.$t('time.lbl.month') : this.$t('time.lbl.months');
    returnObj.label = roundedInterval + ' ' + periodLabel + ' ' + this.$t('time.lbl.ago');
    returnObj.isToday = false;
    return returnObj;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    roundedInterval = Math.floor(interval);
    periodLabel = roundedInterval == 1 ? this.$t('time.lbl.day') : this.$t('time.lbl.days');
    returnObj.label = roundedInterval + ' ' + periodLabel + ' ' + this.$t('time.lbl.ago');
    returnObj.isToday = false;
    return returnObj;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    roundedInterval = Math.floor(interval);
    periodLabel = roundedInterval == 1 ? this.$t('time.lbl.hour') : this.$t('time.lbl.hours');
    returnObj.label = roundedInterval + ' ' + periodLabel + ' ' + this.$t('time.lbl.ago');
    returnObj.isToday = true;
    return returnObj;
  }
  interval = seconds / 60;
  if (interval > 1) {
    roundedInterval = Math.floor(interval);
    periodLabel = roundedInterval == 1 ? this.$t('time.lbl.min') : this.$t('time.lbl.mins');
    returnObj.label = roundedInterval + ' ' + periodLabel + ' ' + this.$t('time.lbl.ago');
    returnObj.isToday = true;
    return returnObj;
  }
  periodLabel = seconds == 1 ? this.$t('time.lbl.sec') : this.$t('time.lbl.secs');
  returnObj.label = seconds + ' ' + periodLabel + ' ' + this.$t('time.lbl.ago');
  returnObj.isToday = true;
  return returnObj;
}
