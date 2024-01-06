import request from '@/utils/request'

export function api_deviceManager_getDevices() {
  return request({
    url: `api/v1/AllDevices`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  })
}

export function api_deviceManager_getDevices_ofGroup(group) {
  return request({
    url: `api/v1/${group}/Devices`,
    meta: { apiVersion: '1.0.0' },
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
}

export function api_deviceManager_getDevice(group, device) {
  return request({
    url: `api/v1/${group}/${device}`,
    meta: { apiVersion: '1.0.0' },
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
}

export function api_deviceManager_getDevice_ofDevice(device) {
  return request({
    url: `api/v1/Devices/${device}`,
    meta: { apiVersion: '1.0.0' },
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
}

export function api_deviceManager_insertDevice(params) {
  return request({
    url: `api/v1/InsertDevice`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    data: params,
    headers: { 'Content-Type': 'application/json' }
  })
}

export function api_deviceManager_updateDevice(params) {
  return request({
    url: `api/v1/UpdateDevice`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    data: params,
    headers: { 'Content-Type': 'application/json' }
  })
}

export function api_deviceManager_deleteDevices(params) {
  return request({
    url: `api/v1/DeleteDevices`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    data: params,
    headers: { 'Content-Type': 'application/json' }
  })
}

export function api_deviceManager_getUnscribeTopicsInDevice(params) {
  return request({
    url: `api/v1/UnscribeTopicsInDevices`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    data: params,
    headers: { 'Content-Type': 'application/json' }
  })
}

export function api_mqttController_subscribeMqtt(params) {
  return request({
    url: `mqtt/subscribeMQTT`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    data: params,
    headers: { 'Content-Type': 'application/json' }
  })
}

export function api_mqttController_unscribeMQTT(params) {
  return request({
    url: `mqtt/unscribeMQTT`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    data: params,
    headers: { 'Content-Type': 'application/json' }
  })
}
