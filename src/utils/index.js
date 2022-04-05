export const getArray = (str) => {
  str = str.replace(/(\[|\])/g, '')
  const arr1 = str.split(' ') // 空格隔开
  const arr2 = str.split(',') // 逗号隔开
  const array = arr1.length > arr2.length ? arr1 : arr2
  const res = []
  for (let i = 0; i < array.length; i++) {
    if (!isNaN(array[i])) {
      res.push(Number(array[i]))
    }
  }
  return res
}
