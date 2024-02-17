import {defineStore} from 'pinia'
import {getLongitudeLatitude} from "@/utils/geo/GeoUtil.ts";

interface MenuStore {
  lng: string | number | undefined,
  lat: string | number | undefined,
  nextUpdateTimeStamp: number,
  expireTimeStamp: number
}

export const useGeoStore = defineStore('geo', {
  state: (): MenuStore => ({
    lng: undefined,
    lat: undefined,
    nextUpdateTimeStamp: -1,
    expireTimeStamp: 10 * 1000,
  }),
  getters: {},
  actions: {
    getLngLat(): Promise<any> {
      if (!this.lng || !this.lat) {
        return this.updateLngLat();
      } else {
        let now = Date.now();
        if (now >= this.nextUpdateTimeStamp) {
          return this.updateLngLat();
        }
        if (this.lat && this.lng) {
          return new Promise(resolve => resolve({lng: this.lng, lat: this.lat}))
        } else {
          return new Promise(resolve => resolve(undefined))
        }
      }
    },
    updateLngLat(): Promise<any> {
      return new Promise(resolve => {
        getLongitudeLatitude((lng, lat) => {
          console.log('坐标', lng, lat)

          if (lng && lat && lng != 'NaN' && lat != 'NaN') {
            console.log(lng, typeof lng)
            this.lng = lng;
            this.lat = lat;

            this.nextUpdateTimeStamp = Date.now() + this.expireTimeStamp;
            resolve({lng: lng, lat: lat});
          } else {
            // todo 没有的话，获取他当前IP，查他

            this.nextUpdateTimeStamp = Date.now() + this.expireTimeStamp / 2;
            resolve(undefined);
          }

        });
      })
    },
    clearAll(){
      this.$state = {
        lng: undefined,
        lat: undefined,
        nextUpdateTimeStamp: -1,
        expireTimeStamp: 10 * 1000,
      }
    }
  }
})
