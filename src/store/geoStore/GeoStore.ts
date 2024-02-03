import {defineStore} from 'pinia'
import {getLongitudeLatitude} from "@/utils/geo/GeoUtil.ts";

interface MenuStore {
  lng: string | number,
  lat: string | number,
  lastUpdateTimeStamp: number,
  expireTimeStamp: number
}

export const useGeoStore = defineStore('geo', {
  state: (): MenuStore => ({
    lng: 0,
    lat: 0,
    lastUpdateTimeStamp: -1,
    expireTimeStamp: 10 * 1000,
  }),
  getters: {},
  actions: {
    getLngLat(): Promise<any> {
      if (!this.lng || !this.lat) {
        return this.updateLngLat();
      } else {
        let now = Date.now();
        if (now - this.lastUpdateTimeStamp >= this.expireTimeStamp) {
          return this.updateLngLat();
        }
        return new Promise(resolve => resolve({lng: this.lng, lat: this.lat}))
      }
    },
    updateLngLat(): Promise<any> {
      return new Promise(resolve => {
        getLongitudeLatitude((lng, lat) => {
          console.log('坐标', lng, lat)

          if (lng && lat) {
            this.lng = lng;
            this.lat = lat;
          } else {
            // todo 没有的话，获取他当前IP，查他

          }
          this.lastUpdateTimeStamp = Date.now();
          resolve({lng: lng, lat: lat});
        });
      })
    }
  }
})
