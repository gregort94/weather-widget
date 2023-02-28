export const getPosition = (options?: PositionOptions): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  );
}

export const filterByLimit = (inputArray: [], callback: (any) => boolean, limit: number): any[] => {
  const outputArray = [];
  let iterator = 0
  while (iterator < inputArray.length && outputArray.length < limit) {
    const currentValue = inputArray[iterator]
    if (callback(currentValue)) {
      outputArray.push(currentValue)
    }
    iterator++;
  }
  return outputArray
}
