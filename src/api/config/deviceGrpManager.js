import request from '@/utils/request'

export function api_deviceGrpManager_getGroups() {
  return request({
    url: `api/v1/AllGroups`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  })
}

export function api_deviceGrpManager_saveGroups(params) {
  return request({
    url: `api/v1/InsertGroup`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    data: params,
    headers: { 'Content-Type': 'application/json' }
  })
}

export function api_deviceGrpManager_updateGroups(params) {
  return request({
    url: `api/v1/UpdateGroup`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    data: params,
    headers: { 'Content-Type': 'application/json' }
  })
}

export function api_deviceGrpManager_deleteGroups(params) {
  return request({
    url: `api/v1/DeleteGroups`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    data: params,
    headers: { 'Content-Type': 'application/json' }
  })
}

export function api_deviceManager_getDevicesInGroups(params) {
  return request({
    url: `api/v1/DevicesInGroups`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    data: params,
    headers: { 'Content-Type': 'application/json' }
  })
}

export function api_deviceManager_getUnscribeTopics(params) {
  return request({
    url: `api/v1/UnscribeTopicsInGroups`,
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
