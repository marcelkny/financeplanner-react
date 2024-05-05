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
/**
 * 
 * @export
 * @interface SettingsPageContentRequest
 */
export interface SettingsPageContentRequest {
    /**
     * 
     * @type {string}
     * @memberof SettingsPageContentRequest
     */
    user_id: string;
}

/**
 * Check if a given object implements the SettingsPageContentRequest interface.
 */
export function instanceOfSettingsPageContentRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "user_id" in value;

    return isInstance;
}

export function SettingsPageContentRequestFromJSON(json: any): SettingsPageContentRequest {
    return SettingsPageContentRequestFromJSONTyped(json, false);
}

export function SettingsPageContentRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): SettingsPageContentRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'user_id': json['user_id'],
    };
}

export function SettingsPageContentRequestToJSON(value?: SettingsPageContentRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'user_id': value.user_id,
    };
}

