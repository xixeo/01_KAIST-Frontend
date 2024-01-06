import request from '@/utils/request'

export function api_deviceDispManager_getDataDispFormat(params) {
    return request({
        url: `api/v1/selectAllDataDisplayFormat`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        data: params,
        headers: { 'Content-Type': 'application/json' }
    })
}

export function api_deviceDispManager_insertDisplayFormat(params) {
    return request({
        url: `api/v1/insertDisplayFormat`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        data: params,
        headers: { 'Content-Type': 'application/json' }
    })
}

export function api_deviceDispManager_updateDisplayFormat(params) {
    return request({
        url: `api/v1/updateDisplayFormat`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        data: params,
        headers: { 'Content-Type': 'application/json' }
    }) 
}

export function api_deviceDispManager_deleteDisplayFormat(params) {
    return request({
        url: `api/v1/deleteDisplayFormat`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        data: params,
        headers: { 'Content-Type': 'application/json' }
    }) 
}