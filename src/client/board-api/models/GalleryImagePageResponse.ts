/* tslint:disable */
/* eslint-disable */
/**
 * MKSERVERMASTER API (frontend)
 * Internal API for MK-Servermaster Board.
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { GalleryResponseData } from './GalleryResponseData';
import {
    GalleryResponseDataFromJSON,
    GalleryResponseDataFromJSONTyped,
    GalleryResponseDataToJSON,
} from './GalleryResponseData';

/**
 * 
 * @export
 * @interface GalleryImagePageResponse
 */
export interface GalleryImagePageResponse {
    /**
     * 
     * @type {number}
     * @memberof GalleryImagePageResponse
     */
    code?: number;
    /**
     * 
     * @type {string}
     * @memberof GalleryImagePageResponse
     */
    type?: string;
    /**
     * 
     * @type {GalleryResponseData}
     * @memberof GalleryImagePageResponse
     */
    data?: GalleryResponseData;
}

/**
 * Check if a given object implements the GalleryImagePageResponse interface.
 */
export function instanceOfGalleryImagePageResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function GalleryImagePageResponseFromJSON(json: any): GalleryImagePageResponse {
    return GalleryImagePageResponseFromJSONTyped(json, false);
}

export function GalleryImagePageResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): GalleryImagePageResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'code': !exists(json, 'code') ? undefined : json['code'],
        'type': !exists(json, 'type') ? undefined : json['type'],
        'data': !exists(json, 'data') ? undefined : GalleryResponseDataFromJSON(json['data']),
    };
}

export function GalleryImagePageResponseToJSON(value?: GalleryImagePageResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'code': value.code,
        'type': value.type,
        'data': GalleryResponseDataToJSON(value.data),
    };
}
