import { useStore } from 'vuex'
import Storage from '@/utils/storage'
import { ACCESS_ACTIVITYID } from '@/utils/storage-keys'

export function useActivityId() {
  const store = useStore()

  const getActivityId = () => {
    let res
    if (location.search) {
      const tempArr = location.search.split('?activityId=')
      res = tempArr[1].slice(0, tempArr[1].indexOf('/') > -1 ? tempArr[1].length - 1 : tempArr[1].length)
      store.commit('SET_ACTIVITY_ID', res)
      Storage.set(ACCESS_ACTIVITYID, res)
    }
    return res
  }

  return {
    getActivityId,
  }

}
